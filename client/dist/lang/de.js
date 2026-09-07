// AI Assistant CMS strings (classic ss.i18n dictionary)
if (typeof(ss) === 'undefined' || typeof(ss.i18n) === 'undefined') {
  if (typeof(console) !== 'undefined') { // eslint-disable-line no-console
    console.error('Class ss.i18n not defined'); // eslint-disable-line no-console
  }
} else {
  ss.i18n.addDictionary('de', {
    "AIAssistant.GENERATING": "Wird generiert…",
    "AIAssistant.GENERATE_CONTENT": "Inhalt generieren",
    "AIAssistant.ACCEPT_AI_CONTENT": "KI-Inhalt übernehmen",
    "AIAssistant.CONTENT_ACCEPTED": "Inhalt übernommen",
    "AIAssistant.INVALID_RESPONSE": "Ungültige KI-Antwort",
    "AIAssistant.REQUEST_FAILED": "KI-Anfrage fehlgeschlagen",
    "AIAssistant.NO_FIELDS_SELECTED": "Keine Felder ausgewählt. Bitte wählen Sie mindestens ein Feld zum Überschreiben aus.",
    "AIAssistant.CONFIRM_OVERWRITE": "Sind Sie sicher, dass Sie die folgenden Felder mit KI-Inhalt überschreiben möchten?"
  });
}
