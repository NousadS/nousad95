const fileSystemPrependSelector = ".content-template";
const fileSystem = {
    "about.mp4": ".about-mp4",
    "nedobloki": {
        "about.mp4": ".nedobloki_about-mp4",
    }
};

var currentPath = [];
var currentDir = fileSystem;

function appendCurrentPath(path) {
    currentPath.push(path);
}

function popCurrentPath() {
    if (currentPath.length >= 1) currentPath.pop();
}

function getCurrentPath() {
    return `${currentPath.length >= 1 ? "/" : ""}${currentPath.join("/")}/`;
}

function setCurrentDir() {
    currentDir = currentPath.reduce((acc, key) => acc && acc[key], fileSystem);
}

function getCurrentDir() {
    setCurrentDir();

    return currentDir;
}