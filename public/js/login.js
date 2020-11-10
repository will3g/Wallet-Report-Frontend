const container = document.querySelector('.square');
const inputCpf = container.querySelector('[name=cpf]');
const inputPassword = container.querySelector('[name=password]');
const button = container.querySelector('[data-name=enter]');

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
    button.addEventListener('click', function () {
        if (!validateCPF(inputCpf.value))
            Message('CPF preenchido incorretamente.');

        if (!ValidatePassword(inputPassword.value) && validateCPF(inputCpf.value))
            Message('Senha deve ter no mínimo 8 caracteres.');

        if (validateCPF(inputCpf.value) && ValidatePassword(inputPassword.value))
            fetch(`https://localhost:5001/api/user/${inputCpf.value}`).then(res => res.json()).then(res => {
                if (res[0].senha == inputPassword.value) {
                    window.location.replace("./dashboard.html");      
                } else {
                    Message('Senha incorreta.');
                }
            });
    });
})();