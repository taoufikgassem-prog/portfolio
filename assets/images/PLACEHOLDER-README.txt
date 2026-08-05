COMMENT AJOUTER LA VRAIE PHOTO DE PROFIL (page d'accueil uniquement)
=====================================================================

La photo de profil apparaît désormais uniquement dans le Hero de la page
d'accueil (index.html), à la demande du titulaire du site. Elle n'apparaît
pas sur les autres pages (À propos, Blog, etc.).

Le code est déjà prêt à afficher votre photo automatiquement. Vous n'avez
besoin de modifier AUCUN fichier HTML ni JavaScript.

ÉTAPE UNIQUE :

1. Préparez votre photo (recadrage professionnel, format vertical ou carré,
   fond neutre, sans modification des traits du visage).

2. Renommez le fichier exactement comme ceci :
   taoufik-gassem-technical-project-manager.webp

   (Si vous n'avez qu'un .jpg, vous pouvez aussi utiliser :
    taoufik-gassem-technical-project-manager.jpg
    — les deux formats sont automatiquement testés par le site.)

3. Copiez/déposez ce fichier directement dans CE dossier :
   assets/images/

C'est tout. Rechargez la page d'accueil (index.html) dans votre navigateur :
la photo apparaîtra automatiquement dans le Hero, sans qu'il soit nécessaire
de modifier le code source.

POURQUOI CELA FONCTIONNE AUTOMATIQUEMENT :
La balise <img> du Hero pointe déjà vers ce fichier. Tant que le fichier
n'existe pas à cet emplacement exact, le site affiche automatiquement un
remplacement élégant sous forme d'initiales "TG" (aucune image cassée
n'est jamais affichée). Dès que le fichier existe avec le bon nom, il est
chargé automatiquement.

EN CAS DE PROBLÈME :
- Vérifiez que le nom du fichier est EXACTEMENT :
  taoufik-gassem-technical-project-manager.webp (ou .jpg)
  sans espace, sans majuscule différente, sans caractère supplémentaire.
- Vérifiez que le fichier est bien dans le dossier assets/images/
  (au même niveau que ce fichier PLACEHOLDER-README.txt).
- Videz le cache du navigateur (Ctrl+F5 ou Cmd+Shift+R) si l'ancienne
  version reste affichée.

Alt text utilisé automatiquement (ne pas modifier, utile pour le
référencement et l'accessibilité) :
"Taoufik Gassem, Technical Project Manager spécialisé en systèmes embarqués"

Cette même image est aussi utilisée comme aperçu (og:image) lorsque le lien
de la page d'accueil est partagé sur LinkedIn ou d'autres réseaux sociaux.
