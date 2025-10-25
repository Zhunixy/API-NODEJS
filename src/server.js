import express from "express";
import prisma from "./Model/orm.js";

const app = express();
app.use(express.json());

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

// GET
app.get("/main", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    //tratamento de erro genérico para erros internos do servidor
    if (error) {
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
    res.status(400).json({ error: "Erro ao buscar usuários" });
  }
});

//GET POR ESPECIFICAÇÃO
app.get("/main/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.params.id,
      },
    });

    res.json(user);
  } catch (error) {
    res.json({ error: "Erro ao resgatar" });
  }
});

// POST
app.post("/main", async (req, res) => {
  try {
    const users = await prisma.user.create({
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    //esse P2002 é um código de erro específico do Prisma que indica uma violação de chave única,
    // ou seja, quando você tenta inserir um valor duplicado em um campo que deve ser único, como o email neste caso.
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email já cadastrado" });
    }

    res.status(400).json({ error: "Erro ao criar usuário" });
  }
});

// PUT
app.put("/main/:id", async (req, res) => {
  try {
    const users = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
      },
    });
    res.status(200).json(users);
  } catch (error) {
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    res.status(400).json({ error: "Erro ao atualizar usuário" });
  }
});

// DELETE
app.delete("/main/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.status(200).json({ message: "Usuário deletado" });
  } catch (error) {
    // O código de erro P2025 indica que o registro que você está tentando deletar não foi encontrado no banco de dados.
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(400).json({ error: "Erro ao deletar usuário" });
  }
});
