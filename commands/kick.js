const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("éjecte le membre sélectionner du serveur")
    .addStringOption((option) => option.setName("membre").setDescription("membre a éjecter du serveur").setRequired(true))
    .addStringOption((option) => option.setName("raison").setDescription("raison du kick")),
  async execute(interaction) {
    //set interaction defer
    await interaction.deferReply()
    try {
      //member option
      const member = interaction.options.getString("membre");
      //reason option
      const reason = interaction.options.getString("raison");
      //fetch member
      const fetchMember = interaction.guild.members.cache.get(member) || await interaction.guild.members.fetch(member).catch((err) => { });
      //kick member
      const kickInfo = await fetchMember.kick(reason || "acune raison définie")
      //send confirm message
      const embed = new MessageEmbed()
        .setTitle("<:moderatorcertified:875466217425604680> kick")
        .setDescription(`${kickInfo.displayName} à bien été kick`)
        .addField("**raison**", reason || "aucune raison définie")
        .setColor("#ed3916")
        .setTimestamp()
      await interaction.editReply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle("<:support:875466211205480500> erreur")
        .setDescription("id invalide")
        .setColor("#ed3916")
        .setTimestamp()
      await interaction.editReply({ embeds: [embed] })
    }
  }
}