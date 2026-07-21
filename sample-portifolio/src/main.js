import './style.css' 

/* Carousel */
const cards = document.querySelector(".cards");

document.querySelector(".next").onclick = () => {
    cards.scrollBy({
        left:220,
        behavior:"smooth"
    });
};

document.querySelector(".prev").onclick = () => {
    cards.scrollBy({
        left:-220,
        behavior:"smooth"
    });
};

// Função para rolar até a seção "Sobre" ao clicar no botão CTA
document.getElementById('cta-button').addEventListener('click', () => {
    document.getElementById('sobre').scrollIntoView({ behavior: 'smooth' });
});

// Função para buscar CEP usando a API ViaCEP
async function buscarCEP() {
    const cep = document.getElementById('cep').value.replace(/\D/g, '');

    if (cep.length !== 8) {
        alert('CEP inválido! Digite 8 dígitos.');
        return;
    }

    try {
        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
        const dados = await resposta.json();

        if (dados.erro) {
            alert('CEP não encontrado!');
            return;
        }

        document.getElementById('logradouro').value = dados.logradouro;
        document.getElementById('bairro').value = dados.bairro;
        document.getElementById('cidade').value = `${dados.localidade} - ${dados.uf}`;
    } catch (erro) {
        alert('Erro ao buscar CEP. Tente novamente.');
        console.error(erro);
    }
}

// Adicionar evento ao botão "Buscar CEP"
document.getElementById('buscar-cep').addEventListener('click', buscarCEP);

// Função para validar e enviar o formulário
document.getElementById('formulario-contato').addEventListener('submit', (evento) => {
    evento.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const mensagem = document.getElementById('mensagem').value;

    if (!nome || !email || !mensagem) {
        alert('Preencha todos os campos obrigatórios!');
        return;
    }

    alert(`Obrigado, ${nome}! Sua mensagem foi enviada com sucesso.`);
    evento.target.reset(); // Limpa o formulário
});

// JavaScript para o efeito de digitação
document.addEventListener('DOMContentLoaded', () => {
    const titulo = document.querySelector('.titulo');
    const texto = titulo.innerHTML;
    const textArray = texto.split('');
    titulo.innerHTML = '';
    let i = 0;

    function typing() {
        if (i < textArray.length) {
            titulo.innerHTML += textArray[i];
            i++;
            setTimeout(typing, 100);
        }
    }
    typing();
})