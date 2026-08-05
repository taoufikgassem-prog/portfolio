# Portfolio de Taoufik GASSEM — Technical Project Manager - Embedded Systems

Site web statique (HTML5 / CSS3 / JavaScript vanilla) — aucune dépendance,
aucun framework, aucun build, aucun serveur requis.

Domaine cible : https://taoufikgassem.arena.site

---

## 1. Ouvrir le site en local

Aucune installation n'est nécessaire.

1. Extrayez l'archive ZIP dans un dossier.
2. Double-cliquez sur `index.html`.
3. Le site s'ouvre dans votre navigateur par défaut, avec tous les liens
   internes fonctionnels (chemins relatifs uniquement).

Aucun terminal, aucun serveur local, aucun `npm install` n'est nécessaire.

---

## 2. Structure du projet

```
/
  index.html, about.html, experience.html, expertise.html,
  projects.html, certifications.html, blog.html, contact.html,
  privacy.html, legal.html, 404.html
  css/style.css          → design system (variables, composants)
  css/responsive.css     → media queries (mobile, tablette, desktop)
  js/main.js             → navigation, accessibilité, back-to-top, config
  js/blog.js             → recherche et filtres du blog
  js/contact.js          → validation du formulaire de contact
  assets/images/         → photo de profil (à ajouter), illustrations
  assets/documents/      → CV et certificats (à ajouter)
  blog/article-01.html … article-30.html → 30 articles complets
  sitemap.xml, robots.txt
```

---

## 3. Modifier les textes

Tous les textes sont directement dans le HTML de chaque page (pas de CMS,
pas de base de données). Ouvrez le fichier `.html` concerné avec un éditeur
de texte (VS Code, Notepad++, etc.) et modifiez le texte entre les balises.

Le header et le footer sont dupliqués sur chaque page (choix volontaire pour
un site 100 % statique sans build). Si vous modifiez la navigation, pensez à
répercuter le changement sur toutes les pages concernées.

---

## 4. Photo de profil (fonctionnalité retirée à la demande du titulaire)

L'emplacement de la photo de profil (et son remplacement par défaut en
initiales "TG") a été entièrement retiré des pages du site (Hero de la page
d'accueil et page À propos), à la demande explicite du titulaire du site.
Le Hero de la page d'accueil est désormais centré en une seule colonne, et
la page À propos affiche son texte en pleine largeur, sans bloc photo.

Si vous souhaitez réintégrer une photo à l'avenir, voir les instructions
dans `assets/images/PLACEHOLDER-README.txt`.

---

## 5. Ajouter le CV (PDF)

**Important :** `SITE_CONFIG.CV_AVAILABLE` est actuellement réglé sur `true`
dans `js/main.js`, à la demande du titulaire du site. Le bouton de
téléchargement du CV est donc déjà visible sur les pages Contact et À propos.
Assurez-vous de déposer réellement le fichier au chemin attendu pour éviter
un lien mort :

1. Déposez le fichier sous le nom exact :
   `assets/documents/cv-taoufik-gassem.pdf`
2. Si le fichier n'est pas encore prêt, repassez temporairement
   `CV_AVAILABLE` à `false` dans `js/main.js` pour masquer le bouton.

---

## 6. Ajouter le certificat ServiceNow CSA

Le chemin local d'origine du certificat
(`file:///C:/Users/p101155/Downloads/ServiceNow%20CSA.pdf`) ne fonctionne que
sur l'ordinateur d'origine : il ne doit jamais être utilisé sur le site publié.

**Important :** `SITE_CONFIG.CSA_CERTIFICATE_AVAILABLE` est actuellement
réglé sur `true` dans `js/main.js`, à la demande du titulaire du site. Le
bouton « Voir le certificat » est donc déjà visible sur la page
Certifications. Assurez-vous de déposer réellement le fichier au chemin
attendu pour éviter un lien mort :

1. Déposez le fichier sous le nom exact :
   `assets/documents/certifications/servicenow-csa.pdf`
2. Si le fichier n'est pas encore prêt, repassez temporairement
   `CSA_CERTIFICATE_AVAILABLE` à `false` dans `js/main.js` pour masquer le
   bouton.

---

## 7. Mapping des certificats Udemy / LinkedIn Learning

**Mise à jour :** à la demande du titulaire du site, tous les certificats
disponibles sont désormais présentés avec leur lien de vérification,
attribués dans l'ordre de la liste fournie (3 liens Udemy pour 4 titres,
3 liens LinkedIn Learning pour 4 titres). Les deux titres restants sans URL
correspondante ("Master ServiceNow Admin & Development from Basic to Pro"
et "Développer son intelligence émotionnelle") sont affichés sans bouton de
vérification. Si vous obtenez ultérieurement les liens exacts, mettez à jour
`certifications.html` en conséquence.

**Liens utilisés (pour référence) :**

Udemy (3 liens pour 4 formations listées sur le CV) :
- `https://www.udemy.com/certificate/UC-c3398a0b-5f2e-4ac3-89ee-2135632edee6/`
- `https://www.udemy.com/certificate/UC-e84cea2d-4ccc-44b5-88a3-855b5c65b082/`
- `https://www.udemy.com/certificate/UC-1e6facf0-d3e3-416e-ba07-6aeb84bf5bae/`

Formations Udemy listées sur le CV :
- Team Leader Fundamentals Professional Certificate
- Art of Leadership: Authentic Influence & Leading from Within
- The Complete Guide to ServiceNow GenAI & Agentic AI
- Master ServiceNow Admin & Development from Basic to Pro

LinkedIn Learning (3 liens pour 4 formations listées sur le CV) :
- `https://www.linkedin.com/learning/certificates/1a303da902cfaa1c3c1b8a9cd7d7b065eb27997fb2d51d89aa5ac763b6cd3e8e`
- `https://www.linkedin.com/learning/certificates/90a212db62ea41481a77e031cdb9c454c454e7004ed99d21af5b00da940520c7`
- `https://www.linkedin.com/learning/certificates/9d81bd46e036148e04e25b9162c8df55ca214054c3c5521a965faecc72fe0b07`

Formations LinkedIn Learning listées sur le CV :
- Découvrir les méthodes agiles pour le développement logiciel
- L'essentiel de Java
- Selenium WebDriver with Java for Beginners
- Développer son intelligence émotionnelle

**Pourquoi aucun lien n'est attribué sur le site actuellement :** ces pages
de certificat nécessitent une authentification et n'ont pas pu être
vérifiées publiquement au moment de la génération. Pour éviter d'associer un
certificat au mauvais intitulé, `certifications.html` affiche les titres sans
bouton de vérification, avec un commentaire HTML explicite dans le `<head>`
de la page.

**Pour corriger :** ouvrez chaque lien vous-même (vous êtes connecté à votre
compte), identifiez le titre exact affiché sur le certificat, puis dans
`certifications.html`, ajoutez pour la carte correspondante :

```html
<a href="URL_VERIFIEE" class="btn btn-outline btn-sm" target="_blank" rel="noopener noreferrer">Voir le certificat</a>
```

Ne modifiez pas les autres cartes tant que leur correspondance n'est pas
vérifiée de la même façon.

---

## 8. Ajouter un nouvel article de blog

1. Dupliquez `blog/article-30.html` et renommez-le, ex. `article-31.html`.
2. Mettez à jour : `<title>`, meta description, canonical, Open Graph,
   JSON-LD (`BlogPosting` et `BreadcrumbList`), titre H1, sommaire, contenu,
   navigation précédent/suivant, articles liés.
3. Ajoutez une carte correspondante dans `blog.html` (`data-article-card`,
   `data-category`, `data-search`) et, si pertinent, dans la section
   « Derniers articles » de `index.html`.
4. Ajoutez l'URL dans `sitemap.xml`.

## 9. Mettre à jour les filtres du blog

Les catégories sont définies dans `blog.html` (boutons `.filter-btn` avec
l'attribut `data-filter`) et dans chaque carte d'article via
`data-category`. Pour ajouter une catégorie, ajoutez un bouton de filtre et
utilisez la même valeur `data-filter` / `data-category` sur les articles
concernés. `js/blog.js` gère automatiquement le filtrage et la recherche
(aucune modification JS nécessaire pour une nouvelle catégorie).

---

## 10. Modifier les métadonnées SEO

Chaque page contient dans son `<head>` : `<title>`, `<meta name="description">`,
`<link rel="canonical">`, balises Open Graph et, sur les pages concernées,
un ou plusieurs blocs `<script type="application/ld+json">` (Person, WebSite,
ProfilePage, BreadcrumbList, Blog, BlogPosting, ItemList). Modifiez ces blocs
directement dans le fichier HTML correspondant.

**Note sur les URLs canoniques des articles de blog :** les fichiers réels
sont nommés `blog/article-01.html` à `blog/article-30.html` (conformément à
la structure de projet demandée). Les balises canoniques utilisent des slugs
descriptifs (ex. `pilotage-projet-ecu-integration-vehicule.html`) pour
respecter la convention SEO demandée. Si vous publiez le site tel quel avec
les noms de fichiers `article-XX.html`, il est recommandé d'aligner les
balises canoniques sur les URLs réelles (`blog/article-XX.html`) pour éviter
toute confusion pour les moteurs de recherche. Vous pouvez aussi renommer les
fichiers avec leurs slugs SEO si vous préférez cette convention — pensez
alors à mettre à jour tous les liens internes et le sitemap en conséquence.

---

## 11. Mettre à jour sitemap.xml

Ajoutez une ligne `<url><loc>...</loc></url>` pour toute nouvelle page ou
tout nouvel article, avec l'URL complète basée sur
`https://taoufikgassem.arena.site/`.

---

## 12. Configurer le formulaire de contact (un seul endroit à modifier)

Le formulaire (`contact.html` / `js/contact.js`) ne dépend d'aucun backend.
Toute la configuration se fait dans **un seul bloc**, tout en haut du fichier
`js/contact.js` :

```js
window.CONTACT_CONFIG = {
  FORM_ENDPOINT: "",     // URL Formspree (recommandé)
  CONTACT_EMAIL: "",     // votre Gmail, utilisé en solution de secours
  CONTACT_PHONE: ""      // optionnel, affiché comme moyen de contact
};
```

Le site s'adapte automatiquement selon ce qui est renseigné, dans cet ordre
de priorité :

### Option A — Recommandée : recevoir les messages directement dans Gmail (Formspree)

1. Allez sur https://formspree.io et créez un compte gratuit avec votre
   adresse Gmail (le plan gratuit permet 50 soumissions par mois).
2. Créez un nouveau formulaire ("New Form"), Formspree vous donne une URL du
   type `https://formspree.io/f/xxxxxxxx`.
3. Formspree vous envoie un email de confirmation sur votre Gmail : cliquez
   sur le lien pour activer le formulaire.
4. Collez cette URL dans `js/contact.js` :
   ```js
   FORM_ENDPOINT: "https://formspree.io/f/xxxxxxxx",
   ```
5. C'est tout. Chaque message envoyé depuis le site arrive désormais
   directement dans votre boîte Gmail, avec le nom, l'email, l'entreprise,
   l'objet et le message du visiteur. Le site affiche un message de succès
   uniquement après une confirmation réelle d'envoi.

### Option B — Solution de secours sans aucun service tiers (mailto)

Si vous ne configurez pas Formspree mais renseignez votre email :
```js
CONTACT_EMAIL: "votre.adresse@gmail.com",
```
Le site ouvre alors automatiquement le logiciel de messagerie du visiteur
(Gmail, Outlook, Mail…) avec un message pré-rempli adressé à cette adresse.
Cette solution ne nécessite aucune inscription, mais dépend du logiciel de
messagerie installé sur l'appareil du visiteur.

### Option C — Aucune configuration

Si `FORM_ENDPOINT` et `CONTACT_EMAIL` restent vides, le site n'affiche
jamais de message du type "impossible d'envoyer" : il remercie le visiteur
et l'oriente immédiatement vers LinkedIn (canal garanti et toujours actif),
ainsi que vers le téléphone et l'email si ceux-ci sont renseignés.

### Afficher le téléphone et/ou l'email comme moyens de contact alternatifs

Sur la page Contact, une section "Autres moyens de me contacter" affiche
automatiquement des cartes LinkedIn (toujours visible), Email et Téléphone.
Les cartes Email et Téléphone n'apparaissent que si vous renseignez
`CONTACT_EMAIL` et/ou `CONTACT_PHONE` dans `js/contact.js` — sinon elles
restent masquées, sans jamais afficher de lien vide ou cassé.

### Autres fournisseurs de formulaire (Netlify Forms, Getform, Basin…)

Vous pouvez utiliser n'importe quel service compatible avec une requête
`POST` classique et un en-tête `Accept: application/json` : collez
simplement son URL de soumission dans `FORM_ENDPOINT`, exactement comme pour
Formspree. Pour Netlify Forms spécifiquement, ajoutez en plus l'attribut
`data-netlify="true"` sur la balise `<form>` dans `contact.html`.

---

## 13. Publier le site sur un hébergement statique

## 13.1 Résumé des dernières mises à jour

- Thème visuel modernisé, inspiré d'iOS : coins très arrondis, boutons en
  forme de pilule, en-tête en verre dépoli (effet "frosted glass"), police
  système SF Pro / -apple-system, filtres de blog façon "segmented control".
- Les mentions "anonymisé(e)(s)" ont été retirées du texte visible (les
  études de cas restent volontairement génériques pour préserver la
  confidentialité, mais ce mot n'apparaît plus explicitement).
- Les boutons d'appel à l'action liés au contact ont été regroupés : un seul
  bouton "Me contacter" dans le Hero et dans la section d'appel final de la
  page d'accueil.
- Toutes les certifications affichent désormais leurs boutons de vérification
  (voir section 7 pour le détail du mapping Udemy / LinkedIn Learning).
- 20 nouveaux articles de blog dédiés à ServiceNow ont été ajoutés
  (`blog/article-31.html` à `blog/article-50.html`), couvrant l'ITSM, la
  certification CSA, la gestion des incidents, le scripting (Business Rules,
  Client Scripts, UI Policies, Script Includes, UI Actions), les Scheduled
  Jobs, les ACL, GlideRecordSecure, le Service Portal, les rapports, les
  Update Sets, la qualité CMDB, la performance d'instance et l'IA générative
  et agentique. Une nouvelle catégorie de filtre "ServiceNow" a été ajoutée
  sur `blog.html`, et `sitemap.xml` a été mis à jour en conséquence.

## 14. Publier le site sur un hébergement statique

Ce site fonctionne sur tout hébergeur de fichiers statiques : Netlify,
Vercel (mode statique), GitHub Pages, Cloudflare Pages, OVH, o2switch, un
simple espace FTP, etc.

1. Copiez l'intégralité du contenu du projet (tous les fichiers et dossiers)
   à la racine de l'espace d'hébergement.
2. Vérifiez que `index.html` est bien servi à la racine du domaine.
3. Aucune configuration serveur particulière n'est nécessaire (pas de PHP,
   pas de base de données, pas de variables d'environnement).
4. Mettez à jour `sitemap.xml` et `robots.txt` si le domaine final diffère
   de `https://taoufikgassem.arena.site`.

---

## 14. Assets manquants à fournir par le titulaire du site

- Photo professionnelle (`assets/images/taoufik-gassem-technical-project-manager.webp` + `.jpg`)
- CV public (`assets/documents/cv-taoufik-gassem.pdf`)
- Certificat ServiceNow CSA (`assets/documents/certifications/servicenow-csa.pdf`)
- Coordonnées légales exactes (hébergeur, directeur de publication, email
  professionnel) dans `privacy.html` et `legal.html`
- Confirmation manuelle du mapping des certificats Udemy / LinkedIn Learning
  (voir section 7 ci-dessus)

Tant que ces éléments ne sont pas fournis, le site affiche des alternatives
propres (initiales TG, mentions « à compléter », boutons masqués) plutôt que
des liens ou images cassés.

---

## 15. Accessibilité et bonnes pratiques

- Navigation clavier complète, focus visible, `aria-expanded`, `aria-current`.
- Menu mobile accessible : piège de focus, fermeture avec `Échap`, blocage du
  scroll d'arrière-plan.
- Respect de `prefers-reduced-motion`.
- Le site reste lisible avec JavaScript désactivé (le contenu principal est
  toujours présent dans le HTML).

---

## 16. Licence des contenus

Les textes de ce site sont la propriété de Taoufik GASSEM. Le code
(HTML/CSS/JS) peut être réutilisé et adapté librement pour un usage
personnel.
