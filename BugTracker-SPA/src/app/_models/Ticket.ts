import { Project } from './Project';
import { User } from './User';
import { Category } from './Category';
import { Priority } from './Priority';
import { Status } from './Status';

export interface Ticket {
    id: number;
    title: string;
    description: string;
    created: Date;
    updated: Date;
    submissionDate?: Date;
    isArchived: boolean;
    isDeveloperPassed: boolean;
    isManagerPassed: boolean;

    projectName: string;
    project: Project;
    projectId: number;

    userName: string;
    user?: User;
    userId: number;

    comments: Comment[];
    category?: Category;
    priority?: Priority;
    status?: Status;


}
