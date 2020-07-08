import { Project } from './Project';
import { Ticket } from './Ticket';
import { CommentPosted } from './CommentPosted';

export interface User {
    id: string;
    userName: string;
    email: string;
    joined: Date;
    gender?: string;
    describtion?: string;
    local: string;
    city: string;
    division: string;
    country: string;
    phone?: string;

    project?: Project;
    tickets?: Ticket[];
    comments?: CommentPosted[];
}