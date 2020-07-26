import { Ticket } from './Ticket';

export interface Priority {
    id: number;
    ticketPriority: string;
    tickets?: Ticket[];
}
