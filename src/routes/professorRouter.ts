import express from "express";
import ProfessorController from "../controllers/ProfessorController.js";
import ProfessorRepository from "../repositories/ProfessorRepository.js";
import { AppDataSource } from "../configurations/dataSource.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";

const router = express.Router();

const professorRepository = new ProfessorRepository(
  AppDataSource.getRepository(ProfessorEntity),
  AppDataSource.getRepository(UsuarioEntity)
);

const professorController = new ProfessorController(professorRepository);

router.post("/", (req, res) => professorController.newProfessor(req, res));
router.put("/:idAluno/:idUsuario", (req, res) =>
  professorController.updateProfessor(req, res)
);
router.delete("/:id", (req, res) =>
  professorController.deleteProfessor(req, res)
);
router.get("/:idProfessor", (req, res) =>
  professorController.getProfessorById(req, res)
);
router.get("/", (req, res) =>
  professorController.getProfessorByEmail(req, res)
);

export default router;
