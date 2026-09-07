// AI Assistant CMS strings (classic ss.i18n dictionary)
if (typeof(ss) === 'undefined' || typeof(ss.i18n) === 'undefined') {
  if (typeof(console) !== 'undefined') { // eslint-disable-line no-console
    console.error('Class ss.i18n not defined'); // eslint-disable-line no-console
  }
} else {
  ss.i18n.addDictionary('fr', {
    "AIAssistant.GENERATING": "Génération en cours…",
    "AIAssistant.GENERATE_CONTENT": "Générer le contenu",
    "AIAssistant.ACCEPT_AI_CONTENT": "Accepter le contenu IA",
    "AIAssistant.CONTENT_ACCEPTED": "Contenu accepté",
    "AIAssistant.INVALID_RESPONSE": "Réponse IA invalide",
    "AIAssistant.REQUEST_FAILED": "Échec de la requête IA",
    "AIAssistant.NO_FIELDS_SELECTED": "Aucun champ sélectionné. Veuillez cocher au moins un champ à écraser.",
    "AIAssistant.CONFIRM_OVERWRITE": "Voulez-vous vraiment écraser les champs suivants avec le contenu IA ?"
  });
}
