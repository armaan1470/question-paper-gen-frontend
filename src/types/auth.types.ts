// src/types/auth.types.ts
export interface User {
    id: number
    username: string
    email: string
    roles: string[]
    active: boolean
    avatar?: string
}

export interface AuthState {
    auth: {
        user: User | null
        setUser: (user: User | null) => void
        accessToken: string
        setAccessToken: (accessToken: string) => void
        resetAccessToken: () => void
        resetUser: () => void
    }
}

export interface LoginPayload {
    username: string;
    password: string;
}

export interface LoginResponse {
    token: string
    user: User
}