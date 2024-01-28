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

## Notes

1. Any environment variable is schema-validated. Therefore, if you add a new env var, make sure to add the type and name
of that env variable in `config/env.ts`. Also update `.env.example` accordingly.

## Deployment on AWS EC2

1. Spin up and EC2 instance and install [nodejs](https://github.com/Schniz/fnm) [pnpm](https://pnpm.io/), [pm2](https://pm2.io/) and [nginx](https://www.nginx.com/).

2. Clone the repository `git clone https://github.com/gdsc-nits-org/guidancegrid-backend.git`
3. `cd guidancegrid-backed/`
4. Create/Paste the `.env` file with the environment variables.
5. Set executable permissions on `script.sh` : `chmod 775 script.sh` and run the script: `./script.sh`
6. This should run your express server on the PORT specified in `.env` (`4000` by default).
7. Do a health check for API on `{EC2_PUBLIC_IP}:{PORT}/api/v1`.
8. If you get a response back of `GDSC NITS API`, the server is set up properly.
9. If you have a domain for the API, go to manage DNS records and create an A record with value as the EC2 Public IP. 
10. Check for the same response at `{YOUR_API_DOMAIN}:{PORT}`. If you get the same response back, domain is configured properly. (Sometimes it takes some time for the DNS Provider to update the records. Check [whatismydns](https://www.whatsmydns.net/) to see if your domain has the configured EC2 IP Address).
11. Check if nginx is active on EC2: `sudo systemctl status nginx`. If it is not, start and enable it using:
```sh
sudo systemctl start nginx
sudo systemctl enable nginx
```
12. Now, cd into `etc/nginx/sites-available`. Create a nginx configuration file which routes incoming HTTP traffic for server `{YOUR_API_DOMAIN}` to our express app running at `localhost:{PORT}`.

Example nginx config:
```nginx
server {
  listen 80;
  server_name {YOUR_API_DOMAIN};
  location / {
    proxy_pass http://localhost:{PORT};
  }
}
```
13. You can name the config file as anything but it is good practice to name it same as your domain. For ex, the config file could be named `api.guidancegrid.gdscnits.in`. Create a symlink for this file in `/etc/nginx/sites-enabled`. (Only configs in `sites-enabled` will be used by nginx).

```sh
sudo ln -s /etc/nginx/sites-available/{YOUR_CONFIG_FILE_NAME} /etc/nginx/sites-enabled/
```


14. Test if the nginx config is valid `sudo nginx -t`. If there are no errors, restart nginx : `sudo systemctl restart nginx`.
15. Check if the endpoint works without specifying a PORT now: `http://{YOUR_API_DOMAIN}/api/v1`.
16. To set up SSL certificates, we will use [letsencrypt](https://letsencrypt.org/).
17. Install `certbot` and `python3-certbot-nginx`.
```sh
sudo apt install certbot
sudo apt instal python3-certbot-nginx
```
18. Request an SSL certificate for your registered domain. The `certbot-nginx` plugin will automatically configure the certificate for your domain.

```
sudo certbot --nginx -d {YOUR_API_DOMAIN}
```
It will ask for email. Enter it and accept all terms and conditions.

19. If there were no errors, you should see a message that tells you that SSL certificate has been installed successfully on your domain.

20. Go to `https://{YOUR_API_DOMAIN}/api/v1` to check if the endpoint is working.
