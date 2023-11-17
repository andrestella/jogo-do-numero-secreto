function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    let texto = `Escolha um número entre 1 e ${numeroLimite}:`;
    exibirTextoNaTela('p', texto);
}

function validarChute(chute) {
    chuteValidado = (chute > 0 && chute <= numeroLimite) ? true : false;
}

function verificarChute() {
    let chute = document.querySelector('input').value;
    validarChute(chute);
    if (chuteValidado == false) {
        exibirTextoNaTela('h1', 'Chute um valor válido!');
        let texto = `O valor deve ser um número entre 1 e ${numeroLimite}:`;
        exibirTextoNaTela('p', texto);
        limparCampo();
        return;
    }
    
    // console.log(chute == numeroSecreto);
    if (chute == numeroSecreto) {
        exibirTextoNaTela('h1', 'Acertou!');
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
        document.getElementById('chutar').setAttribute('disabled', true);
    } else {
        exibirTextoNaTela('h1', 'Errou!');
        if (chute > numeroSecreto) {
            let mensagemErro = `O número secreto é menor que ${chute}.`;
            exibirTextoNaTela('p', mensagemErro);
        } else {
            let mensagemErro = `O número secreto é maior que ${chute}.`;
            exibirTextoNaTela('p', mensagemErro);
        }
        tentativas++
        limparCampo();
    }
}

function gerarNumeroAleatorio() {
    // return parseInt(Math.random() * 10) + 1;   
    let numeroEscolhido = parseInt(Math.random() * numeroLimite) + 1;
    let qtdeDeElementosNaLista = listaDeNumerosSorteados.length;
    if (qtdeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        // console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector('input');
    chute.value = '';
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
    document.getElementById('chutar').removeAttribute('disabled');
}

// let titulo = document.querySelector('h1');
// titulo.innerHTML = 'Jogo do Número Secreto';

// let paragrafo = document.querySelector('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 e 10:';

let listaDeNumerosSorteados = [];
let numeroLimite = 20;
let numeroSecreto = gerarNumeroAleatorio();
let chuteValidado;
let tentativas = 1;

exibirMensagemInicial();

