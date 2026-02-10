import { Entity, PrimaryGeneratedColumn, ManyToOne, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Event } from 'src/event/entities/event.entity';

@Entity('Tickets')
export class Ticket {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Usuario que compra el ticket
  @ManyToOne(() => User, (user) => user.tickets, { nullable: false })
  user: User;

  @Column()
  userId: string;

  // Evento al que pertenece el ticket
  @ManyToOne(() => Event, (event) => event.tickets, { nullable: false })
  event: Event;

  @Column()
  eventId: string;

  // Estado del ticket
  @Column({ type: 'boolean', default: false })
  used: boolean; // true si el QR ya fue escaneado

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
