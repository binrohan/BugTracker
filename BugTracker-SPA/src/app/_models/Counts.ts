export interface Counts {

    // Admin
    totalTickets: number;
    activeTickets: number;
    archivedTickets: number;
    passedTickets: number;
    approvedTickets: number;

    totalProjects: number;
    activeProjects: number;
    archivedProjects: number;

    totalUsers: number;
    freeUsers: number;
    busyUsers: number;
    comments: number;


    // Manager and Developer
    projectId: number;
    projectTitle: string;

    projectActiveTickets: number;
    projectArchivedTickets: number;

    projectUsers: number;
    projectComments: number;


    // Developer
    devActiveTickets: number;
    devArchivedTickets: number;

    devComments: number;


    // All
    userName: string;
}
