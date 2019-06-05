import * as tracker from './assignmentTracker';
import * as code from './codeFormatter';

let body = document.getElementById("app");
//Figure out NavLink stuff
let navLinks = [];



body.appendChild(tracker.buildTrackerHtml());
body.appendChild(code.buildFormatterHtml());