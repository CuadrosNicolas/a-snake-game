# A snake game

## Description

Ce repo correspond à une application web permettant de jouer au jeu snake.
Plusieurs règles sont disponibles :

- Infini : Le mode classique où l'objectif est de manger le plus fruit que possible
- Limité : L'objectif est de récupérer les 10 fruits le plus rapidement possible
- Pomme vivante : Comme le mode classique avec comme différence que le fruit se déplace

L'application intègre un éditeur de niveau permettant de créer vos propres niveaux.

## Pré-requis

Ce projet nécessite node.js, npm ainsi que docker afin de construire et lancer l'application.

## Utilisation de l'éditeur

Le joueur ainsi qu'un nom de niveau est nécessaire afin de pouvoir sauvegarder votre création.

L'éditeur de niveau permet de remplir la carte avec des murs et un joueur.

La difficulté du jeu influe sur la vitesse de déplacement des éléments. Un visualiseur est
disponible pour mieux se rendre compte des différences entre les modes.

Il est également possible de modifier un niveau déjà existant, une fois vos modifications
terminées, il est possible de soit créer un nouveau niveau à partir de celui-ci ou de simplement sauvegarder
les modifications.

## Lancement

Afin de lancer l'application il suffit de construire les images nécessaires et de lancer les conteneurs via la commande suivante :

```bash
 docker-compose up -d;
```

L'application sera ensuite disponible sur le [localhost](http://localhost:80)
