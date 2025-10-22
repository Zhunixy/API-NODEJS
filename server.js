import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

app.listen(3000, () => console.log("Servidor rodando na porta 3000"));

// GET
app.get("/main", async (req, res) => {
  const users = await prisma.user.findMany();
  res.status(200).json(users);
});

// POST
app.post("/main", async (req, res) => {
  const users = await prisma.user.create({
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(200).json(users);
});

// PUT
app.put("/main/:id", async (req, res) => {
  const users = await prisma.user.update({
    where: { id: req.params.id },
    data: {
      email: req.body.email,
      name: req.body.name,
      age: req.body.age,
    },
  });
  res.status(200).json(users);
});

// DELETE
app.delete("/main/:id", async (req, res) => {
  await prisma.user.delete({
    where: { id: req.params.id },
  });
  res.status(200).json({ message: "Usuário deletado" });
});
