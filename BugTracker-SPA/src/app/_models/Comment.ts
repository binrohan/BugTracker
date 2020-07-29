import { Time } from '@angular/common';
import { User } from './User';
import { Ticket } from './Ticket';

export interface Comment {
    id: number;
    content: string;
    created: Date;
    updated: Date;
    isDeleted: boolean;
    commenterId: string;
    userName: string;
    ticket: Ticket;
    ticketId: number;
}
