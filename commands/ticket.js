const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
  .setName("ticket")
  .setDescription("crée un systeme de ticket"),
  async execute(interaction) {
    //set defer response
    await interaction.deferReply()
    try {
      //button components
      const row = new MessageActionRow()
      .addComponents(
        new MessageButton()
        .setLabel("nouveaux ticket")
        .setEmoji("📩")
        .setStyle("PRIMARY")
        .setCustomId("createTicket")
      )
      const embed = new MessageEmbed()
      .setTitle("Demandé de l'aide !")
      .setDescription("Pour crée un ticket réagi avec 📩\n**tout abus seras sanctionner!**")
      await interaction.editReply({ embeds: [embed], components: [row]})
    } catch (error) {
      console.log(error);
    }
  }
}