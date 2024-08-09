window.addEventListener("load", () => {
    setTimeout(() => {
        document.querySelector(".content").innerHTML += ".";
    }, 1000);
    setTimeout(() => {
        document.querySelector(".content").innerHTML += ".";
    }, 2000);
    setTimeout(() => {
        document.querySelector(".content").innerHTML += ".";
    }, 3000);
    setTimeout(() => {
        window.location.replace("https://google.com/");
    }, 4000);
});