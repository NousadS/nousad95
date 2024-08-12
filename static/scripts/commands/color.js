function color(args) {
    let response = "";

    const colors = {
        "0": "-b",
        "1": "-u",
        "2": "-c",
        "3": "-g",
        "4": "-p",
        "5": "-r",
        "6": "-w",
        "7": "-y",
        "8": "-bb",
        "9": "-bu",
        "a": "-bc",
        "b": "-bg",
        "c": "-bp",
        "d": "-br",
        "e": "-bw",
        "f": "-by"
    }

    if (args.length == 1 && args[0].length == 1) {
        sessionParameters.backgroundColor = [sessionParameters.backgroundColor[1], "b"+colors[args[0][0]]];
    } else if (args.length == 1 && args[0].length == 2) {
        sessionParameters.color = [sessionParameters.color[1], "c"+colors[args[0][0]]];
        sessionParameters.backgroundColor = [sessionParameters.backgroundColor[1], "b"+colors[args[0][1]]];
    } else if (args.length == 0) {
        sessionParameters.color = [sessionParameters.color[1], "c-w"];
        sessionParameters.backgroundColor = [sessionParameters.backgroundColor[1], "b-b"];
    }

    return response;
}

integratedCommands.color = color;