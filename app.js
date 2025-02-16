const amigosOriginais = [];
const amigos = []; 
const eAmigoInput = document.querySelector("#amigo");
const eBotaoAdicionar = document.getElementById('adicionarNome');
const eAmigoList = document.querySelector("#listaNomes");
const eBotaoSortear = document.getElementById('sortearAmigo');
const eAmigoResultado = document.querySelector("#resultado");
const eBotaoLimpar = document.querySelector("#limparLista");

eBotaoLimpar.onclick = limparLista;
eBotaoSortear.addEventListener('click', sortearAmigo);
eBotaoAdicionar.addEventListener('click', adicionarAmigo);

function adicionarAmigo() {
  const amigo = eAmigoInput.value.trim();
  const mensagemErro = validarAmigo(amigo);
  if (mensagemErro) {
    mostrarMensagemErro(mensagemErro);
    return;
  }
  amigos.push(amigo); 
  atualizarListaAmigos(); 
  eAmigoInput.value = ""; 
}

function validarAmigo(amigo) {
  if (amigo.length < 3) {
    return "O nome do amigo deve ter pelo menos 3 caracteres";
  }
  if (amigos.includes(amigo)) {
    return "Amigo já adicionado";
  }
  if (!/^[A-Z]/.test(amigo)) { 
    return "O nome deve iniciar com uma letra maiúscula";
  }
  return null; 
}

function mostrarMensagemErro(mensagem) {
  window.alert(mensagem); 
}

function sortearAmigo() {
  if (amigos.length === 0) {
    window.alert("Adicione ao menos um amigo antes de sortear.");
    return;
  }

  const randIndex = Math.floor(Math.random() * amigos.length);
  const resultadoAmigo = amigos[randIndex]; 
  const resultadoMessage = `<span style="color: #FF6000; font-weight: bold;">Parabéns! O sorteado foi ${resultadoAmigo}.</span>`; 
  eAmigoResultado.innerHTML = resultadoMessage; 

  amigos.splice(randIndex, 1);
  atualizarListaAmigos();
  
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 1000); 
}

function limparLista() {
  amigos.length = 0; 
  atualizarListaAmigos(); 
  eAmigoResultado.textContent = ""; 
}

function atualizarListaAmigos() {
  eAmigoList.innerHTML = ""; 
  amigos.forEach((amigo) => {
    const li = document.createElement("li");
    li.textContent = amigo; 
    eAmigoList.appendChild(li); 
  });
}