# COMPENSA CARROS - SIMULADOR FINANCEIRO AUTOMOTIVO

> Uma ferramenta de análise de decisão para aquisição de veículos, comparando o Custo Total de Propriedade (TCO) entre Aluguel (Assinatura), Compra à Vista e Financiamento.

-----------------------------------------------------------------------
🌐 DEMONSTRAÇÃO ONLINE
-----------------------------------------------------------------------
Acesse o projeto rodando em produção:
🔗 https://compensa-carros-bm58.vercel.app/

-----------------------------------------------------------------------
📖 SOBRE O PROJETO
-----------------------------------------------------------------------
O "Compensa Carros" não é apenas uma calculadora de parcelas. É um sistema de inteligência financeira que visa responder à pergunta: "Qual a melhor forma de ter um carro hoje?".

Diferente de calculadoras comuns, este projeto considera os "custos invisíveis" da posse de um veículo, como depreciação de mercado, IPVA, seguro e manutenção preventiva, oferecendo um comparativo honesto entre comprar um ativo (que desvaloriza) ou pagar pelo uso (assinatura).

-----------------------------------------------------------------------
🚀 FUNCIONALIDADES & LÓGICA DE NEGÓCIO
-----------------------------------------------------------------------
O sistema opera com uma API em Node.js que processa os cenários baseados em parâmetros de mercado realistas:

1. COMPRA À VISTA (Custo Real)
   - Lógica: Não basta ter o dinheiro. O carro gera custos mensais.
   - Cálculo: (Valor do Carro + IPVA/Seguro/Manutenção acumulados) - (Valor de Revenda Futuro).
   - Diferencial: Considera que o proprietário arca com ~7% do valor do carro ao ano em custos fixos.

2. COMPRA FINANCIADA (Tabela Price)
   - Lógica: Soma-se o custo do dinheiro (Juros) ao custo de propriedade.
   - Cálculo: Entrada + (Parcelas x Meses) + Custos de Propriedade - Valor de Revenda.
   - Detalhe: Utiliza a fórmula Price para cálculo exato da prestação bancária.

3. ALUGUEL / ASSINATURA (Carro por Assinatura)
   - Lógica: Pagamento pelo uso sem aquisição de passivo.
   - Cálculo: Mensalidade x Meses.
   - Vantagem: O valor já inclui IPVA, Seguro e Manutenção, permitindo comparação direta com os custos ocultos da compra.

--- PARÂMETROS DE MERCADO UTILIZADOS ---
• Depreciação do Veículo: 6% a.a. (Média de mercado).
• Custo de Propriedade: ~7% a.a. (IPVA 3% + Seguro 3% + Manutenção 1%).

-----------------------------------------------------------------------
🛠 TECNOLOGIAS UTILIZADAS
-----------------------------------------------------------------------

FRONTEND (Interface & UX):
• React.js: Biblioteca para construção de interfaces reativas.
• TypeScript: Tipagem estática para segurança e previsibilidade do código.
• Vite: Build tool de alta performance.
• CSS: Estilização modular e organizada.

BACKEND (API & Regra de Negócio):
• Node.js & Express: Servidor leve e escalável.
• TypeScript: Garante contratos de dados sólidos entre Front e Back.
• CORS: Controle de acesso para segurança da API.

INFRAESTRUTURA:
• Vercel: Hospedagem e CI/CD do Frontend.
• Render/Vercel (Backend): API de processamento.

-----------------------------------------------------------------------
📦 COMO RODAR LOCALMENTE
-----------------------------------------------------------------------
Pré-requisitos: Node.js (v18+) e Git.

1. Clone o repositório
   $ git clone https://github.com/GustavoViniciuse/compensa-carros.git
   $ cd compensa-carros

2. Configurando o BACKEND
   $ cd backend
   $ npm install
   $ npm run dev
   > O servidor será iniciado no ambiente da Vercel, mas também pode ser executado localmente em http://localhost:3000.

3. Configurando o FRONTEND
   (Abra um novo terminal)
   $ cd frontend
   $ npm install
   $ npm run dev
   > A aplicação abrirá em http://localhost:5173

-----------------------------------------------------------------------
📌 DECISÕES DE DESIGN E CÓDIGO
-----------------------------------------------------------------------
• Clean Code: Nomes de variáveis semânticos para facilitar leitura.
• Isolamento de Regras: O Frontend não calcula nada, apenas exibe. Se a regra mudar, alteramos apenas o Backend.
• UX Focada em Decisão: Os cards de resultado destacam o "Custo Real", não apenas a parcela, educando o usuário financeiramente.

-----------------------------------------------------------------------
AUTOR
-----------------------------------------------------------------------
Desenvolvido por Gustavo Vinicius Elias Souza Silva.
Focado em desenvolvimento Fullstack com React, Node.js e TypeScript.
