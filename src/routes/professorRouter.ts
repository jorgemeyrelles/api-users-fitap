import express, { RequestHandler } from "express";
import ProfessorController from "../controllers/ProfessorController.js";
import ProfessorRepository from "../repositories/ProfessorRepository.js";
import { AppDataSource } from "../configurations/dataSource.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import { professorRequestDto } from "../middlewares/validadores/ProfessorRequestBody.js";

const router = express.Router();

const professorRepository = new ProfessorRepository(
  AppDataSource.getRepository(ProfessorEntity),
  AppDataSource.getRepository(UsuarioEntity)
);

const professorController = new ProfessorController(professorRepository);

const professorHandler: RequestHandler = (req, res, next) =>
  professorRequestDto(req, res, next);

/**
 * @swagger
 * tags:
 *   name: Professores
 *   description: API para gerenciamento de professores
 */

/**
 * @swagger
 * /v1/professor/all:
 *   get:
 *     summary: Retorna todos os professores cadastrados
 *     tags: [Professores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de professores retornada com sucesso
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
 *                       id:
 *                         type: string
 *                         format: uuid
 *                         description: ID do professor
 *                       usuario:
 *                         type: object
 *                         properties:
 *                           id:
 *                             type: string
 *                             format: uuid
 *                             description: ID do usuário associado ao professor
 *                           nome:
 *                             type: string
 *                             description: Nome do usuário
 *                           celular:
 *                             type: string
 *                             description: Número de celular do usuário
 *                           email:
 *                             type: string
 *                             description: Email do usuário
 *                           perfil:
 *                             type: string
 *                             description: Perfil do usuário (aluno ou professor)
 *                       alunos:
 *                         type: array
 *                         description: Lista de alunos associados ao professor
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               format: uuid
 *                               description: ID do aluno
 *                             usuario:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   format: uuid
 *                                   description: ID do usuário associado ao aluno
 *                                 nome:
 *                                   type: string
 *                                   description: Nome do aluno
 *                                 celular:
 *                                   type: string
 *                                   description: Número de celular do aluno
 *                                 email:
 *                                   type: string
 *                                   description: Email do aluno
 *                                 perfil:
 *                                   type: string
 *                                   description: Perfil do aluno
 *                             academia:
 *                               type: object
 *                               properties:
 *                                 nome:
 *                                   type: string
 *                                   description: Nome da academia
 *                                 cidade:
 *                                   type: string
 *                                   description: Cidade da academia
 *                                 estado:
 *                                   type: string
 *                                   description: Estado da academia
 *       404:
 *         description: Nenhum professor encontrado
 *       401:
 *         description: Token JWT inválido ou ausente
 */
router.get("/all", (req, res) =>
  professorController.getAllProfessores(req, res)
);

/**
 * @swagger
 * /v1/professor:
 *   post:
 *     summary: Cria um novo professor
 *     tags: [Professores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario:
 *                 type: object
 *                 required:
 *                   - nome
 *                   - email
 *                   - celular
 *                   - perfil
 *                   - senha
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: ID do usuário (opcional)
 *                   nome:
 *                     type: string
 *                     description: Nome do usuário
 *                   email:
 *                     type: string
 *                     description: Email do usuário
 *                   celular:
 *                     type: string
 *                     description: Celular do usuário
 *                   perfil:
 *                     type: number
 *                     description: Perfil do usuário (1 = admin, 2 = professor, etc.)
 *                   senha:
 *                     type: string
 *                     description: Senha do usuário
 *     responses:
 *       200:
 *         description: Professor criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: ID do professor
 *                     nome:
 *                       type: string
 *                       description: Nome do professor
 *                     email:
 *                       type: string
 *                       description: Email do professor
 *                     celular:
 *                       type: string
 *                       description: Celular do professor
 *                     perfil:
 *                       type: number
 *                       description: Perfil do professor
 *       400:
 *         description: Requisição inválida ou erro na criação do professor
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensagem de erro detalhada
 */
router.post("/", professorHandler, (req, res) =>
  professorController.newProfessor(req, res)
);
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
