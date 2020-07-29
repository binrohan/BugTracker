import { Ticket } from './Ticket';

export interface Category {
    id: number;
    ticketCategory: string;
    tickets: Ticket[];
}
