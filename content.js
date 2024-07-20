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
    function getElementByXpath(path) {
        return document.evaluate(
            path,
            document,
            null,
            XPathResult.FIRST_ORDERED_NODE_TYPE,
            null
        ).singleNodeValue;
    }
    const divXPath = "/html/body/main/div/div[3]/div/div[4]";
    const afterXPath = "/html/body/main/div/div[3]/div/div[1]";
    const parentXPath = "/html/body/main/div/div[3]/div";
    const divToMove = getElementByXpath(divXPath);
    const targetDiv = getElementByXpath(afterXPath);
    const parentDiv = getElementByXpath(parentXPath);
    if (divToMove && targetDiv && parentDiv) {
        if (targetDiv.nextElementSibling !== divToMove) {
            parentDiv.insertBefore(divToMove, targetDiv.nextElementSibling);
        } else {
            console.log("Button Move: Div already in correct position");
        }
    } else {
        console.log("Button Move: One or more divs not found");
    }
}
const debouncedMoveDiv = debounce(moveDiv, 250);
moveDiv();
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
    } else {
        setTimeout(setupObserver, 1000);
    }
}
setupObserver();
