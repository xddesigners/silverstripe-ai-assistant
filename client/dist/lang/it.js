// AI Assistant CMS strings (classic ss.i18n dictionary)
if (typeof(ss) === 'undefined' || typeof(ss.i18n) === 'undefined') {
  if (typeof(console) !== 'undefined') { // eslint-disable-line no-console
    console.error('Class ss.i18n not defined'); // eslint-disable-line no-console
  }
} else {
  ss.i18n.addDictionary('it', {
    "AIAssistant.GENERATING": "Generazione in corso…",
    "AIAssistant.GENERATE_CONTENT": "Genera contenuto",
    "AIAssistant.ACCEPT_AI_CONTENT": "Accetta contenuto AI",
    "AIAssistant.CONTENT_ACCEPTED": "Contenuto accettato",
    "AIAssistant.INVALID_RESPONSE": "Risposta AI non valida",
    "AIAssistant.REQUEST_FAILED": "Richiesta AI non riuscita",
    "AIAssistant.NO_FIELDS_SELECTED": "Nessun campo selezionato. Seleziona almeno un campo da sovrascrivere.",
    "AIAssistant.CONFIRM_OVERWRITE": "Sei sicuro di voler sovrascrivere i seguenti campi con il contenuto AI?"
  });
}
