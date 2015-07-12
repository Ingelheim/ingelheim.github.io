var SYSTEM = {}

function command(execute) {
    this.execute = execute;

    this.perform = function() {
        this.execute()
    }

    // MARK: make static
    this.couldBe = function(command, snippet) {
        return command.match(new RegExp("\\b" + snippet))
    }
}

SYSTEM.commands = (function(jquery) {
    var validCommands = {
        help: new command(executeHelp),
        clear: new command(executeClear),
        resume: new command(executeResume)
    }

    // Public
    // MARK: refactor
    function execute(command) {
        if(knows(command)) {
            validCommands[command].perform()
        } else if (command === "") {
            // do nothing
        } else {
            IO.output.print("Unknown command")
        }
        IO.output.printInputLine()
    }

    // MARK: Feature envy
    function autocomplete(snippet) {
      var regex  = new RegExp(snippet)

      for (command in validCommands) {
        var possibleCommand = validCommands[command]
        if (possibleCommand.couldBe(command, snippet)) {
          var oldLine = CONSTANTS.CL_PROMPT_PART + command
          IO.output.setCurrentText(oldLine)
          IO.input.executeForString(oldLine);
        }
      }
    }

    // Private
    function executeHelp() {
        IO.output.print("clear - clear the screen", "resume - see resume")
    }

    function executeResume() {
    		for(i = 0; i <= RESUME.length; i++) {
    			console.log(i)
    			RESUME[i].render()
    		}
    }

    function executeClear() {
        IO.output.clearScreen()
    }

    function knows(command) {
        return jquery.inArray(command, Object.keys(validCommands)) >= 0;
    }

    return {
        execute: execute,
        autocomplete: autocomplete
    }
})($)
