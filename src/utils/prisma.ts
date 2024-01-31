import { PrismaClient } from "@prisma/client";
import config from "config";

const prisma = new PrismaClient({
    datasources: {
        db: {
            url:
                config.NODE_ENV === "dev"
                    ? config.DATABASE_URL_DEV
                    : config.DATABASE_URL_PROD,
        },
    },
});

export default prisma;
