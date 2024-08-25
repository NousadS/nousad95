function echo(args) {
    let response = `\n${args.join(" ")}\n`;

    return response;
}

integratedCommands.echo = echo;