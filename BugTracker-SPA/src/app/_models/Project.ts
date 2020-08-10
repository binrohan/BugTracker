import { Ticket } from './Ticket';
import { User } from './User';

export interface Project {
    id: number;
    title: string;
    description: string;
    startTime: Date;
    deadTime: Date;
    isArchived: boolean;
    ticketCount: number;

    tickets?: Ticket[];
    users?: User[];
}
