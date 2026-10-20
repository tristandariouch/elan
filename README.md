# Élan — React

Prototype React pour trouver sa direction, valoriser son parcours et suivre ses candidatures.

## Démarrer

```sh
pnpm install
pnpm dev
```

## Vérifier et construire

```sh
pnpm test
pnpm test:ui
pnpm build
```

React et React DOM animent les écrans. Vite sert le projet en développement ; esbuild produit une version statique portable, utilisable sans serveur ou sur GitHub Pages.

## Organisation

- `src/App.jsx` : composants de navigation, accueil, orientation, profil, offres, documents, envoi et suivi.
- `src/model.js` : données de démonstration, périodes, tri, migration des profils et pistes d’orientation.
- `src/styles.css` : interface et adaptations mobiles.
- `public/assets/` : logo abstrait, vidéo originale, sous-titres et transcription.
- `tests/` et `scripts/check-ui.mjs` : tests des données et des interactions React.
- `docs/` : version compilée à publier avec GitHub Pages.

## GitHub Pages

Dans **Settings → Pages**, sélectionner **Deploy from a branch**, puis **main** et **/docs**. La visibilité et l’abonnement du dépôt doivent permettre GitHub Pages. Ne pas changer la visibilité du dépôt sans accord de son propriétaire.

Après modification : `pnpm build`, puis copier le contenu de `dist/` dans `docs/` et enregistrer les changements.

## Périmètre du prototype

Offres fictives, orientation guidée et matching illustratif. Aucune collecte d’annonces, IA conversationnelle, écoute du microphone ou boîte mail connectée. Les dossiers proposent des textes modifiables. L’atelier CV lit les PDF avec texte, les Word .docx et les .txt localement ; il propose deux modèles et un export PDF avec texte sélectionnable. Aucun envoi automatique.

Les données restent dans le navigateur (`elan-v3`). Les profils de l’ancien prototype sont repris. L’histoire personnelle est facultative, hors classement des offres et insérée dans une lettre seulement sur choix explicite dans ce dossier.

Le logo est un SVG original inspiré des bois de l’élan. La vidéo de présentation est une création originale, avec une voix française synthétique et des exemples fictifs. Le lecteur se trouve dans « Découvrir Élan ». Ce prototype n’est pas une validation juridique pour une mise en production avec de vraies données.

## Connexion et contact

Les écrans sont prêts et le code de connexion utilise Supabase Auth (Google, Apple, LinkedIn OIDC). Sans configuration, les boutons restent désactivés : aucun compte fictif n’est créé. Renseigner uniquement les variables publiques de `.env.example` après configuration des fournisseurs et de leur URL de retour dans Supabase. Aucun accès à Gmail ou import LinkedIn n’est demandé. Le profil local n’est pas encore synchronisé au compte.

`VITE_CONTACT_EMAIL` reste vide tant qu’aucune adresse publique n’est choisie. Le formulaire prépare alors un message copiable sans l’envoyer ni l’enregistrer. Avec une adresse configurée, il ouvre la messagerie du visiteur, qui confirme lui-même l’envoi.

L’offre envisagée est de cinq candidatures gratuites puis un abonnement. Le quota, la facturation et les tarifs ne sont pas activés. Un contrôle serveur est nécessaire avant lancement commercial. Aucune clé OpenAI n’est configurée et aucun appel IA payant n’est effectué.

## Atelier CV

Dans Mon profil, ouvrir « Importer et retravailler mon CV », ou aller à `#cv`. Le PDF est lu par PDF.js ; le Word par Mammoth (texte brut uniquement). Les fichiers et aperçus restent dans IndexedDB sur cet appareil ; le brouillon et les rubriques sont conservés dans `elan-v3`. Aucun document n’est envoyé à un serveur. Ne jamais publier un vrai CV dans `public/`, `docs/`, les tests ou le dépôt.

Limites : 12 Mo, 12 pages PDF, pas d’OCR pour les scans et pas de prise en charge du vieux format .doc. La répartition des rubriques repose sur des règles et doit être vérifiée. La mise à jour du profil nécessite un clic de validation. Les niveaux de langue ambigus ne sont pas convertis en une certification. Les deux modèles exportent avec jsPDF ; pour les écritures non latines, utiliser l’impression du navigateur. Les consignes de réécriture sont conservées mais ne sont pas exécutées par une IA.

Les versions de PDF.js dans `public/assets/pdfjs/` sont celles du paquet verrouillé et conservent sa licence.

## Essai personnel en local

Lancer `node scripts/build.mjs`, puis `node scripts/start-local.mjs`. L’interface est servie uniquement sur `http://127.0.0.1:4180/#home`. Sur ce Mac, le fichier `Lancer Élan.command` reconstruit et ouvre l’essai. Garder le terminal ouvert ; Ctrl+C arrête le serveur.

Une nouvelle session sur cette adresse commence avec un profil vide et une sélection de six annonces publiques recherchées le 20 octobre 2026. Ces annonces sont datées et doivent être vérifiées auprès de la source ; le flux public Open Data du Forem est désormais connecté en local, via `/api/offers`. Glassdoor n’a pas pu être lu complètement pendant la recherche et n’est pas présenté comme connecté.

Le parcours personnel recueille le parcours, la direction, les activités souhaitées, les contraintes et un récit facultatif validé par l’utilisateur. Le tri local repose sur des mots-clés des champs professionnels avec priorité aux envies professionnelles ; il n’utilise pas le récit personnel et ne remplace pas une analyse de compétences.

Chaque candidature conserve sa copie de CV de base et une version indépendante pour l’offre. Le titre du CV est aligné sur le poste ; aucune expérience n’est ajoutée. Le comparatif et les raisons de changement restent modifiables. La lettre garde sa trame de départ et ne reprend un récit validé qu’après un choix explicite pour ce dossier. Les consignes de réécriture sont conservées mais non exécutées. Aucune API IA payante n’est activée.

Ces modifications sont préparées pour l’essai local ; leur publication sur GitHub Pages est une étape distincte.


### Parcours et source connectée (20 octobre 2026)

L’accueil reste l’accueil, avec vidéo et formules indicatives. `#trial` recueille le profil en cinq étapes, puis ouvre l’unique catalogue `#offers`. Le mode réorientation donne priorité aux envies ; les exclusions de métiers s’appliquent aux suggestions, sans cacher les dossiers ou favoris existants.

Le serveur local interroge uniquement `https://www.odwb.be/api/explore/v2.1/catalog/datasets/offres-d-emploi-forem/records`, par intitulé et métier, 100 résultats par page, maximum 10 000 par recherche (limite de pagination). Il envoie les mots-clés explicites, jamais le CV ou le récit. Cache serveur 24 heures ; actualisation au retour après 24 heures ou toutes les 24 heures tant que la page offres reste ouverte. Pas de traitement quand serveur / application fermés. Le catalogue total n’est pas intégralement téléchargé. Les dates sont celles de publication pour le Forem, de repérage pour la sélection manuelle. Le Forem fournit des métadonnées, pas une description complète. Aucun accès automatique à LinkedIn, Glassdoor, Student.be ou AlterJob.

Le rafraîchissement conserve statuts, réponses, versions et pièces des candidatures. Une copie immuable des informations disponibles de l’annonce est créée au démarrage du dossier ; une description complète peut être ajoutée et téléchargée depuis `#archive/<id>`. La copie est locale, pas une sauvegarde cloud. La disponibilité d’une offre doit être confirmée sur le site source.

Le brouillon utilise aussi les compétences, outils et exemples professionnels du profil. Des libellés de compétences transférables sont ajoutés aux seules missions à puces concernées, sous leur employeur d’origine. Les intitulés passés et les outils ne sont pas inventés. Le moteur reste à règles : aucune compréhension sémantique générale, aucun dialogue de réécriture IA. Les demandes libres sont des notes, pas des instructions exécutées. Tests : `node --test tests/*.test.mjs` et `node scripts/check-ui.mjs`.

### Correctifs de robustesse et géographie

Les données anciennes sont normalisées à la lecture et après modification (tableaux de langues, compétences, exemples et orientation, champs texte manquants) sans suppression des dossiers. Chaque rubrique est isolée par une limite d’erreur React : un échec de rendu affiche une récupération locale en conservant le menu, au lieu d’une page entièrement blanche. Tests de profil et d’orientation exécutés aussi en StrictMode, avec modification des envies, validation d’une piste et retour au profil.

Recherche : pays Belgique / France / tous les pays du flux ; provinces belges et Bruxelles par codes NUTS du Forem. La France peut avoir très peu de résultats dans cette source : France Travail reste une source à connecter. Un changement de direction ou de zone déclenche une nouvelle recherche après un délai de saisie ; les requêtes obsolètes sont annulées. Le nombre renvoyé par le fournisseur est distingué du nombre après exclusions locales. Les liens vers les autres plateformes sont des recherches externes, pas des connecteurs.

Le dossier dispose d’un export de consigne pour tester une IA externe manuellement (copie ou fichier texte). Aucun appel à une API IA n’est ajouté, aucun compte créé et aucun fichier n’est téléversé par Élan. Cet export reprend le CV et son contact éventuel, les éléments professionnels et le récit seulement s’il est autorisé dans cette lettre. L’utilisateur choisit le service et les informations à partager. Aucun abonnement payant n’est activé.

Cause reproduite des pages blanches : l’effet de défilement d’Orientation retournait implicitement le résultat de `scrollIntoView`. Le navigateur intégré renvoyait une valeur que React essayait ensuite d’appeler comme fonction de nettoyage en quittant la rubrique. L’effet utilise désormais un bloc sans retour implicite. Le test UI simule ce retour et vérifie orientation → profil ainsi que la modification et validation d’une piste. Le trajet a aussi été vérifié dans le navigateur intégré après correction.

### Ambiance et situations vécues

« Mon ambiance » est une rubrique dédiée du profil, avec trois choix expliqués et illustrés : chaleureuse, légère, sobre/directe. Le choix est conservé et adapte certaines formulations d’accompagnement (menu, introduction de l’orientation) ; le ton des lettres reste professionnel et distinct.

Dans les compétences, le contexte, l’action et le résultat sont séparés. L’aperçu à règles propose au maximum trois hypothèses de compétences, explique leurs limites et exige une action renseignée et une validation avant ajout au profil. Deux exemples fictifs illustrent le mécanisme. Une urgence ne devient pas automatiquement une preuve de résistance au stress. Les thèmes d’un récit personnel peuvent suggérer des pistes, ajoutées aux envies seulement sur choix explicite ; aucune origine, personnalité ou qualification n’est déduite. L’analyse générale par IA reste non connectée.

### Suivi et préparation d’entretien

Statuts distincts : en préparation, envoyée, retenue pour un entretien, offre d’embauche reçue, embauche confirmée, refusée. Un entretien ou une offre reçue donne accès à `#interview/<id>` : annonce conservée, dossier préparé, notes sourcées sur le site officiel de l’organisation, neuf questions guidées, réponses persistantes, grille de relecture STAR et export d’une consigne de simulation pour une IA externe. La lecture du site et le dialogue adaptatif ne sont pas connectés ; aucune API payante ou gratuite n’a été activée. Les scénarios sont identifiés comme fictifs, sans prétendre connaître les questions réelles d’un employeur ou juger la personnalité du candidat.

### Parcours validé appliqué à l’interface

L’accueil présente désormais trois entrées : objectif connu, réorientation, offre déjà trouvée. Les deux premières partagent le profil ; l’offre peut être ajoutée d’abord dans une page dédiée avec un brouillon persistant. Le profil terminé revient à l’offre concernée, à l’orientation ou au catalogue suivant le choix initial. L’ancien `#trial` ouvre le profil commun. Les activités souhaitées, activités à éviter et secteurs restent éditables. La vidéo, l’exemple illustratif avant/après et les tarifs restent sur l’accueil ; l’accès aux tarifs reste dans le menu.

À la confirmation des prochains envois, une copie distincte du CV et de la lettre est conservée dans `sentDocuments`. Les modifications ultérieures du brouillon ne l’écrasent pas ; l’export d’entretien donne priorité au CV et à la lettre de cette copie. Les dossiers déjà envoyés avant ce changement n’obtiennent pas rétroactivement une copie prétendue exacte. Les trois points d’entrée, la conservation d’une annonce importée et la séparation des documents envoyés sont couverts par les vérifications.
