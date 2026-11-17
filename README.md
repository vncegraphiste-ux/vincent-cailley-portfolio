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
