import { Ticket } from './Ticket';

export interface Priority {
    id: number;
    priorityName: string;
    tickets?: Ticket[];
}
