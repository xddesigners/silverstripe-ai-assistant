// AI Assistant CMS strings (classic ss.i18n dictionary)
if (typeof(ss) === 'undefined' || typeof(ss.i18n) === 'undefined') {
  if (typeof(console) !== 'undefined') { // eslint-disable-line no-console
    console.error('Class ss.i18n not defined'); // eslint-disable-line no-console
  }
} else {
  ss.i18n.addDictionary('nl', {
    "AIAssistant.GENERATING": "Bezig met genereren…",
    "AIAssistant.GENERATE_CONTENT": "Inhoud genereren",
    "AIAssistant.ACCEPT_AI_CONTENT": "AI-inhoud accepteren",
    "AIAssistant.CONTENT_ACCEPTED": "Inhoud geaccepteerd",
    "AIAssistant.INVALID_RESPONSE": "Ongeldig AI-antwoord",
    "AIAssistant.REQUEST_FAILED": "AI-verzoek mislukt",
    "AIAssistant.NO_FIELDS_SELECTED": "Geen velden geselecteerd. Vink minstens één veld aan om te overschrijven.",
    "AIAssistant.CONFIRM_OVERWRITE": "Weet je zeker dat je de volgende velden wilt overschrijven met AI-inhoud?"
  });
}
