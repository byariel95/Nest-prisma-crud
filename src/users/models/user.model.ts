import { Gender, Role } from "@prisma/client";

export class UserModel {
  
    id: number;

    name: string;

    lastName: string;

    email: string;

    password?: string;

    state: boolean;

    gender: Gender;
    
    role: Role

    createdAt: Date

    companyId: number
}