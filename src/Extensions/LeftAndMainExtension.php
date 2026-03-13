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
        Requirements::javascript('xddesigners/silverstripe-ai-assistant:client/dist/js/ai-assistant.js');
    }
}
