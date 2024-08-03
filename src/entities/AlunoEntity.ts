import { UUID } from "crypto";
import AcademiaEntity from "./AcademiaEntity.js";
import ProfessorEntity from "./ProfessorEntity.js";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
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
  @CreateDateColumn({ type: "date" })
  created_at!: Date;
  @UpdateDateColumn({ type: "date" })
  updated_at!: Date;
  @DeleteDateColumn({ type: "date" })
  deleted_at!: Date;
}
