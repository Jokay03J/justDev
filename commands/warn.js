const { SlashCommandBuilder } = require("@discordjs/builders");
const { notionClient } = require("../utils/notion");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("averti l'utilisateur")
    .addStringOption((option) => option.setName("membre").setDescription("membre a avertir").setRequired(true))
    .addStringOption((option) => option.setName("raison").setDescription("raison du wanr")),
  async execute(interaction) {
    //set response defer
    await interaction.deferReply()
    try {
      //interaction options
      const memberId = interaction.getString("membre");
      const reason = interaction.getString("raison");
    } catch (error) {

    }
  }
}