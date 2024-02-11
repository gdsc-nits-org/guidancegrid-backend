import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import * as Middlewares from "./src/middlewares";
import * as Routers from "./src/routers";
import * as Constants from "./src/globals/constants";

const app = express();

const corsOptions = {
    origin: ["http://localhost:3000", /.*\.gdscnits.in/],
    credentials: true,
};
// Middlewares
app.use(cors(corsOptions))
    .use(helmet())
    .use(morgan("dev"))
    .use(express.json())
    .use(express.urlencoded({ extended: true }))
    .use(cookieParser());

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.use(`${Constants.System.ROOT}/auth`, Routers.Auth);
app.use(`${Constants.System.ROOT}/profile`, Routers.Profile);

// Error Handlers
app.use(Middlewares.Error.errorHandler);

const server = app.listen(Constants.System.PORT, () => {
    console.log(`Server started on port ${Constants.System.PORT}`);
});

process.addListener("SIGINT", () => {
    console.log("exiting.....");
    server.close();
    process.exit(0);
});
