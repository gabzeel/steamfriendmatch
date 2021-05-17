import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from "typeorm";

@Entity()
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({nullable: true})
  profilePhotoFile: string;

  @Column({ select: false })
  password: string;
}

export default User;
