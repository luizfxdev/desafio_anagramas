// Variáveis globais
let wordList = [];
let isCalculating = false;

// Elementos do DOM
const expressionInput = document.getElementById('expressionInput');
const calculateBtn = document.getElementById('calculateBtn');
const returnBtn = document.getElementById('returnBtn');
const resultOutput = document.getElementById('resultOutput');
const loadingMessage = document.getElementById('loadingMessage');
const errorMessage = document.getElementById('errorMessage');
const calculationInfo = document.getElementById('calculationInfo');
const charCount = document.getElementById('charCount');

// Inicialização
document.addEventListener('DOMContentLoaded', function () {
  loadWordsFile();
  setupEventListeners();
});

// Configura os event listeners
function setupEventListeners() {
  calculateBtn.addEventListener('click', handleCalculate);
  returnBtn.addEventListener('click', handleReturn);

  expressionInput.addEventListener('input', function () {
    updateCharCounter();
    hideMessages();
  });

  expressionInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter' && !isCalculating) {
      handleCalculate();
    }
  });
}

// Atualiza contador de caracteres
function updateCharCounter() {
  const count = expressionInput.value.length;
  charCount.textContent = count;

  if (count > 16) {
    charCount.style.color = '#ff6666';
  } else if (count > 12) {
    charCount.style.color = '#ffaa00';
  } else {
    charCount.style.color = '#888';
  }
}

// Carrega o arquivo words.txt
async function loadWordsFile() {
  try {
    const response = await fetch('assets/words.txt');
    if (!response.ok) {
      throw new Error('Não foi possível carregar o arquivo words.txt');
    }

    const text = await response.text();
    wordList = text
      .split('\n')
      .map(word => word.trim().toUpperCase())
      .filter(word => word.length > 0);

    console.log(`Carregadas ${wordList.length} palavras do dicionário`);
  } catch (error) {
    console.error('Erro ao carregar words.txt:', error);
    showError('Erro ao carregar o dicionário de palavras. Verifique se o arquivo assets/words.txt existe.');
  }
}

// Manipula o clique no botão CALCULAR
async function handleCalculate() {
  if (isCalculating) return;

  const expression = expressionInput.value.trim();

  // Validação da entrada
  if (!expression) {
    showError('Por favor, digite uma expressão para calcular os anagramas.');
    return;
  }

  if (expression.length > 16) {
    showError('A expressão não pode ter mais de 16 caracteres.');
    return;
  }

  // Validação de caracteres
  if (!isValidExpression(expression)) {
    showError('A expressão contém caracteres inválidos. Use apenas letras de A-Z e espaços.');
    return;
  }

  if (wordList.length === 0) {
    showError('Dicionário não carregado. Aguarde um momento e tente novamente.');
    return;
  }

  // Inicia o cálculo
  startCalculation();

  try {
    const startTime = Date.now();
    const anagrams = await generateAnagrams(expression);
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000;

    displayResults(anagrams, expression, timeElapsed);
  } catch (error) {
    showError('Erro durante o cálculo: ' + error.message);
  } finally {
    endCalculation();
  }
}

// Manipula o clique no botão RETORNAR
function handleReturn() {
  expressionInput.value = '';
  updateCharCounter();
  clearResults();
  hideMessages();
  expressionInput.focus();
}

// Valida se a expressão contém apenas caracteres válidos
function isValidExpression(expression) {
  const validPattern = /^[A-Za-z\s]+$/;
  return validPattern.test(expression);
}

// Normaliza a expressão (remove espaços e converte para maiúsculas)
function normalizeExpression(expression) {
  return expression.replace(/\s/g, '').toUpperCase();
}

// Conta as letras de uma string
function countLetters(str) {
  const count = {};
  for (const char of str) {
    count[char] = (count[char] || 0) + 1;
  }
  return count;
}

// Verifica se uma palavra pode ser formada com as letras disponíveis
function canFormWord(word, availableLetters) {
  const wordLetters = countLetters(word);

  for (const [letter, needed] of Object.entries(wordLetters)) {
    if (!availableLetters[letter] || availableLetters[letter] < needed) {
      return false;
    }
  }
  return true;
}

// Remove as letras de uma palavra das letras disponíveis
function removeWordLetters(availableLetters, word) {
  const result = { ...availableLetters };
  for (const char of word) {
    result[char]--;
  }
  return result;
}

// Verifica se todas as letras foram usadas
function allLettersUsed(availableLetters) {
  return Object.values(availableLetters).every(count => count === 0);
}

// Algoritmo recursivo para gerar anagramas
function findAnagrams(availableLetters, currentAnagram = []) {
  // Se todas as letras foram usadas, retorna o anagrama atual
  if (allLettersUsed(availableLetters)) {
    return [currentAnagram.slice().sort()]; // Ordena alfabeticamente
  }

  const anagrams = [];
  const remainingLetterCount = Object.values(availableLetters).reduce((sum, count) => sum + count, 0);

  // Filtra palavras que podem ser formadas e têm tamanho apropriado
  const possibleWords = wordList.filter(
    word => word.length <= remainingLetterCount && canFormWord(word, availableLetters)
  );

  for (const word of possibleWords) {
    const newAvailableLetters = removeWordLetters(availableLetters, word);
    const newAnagram = [...currentAnagram, word];

    // Recursão
    const subAnagrams = findAnagrams(newAvailableLetters, newAnagram);
    anagrams.push(...subAnagrams);
  }

  return anagrams;
}

// Gera todos os anagramas possíveis
async function generateAnagrams(expression) {
  const normalizedExpression = normalizeExpression(expression);
  const letterCount = countLetters(normalizedExpression);

  // Executa o algoritmo com timeout para evitar travamento
  return new Promise((resolve, reject) => {
    const startTime = Date.now();
    const maxTime = 58000; // 58 segundos para deixar margem

    try {
      const anagrams = findAnagrams(letterCount);

      // Remove duplicatas convertendo para string e usando Set
      const uniqueAnagrams = Array.from(new Set(anagrams.map(anagram => anagram.join(' ')))).map(str => str.split(' '));

      const timeElapsed = Date.now() - startTime;

      if (timeElapsed > maxTime) {
        reject(new Error('Tempo limite excedido. Tente com uma expressão menor.'));
      } else {
        resolve(uniqueAnagrams);
      }
    } catch (error) {
      reject(error);
    }
  });
}

// Mostra o estado de carregamento
function startCalculation() {
  isCalculating = true;
  calculateBtn.disabled = true;
  returnBtn.disabled = true;
  hideMessages();
  loadingMessage.classList.remove('hidden');
  clearResults();
}

// Termina o estado de carregamento
function endCalculation() {
  isCalculating = false;
  calculateBtn.disabled = false;
  returnBtn.disabled = false;
  loadingMessage.classList.add('hidden');
}

// Exibe os resultados
function displayResults(anagrams, originalExpression, timeElapsed) {
  const normalizedExpression = normalizeExpression(originalExpression);

  // Mostra informações do cálculo
  calculationInfo.innerHTML = `
        <strong>Expressão original:</strong> "${originalExpression}"<br>
        <strong>Letras utilizadas:</strong> ${normalizedExpression} (${normalizedExpression.length} letras)<br>
        <strong>Anagramas encontrados:</strong> ${anagrams.length}<br>
        <strong>Tempo de processamento:</strong> ${timeElapsed.toFixed(2)} segundos<br>
        <strong>Palavras no dicionário:</strong> ${wordList.length}
    `;
  calculationInfo.classList.remove('hidden');

  // Exibe os anagramas
  if (anagrams.length > 0) {
    resultOutput.innerHTML = anagrams.map(anagram => `<div>${anagram.join(' ')}</div>`).join('');
  } else {
    resultOutput.innerHTML =
      '<div style="text-align: center; color: #888; font-style: italic;">Nenhum anagrama encontrado para esta expressão.</div>';
  }
}

// Mostra mensagem de erro
function showError(message) {
  errorMessage.textContent = message;
  errorMessage.classList.remove('hidden');
  calculationInfo.classList.add('hidden');
}

// Limpa os resultados
function clearResults() {
  resultOutput.innerHTML = '';
}

// Esconde todas as mensagens
function hideMessages() {
  errorMessage.classList.add('hidden');
  calculationInfo.classList.add('hidden');
  loadingMessage.classList.add('hidden');
}
