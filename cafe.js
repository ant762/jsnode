// um
const inputNome = document.getElementById('input-nome');
const mensagemErro = document.getElementById('mensagem-erro'); // azul escuro = definir | azul = variavel | amarelo = ação | laranja = elemento
const validarBtn = document.getElementById('validar-btn');     // azul claro = documento, vulgo html.
const regex = /^[a-zA-Z]+$/; // serve para verificar se o conteúdo do texto realmente são letras.

validarBtn.addEventListener('click', () => {  // a lógica da linha 8 e 11 basicamente verifica se o conteúdo do texto realmente sao carácteres
  if (inputNome.value.trim() === '') {      // trim = é que nem o strip do python. serve pra remover espaços em brancos de elementos.
    mensagemErro.textContent = 'Por favor, digite seu nome.';
    mensagemErro.style.display = 'block';
  } else if (!regex.test(inputNome.value)) {
    mensagemErro.textContent = "O nome deve conter apenas letras."
    mensagemErro.style.display = 'block';
  } else {
    mensagemErro.textContent = '';
    mensagemErro.style.display = 'none';
  }
});

// dois
const cartao = document.getElementById('cartao-destaque');

cartao.addEventListener('mouseover', () => {
  cartao.classList.add('destacado');
});

cartao.addEventListener('mouseout', () => {
  cartao.classList.remove('destacado');
});

// tres
const novoItemInput = document.getElementById('novo-item-input');
const adicionarBtn = document.getElementById('adicionar-btn');
const minhaLista = document.getElementById('minha-lista');

adicionarBtn.addEventListener('click', () => {
  const texto = novoItemInput.value.trim();
  if (texto !== '') {
    const novoItem = document.createElement('li');
    novoItem.textContent = texto;
    minhaLista.appendChild(novoItem);
    novoItemInput.value = '';
  }
});

// quatro
const numero1 = document.getElementById('numero1');
const numero2 = document.getElementById('numero2');
const operacaoSelect = document.getElementById('operacao-select');
const calcularBtn = document.getElementById('calcular-btn');
const resultadoCalculadora = document.getElementById('resultado-calculadora');

calcularBtn.addEventListener('click', () => {
  const n1 = parseFloat(numero1.value); // isso transforma a string em um número inteiro.
  const n2 = parseFloat(numero2.value);
  const operacao = operacaoSelect.value;
  let resultado;

  if (isNaN(n1) || isNaN(n2)) {  // isnan = não é número.
    resultadoCalculadora.textContent = 'Por favor, insira dois números válidos.';
    return;
  }

  switch (operacao) {       // mesma coisa que aprendi à alguns meses no portugol. você utiliza uma lógica e define limites em diferentes casos.
    case '+':
      resultado = n1 + n2;
      break;
    case '-':
      resultado = n1 - n2;
      break;
    case '*':
      resultado = n1 * n2;
      break;
    case '/':
      if (n2 === 0) {
        resultadoCalculadora.textContent = 'Não é possível dividir por zero!';
        return;
      }
      resultado = n1 / n2;
      break;
    default:
      resultado = 'Operação inválida';
  }

  resultadoCalculadora.textContent = `Resultado: ${resultado}`;
});

// cinco
const alternarTemaBtn = document.getElementById('alternar-tema-btn');
const body = document.body;

alternarTemaBtn.addEventListener('click', () => {   // a script aciona o dark-theme do css ao clicar no botão. simples.
  body.classList.toggle('dark-theme');
});
