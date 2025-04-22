
# 🩸 BloodLink

**BloodLink** est une application mobile développée avec **React Native**, **Supabase** et **Expo**, qui facilite la mise en relation entre donneurs de sang et établissements de santé. Ce projet a été réalisé dans le cadre de mon ESP, en tant que synthèse de nos connaissances du DEC.

## 🚀 Fonctionnalités principales

- 📍 Carte interactive pour localiser les centres de don
- 📅 Prise de rendez-vous avec gestion de calendrier
- 📄 Interface utilisateur fluide avec React Navigation et BottomSheet
- 🛡️ Connexion sécurisée via Supabase
- 🧩 Composants modulaires et stylés via StyleSheet

## 📱 Tester l'application
1. Télécharger Expo Go
Pour tester l'application sur votre téléphone, vous pouvez télécharger gratuitement Expo Go :

📲 Android (Play Store)

📲 iOS (App Store)

Ensuite, scannez le QR code affiché après npx expo start.

2. Utiliser un simulateur
Si vous préférez tester via un simulateur Android ou iOS, installez Android Studio ou Xcode et configurez un émulateur. Expo détectera automatiquement vos simulateurs disponibles.


## 📦 Installation

1. **Cloner le dépôt**

```bash
git clone https://github.com/Percyyyyyy/BloodLink.git
cd BloodLink
```

2. **Installer les dépendances**

```bash
npm install
# ou
yarn install
```

3. **Lancer l'application en local avec Expo**

```bash
npx expo start
```

Assurez-vous d'avoir installé Expo CLI :  
```bash
npm install -g expo-cli
```

## 🧪 Bibliothèques et outils utilisés

- React Native – Framework pour construire l’application mobile

- Expo – Outil pour accélérer le développement avec React Native

- Supabase – Backend-as-a-Service pour la gestion des données

- React Navigation – Bibliothèque pour la gestion de la navigation

- react-native-calendars – Calendrier pour la gestion des événements

- react-native-maps – Carte interactive pour la localisation

- BottomSheet – Composant pour les interfaces inférieures interactives

## 📁 Structure du projet

```
BloodLink/
│
├── composants/          # Composants réutilisables
├── Ecrans/              # Pages principales
├── MesImages/           # Ressources graphiques
├── MesStyles/           # Fichiers de style
├── lib/                 # Fonctions auxiliaires / API Supabase
├── App.tsx              # Point d'entrée de l'app
├── app.json             # Config de l'application Expo
└── README.md
```
## Pourquoi ce projet me tient à coeur

BloodLink est bien plus qu’un simple projet mobile. Il m’a permis de me tester sur React Native, un environnement que j’apprécie énormément pour sa dimension mobile et la liberté créative qu’il offre.

Mais surtout, le don de sang est une cause qui me tient profondément à cœur. Plus je travaillais sur cette application, plus j’en parlais autour de moi — et naturellement, cela diffusait un message important sur l’importance de donner son sang.

Aujourd’hui, l’app permet de répondre à un questionnaire et de prendre rendez-vous, mais j’ai plein d’idées pour la suite :

- Ajouter des questions critiques qui peuvent empêcher la prise de rendez-vous si nécessaire

- Améliorer l’UI pour la rendre plus fun et engageante

- Intégrer un système de badges et d’XP, à l’image des diplômes reçus dans la vraie vie pour motiver les utilisateurs

- Corriger des bugs de state encore présents

Ce projet est un vrai mélange entre passion du code et valeurs humaines, et j’ai hâte de continuer à le faire évoluer 💪. C'est vraiment un projet personnel, mais j'essaie d'utiliser un maximum de données réelles pour me mettre dans de vrais conditions de développement. Je trouve déjà l'application officiel génial, mais je pense qu'elle n'est pas assez pensé pour motiver les gens alors c'est un petit défi pour moi de m'y essayer.

## 🛠️ En cours / TODO.

📲 Notifications push

🧬 Amélioration UI/UX

📅 Gestion des rendez-vous

🐞 Réglage des bugs du côté state

## 📄 Licence

Ce projet est libre pour usage académique ou personnel.

---

Fait avec ❤️ par [Percyyyyyy](https://github.com/Percyyyyyy)
