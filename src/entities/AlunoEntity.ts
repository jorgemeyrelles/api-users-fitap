import { UUID } from "crypto";
import AcademiaEntity from "./AcademiaEntity.js";
import ProfessorEntity from "./ProfessorEntity.js";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export default class AlunoEntity {
  constructor(professor: ProfessorEntity, academia?: AcademiaEntity) {
    this.professor = professor;
    this.academia = academia;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @ManyToOne(() => ProfessorEntity, (professor) => professor.alunos)
  professor: ProfessorEntity;
  @OneToOne(() => AcademiaEntity, {
    nullable: true,
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  academia?: AcademiaEntity;
}
