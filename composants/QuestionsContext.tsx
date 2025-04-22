import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from '../lib/supabase';

type QuestionsAnsweredContextType = {
    mondeQuestionsAnswered: boolean;
    europeQuestionsAnswered: boolean;
    vaccinQuestionsAnswered: boolean;
    maladieQuestionsAnswered: boolean;
    drogueQuestionsAnswered: boolean;
    partenaireQuestionsAnswered: boolean;
    autresQuestionsAnswered: boolean;
    etatSanteQuestionsAnswered: boolean;
    historiqueQuestionsAnswered: boolean;
    soinRecuQuestionsAnswered: boolean;
    setMondeQuestionsAnswered: (answered: boolean) => void;
    setEuropeQuestionsAnswered: (answered: boolean) => void;
    setVaccinQuestionsAnswered: (answered: boolean) => void;
    setMaladieQuestionsAnswered: (answered: boolean) => void;
    setDrogueQuestionsAnswered: (answered: boolean) => void;
    setPartenaireQuestionsAnswered: (answered: boolean) => void;
    setAutresQuestionsAnswered: (answered: boolean) => void;
    setEtatSanteQuestionsAnswered: (answered: boolean) => void;
    setHistoriqueQuestionsAnswered: (answered: boolean) => void;
    setSoinRecuQuestionsAnswered: (answered: boolean) => void;
    allQuestionsAnswered: boolean;
    checkAllQuestionsAnswered: () => void;
    rdvPris: Date | null;
    setRdvPris: (rdvPris: Date | null) => void;
};

const QuestionsAnsweredContext = createContext<QuestionsAnsweredContextType>({
    mondeQuestionsAnswered: false,
    europeQuestionsAnswered: false,
    vaccinQuestionsAnswered: false,
    maladieQuestionsAnswered: false,
    drogueQuestionsAnswered: false,
    partenaireQuestionsAnswered: false,
    autresQuestionsAnswered: false,
    etatSanteQuestionsAnswered: false,
    historiqueQuestionsAnswered: false,
    soinRecuQuestionsAnswered: false,
    setMondeQuestionsAnswered: () => { },
    setEuropeQuestionsAnswered: () => { },
    setVaccinQuestionsAnswered: () => { },
    setMaladieQuestionsAnswered: () => { },
    setDrogueQuestionsAnswered: () => { },
    setPartenaireQuestionsAnswered: () => { },
    setAutresQuestionsAnswered: () => { },
    setEtatSanteQuestionsAnswered: () => { },
    setHistoriqueQuestionsAnswered: () => { },
    setSoinRecuQuestionsAnswered: () => { },
    allQuestionsAnswered: false,
    checkAllQuestionsAnswered: () => { },
    rdvPris: new Date,
    setRdvPris: () => { },

});

export const useQuestionsAnswered = () => useContext(QuestionsAnsweredContext);

type QuestionsAnsweredProviderProps = {
    children: ReactNode;
};

export const QuestionsAnsweredProvider: React.FC<QuestionsAnsweredProviderProps> = ({ children }) => {
    const [mondeQuestionsAnswered, setMondeQuestionsAnswered] = useState(false);
    const [europeQuestionsAnswered, setEuropeQuestionsAnswered] = useState(false);
    const [vaccinQuestionsAnswered, setVaccinQuestionsAnswered] = useState(false);
    const [maladieQuestionsAnswered, setMaladieQuestionsAnswered] = useState(false);
    const [drogueQuestionsAnswered, setDrogueQuestionsAnswered] = useState(false);
    const [partenaireQuestionsAnswered, setPartenaireQuestionsAnswered] = useState(false);
    const [autresQuestionsAnswered, setAutresQuestionsAnswered] = useState(false);
    const [etatSanteQuestionsAnswered, setEtatSanteQuestionsAnswered] = useState(false);
    const [historiqueQuestionsAnswered, setHistoriqueQuestionsAnswered] = useState(false);
    const [soinRecuQuestionsAnswered, setSoinRecuQuestionsAnswered] = useState(false);
    const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);

    const [rdvPris, setRdvPris] = useState<Date | null>(null);

    async function getCurrentUserId() {
        const { data, error } = await supabase.auth.getUser();
        if (error) {
            console.error('Erreur lors de la récupération de l’utilisateur test:', error.message);
            return null; 
        }
        return data?.user?.id; 
    }

    const checkAllQuestionsAnswered = () => {
        if (mondeQuestionsAnswered && europeQuestionsAnswered && vaccinQuestionsAnswered && maladieQuestionsAnswered && drogueQuestionsAnswered && partenaireQuestionsAnswered && autresQuestionsAnswered && etatSanteQuestionsAnswered && historiqueQuestionsAnswered && soinRecuQuestionsAnswered) {
            setAllQuestionsAnswered(true);
        } else {
            setAllQuestionsAnswered(false);
        }
    };
    useEffect(() => {
        const allAnswered = mondeQuestionsAnswered && europeQuestionsAnswered && vaccinQuestionsAnswered && maladieQuestionsAnswered && drogueQuestionsAnswered && partenaireQuestionsAnswered && autresQuestionsAnswered && etatSanteQuestionsAnswered && historiqueQuestionsAnswered && soinRecuQuestionsAnswered;
        setAllQuestionsAnswered(allAnswered);
    }, [mondeQuestionsAnswered, europeQuestionsAnswered, vaccinQuestionsAnswered, maladieQuestionsAnswered, drogueQuestionsAnswered, partenaireQuestionsAnswered, autresQuestionsAnswered, etatSanteQuestionsAnswered, historiqueQuestionsAnswered, soinRecuQuestionsAnswered]);
    useEffect(() => {
        const loadState = async () => {
            console.log("Début du chargement de l'état des questions répondues...");
            const userId = await getCurrentUserId();
            if (!userId) {
                console.log("Aucun utilisateur connecté trouvé.");
                return;
            }
            const savedState = await AsyncStorage.getItem(`questionsAnswered-${userId}`);
            if (savedState) {
                const state = JSON.parse(savedState);
                console.log("État chargé:", state);
                setMondeQuestionsAnswered(state.mondeQuestionsAnswered);
                setEuropeQuestionsAnswered(state.europeQuestionsAnswered);
                setVaccinQuestionsAnswered(state.vaccinQuestionsAnswered);
                setMaladieQuestionsAnswered(state.maladieQuestionsAnswered);
                setDrogueQuestionsAnswered(state.drogueQuestionsAnswered);
                setPartenaireQuestionsAnswered(state.partenaireQuestionsAnswered);
                setAutresQuestionsAnswered(state.autresQuestionsAnswered);
                setEtatSanteQuestionsAnswered(state.etatSanteQuestionsAnswered);
                setHistoriqueQuestionsAnswered(state.historiqueQuestionsAnswered);
                setSoinRecuQuestionsAnswered(state.soinRecuQuestionsAnswered);
            } else {
                console.log("Aucun état précédent trouvé pour l'utilisateur:", userId);
            }
        };
    
        loadState().catch(error => {
            console.error("Erreur lors du chargement de l'état:", error);
        });
    }, []);

    useEffect(() => {
        const saveState = async () => {
            try {
                const userId = await getCurrentUserId();
                if (!userId) {
                    console.log("Aucun utilisateur connecté trouvé.");
                    return;
                }
                console.log("ID utilisateur récupéré pour la sauvegarde:", userId);
    
                const state = {
                    mondeQuestionsAnswered,
                    europeQuestionsAnswered,
                    vaccinQuestionsAnswered,
                    maladieQuestionsAnswered,
                    drogueQuestionsAnswered,
                    partenaireQuestionsAnswered,
                    autresQuestionsAnswered,
                    etatSanteQuestionsAnswered,
                    historiqueQuestionsAnswered,
                    soinRecuQuestionsAnswered,
                    rdvPris: rdvPris ? rdvPris.toISOString() : null
                };
    
                console.log("État actuel à sauvegarder:", state);
    
                await AsyncStorage.setItem(`questionsAnswered-${userId}`, JSON.stringify(state));
                console.log("État sauvegardé avec succès pour l'utilisateur:", userId);
            } catch (error) {
                console.error("Erreur lors de la sauvegarde de l'état:", error);
            }
        };
    
        saveState();
    }, [mondeQuestionsAnswered, europeQuestionsAnswered, vaccinQuestionsAnswered, maladieQuestionsAnswered, drogueQuestionsAnswered, partenaireQuestionsAnswered, autresQuestionsAnswered, etatSanteQuestionsAnswered, historiqueQuestionsAnswered, soinRecuQuestionsAnswered]);
    return (
        <QuestionsAnsweredContext.Provider value={{
            mondeQuestionsAnswered,
            europeQuestionsAnswered,
            vaccinQuestionsAnswered,
            maladieQuestionsAnswered,
            drogueQuestionsAnswered,
            partenaireQuestionsAnswered,
            autresQuestionsAnswered,
            etatSanteQuestionsAnswered,
            historiqueQuestionsAnswered,
            soinRecuQuestionsAnswered,
            setMondeQuestionsAnswered,
            setEuropeQuestionsAnswered,
            setVaccinQuestionsAnswered,
            setMaladieQuestionsAnswered,
            setDrogueQuestionsAnswered,
            setPartenaireQuestionsAnswered,
            setAutresQuestionsAnswered,
            setEtatSanteQuestionsAnswered,
            setHistoriqueQuestionsAnswered,
            setSoinRecuQuestionsAnswered,
            allQuestionsAnswered,
            checkAllQuestionsAnswered,
            rdvPris,
            setRdvPris,
        }}>
            {children}
        </QuestionsAnsweredContext.Provider>
    );
};