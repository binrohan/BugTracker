import { Ticket } from './Ticket';

export interface Category {
    id: number;
    categoryName: string;
    tickets: Ticket[];
}
