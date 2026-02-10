# 🚗 Projeto Compensa Carros

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
