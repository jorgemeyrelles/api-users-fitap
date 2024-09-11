import { UUID } from "crypto";
import ProfessorEntity from "../../entities/ProfessorEntity.js";
import AlunoEntity from "../../entities/AlunoEntity.js";

export default interface InterfaceProfessorRepository {
  newProfessor(
    professor: ProfessorEntity
  ):
    | Promise<{ success: boolean; message?: ProfessorEntity | string }>
    | Promise<void>;
  updateProfessor(
    id: UUID,
    professor: ProfessorEntity
  ): void | Promise<{ success: boolean; message?: string }>;
  deleteProfessor(
    id: UUID
  ): void | Promise<{ success: boolean; message?: string }>;
  getProfessorByEmail(
    email: string
  ):
    | ProfessorEntity
    | Promise<{ success: boolean; message?: ProfessorEntity | string }>;
  getProfessorById(
    idProfessor: UUID
  ):
    | ProfessorEntity
    | Promise<{ success: boolean; message?: ProfessorEntity | string }>;
  getAllProfessores():
    | ProfessorEntity[]
    | Promise<{ success: boolean; message?: ProfessorEntity[] | string }>;
}
