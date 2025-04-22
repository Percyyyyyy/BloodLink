import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import Accueil from "../Ecrans/Accueil";
import Profil from "../Ecrans/Profil";
import Questionnaire from "../Ecrans/Questionnaire";
import IconIonicons from 'react-native-vector-icons/Ionicons'
import { NavigationContainer } from '@react-navigation/native';

const Tab = createBottomTabNavigator();


const TabNavigator = () => (
    <Tab.Navigator screenOptions={({ route }) => ({
        tabBarShowLabel: false,
    })}>
        <Tab.Screen name="Accueil" component={Accueil}
            options={{
                headerShown: false,
                tabBarLabel: 'Accueil',
                tabBarIcon: ({ color, size }) => (
                    <IconIonicons name="reader-outline" color={'black'} size={28} />
                )
            }}
        />
        <Tab.Screen name="Questionnaire" component={Questionnaire}
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



export default function Home() {
    return (
        <NavigationContainer>
            <TabNavigator />
        </NavigationContainer>
    );
}
