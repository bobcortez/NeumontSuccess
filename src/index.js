import * as tracker from './assignmentTracker';
import * as code from './codeFormatter';

let html = document.getElementById("app");
//Figure out NavLink stuff
let navLinks = [];

html.appendChild(tracker.buildTrackerHtml());
html.appendChild(code.buildFormatterHtml());