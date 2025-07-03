export interface Account {
    id?: string;
    name: string;
    username: string;
    password: string;
}

export interface LoginRequest {
    username: string;
    password: string;
}

export interface Task {
    id?: string;
    name: string;
    description: string;
    priority: number;
    terminationDate: string;
    isDone: any;
    account?: any;
}

export interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}
