import { View, Text, StyleSheet, TextInput, Image } from 'react-native'
import Header from '../../composants/header';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import Wave from 'react-wavify';

const Connexion = ({ navigation }) => {
    return (
        
        <View style={styles.container}>
            <View style={{ justifyContent: 'center', flex: 0.4 }}>
                <Image style={{ height: 100, width: 300 }} source={require('../../MesImages/logoApp.jpg')} />
            </View>
            <View style={{  flex: 0.6, justifyContent: 'flex-start',backgroundColor:'#E00F35',borderTopStartRadius:200,  }}>
                <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 4, marginBottom: 25, alignItems: 'center' }}>
                    <IconIonicons name='mail-outline' size={20} color="#666" />
                    <TextInput placeholder='Email'></TextInput>
                </View>
                <View style={{ flexDirection: 'row', borderBottomColor: '#ccc', borderBottomWidth: 1, paddingBottom: 4, marginBottom: 25, alignItems: 'center' }}>
                    <IconIonicons name='lock-closed-outline' size={20} color="#666" />
                    <TextInput placeholder='Mot de passe'></TextInput>
                </View>
            </View>

        </View>


    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'left',
        justifyContent: 'center',
        padding: 20
    },
});

export default Connexion;