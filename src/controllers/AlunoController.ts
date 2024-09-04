import { Request, Response } from "express";
import AlunoEntity from "../entities/AlunoEntity.js";
import AlunoRepository from "../repositories/AlunoRepository.js";
import { UUID } from "crypto";
import AcademiaEntity from "../entities/AcademiaEntity.js";
import { Aluno, AlunoRequestBody, AlunoResponse } from "../types/TypeAluno.js";
import {
  UsuarioRequestBody,
  UsuarioRequestParams,
} from "../types/TypeUsuario.js";
import EnumPerfil from "../enums/EnumPerfil.js";

export default class AlunoController {
  constructor(private repository: AlunoRepository) {}

  private formatDataToOneUser(message: AlunoEntity) {
    const { id, usuario, professor, academia } = message as AlunoEntity;

    const data = {
      id,
      usuario: {
        id: <UUID>usuario?.id,
        nome: usuario?.nome ?? "",
        celular: usuario?.celular ?? "",
        email: usuario?.email ?? "",
        perfil: <EnumPerfil>usuario?.perfil,
      },
      professor: {
        id: <UUID>professor?.id,
        usuario: {
          id: <UUID>professor?.usuario?.id,
          nome: professor?.usuario?.nome ?? "",
          celular: professor?.usuario?.celular ?? "",
          email: professor?.usuario?.email ?? "",
          perfil: <EnumPerfil>professor?.usuario?.perfil,
        },
      },
      academia: {
        id: <UUID>academia?.id,
        nome: academia?.nome ?? "",
        estado: academia?.estado ?? "",
        cidade: academia?.cidade ?? "",
        bairro: academia?.bairro ?? "",
      },
    };
    return data as Aluno;
  }
  async newAluno(
    req: Request<{}, {}, AlunoRequestBody>,
    res: Response<AlunoResponse>
  ) {
    const { message } = await this.repository.newAluno(req.body as AlunoEntity);

    const data = this.formatDataToOneUser(<AlunoEntity>message);

    return res.status(200).json({ data });
  }
  async updateAcademiaByAluno(
    req: Request<UsuarioRequestParams, {}, AlunoRequestBody>,
    res: Response<AlunoResponse>
  ) {
    const academiaFromBody = <AlunoEntity>req.body;
    const { idAluno } = req.params;

    const { success, message } = await this.repository.updateAcademiaAluno(
      idAluno as UUID,
      <AcademiaEntity>academiaFromBody.academia
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }
    const data = this.formatDataToOneUser(<AlunoEntity>message);

    return res.status(200).json({ data });
  }
  async updateAluno(req: Request, res: Response) {
    const { professor_id } = <AlunoEntity>req.body;
    const { idAluno, idUsuario } = req.params;
  }
  async deleteAluno(
    req: Request<UsuarioRequestParams, {}, {}>,
    res: Response<AlunoResponse>
  ) {
    const { id } = req.params;
    const { success, message } = await this.repository.deleteAluno(id as UUID);

    if (!success) {
      return res.status(404).json({ error: message });
    }
    return res.sendStatus(200);
  }
  async getAlunoById(
    req: Request<UsuarioRequestParams, {}, {}>,
    res: Response<AlunoResponse>
  ) {
    const { idAluno } = req.params;
    const { success, message } = await this.repository.getAlunoById(
      idAluno as UUID
    );

    if (!success) {
      return res.status(404).json({ error: message });
    }

    const data = this.formatDataToOneUser(<AlunoEntity>message);

    return res.status(200).json({ data });
  }
  async getAlunoByEmail(
    req: Request<{}, {}, UsuarioRequestBody>,
    res: Response<AlunoResponse>
  ) {
    const { email } = req.body;
    const { success, message } = await this.repository.getAlunoByEmail(email);

    if (!success) {
      return res.status(404).json({ error: message });
    }

    const data = this.formatDataToOneUser(<AlunoEntity>message);

    return res.status(200).json({ data });
  }

  async getAllAlunos(
    req: Request<{}, {}, {}>,
    res: Response<AlunoResponse | { data: Aluno[] }>
  ) {
    const { success, message } = await this.repository.getAllAlunos();

    if (!success) {
      return res.status(404).json({ error: message });
    }

    const dataArray: Aluno[] = [];
    if (Array.isArray(message) && message.length) {
      message.map((e) =>
        dataArray.push(this.formatDataToOneUser(<AlunoEntity>e))
      );
    }

    return res.status(200).json({ data: <Aluno[]>dataArray });
  }
}
