const { Client } = require("@notionhq/client")

// Initializing a client
const notionClient = new Client({
  auth: process.env.NOTION_TOKEN,
})

module.exports = {
  notionClient
}