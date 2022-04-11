import express from "express";

import cors from "cors";

import listEndpoints from "express-list-endpoints";

import authorsRouter from "./authors/index.js";

import blogsRouter from "./blogs/index.js";

import { notFound, forbidden, catchAllErrorHandler } from "./errorHandlers.js";

import path, { dirname } from "path";

import { fileURLToPath } from "url";

import multer from "multer";

import createError from "http-errors";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const publicDirectory = path.join(__dirname, "../public");

const server = express();

const PORT = process.env.PORT || 3001;
console.log(PORT);

server.use(express.json());

server.use(express.static(publicDirectory));

const whiteList = [process.env.FE_DEV_URL, process.env.FE_PROD_URL];

server.use(
  cors({
    origin: function (origin, next) {
      console.log(origin, 2);
      if (!origin || whiteList.indexOf !== -1) {
        next(null, true);
      } else {
        next(createError(404, "CORS error"));
      }
    },
  })
);

server.use("/author", authorsRouter);

server.use("/blog", blogsRouter);

server.use(notFound);

server.use(forbidden);

server.use(catchAllErrorHandler);

server.listen(PORT, () => {
  console.table(listEndpoints(server));
  console.log(`Server is running on PORT ${PORT}!`);
});

server.on("error", (error) =>
  console.log(`❌ Server is not running due to : ${error}`)
);
