import "reflect-metadata";

import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";

import AppError from "@shared/errors/AppError";
import createConnection from "@shared/infra/typeorm";

import router from "./routes";

createConnection().then(() => console.log("🎲 DataBase Started!"));

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return response.status(500).json({
    status: "error",
    message: `Internal serve error - ${err.message}`,
  });
});

export default app;