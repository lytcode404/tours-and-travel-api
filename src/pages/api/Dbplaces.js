import { MongoClient, ObjectId } from "mongodb";
import { connectToDatabase } from "../../lib/mongodbConn";

export default async function handler(req, res) {
  try {
    // const {db} = await connectToDatabase();

    // if(!db){
    //     console.error("Couldn't connect to database")
    // }
    const { mongoClient } = await connectToDatabase();

    const db = mongoClient.db("my-database2");

    if (!db) {
      throw new Error("Unable to retrieve the database.");
    }

    const collection = db.collection("posts");
    if (!collection) {
      throw new Error("Unable to retrieve the collection.");
    }

    if (req.method === "GET") {
      // Read all documents
      const dataBase = db;
      const myCollection = collection;

      const results = await myCollection.find({}).toArray();
      res.status(200).json(results);
    }

    if (req.method === "POST") {
      try {
        const dataBase = db;
        const results = await dataBase.collection("posts").insertOne(req.body);
        res.status(201).json({success: "great"});
      } catch (e) {
        res.status(201).json({error: e})
        console.error(e)
        console.log(req.body)
      }
    }

    if (req.method === "PUT") {
      // Update a document
      const { id, name, age } = req.body;
      const result = await db
        .collection("<collection-name>")
        .updateOne({ _id: ObjectId(id) }, { $set: { name, age } });
      res.status(200).json({ message: "Document updated" });
    }

    if (req.method === "DELETE") {
      // Delete a document
      const { id } = req.body;
      const result = await db
        .collection("<collection-name>")
        .deleteOne({ _id: ObjectId(id) });
      res.status(200).json({ message: "Document deleted" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" });
  }
}
