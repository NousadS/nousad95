function title(args) {
    let response = ``;

    document.querySelector(".console .title .name").innerHTML = args.length >= 1 ? args.join(" ") : 
        localization[sessionParameters.codePage].defaults.title;

    return response;
}

integratedCommands.title = title;