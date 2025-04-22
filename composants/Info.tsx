import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionsAnswered } from './QuestionsContext';

export default function Info() {
    const navigation = useNavigation();
    const {
        soinRecuQuestionsAnswered,
        etatSanteQuestionsAnswered,
        historiqueQuestionsAnswered,
        vaccinQuestionsAnswered,
        autresQuestionsAnswered,
        drogueQuestionsAnswered, partenaireQuestionsAnswered, maladieQuestionsAnswered, mondeQuestionsAnswered, europeQuestionsAnswered
    } = useQuestionsAnswered();

    const allHealthQuestionsAnswered = soinRecuQuestionsAnswered && etatSanteQuestionsAnswered && historiqueQuestionsAnswered && vaccinQuestionsAnswered && autresQuestionsAnswered;
    const allVoyageQuestionsAnswered = mondeQuestionsAnswered && europeQuestionsAnswered;
    const allSexeQuestionsAnswered = drogueQuestionsAnswered && partenaireQuestionsAnswered && maladieQuestionsAnswered;
    const handleVoyagePress = () => {
        navigation.navigate('InfoVoyage');
    };

    const handleSexePress = () => {
        navigation.navigate('InfoSexe');
    };

    const handleSantePress = () => {
        navigation.navigate('InfoSante');
    };

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <View style={styles.ligne1}>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: allVoyageQuestionsAnswered ? 'green' : 'red' }]} onPress={handleVoyagePress}>
                <View style={[styles.statusIndicator, { backgroundColor: allVoyageQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Voyage</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: allSexeQuestionsAnswered ? 'green' : 'red' }]} onPress={handleSexePress}>
                <View style={[styles.statusIndicator, { backgroundColor: allSexeQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Sexe</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ligne2}>
                <TouchableOpacity style={[styles.buttonLigne2, { borderColor: allHealthQuestionsAnswered ? 'green' : 'red' }]} onPress={handleSantePress}>
                    <View style={styles.categorieContainer}>
                        <View style={[styles.statusIndicator, { backgroundColor: allHealthQuestionsAnswered ? 'green' : 'red' }]} />
                        <Text style={styles.categorieText}>Santé</Text>
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
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'space-between'
    },
    ligne2: {
        width: '100%',
        padding: 10,
        height: '40%'
    },
    buttonLigne1: {
        padding: 10,
        borderRadius: 5,
        width: '48%',
        borderColor: 'black',
        borderWidth: 1,
        flexDirection: 'row',
        alignItems: 'center',
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
        backgroundColor: 'red', // Changez la couleur ici selon l'état
        marginRight: 10,
    },
});