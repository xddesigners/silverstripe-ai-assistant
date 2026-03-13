(function ($) {
    $.entwine("ss", function ($) {

        $(".js-ai-generate").entwine({
            onclick: function (e) {
                e.preventDefault();

                const button = this;
                const form = button.closest("form");

                button.prop("disabled", true).text("Generating…");

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

                console.log("AI Request Payload:", payload);

                $.ajax({
                    type: "POST",
                    url: "/ai/generate",
                    dataType: "json",
                    data: payload,

                    success: function (response) {
                        if (response.error) {
                            alert(response.error);
                            return;
                        }

                        if (!response.fields) {
                            alert("Invalid AI response");
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

                    error: function () {
                        alert("AI request failed");
                    },

                    complete: function () {
                        button
                            .prop("disabled", false)
                            .text("Generate content");
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
                    alert("No fields selected. Please check at least one field to overwrite.");
                    return;
                }

                if (!confirm("Are you sure you want to overwrite the following fields with AI content?\n\n- '" + fieldsToUpdate.join("'\n- '") + "'")) {
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
                button.text("Content Accepted").prop("disabled", true);
                setTimeout(() => button.text("Accept AI Content").prop("disabled", false), 2000);
            }
        });

    });
})(jQuery);
