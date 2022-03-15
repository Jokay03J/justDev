const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("credit")
    .setDescription("obitent les crédit du bot"),
  execute(interaction) {
    try {
      //message embed
      const embed = new MessageEmbed()
        .setDescription('author: Jokay03J,Mizari-W,Wou?\nmajority icon provide [Icon8](https://icons8.com/)')
      //send message
      interaction.reply({ embeds: [embed] })
    } catch (error) {
      interaction.reply({ content: ":x: une erreur est survenue" })
    }
  }
}