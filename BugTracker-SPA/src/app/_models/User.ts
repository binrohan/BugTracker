import { Project } from './Project';
import { Ticket } from './Ticket';
import { CommentPosted } from './CommentPosted';

export interface User {
    id: string;
    userName: string;
    email: string;

    joined: Date;
    gender?: string;
    description?: string;
    adrs_Local: string;
    adrs_City: string;
    adrs_Division: string;
    adrs_Country: string;
    phone?: string;


    project?: Project;
    tickets?: Ticket[];
    comments?: CommentPosted[];
    roles: string[];

    projectId: number;
}
