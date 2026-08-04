export enum Priority {
    HIGH = 'High',
    AVERAGE = 'Average',  
    LOW = 'Low',
}

export type SupportTicket = {
    summary: string;
    priority: Priority;
    link: string;
    id?: number | undefined;
}