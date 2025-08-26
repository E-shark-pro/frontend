import { User } from "@/types/user.type";



export interface LoginResponse {
    user: User | null;
    token: string | null;
}

export interface LoginRequest {
    email: string;
    password: string;
}
