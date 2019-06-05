import * as tracker from './assignmentTracker';
import * as code from './codeFormatter';

let body = document.getElementById("app");
//Figure out NavLink stuff
let navLinks = [];

let assignmentTracker = document.createElement("div");
assignmentTracker.id = "assignmentTracker";
body.appendChild(assignmentTracker);

tracker.setup(assignmentTracker);
body.appendChild(code.buildFormatterHtml());