# A snake game

## Description

Ce repo correspond à une application web permettant de jouer au jeu snake.
Plusieurs règles sont disponibles :

- Infini : Le mode classique où l'objectif est de manger le plus fruit que possible
- Limité : L'objectif est de récupérer les 10 fruits le plus rapidement possible
- Pomme vivante : Comme le mode classique avec comme différence que le fruit se déplace

L'application intègre un éditeur de niveau permettant de créer vos propres niveaux.

## Organisation

### Front

Le dossier front contient l'application web en react + typescript. Celle-ci est organisée de manière classique avec 2 spécificités :
- Les components de type 'renderer' correspondent à des svg components qui doivent être enfant d'élément svg. Ceux-ci sont majoritairement utilisés afin d'afficher les models du jeu de manière graphique.
-  Le dossier gameMode contient la définition des différentes règles du jeu. Chaque règle est composée de plusieurs sous-règles.

Le front peut être lancé en devmode en lancant la commande suivante :

```bash
npm run-script start
```

En devmode, l'application nécessite une instance du back disponible afin de fonctionner.

### Back

Le dossier back contient l'API du système permettant à l'application web d'interagir avec mongoDB.

Le back peut être lancé en devmode via la commande suivante :

```bash
npm run-script watch
```

L'API nécessite d'avoir un mongodb qui tourne sur le port 27017.

### mongoDB

Le dossier mongoDB permet de générer une image docker de mongoDB avec des niveaux du jeu pré-insérés.

## Pré-requis

Ce projet nécessite docker afin de construire et lancer l'application.
Les ports 80 et 27017 doivent être disponible au lancement de l'application.

## Lancement

Afin de lancer l'application il suffit de construire les images nécessaires et de lancer les conteneurs via la commande suivante :

```bash
 docker-compose up -d;
```

L'application sera ensuite disponible sur le [localhost](http://localhost:80)

## Prise en main

### Jeu

Le premier menu permet de joueur à un niveau, de les éditer ou de les supprimer. Au survolant des cartes contenant les noms des niveaux, une prévisualisation du niveau s'affiche dans le panneau de droite avec également le score des joueurs précédents. Pour lancer une partie il suffit d'appuyer sur le bouton joueur ou de cliquer sur la carte sur niveau

Le jeu est au final un snake classique, le joueur est représenté par les cases vertes, les fruits par les cases roses et les murs par des cases noirs. Le focus de la fenêtre de jeu se fait automatiquement et il suffit d'appuyer sur une des flèches pour déplacer le serpent.

### Utilisation de l'éditeur

Le joueur ainsi qu'un nom de niveau est nécessaire afin de pouvoir sauvegarder votre création.

L'éditeur de niveau permet de remplir la carte avec des murs et un joueur.

La difficulté du jeu influe sur la vitesse de déplacement des éléments. Un visualiseur est
disponible pour mieux se rendre compte des différences entre les modes.

Il est également possible de modifier un niveau déjà existant, une fois vos modifications
terminées, il est possible de soit créer un nouveau niveau à partir de celui-ci ou de simplement sauvegarder
les modifications.
