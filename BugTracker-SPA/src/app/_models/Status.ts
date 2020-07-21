import { Ticket } from './Ticket';

export interface Status {
    id: number;
    statusName: string;
    tickets?: Ticket[];
}
