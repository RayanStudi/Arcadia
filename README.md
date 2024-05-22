# Arcadia Zoo

Arcadia Zoo est une application web permettant aux visiteurs de visualiser les animaux, leurs habitats et les services du zoo. L'application est développée avec Node.js, Express.js pour le backend, et React.js pour le frontend. MongoDB est utilisé comme base de données.

## Fonctionnalités

- Gestion des services du zoo.
- Saisie des comptes rendus par les vétérinaires.
- Gestion des utilisateurs (administrateurs, employés, vétérinaires).
- Affichage des avis des visiteurs.

## Prérequis

- Node.js (version 14 ou supérieure)
- npm (version 6 ou supérieure)
- MongoDB (version 4 ou supérieure)
- Git

## Installation

1. Clonez le dépôt :
   'bash'
git clone https://github.com/votre-utilisateur/arcadia-zoo.git
cd arcadia-zoo

2. Installez les dépendances pour le backend :
  cd backend
  npm install

3. Installez les dépendances pour le frontend (à la racine du projet) :
   npm install

4. Démarrez le frontend (à la racine du projet) :
   npm start

5. Démarrez le backend :
   cd backend
   npm start

6. Configuration :
Créez un fichier .env dans le dossier backend et configurez les variables d'environnement suivantes :
  PORT=3001
  MONGODB_URI=mongodb://localhost:27017/arcadia_zoo
  JWT_SECRET=your_secret_jwt
