# 📘 Documentação Técnica — Salarium

> **Salarium** — Calculadora Trabalhista da União Europeia

---

## 📋 Índice

1. [Sobre o Projeto](#-sobre-o-projeto)
2. [Tecnologias Utilizadas](#-tecnologias-utilizadas)
3. [Estrutura do Projeto](#-estrutura-do-projeto)
4. [Explicação Detalhada dos Arquivos](#-explicação-detalhada-dos-arquivos)
5. [Como Instalar as Dependências](#-como-instalar-as-dependências)
6. [Como Rodar o Projeto Localmente](#-como-rodar-o-projeto-localmente)
7. [Como Clonar o Repositório](#-como-clonar-o-repositório)

---

## 🎯 Sobre o Projeto

**Salarium** (do latim *salarium* — origem da palavra "salário", já que os soldados romanos eram pagos com sal) é uma ferramenta web gratuita e open-source para cálculo de custos trabalhistas em toda a União Europeia.

A aplicação permite selecionar qualquer um dos **27 países da UE** e calcular instantaneamente:

- 💰 **Salário** — Valores por hora, dia, semana, mês e ano
- 🎄 **13º e 14º Salário** — Cálculo proporcional com base nos meses trabalhados
- 🏖️ **Férias** — Valor de férias com bônus específicos por país
- 📅 **Feriados** — Calendário interativo com feriados nacionais (API Nager.Date)
- 🧮 **Calculadora Científica** — Calculadora flutuante integrada com funções avançadas

Suporta **23 idiomas** e utiliza dados oficiais do **Eurostat**, **Eurofound** e portais governamentais.

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| **Next.js** | 16.2.1 | Framework React com App Router e React Compiler |
| **React** | 19.2.4 | Biblioteca de UI com hooks modernos |
| **TypeScript** | ^5 | Tipagem estática para JavaScript |
| **Tailwind CSS** | ^4 | Framework CSS utility-first |
| **Framer Motion** | ^12.38.0 | Animações e transições fluidas |
| **Supabase** | ^2.101.1 | Backend-as-a-Service (analytics de uso) |
| **PostCSS** | — | Processamento CSS com plugin Tailwind |
| **ESLint** | ^9 | Linting e qualidade de código |
| **API Nager.Date** | v3 | API externa para feriados nacionais |

### 🔧 Configurações Especiais

- **React Compiler** habilitado (`reactCompiler: true` no `next.config.ts`)
- **Fontes**: Inter (texto) e JetBrains Mono (números/código)
- **Deploy**: Vercel (pasta `.vercel` presente)

---

## 📂 Estrutura do Projeto

```
calculadora/
├── 📄 package.json                  # Dependências e scripts
├── 📄 next.config.ts                # Configuração do Next.js (React Compiler)
├── 📄 tsconfig.json                 # Configuração do TypeScript
├── 📄 postcss.config.mjs            # PostCSS com Tailwind CSS v4
├── 📄 eslint.config.mjs             # ESLint com regras Next.js
├── 📄 .gitignore                    # Arquivos ignorados pelo Git
│
├── 📁 public/                       # Arquivos estáticos
│   ├── icon.svg                     # Ícone/favicon da aplicação
│   ├── logo.svg                     # Logo do Salarium
│   ├── file.svg                     # Ícone de arquivo
│   ├── globe.svg                    # Ícone de globo
│   ├── next.svg                     # Logo Next.js
│   ├── vercel.svg                   # Logo Vercel
│   └── window.svg                   # Ícone de janela
│
├── 📁 src/
│   ├── 📁 app/                      # App Router (Next.js)
│   │   ├── layout.tsx               # Layout raiz (fontes, metadata, providers)
│   │   ├── page.tsx                 # Página principal (Home)
│   │   ├── globals.css              # Estilos globais + animações
│   │   ├── favicon.ico              # Favicon
│   │   │
│   │   ├── 📁 components/
│   │   │   └── Calculator.tsx       # Calculadora científica flutuante
│   │   │
│   │   └── 📁 trabalhista/
│   │       ├── page.tsx             # Redirect para "/"
│   │       └── 📁 components/
│   │           ├── CountrySelector.tsx          # Seletor de países
│   │           ├── SalaryCalculator.tsx         # Calculadora de salário
│   │           ├── ThirteenthSalaryCalculator.tsx  # Calculadora de 13º/14º
│   │           ├── VacationCalculator.tsx       # Calculadora de férias
│   │           └── HolidaysPanel.tsx            # Painel de feriados/calendário
│   │
│   ├── 📁 context/
│   │   └── LanguageContext.tsx       # Context de idioma (i18n)
│   │
│   ├── 📁 data/
│   │   ├── countries.ts             # Dados dos 27 países da UE
│   │   └── translations.ts          # Traduções em 23 idiomas
│   │
│   └── 📁 lib/
│       ├── format.ts                # Formatação de moeda e locales
│       └── supabase.ts              # Cliente Supabase (analytics)
│
└── 📁 .vercel/                      # Configurações de deploy Vercel
```

---

## 📄 Explicação Detalhada dos Arquivos

### 🏗️ Configuração

#### `package.json`
Define o projeto "calculadora" v0.1.0 com os scripts:
- `dev` — Inicia o servidor de desenvolvimento
- `build` — Gera o build de produção
- `start` — Inicia o servidor de produção
- `lint` — Executa o ESLint

#### `next.config.ts`
Configuração mínima do Next.js com o **React Compiler** habilitado, permitindo otimizações automáticas de re-renders.

#### `tsconfig.json`
TypeScript configurado com:
- Target ES2017, módulos ESNext
- Strict mode ativado
- Path alias `@/*` → `./src/*`
- Plugin Next.js para types automáticos

#### `postcss.config.mjs`
Usa o plugin `@tailwindcss/postcss` para processar Tailwind CSS v4.

#### `eslint.config.mjs`
ESLint com as regras `core-web-vitals` e `typescript` do Next.js.

---

### 🎨 Estilos

#### `src/app/globals.css`
Estilos globais que incluem:
- **Tema escuro** com background `#0a0e1a` e foreground `#e2e8f0`
- **Variáveis de fonte**: Inter (sans) e JetBrains Mono (mono)
- **Efeitos de botão** (`.btn-calc`): Animação de "press" com `scale(0.97)` e `translateY(1px)`
- **LED de energia** (`.power-led`): Efeito de brilho pulsante azul
- **Animação de histórico** (`.history-enter`): Slide-up com fade
- **Scrollbar customizada**: Estilo minimalista para o painel de histórico
- **Utilitário `.scrollbar-none`**: Esconde scrollbar em todos os browsers

---

### 📱 Páginas e Layout

#### `src/app/layout.tsx`
Layout raiz da aplicação:
- Carrega as fontes **Inter** e **JetBrains Mono** via `next/font/google`
- Define metadata SEO (título: "Salarium — EU Labor Calculator")
- Envolve toda a aplicação com o `LanguageProvider` para internacionalização
- Define o ícone da aplicação (`/icon.svg`)

#### `src/app/page.tsx`
Página principal — componente client-side com toda a lógica da aplicação:
- **Header fixo** com logo Salarium, seletor de idioma e botão da calculadora
- **Seletor de país** com grid de bandeiras
- **Painel de detalhes** do país selecionado (salário mínimo, taxas por idade, etc.)
- **Abas** (Salário, 13º, Férias, Feriados) com animações de transição
- **Calculadora flutuante** estilo macOS (draggable, minimizável, com botões de semáforo)
- **Footer** com link para LinkedIn, fontes de dados e disclaimers
- **Persistência** da seleção de país via localStorage

#### `src/app/trabalhista/page.tsx`
Página que simplesmente redireciona para `/` usando `redirect()` do Next.js. Serve como rota alternativa.

---

### 🧮 Componentes

#### `src/app/components/Calculator.tsx`
Calculadora científica completa com:
- **Motor matemático** que avalia expressões com suporte a:
  - Operações básicas (+, −, ×, ÷)
  - Funções trigonométricas (sin, cos, tan) e inversas (asin, acos, atan)
  - Logaritmos (log base 10, ln natural)
  - Raiz quadrada, potência, fatorial, valor absoluto
  - Constantes (π, e)
  - Percentagem
  - Multiplicação implícita (ex: `2(3)` = `2*3`)
- **Modos DEG/RAD** para funções trigonométricas
- **Memória** (MC, MR, M+, M−)
- **Histórico** de até 50 cálculos com overlay
- **Preview em tempo real** da expressão sendo digitada
- **Suporte a teclado** completo (0-9, operadores, Enter, Backspace, Escape)
- **State management** via `useReducer` com 12 tipos de ação
- **Design** estilo macOS com LED de energia, header SALARIUM e display monocromático azul

#### `src/app/trabalhista/components/CountrySelector.tsx`
Seletor de países com:
- **Campo de busca** por nome, nome local ou código do país
- **Grid responsivo** de países com bandeira, nome e salário mínimo
- **Separação** entre países com e sem salário mínimo estatutário
- **Seção expansível** para países sem salário mínimo (Áustria, Dinamarca, Finlândia, Itália, Suécia, Chipre)
- **Animações** de hover, tap e layout com Framer Motion
- **Destaque visual** no país selecionado

#### `src/app/trabalhista/components/SalaryCalculator.tsx`
Calculadora de salário com funcionalidades avançadas:
- **Dois modos de entrada**: por hora ou por mês
- **Campos customizáveis**: horas por dia e dias trabalhados por mês
- **Cálculos automáticos**: valor por hora, dia, semana, mês e ano
- **Detecção de horas extras**: calcula automaticamente quando as horas excedem o padrão legal (150%)
- **Estimativa bruto/líquido**: com toggle para mostrar valores líquidos
- **Conversão de moeda local**: para países que não usam Euro
- **Persistência**: todos os inputs são salvos no localStorage por país
- **Analytics**: salva cálculos no Supabase para estatísticas

#### `src/app/trabalhista/components/ThirteenthSalaryCalculator.tsx`
Calculadora de 13º (e 14º) salário:
- **Slider** de meses trabalhados (1 a 12)
- **Cálculo proporcional**: (salário / 12) × meses trabalhados
- **Suporte a 14º salário**: para países como Portugal e Grécia
- **Vakantiegeld**: cálculo do subsídio de férias holandês (8% do salário anual)
- **Tratamento especial** para países sem 13º obrigatório
- **Input de salário customizado** para países sem salário mínimo

#### `src/app/trabalhista/components/VacationCalculator.tsx`
Calculadora de férias:
- **Slider** dinâmico de dias de férias (mínimo legal até máximo + 10)
- **Cálculo do valor diário**: salário mensal / dias úteis por mês
- **Bônus de férias**: cálculo automático com taxas específicas por país
- **Informações contextuais**: mínimo legal, prática comum, existência de bônus
- **Totais**: valor das férias + bônus = total bruto

#### `src/app/trabalhista/components/HolidaysPanel.tsx`
Painel de feriados nacionais:
- **Calendário visual** de 12 meses com código de cores
- **API externa** (date.nager.at) para feriados atualizados
- **Seletor de ano** (navegação com setas)
- **Dias de folga customizáveis**: toggle para cada dia da semana (padrão: Sábado e Domingo)
- **Estatísticas**: dias úteis no ano, feriados nacionais, feriados em dia útil, feriados "perdidos" em dia de folga
- **Legenda de cores**: feriado em dia útil (ciano), feriado em folga (vermelho), dia de folga (roxo), hoje (azul)
- **Modal de detalhes**: ao clicar em um dia, mostra informações detalhadas do feriado
- **Persistência**: dias de folga salvos no localStorage por país

---

### 🌍 Internacionalização

#### `src/context/LanguageContext.tsx`
Context React para gerenciamento de idioma:
- **Provider** que envolve toda a aplicação
- **Hook `useTranslation()`** retorna `{ lang, t, setLang }`
- **Persistência** do idioma selecionado via localStorage (`salarium_lang`)
- **Idioma padrão**: inglês (`en`)

#### `src/data/translations.ts`
Arquivo de traduções com:
- **Interface `Translation`** definindo todas as chaves necessárias
- **23 idiomas** suportados: 🇬🇧 English, 🇵🇹 Português, 🇩🇪 Deutsch, 🇫🇷 Français, 🇪🇸 Español, 🇮🇹 Italiano, 🇳🇱 Nederlands, 🇵🇱 Polski, 🇷🇴 Română, 🇨🇿 Čeština, 🇭🇺 Magyar, 🇧🇬 Български, 🇬🇷 Ελληνικά, 🇭🇷 Hrvatski, 🇸🇰 Slovenčina, 🇸🇮 Slovenščina, 🇱🇹 Lietuvių, 🇱🇻 Latviešu, 🇪🇪 Eesti, 🇲🇹 Malti, 🇫🇮 Suomi, 🇸🇪 Svenska, 🇩🇰 Dansk
- **Nomes de meses e dias da semana** traduzidos em cada idioma
- **Lista `langList`** com código, nome e bandeira de cada idioma

#### `src/data/countries.ts`
Base de dados completa dos 27 países da UE:
- **Interface `CountryData`** com tipagem rigorosa
- **Dados por país**: código, nome (EN + local), bandeira, moeda, salário mínimo, jornada de trabalho, férias, 13º salário, impostos
- **Taxas por idade**: para países como Holanda e Irlanda
- **Taxa de trabalhador qualificado**: para países como Grécia
- **Taxa de período probatório**: salário reduzido durante período experimental
- **Funções auxiliares**: `getCountryByCode()`, listas de países com/sem salário mínimo
- **Ordenação**: países agrupados por faixa salarial (acima de 1500€, 1000-1500€, abaixo de 1000€, sem mínimo)

---

### 📚 Bibliotecas Utilitárias

#### `src/lib/format.ts`
Funções de formatação:
- **`getLocale(lang)`** — Mapeia código de idioma para locale (ex: `pt` → `pt-PT`)
- **`formatCurrency(value, lang)`** — Formata número como moeda com 2 casas decimais
- **`WEEKS_PER_MONTH`** — Constante `4.33` (média de semanas por mês)
- **Suporte a 23 locales** diferentes

#### `src/lib/supabase.ts`
Cliente Supabase para analytics:
- **Conexão** com projeto Supabase (`fwttbxyhxxbntynwjsdp`)
- **Session ID** anônimo via `crypto.randomUUID()` persistido no localStorage
- **Função `saveCalculation()`** — Salva dados de uso (país, salário, tipo de cálculo)
- **Tratamento silencioso de erros** — Falhas de analytics não afetam a UX

---

## 📦 Como Instalar as Dependências

### Pré-requisitos

- **Node.js** 18.18 ou superior
- **npm** (incluído com Node.js) ou **yarn** / **pnpm**

### Instalação

```bash
# Instalar todas as dependências
npm install
```

Isso irá instalar:
- **Dependências de produção**: Next.js, React, Framer Motion, Supabase
- **Dependências de desenvolvimento**: TypeScript, Tailwind CSS, ESLint, PostCSS

---

## 🚀 Como Rodar o Projeto Localmente

### Modo de Desenvolvimento

```bash
# Iniciar o servidor de desenvolvimento
npm run dev
```

A aplicação estará disponível em **http://localhost:3000**.

### Build de Produção

```bash
# Gerar o build otimizado
npm run build

# Iniciar o servidor de produção
npm start
```

### Lint

```bash
# Verificar qualidade do código
npm run lint
```

---

## 📥 Como Clonar o Repositório

```bash
# Clonar o repositório
git clone https://github.com/dev-erickydias/calculadora.git

# Entrar na pasta do projeto
cd calculadora

# Instalar as dependências
npm install

# Iniciar o servidor de desenvolvimento
npm run dev
```

---

## 👤 Autor

**Ericky Dias**
- GitHub: [@dev-erickydias](https://github.com/dev-erickydias)
- LinkedIn: [erickydias](https://www.linkedin.com/in/erickydias/)

---

> 📝 *Documentação gerada em Abril de 2026.*
