import { Request, Response } from "express";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import ProfessorRepository from "../repositories/ProfessorRepository.js";
import { UUID } from "crypto";
import {
  Professor,
  ProfessorRequestBody,
  ProfessorRequestParams,
  ProfessorResponse,
} from "../types/TypeProfessor.js";
import EnumPerfil from "../enums/EnumPerfil.js";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import { UsuarioRequestBody } from "../types/TypeUsuario.js";

export default class ProfessorController {
  constructor(private repository: ProfessorRepository) {}
  private formatDataResponse(message: ProfessorEntity): Professor {
    const { id, usuario, alunos } = <ProfessorEntity>message;

    const data = {
      id,
      usuario: {
        id: <UUID>usuario?.id,
        nome: usuario?.nome ?? "",
        celular: usuario?.celular ?? "",
        email: usuario?.email ?? "",
        perfil: <EnumPerfil>usuario?.perfil,
      },
      alunos: alunos?.length
        ? alunos.map((e) => ({
            id: e.id,
            usuario: {
              id: <UUID>e.usuario?.id,
              nome: e.usuario?.nome ?? "",
              celular: e.usuario?.celular ?? "",
              email: e.usuario?.email ?? "",
              perfil: <EnumPerfil>e.usuario?.perfil,
            },
            academia: e.academia,
          }))
        : alunos,
    };
    return data as Professor;
  }
  async newProfessor(
    req: Request<{}, {}, ProfessorRequestBody>,
    res: Response<ProfessorResponse>
  ) {
    const professor = <ProfessorEntity>req.body;

    const { success, message } = await this.repository.newProfessor(professor);
    if (!success) {
      return res.status(400).json({ error: message });
    }

    const data = this.formatDataResponse(<ProfessorEntity>message);

    return res.status(200).json({ data });
  }
  updateProfessor(req: Request, res: Response) {
    const { idProfessor, idUsuario } = req.params;
  }
  async deleteProfessor(
    req: Request<ProfessorRequestParams, {}, {}>,
    res: Response<ProfessorResponse>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.deleteProfessor(
      id as UUID
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(200);
  }
  async getProfessorById(
    req: Request<ProfessorRequestParams>,
    res: Response<ProfessorResponse>
  ) {
    const { idProfessor } = req.params;
    const { success, message } = await this.repository.getProfessorById(
      idProfessor as UUID
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }

    const data = this.formatDataResponse(<ProfessorEntity>message);

    return res.status(200).json({ data: data as Professor });
  }
  async getProfessorByEmail(
    req: Request<{}, {}, UsuarioRequestBody>,
    res: Response<ProfessorResponse>
  ) {
    const body = <UsuarioEntity>req.body;
    const { success, message } = await this.repository.getProfessorByEmail(
      body.email
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }

    const data = this.formatDataResponse(<ProfessorEntity>message);

    return res.status(200).json({ data });
  }

  async getAllProfessores(
    req: Request<{}, {}, {}>,
    res: Response<ProfessorResponse | { data: Professor[] }>
  ) {
    const { success, message } = await this.repository.getAllProfessores();

    if (!success) {
      return res.status(404).json({ error: message });
    }

    const dataArray: Professor[] = [];
    if (Array.isArray(message) && message.length) {
      message.map((e) =>
        dataArray.push(this.formatDataResponse(<ProfessorEntity>e))
      );
    }

    return res.status(200).json({ data: dataArray });
  }
}
