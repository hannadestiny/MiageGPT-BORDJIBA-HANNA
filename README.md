# MiageGPT avec Dall-E
# TP4_IA_M1_MIAGE_2023_2024

## Auteurs

Ce projet a été développé par :
- **Rania BORDJIBA**
- **Destiny HANNA**

## Installation et Exécution

Pour installer et exécuter ce projet, suivez les étapes ci-dessous :

1. **Prérequis** : Assurez-vous d'avoir [Node.js](https://nodejs.org/) installé sur votre machine.
2. **Installation des dépendances** : 
    ```bash
    npm install express multer openai
    ```
3. **Naviguer dans le répertoire du serveur** :
    ```bash
    cd server
    ```
4. **Configuration** : Configurez votre clé API OpenAI dans le fichier `config.js`.
5. **Lancer le serveur** :
    ```bash
    node server.js
    ```
6. **Accéder à l'application** : Ouvrez votre navigateur et rendez-vous à l'adresse [http://localhost:3001](http://localhost:3001).

## Description

"**MiageGPT avec Dall-E**" est une application web interactive permettant aux utilisateurs de converser avec un modèle de langage GPT-3.5 de OpenAI et de générer des images à l'aide de Dall-E en utilisant des prompts spécifiques. L'interface utilisateur inclut des fonctionnalités de gestion des conversations et d'interaction vocale.

## Fonctionnalités Principales

### 1. Chat Interactif

- **Envoi de messages** : Les utilisateurs peuvent envoyer des messages et recevoir des réponses complétées par GPT-3.5.
- **Réponses multimodales** : Les réponses peuvent inclure du texte et des images générées par Dall-E.
- **Synthèse vocale** : Le endpoint `/speech` permet de générer des réponses audio à partir de prompts textuels.
- **Génération d'images** : Le endpoint `/image` permet de générer des images à partir de descriptions textuelles.

### 2. Gestion des Conversations

- **Création** : Créez de nouvelles conversations avec des noms personnalisés.
- **Renommage et Suppression** : Renommez ou supprimez des conversations existantes.
- **Historique** : L'historique des conversations est sauvegardé localement dans le navigateur.

### 3. Interaction Vocale

- **Synthèse vocale** : Écoutez les réponses générées par le modèle grâce à la synthèse vocale intégrée du navigateur.

### 4. Prompts Pré-définis

- **Facilitation de l'interaction** : Utilisation de prompts pré-définis pour des sujets spécifiques comme l'IA et les lieux touristiques.

## Technologies Utilisées

- **Frontend** : HTML, CSS, JavaScript (Vanilla JS)
- **Backend** : Node.js, Express.js
- **APIs** : OpenAI API (pour GPT-3.5 et Dall-E)
- **Librairies** : Multer (pour le traitement des données de formulaire)

