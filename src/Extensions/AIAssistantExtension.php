<?php

namespace XD\SilverstripeAIAssistant\Extensions;

use SilverStripe\Core\Extension;
use SilverStripe\Forms\CheckboxField;
use SilverStripe\Forms\FieldList;
use SilverStripe\Forms\HeaderField;
use SilverStripe\Forms\LiteralField;
use SilverStripe\Forms\TextareaField;
use SilverStripe\ORM\FieldType\DBHTMLText;
use SilverStripe\ORM\FieldType\DBHTMLVarchar;
use XD\SilverstripeAI\Services\AIClient;

class AIAssistantExtension extends Extension
{
    private static $ai_assisted_fields = [
        'Title',
    ];

    public function updateCMSFields(FieldList $fields)
    {

        if(!AIClient::isEnabled()) {
            return;
        }

        // create tab for AI assistant
        $tab = $fields->findOrMakeTab('Root.AI', _t(__CLASS__ . '.AssistantTabName', 'Assistant'));
        $tab->addExtraClass('ai-assistant-tab');

        // AI prompt
        $fields->addFieldToTab(
            'Root.AI',
            TextareaField::create('AIAssistantPrompt', _t(__CLASS__ . '.AIPrompt', 'AI prompt'))
                ->addExtraClass('ai-assistant-prompt')
                ->setDescription(_t(
                    __CLASS__ . '.AIPromptDescription',
                    'Provide instructions for the AI assistant'
                ))
                ->setValue(_t(
                    __CLASS__ . '.AIPromptPlaceholder',
                    'Improve the website content based on the existing content and the title. Keep the same tone of voice and style.'
                ))
        );

        // Generate button
        $fields->addFieldToTab(
            'Root.AI',
            LiteralField::create('generateContent1', '<div class="form-group ai-assistant-actions">
                <div class="form__field-holder">
                    <button type="button" class="btn btn-primary js-ai-generate font-icon-sync">' . _t(__CLASS__ . '.GenerateContent', 'Generate content') . '</button>
                    <button type="button" class="btn btn-warning js-ai-accept font-icon-tick">' . _t(__CLASS__ . '.AcceptAIContent', 'Accept AI Content') . '</button>
                </div>
            </div>')
        );

        // Header for AI-assisted fields
        $fields->addFieldToTab(
            'Root.AI',
            HeaderField::create('AIAssistedFieldsHeader', _t(__CLASS__ . '.AIAssistedFields', 'AI Assisted Fields'))
        );

        $assistedFields = array_unique($this->owner->config()->get('ai_assisted_fields'));

        if (count($assistedFields) > 0) {
            foreach ($assistedFields as $fieldName) {
                if (!$this->owner->hasField($fieldName)) {
                    continue;
                }

                $ownerClass = $this->owner->ClassName;

                $aiField = $this->owner
                    ->dbObject($fieldName)
                    ->scaffoldFormField(
                        _t($ownerClass . '.' . $fieldName, $fieldName)
                    );

                if (!$aiField) {
                    continue;
                }

                // Clone field for AI assistant
                $aiField->setName("AIAssistantInfo_$fieldName");
                $aiField->addExtraClass('ai-assisted-field');
                $aiField->setTitle(_t($ownerClass . '.' . $fieldName, $fieldName));
                $aiField->setValue($this->owner->$fieldName);

                $fields->addFieldToTab('Root.AI', $aiField);

                // Checkbox to control whether this field is overwritten on accept
                $fields->addFieldToTab(
                    'Root.AI',
                    CheckboxField::create(
                        "AIAssistantAccept_$fieldName",
                        $acceptFieldTitle = _t(
                            __CLASS__ . '.AcceptField',
                            'Accept <span class="ai-accept-field-field">\'{fieldName}\'</span>',
                            ['fieldName' => $fieldName]
                        )
                    )->setTitle(DBHTMLVarchar::create()->setValue($acceptFieldTitle))
                        ->setValue(1)
                        ->addExtraClass('ai-accept-field')
                );
            }
        }

        // Generate button (bottom)
        $fields->addFieldToTab(
            'Root.AI',
            LiteralField::create('generateContent2', '<div class="form-group ai-assistant-actions">
                <div class="form__field-holder">
                    <button type="button" class="btn btn-primary js-ai-generate font-icon-sync">' . _t(__CLASS__ . '.GenerateContent', 'Generate content') . '</button>
                    <button type="button" class="btn btn-warning js-ai-accept font-icon-tick">' . _t(__CLASS__ . '.AcceptAIContent', 'Accept AI Content') . '</button>
                </div>
            </div>')
        );

        $rootTabs = $fields->fieldByName('Root');
        $aiTab = $rootTabs->fieldByName('AI');

        if ($aiTab && $rootTabs) {
            $rootTabs->removeByName('AI');

            // Insert after Root.Main
            $rootTabs->insertAfter(
                'Main',
                $aiTab
            );
        }
    }
}
