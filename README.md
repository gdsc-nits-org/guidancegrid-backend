# PENP-T
PostgreSQL + Express + Node + Prisma + TypeScript API Template


## Getting Started

### Understanding the folder structure
```
├── prisma
│   └── schema.prisma
├── server.ts
├── src
│   ├── controllers
│   │   ├── health
│   │   └── index.ts
│   ├── globals
│   │   ├── constants
│   │   ├── errors
│   │   └── success
│   ├── interfaces
│   ├── middlewares
│   ├── routers
│   └── utils
```

1. The Database schema is in `schema/prisma.schema`
2. `server.ts` is the starting point for the application
3. API Controllers should be made inside `src/controllers`. Use subdirectories or files as per need.
4. API Middlewares exist in `src/middlewares`.
5. Once the Controllers and Middlewares are made, those are exposed at endpoints in `src/routers`.
6. Every Controller and Middleware function is of type `Interfaces.Controllers.Async` or `Interfaces.Middlewares.Async` (A Sync variant exists too). All these interfaces are written in `src/interfaces`.
7. Any utility functions (for the purpose of abstracting/reusing code in Controllers/Middlewares) should be made in `src/utils`.
8. `src/global` directory contains constants and helper functions for handling responses and error.

## Demo
Let's create a DEMO `GET` endpoint at `/test` which returns a message `"Hello from test"`

1. Create a folder in `src/controllers` named `test`. Inside this folder, create a file called `get.ts`.

```ts
// src/controllers/test/get.ts

import * as Interfaces from "../../interfaces"
import * as Utils from "../../utils"

const get: Interfaces.Controllers.Sync = (req, res, next) => {
  /*
    We could use `return res.json("Hello from test")` too
    but the response json would be of the structure:
    "Hello from test".
    To maintain uniformity across all response objects,
    we will use Utils.Response.success() and Utils.Response.error() helper functions.
    We pass into these function the actual data we need to send to the client
    and these function would create a json structure of:
    {
      "status" : 200
      "msg" : "Actual Data"
    }
    Similarly, Utils.Response.error would create a similar object but with status code 400.
    **It is always recommended to send the response to the client through these helper functions only.**
  */
  return res.json(Utils.Response.success("Hello from test"))
}

export { get };
```

2. Next, create an `index.ts` inside `src/controllers/test` and import-export all the controllers. In this case simply import the `get` controller and export it.

```ts
// src/controllers/test/index.ts
import { get } from "./get"
export { get }
```

3. Now edit the `src/controllers/index.ts` file to import all controllers inside `src/controllers/test`
```ts
// src/controllers/test/index.ts
import * as Health from "./health";
import * as Test from "./test"
export { Health, Test };
```

4. Now, lets expose our newly made controller at the endpoint `/test`. In the `src/routers` directory, create a new file named `test.ts`.

```ts
// src/routers/test.ts
import express from "express";
import * as Controllers from "../controllers";

const router = express.Router();

router.get("/", Controllers.Test.get);

export default router;
```

5. Notice the mount-point for the controller is `/` and not `/test`. This is because, we haven't mounted this router onto our server yet. When we mount it on the server, we will mount this router on `/test`. So, doing a GET request on `/test/` will hit our Controller function. Import export the router object similarly.

6. Mounting the router is simple. Simple edit `server.ts` and add the following line:

```ts
// server.ts
...
app
  .use(cors())
  .use(helmet())
  .use(morgan("dev"))
  .use(express.json())
  .use(express.urlencoded({ extended: true }));

// Routers
app.use(`${Constants.System.ROOT}/`, Routers.Health);
app.use(`${Constants.System.ROOT}/test`, Routers.Test);

// Error Handlers
app.use(Middlewares.Error.errorHandler);
...
```