const cpf = localStorage.getItem('cpf');
let admin = localStorage.getItem('admin');

const container = document.querySelector('#profile');
const button = document.querySelector('#update');

function formatCPF(cpf) {
	cpf = cpf.replace(/[^\d]/g, '');
	return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
}

function clearVariables() {
	localStorage.removeItem('name');
	localStorage.removeItem('email');
	localStorage.removeItem('password');
	localStorage.removeItem('admin');
}

function setVariables(nome = '', email = '', cpf = '', password = '', admin = false) {
	localStorage.setItem('cpf', cpf);
	localStorage.setItem('name', nome);
	localStorage.setItem('email', email);
	localStorage.setItem('password', password);
	localStorage.setItem('admin', admin);
}

function Message(txtMessage = '') {
	let message = document.querySelector('[data-name=message]');
	message.textContent = txtMessage;
	message.classList.add('message-error');
}

function validateName(name) {
	if (/^[a-zA-Z ]{10,40}$/.test(name)) {
		Message();
		return name;
	}
	Message('Nome deve ter no mínimo 10 caracteres.');
	return false;
}

function ValidateEmail(email) {
	if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email)) {
		Message();
		return email;
	}
	Message('Email inválido.');
	return false;
}

function ValidatePassword(pass) {
	if (pass.length >= 8) {
		Message();
		return pass;
	}
	Message('Senha deve ter no mínimo 8 caracteres.');
	return false;
}

function convertStringToBoolean(string) {
	return string == true ? true : false;
}

function checkInput(input) {
	const element = document.querySelector(`#${input}`);

	if (input == 'name')
		return element.value ? validateName(element.value) : localStorage.getItem(`${input}`);
	else if (input == 'email')
		return element.value ? ValidateEmail(element.value) : localStorage.getItem(`${input}`);
}

function profileEmail(email) {
	return `
    <a class="link">
        <i class="fa fa-envelope"></i><p class="font-medium">${email}</p>
    </a>`;
}

function profileCpf(cpf) {
	return `
    <a class="link">
        <i class="fa fa-id-card"></i><p class="font-medium">${cpf}</p>
    </a>`;
}

function MarkupProfileUser(name, email, cpf) {
	container.innerHTML = `
    <center class="m-t-30">
        <img src="../assets/icons/user.png" class="img-circle" width="150" />
        <h4 class="card-title person-name m-t-10">${name}</h4>
        <h6 class="card-subtitle person-name">Olá ${name}!</h6>
        <div class="row text-center justify-content-md-center" style="justify-content: center;">
        <div id="profile-email" class="col-4">
            ${this.profileEmail(email)}
        </div>
        <div id="profile-cpf" class="col-4">
            ${profileCpf(cpf)}
        </div>
        </div>
    </center>`;
}

(() => {
	clearVariables();
	setVariables();
	fetch(`https://localhost:5001/api/user/${cpf}`).then(res => res.json()).then(res => {
		res = res[0];
		MarkupProfileUser(res.nome, res.email, formatCPF(cpf));
		setVariables(res.nome, res.email, cpf, res.senha, res.admin);
	});
})();

button.addEventListener('click', e => {
	e.preventDefault();

	const name = document.querySelector('#name').value;
	const email = document.querySelector('#email').value;

	const pass = document.querySelector('#password').value;
	const rpassword = document.querySelector('#rpassword').value;

	if ((rpassword) && ((ValidatePassword(pass)) == rpassword)) {	
		if (validateName(name) && ValidateEmail(email)) {
			(async () => {
				const response = await fetch(`https://localhost:5001/api/user/${cpf}`, {
					method: 'PUT',
					mode: 'cors',
					headers: {
						'Accept': 'application/json',
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({
						cpf: cpf,
						nome: name ? name : localStorage.getItem('name'),
						senha: pass,
						email: email ? email : localStorage.getItem('email'),
						admin: convertStringToBoolean(admin)
					})
				});
		
				if (response.status == 200) {
					alert('Cadastro atualizado com sucesso!');
					window.location.replace('./profile.html');
				}
			})();
		}
	} else {
		if (!pass) {
			if (!email && !name) {
				Message('Para atualizar seus dados é todos os campos, digitar a senha e confirmar.');
			} else if (name) {
				if (validateName(name)) {
					Message('É necessário prencher todos os campos, digitar a senha e confirmar.');
				}
			}
			else if (email) {
				if (ValidateEmail(email)) {
					Message('É necessário prencher todos os campos, digitar a senha e confirmar.');
				}
			}
		} else {
			if (ValidatePassword(pass)) {
				Message('Senha não confere.');
			}
		}
	}

});