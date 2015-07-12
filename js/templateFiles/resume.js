function position(positionName, positionTime, positionCompany, positionDescription) {
    this.positionName = positionName;
    this.positionTime = positionTime;
    this.positionCompany = positionCompany;
    this.positionDescription = positionDescription;

    this.render = function() {
    	IO.output.printTextInLines(this.positionName);
    }
}

var RESUME = [
new position("Software Engineer", "January 2014th - Present", "ThoughtWorks Germany", "To Come"),
new position("Freelance Dev", "January 2014th - Present", "ThoughtWorks Germany", "To Come")
]
