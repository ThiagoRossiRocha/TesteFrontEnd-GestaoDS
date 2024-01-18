import { MongoClient as Mongodb, Db } from "mongodb";

export const MongoClient = {
  client: undefined as unknown as Mongodb,
  db: undefined as unknown as Db,

  async connect(): Promise<void> {
    const url = process.env.MONGODB_URL_ATLAS;

    if (!url) return console.log("Error starting the server mongodb");

    const client = new Mongodb(url);
    const db = client.db("gestaoDS");

    this.client = client;
    this.db = db;

    console.log(
      `🔥 Connected to mongodb in ${url} 🔥`,
    );
  },
};