import { Request, Response } from "express";
import AlunoEntity from "../entities/AlunoEntity.js";
import AlunoRepository from "../repositories/AlunoRepository.js";
import UsuarioRepository from "../repositories/UsuarioRepository.js";
import ProfessorRepository from "../repositories/ProfessorRepository.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import { UUID } from "crypto";
import AcademiaEntity from "../entities/AcademiaEntity.js";

export default class AlunoController {
  constructor(
    private alunoRepository: AlunoRepository,
    private usuarioRepository: UsuarioRepository,
    private professorRespository: ProfessorRepository
  ) {}
  async newAluno(req: Request, res: Response) {
    const { professor_id, usuario_id } = <AlunoEntity>req.body;
    let usuario: any = null;
    let professor: any = null;
    let academia: any = null;
    if (usuario_id) {
      const { success, message } =
        await this.usuarioRepository.getUsuarioById(usuario_id);
      if (!success) throw new Error();
      usuario = message as UsuarioEntity;
    }
    if (professor_id) {
      const { success, message } =
        await this.professorRespository.getProfessorById(professor_id);
      if (!success) throw new Error();
      professor = message as ProfessorEntity;
    }

    const newAluno = new AlunoEntity(usuario, professor);

    return res.status(200).json({ data: newAluno });
  }
  async updateAcademiaByAluno(req: Request, res: Response) {
    const { academia } = <AlunoEntity>req.body;
    const { idAluno, idUsuario } = req.params;
    if (idUsuario) {
      const { success, message } = await this.usuarioRepository.getUsuarioById(
        idUsuario as UUID
      );
      if (!success) return res.status(404).json({ message });
    }
    const { success, message } = await this.alunoRepository.updateAcademiaAluno(
      idAluno as UUID,
      academia as AcademiaEntity
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.sendStatus(200);
  }
  updateAluno(req: Request, res: Response) {
    const updateUser = req.body;
    const { idAluno, idUsuario } = req.params;
  }
  async deleteAluno(req: Request, res: Response) {
    const { id } = req.params;
    const { success, message } = await this.alunoRepository.deleteAluno(
      id as UUID
    );

    if (!success) {
      return res.status(404).json({ message });
    }
    return res.status(200).json(message);
  }
  getAlunoById(req: Request, res: Response) {
    const { idAluno, idUsuario } = req.params;
  }
  getAlunoByEmail(req: Request, res: Response) {
    const email = req.body;
  }
}
