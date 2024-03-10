const mongodb = require('mongodb');
const BDHOST = process.env.BDHOST;
const BDNAME = process.env.BDNAME;

let collection = undefined;

async function connect() {
    const client = await mongodb.MongoClient.connect(BDHOST);
    const db = client.db("quotations-db");
    quotation_collection = await db.collection('quotations');
    return quotation_collection;
}

async function selectQuotation() {
    if(!collection) {
        collection = await connect();
    }
    console.log(collection);
    const result = await collection.find({});
    return result;
}

module.exports = { selectQuotation };