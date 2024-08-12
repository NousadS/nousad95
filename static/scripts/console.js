const print = document.querySelector(".print");

const output = document.querySelector(".output");
const input = document.querySelector(".input");

function inputEscape(input) {
    return input
        .replaceAll(/&/g, "&amp;")
        .replaceAll(/</g, "&lt;")
        .replaceAll(/>/g, "&gt;")
        .replaceAll(/"/g, "&quot;")
        .replaceAll(/'/g, "&#039;");
}

function inputKeydown(event) {
    if (output.innerHTML == "") {
        output.innerHTML += `${localization[sessionParameters.codePage].defaults.header}\n`;
        output.innerHTML += `${localization[sessionParameters.codePage].defaults.copyright}\n\n`;
        output.innerHTML += `N:${getCurrentPath()}> `;
    }

    if (event && event.key == "Enter") {
        event.preventDefault();

        let [raw_command, ...raw_args] = inputEscape(input.value).split(" ");
        
        let command = raw_command.toLowerCase();
        let args = raw_args.filter((arg) => arg != "");

        let command_response = ""; 

        if (command == "") {
            command_response = "";
        } else if (integratedCommands[command]) {
            command_response = integratedCommands[command](args);
        } else if (Object.keys(getCurrentDir()).includes(command) && typeof getCurrentDir()[command] === "string") {
            command_response = "\n"+document.querySelector(fileSystemPrependSelector+getCurrentDir()[command]).innerHTML+"\n";
        } else {
            command_response = `\n<c-bu><c-it>${command}</c-it></c-bu> ${localization[sessionParameters.codePage].commands.not_found}\n`;
        }

        output.innerHTML += `${command} ${args.join(" ")}\n${command_response}\nN:${getCurrentPath()}> `;
        input.value = "";
    }

    if (sessionParameters.lastPrint !== `${output.innerHTML}${inputEscape(input.value)}`) {
        console.log("ss");
        
        sessionParameters.lastPrint = print.innerHTML;

        print.innerHTML = `${output.innerHTML}${inputEscape(input.value)}`;

        print.classList.remove(sessionParameters.color[0]);
        print.classList.remove(sessionParameters.backgroundColor[0]);

        print.classList.add(sessionParameters.color[1]);
        print.classList.add(sessionParameters.backgroundColor[1]);

        print.scroll({
            top: 100000,
            left: 0,
            behavior: "smooth",
        });
    }
}

function printClick(event) {
    input.focus();
}