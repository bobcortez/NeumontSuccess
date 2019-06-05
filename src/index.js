import * as tracker from './assignmentTracker';
import * as code from './codeFormatter';

let body = document.getElementById("app");

//Navbar Links
const nav = document.createElement("ul");
nav.id = "navbar";
const navLinks = ["Assignment Tracker", "Code Formatter"];

const buildLink = element => {
    let link = document.createElement("li");
    let li_link = document.createTextNode(element);
    link.id = "link";

    link.appendChild(li_link);
    nav.appendChild(link);
}
navLinks.forEach(buildLink);
body.appendChild(nav);

//Assignment Tracker
let assignmentTracker = document.createElement("div");
assignmentTracker.id = "assignmentTracker";
body.appendChild(assignmentTracker);
tracker.setup(assignmentTracker);

//Code Formatter
body.appendChild(code.buildFormatterHtml());
