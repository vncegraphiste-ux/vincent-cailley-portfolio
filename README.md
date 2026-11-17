# Portfolio Vincent Cailley — V10

Portfolio statique HTML/CSS/JS pour GitHub et Netlify.

## Liens distincts (après le nouveau déploiement Netlify)

- Jeux vidéo : https://vincentcailley.netlify.app/games/#projects
- Applications et sites : https://vincentcailley.netlify.app/apps/#projects

Les deux adresses pointent vers le même site, mais montrent des galeries différentes. La page `about.html` et le sélecteur EN / FR restent partagés.

## Mettre à jour le site déjà en ligne

1. Sur GitHub, ouvrir le dépôt `vncegraphiste-ux/vincent-cailley-portfolio`.
2. Utiliser **Add file > Upload files** pour charger les fichiers de ce ZIP **décompressé**, y compris le fichier `_redirects` et le dossier `assets`.
3. Confirmer le commit sur la branche `main`.
4. Netlify, déjà connecté au dépôt, publiera automatiquement les changements.

Ne créez pas un deuxième dépôt ni un deuxième site Netlify. Les anciennes URLs `/?category=game` et `/?category=apps` restent compatibles.

Le fichier `_redirects` contient les réécritures Netlify nécessaires aux deux routes. Les chemins d'images CSS/JS sont définis depuis la racine du site pour fonctionner dans les deux routes.


V14: Projets grand format — captures à gauche et informations à droite sur PC (≥1081px) ; informations au-dessus des captures sur tablette et mobile. Un seul fond coloré, sans sous-cadres autour des captures.


### V16 — Panneaux pastel

Les trois projets vedettes (Draw Something Together, Taxi Idle Game et Pirates Raids Conquest) utilisent maintenant un fond degrade tres pastel et des angles droits. Les captures restent sans cadre individuel, et les informations restent a droite sur grand ecran et au-dessus sur mobile. Les couleurs sont modifiables dans `projects.js` via `gradientFrom` et `gradientTo`.


V17: 7 more Game UI/UX projects now use wide pastel sections. Original screen assets stored in assets/ as WebP. Project layout settings are in projects.js.
