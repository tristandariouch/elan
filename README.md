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
- `public/assets/` : logo et mascotte.
- `tests/` et `scripts/check-ui.mjs` : tests des données et des interactions React.
- `docs/` : version compilée à publier avec GitHub Pages.

## GitHub Pages

Dans **Settings → Pages**, sélectionner **Deploy from a branch**, puis **main** et **/docs**. La visibilité et l’abonnement du dépôt doivent permettre GitHub Pages. Ne pas changer la visibilité du dépôt sans accord de son propriétaire.

Après modification : `pnpm build`, puis copier le contenu de `dist/` dans `docs/` et enregistrer les changements.

## Périmètre du prototype

Offres fictives, orientation guidée et matching illustratif. Aucune collecte d’annonces, IA conversationnelle, écoute du microphone ou boîte mail connectée. Les documents sont modifiables et exportables en texte ; aucun envoi automatique.

Les données restent dans le navigateur (`elan-v3`). Les profils de l’ancien prototype sont repris. L’histoire personnelle est facultative, hors classement des offres et insérée dans une lettre seulement sur choix explicite dans ce dossier.

La mascotte est une illustration générée pour le projet et le logo est un SVG original. Ce prototype n’est pas une validation juridique pour une mise en production avec de vraies données.
