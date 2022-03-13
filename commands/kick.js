const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");

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
      //check if author has permissions
      if (!interaction.members.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return await interaction.editReply({ content: ":x: vous n'avez pas la permissions d'utiliser cette commande!", ephemeral: true })
      //check if bot has permissions
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.KICK_MEMBERS)) return await interaction.editReply({ content: ":x: je n'ai pas la permissions de kick!(||KICK_MEMBERS||)", ephemeral: true })
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