import express from "express";
import AlunoController from "../controllers/AlunoController.js";
import { AppDataSource } from "../configurations/dataSource.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import AlunoRepository from "../repositories/AlunoRepository.js";

const router = express.Router();

const alunoRepository = new AlunoRepository(
  AppDataSource.getRepository(AlunoEntity),
  AppDataSource.getRepository(UsuarioEntity),
  AppDataSource.getRepository(ProfessorEntity)
);

const alunoController = new AlunoController(alunoRepository);

router.post("/", (req, res) => alunoController.newAluno(req, res));
router.put("/:idAluno/:idUsuario", (req, res) =>
  alunoController.updateAluno(req, res)
);
router.patch("/academia/:idAluno", (req, res) =>
  alunoController.updateAcademiaByAluno(req, res)
);
router.delete("/:id", (req, res) => alunoController.deleteAluno(req, res));
router.get("/:idAluno", (req, res) => alunoController.getAlunoById(req, res));
router.get("/", (req, res) => alunoController.getAlunoByEmail(req, res));

export default router;
