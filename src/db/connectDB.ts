"use server";

import { Db, MongoClient } from "mongodb";

export const connectDB = async () => {
  const dbAccess = process.env.DB_ACCESS;
  const dbName = process.env.DB_NAME;

  if (dbAccess === undefined)
    throw new Error("Missing the 'DB_ACCESS' .env value!");

  if (dbName === undefined)
    throw new Error("Missing the 'DB_NAME' .env value!");

  if (process.env.NODE_ENV === "development") {
    const _global = global as typeof globalThis & {
      MongoDB: Db;
    };

    if (_global.MongoDB === undefined) {
      const client = new MongoClient(dbAccess);
      await client.connect();
      _global.MongoDB = client.db(dbName);
    }

    _global.MongoDB.collection("Products").createIndex({ "items.sku": 1}, {
      name: "items.sku_",
      unique: true,
      sparse: true,
    });

    _global.MongoDB.collection("Products").createIndex({ "ref": 1}, {
      name: "ref_",
      unique: true,
    });

    return _global.MongoDB
  } else {
    const client = new MongoClient(dbAccess);
    console.log("[log] Connecting Database...");
    await client.connect();

    return client.db(dbName);
  }
};
