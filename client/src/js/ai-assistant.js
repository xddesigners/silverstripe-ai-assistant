(function ($) {
    $.entwine("ss", function ($) {

        // Translate helper: use the CMS i18n dictionary when available, fall back to English.
        function t(key, fallback) {
            return (window.ss && ss.i18n) ? ss.i18n._t(key, fallback) : fallback;
        }

        // Non-blocking inline notice shown inside the AI tab (replaces alert()).
        function notify(message, type, $btn) {
            const colors = { error: "#c0392b", info: "#31708f" };
            let $anchor = ($btn && $btn.closest(".ai-assistant-actions").length)
                ? $btn.closest(".ai-assistant-actions")
                : $(".ai-assistant-actions").first();

            if (!$anchor.length) {
                alert(message); // last-resort fallback if the tab markup is absent
                return;
            }

            $anchor.find(".ai-assistant-message").remove();

            const $msg = $('<div class="ai-assistant-message" role="alert"></div>')
                .text(message)
                .css({
                    margin: "8px 0",
                    padding: "8px 12px",
                    borderRadius: "4px",
                    color: "#fff",
                    background: colors[type] || colors.info
                });

            $anchor.append($msg);
            setTimeout(function () {
                $msg.fadeOut(300, function () { $msg.remove(); });
            }, 5000);
        }

        $(".js-ai-generate").entwine({
            onclick: function (e) {
                e.preventDefault();

                const button = this;
                const form = button.closest("form");

                button.prop("disabled", true).text(t("AIAssistant.GENERATING", "Generating…"));

                // Instructions (AI prompt)
                const instructions = form
                    .find("#Form_EditForm_AIAssistantPrompt")
                    .val() || "";

                // Collect assisted fields (context)
                const context = {};
                const fields = [];

                form.find("[name^='AIAssistantInfo_']").each(function () {
                    const fieldName = this.name.replace("AIAssistantInfo_", "");
                    fields.push(fieldName);

                    if (window.tinymce && tinymce.get(this.id)) {
                        context[fieldName] = tinymce
                            .get(this.id)
                            .getContent();
                    } else {
                        context[fieldName] = $(this).val();
                    }
                });

                // CSRF
                const securityID = form.find("input[name='SecurityID']").val();

                const payload = {
                    SecurityID: securityID,
                    mode: "fields",
                    instructions: instructions,
                    context: context,
                    fields: fields
                };

                $.ajax({
                    type: "POST",
                    url: "/ai/generate",
                    dataType: "json",
                    data: payload,

                    success: function (response) {
                        if (response.error) {
                            notify(response.error, "error", button);
                            return;
                        }

                        if (!response.fields) {
                            notify(t("AIAssistant.INVALID_RESPONSE", "Invalid AI response"), "error", button);
                            return;
                        }

                        // Populate AI preview fields only
                        $.each(response.fields, function (fieldName, value) {
                            const aiField = $(
                                "#Form_EditForm_AIAssistantInfo_" + fieldName
                            );

                            if (!aiField.length) return;

                            if (
                                window.tinymce &&
                                tinymce.get(aiField.attr("id"))
                            ) {
                                tinymce
                                    .get(aiField.attr("id"))
                                    .setContent(value);
                            } else {
                                aiField.val(value);
                            }
                        });
                    },

                    error: function (xhr) {
                        // Prefer the server's (translated) error, e.g. rate-limit or CSRF messages.
                        let msg = t("AIAssistant.REQUEST_FAILED", "AI request failed");
                        if (xhr && xhr.responseJSON && xhr.responseJSON.error) {
                            msg = xhr.responseJSON.error;
                        }
                        notify(msg, "error", button);
                    },

                    complete: function () {
                        button
                            .prop("disabled", false)
                            .text(t("AIAssistant.GENERATE_CONTENT", "Generate content"));
                    }
                });
            }
        });

        $(".js-ai-accept").entwine({
            onclick: function (e) {
                e.preventDefault();

                const button = this;
                const form = button.closest("form");

                // Collect checked field names for the confirmation message
                const fieldsToUpdate = [];
                form.find("[name^='AIAssistantAccept_']").each(function () {
                    if ($(this).is(":checked")) {
                        fieldsToUpdate.push(this.name.replace("AIAssistantAccept_", ""));
                    }
                });

                if (!fieldsToUpdate.length) {
                    notify(t("AIAssistant.NO_FIELDS_SELECTED", "No fields selected. Please check at least one field to overwrite."), "error", button);
                    return;
                }

                // Native confirm is intentional here: overwriting real content is destructive.
                const confirmMessage = t("AIAssistant.CONFIRM_OVERWRITE", "Are you sure you want to overwrite the following fields with AI content?");
                if (!confirm(confirmMessage + "\n\n- '" + fieldsToUpdate.join("'\n- '") + "'")) {
                    return;
                }

                form.find("[name^='AIAssistantInfo_']").each(function () {
                    const aiField = $(this);
                    const fieldName = aiField.attr("name").replace("AIAssistantInfo_", "");

                    // Skip fields whose accept checkbox is unchecked
                    const acceptCheckbox = form.find("[name='AIAssistantAccept_" + fieldName + "']");
                    if (acceptCheckbox.length && !acceptCheckbox.is(":checked")) {
                        return;
                    }

                    const realField = form.find("[name='" + fieldName + "']");

                    if (!realField.length) return;

                    let value = "";
                    if (window.tinymce && tinymce.get(aiField.attr("id"))) {
                        value = tinymce.get(aiField.attr("id")).getContent();
                    } else {
                        value = aiField.val();
                    }

                    if (window.tinymce && tinymce.get(realField.attr("id"))) {
                        tinymce.get(realField.attr("id")).setContent(value);
                        // Trigger change manually
                        $(tinymce.get(realField.attr("id")).getContainer()).trigger("change");
                    } else {
                        realField.val(value).trigger("change");
                    }
                });

                // Feedback
                button.text(t("AIAssistant.CONTENT_ACCEPTED", "Content Accepted")).prop("disabled", true);
                setTimeout(() => button.text(t("AIAssistant.ACCEPT_AI_CONTENT", "Accept AI Content")).prop("disabled", false), 2000);
            }
        });

    });
})(jQuery);
