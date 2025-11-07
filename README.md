### Hello! This is a site made by Rixxer Corp. Welcome! 🖐️

#### Check out our Social Media:

[![Facebook](https://img.shields.io/badge/Facebook-1877F2?style=for-the-badge&logo=facebook&logoColor=white)](https://www.facebook.com/rixxercorp)
[![Instagram](https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white)](https://www.instagram.com/rixxercorp)
[![Linkedin](https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/company/rixxercorp/)
[![Whatsapp](https://img.shields.io/badge/WhatsApp-25D366?style=for-the-badge&logo=whatsapp&logoColor=white)](https://wa.me/553533311984)

#### Technologies of this project:
<div style="display: inline_block">
    <img align="center" alt="Figma" src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white" >
    <img align="center" alt="HTML5" src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" >
    <img align="center" alt="Git" src="https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white" >
    <img align="center" alt="CSS" src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" >
    <img align="center" alt="NodeJS" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" >
  <br/>
    <img align="center" alt="JavaScript" src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" >
    <img align="center" alt="Bootstrap" src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" >
    <img align="center" alt="NextJS" src="https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white" >
    <img align="center" alt="Firebase" src="https://img.shields.io/badge/Firebase-F29D0C?style=for-the-badge&logo=firebase&logoColor=white" >
    <img align="center" alt="React" src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" >
  <br/>
</div>

#### Contacts
- Email - contato@rixxer.com.br<br/>
- Phone/WhatsApp - [35984265018](https://wa.me/5535984265018)



# 🎯 Bolão de Dezenas
> _Sistema completo para criação, gerenciamento e participação em bolões de dezenas._

<!-- ✅ Adicione aqui o seu banner ou logo -->
![Banner](./public/banner.png)

---

## 📌 Navegação Rápida
- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Layout da Aplicação](#layout-da-aplicação)
- [Funcionalidades](#funcionalidades)
- [Páginas do Sistema](#páginas-do-sistema)
  - [Painel](#painel)
  - [Login / Cadastro](#login--cadastro)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Variáveis de Ambiente](#variáveis-de-ambiente)

---

## 🧩 Sobre o Projeto
O **Bolão de Dezenas** é um sistema que facilita a criação de bolões, controle de apostas, resultados automáticos e painel administrativo completo.

---

## 🚀 Tecnologias Utilizadas

| Tecnologia | Uso |
|-----------|-----|
| **Next.js 14+** | Estrutura do projeto |
| **React** | Componentização |
| **TailwindCSS** | Estilização |
| **Firebase Authentication** | Autenticação |
| **Firebase Database / Firestore** | Armazenamento |
| **React Icons** | Ícones da interface |
| **Vercel** | Deploy |
| **ESLint / Prettier** | Padronização |

---

## 📦 Estrutura de Pastas
```bash
/project
 ├── app
 │   ├── (auth)
 │   │   ├── login
 │   │   │   └── page.jsx
 │   │   └── register
 │   │       └── page.jsx
 │   ├── favicon.ico
 │   ├── globals.css
 │   ├── layout.js
 │   ├── not-found.jsx
 │   └── page.js
 │
 ├── components
 │   ├── Btns
 │   ├── FallingBalls
 │   ├── Forms
 │   ├── Header
 │   ├── InputUi
 │   ├── Label
 │   └── Loading
 │
 ├── context
 ├── hooks
 ├── libs
 ├── public
 ├── .env.local
 ├── next.config.mjs
 ├── tailwind.config.js
 ├── postcss.config.mjs
 ├── package.json
 └── README.md


 ## 🔧 Variáveis de Ambiente

Para o funcionamento correto da autenticação e integração com o Firebase, crie um arquivo:

E adicione as seguintes variáveis:

```env
# ============================
# 🔥 Firebase Configuration
# ============================

NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=
NEXT_PUBLIC_FIREBASE_GOOGLE_CLIENT_ID=

---

# 🖥️ Layout da Aplicação
Adicione aqui **screenshots**, GIFs da aplicação ou o **link para o Figma**.

---

# ✅ Funcionalidades
- ✅ Controle de dezenas  
- ✅ Criação de bolões  
- ✅ Painel administrativo  
- ✅ Login com Google / Email  
- ✅ Sistema de ranking  
- ✅ Gerenciamento de apostas  
- ✅ Atualização automática dos resultados  
- ✅ Interface responsiva  
- ✅ Perfis individuais  

---

# 📚 Páginas do Sistema

## 🔐 Login / Cadastro

### 📄 Descrição
Seção onde o usuário acessa sua conta ou cria uma nova para utilizar todas as funcionalidades da plataforma.

---

### ✅ Funcionalidades da Página
- Login com **email e senha**  
- Login via **Google Provider**  
- Cadastro de novos usuários  
- Recuperação de senha  
- Verificação automática de sessão ativa  
- Redirecionamento para o painel após autenticação  

---

### 🛠 Tecnologias Envolvidas
- **Next.js (App Router)**  
- **React**  
- **TailwindCSS**  
- **Firebase Authentication**  
- **Custom Hooks** para controle de estado e contexto  

---
