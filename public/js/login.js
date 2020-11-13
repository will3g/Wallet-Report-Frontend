const container = document.querySelector('.square');
const inputCpf = container.querySelector('[name=cpf]');
const inputPassword = container.querySelector('[name=password]');
const button = container.querySelector('[data-name=enter]');

function clearVariables() {
    localStorage.removeItem('name');
    localStorage.removeItem('cpf');
    localStorage.removeItem('email');
    localStorage.removeItem('password');
}

function setVariables() {
    localStorage.setItem('cpf', '');
}

function Message(txtMessage) {
    let message = container.querySelector('[data-name=message]');
    message.textContent = txtMessage;
    message.classList.add('message-error');
}

function validateCPF(cpf) {
    if (/^\d{3}\d{3}\d{3}\d{2}$/.test(cpf)) {
        return true;
    }

    return false;
}

function ValidatePassword(pass) {
	if (pass.length >= 8) {
		return true;
	}
	return false;
}

(() => {
    clearVariables();
    setVariables();
    button.addEventListener('click', function () {
        if (!validateCPF(inputCpf.value))
            Message('CPF preenchido incorretamente.');

        if (!ValidatePassword(inputPassword.value) && validateCPF(inputCpf.value))
            Message('Senha deve ter no mínimo 8 caracteres.');

        if (validateCPF(inputCpf.value) && ValidatePassword(inputPassword.value))
            fetch(`https://localhost:5001/api/user/login/${inputCpf.value}/${inputPassword.value}`).then(res => res.json()).then(response => {
                if (response.length > 0) {
                    localStorage.setItem('cpf', inputCpf.value);
                    window.location.replace('./dashboard.html');
                } else {
                    Message('Usuário ou senha inválida.');
                }
            });
    });
})();