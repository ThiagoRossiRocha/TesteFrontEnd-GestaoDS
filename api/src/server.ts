import express from "express";
import { config } from "dotenv";
import cors from "cors";
import * as dotenv from 'dotenv';
import { MongoClient } from "./db/mongo";
import { saveProfileRoute } from "./routes/save-profile";
import { getProfilesRoute } from "./routes/get-profile";
import { deleteProfileRoute } from "./routes/delete-matches";
import { getProfileEditRoute } from "./routes/get-profile-edit";
import { getSearchRoute } from "./routes/get-search";
import { saveImageProfileRoute } from "./routes/save-image-profile";
import { getImageProfileRoute } from "./routes/get-image-profile";

dotenv.config();
async function main(): Promise<void> {
  config();
  const app = express();
  app.use(cors());
  app.use(express.json());
  
  await MongoClient.connect();

  app.post("/profile", saveProfileRoute());
  app.get("/profile", getProfilesRoute());
  app.delete("/profile/:cpf", deleteProfileRoute());
  app.get("/profile-edit/:cpf", getProfileEditRoute());
  app.get("/search", getSearchRoute());

  const port: any = process.env.PORT || 3030;
  const ip = process.env.IP || '0.0.0.0';

  app.listen(port, ip, () => console.log(`🔥 Start server at http://${ip}:${port} 🔥`));
}

main();