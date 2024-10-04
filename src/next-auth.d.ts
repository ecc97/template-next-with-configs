import NextAuth from "next-auth/next";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            email: string;
            username: string;
            token: string;
        };
    }
    
    interface User {
        id: string;
        email: string;
        username: string;
        token: string;
    }
}