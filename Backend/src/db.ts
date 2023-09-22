import { MongoClient, ServerApiVersion } from "mongodb";

const url = process.env.DATABASE_URL;
// console.log(url);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(url, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
export async function database_connection(pos_collections) {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const db = await client.db("pos_system");
    const collection = pos_collections.map((element) => {
      return db.collection(element);
    });

    // Send a ping to confirm a successful connection
    return collection;
  } catch (error) {
    console.error(
      "Error occurred while connecting to MongoDB Atlas...\n",
      error,
    );
  }
}

//after setting the database u need to make db.ts and the codw will be given at mongodb atlas==>conncet and then u will get the instruction
