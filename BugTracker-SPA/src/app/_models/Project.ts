import { Ticket } from './Ticket';
import { User } from './User';

export interface Project {
    id: number;
    title: string;
    discription: string;
    startTime: Date;
    DeadTime: Date;
    isAcrchived: boolean;

    tickets?: Ticket[];
    users?: User[];
}

