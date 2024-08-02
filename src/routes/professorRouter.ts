import express from "express";
import ProfessorController from "../controllers/ProfessorController.js";

const router = express.Router();

const professorController = new ProfessorController();

router.post("/", professorController.newProfessor);
router.put("/:idAluno/:idUsuario", professorController.updateProfessor);
router.delete("/:id", professorController.deleteProfessor);
router.get("/:idAluno/:idUsuario", professorController.getProfessorById);
router.get("/", professorController.getProfessorByEmail);

export default router;