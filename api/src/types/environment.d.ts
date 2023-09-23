declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DB_ADDRESS: string;
            DB_PORT: string;
            DB_USER: string;
            DB_PWD: string;
            DB_NAME: string;
            JWT_SECRET: string;
            PORT: string;
            TZ: string;
            NODE_ENV: "development" | "production";
        }
    }
}

export {};