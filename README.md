# Pokedex - Fil Rouge React

Ce projet vise à pratiquer React en créant une application Pokedex multi-pages connectée à l’API publique [PokeAPI](https://pokeapi.co/).

## Fonctionnalités prévues

- Formulaire contrôlé de connexion
- Validation des données du formulaire
- Routes multi-pages via React Navigation
- Système de routes protégées (pages accessibles après connexion)
- Récupération des paramètres d’une route pour accéder aux détails d’un Pokémon
- Consommation de l’API PokeAPI et mise en cache pour mode offline
- Gestion de thèmes (sombre/clair)
- Utilisation des API téléphone : 
  - Géolocalisation (afficher pokemons autour de moi)
  - Caméra (ajouter image au pokedex)
  - Notifications locales

## Ressources API

- Liste des Pokémon : [https://pokeapi.co/api/v2/pokemon?limit=20&offset=0](https://pokeapi.co/api/v2/pokemon?limit=20&offset=0)
- Détail d’un Pokémon : `https://pokeapi.co/api/v2/pokemon/{id_ou_nom}`

## Plan d’implémentation

1. [Création App Pokemon / Mise en place du Routeur](https://www.notion.so/1-Cr-ation-App-Pokemon-Mise-en-place-du-Routeur-294858a1a0c380ec8261e9d1b95f9596?pvs=21)
2. [Formulaire de Connexion](https://www.notion.so/2-Formulaire-de-Connexion-294858a1a0c3800ea7a0e8798933279c?pvs=21)
3. [Page Pokemon](https://www.notion.so/3-Page-Pokemon-294858a1a0c380ff9fa0f88896c6cf9a?pvs=21)
4. [Page détails](https://www.notion.so/4-Page-d-tails-294858a1a0c3806ea2e9cde57dc8d213?pvs=21)
5. [Routes protégées](https://www.notion.so/5-Routes-prot-g-es-294858a1a0c380e5860df23c6d718f8e?pvs=21)
6. [Gestion Hors Ligne / Retour utilisateur](https://www.notion.so/6-Gestion-Hors-Ligne-Retour-utilisateur-294858a1a0c380a5ab84f590ac4be3a6?pvs=21)
7. [Fonction Recherche (1)](https://www.notion.so/7-Fonction-Recherche-1-294858a1a0c3809dbbd5f2f7ca4db246?pvs=21)
8. [Carte des pokemons autour de moi](https://www.notion.so/8-carte-des-pokemons-autour-de-moi-294858a1a0c380fb90f9da096109e20b?pvs=21)
9. [Ajouter image à son pokedex (local)](https://www.notion.so/9-Ajouter-image-a-son-pokedex-en-local-294858a1a0c3805cb98edd3b519264eb?pvs=21)
10. [Notifications locales](https://www.notion.so/10-Notifications-locale-294858a1a0c3800c80d3c2aa583cf407?pvs=21)


## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
   npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.


## Lancer le projet

``` bash
npm run android
```