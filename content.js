// content.js
console.log("Button Move: Script started");

// Debounce function to limit how often moveDiv is called
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function moveDiv() {
    console.log("Button Move: moveDiv function called");

    // Function to get element by XPath
    function getElementByXpath(path) {
        return document.evaluate(
            path,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
    }

    // XPaths of the divs
    const divXPath = "/html/body/main/div/div[3]/div/div[4]";
    const afterXPath = "/html/body/main/div/div[3]/div/div[1]";
    const parentXPath = "/html/body/main/div/div[3]/div";

    // Select the divs using XPath
    const divToMove = getElementByXpath(divXPath);
    const targetDiv = getElementByXpath(afterXPath);
    const parentDiv = getElementByXpath(parentXPath);

    // Move the div if both elements are found
    if (divToMove && targetDiv && parentDiv) {
        if (targetDiv.nextElementSibling !== divToMove) {
            parentDiv.insertBefore(divToMove, targetDiv.nextElementSibling);
            console.log("Button Move: Div moved successfully");
        } else {
            console.log("Button Move: Div already in correct position");
        }
    } else {
        console.log("Button Move: One or more divs not found");
    }
}

// Debounced version of moveDiv
const debouncedMoveDiv = debounce(moveDiv, 250);

// Run moveDiv once when the script loads
moveDiv();

// Set up a MutationObserver to watch for changes in the specific parent div
function setupObserver() {
    const parentXPath = "/html/body/main/div/div[3]/div";
    const parentDiv = document.evaluate(
        parentXPath,
        document,
        null,
        XPathResult.FIRST_ORDERED_NODE_TYPE,
        null
    ).singleNodeValue;

    if (parentDiv) {
        const observer = new MutationObserver(debouncedMoveDiv);
        observer.observe(parentDiv, { childList: true, subtree: true });
        console.log("Button Move: Observer set up successfully");
    } else {
        console.log("Button Move: Parent div not found, retrying in 1 second");
        setTimeout(setupObserver, 1000);
    }
}

// Start trying to set up the observer
setupObserver();
