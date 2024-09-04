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

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: API para gerenciamento de professores
 */

router.post("/", (req, res) => professorController.newProfessor(req, res));
router.put("/:idAluno/:idUsuario", (req, res) =>
  professorController.updateProfessor(req, res)
);
router.delete("/:id", (req, res) =>
  professorController.deleteProfessor(req, res)
);
/**
 * @swagger
 * /v1/professor/{id}:
 *   get:
 *     summary: Retorna um professor pelo ID
 *     tags: [Professores]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID do aluno
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Aluno encontrado
 *       404:
 *         description: Aluno não encontrado
 */
router.get("/:idProfessor", (req, res) =>
  professorController.getProfessorById(req, res)
);
router.get("/", (req, res) =>
  professorController.getProfessorByEmail(req, res)
);

export default router;
