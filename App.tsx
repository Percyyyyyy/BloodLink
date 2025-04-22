import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Accueil from './Ecrans/Accueil';
import Profil from './Ecrans/Profil';
import Connexion from './Ecrans/Landing.js/Connexion';
import 'react-native-url-polyfill/auto'
import { useState, useEffect } from 'react'
import { supabase } from './lib/supabase';
import Auth from './composants/Connexion';
import Account from './composants/Inscription';
import { Session } from '@supabase/supabase-js'
import Info from './composants/Info';
import InfoSante from './composants/Info/InfoSante';
import AppNavigator from './composants/AppNavigator';
import Home from './composants/Home';
import { createStackNavigator } from '@react-navigation/stack';
import InfoVoyage from './composants/Info/InfoVoyage';
import InfoSexe from './composants/Info/InfoSexe';
import SoinRecu from './composants/Info/SousInfo/Sante/SoinRecu';
import EtatSante from './composants/Info/SousInfo/Sante/EtatSante';
import Historique from './composants/Info/SousInfo/Sante/Historique';
import Vaccin from './composants/Info/SousInfo/Sante/Vaccin';
import Autres from './composants/Info/SousInfo/Sante/Autres';
import React from 'react';
import Questionnaire from './Ecrans/Questionnaire';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const StackNavigator = () => (
  <Stack.Navigator>
     <Stack.Screen name='Info' component={Info} options={({ route }) => ({
      headerShown: false
    })}
     />
    <Stack.Screen name='InfoVoyage' component={InfoVoyage} options={({ route }) => ({
      headerShown: false
    })} />
    <Stack.Screen name='InfoSexe' component={InfoSexe} options={({ route }) => ({
      headerShown: false
    })} />
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
        tabBarIcon: ({ color, size }) => (
          <IconIonicons name="reader-outline" color={'black'} size={28} />
        )
      }}
    />
    <Tab.Screen name="Accueil" component={Accueil}
      options={{
        headerShown: false,
        tabBarLabel: 'Questionnaire',
        tabBarIcon: ({ color, size }) => (
          <IconIonicons name="home" color={'black'} size={28} />
          )
      }}
    />
    <Tab.Screen name="Profil" component={Profil}
      options={{
        headerShown: false,
        tabBarLabel: 'Profil',
        tabBarIcon: ({ color, size }) => (
          <IconIonicons name="person-outline" color={'black'} size={28} />
          )
      }}
    />
  </Tab.Navigator>
)


// export default function App() {
//   return (
//   //   <NavigationContainer>
//   //   <TabNavigator />
//   // </NavigationContainer>
//  <Connexion />
//   );
// }
export default function App() {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    // <NavigationContainer>
    //   {/* {session && session.user ? <Account key={session.user.id} session={session} /> : <Auth />} */}
    //   <TabNavigator />
    // </NavigationContainer>
    <AppNavigator/>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
