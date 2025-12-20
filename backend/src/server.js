import mongoose from 'mongoose';
import app from './app/index.js';
import config from './config/index.js';

let server;

async function main() {
    try {
        await mongoose.connect(config.DATABASE_URL);
        console.log("✅ Database connected successfully");

        server = app.listen(config.PORT, () => {
            console.log(`Backend is running on port ${config.PORT}`);
        });
    } catch (error) {
        console.log(error);
    }
}

const gracefulShutdown = (reason) => {
    console.log(`🛑 ${reason}`);
    if (server) {
        server.close(() => {
            process.exit(0); // ✅ clean exit
        });
    } else {
        process.exit(0);
    }
};

const fatalShutdown = (reason, err) => {
    console.error(`💥 ${reason}`, err);
    if (server) {
        server.close(() => {
            process.exit(1); // ❌ crash
        });
    } else {
        process.exit(1);
    }
};

main();

process.on("unhandledRejection", err => fatalShutdown("Unhandled Promise Rejection", err));
process.on("uncaughtException", err => fatalShutdown("Uncaught Exception", err));
process.on("SIGTERM", () => gracefulShutdown("SIGTERM received"));
process.on("SIGINT", () => gracefulShutdown("SIGINT received"));

