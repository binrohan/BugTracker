import { Time } from '@angular/common';
import { User } from './User';
import { Ticket } from './Ticket';

export interface Comment {
    id: number;
    content: string;
    created: Date;
    updated: Date;
    isDeleted: boolean;
    commenter: User;
    ticket: Ticket;
}
