function help(args) {
    let response = "\n";

    if (args.length == 0) {
        response += `<c-y><c-bo>CD   </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.cd}\n`;
        response += `<c-y><c-bo>CHCP </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.chcp.command}\n`;
        response += `<c-y><c-bo>CLS  </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.cls}\n`;
        response += `<c-y><c-bo>COLOR</c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.color.command}\n`;
        response += `<c-y><c-bo>DIR  </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.dir}\n`;
        response += `<c-y><c-bo>ECHO </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.echo}\n`;
        response += `<c-y><c-bo>HELP </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.help}\n`;
        // response += `<c-y><c-bo>PAUSE</c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.pause}\n`;
        response += `<c-y><c-bo>TITLE</c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.title}\n`;
    } else {
        args[0] = args[0].toLowerCase();

        if (args[0] == "cd") {
            response += `<c-y><c-bo>CD</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.cd}\n`;
        } else if (args[0] == "chcp") {
            response += `<c-y><c-bo>CHCP</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.chcp.command}\n`;
            response += `${localization[sessionParameters.codePage].commands.help.chcp.actives}\n`;
        } else if (args[0] == "cls") {
            response += `<c-y><c-bo>CLS</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.cls}\n`;
        } else if (args[0] == "color") {
            response += `<c-y><c-bo>COLOR</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.color.command}\n`;
            response += `\n`;
            response += `    0 - <b-w><c-b>${localization[sessionParameters.codePage].commands.help.color.black}</c-b></b-w>\n`;
            response += `    1 - <c-u>${localization[sessionParameters.codePage].commands.help.color.blue}</c-u>\n`;
            response += `    2 - <c-c>${localization[sessionParameters.codePage].commands.help.color.cyan}</c-c>\n`;
            response += `    3 - <c-g>${localization[sessionParameters.codePage].commands.help.color.green}</c-g>\n`;
            response += `    4 - <c-p>${localization[sessionParameters.codePage].commands.help.color.purple}</c-p>\n`;
            response += `    5 - <c-r>${localization[sessionParameters.codePage].commands.help.color.red}</c-r>\n`;
            response += `    6 - <c-w>${localization[sessionParameters.codePage].commands.help.color.white}</c-w>\n`;
            response += `    7 - <c-y>${localization[sessionParameters.codePage].commands.help.color.yellow}</c-y>\n`;
            response += `\n`;
            response += `    8 - <c-bb>${localization[sessionParameters.codePage].commands.help.color.bright_black}</c-bb>\n`;
            response += `    9 - <c-bu>${localization[sessionParameters.codePage].commands.help.color.bright_blue}</c-bu>\n`;
            response += `    a - <c-bc>${localization[sessionParameters.codePage].commands.help.color.bright_cyan}</c-bc>\n`;
            response += `    b - <c-bg>${localization[sessionParameters.codePage].commands.help.color.bright_green}</c-bg>\n`;
            response += `    c - <c-bp>${localization[sessionParameters.codePage].commands.help.color.bright_purple}</c-bp>\n`;
            response += `    d - <c-br>${localization[sessionParameters.codePage].commands.help.color.bright_red}</c-br>\n`;
            response += `    e - <c-bw>${localization[sessionParameters.codePage].commands.help.color.bright_white}</c-bw>\n`;
            response += `    f - <c-by>${localization[sessionParameters.codePage].commands.help.color.bright_yellow}</c-by>\n`;
        } else if (args[0] == "dir") {
            response += `<c-y><c-bo>DIR</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.dir}\n`;
        } else if (args[0] == "echo") {
            response += `<c-y><c-bo>ECHO</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.echo}\n`;
        } else if (args[0] == "help") {
            response += `<c-y><c-bo>HELP</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.help}\n`;
            response += `\n<c-y><c-bo>CD   </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.cd}\n`;
            response += `<c-y><c-bo>CHCP </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.chcp.command}\n`;
            response += `<c-y><c-bo>CLS  </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.cls}\n`;
            response += `<c-y><c-bo>COLOR</c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.color.command}\n`;
            response += `<c-y><c-bo>DIR  </c-bo></c-y>    D${localization[sessionParameters.codePage].commands.help.dir}\n`;
            response += `<c-y><c-bo>ECHO </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.echo}\n`;
            response += `<c-y><c-bo>HELP </c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.help}\n`;
            // response += `<c-y><c-bo>PAUSE</c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.pause}\n`;
            response += `<c-y><c-bo>TITLE</c-bo></c-y>    ${localization[sessionParameters.codePage].commands.help.title}\n`;
        } else if (args[0] == "title") {
            response += `<c-y><c-bo>TITLE</c-bo></c-y> - ${localization[sessionParameters.codePage].commands.help.title}\n`;
        } else {
            response = `<c-u><c-it>${args[0]}</c-it></c-u> ${localization[sessionParameters.codePage].commands.help.not_found}\n`;
        }
    }

    return response;
}

integratedCommands.help = help;