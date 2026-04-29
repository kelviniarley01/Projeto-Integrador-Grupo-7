# 💄 Glow-Up Store | API de E-commerce de Cosméticos

## 📝 Sobre o Projeto
Esta é uma API REST desenvolvida para gerenciar o backend de uma loja de cosméticos.  
O foco principal foi a criação de um sistema robusto, tipado e escalável, simulando desde a listagem de produtos até a gestão de vendas.

O projeto aplica conceitos de **Arquitetura em Camadas**, garantindo que a lógica de negócio, o acesso a dados e a interface da API estejam devidamente isolados.

---

## 🏗️ Arquitetura e Estrutura

Para garantir a manutenção e escalabilidade, o projeto foi dividido seguindo este padrão:

### 📦 Model
- Definição das entidades de negócio e interfaces  
- Tipagem forte com TypeScript  
- Garantia de integridade dos dados  

### 🗂️ Repository
- Camada responsável pela persistência de dados  
- Comunicação direta com o banco SQLite  
- Execução de queries SQL (SELECT, INSERT, UPDATE, DELETE)  

### 🌐 Controller
- Ponto de entrada da aplicação  
- Gerenciamento de rotas HTTP  
- Processamento de requisições e respostas  
- Validações e tratamento de erros  

### 🗄️ Database
- Configuração e integração com SQLite  
- Gerenciamento da conexão com o banco  
- Centralização do acesso aos dados  

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia        | Função |
|------------------|--------|
| Node.js          | Ambiente de execução JavaScript no servidor |
| TypeScript       | Tipagem estática para maior segurança e escalabilidade |
| Express          | Framework para criação de rotas e middlewares |
| Better-SQLite3   | Banco de dados local leve e de alta performance |
| Nodemon / ts-node| Agilidade no desenvolvimento e execução direta de TS |

---

## 🚀 Principais Aprendizados

- 🔒 **Segurança com TypeScript**: Uso de interfaces para evitar inconsistência de dados  
- 🗃️ **Banco de Dados Relacional**: Criação de queries eficientes e modelagem de tabelas  
- 🌐 **Padrão REST**: Estruturação de endpoints com boas práticas HTTP  
- 🧱 **Arquitetura em Camadas**: Separação clara de responsabilidades  

---

## ⚙️ Funcionalidades

✔ Cadastro de usuários  
✔ Gerenciamento de produtos cosméticos  
✔ Associação de ingredientes aos produtos  
✔ Sistema de carrinho de compras  
✔ API REST estruturada e escalável  

---

## 🏁 Como Executar

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/nome-do-repositorio

# Acesse a pasta do projeto
cd nome-do-repositorio

# Instale as dependências e inicie o servidor
npm install && npm run dev