function startupEvent(event) {
    window.removeEventListener("keydown", startupEvent);

    print.innerHTML = "";
    document.querySelector(".console").style.opacity = "0";

    setTimeout(() => {
        document.querySelector(".print").innerHTML = `<div class="win-icon-wrapper"><img src="/static/images/win.png" alt="Win" class="win-icon"></div>`;
        document.querySelector(".console").style.opacity = "1";

        sessionParameters.startupAudio.play();

        setTimeout(() => {
            document.querySelector(".console").style.opacity = "0";
        }, (sessionParameters.startupAudio.duration - 1)*1000);

        sessionParameters.startupAudio.addEventListener("ended", () => {
            setTimeout(() => {
                input.addEventListener("keydown", inputKeydown);
                window.addEventListener("beforeunload", shutdownEvent);
    
                document.querySelector(".console").classList.remove("not-started");
                document.querySelector(".console .title .name").innerHTML = localization[sessionParameters.codePage].defaults.title;
                document.querySelector(".console .title .icon").setAttribute("src", "/static/images/cmd.png");
    
                sessionParameters.keydownInterval = setInterval(inputKeydown, 250);

                setTimeout(() => document.querySelector(".console").style.opacity = "1", 250);
                // setTimeout(() => showPopup("initial"), 2000);
            }, 1500);
        });

        print.addEventListener("click", printClick);
        input.focus();
    }, 1500);
}

function shutdownEvent(event) {
    input.removeEventListener("keydown", inputKeydown);
    clearInterval(sessionParameters.keydownInterval);

    document.querySelector(".console").style.opacity = "0";

    sessionParameters.shutdownAudio.play();

    event.preventDefault();
}

window.addEventListener("keydown", startupEvent);