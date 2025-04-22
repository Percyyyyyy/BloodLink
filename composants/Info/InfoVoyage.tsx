import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useQuestionsAnswered } from '../QuestionsContext';


export default function InfoVoyage() {
    const navigation = useNavigation();
    const {
        mondeQuestionsAnswered, europeQuestionsAnswered
    } = useQuestionsAnswered();
    const handleEuropePress = () => {
        navigation.navigate('Europe');
    };
    const handleMondePress = () => {
        navigation.navigate('Monde');
    };

    return (
        <View style={styles.container}>
            <View style={styles.ligne1}>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: europeQuestionsAnswered ? 'green' : 'red' }]} onPress={handleEuropePress}>
                    <View style={[styles.statusIndicator, { backgroundColor: europeQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Europe</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.buttonLigne1, { borderColor: mondeQuestionsAnswered ? 'green' : 'red' }]} onPress={handleMondePress}>
                <View style={[styles.statusIndicator, { backgroundColor: mondeQuestionsAnswered ? 'green' : 'red' }]} />
                    <Text style={styles.categorieText}>Monde</Text>
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
        flex: 0.3,
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
