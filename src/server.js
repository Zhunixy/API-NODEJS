import express from "express";
import prisma from "./Model/orm.js";
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

// GET todos os usuários
app.get("/cadastro", async (req, res) => {
  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor", details: error.message });
  }
});

// GET por ID
app.get("/cadastro/:id", async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.params.id },
    });

    if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno ao buscar usuário", details: error.message });
  }
});

// POST criar usuário
app.post("/cadastro", async (req, res) => {
  try {
    const users = await prisma.user.create({
      data: {
        email: req.body.email,
        user: req.body.user,
        password: req.body.password,
      },
    });
    res.status(201).json(users);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao criar usuário", details: error.message });
  }
});

// PUT atualizar usuário
app.put("/cadastro/:id", async (req, res) => {
  try {
    const users = await prisma.user.update({
      where: { id: req.params.id },
      data: {
        email: req.body.email,
        user: req.body.user,
        password: req.body.password,
      },
    });
    res.json(users);
  } catch (error) {
    console.error(error);
    if (error.code === "P2002") {
      return res.status(409).json({ error: "Email já cadastrado" });
    }
    res.status(500).json({ error: "Erro ao atualizar usuário", details: error.message });
  }
});

// DELETE usuário
app.delete("/cadastro/:id", async (req, res) => {
  try {
    await prisma.user.delete({
      where: { id: req.params.id },
    });
    res.json({ message: "Usuário deletado" });
  } catch (error) {
    console.error(error);
    if (error.code === "P2025") {
      return res.status(404).json({ error: "Usuário não encontrado" });
    }
    res.status(500).json({ error: "Erro ao deletar usuário", details: error.message });
  }
});
