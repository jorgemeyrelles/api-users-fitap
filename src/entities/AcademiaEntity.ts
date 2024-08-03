import { UUID } from "crypto";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
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
  @CreateDateColumn({ type: "date" })
  created_at!: Date;
  @UpdateDateColumn({ type: "date" })
  updated_at!: Date;
  @DeleteDateColumn({ type: "date" })
  deleted_at!: Date;
}
