import { UserRole } from "src/common/enums/userRole.enum";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Event } from "src/event/entities/event.entity";
import { Ticket } from "src/ticket/entities/ticket.entity";

@Entity('Users')
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'text', unique: true })
    email: string;

    @Column({ type: 'text' })
    password: string;

    @Column({ type: 'text' })
    name: string;

    @Column({ type: 'text' })
    lastName: string;

    @Column({ type: 'text' })
    cellphone: string;
    
    @Column({ type: 'enum', enum: Object.values(UserRole), default: UserRole.USER })
    role: UserRole;

    // Relación con eventos, solo para scanners
    @ManyToOne(() => Event, (event) => event.scanners, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn({ name: 'eventId' })
    event: Event;

    @Column({ type: 'uuid', nullable: true })
    eventId: string;

    // Solo para usuarios con rol ORGANIZER
    @OneToMany(() => Event, (event) => event.organizer)
    organizedEvents: Event[];

    // Tickets comprados por el usuario
    @OneToMany(() => Ticket, (ticket) => ticket.user)
    tickets: Ticket[];

    @UpdateDateColumn()
    updatedAt: Date;

    @CreateDateColumn()
    createdAt: Date;
}
