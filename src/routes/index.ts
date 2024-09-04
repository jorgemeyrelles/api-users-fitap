import express from "express";
import usuarioRouter from "./usuarioRouter.js";
import alunoRouter from "./alunoRouter.js";
import professorRouter from "./professorRouter.js";

const router = (app: express.Router) => {
  app.use("/v1/usuario", usuarioRouter);
  app.use("/v1/aluno", alunoRouter);
  app.use("/v1/professor", professorRouter);
};

export default router;
