import { Ticket } from './Ticket';

export interface Category {
    id: number;
    ticketcategory: string;
    tickets: Ticket[];
}
