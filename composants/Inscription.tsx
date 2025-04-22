import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { supabase } from '../lib/supabase';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [avatar_url, setAvatarUrl] = useState(null)
    const [gender, setGender] = useState('');
    const [loading, setLoading] = useState(false);
    // Inscription
    const handleSignUp = async () => {
        setLoading(true);
        const { data: { session }, error } = await supabase.auth.signUp({ email, password });
        console.log(session);
        
        if (error) {
            alert(error.message);
        } else if (session) {
            await updateProfile();
        }
        setLoading(false);
    };
    // Infos complementaires à l'utilisateur
    const updateProfile = async () => {
        const userActif = await supabase.auth.getUser();
        const userId = userActif.data.user.id;
        const { data, error } = await supabase.from('profiles').upsert({
            id:userId,
            username,
            full_name: fullName,
            gender,
        });
        console.log("user id",userId);
        
        if (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Input placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
            <Input placeholder="Mot de passe" value={password} onChangeText={setPassword} secureTextEntry />
            <Input placeholder="Pseudo" value={username} onChangeText={setUsername} />
            <Input placeholder="Nom au complet" value={fullName} onChangeText={setFullName} />
            <View style={styles.genderContainer}>
                <TouchableOpacity style={[styles.genderButton, gender === 'Homme' && styles.selected]} onPress={() => setGender('Homme')}>
                    <Text style={styles.genderText}>Homme</Text>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.genderButton, gender === 'Femme' && styles.selected]} onPress={() => setGender('Femme')}>
                    <Text style={styles.genderText}>Femme</Text>
                </TouchableOpacity>
            </View>
            <Button title={loading ? 'Loading...' : 'Sign Up'} onPress={handleSignUp} disabled={loading} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 20,
    },
    genderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginVertical: 10,
    },
    genderButton: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#000',
    },
    selected: {
        backgroundColor: '#007bff',
    },
    genderText: {
        color: '#fff',
    },
});

export default Register;