# silverstripe-ai-assistant

CMS AI assistant UI for SilverStripe, powered by [xddesigners/silverstripe-ai](../silverstripe-ai).

Adds an **Assistant** tab to CMS edit forms, letting editors generate and preview AI-written content for any configured fields — without overwriting the real content until they explicitly accept it.

## Requirements

- SilverStripe Framework `^6`
- SilverStripe Admin `^3`
- [xddesigners/silverstripe-ai](https://github.com/xddesigners/silverstripe-ai) `^1.0`
- PHP `^8.1`

## Installation

```bash
composer require xddesigners/silverstripe-ai-assistant
```

Run a `dev/build` after installation:

```bash
sake dev/build flush=1
```

## Configuration

The module requires the [silverstripe-ai environment variables](../silverstripe-ai/README.md#configuration) to be set. Copy `.env.example` as a starting point:

```env
AI_PLATFORM_TYPE="openai"
AI_MODEL="gpt-4o-mini"
AI_API_KEY="sk-xxx"
```

### Default setup

Out of the box, the assistant is applied to:

- `SiteTree` — fields: `Title`, `Content`, `MetaDescription`
- `DNADesign\Elemental\Models\ElementContent` — fields: `Title`, `HTML`

### Applying the assistant to your own DataObjects

Add `AIAssistantExtension` to any DataObject and list the database fields you want included:

```yaml
App\Models\MyDataObject:
  extensions:
    - XD\SilverstripeAIAssistant\Extensions\AIAssistantExtension
  ai_assisted_fields:
    - Title
    - Summary
    - MetaDescription
```

Run `dev/build flush=1` after updating the config.

## How it works

Once installed, each configured DataObject gets an **Assistant** tab in its CMS edit form, inserted after the Main tab.

The tab contains:

1. **AI prompt** — a textarea where the editor provides instructions (e.g. *"Improve for SEO while keeping the same tone of voice"*).
2. **Generate content** button — sends the current field values as context to the `/ai/generate` endpoint and populates preview copies of the configured fields with the AI response.
3. **AI-assisted fields** — read-only previews of the AI-generated content. TinyMCE (HTML) fields are fully supported.
4. **Accept AI Content** button — copies the previewed AI content into the real CMS fields. A confirmation dialog is shown before any values are overwritten.

Saving the record is always a separate, explicit action — accepting the AI content only updates the live form fields.

## Customising the default AI instructions

The default system instruction (`"You are a helpful assistant and SEO expert."`) can be changed in YAML:

```yaml
XD\SilverstripeAI\Services\AIClient:
  default_instructions: 'You are an expert copywriter for a sustainable fashion brand.'
```

Editors can also override instructions per-generation using the AI prompt textarea in the CMS.

## License

BSD-3-Clause © [XD Designers](https://xd.nl)
