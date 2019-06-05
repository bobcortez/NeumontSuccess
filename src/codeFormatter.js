let sampleCode = "for(x = 0; x < semicolinIndex; x++) {\ncurrentChar = tempString.charAt(x);\n\nif(quoteIndex != -1) {\nif(tempString.charAt(quoteIndex) == currentChar) {\nquoteIndes = -1;\n}\n}\nelse {\nif(currentChar == '(') {\nparenCount++;\n}\nelse if(currentChar == ')') {\nparenCount--;\n}\nelse if(currentChar == '\"' || currentChar == \"'\") {quoteIndex = x;\n}\n}\n}";
let tab = "\t";
let newline = "\n"

let test = () => {
    console.log("Formatting code:")
    let beautifulCode = beautify(sampleCode);
    console.log("Formatting complete");

    console.log("Before:");
    console.log(sampleCode);
    console.log("After:");
    console.log(beautifulCode)
}

let buildFormatterHtml = () => {
    let html = document.createElement("div");
    html.id = "codeFormatter";
    return html;
}

let prefixTabs = (string, numTabs) => {
    for(let x = 0; x < numTabs; x++) {
        string = tab + string;
    }

    return string;
}

let beautify = code => {
    let workingString = code;
    let codeBucket = "";

    // Remove all tabs.
    let oldText = "";
    console.log("Removing tabs");

    while(!workingString === oldText) {
        oldText = workingString;
        workingString = workingString.replace(tab, " ");
    } 
    
    // Remove all instances of two whitespaces with just one
    oldText = "";
    console.log("Removing extra spaces");

    while(!workingString === oldText) {
        oldText = workingString;
        workingString = workingString.replace(/  /g, " ");
    } 

    // **Make sure that there aren't missing line breaks.** //
    console.log("Checking line breaks");

    let carryOn = true;
    while(carryOn) {
        let nextIndex = workingString.search(/[{}][^\n]/);
        if(nextIndex != -1) {
            let replacement = workingString.charAt(nextIndex) + "\n" + workingString.charAt(nextIndex + 1);
            workingString = workingString.replace(/[{}][^\n]/, replacement);
        }
        else {
            carryOn = false;
        }
    } 

    let cutoff = 0;
    let tempString = "";

    workingString = workingString.replace(/\r\n/g, newline);
    let newlineOffset = 1;

    while(workingString.length > 0) {
        // Find the next line ender.
        cutoff = workingString.indexOf(newline);
        
        // If the line ender exists:
        if(cutoff != -1) {
            tempString = workingString.substring(0, cutoff);
            workingString = workingString.substring(cutoff + newlineOffset);
        }
        else {
            tempString = workingString;
            workingString = "";
        }
        tempString = tempString.trim();

        // **Handling semicolins in the middle of a line** //
        let keepGoing = true;
        let startIndex = 0;

        while(keepGoing) {
            let semicolinIndex = tempString.indexOf(";", startIndex);
            
            // If there is no semicolin or it is the last character in the string
            if(semicolinIndex == -1 || semicolinIndex == tempString.length - 1) {
                codeBucket += tempString + newline;
                keepGoing = false;
            }
            else {
                let ignore = false;
                let startCheckIndex = 0;

                // Check quotes
                let keepChecking = true;
                while(keepChecking) {
                    let quoteIndex = tempString.search(/["']/, startCheckIndex);
                    if(quoteIndex == -1) {
                        keepChecking = false;
                    }
                    else if(quoteIndex < semicolinIndex) {
                        secondQuoteIndex = tempString.indexOf(tempString.charAt(quoteIndex), quoteIndex + 1);
                        if (secondQuoteIndex == -1 || secondQuoteIndex > semicolinIndex) {
                            keepChecking = false;
                            ignore = true;
                        }
                    }
                }

                let quoteIndex = -1;
                let parenCount = 0;

                for(let x = 0; x < semicolinIndex; x++) {
                    let currentChar = tempString.charAt(x);
                    
                    if(quoteIndex != -1) {
                        if(tempString.charAt(quoteIndex) == currentChar) {
                            quoteIndex = -1;
                        }
                    }
                    else {
                        if(currentChar == '(') {
                            parenCount++;
                        }
                        else if(currentChar == ')') {
                            parenCount--;
                        }
                        else if(currentChar == '"' || currentChar == "'") {
                            quoteIndex = x;
                        }
                    }
                }

                if(parenCount != 0) {
                    ignore = true;
                }
    
                if(!ignore) {
                    codeBucket += tempString.substring(0, semicolinIndex + 1) + newline;
                }
                startIndex = semicolinIndex + 1;
            }
        }
    }

    console.log("Adding tabs back in");
    // **Adding tabs in** //

    let prettyCode = "";
    let tabs = 0;

    codeBucket = codeBucket.split(newline);

    for(let x = 0; x < codeBucket.length; x++) {
        let openIndex = codeBucket[x].indexOf("{");
        let closeIndex = codeBucket[x].indexOf("}");

        // If there is a "{" in the line and no "}" following it:
        if(openIndex != -1) {
            prettyCode += prefixTabs(codeBucket[x] + newline, tabs);
            if(closeIndex == -1) {
                tabs++;
            }
        }
        // If there is a "}" and no "{" before it
        else if (closeIndex != -1) {
            tabs--;
            prettyCode += prefixTabs(codeBucket[x] + newline, tabs);
        }
        // If neither of the above
        else {
            prettyCode += prefixTabs(codeBucket[x] + newline, tabs);
        }
    }

    return prettyCode;
}

let formatCode = () => {
    let input = document.getElementById("codeFormatterInput");
    let inString = input.text;

    let outString = beautify(inString);
    input.text = outString;
}

export {buildFormatterHtml, formatCode};