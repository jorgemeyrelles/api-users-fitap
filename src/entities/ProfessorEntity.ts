import { UUID } from "crypto";
import AlunoEntity from "./AlunoEntity.js";
import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export default class ProfessorEntity {
  constructor(alunos?: AlunoEntity[]) {
    this.alunos = alunos;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @OneToMany(() => AlunoEntity, (aluno) => aluno.professor)
  alunos?: AlunoEntity[];
}
