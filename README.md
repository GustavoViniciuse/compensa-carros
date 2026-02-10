COMPENSA CARROS
================================

Este projeto tem como objetivo comparar financeiramente se vale mais a pena **alugar um carro** ou **comprar** (à vista ou financiado), considerando diferentes cenários e parâmetros definidos pelo usuário.

O foco não é apenas o resultado final, mas **a estrutura do projeto, organização do código e clareza da lógica**.

--------------------------------
🚀 VISÃO GERAL
--------------------------------

O sistema permite simular:

• Compra à vista  
• Compra financiada  
• Aluguel mensal de um carro  

Com base em valores como preço do carro, valor do aluguel, taxa de juros, prazo e outros custos, o sistema retorna qual opção é financeiramente mais vantajosa ao longo do tempo.

--------------------------------
🛠 TECNOLOGIAS UTILIZADAS
--------------------------------

Frontend:
• React
• TypeScript
• Vite
• CSS

Backend:
• Node.js
• Express
• TypeScript
• CORS

Infraestrutura:
• Frontend hospedado na Vercel
• Backend rodando via Node/Express

--------------------------------
📊 LÓGICA DE NEGÓCIO
--------------------------------

1. COMPRA À VISTA
- Considera o valor total do carro pago imediatamente
- Aplica depreciação ao longo do tempo
- Compara o valor final do bem com o custo acumulado das depreciações

2. COMPRA FINANCIADA
- Calcula parcelas com base na taxa de juros e prazo
- Soma o valor total pago ao longo do financiamento
- Aplica depreciação do veículo durante o período

3. ALUGUEL
- Soma o valor mensal do aluguel pelo número de meses
- Não há ativo final (o carro não é do usuário)

O backend centraliza os cálculos para manter regras de negócio isoladas do frontend.

--------------------------------
📦 COMO RODAR O PROJETO LOCALMENTE
--------------------------------

PRÉ-REQUISITOS:
• Node.js (versão 18 ou superior)
• Git

1️⃣ CLONAR O REPOSITÓRIO

1-git clone [https://github.com/GustavoViniciuse/compensa-carros]

2-cd compensa-carros

2️⃣ RODAR O BACKEND

1-cd backend

2-npm install

3-npm run dev

Servidor rodando em:
http://localhost:3000

3️⃣ RODAR O FRONTEND

1-cd frontend

2-npm install

3-npm run dev

Aplicação disponível em:
http://localhost:5173

--------------------------------
🌐 DEPLOY
--------------------------------

O frontend já foi publicado na Vercel.

🔗 URL do projeto:
(INSIRA AQUI A URL DA VERCEL)

--------------------------------
🧠 DECISÕES TÉCNICAS
--------------------------------

• Separação total entre frontend e backend
• Backend responsável por toda a regra de negócio
• Frontend focado apenas em interface e experiência do usuário
• Código comentado e organizado para facilitar entendimento
• Estrutura pensada para fácil manutenção e escalabilidade

--------------------------------
✨ EXTRAS IMPLEMENTADOS
--------------------------------

• Interface simples e clara
• Código limpo e comentado
• README detalhado
• Deploy online

--------------------------------
📌 CONSIDERAÇÕES FINAIS
--------------------------------

Este projeto foi desenvolvido com foco em clareza, organização e boas práticas.
Mais do que apenas mostrar um resultado, ele demonstra a forma de pensar, estruturar e resolver problemas reais de software.

--------------------------------
Autor: Gustavo Vinicius Elias Souza Silva
