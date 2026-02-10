<<<<<<< HEAD
# 🚗 Compensa Carros

> Uma aplicação web completa para comparar financeiramente os cenários de **comprar** ou **alugar** um carro.

Este projeto demonstra boas práticas de desenvolvimento, com separação clara entre frontend e backend, código bem organizado e lógica de negócio centralizada.

---

## 📋 Índice

- [Visão Geral](#-visão-geral)
- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação](#-instalação)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [API - Documentação](#-api--documentação)
- [Lógica de Negócio](#-lógica-de-negócio)
- [Executar Localmente](#-executar-localmente)
- [Decisões Técnicas](#-decisões-técnicas)
- [Deploy](#-deploy)
- [Autor](#-autor)

---

## 🎯 Visão Geral

**Compensa Carros** é um simulador financeiro que ajuda o usuário a tomar a melhor decisão: comprar um carro à vista, financiar sua compra ou alugar mensalmente.

O sistema compara 3 cenários:
- 💰 **Aluguel Mensal**: Soma os custos mensais sem adquirir o bem
- 🏦 **Compra à Vista**: Considera depreciação e custos de manutenção
- 📊 **Financiamento**: Calcula as parcelas e custos associados

Ao final, o usuário recebe uma recomendação clara sobre qual opção é mais economicamente viável.

---

## ✨ Funcionalidades

✅ Interface intuitiva para inserir parâmetros da simulação  
✅ Cálculos financeiros precisos usando a Tabela Price para financiamentos  
✅ Consideração de depreciação do veículo (6% ao ano)  
✅ Inclusão de custos de propriedade (IPVA, Seguro, Revisão = 7% ao ano)  
✅ Comparação lado-a-lado dos 3 cenários  
✅ Recomendação automática da melhor opção  
✅ API robusta e reutilizável  
✅ Código limpo, comentado e fácil de manter  

---

## 🛠 Tecnologias

### Frontend
- **React 19** - Biblioteca UI
- **TypeScript** - Tipagem estática
- **Vite** - Build tool moderno
- **CSS** - Estilização
- **Axios** - Cliente HTTP

### Backend
- **Node.js** - Runtime JavaScript
- **Express 5** - Framework web
- **TypeScript** - Tipagem estática
- **CORS** - Controle de origem
- **Nodemon** - Desenvolvimento com hot-reload

### Infraestrutura
- **Vercel** - Deploy do frontend
- **Node/Express** - Deploy do backend

---

## 📦 Pré-requisitos

Antes de começar, você precisará ter instalado:

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **npm** (vem com Node.js)
- **Git** ([Download](https://git-scm.com/))

Verifique a instalação:
```bash
node --version  # v18.0.0 ou superior
npm --version   # 9.0.0 ou superior
```

---

## 🚀 Instalação

### 1️⃣ Clone o repositório

```bash
git clone https://github.com/GustavoViniciuse/compensa-carros.git
cd compensa-carros
```

### 2️⃣ Configure o Backend

```bash
cd backend
npm install
npm run dev
```

O servidor iniciará em **http://localhost:3000**

### 3️⃣ Configure o Frontend

Abra outro terminal e navegue até a pasta frontend:

```bash
cd frontend
npm install
npm run dev
```

A aplicação estará disponível em **http://localhost:5173**

---

## 📁 Estrutura do Projeto

```
compensa-carros/
├── backend/
│   ├── src/
│   │   ├── server.ts                 # Arquivo principal do servidor
│   │   ├── controllers/
│   │   │   └── SimulationController.ts  # Controlador das requisições
│   │   ├── services/
│   │   │   └── ComparisonService.ts     # Lógica de negócio
│   │   └── routes/
│   │       └── SimulationRoutes.ts      # Definição de rotas
│   ├── package.json
│   ├── tsconfig.json
│   └── vercel.json                   # Configuração para deploy
│
├── frontend/
│   ├── src/
│   │   ├── main.tsx                  # Ponto de entrada
│   │   ├── App.tsx                   # Componente raiz
│   │   ├── components/
│   │   │   ├── Header/               # Cabeçalho da aplicação
│   │   │   ├── InputGroup/           # Grupo de inputs reutilizável
│   │   │   ├── SimulationForm/       # Formulário de entrada
│   │   │   └── SimulationResults/    # Exibição dos resultados
│   │   ├── services/
│   │   │   └── api.ts                # Cliente HTTP
│   │   ├── types/
│   │   │   └── Simulation.ts         # Tipos TypeScript
│   │   └── styles/
│   │       └── global.css            # Estilos globais
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── README.md
└── LICENSE
```

### Descrição dos diretórios principais:

- **`backend/src/controllers/`**: Controladores que tratam as requisições HTTP
- **`backend/src/services/`**: Contém a lógica de negócio (cálculos financeiros)
- **`backend/src/routes/`**: Define os endpoints da API
- **`frontend/src/components/`**: Componentes React reutilizáveis
- **`frontend/src/services/`**: Comunicação com o backend via HTTP
- **`frontend/src/types/`**: Definições de tipos TypeScript

---

## 📡 API - Documentação

### Endpoint: Calcular Simulação

**POST** `/api/calculate`

Realiza o cálculo comparativo entre os 3 cenários de compra/aluguel.

#### Request Body

```json
{
  "carValue": 50000,
  "monthlyRent": 1500,
  "interestRate": 1.5,
  "loanTerm": 60,
  "downPayment": 10000
}
```

| Campo | Tipo | Obrigatório | Descrição |
|-------|------|-------------|-----------|
| `carValue` | número | ✅ | Valor total do carro em reais |
| `monthlyRent` | número | ✅ | Valor mensal do aluguel em reais |
| `interestRate` | número | ❌ | Taxa de juros mensal (padrão: 1.5%) |
| `loanTerm` | número | ✅ | Prazo do financiamento em meses |
| `downPayment` | número | ❌ | Entrada do financiamento em reais (padrão: 0) |

#### Response (Sucesso - 200)

```json
{
  "months": 60,
  "scenarios": {
    "rent": {
      "label": "Aluguel",
      "initialPayment": 0,
      "monthlyPayment": 1500,
      "totalOutOfPocket": 90000,
      "futureAssetValue": 0,
      "finalEconomicCost": 90000
    },
    "cash": {
      "label": "Compra à Vista",
      "initialPayment": 50000,
      "monthlyPayment": 583.33,
      "totalOutOfPocket": 85000,
      "futureAssetValue": 22387.25,
      "finalEconomicCost": 62612.75
    },
    "financed": {
      "label": "Financiamento",
      "initialPayment": 10000,
      "monthlyPayment": 727.47,
      "totalOutOfPocket": 53648.20,
      "futureAssetValue": 22387.25,
      "finalEconomicCost": 31260.95
    }
  },
  "bestChoice": "Financiamento"
}
```

#### Response (Erro - 400)

```json
{
  "error": "Campos obrigatórios"
}
```

#### Exemplo de Requisição (curl)

```bash
curl -X POST http://localhost:3000/api/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "carValue": 50000,
    "monthlyRent": 1500,
    "interestRate": 1.5,
    "loanTerm": 60,
    "downPayment": 10000
  }'
```

#### Exemplo com JavaScript/Axios

```typescript
import axios from 'axios';

const response = await axios.post('http://localhost:3000/api/calculate', {
  carValue: 50000,
  monthlyRent: 1500,
  interestRate: 1.5,
  loanTerm: 60,
  downPayment: 10000
});

console.log(response.data.bestChoice); // Output: "Financiamento"
```

---

## 💡 Lógica de Negócio

### Variáveis de Cálculo

```
ANNUAL_DEPRECIATION = 6%           // Desvalorização anual do veículo
RATE_IPVA = 3%                     // Taxa média de IPVA
RATE_INSURANCE = 3%                // Taxa média de seguro
RATE_MAINTENANCE = 1%              // Taxa média de manutenção
TOTAL_OWNERSHIP_RATE = 7%          // Soma dos custos anuais
```

### 1️⃣ Cenário: Aluguel

**Custo Total = Aluguel Mensal × Quantidade de Meses**

```
Aluguel por 60 meses a R$ 1.500/mês = R$ 1.500 × 60 = R$ 90.000
```

**Características:**
- Sem pagamento inicial
- Sem ativo final (carro não é seu)
- Custo é linear e previsível
- Sem custos de manutenção (responsabilidade da locadora)

---

### 2️⃣ Cenário: Compra à Vista

**Processo de Cálculo:**

1. **Valor Futuro do Carro** (com depreciação)
   ```
   futureCarValue = carValue × (1 - 0.06)^anos
   ```

2. **Custo de Propriedade**
   ```
   avgCarValue = (carValue + futureCarValue) / 2
   totalOwnershipCost = avgCarValue × 0.07 × anos
   ```

3. **Custo Total**
   ```
   totalCost = carValue + totalOwnershipCost
   finalEconomicCost = totalCost - futureCarValue
   ```

**Exemplo com R$ 50.000 em 5 anos:**
```
Valor futuro: R$ 50.000 × (1 - 0.06)^5 = R$ 36.875
Custo Total: R$ 50.000 + R$ 24.000 = R$ 74.000
Custo Final: R$ 74.000 - R$ 36.875 = R$ 37.125
```

---

### 3️⃣ Cenário: Financiamento

**Utiliza a Tabela Price (Sistema de Amortização)** para calcular as parcelas.

**Fórmula da Parcela:**
```
P = V × [i(1+i)^n] / [(1+i)^n - 1]

Onde:
P = Parcela mensal
V = Valor do financiamento (Carro - Entrada)
i = Taxa de juros mensal
n = Número de parcelas
```

**Exemplo com R$ 40.000 de financiamento, 60 meses, 1.5% a.m.:**
```
Parcela ≈ R$ 727,47
Total pago ao banco = R$ 727,47 × 60 = R$ 43.648
Custo de propriedade (5 anos) = R$ 24.000
Custo total = R$ 10.000 (entrada) + R$ 43.648 + R$ 24.000 = R$ 77.648
Custo final = R$ 77.648 - R$ 36.875 = R$ 40.773
```

---

### 📊 Tabela de Comparação

| Aspecto | Aluguel | Compra à Vista | Financiamento |
|---------|---------|---|---|
| Pagamento Inicial | R$ 0 | R$ 50.000 | R$ 10.000 |
| Custo Mensal | R$ 1.500 | R$ 583 | R$ 894 |
| Ativo Final | R$ 0 | R$ 36.875 | R$ 36.875 |
| Custo Total | R$ 90.000 | R$ 74.000 | R$ 77.648 |
| Custo Econômico Final | R$ 90.000 | R$ 37.125 | R$ 40.773 |
| Melhor em? | Curto prazo | Médio prazo | Longo prazo |

---

## 🏃 Executar Localmente

### Terminal 1 - Backend

```bash
cd backend
npm install
npm run dev
```

Você deve ver:
```
API Rodando em: http://localhost:3000
```

### Terminal 2 - Frontend

```bash
cd frontend
npm install
npm run dev
```

Você deve ver:
```
VITE v7.2.4  ready in 123 ms

➜  Local:   http://localhost:5173/
```

### Testando a Aplicação

1. Abra [http://localhost:5173](http://localhost:5173) no navegador
2. Preencha os campos do formulário:
   - Valor do carro
   - Aluguel mensal
   - Taxa de juros
   - Prazo em meses
   - Entrada (opcional)
3. Clique em "Calcular"
4. Veja a recomendação e comparação dos 3 cenários

---

## 🧠 Decisões Técnicas

### ✔️ Arquitetura

**Separação Frontend/Backend**
- Frontend responsável apenas por UI/UX
- Backend centraliza toda lógica de negócio
- Facilita testes, manutenção e escalabilidade

**Padrão MVC no Backend**
- **Models/Types**: Definem interfaces de entrada/saída
- **Controllers**: Tratam requisições HTTP
- **Services**: Contêm a lógica de negócio

### ✔️ Linguagem

**TypeScript em ambos os lados**
- Type safety evita bugs em runtime
- Melhor autocompletar e documentation
- Mais seguro para refatorações

**Inferência de Tipos**
- Menos verbosidade mantendo segurança
- Interfaces bem definidas para dados de entrada/saída

### ✔️ Estrutura de Código

**Código Comentado**
- Cálculos financeiros devidamente explicados
- Facilita entendimento e manutenção
- Serve como documentação viva

**Separação de Responsabilidades**
- Cada arquivo tem uma única responsabilidade
- Fácil localizar e modificar funcionalidades
- Reutilizável em outros projetos

### ✔️ Ferramentas

**Vite**
- Build extremamente rápido
- Desenvolvimento com hot reload instantâneo
- Otimizado para produção

**Express 5**
- Framework simples e robusto
- Middleware pattern bem conhecido
- Grande ecossistema

**CORS**
- Permite requisições do frontend para backend
- Configurável e seguro

---

## 🌐 Deploy

### Frontend na Vercel

O frontend está configurado para deploy automático na Vercel.

```bash
# A Vercel detecta automaticamente
# Vite + React + TypeScript
```

**URL de produção:**
```
https://compensa-carros-bm58.vercel.app/
```

### Backend em Produção

O backend também está configurado no vercel para deploy automático:

- **Vercel** (com arquivo `vercel.json` incluído)

## 👨‍💻 Autor

**Gustavo Vinicius Elias Souza Silva**

---

## 🙏 Agradecimentos

Este projeto foi desenvolvido com foco em:
- ✨ **Clareza** do código
- 🏗️ **Boas práticas** de arquitetura
- 📚 **Documentação** completa
- 🧪 **Lógica de negócio** robusta

Mais do que apenas mostrar um resultado, ele demonstra a forma de pensar, estruturar e resolver problemas reais de software.

---

**Desenvolvido em 2026**
=======
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
>>>>>>> 6e883a9428b72b6a41d2268c2433997f7b7f81dc
