import express from "express";
import fs from "fs";
import path, { dirname } from "path";
import { parseFile } from "../utils/upload/index.js";
import { fileURLToPath } from "url";
import json2csv from "json2csv";
import { pipeline } from "stream/promises";

const __filename = fileURLToPath(import.meta.url);

const __dirname = dirname(__filename);

const authorsFilePath = path.join(__dirname, "authors.json");

const router = express.Router();

router.get("/downloadCSV", (req, res, next) => {
  try {
    res.setHeader("Content-type", "attachment; filename=authors.csv");
    const fileAsBuffer = fs.readFileSync(authorsFilePath);

    const fileAsString = fileAsBuffer.toString();

    let fileAsJSONArray = JSON.parse(fileAsString);

    console.log(fileAsJSONArray);

    const source = fileAsJSONArray;
    const transform = new json2csv.Transform({ fields: ["name", "email"] });
    const destination = res;

    pipeline(source, trasformation, destination, (err) => {
      if (err) {
        console.log(err);
      }
    });
  } catch (error) {
    next(err);
  }
});

export default router;
