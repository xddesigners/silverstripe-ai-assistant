<?php

namespace XD\SilverstripeAIAssistant\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\View\Requirements;

/**
 * Class LeftAndMainExtension
 * @package XD\SilverstripeAIAssistant\Extensions
 * @property \SilverStripe\Admin\LeftAndMain $owner
 */
class LeftAndMainExtension extends Extension
{
    public function onInit()
    {
        Requirements::css('xddesigners/silverstripe-ai-assistant:client/dist/styles/ai-assistant.css');
        // Load the i18n dictionaries (en fallback + current locale) before the script that uses them.
        Requirements::add_i18n_javascript('xddesigners/silverstripe-ai-assistant:client/dist/lang');
        Requirements::javascript('xddesigners/silverstripe-ai-assistant:client/dist/js/ai-assistant.js');
    }
}
