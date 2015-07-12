var IO = {}

IO.input = (function(jquery){
    // Public
    function registerKeyPressEvents() {
        jquery(document).keydown(function(evt) {
            evt = evt || window.event;
            var charCode = evt.which || evt.keyCode;
            evt.preventDefault()

            if (charCode === CONSTANTS.ENTER_KEY) {
                var currenText = getCurrentText();
                saveRow(currenText);
                parseCommand(currenText);
            } else {
                var charTyped = String.fromCharCode(charCode);
                IO.output.setCurrentText(getCurrentText().concat(charTyped))
            }
        });
    }

    // Private
    function getCurrentText() {
        var raw = jquery(CONSTANTS.activeRow).text();
        var parsed = raw.replace(CONSTANTS.TYPE_INDICATOR, "");
        return parsed
    }

    function saveRow(rawText) {
      jquery(CONSTANTS.activeRow).text(rawText)
    }

    function parseCommand(rawCommand) {
        SYSTEM.commands.execute(cleanUpCommandFromIndicator(rawCommand.toLowerCase()));
    }

    function cleanUpCommandFromIndicator(commmandWithIndicator) {
      // var actualText = commmandWithIndicator
      // var promptText = CONSTANTS.CL_PROMPT
      //
      // if (actualText.length <= promptText.length) {
      //   return actualText
      // } else {
      //   return actualText.slice(promptText.length - 1, actualText.length);
      // }
      return commmandWithIndicator.slice(CONSTANTS.CL_PROMPT.length - 1, commmandWithIndicator.length);
    }

    function backButtonPressed() {
      window.location.hash="no-back-button";
      deleteLastChar();
    }

    function deleteLastChar() {
      // var currenText = getCurrentText();
      //
      // if (currenText.length === CONSTANTS.CL_PROMPT.length - 2) {
      //   return
      // } else {
      //   var cleaned = cleanUpCommandFromIndicator(currenText)
      //   var deleted = cleaned.slice(0, cleaned.length - 1 )
      //   IO.output.setCurrentText("ingelheim.io:~ webClient$ " + deleted);
      // }
    }

    return {
        registerKeyPressEvents: registerKeyPressEvents
    }
})($)
