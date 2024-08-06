import { UUID } from "crypto";
import AcademiaEntity from "../../entities/AcademiaEntity.js";
import AlunoEntity from "../../entities/AlunoEntity.js";

export default interface InterfaceAlunoRepository {
  newAluno(aluno: AlunoEntity): void | Promise<void>;
  updateAluno(
    id: UUID,
    user: AlunoEntity
  ): void | Promise<{ success: boolean; message?: string }>;
  deleteAluno(
    id: UUID
  ): void | Promise<{ success: boolean; message?: string }>;
  getAlunoByEmail(
    email: string
  ):
    | AlunoEntity
    | Promise<{ success: boolean; message?: AlunoEntity | string }>;
  updateAcademiaAluno(
    id: UUID,
    academia: AcademiaEntity
  ): void | Promise<{ success: boolean; message?: string }>;
  
}
