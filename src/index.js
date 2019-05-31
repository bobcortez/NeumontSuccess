import * as assignmentTracker from './assignmentTracker';
import * as codeFormatter from './codeFormatter';

let html = document.getElementById("app");
html.appendChild(assignmentTracker.buildTrackerHtml());
html.appendChild(codeFormatter.buildFormatterHtml());