window.addEventListener("load", () => {
    function getCurrentPath() {
        let path = localStorage.getItem("path");

        if (!path) {
            path = "N:";


        }

        return path
    }

    const path = {
        fileSystem: {
            "N:": {
                "close.exe": "/close.exe",
                "cmd.exe": "/cmd.exe",
                "nedobloki": {
                    "about.exe": "/nedobloki/about.exe",
                    "download.exe": "/nedobloki/download.exe",
                },
                "site": {
                    "about.exe": "/site/about.exe",
                }
            }
        },
        current: [ "N:" ],

        
        getCurrentDir() {
            let currentDir;
            
            this.current.forEach((element) => {
                if (currentDir) currentDir = currentDir[element];
                else currentDir = this.fileSystem[element];
            });

            return currentDir;
        },
        changeDir(dir) {
            if (dir == ".." && this.current.length > 1) {
                this.current.pop()
            } else {
                let currentDir = this.getCurrentDir();

                if (Object.keys(currentDir).includes(dir) && typeof currentDir[dir] !== "string") {
                    this.current.push(dir);
                } else {
                    return `The system cannot find the path specified.\n`;
                }
            }

            return ``;
        }
    };

    const commands = {
        colors: {
            "0": "#0c0c0c",
            "1": "#0037da",
            "2": "#13a10e",
            "3": "#3a96dd",
            "4": "#c50f1f",
            "5": "#881798",
            "6": "#c19c00",
            "7": "#cccccc",
            "8": "#767676",
            "9": "#3b78ff",
            "a": "#16c60c",
            "b": "#61d6d6",
            "c": "#e74856",
            "d": "#b4009e",
            "e": "#f9f1a5",
            "f": "#f2f2f2"
        },

        input: document.querySelector(".content-input"),
        output: document.querySelector(".content-output"),

        headerMessage() {
            return [
                `Nousad Command Line <console-gray>[Version 1.0]</console-gray>`,
                `<console-gray>(ɔ)</console-gray> Nousad <console-orange>Cat</console-orange>poration. <console-italic>All rights are not reserved.</console-italic>`
            ].join("\n");
        },
        inputMessage() {
            return [
                `<console-gray>${path.current.join("/")}/ </console-gray>>`,
            ].join("\n");
        },

        integrated: {
            help: (args) => { 
                return [
                    `<console-orange>HELP</console-orange>         Provides Help information for Nousad commands.`,
                    ``,
                    `<console-orange>CD</console-orange>           Changes the current directory.`,
                    `<console-orange>DIR</console-orange>          Displays a list of files and subdirectories in a directory.`,
                    `<console-orange>COLOR</console-orange>        Sets the default console foreground and background colors.`,
                    ``,
                    `<console-blue>&lt;name&gt;[.exe]</console-blue> Start &lt;name&gt;.exe file\n`,
                ].join("\n");
            },
            cd: (args) => {
                return path.changeDir(args[0]);
            },
            dir: (args) => {
                let currentDir = path.getCurrentDir();
                let text = [
                    `    <console-blue>Directory: ${path.current.join("/")}/</console-blue>`,
                    ``
                ];

                for (const [key, value] of Object.entries(currentDir)) {
                    if (typeof value == "string") {
                        text.push(`        <console-gray>&lt;FILE&gt;</console-gray> ${key}`);
                    } else {
                        text.push(`        <console-gray>&lt;FOLD&gt;</console-gray> ${key}`);
                    }
                }

                text.push(``);

                return text.join("\n");
            },
            color: (args) => {
                if (args[0].length == 1) {
                    localStorage.setItem("background-color", colors[args[0][0]])
                } else if (args[0].length == 2) {
                    localStorage.setItem("color", args[0][0])
                    localStorage.setItem("background-color", colors[args[0][1]])
                }

                return ``;
            }
        },

        handleCommand(command) {
            var [cmd, ...args] = command.trim().split(" ");
            cmd = cmd.toLowerCase();
        
            if (this.integrated[cmd]) {
                return commands.integrated[cmd](args);
            } else {
                let currentDir = path.getCurrentDir();
        
                if (Object.keys(currentDir).includes(cmd)) {
                    window.location.href = "/system"+currentDir[cmd];
        
                    return ``;
                } else if (Object.keys(currentDir).includes(cmd+".exe")) {
                    window.location.href = "/system"+currentDir[cmd+".exe"];
        
                    return ``;
                } else if (Object.keys(path.fileSystem["N:"]).includes(cmd)) {
                    window.location.href = "/system"+path.fileSystem["N:"][cmd];
        
                    return ``;
                } else if (Object.keys(path.fileSystem["N:"]).includes(cmd+".exe")) {
                    window.location.href = "/system"+path.fileSystem["N:"][cmd+".exe"];
        
                    return ``;
                } else {
                    return `<console-blue><console-italic>${cmd}</console-italic></console-blue> is not recognized as an internal or external command, \noperable program or batch file.\n`;
                }
            }
        },
        updateConsole() {
            this.output.style.backgroundColor = localStorage.getItem("background-color") || this.output.style.backgroundColor;
            this.output.style.color = localStorage.getItem("color") || this.output.style.color;

            if (this.input.value.includes("\n")) {
                this.output.innerHTML = [
                    this.headerMessage(),
                    ``,
                    `${this.inputMessage()} ${this.input.value.replace("\n", "")}`,
                    ``,
                    `${this.handleCommand(this.input.value.replace("\n", ""))}`,
                    `${this.inputMessage()} `
                ].join("\n");
        
                this.input.value = "";
            } else {
                this.output.innerHTML = [
                    this.headerMessage(),
                    ``,
                    `${this.inputMessage()} ${this.input.value}`
                ].join("\n");
            }
        }
    };

    commands.input.value = new URLSearchParams(window.location.search).get("cmd") || "help";
    commands.input.value += "\n";
    
    commands.input.addEventListener("input", () => commands.updateConsole());
    commands.input.focus();

    commands.updateConsole();
});