// src/utils/httpRequest.ts
import { httpInstance } from './httpInstance';


export const httpRequest = async <T>(
    method: "GET" | "POST" | "PUT" | "DELETE",
    url: string,
    data?: any
): Promise<T> => {
    const response = await httpInstance.request<T>({
        method,
        url,
        data,
    });
    return response.data;
};
