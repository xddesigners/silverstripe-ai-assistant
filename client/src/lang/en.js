// AI Assistant CMS strings (classic ss.i18n dictionary)
if (typeof(ss) === 'undefined' || typeof(ss.i18n) === 'undefined') {
  if (typeof(console) !== 'undefined') { // eslint-disable-line no-console
    console.error('Class ss.i18n not defined'); // eslint-disable-line no-console
  }
} else {
  ss.i18n.addDictionary('en', {
    "AIAssistant.GENERATING": "Generating…",
    "AIAssistant.GENERATE_CONTENT": "Generate content",
    "AIAssistant.ACCEPT_AI_CONTENT": "Accept AI Content",
    "AIAssistant.CONTENT_ACCEPTED": "Content Accepted",
    "AIAssistant.INVALID_RESPONSE": "Invalid AI response",
    "AIAssistant.REQUEST_FAILED": "AI request failed",
    "AIAssistant.NO_FIELDS_SELECTED": "No fields selected. Please check at least one field to overwrite.",
    "AIAssistant.CONFIRM_OVERWRITE": "Are you sure you want to overwrite the following fields with AI content?"
  });
}
