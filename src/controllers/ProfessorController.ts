import { Request, Response } from "express";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import ProfessorRepository from "../repositories/ProfessorRepository.js";
import { UUID } from "crypto";

export default class ProfessorController {
  constructor(private repository: ProfessorRepository) {}
  async newProfessor(req: Request, res: Response) {
    const { usuario_id } = <ProfessorEntity>req.body;

    const professor = new ProfessorEntity(usuario_id);

    await this.repository.newProfessor(professor);

    return res.status(200).json({ data: professor });
  }
  updateProfessor(req: Request, res: Response) {
    const updateProfessor = req.body;
    const { idProfessor, idUsuario } = req.params;
  }
  async deleteProfessor(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deleteProfessor(
      id as UUID
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  }
  async getProfessorById(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.getProfessorById(
      id as UUID
    );

    if (!success) {
      return res.status(404).json({ message });
    }

    return res.status(200).json({ message });
  }
  getProfessorByEmail(req: Request, res: Response) {
    const email = req.body;
  }
}
