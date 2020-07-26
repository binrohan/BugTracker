import { Ticket } from './Ticket';

export interface Status {
    id: number;
    ticketStatus: string;
    tickets?: Ticket[];
}
