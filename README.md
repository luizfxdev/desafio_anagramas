#✨  Solucionador de Anagramas

O Solucionador de Anagramas é uma aplicação web moderna que encontra todos os anagramas possíveis de uma palavra ou frase, utilizando um dicionário de mais de 400.000 palavras em inglês. Com um design cyberpunk inspirado no futuro e animações suaves, oferece uma experiência única para resolver este clássico desafio da programação.

🎯 O que são Anagramas?
Um anagrama é uma palavra ou frase formada com o rearranjo de todas as letras de outra palavra ou frase, sem sobra ou falta.
Exemplos:

BARCO → COBRA ✅
LISTEN → SILENT ✅
MAR → ROMA ❌ (letra 'O' não usada)


🌟 Funcionalidades
🎨 Design Futurístico

Interface cyberpunk com tons de ciano (#03e9f4)
Animações de hover com efeitos de brilho
Glassmorphism e backdrop blur
Totalmente responsivo

⚡ Performance Otimizada

Algoritmo recursivo eficiente
Processamento em até 60 segundos
Suporte para expressões de até 16 caracteres
Carregamento assíncrono do dicionário

🔍 Funcionalidades Inteligentes

Validação de caracteres em tempo real
Contador de caracteres dinâmico
Ordenação alfabética automática
Remoção de anagramas duplicados
Feedback visual completo


🚀 Demonstração
Entrada: "OI GENTE"
Resultado:
GO I TEEN
GENE I TO
GET I ONE
EON GET I
ENG I TOE
GEE I TON
GEE I NOT
EGO I NET
EGO I TEN
...
Entrada: "LISTEN"
Resultado:
ENLIST
SILENT
TIN SEL
...

⚡ Instalação Rápida
1️⃣ Clone o Repositório
bashgit clone https://github.com/seu-usuario/solucionador-anagramas.git
cd solucionador-anagramas
2️⃣ Estrutura do Projeto
DESAFIO_ANAGRAMAS/
├── 📁 assets/
│   └── 📄 words.txt
├── 📄 index.html
├── 🎨 styles.css
├── ⚙️ script.js
└── 📖 README.md
3️⃣ Baixar o Dicionário
Baixe o arquivo words.txt oficial:
bash# Opção 1: Download direto
wget https://osprogramadores.com/desafios/d06/words.txt -O assets/words.txt

# Opção 2: Usando curl
curl https://osprogramadores.com/desafios/d06/words.txt -o assets/words.txt
4️⃣ Executar o Projeto
bash# Abra o index.html no seu navegador favorito
# Ou use um servidor local como Live Server (VS Code)

🎯 Como Usar
Passo a Passo

Digite a Expressão

Máximo de 16 caracteres
Apenas letras A-Z e espaços
Exemplo: "BARCO" ou "OI GENTE"


Clique em CALCULAR

Aguarde o processamento
Veja o loading animado


Visualize os Resultados

Anagramas ordenados alfabeticamente
Informações detalhadas do cálculo
Tempo de processamento


Use RETORNAR

Limpa os campos
Pronto para nova consulta



💡 Dicas de Uso

Palavras curtas (4-6 letras): Resultados instantâneos
Frases médias (8-12 letras): Poucos segundos
Expressões longas (13-16 letras): Até 60 segundos


🛠️ Tecnologias
Frontend

HTML5: Estrutura semântica
CSS3: Animações e responsividade
JavaScript ES6+: Lógica e algoritmos

Recursos Utilizados

Google Fonts: Raleway
Flexbox: Layout responsivo
CSS Animations: Efeitos visuais
FileReader API: Carregamento de arquivos
Async/Await: Operações assíncronas

Algoritmos

Recursão: Busca de anagramas
Backtracking: Otimização da busca
Hash Maps: Contagem de letras
Set: Remoção de duplicatas


🧪 Exemplos de Teste
🟢 Casos Simples
javascript"BARCO"  → BORA C, CARB O, etc.
"AMOR"   → MORA, ROMA, ARM O, etc.
"CASA"   → AS AC, etc.
🟡 Casos Médios
javascript"LISTEN"    → SILENT, ENLIST, TIN SEL, etc.
"CINEMA"    → ICE MAN, MAIN CE, etc.
"RATO"      → TORA, ROTA, TAR O, etc.
🔴 Casos Complexos
javascript"OI GENTE"     → 20+ anagramas
"AMOR ETERNO"  → Centenas de combinações
"CASA BONITA"  → Processamento intenso

📊 Performance
Métricas de Performance

Palavras no dicionário: ~400.000
Tempo máximo: 60 segundos
Caracteres suportados: Até 16
Algoritmo: O(n!) no pior caso
Memória: Otimizada com hash maps

Otimizações Implementadas

✅ Poda de busca inválida
✅ Cache de contagem de letras
✅ Filtro prévio de palavras
✅ Remoção eficiente de duplicatas
✅ Timeout para evitar travamento


🎨 Design System
Paleta de Cores
css--primary-color: #03e9f4    /* Ciano vibrante */
--bg-primary: #050801       /* Preto esverdeado */
--text-primary: #ffffff     /* Branco puro */
--text-secondary: #cccccc   /* Cinza claro */
--error-color: #ff6666      /* Vermelho suave */
Tipografia

Fonte: Raleway (Google Fonts)
Pesos: 400 (Regular), 600 (SemiBold), 700 (Bold)
Hierarquia: H1 (2.5rem), Body (1.1rem), Small (0.9rem)

Animações

Hover: 0.5s ease transition
Glow Effect: Box-shadow com blur
Loading: Spinner rotativo
Reflection: -webkit-box-reflect



Fork o projeto

Crie uma branch para sua feature (git checkout -b feature/AmazingFeature)
Commit suas mudanças (git commit -m 'Add some AmazingFeature')
Push para a branch (git push origin feature/AmazingFeature)
Abra um Pull Request

🐛 Reportando Bugs

Use as Issues
Descreva o problema detalhadamente
Inclua screenshots se possível
Mencione seu navegador e versão


📝 Licença
Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

🏆 Créditos

Inspiração

Desafio: Os Programadores
Dicionário: Lista oficial de palavras em inglês
Design: Inspirado em interfaces cyberpunk

Desenvolvido com ❤️ por

[@luizfx.dev] - Desenvolvedor Full Stack

🌟 Se gostou do projeto, deixe uma estrela!
