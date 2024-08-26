import { UUID } from "crypto";
import ProfessorEntity from "../entities/ProfessorEntity.js";
import InterfaceProfessorRepository from "./interfaces/InterfaceProfessorRepository.js";
import { Repository } from "typeorm";
import UsuarioEntity from "../entities/UsuarioEntity.js";
import AlunoEntity from "../entities/AlunoEntity.js";

export default class ProfessorRepository
  implements InterfaceProfessorRepository
{
  private professorRepository: Repository<ProfessorEntity>;
  private usuarioRepository: Repository<UsuarioEntity>;

  constructor(
    professorRepository: Repository<ProfessorEntity>,
    usuarioRepository: Repository<UsuarioEntity>
  ) {
    this.professorRepository = professorRepository;
    this.usuarioRepository = usuarioRepository;
  }

  private async professorByKey<Tipo extends keyof ProfessorEntity>(
    key: Tipo,
    valor: ProfessorEntity[Tipo]
  ): Promise<ProfessorEntity | null> {
    const whereClause = {
      [key]: valor,
      deleted_at: null,
    } as unknown as Record<string, any>;
    const aluno = await this.professorRepository.findOne({
      where: whereClause,
    });
    return aluno;
  }

  private async usuarioByKey<Tipo extends keyof UsuarioEntity>(
    key: Tipo,
    valor: UsuarioEntity[Tipo]
  ): Promise<UsuarioEntity | null> {
    const whereClause = {
      [key]: valor,
      deleted_at: null,
    } as unknown as Record<string, any>;
    const usuario = await this.usuarioRepository.findOne({
      where: whereClause,
    });
    return usuario;
  }

  async newProfessor(professor: ProfessorEntity): Promise<void> {
    await this.professorRepository.save(professor);
  }
  async updateProfessor(
    id: UUID,
    professor: ProfessorEntity
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const prof = await this.professorByKey("id" as keyof ProfessorEntity, id);
      if (!prof) {
        return { success: false, message: "Professor não encontrado" };
      }

      Object.assign(prof, professor);

      await this.professorRepository.update(id, prof);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar atualizar professor." };
    }
  }
  async deleteProfessor(
    id: UUID
  ): Promise<{ success: boolean; message?: string }> {
    try {
      const usuario = await this.professorByKey(
        "id" as keyof ProfessorEntity,
        id
      );
      if (!usuario) {
        return { success: false, message: "Professor não encontrado." };
      }

      await this.professorRepository.softDelete(id);

      return { success: true };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar deletar professor." };
    }
  }
  async getProfessorByEmail(
    email: string
  ): Promise<{ success: boolean; message?: ProfessorEntity | string }> {
    try {
      const whereClause = {
        email,
        deleted_at: null,
      } as unknown as Record<string, any>;
      const usuario = await this.usuarioRepository.findOne({
        where: whereClause,
      });
      if (!usuario) {
        return { success: false, message: "Usuário não encontrado." };
      }
      const professor = await this.professorByKey(
        "usuario_id" as keyof ProfessorEntity,
        usuario.id
      );

      return { success: true, message: <ProfessorEntity>professor };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar buscar aluno." };
    }
  }

  async getProfessorById(
    idProfessor: UUID
  ): Promise<{ success: boolean; message?: ProfessorEntity | string }> {
    try {
      const professor = await this.professorByKey(
        "id" as keyof ProfessorEntity,
        idProfessor as UUID
      );

      if (!professor) {
        return { success: false, message: "Professor não encontrado." };
      }

      return { success: true, message: <ProfessorEntity>professor };
    } catch (error) {
      console.error(error);
      return { success: false, message: "Erro ao tentar buscar aluno." };
    }
  }
}
