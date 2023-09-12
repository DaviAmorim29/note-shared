import { clsx, type ClassValue } from "clsx";
import { io } from "socket.io-client";
import { twMerge } from "tailwind-merge";
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function truncateText(input: string, limit: number = 30): string {
  if (input.length <= limit) return input;
  return `${input.substring(0, limit)}...`;
}


export const socket = io(import.meta.env.VITE_API_URL, {
  auth: {
    token: localStorage.getItem('token')
  },
})