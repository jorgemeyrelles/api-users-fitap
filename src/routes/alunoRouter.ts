import express from "express";
import AlunoController from "../controllers/AlunoController.js";
import { AppDataSource } from "../configurations/dataSource.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import AlunoRepository from "../repositories/AlunoRepository.js";
import AcademiaEntity from "../entities/AcademiaEntity.js";

const router = express.Router();

const alunoRepository = new AlunoRepository(
  AppDataSource.getRepository(AlunoEntity),
  AppDataSource.getRepository(UsuarioEntity),
  AppDataSource.getRepository(ProfessorEntity),
  AppDataSource.getRepository(AcademiaEntity)
);

const alunoController = new AlunoController(alunoRepository);
/**
 * @swagger
 * tags:
 *   name: Alunos
 *   description: API para gerenciamento de alunos
 */

/**
 * @swagger
 * /v1/aluno/all:
 *   get:
 *     summary: Retorna todos os alunos
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos os alunos
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       usuario:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174000"
 *                           nome:
 *                             type: string
 *                             example: "João da Silva"
 *                           email:
 *                             type: string
 *                             example: "joao.silva@email.com"
 *                           celular:
 *                             type: string
 *                             example: "(11) 91234-5678"
 *                           perfil:
 *                             type: number
 *                             example: 1
 *                       professor:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             example: "123e4567-e89b-12d3-a456-426614174001"
 *                       academia:
 *                         type: object
 *                         properties:
 *                           nome:
 *                             type: string
 *                             example: "Academia XYZ"
 *                           estado:
 *                             type: string
 *                             example: "SP"
 *                           cidade:
 *                             type: string
 *                             example: "São Paulo"
 *                           bairro:
 *                             type: string
 *                             example: "Centro"
 *       404:
 *         description: Nenhum aluno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Nenhum aluno encontrado"
 */
router.get("/all", (req, res) => alunoController.getAllAlunos(req, res));

router.post("/", (req, res) => alunoController.newAluno(req, res));
router.put("/:idAluno/:idUsuario", (req, res) =>
  alunoController.updateAluno(req, res)
);
router.patch("/academia/:idAluno", (req, res) =>
  alunoController.updateAcademiaByAluno(req, res)
);
router.delete("/:id", (req, res) => alunoController.deleteAluno(req, res));

/**
 * @swagger
 * /v1/aluno/{id}:
 *   get:
 *     summary: Retorna um aluno pelo ID
 *     tags: [Alunos]
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
router.get("/:idAluno", (req, res) => alunoController.getAlunoById(req, res));
router.get("/", (req, res) => alunoController.getAlunoByEmail(req, res));

export default router;
