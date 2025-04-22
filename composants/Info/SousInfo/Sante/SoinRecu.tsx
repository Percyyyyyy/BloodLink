import React, { useState, useEffect } from 'react';
import { View, Text, Button, TextInput, ScrollView, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../../../lib/supabase';
import { useQuestionsAnswered } from '../../../QuestionsContext';



export default function SoinRecu() {
    const [questions, setQuestions] = useState([]);
    const [selectedOption, setSelectedOption] = useState(null);
    const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(null);
    const [answer, setAnswer] = useState('');
    const [buttonColors, setButtonColors] = useState([]);
    const [questionIds, setQuestionIds] = useState([]);
    const { soinRecuQuestionsAnswered,setSoinRecuQuestionsAnswered } = useQuestionsAnswered();
    let initialButtonColors;
    useEffect(() => {
        fetchQuestions();
        console.log("---------------------------------------------------------------------------------");
    }, []);
    useEffect(() => {
        console.log('Soin recu questions answered state changed:', setSoinRecuQuestionsAnswered);
    }, [setSoinRecuQuestionsAnswered]);
    async function fetchQuestions() {
        try {
            const { data, error } = await supabase.from('questionnaire_dons_questions')
                .select(`
            idQuestion,
            libelleQuestion, 
            questionnaire_dons_details_questions(idQuestion, libelleDetailQuestion),
            sous_categorie_question(idSousCategorieQuestion, libelleSousCategorieQuestion, idCategorieQuestion)`)
                .eq('idSousCategorieQuestion', '2')
                .order('idQuestion', { ascending: true });
            if (error) {
                console.error('erreur ', error);
                return;
            }
            const questionIds = data.map(item => item.idQuestion);
            await setQuestionIds(questionIds);
            console.log("Question IDs: ", questionIds);
            const userId = await getUserConnecte();
            const idQuestionnaire = await getIdQuestionnaireUserConnecte(userId);
            initialButtonColors = data.map(() => ({ oui: 'white', non: 'white', idk: 'white' }));
            setButtonColors(initialButtonColors);

            if (idQuestionnaire) {
                await getResponsesForUser(idQuestionnaire, questionIds);
            } else {
                console.log("FALI");
            }
            console.log(" couleurs " + JSON.stringify(initialButtonColors));
            console.log("Nombres de boutons : " + initialButtonColors.length);

            setQuestions(data);
        } catch (error) {
            console.error(" Erreur " + error);
        }
    }
    async function getResponsesForUser(idQuestionnaire, questionIDDD) {
        try {
            const { data, error } = await supabase.rpc('get_responses_for_user', { id_questionnaire: idQuestionnaire });

            if (error) {
                console.error('Erreur lors de l\'appel de la fonction get_responses_for_user:', error.message);
                return null;
            }
            console.log("Nombres de questions : " + questionIDDD.length);

            console.log("Reponse " + JSON.stringify(data));
            console.log("Questions ID ", questionIDDD);
            const filteredResponses = data.filter(response => questionIDDD.includes(response.idquestion));
            console.log("Réponses filtrés ", filteredResponses);
            filteredResponses.forEach((response) => {
                console.log(`Question ID: ${response.idquestion} - Réponse: ${response.reponsequestion}`);
            });
            const updatedButtonColors = [...buttonColors];

            filteredResponses.forEach((response, index) => {
                const questionIndex = questionIDDD.indexOf(response.idquestion);
                if (questionIndex !== -1) {
                    const colorUpdate = { oui: 'white', non: 'white', idk: 'white' };
                    switch (response.reponsequestion) {
                        case 'Oui':
                            colorUpdate.oui = '#0BADD5';
                            break;
                        case 'Non':
                            colorUpdate.non = '#0BADD5';
                            break;
                        case 'Je ne sais pas':
                            colorUpdate.idk = '#0BADD5';
                            break;
                    }
                    updatedButtonColors[questionIndex] = colorUpdate;
                }
            });

            setButtonColors(updatedButtonColors);
            console.log("Updated colors : " + JSON.stringify(updatedButtonColors));
            console.log("Nombres de réponses avec des couleurs : " + updatedButtonColors.length);
            if(initialButtonColors.length == updatedButtonColors.length){
                setSoinRecuQuestionsAnswered(true);
            }else{
                setSoinRecuQuestionsAnswered(false);
            }
            setButtonColors(updatedButtonColors);

            return data;
        } catch (error) {
            console.error('Erreur lors de l\'appel de la fonction get_responses_for_user:', error.message);
            return null;
        }
    }
    async function getUserConnecte() {
        const userActif = await supabase.auth.getUser();
        const userId = userActif.data.user.id;
        return userId;
    }

    async function getIdQuestionnaireUserConnecte(idUser) {
        try {
            const { data, error } = await supabase.rpc('get_id_questionnaire_user_connecte', { iduser: idUser });
            console.log(data);
            console.log(idUser);

            if (error) {
                throw new Error('Erreur lors de l\'appel de la fonction PL/pgSQL: ' + error.message);
            }

            if (data.length === 0) {
                throw new Error('ID du questionnaire non trouvé pour l\'utilisateur connecté');
            }

            return data;
        } catch (error) {
            console.error('Erreur:', error.message);
            return null;
        }
    }
    async function insertOrUpdateQuestionnaire(idQuestionnaire, idQuestion, reponseQuestion, idDetailQuestion, reponseDetailQuestion) {
        try {
            const { data, error } = await supabase.rpc('insert_or_update_liaison_questionnaire', {
                idquestionnaire: idQuestionnaire,
                idquestion: idQuestion,
                reponsequestion: reponseQuestion,
                iddetailquestion: idDetailQuestion,
                reponsedetailquestion: reponseDetailQuestion
            });

            if (error) {
                throw new Error('Erreur lors de l\'opération: ' + error.message);
            }

        } catch (error) {
            console.error('Erreur lors de l\'opération:', error.message);
            Alert.alert('Erreur lors de l\'opération');
        }
    }

    async function handleOptionSelect(option, index, idquestion) {
        try {
            const userId = await getUserConnecte();
            const idQuestionnaire = await getIdQuestionnaireUserConnecte(userId);
            console.log("ID Quest : ", idquestion);
    
            if (!idQuestionnaire) {
                console.error('ID du questionnaire non trouvé.');
                return;
            }
    
            await insertOrUpdateQuestionnaire(idQuestionnaire, idquestion, option, null, answer);
    
            setSelectedOption(option);
            setSelectedQuestionIndex(index);
    
            setButtonColors(prevColors => {
                const updatedColors = [...prevColors];
                const colorKey = option === 'Oui' ? 'oui' : option === 'Non' ? 'non' : 'idk';
                const defaultColors = { oui: 'white', non: 'white', idk: 'white' };
    
                updatedColors[index] = { ...defaultColors, [colorKey]: '#0BADD5' };
    
                return updatedColors;
            });
    
            console.log("Index " + index);
            console.log("Option " + option);
    
        } catch (error) {
            console.error('Erreur lors de la manipulation des données:', error);
            Alert.alert('Erreur lors de la manipulation des données');
        }
    }

    return (
        <ScrollView>
            {questions.map((question, index) => (
                <View key={question.idQuestion}>
                    <Text>{question.libelleQuestion}</Text>
                    {selectedQuestionIndex === index && selectedOption === 'Oui' && question.questionnaire_dons_details_questions.map((detail, detailIndex) => (
                        <View key={detailIndex}>
                            <Text>{detail.libelleDetailQuestion}</Text>
                            <TextInput
                                placeholder="Réponse"
                                onChangeText={(text) => setAnswer(text)}
                                value={answer}
                            />
                        </View>
                    ))}
                    <View style={styles.buttonContainer}>
                        <TouchableOpacity style={[styles.buttonOui, { backgroundColor: buttonColors[index] ? buttonColors[index].oui : 'white' }]} onPress={() => handleOptionSelect('Oui', index, question.idQuestion)}>
                            <Text style={styles.buttonText}>Oui</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonIDK, { backgroundColor: buttonColors[index] ? buttonColors[index].idk : 'white' }]} onPress={() => handleOptionSelect('Je ne sais pas', index, question.idQuestion)}>
                            <Text style={styles.buttonTextIDK}>Je ne sais pas</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.buttonNon, { backgroundColor: buttonColors[index] ? buttonColors[index].non : 'white' }]} onPress={() => handleOptionSelect('Non', index, question.idQuestion)}>
                            <Text style={styles.buttonText}>Non</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            ))}
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    buttonIDK: {
        padding: 10,
        borderRadius: 5,
        width: '40%',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonOui: {
        padding: 10,
        borderRadius: 5,
        width: '25%',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonNon: {
        padding: 10,
        borderRadius: 5,
        width: '25%',
        borderColor: 'black',
        borderWidth: 1
    },
    buttonText: {
        color: 'black',
        textAlign: 'center',

    },
    buttonTextIDK: {
        color: 'black',
        textAlign: 'center',

    },
});