import { Request, Response } from "express";
import AlunoEntity from "../entities/AlunoEntity.js";
import AlunoRepository from "../repositories/AlunoRepository.js";
import { UUID } from "crypto";
import AcademiaEntity from "../entities/AcademiaEntity.js";

export default class AlunoController {
  constructor(private repository: AlunoRepository) {}
  async newAluno(req: Request, res: Response) {
    const { professor_id, usuario_id } = <AlunoEntity>req.body;

    const { message } = await this.repository.newAluno(
      usuario_id as UUID,
      professor_id as UUID
    );

    return res.status(200).json({ data: message });
  }
  async updateAcademiaByAluno(req: Request, res: Response) {
    const { academia } = <AlunoEntity>req.body;
    const { idAluno } = req.params;

    const { success, message } = await this.repository.updateAcademiaAluno(
      idAluno as UUID,
      academia as AcademiaEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(200);
  }
  async updateAluno(req: Request, res: Response) {
    const { professor_id } = <AlunoEntity>req.body;
    const { idAluno, idUsuario } = req.params;
  }
  async deleteAluno(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.repository.deleteAluno(id as UUID);

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  }
  async getAlunoById(req: Request, res: Response) {
    const { idAluno } = req.params;
    const { success, message } = await this.repository.getAlunoById(idAluno as UUID);

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  }
  getAlunoByEmail(req: Request, res: Response) {
    const email = req.body;
  }
}
