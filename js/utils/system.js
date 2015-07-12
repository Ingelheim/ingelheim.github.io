var SYSTEM = {}

function command(execute) {
    this.execute = execute;

    this.perform = function() {
        this.execute()
    }
}

SYSTEM.commands = (function(jquery) {
    var validCommands = {
        help: new command(executeHelp),
        clear: new command(executeClear),
        resume: new command(executeResume)
    }

    // Public
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
        execute: execute
    }
})($)
