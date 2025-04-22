import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, StatusBar } from 'react-native';
import { useQuestionsAnswered } from '../composants/QuestionsContext';
import { supabase } from '../lib/supabase';

const Accueil = ({ navigation }) => {
    const { rdvPris } = useQuestionsAnswered();
    const [timeRemaining, setTimeRemaining] = useState({ days: 0, hours: 0, minutes: 0 });
    const [gender, setGender] = useState(null);

    useEffect(() => {
        const fetchProfileAndCalculateTime = async () => {
            const userActif = await supabase.auth.getUser();
            const userId = userActif.data.user.id;
            const { data, error, status } = await supabase
                .from('profiles')
                .select(`gender`)
                .eq('id', userId)
                .single();

            if (error) {
                console.error('Error fetching profile:', error);
                return;
            }

            setGender(data.gender);
            calculateTimeRemaining(rdvPris, data.gender);
        };

        fetchProfileAndCalculateTime();
    }, [rdvPris]);

    useEffect(() => {
        if (gender) {
            calculateTimeRemaining(rdvPris, gender);
        }
    }, [rdvPris, gender]);
    function calculateTimeRemaining(lastAppointmentDate, gender) {
        const daysInterval = gender === 'male' ? 56 : 84;
        if (!lastAppointmentDate) return;
    
        const lastDate = new Date(lastAppointmentDate);
        const nextAppointmentDate = new Date(lastDate.getTime());
        nextAppointmentDate.setDate(lastDate.getDate() + daysInterval);
    
        const today = new Date();
        const timeDiff = nextAppointmentDate.getTime() - today.getTime();
        const days = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
        const hours = Math.floor((timeDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    
        setTimeRemaining({
            days: days > 0 ? days : 0,
            hours: hours > 0 ? hours : 0,
            minutes: minutes > 0 ? minutes : 0
        });
    }
    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" />
            <Image source={require('../MesImages/logoApp.jpg')} style={{ width: 300, height: 100 }} />
            <Text style={styles.text}>{timeRemaining.days}J - {timeRemaining.hours}H - {timeRemaining.minutes}M</Text>
            <Text>Nous vous remercions beaucoup pour votre don !</Text>
            <Text>1 don = 3 vies de sauvés</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor : 'white'
    },
    text: {
        fontSize: 24,
        textAlign: 'center'
    }
});

export default Accueil;

