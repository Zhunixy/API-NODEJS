# API-NODEJS

API REST desenvolvida para demonstrar a criação de endpoints CRUD completos utilizando Node.js, Express e Prisma ORM, conectada a um banco de dados MongoDB.
O projeto implementa rotas básicas (GET, POST, PUT, DELETE), tratamento de erros e conexão segura via variável de ambiente.

---

## Tecnologias usadas

* Node.js
* Express — framework web para Node.js
* Prisma Client — ORM/ODM para acesso ao banco
* MongoDB — banco de dados NoSQL
* ECMAScript Modules (`"type": "module"` no `package.json`)
* Testes / Api Client - Thunder Client

---

## Instalação

1. Clone este repositório:

```bash
git clone https://github.com/Zhunixy/API-NODEJS.git
cd API-NODEJS
```

2. Instale as dependências:

```bash
npm install
```

3. Configure a variável de ambiente para conectar ao MongoDB. Crie um arquivo `.env` com:

```env
DATABASE_URL="mongodb+srv://usuario:senha@cluster.mongodb.net/nomeDoBanco?retryWrites=true&w=majority"
```

4. Gere o Prisma Client:

```bash
npx prisma generate
```

5. Inicie o servidor:

```bash
npm run dev
```

O servidor irá rodar na porta 3000 por padrão.

---

## Endpoints disponíveis

* `GET /main` — retorna todos os usuários
* `POST /main` — cria um novo usuário

  * Body: `email`, `name`, `age`
* `PUT /main/:id` — atualiza um usuário existente pelo `id`

  * Body: `email`, `name`, `age`
* `DELETE /main/:id` — remove um usuário pelo `id`

---

## Detalhes de implementação

* O modelo `User` no Prisma está definido como:

```prisma
model User {
  id    String @id @default(auto()) @map("_id") @db.ObjectId
  email String @unique
  name  String
  age   String
}
```

* O campo `email` possui restrição `@unique`, então tentativas de criar ou atualizar com e-mail já existente resultarão em erro: `"E-mail já está em uso."`.
* O servidor está configurado para usar JSON no corpo das requisições (`express.json()`).
* Tratamento básico de erros para:

  * E-mail duplicado (`error.code === "P2002"`)
  * Usuário não encontrado na atualização/deleção (`error.code === "P2025"`)

---

## Sobre o Projeto
* Este projeto foi desenvolvido com foco em aprendizado e prática de conceitos fundamentais de APIs REST, integração com bancos NoSQL e uso de ORM moderno (Prisma).
Ele serve como base para aplicações back-end escaláveis e integrações com front-ends feitos em React ou Next.js.

Versão 1.1
---
