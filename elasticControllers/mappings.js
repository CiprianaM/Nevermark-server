const client = require('../elasticDb');
const index      = "history";
const type       = "pageDataToUser";

async function createIndex(index) {
  try {
    await client.indices.create({ index });
    console.log(`Created index ${index}`);
  } catch (err) {
    console.error(`An error occurred while creating the index ${index}:`);
    console.error(err);
  }
}

createIndex(index);