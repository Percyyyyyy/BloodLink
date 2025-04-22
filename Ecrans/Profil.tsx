import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, StatusBar, Image } from 'react-native';
import { supabase } from '../lib/supabase';

const Profil = () => {
    const [user, setUser] = useState(null);
    const [donationCount, setDonationCount] = useState(0);

    useEffect(() => {
        getCurrentUser();
        fetchDonationCount();
    }, [user]);

    async function getCurrentUser() {
        const { data, error } = await supabase.auth.getUser();
        if (data) {
            setUser(data.user);
            
        } else {
            console.error('Failed to fetch user:', error?.message);
        }
    }

    async function fetchDonationCount() {
        if (user) {
            const { data, error, count } = await supabase
                .from('rendez_vous')
                .select('*', { count: 'exact' })
                .eq('user_id', user.id);

            if (count) {
                setDonationCount(count);
            }
        }
    }

    async function handleSignOut() {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error('Error signing out:', error.message);
        } else {
            setUser(null);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <Image source={{ uri: user?.user_metadata.avatar_url }} style={styles.profilePic} />
            <Text style={styles.name}>{user?.user_metadata.full_name}</Text>
            <Text style={styles.info}>Email: {user?.email}</Text>
            <Text style={styles.info}>Donations: {donationCount}</Text>
            <Button title="Déconnexion" onPress={handleSignOut} color="#e63946" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1faee',
        padding: 20
    },
    profilePic: {
        width: 120,
        height: 120,
        borderRadius: 60,
        marginBottom: 20
    },
    name: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#1d3557'
    },
    info: {
        fontSize: 18,
        color: '#457b9d',
        marginVertical: 5
    }
});

export default Profil;