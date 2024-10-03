
export interface User {
    id: string;
    name: string;
    email: string;
    emailVerified: Date;
    image: string;
    role: string;
    accounts: Account[];
    sessions: Session[];
    password: string;
    createdAt: Date;
    updatedAt: Date;
}