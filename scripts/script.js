let showBorders = false;
let screenshotMode = false;

const screenshot = (element) => {
    html2canvas(element).then((canvas) => {
        const downloadElement = document.createElement('a');
        downloadElement.href = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
        downloadElement.download = "screenshot.png";
        document.body.appendChild(downloadElement);
        downloadElement.click();
        downloadElement.remove();
    });
}

const elementBorders = (element) => {
    element.childNodes.forEach((e) => {
        if(e.hasChildNodes() || e.tagName === 'IMG') {
            if(showBorders) {
                e.style.outline = "solid rgba(2, 48, 32, 50%) 3px";
            } else {
                e.style.outline = "";
            }
            elementBorders(e);
        }
    });
}

const changeMode = () => {
    if(showBorders && screenshotMode) {
        showBorders = false;
        screenshotMode = false;
    } else {
        showBorders = true;
        screenshotMode = true;
    }
    elementBorders(document.body);
}

document.addEventListener('keydown', (e) => {
    if(e.ctrlKey && e.shiftKey && e.key === 'S') {
        changeMode();
    } else if(e.ctrlKey && e.altKey && e.key === 's') {
        screenshot(document.body);
    }
});

document.addEventListener('mousedown', (e) => {
    if(showBorders && screenshotMode) {
        screenshot(e.target);
        changeMode();
    }
});