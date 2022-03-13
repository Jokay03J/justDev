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
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.BAN_MEMBERS)) return await interaction.editReply({ content: ":x: je n'ai pas la permissions de bannir!(||BAN_MEMBERS||)", ephemeral: true })
      //user option
      const idMember = interaction.options.getString("membre");
      //reason option
      const reason = interaction.options.getString("raison");
      //fetch member
      const fetchMember = interaction.guild.members.cache.get(idMember) || await interaction.guild.members.fetch(idMember).catch((err) => {})
      //ban member
      const banInfo = await fetchMember.ban({ reason: reason || "aucune raison définie" })
      //send confirm message
      const embed = new MessageEmbed()
        .setTitle("<:moderatorcertified:875466217425604680> banissement")
        .setColor("#ed3916")
        .setDescription(`${banInfo.displayName} à bien été bannis`)
        .addField("**raison**", reason || "aucune raison définie")
        .setTimestamp()
      await interaction.editReply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle("<:support:875466211205480500> erreur")
        .setColor("#ed3916")
        .setDescription("id invalide!")
        .setTimestamp()
      await interaction.editReply({ embeds: [embed], ephemeral: true })
    }
  }
}