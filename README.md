# Bordeaux → Soule, 3–8 septembre 2026

Page statique privée pour le voyage. Publiée via GitHub Pages, non indexée
(`robots.txt` + `<meta name="robots" content="noindex">`).

## Modifier le programme

Tout le contenu est dans `app.js` :

- `TRIP` — un objet par journée : horaires, lieux, notes, et les variantes du dîner.
- `PRACTICAL` — les encadrés « Le nécessaire » en bas de page.

Chaque journée porte ses coordonnées (`lat`, `lon`) et sa `date`. La météo est
récupérée chez [Open-Meteo](https://open-meteo.com/) à chaque ouverture de la page :
pas de clé d'API, pas de serveur. La température du jour choisit la couleur de la
journée et la variante du dîner (`hot` au-dessus de 30 °C, `wet` s'il tombe plus de
3 mm, `mild` sinon ; `fixed` pour les soirs qui ne dépendent pas du temps).

Après modification : `git commit` + `git push`, la page se met à jour toute seule.

## Photos

Wikimedia Commons, licences et auteurs dans `img/credits.json`, également affichés
en pied de page.
