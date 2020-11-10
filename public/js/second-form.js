const container = document.querySelector('.square');
const inputEmail = container.querySelector('[name=email]');
const inputPassword = container.querySelector('[name=password]');
const inputRepitePassword = container.querySelector('[name=rpassword]');
const button = container.querySelector('[data-name=continue]');

function clearVariables() {
	localStorage.removeItem('email');
}

function setVariables() {
	localStorage.setItem('email', '');
}

function ValidateEmail(mail) {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail)) {
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

function Message(txtMessage) {
	let message = container.querySelector('[data-name=message]');
	message.textContent = txtMessage;
	message.classList.add('message-error');
}

(() => {

	clearVariables();
	setVariables();

	button.addEventListener('click', function () {

		if (!ValidateEmail(inputEmail.value))
			Message('Email inválido.');

		console.log(ValidatePassword(inputPassword.value));

		if (!ValidatePassword(inputPassword.value) && ValidateEmail(inputEmail.value))
			Message('Senha deve ter no mínimo 8 caracteres.');

		if ((inputRepitePassword.value != inputPassword.value) && ValidatePassword(inputPassword.value))
		 	Message('A senha não confere, tente novamente.');

		if ((inputRepitePassword.value == inputPassword.value) && ValidateEmail(inputEmail.value) && ValidatePassword(inputPassword.value)) {
			(async () => {
				const response = await fetch('https://localhost:5001/api/user/', {
					method: "POST",
					mode: 'cors',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						cpf: localStorage.getItem('cpf'),
						nome: localStorage.getItem('name'),
						senha: inputPassword.value,
						email: inputEmail.value
					})
				})

				if (response.status == 200) {
					window.location.replace("./login.html");
				}
			})();
		}
	})
})();