import * as tracker from './assignmentTracker';
import * as code from './codeFormatter';

let body = document.getElementById("app");

//Home Body Text Init
const home_page = document.createElement("div");
home_page.id = "main_text";
//Home Header
let home_head = document.createElement("h1");
let home_head_txt = document.createTextNode("Useful Applications!");
home_head.appendChild(home_head_txt);
//Home Flavor Text
let home_p = document.createElement("p");
let home_p_txt = document.createTextNode("Welcome to the Neumont Useful Applications Website! Here we have a selection of 2 useful apps that could help you in your day to day life at Neumont College of Computer Science. Please, help yourself to using these applications whenever you would like to use them. These tools being an Assignment Tracker that will make a sticky note of each assignment you have to do, where you list off the description and the requirements for the assignment. As well as, a Code Formatter that will take a string of Code and format it into something more 'Beautiful' for you to use.");
home_p.appendChild(home_p_txt);

home_page.appendChild(home_head);
home_page.appendChild(home_p);

//Navbar Links
const nav = document.createElement("ul");
nav.id = "navbar";
const navLinks = [{name: "Home", id: "home"}, {name: "Assignment Tracker", id: "track"}, {name: "Code Formatter", id: "format"}];

const buildLink = element => {
    let link = document.createElement("li");
    let li_link = document.createTextNode(element.name);
    link.className = "link";
    link.id = element.id;

    link.appendChild(li_link);
    nav.appendChild(link);
}
navLinks.forEach(buildLink);
body.appendChild(nav);

//Navbar Functionality
let onHomeClick = () => {
    console.log("Home Clicku");
    document.getElementById("main_text").style.display = "flex";
    document.getElementById("assignmentTracker").style.display = "none";
    document.getElementById("codeFormatter").style.display = "none";
}

let onNavTrack = () => {
    console.log("Tracker Clicku");
    document.getElementById("main_text").style.display = "none";
    document.getElementById("assignmentTracker").style.display = "flex";
    document.getElementById("codeFormatter").style.display = "none";
}

let onNavForm = () => {
    console.log("Format Clicku");
    document.getElementById("main_text").style.display = "none";
    document.getElementById("codeFormatter").style.display = "flex";
    document.getElementById("assignmentTracker").style.display = "none";
}

document.getElementById("home").addEventListener("click", onHomeClick);
document.getElementById("track").addEventListener("click", onNavTrack);
document.getElementById("format").addEventListener("click", onNavForm);


//Welcome Text
body.appendChild(home_page);

//Assignment Tracker
let assignmentTracker = document.createElement("div");
assignmentTracker.id = "assignmentTracker";
body.appendChild(assignmentTracker);
tracker.setup(assignmentTracker);

//Code Formatter
body.appendChild(code.buildFormatterHtml());

//Page Load Reset
document.getElementById("main_text").style.display = "flex";
document.getElementById("assignmentTracker").style.display = "none";
document.getElementById("codeFormatter").style.display = "none";