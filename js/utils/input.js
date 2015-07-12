var IO = {}

IO.input = (function(jquery){
    // Public
    function registerKeyPressEvents() {
      jquery(document).keypress(function(evt) {
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

        jquery(document).keydown(function(evt) {
            var charCode = evt.keyCode;
            if (charCode === 8) {
              evt.preventDefault();
              deleteLastChar();
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
      return commmandWithIndicator.slice(CONSTANTS.CL_PROMPT.length - 1, commmandWithIndicator.length);
    }

    function backButtonPressed() {
      window.location.hash="no-back-button";
      deleteLastChar();
    }

    function deleteLastChar() {
      var currenText = getCurrentText();
        var cleaned = cleanUpCommandFromIndicator(currenText)
        var deleted = cleaned.slice(0, cleaned.length - 1 )
        IO.output.setCurrentText(CONSTANTS.CL_PROMPT_PART + deleted);
    }

    return {
        registerKeyPressEvents: registerKeyPressEvents
    }
})($)
