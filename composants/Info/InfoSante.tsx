import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionsAnswered } from '../QuestionsContext';


export default function InfoSante() {
    const navigation = useNavigation();
    const {
        soinRecuQuestionsAnswered,
        etatSanteQuestionsAnswered,
        historiqueQuestionsAnswered,
        vaccinQuestionsAnswered,
        autresQuestionsAnswered,
    } = useQuestionsAnswered();
    const handleSoinRecuPress = () => {
        navigation.navigate('SoinRecu');
    };

    const handleHistoriquePress = () => {
        navigation.navigate('Historique');
    };

    const handleVaccinPress = () => {
        navigation.navigate('Vaccin');
    };

    const handleEtatSantePress = () => {
        navigation.navigate('EtatSante');
    };

    const handleAutresPress = () => {
        navigation.navigate('Autres');
    };

    return (
        <View style={styles.container}>
            <View style={styles.ligne1}>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: soinRecuQuestionsAnswered ? 'green' : 'red' }]} onPress={handleSoinRecuPress}>
                <View style={[styles.statusIndicator, { backgroundColor: soinRecuQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Soin reçu</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: etatSanteQuestionsAnswered ? 'green' : 'red' }]} onPress={handleEtatSantePress}>
                <View style={[styles.statusIndicator, { backgroundColor: etatSanteQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Etat santé</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ligne1}>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: historiqueQuestionsAnswered ? 'green' : 'red' }]} onPress={handleHistoriquePress}>
                <View style={[styles.statusIndicator, { backgroundColor: historiqueQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Historique</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: vaccinQuestionsAnswered ? 'green' : 'red' }]} onPress={handleVaccinPress}>
                <View style={[styles.statusIndicator, { backgroundColor: vaccinQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Vaccin</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ligne1}>
                <TouchableOpacity style={[styles.buttonLigne2, { borderColor: autresQuestionsAnswered ? 'green' : 'red' }]} onPress={handleAutresPress}>
                    <View style={styles.categorieContainer}>
                    <View style={[styles.statusIndicator, { backgroundColor: autresQuestionsAnswered ? 'green' : 'red' }]} />
                        <Text style={styles.categorieText}>Autres</Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    },
    categorieContainer: {
        flex: 0.3,
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center'
    },
    categorieText: {
        textAlign: 'center',
        fontSize: 20,
    },
    ligne1: {
        width: '100%',
        flex :0.3,
        flexDirection: 'row',
        padding: 5,
        justifyContent: 'space-between'
    },
    ligne2: {
        width: '100%',
        padding: 10,
        height: '90%'
    },
    buttonLigne1: {
        padding: 10,
        borderRadius: 5,
        width: '48%', 
        borderColor: 'black',
        borderWidth: 1,
    },
    buttonLigne2: {
        padding: 10,
        borderRadius: 5,
        borderColor: 'black',
        borderWidth: 1,
        flex: 1,
        flexDirection: 'column',
    },
    statusIndicator: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'red',
        marginRight: 10,
    },
});
