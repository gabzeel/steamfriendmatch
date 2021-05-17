import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne } from "typeorm";
import User from "./User";

@Entity()
class Post extends BaseEntity{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    content: string;

    @Column({type: "date"})
    createdAt: Date;

    @ManyToOne(() => User)
    user: User;
}

export default Post;
