# TP4_IA_M1_MIAGE_2023_2024

Auteurs:
Ce projet a été développé par:
->Rania BORDJIBA
->Destiny HANNA

Installation et Exécution:
-Assurez-vous d'avoir Node.js installé sur votre machine.
-Installez les dépendances avec npm install : npm install express multer openai
-cd server
-Configurez votre clé API OpenAI dans le fichier config.js.
-Lancez le serveur avec node server.js.
-Accédez à l'application via votre navigateur à l'adresse http://localhost:3001

Description:
Ce projet consiste en une application web interactive nommée "MiageGPT avec Dall-E". Elle permet aux utilisateurs de converser avec un modèle de langage GPT-3.5 de OpenAI et de générer des images avec Dall-E en utilisant des prompts spécifiques. L'interface utilisateur comprend également la possibilité de créer, renommer et supprimer des conversations ainsi que des fonctionnalités d'interaction vocale.

Fonctionnalités Principales: 

1-Chat Interactif:
->Les utilisateurs peuvent envoyer des messages qui sont complétés par GPT-3.5.
->Les réponses peuvent inclure des messages textuels et des images générées par Dall-E.
->Le endpoint /speech permet de générer des réponses audio à partir de prompts textuels.
->Le endpoint /image permet de générer des images à partir de descriptions textuelles.

2-Gestion des Conversations:
->Création de nouvelles conversations avec des noms personnalisés.
->Renommage et suppression de conversations existantes.
->Historique des conversations sauvegardé localement dans le navigateur.

3-Interaction Vocale:
->Possibilité d'écouter les réponses générées par le modèle à l'aide de la synthèse vocale du navigateur.

4-Prompts Pré-définis:
->Utilisation de prompts pré-définis pour faciliter l'interaction sur des sujets spécifiques comme l'IA et les lieux touristiques.

Technologies Utilisées:

-Frontend: HTML, CSS, JavaScript (Vanilla JS)
-Backend: Node.js, Express.js
-APIs: OpenAI API (pour GPT-3.5 et Dall-E)
-Librairies: Multer (pour le traitement des données de formulaire)

# MiageGPT-BORDJIBA-HANNA
# MiageGPT-BORDJIBA-HANNA
