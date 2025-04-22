import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionsAnswered } from '../QuestionsContext';


export default function InfoSexe() {
    const navigation = useNavigation();
    const {
        drogueQuestionsAnswered, partenaireQuestionsAnswered, maladieQuestionsAnswered
    } = useQuestionsAnswered();
    const handleDroguePress = () => {
        navigation.navigate('Drogue');
    };

    const handleMaladiePress = () => {
        navigation.navigate('MaladieInfectueuse');
    };

    const handlePartenairePress = () => {
        navigation.navigate('Partenaire');
    };


    return (
        <View style={styles.container}>
            <View style={styles.ligne1}>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: drogueQuestionsAnswered ? 'green' : 'red' }]} onPress={handleDroguePress}>
                <View style={[styles.statusIndicator, { backgroundColor: drogueQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Drogue</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: maladieQuestionsAnswered ? 'green' : 'red' }]} onPress={handleMaladiePress}>
                <View style={[styles.statusIndicator, { backgroundColor: maladieQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Maladie infectueuse</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.ligne2}>
                <TouchableOpacity style={[styles.buttonLigne2, { borderColor: partenaireQuestionsAnswered ? 'green' : 'red' }]} onPress={handlePartenairePress}>
                    <View style={styles.categorieContainer}>
                        <View style={[styles.statusIndicator, { backgroundColor: partenaireQuestionsAnswered ? 'green' : 'red' }]} />
                        <Text style={styles.categorieText}>Partenaire</Text>
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
        backgroundColor: 'red',
        marginRight: 10,
    },
});