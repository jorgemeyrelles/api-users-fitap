import express, { RequestHandler } from "express";
import AlunoController from "../controllers/AlunoController.js";
import { AppDataSource } from "../configurations/dataSource.js";
import AlunoEntity from "../entities/AlunoEntity.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import AlunoRepository from "../repositories/AlunoRepository.js";
import AcademiaEntity from "../entities/AcademiaEntity.js";
import { alunoRequestDto } from "../middlewares/validadores/AlunoRequestBody.js";

const router = express.Router();

const alunoRepository = new AlunoRepository(
  AppDataSource.getRepository(AlunoEntity),
  AppDataSource.getRepository(UsuarioEntity),
  AppDataSource.getRepository(ProfessorEntity),
  AppDataSource.getRepository(AcademiaEntity)
);

const alunoController = new AlunoController(alunoRepository);

const alunoHandler: RequestHandler = (req, res, next) =>
  alunoRequestDto(req, res, next);

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
/**
 * @swagger
 * components:
 *   schemas:
 *     UsuarioRequestBody:
 *       type: object
 *       required:
 *         - nome
 *         - email
 *         - celular
 *         - perfil
 *         - senha
 *       properties:
 *         id:
 *           type: string
 *           description: ID do usuário, opcional em novos cadastros
 *         nome:
 *           type: string
 *           description: Nome do usuário
 *         email:
 *           type: string
 *           format: email
 *           description: E-mail do usuário
 *         celular:
 *           type: string
 *           description: Número de celular do usuário
 *         perfil:
 *           type: number
 *           description: Perfil do usuário (por exemplo, aluno ou professor)
 *         senha:
 *           type: string
 *           description: Senha do usuário
 *     AcademiaRequestBody:
 *       type: object
 *       required:
 *         - nome
 *         - estado
 *         - cidade
 *         - bairro
 *       properties:
 *         nome:
 *           type: string
 *           description: Nome da academia
 *         estado:
 *           type: string
 *           description: Estado da academia
 *         cidade:
 *           type: string
 *           description: Cidade da academia
 *         bairro:
 *           type: string
 *           description: Bairro da academia
 *     AlunoRequestBody:
 *       type: object
 *       required:
 *         - usuario
 *         - professor
 *       properties:
 *         usuario:
 *           $ref: '#/components/schemas/UsuarioRequestBody'
 *         professor:
 *           type: object
 *           required:
 *             - id
 *           properties:
 *             id:
 *               type: string
 *               description: ID do professor responsável pelo aluno
 *         academia:
 *           $ref: '#/components/schemas/AcademiaRequestBody'
 */

/**
 * @swagger
 * /v1/aluno:
 *   post:
 *     summary: Cria um novo aluno
 *     tags: [Alunos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlunoRequestBody'
 *     responses:
 *       200:
 *         description: Aluno criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   description: Dados do aluno criado
 *       400:
 *         description: Requisição inválida
 *       401:
 *         description: Não autorizado (token JWT ausente ou inválido)
 */
router.post("/", alunoHandler, (req, res) =>
  alunoController.newAluno(req, res)
);
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
