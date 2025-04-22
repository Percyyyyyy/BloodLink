import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, StatusBar, Image, SafeAreaView, Dimensions, FlatList } from 'react-native';
import MapView, { Marker, MarkerPressEvent } from 'react-native-maps';
import * as Location from 'expo-location';
import BottomSheet from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { supabase } from '../lib/supabase';
import { Picker } from '@react-native-picker/picker';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useQuestionsAnswered } from '../composants/QuestionsContext';
import WaitingPeriod from './WaitingPeriod';
import { format } from 'date-fns';

const Accueil = ({ navigation }) => {
    const { allQuestionsAnswered } = useQuestionsAnswered();
    const context = useQuestionsAnswered();
    const { rdvPris, setRdvPris } = useQuestionsAnswered();
    const today = new Date();
    let rdvPrisDate = new Date(rdvPris);
    const isFutureDate = rdvPrisDate > today;


    useEffect(() => {
        console.log('Current state of questions answered:', context);
    }, []);
    useEffect(() => {
        console.log('L\état allQuestionsAnswered a changé en :', allQuestionsAnswered);
        if (allQuestionsAnswered) {
            console.log('Toutes les questions ont été répondues.');
        } else {
            console.log('Certaines questions n\'ont pas été répondues.');
        }
        console.log("Rdv pris à ", rdvPris);

    }, [allQuestionsAnswered, rdvPris]);

    const mapRef = useRef(null);
    const [mapReady, setMapReady] = useState(false);

    const targetLatitude = 49.490002;
    const targetLongitude = 0.100000;
    const zoomLevel = 0.02;
    const [markersCollecte, setMarkersCollecte] = useState([]);
    const [markersPrelevement, setMarkersPrelevement] = useState([]);
    const [searchInput, setSearchInput] = useState('');
    const [lat, setLat] = useState(targetLatitude);
    const [lon, setLon] = useState(targetLongitude);
    const [locationPermissionGranted, setLocationPermissionGranted] = useState(false);
    const bottomSheetRef = useRef<BottomSheet>(null);
    const [mapReload, setMapReload] = useState(false); // État pour recharger la carte
    const [joursDisponibles, setJoursDisponibles] = useState([]); // État pour stocker les jours disponibles
    const [markedDates, setMarkedDates] = useState({});
    const [availableHours, setAvailableHours] = useState({});
    const [selectedDayInfo, setSelectedDayInfo] = useState(null); // État pour stocker les informations du jour sélectionné
    const [showCalendar, setShowCalendar] = useState(false); // État pour gérer l'affichage du calendrier
    const [selectedHour, setSelectedHour] = useState(null); // État pour stocker l'heure sélectionnée
    const [selectedCentre, setSelectedCentre] = useState('');

    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const snapPoints = useMemo(() => ['5%', '30%', '60%'], []);

    // Fonction pour récupérer les données de l'API et les transferer dans la bdd
    const importDataFromAPI = async () => {
        try {
            let idCentre = 0; // Variable pour stocker le dernier identifiant utilisé
            let offset = 0; // Décalage initial pour la pagination
            const batchSize = 100; // Taille de lot pour la pagination

            // Boucle pour récupérer les données par lots
            while (true) {
                const response = await fetch(`https://oudonner.api.efs.sante.fr/carto-api/v3/samplingcollection/searchnearpoint?CenterLatitude=${lat}&CenterLongitude=${lon}&HideNonPubliableCollects=true&LocationsOnly=false&DiameterLatitude=50&DiameterLongitude=50&UserLatitude=${lat}&UserLongitude=${lon}`);
                const dataFromApi = await response.json();

                // Vérifiez si des données ont été renvoyées
                if (typeof dataFromApi !== 'object' || dataFromApi === null) {
                    console.error('Les données de l\'API ne sont pas au format attendu (objet).');
                    break;
                }

                // Vérifiez si des données ont été renvoyées
                if (dataFromApi.samplingLocationEntities_SF.length === 0) {
                    break;
                }

                // Traitez les données de chaque lot
                for (const entity of dataFromApi.samplingLocationEntities_SF) {
                    idCentre++;
                    // Vérifiez si l'entité existe déjà dans la table
                    const { data: existingData, error: existingError } = await supabase
                        .from('sampling_location_entities_sf')
                        .select('*', { count: 'exact', head: true })
                        .eq('samplingLocationCode', entity.samplingLocationCode)


                    if (existingError) {
                        console.error('Erreur lors de la vérification de l\'existence des données:', existingError.message);
                        continue;
                    }

                    if (existingData) {
                        console.log(`L'entité avec le code ${entity.samplingLocationCode} existe déjà dans la table.`);
                        continue;
                    }

                    entity.idCentre = idCentre;

                    // Insérer les données de samplingLocationEntities_SF dans la table appropriée
                    const { data, error } = await supabase
                        .from('sampling_location_entities_sf')
                        .insert([entity]);


                    if (error) {
                        console.error('Erreur lors de l\'insertion des données de samplingLocationEntities_SF:', error.message);
                    } else {
                        console.log('Données de samplingLocationEntities_SF insérées avec succès dans la base de données.');
                    }
                }

                // Augmentez le décalage pour récupérer le prochain lot de données
                offset += batchSize;
            }
        } catch (error) {
            console.error('Erreur lors de la récupération des données de l\'API:', error.message);
        }

    }
    // Fonction pour récupérer les centres de dons
    const fetchData = async () => {
        try {
            const { data, error } = await supabase
                .from('sampling_location_entities_sf')
                .select()
            const lieuxDePrevelement = data;
            setMarkersPrelevement(lieuxDePrevelement);
        } catch (error) {
            console.error('Error fetching data:', error);
            console.log(lat);
            console.log(lon);
        }
    };
    // Fonction pour récupérer les rendez-vous d'un centre
    async function fetchRdv(location_id) {
        try {
            setShowCalendar(true)
            console.log("Location ID : " + location_id);

            const { data, error } = await supabase.rpc('get_heures_debut_centre', { p_location_id: location_id });
            if (error) {
                throw error;
            }
            const updatedJoursDisponibles = data.map((item) => {
                const date = new Date(item.heure_debut);
                console.log("date" + date);
                return date.toISOString().split('T')[0]; // Format YYYY-MM-DD
            });
            console.log("Updated jours disponibles: ", updatedJoursDisponibles);
            const updatedHeures = {};
            data.forEach((item) => {
                const dateTime = new Date(item.heure_debut);
                const date = dateTime.toISOString().split('T')[0]; // Extrait la date
                let time = dateTime.toISOString().split('T')[1].split('+')[0]; // Extrait le temps
                time = time.substring(0, 5); // Garde uniquement les heures et minutes
                if (!updatedHeures[date]) {
                    updatedHeures[date] = [];
                }
                updatedHeures[date].push(time);
            });

            setAvailableHours(updatedHeures);
            setJoursDisponibles(updatedJoursDisponibles);
            console.log("State updated: ", updatedJoursDisponibles);
            const dates = {};
            updatedJoursDisponibles.forEach((date) => {
                dates[date] = { selected: true, marked: true, selectedColor: 'red' };
            });
            setMarkedDates(dates);
        } catch (error) {
            console.error('Error fetching rdv:', error);
        }
    }
    // Appel les centres de dons uniquement quand la map est prête
    useEffect(() => {
        if (mapReady) {
            console.log('Map is ready!');
            fetchData();
        }
    }, [mapReady]);
    // Update de map
    useEffect(() => {
        if (mapReady && mapRef.current) {
            console.log('Updating map region...');
        }
    })
    // Permet de demander l'autorisation d'utiliser la position actuelle de l'utilisation
    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                setLocationPermissionGranted(true);
                const location = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Highest });
                setLat(location.coords.latitude);
                setLon(location.coords.longitude);
            }
        })();
    }, []);
    // Permet de centrer la focalisation sur le marqueur selectionnée et d'ouvrir la languette
    const showBtmSheet = (markerID) => {
        console.log("Marker ID: " + markerID);

        // Trouver le marqueur correspondant à markerID
        const marker = markersPrelevement.find(m => m.idCentre === markerID);
        if (marker) {
            // Centrer la carte sur le marqueur
            mapRef.current?.animateToRegion({
                latitude: marker.latitude,
                longitude: marker.longitude,
                latitudeDelta: zoomLevel,
                longitudeDelta: zoomLevel,
            }, 100);
        }

        fetchRdv(markerID);
        setSelectedCentre(markerID);
        console.log('Test');
        bottomSheetRef.current?.snapToIndex(1);
    };

    // Gère le fait d'appuyer sur une date de rdv
    const handleDayPress = (day) => {
        const dateString = day.dateString;
        if (markedDates[dateString]) {
            console.log(`Le jour sélectionné est : ${dateString}`);
            console.log(availableHours[dateString]);
            setSelectedDayInfo(null);
            setSelectedDayInfo({ dateString, hours: availableHours[dateString] || [] });
            console.log("Info jour selectionné " + selectedDayInfo);

            setShowCalendar(false); // Cache le calendrier
        }
    };
    // Récupère l'user connecté
    async function getUserConnecte() {
        const userActif = await supabase.auth.getUser();
        const userId = userActif.data.user.id;
        return userId;
    }
    // Gère le fait d'appuyer sur une heure de rdv (inscription à une dateHeure)
    const handleRdvSignup = async (selectedHour) => {
        if (selectedDayInfo && selectedHour) {
            console.log(`Inscription pour le RDV le ${selectedDayInfo.dateString} à ${selectedHour}`);

            try {
                const userId = await getUserConnecte();
                console.log("User :" + userId);
                const centreDonsId = selectedCentre;
                const heureDebut = new Date(`${selectedDayInfo.dateString}T${selectedHour}:00.000Z`);
                const { data, error } = await supabase.rpc('inscrire_utilisateur_rendez_vous', {
                    p_user_id: userId,
                    p_centre_dons_id: centreDonsId,
                    p_heure_debut: heureDebut
                });

                if (error) {
                    console.error('Erreur pendant l\'inscription : ', error.message);
                    alert('Pas réussi à s\'inscrire pour ce rendez-vous');
                } else {
                    await setRdvPris(heureDebut);
                    console.log('Inscription réalisé avec succès : ', data);
                    alert('Inscription réalisé avec succès !');
                }
            } catch (error) {
                console.error('Error during appointment signup:', error);
                alert('An error occurred while signing up for the appointment.');
            }

            setShowCalendar(true);
        }
    };
    if (!allQuestionsAnswered) {
        return (
            <View  style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <Text>Vous devez répondre à toutes les questions avant d'accéder à cette page.</Text>
            </View>
        );
    } else if (isFutureDate && rdvPris) {
        // Vérifie si la derniere date de rendez-vous pris est dans le futur 
        console.log("is future date ", isFutureDate, " ||  today : ", today, " || rdvPris Date : ", rdvPrisDate);

        return (
            <View  style={styles.container}>
                <StatusBar translucent backgroundColor="transparent" />
                <Text>Le rendez-vous est prévu pour le {format(rdvPrisDate, 'dd/MM/yyyy')}.</Text>
            </View>
        );
    } else if (!isFutureDate && rdvPris) {
        // Vérifie si la derniere date de rendez-vous pris est dans le passé
        console.log("is future date ", isFutureDate, " ||  today : ", today, " || rdvPris Date : ", rdvPrisDate);


        return (
            <WaitingPeriod navigation={undefined} />
        );
    }
    else {
        return (
            <GestureHandlerRootView style={styles.container}>
                <SafeAreaView style={styles.container}>
                    <StatusBar translucent backgroundColor="transparent" />
                    <View style={styles.searchContainer}>
                    <Image source={require('../MesImages/logoApp.jpg')} style={{ width: 150, height: 30, resizeMode : 'contain' }} />
                        <TextInput
                            style={styles.input}
                            placeholder="Entrez une ville"
                            value={searchInput}
                            onChangeText={text => setSearchInput(text)}
                        />
                    </View>
                    <MapView
                        ref={mapRef}
                        key={mapReload ? 'mapReload' : 'mapNormal'}
                        style={styles.map}
                        initialRegion={{
                            latitude: targetLatitude,
                            longitude: targetLongitude,
                            latitudeDelta: zoomLevel,
                            longitudeDelta: zoomLevel,
                        }}
                        onMapReady={() => setMapReady(true)}

                    >
                        {markersPrelevement.map(marker => (
                            <Marker
                                key={marker.idCentre}
                                coordinate={{
                                    latitude: marker.latitude,
                                    longitude: marker.longitude,
                                }}
                                title={marker.name}
                                description={marker.fullAddress}
                                onPress={() => showBtmSheet(marker.idCentre)}                        >
                                {/* <Image
                                source={require('../MesImages/blood-donation.png')}
                                style={styles.markerImage}
                            /> */}
                            </Marker>
                        ))}
                    </MapView>
                    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints} onChange={handleSheetChanges}>
                        <View style={styles.contentContainer}>
                            {showCalendar ? (
                                <Calendar
                                    markedDates={markedDates}
                                    theme={{
                                        selectedDayBackgroundColor: 'red',
                                        selectedDayTextColor: 'white',
                                    }}
                                    onDayPress={handleDayPress}
                                />
                            ) : (
                                selectedDayInfo && (
                                    <View style={styles.selectedDayInfo}>
                                        <Text>Informations pour le {new Date(selectedDayInfo.dateString).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}:</Text>
                                        <FlatList
                                            data={selectedDayInfo.hours}
                                            keyExtractor={(item) => item}
                                            renderItem={({ item }) => (
                                                <View style={item === selectedHour ? styles.selectedHourItem : styles.hourItem}>
                                                    <Text onPress={() => handleRdvSignup(item)}>{item}</Text>
                                                </View>
                                            )}
                                            snapToAlignment={'start'}
                                            decelerationRate={'fast'}
                                            snapToInterval={60}
                                            showsVerticalScrollIndicator={false}
                                        />
                                        <Button title="Retour au calendrier" onPress={() => setShowCalendar(true)} />
                                    </View>
                                )
                            )}
                        </View>
                    </BottomSheet>
                </SafeAreaView>
            </GestureHandlerRootView>
        );
    };
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    containerHeadline: {
        fontSize: 24,
        fontWeight: '600',
        padding: 20
    },
    hoursContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 20,
    },
    markerImage: {
        width: 40,
        height: 40
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 10,
        marginTop: StatusBar.currentHeight || 0,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
        marginRight: 10,
    },
    map: {
        width: Dimensions.get("window").width,
        height: Dimensions.get("window").height,
        flex: 1,
    },
    selectedDayInfo: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    hourItem: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 0.6,
    },
    selectedHourItem: {
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        opacity: 1,
    },
});

export default Accueil;
