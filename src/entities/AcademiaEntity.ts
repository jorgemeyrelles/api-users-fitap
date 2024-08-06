import { UUID } from "crypto";
import {
  BeforeInsert,
  BeforeRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity("academia")
export default class AcademiaEntity {
  constructor(nome: string, estado: string, cidade: string, bairro: string) {
    this.nome = nome;
    this.estado = estado;
    this.cidade = cidade;
    this.bairro = bairro;
  }
  @PrimaryGeneratedColumn("uuid")
  id!: UUID;
  @Column()
  nome: string;
  @Column()
  estado: string;
  @Column()
  cidade: string;
  @Column()
  bairro: string;
  @CreateDateColumn({ type: "datetime", nullable: false })
  created_at!: Date;

  @UpdateDateColumn({ type: "datetime", nullable: false })
  updated_at!: Date;

  @DeleteDateColumn({ type: "datetime", nullable: true })
  deleted_at?: Date;

  @BeforeInsert()
  setCreateDate() {
    this.created_at = new Date();
    this.updated_at = new Date();
  }

  @BeforeUpdate()
  setUpdateDate() {
    this.updated_at = new Date();
  }
}
