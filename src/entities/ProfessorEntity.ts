import { UUID } from "crypto";
import AlunoEntity from "./AlunoEntity.js";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ProfessorEntity {
  constructor(alunos?: AlunoEntity[]) {
    this.alunos = alunos;
  }
  id!: UUID;
  @OneToMany(() => AlunoEntity, (aluno) => aluno.professor)
  alunos?: AlunoEntity[]
}