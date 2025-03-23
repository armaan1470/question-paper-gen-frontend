// src/hooks/use-auth.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { ENDPOINTS } from "@/constants/endpoints.constants";
import { LoginPayload, LoginResponse } from "@/types/auth.types";
import { httpRequest } from "@/utils/httpRequest";



export const useAuth = () => {
    // Get React Query client for cache management
    const queryClient = useQueryClient();


    // Access store state and actions directly
    const { auth } = useAuthStore();

    // Login Mutation
    const loginMutation = useMutation({
        mutationFn: ({ username, password }: LoginPayload) =>
            httpRequest<LoginResponse>("POST", ENDPOINTS.AUTH.LOGIN, { username, password }),

        onSuccess: (data) => {
            // Update auth state with user, token, and set isAuthenticated to true
            auth.setAccessToken(data.token);

            auth.setUser(data.user);

            // Invalidate any queries that should refresh after login
            // queryClient.invalidateQueries({ queryKey: ['user'] });
        },

        onError: (error: any) => {
            console.error("Login failed:", error);
            // You could set error state here if needed
        },
    });

    // Logout function - client-side only implementation
    const logout = () => {
        // Clear auth state in store
        auth.resetAccessToken();

        auth.resetUser();

        // Clear all cached queries to prevent authenticated data persistence
        queryClient.clear();

        // Reset any queries that should be refetched with anonymous state
        queryClient.resetQueries();

        // Redirect to login page
        // window.location.reload();
    };


    const isAuthenticated = () => auth.accessToken !== '';

    return {
        authStore: auth,
        // Login functionality
        login: loginMutation.mutate,
        isAuthenticated,
        isLoggingIn: loginMutation.isPending,
        loginError: loginMutation.error,
        logout,
    };
};

export type AuthContext = ReturnType<typeof useAuth>;