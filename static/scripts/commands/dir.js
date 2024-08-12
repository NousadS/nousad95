function dir(args) {
    let response = `\n`;

    response += ` <c-bu>${localization[sessionParameters.codePage].commands.dir.directory} N:${getCurrentPath()}</c-bu>\n\n`;

    for (const [key, value] of Object.entries(getCurrentDir())) {
        if (typeof value == "string") {
            response += `     <c-bb>&lt;${localization[sessionParameters.codePage].commands.dir.file}&gt;</c-bb> ${key}\n`;
        } else {
            response += `     <c-bb>&lt;${localization[sessionParameters.codePage].commands.dir.folder}&gt;</c-bb> ${key}\n`;
        }
    }

    return response;
}

integratedCommands.dir = dir;