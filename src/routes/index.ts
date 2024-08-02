import express from "express";
import usuarioRouter from "./usuarioRouter.js";
import alunoRouter from "./alunoRouter.js";
import professorRouter from "./professorRouter.js";

const router = (app: express.Router) => {
  app.use("/usuarios", usuarioRouter);
  app.use("/alunos", alunoRouter);
  app.use("/professores", professorRouter);
};

export default router;
