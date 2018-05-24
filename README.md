# dataviz-ata
Dépôt pour concours datavisualisation, organisé par la DGAC dans le cadre des Assises du Transport Aérien https://www.assisesdutransportaerien.gouv.fr/comprendre/les-actualites/data-lancement-dun-appel-projet-pour-la-conception-dune-application 

## Installation

### Prérequis

* Node.js >= 6.x
* R >= 3.0.1 pour exécuter les traitements de données, avec le paquet jsonlite. Les résultats sont inclus dans le dépôt. 

### Commandes

`npm install`  
Si certaines dépendances sont manquantes, il faudra les installer à la main. Les messages d'avertissement de npm sont généralement assez clairs.  
`npm serve`  démarre un serveur de développement pour afficher l'interface graphique. Les données sont incluses à la compilation : le résultat est donc utilisable de façon autonome. 

Passage en production :  
`npm build --prod`. Les fichiers résultants se trouvent dans un dossier dist/ dont il suffit de copier le contenu pour déployer l'application. 

### Traitement de données

Pour réexécuter les traitements de données, il faut le logiciel libre R. Le script se trouve dans `process/airports.R`.  
* `install.package("jsonlite")` permet d'installer le paquet nécessaire à l'export en JSON, si celui-ci n'est pas déjà installé
* modifier le répertoire d'exécution spécifié dans le script (commande `setwd(...)` au début de celui-ci) pour refléter l'emplacement exact
* exécuter le script depuis une console R ou un IDE comme RStudio. Les résultats sont écrits dans 5 fichiers distincts dans le répertoire de travail.
* Il est ensuite recommandé (bien que pas indispensable) de rajouter des retours à la ligne dans les fichiers produits. La fonction rechercher-remplacer de la plupart des éditeurs de texte permet d'effectuer cette opération. 
* déplacer les fichiers obtenus vers le répertoire `app/data`. 

## Licence

GPL v3. Voir le fichier LICENCE pour plus de détails. 

## Résultat

Projet retenu pour la phase 2 du concours. 
