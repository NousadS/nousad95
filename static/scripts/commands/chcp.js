function chcp(args) {
    let response = "\n";

    if (args.length == 1 && args[0] != "" && [ 437 ].includes(parseInt(args[0]))) {
        sessionParameters.codePage = parseInt(args[0]);

        response += `${localization[sessionParameters.codePage].commands.chcp.active} ${sessionParameters.codePage}\n`;
    } else {
        response += `${localization[sessionParameters.codePage].commands.chcp.invalid}\n`;
    }

    return response;
}

integratedCommands.chcp = chcp;