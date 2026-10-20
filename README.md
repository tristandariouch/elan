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
