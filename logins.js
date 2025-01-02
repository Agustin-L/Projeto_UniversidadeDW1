const btnLogin = document.getElementById('botaologin');
const btnFechar = document.getElementById('fechar');

btnLogin.onclick = function() {
    login.showModal();
}

btnFechar.onclick = function() {
    login.close();
}

const login = document.getElementById('login');
const formLogin = document.querySelector('#login form');

let dadosUsuarios = [
    { email: "agustin.lautaro@email.com", senha: "123456" },
    { email: "agustin.floriano@email.com", senha: "123456" },
    { email: "gabriel.valenga@email.com", senha: "123456" },
];

formLogin.addEventListener('submit', (evento) => {
    evento.preventDefault();

    let msgErro = document.querySelector('.erro');
    if (msgErro) {
        login.removeChild(msgErro);
    }

    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;

    dadosUsuarios.forEach(item => {
        if (email === item.email && senha === item.senha) {
            sessionStorage.setItem('usuarioLogado', 'true');
            sessionStorage.setItem('nomeUsuario', item.nome);
            
            window.open("./cadastro fazenda/index1.html", "_blank");

        }
    });

    /*================================================================*/ 

    let usuarioLogado = sessionStorage.getItem('usuarioLogado');

    if (!usuarioLogado) {
        erro = document.createElement('p');
        erro.classList.add('erro');
        erro.innerText = 'Login ou senha inválido';

        login.insertBefore(erro, login.firstChild);

        document.querySelector('#login form').reset();
    }
});
