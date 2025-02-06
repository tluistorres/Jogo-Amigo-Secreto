const amigosOriginais = [];
const amigos = []; // Começa com a lista vazia
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
  amigos.push(amigo); // Adiciona o amigo ao array
  atualizarListaAmigos(); // Atualiza a lista na interface
  eAmigoInput.value = ""; // Limpa o campo de entrada
}

function validarAmigo(amigo) {
  if (amigo.length < 3) {
    return "O nome do amigo deve ter pelo menos 3 caracteres";
  }
  if (amigos.includes(amigo)) {
    return "Amigo já adicionado";
  }
  return null; // Retorna null se não houver erro
}

function mostrarMensagemErro(mensagem) {
  window.alert(mensagem); // Você pode substituir por um elemento na interface
}

function sortearAmigo() {
  if (amigos.length === 0) {
    window.alert("Adicione ao menos um amigo antes de sortear.");
    return;
  }
  const randIndex = Math.floor(Math.random() * amigos.length);
  const resultadoAmigo = amigos[randIndex]; // Seleciona um amigo aleatório
  const resultadoMessage = `<span style="color: #05DF05; font-weight: bold;">Parabéns! O sorteado foi ${resultadoAmigo}.</span>`; // Mensagem de resultado
  eAmigoResultado.innerHTML = resultadoMessage; // Exibe o resultado na tela com HTML

  // Adiciona um atraso antes de mostrar os confetes
  setTimeout(() => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 }
    });
  }, 1000); // Atraso de 1000 milissegundos (1 segundo)
}

// Funções auxiliares
function limparLista() {
  amigos.length = 0; // Limpa o array de amigos
  atualizarListaAmigos(); // Atualiza a interface para refletir a lista vazia
  eAmigoResultado.textContent = ""; // Limpa o resultado exibido
}

function atualizarListaAmigos() {
  eAmigoList.innerHTML = ""; // Limpa a lista exibida
  amigos.forEach((amigo) => {
    const li = document.createElement("li");
    li.textContent = amigo; // Adiciona o nome do amigo à lista
    eAmigoList.appendChild(li); // Adiciona o item à lista no HTML
  });
}