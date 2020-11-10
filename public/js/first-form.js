const container = document.querySelector('.square');
const inputName = container.querySelector('[name=nome]');
const inputCpf = container.querySelector('[name=cpf]');
const anchor = container.querySelector('[data-name=continue]');

function clearVariables() {
    localStorage.removeItem('name');
    localStorage.removeItem('cpf');
}

function setVariables() {
    localStorage.setItem('name', '');
    localStorage.setItem('cpf', '');
}

function Message(txtMessage) {
    let message = container.querySelector('[data-name=message]');
    message.textContent = txtMessage;
    message.classList.add('message-error');
}

function validationName(name) {
    if (/^[a-zA-Z ]{10,40}$/.test(name)) {
        return true;
    }

    return false;
}

function validateCPF(cpf) {
    if (/^\d{3}\d{3}\d{3}\d{2}$/.test(cpf)) {
        return true;
    }

    return false;
}

(() => {

    clearVariables();
    setVariables();

    anchor.addEventListener('click', function () {

        if (!validationName(inputName.value))
            Message('Mínimo de 10 caracteres para o nome.');

        if (!validateCPF(inputCpf.value) && validationName(inputName.value))
            Message('CPF preenchido incorretamente.');

        if (validationName(inputName.value) && validateCPF(inputCpf.value)) {
            localStorage.setItem('name', inputName.value);
            localStorage.setItem('cpf', inputCpf.value);

            window.location.replace("./register-data.html");
        }
    });
})();