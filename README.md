# API-NODEJS

Uma API simples construída com **Express** + **Prisma Client** para interação com um banco **MongoDB**, com rotas básicas (GET, POST, PUT, DELETE) para o modelo `User`.

---

## Tecnologias usadas

* Node.js
* Express — framework web para Node.js
* Prisma Client — ORM/ODM para acesso ao banco
* MongoDB — banco de dados NoSQL
* ECMAScript Modules (`"type": "module"` no `package.json`)

---

## 📦 Instalação

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

