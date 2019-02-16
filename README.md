# AppliAssosPNS

## Développer
Exécuter la commande
```ionic serve -c```

L'application est lancé sur localhost:8100

## Build puis déployer
### Prérequis
#### Build
Aucun

#### Déploiement
Se connecter sur firebase cli, se lier au projet firebase de déploiement (Site Assos PNS) pour la préprod
Choisir comme répertoire d'output platforms/browser/****** jusqu'à atteindre le dossier avec index.html lors du premier build. (A renseigner plus tard)
Configurer le site comme une single page application (redirection des routes vers index.html)

### Build 
Utiliser la commande

```ionic cordova build browser --prod```

Le flag ```--prod``` permet d'utiliser environment.prod.ts à la place de environment.ts, si vous ne l'avez pas, ignorez ce flag, la BD utilisée sera celle de développement. 

### Déployer
Utiliser la commande

```firebase deploy```

### Faire les deux à la fois
Utilsier la commande

```npm run deploy```

Cela automatise le build puis la mise en ligne
