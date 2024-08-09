window.addEventListener("load", () => {
    document.querySelector("#scale").addEventListener("input", () => {
        localStorage.setItem("scale", document.querySelector("#scale").value);

        document.querySelector(".window").setAttribute("style", `transform: scale(${localStorage.getItem("scale")});`);
    });

    if (localStorage.getItem("scale") !== null) {
        document.querySelector("#scale").value = localStorage.getItem("scale");
        
        document.querySelector(".window").setAttribute("style", `transform: scale(${localStorage.getItem("scale")});`);
    }
});