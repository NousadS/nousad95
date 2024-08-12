function title(args) {
    let response = ``;

    document.querySelector(".console .title .name").innerHTML = args.length == 1 && args[0] != "" ? args[0] : 
        localization[sessionParameters.codePage].defaults.title;

    return response;
}

integratedCommands.title = title;