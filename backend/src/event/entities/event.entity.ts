import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { Ticket } from 'src/ticket/entities/ticket.entity';

export enum EventStatus {
  ACTIVE = 'active',
  FINISHED = 'finished',
  CANCELLED = 'cancelled',
}

@Entity('Events')
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  name: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'timestamp' })
  startDate: Date;

  @Column({ type: 'timestamp' })
  endDate: Date;

  @Column({ type: 'enum', enum: EventStatus, default: EventStatus.ACTIVE })
  status: EventStatus;

  // Relación con el organizador del evento
  @ManyToOne(() => User, (user) => user.organizedEvents, { nullable: false })
  organizer: User;

  @Column({ type: 'uuid' })
  organizerId: string;

  // Relación con scanners asignados a este evento
  @OneToMany(() => User, (user) => user.event)
  scanners: User[];

  // Tickets comprados para este evento
  @OneToMany(() => Ticket, (ticket) => ticket.event)
  tickets: Ticket[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
