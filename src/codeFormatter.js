let buildFormatterHtml = () => {
    let html = document.createElement("div");
    html.id = "codeFormatter";
    return html;
}

let prefixTabs = (string, numTabs) => {
    for(x = 0; x < numTabs; x++) {
        string = "\t" + string;
    }

    return string;
}

let beautify = code => {
    let workingString = code;
    let codeBucket = "";

    // Remove all tabs.
    workingString = workingString.replace(/\t/g, "");
    
    // Remove all instances of two whitespaces with just one
    let oldText = "";

    while(!workingString.equals(oldText)) { // Keep looping until no replacements are made.
        oldText = workingString;
        workingString = workingString.replace(/  /g, " ");
    } 

    // **Make sure that there aren't missing line breaks.** //
    let cutoff = 0;
    let tempString = "";

    // TODO Find a way to change this in case the user is on Linux?
    workingString = workingString.replace(/\r\n/g, "\n");
    let lineTerminator = "\n";
    let lineTerminatorOffset = 1;

    while(workingString.length > 0) {
        cutoff = workingString.indexOf(lineTerminator);
        
        if(cutoff >= 0) {
            tempString = workingString.substring(0, cutoff);
            codeHoder = workingString.substring(cutoff + lineTerminatorOffset);
        }
        else {
            tempString = workingString;
            workingString = "";
        }
        tempString = tempString.replace(lineTerminator, "");
        tempString = tempString.trim();

        // **Handling semicolins in the middle of a line** //
        let keepGoing = true;
        let startIndex = 0;

        while(keepGoing) {
            let semicolinIndex = tempString.indexOf(";", startIndex);
            
            // If there is no semicolin or it is the last character in the string
            if(semicolinIndex == -1 || semicolinIndex == tempString.length + 1) {
                codeBucket += tempString + lineTerminator;
                keepGoing = false;
            }
            else {
                let ignore = false;
                let startCheckIndex = 0;

                // Check quotes
                let keepChecking = true;
                while(keepChecking) {
                    quoteIndex = tempString.search(/["']/, startCheckIndex);
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

                for(x = 0; x < semicolinIndex; x++) {
                    currentChar = tempString.charAt(x);
                    
                    if(quoteIndex != -1) {
                        if(tempString.charAt(quoteIndex) == currentChar) {
                            quoteIndes = -1;
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
                    codeBucket += tempString.substring(0, semicolinIndex + 1) + lineTerminator;
                }
                startIndex = semicolinIndex + 1;
            }
        }

        // **Adding tabs in** //

        let prettyCode = "";
        let tabs = 0;

        codeBucket = codeBucket.split("\n");

        for(x = 0; x < codeBucket.length; x++) {
            let openIndex = codeBucket[x].indexOf("{");
            let closeIndex = codeBucket.indexOf("}");

            // If there is a "{" in the line and no "}" following it:
            if(openIndex != -1 && closeIndex > openIndex) {
                prettyCode += prefixTabs(codeBucket[x], tabs);
                tabs++;
            }
            // If there is a "}" and no "{" before it
            else if (closeIndex != 0) {
                tabs--;
                prettyCode += prefixTabs(codeBucket[x], tabs);
            }
            // If neither of the above
            else {
                prettyCode += prefixTabs(codeBucket[x], tabs);
            }
        }
    }

    return prettyCode;
}

export {buildFormatterHtml};