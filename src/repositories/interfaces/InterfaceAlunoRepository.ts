import { UUID } from "crypto";
import AcademiaEntity from "../../entities/AcademiaEntity.js";
import AlunoEntity from "../../entities/AlunoEntity.js";

export default interface InterfaceAlunoRepository {
  newAluno(aluno: AlunoEntity): Promise<{ success: boolean; message?: AlunoEntity | String }>;
  updateAluno(
    id: UUID,
    aluno: AlunoEntity
  ): void | Promise<{ success: boolean; message?: string }>;
  deleteAluno(id: UUID): void | Promise<{ success: boolean; message?: string }>;
  getAlunoByEmail(
    email: string
  ):
    | AlunoEntity
    | Promise<{ success: boolean; message?: AlunoEntity | string }>;
  updateAcademiaAluno(
    idAluno: UUID,
    academia: AcademiaEntity
  ): void | Promise<{ success: boolean; message?: AlunoEntity | string }>;
}
