import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from '.././lib/supabase';
import { Session } from '@supabase/supabase-js'
import { createStackNavigator } from '@react-navigation/stack';
import Accueil from '../Ecrans/Accueil';
import Profil from '../Ecrans/Profil';
import Auth from './Connexion';
import Home from './Home';
import Info from './Info';
import InfoSante from './Info/InfoSante';
import InfoSexe from './Info/InfoSexe';
import InfoVoyage from './Info/InfoVoyage';
import Autres from './Info/SousInfo/Sante/Autres';
import EtatSante from './Info/SousInfo/Sante/EtatSante';
import Historique from './Info/SousInfo/Sante/Historique';
import SoinRecu from './Info/SousInfo/Sante/SoinRecu';
import Vaccin from './Info/SousInfo/Sante/Vaccin';
import Account from './Inscription';
import React from 'react';
import Partenaire from './Info/SousInfo/Sexe/Partenaire';
import Drogue from './Info/SousInfo/Sexe/Drogue';
import MaladieInfectueuse from './Info/SousInfo/Sexe/MaladieInfectueuse';
import Europe from './Info/SousInfo/Voyage/Europe';
import Monde from './Info/SousInfo/Voyage/Monde';
import { QuestionsAnsweredProvider } from './QuestionsContext'
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
const StackConnexion = () => {
  return (
    <Stack.Navigator initialRouteName="Auth">
      <Stack.Screen 
        name="Auth" 
        component={Auth} 
        options={{ headerShown: false }}
      />
      <Stack.Screen 
        name="Account" 
        component={Account} 
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

const StackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name='Info' component={Info} options={({ route }) => ({
      headerShown: false
    })}
    />

    {/* Info Voyage */}

    <Stack.Screen name='InfoVoyage' component={InfoVoyage} options={({ route }) => ({

    })} />
    <Stack.Screen name='Europe' component={Europe} options={({ route }) => ({
    })} />
    <Stack.Screen name='Monde' component={Monde} options={({ route }) => ({
    })} />

    {/* Info Sexe */}

    <Stack.Screen name='InfoSexe' component={InfoSexe} options={({ route }) => ({

    })} />
    <Stack.Screen name='Partenaire' component={Partenaire} options={({ route }) => ({
    })} />
    <Stack.Screen name='Drogue' component={Drogue} options={({ route }) => ({
    })} />
    <Stack.Screen name='MaladieInfectueuse' component={MaladieInfectueuse} options={({ route }) => ({
    })} />

    {/* Info Sante */}


    <Stack.Screen name='InfoSante' component={InfoSante} options={({ route }) => ({
    })} />
    <Stack.Screen name='SoinRecu' component={SoinRecu} options={({ route }) => ({
    })} />
    <Stack.Screen name='EtatSante' component={EtatSante} options={({ route }) => ({
    })} />
    <Stack.Screen name='Historique' component={Historique} options={({ route }) => ({
    })} />
    <Stack.Screen name='Vaccin' component={Vaccin} options={({ route }) => ({
    })} />
    <Stack.Screen name='Autres' component={Autres} options={({ route }) => ({
    })} />
    <Stack.Screen name='Auth' component={Auth} options={({ route }) => ({
    })} />
    <Stack.Screen name='Account' component={Account} options={({ route }) => ({
    })} />
    <Stack.Screen name='Accueil' component={Account} options={({ route }) => ({
    })} />
  </Stack.Navigator>
)

const TabNavigator = () => (
  <Tab.Navigator screenOptions={({ route }) => ({
    tabBarShowLabel: false,
  })}>
    <Tab.Screen name="stackQuestionnaire" component={StackNavigator}
      options={{
        headerShown: false,
        tabBarLabel: 'Questionnaire',
        tabBarIcon: ({ focused, color, size }) => (
          <IconIonicons name="reader-outline" color={focused ? 'blue' : 'black'} size={28} />
        )
      }}
    />
    <Tab.Screen name="Accueil" component={Accueil}
      options={{
        headerShown: false,
        tabBarLabel: 'Questionnaire',
        tabBarIcon: ({ focused, color, size }) => (
          <IconIonicons name="home" color={focused ? 'blue' : 'black'} size={28} />
        )
      }}
    />
    <Tab.Screen name="Profil" component={Profil}
      options={{
        headerShown: false,
        tabBarLabel: 'Profil',
        tabBarIcon: ({ focused, color, size }) => (
          <IconIonicons name="person-outline" color={focused ? 'blue' : 'black'} size={28} />
        )
      }}
    />
  </Tab.Navigator>
)


export default function AppNavigator() {
  const [session, setSession] = useState<Session | null>();
  const [loading, setLoading] = useState(true); // Ajout d'un état de chargement

  useEffect(() => {
    const fetchSession = async () => {
      const { data: sessionData, error } = await supabase.auth.getSession();

      if (sessionData) {
        setSession(sessionData.session);
      } else if (error) {
        console.error('Error fetching session:', error.message);
      }
      setLoading(false); // Mettre à jour l'état de chargement après la récupération de la session

      const sessionListener = supabase.auth.onAuthStateChange((_event, sessionEvent) => {
        setSession(sessionEvent);
      });
    };

    fetchSession();
  }, []);
  
  if (loading) {
    return <Text>Loading...</Text>; // Afficher un indicateur de chargement pendant la vérification de la session
  }
return (
  <QuestionsAnsweredProvider>
    <NavigationContainer>
    {session && session.user ? (
          <TabNavigator />
        ) : (
          <StackConnexion />
        )}
    </NavigationContainer>
  </QuestionsAnsweredProvider>
);
}
