const { SlashCommandBuilder } = require("@discordjs/builders");
const { Permissions, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("ban le membre sélectionner")
    .addStringOption((option) => option.setName("membre").setDescription("id du membre a bannir").setRequired(true))
    .addStringOption((option) => option.setName("raison").setDescription("raison du ban")),
  async execute(interaction, client) {
    await interaction.deferReply()
    try {
      //check author permissions
      if (!interaction.member.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return await interaction.editReply({ content: ":x: vous n'avez pas la permissions d'éxecuter cette commande!", ephemeral: true })
      //check bot permissions
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return await interaction.editReply({ content: ":x: je n'ai pas la permissions de bannir!", ephemeral: true })
      //user option
      const idMember = interaction.options.getString("membre");
      //reason option
      const reason = interaction.options.getString("raison")
      //ban member
      await interaction.guild.members.ban(idMember, { reason: reason || "aucune raison définie" })
      //send confirm message
      const embed = new MessageEmbed()
        .setTitle("<:moderatorcertified:875466217425604680> banissement")
        .setColor("#ed3916")
        .setDescription(`banissement effectuer`)
        .addField("**raison**", reason || "aucune raison définie")
      await interaction.editReply({ embeds: [embed] })
    } catch (error) {
      console.log(error);
      const embed = new MessageEmbed()
        .setTitle("<:support:875466211205480500> erreur")
        .setColor("#ed3916")
        .setDescription("id invalide!")
      await interaction.editReply({ embeds: [embed] })
    }
  }
}