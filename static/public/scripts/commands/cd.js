function cd(args) {
    let response = "\n";

    if (args.length == 1) {
        if (Object.keys(getCurrentDir()).includes(args[0]) || Object.keys(getCurrentDir()).includes(args[0]+"/") || args[0] == "..") {
            if (args[0] == "..") {
                popCurrentPath();
            } else {
                appendCurrentPath(args[0]);
            }

            setCurrentDir();
        } else {
            response += `${localization[sessionParameters.codePage].commands.cd.not_found}\n`;
        }
    } else if (args.length == 0) {
        response += `N:${getCurrentPath()}\n`;
    }

    return response;
}

integratedCommands.cd = cd;