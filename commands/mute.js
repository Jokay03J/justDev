const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");
const ms = require("ms");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("mute")
    .setDescription("mute le membre sélectionner")
    .addStringOption((option) => option.setName("membre").setDescription("membre à mute").setRequired(true))
    .addIntegerOption((option) => option.setName("durée").setDescription("durée du mute(en heure)").setRequired(true).setMinValue(1))
    .addStringOption((option) => option.setName("raison").setDescription("raison du mute")),
  async execute(interaction) {
    //set defer interaction
    await interaction.deferReply()
    try {
      //check if author has timeout permissions
      if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return await interaction.editReply({ content: ":x: vous n'avez pas la permissions d'éxecuter cette commande!", ephemeral: true })
      //check if bot has timeout permissions
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return await interaction.editReply({ content: ":x je n'ai pas la permissions de mute!(||MODERATE_MEMBERS||)", ephemeral: true })
      //interaction argument
      const reason = interaction.options.getString("raison");
      const time = interaction.options.getInteger("durée");
      const member = interaction.options.getString("membre");
      //fetch member
      const fetchMember = interaction.guild.members.cache.get(member) || await interaction.guild.members.fetch(member).catch((err) => { });
      const timeToMs = ms(`${time}h`)
      //timeout member
      const muteInfo = await fetchMember.timeout(timeToMs, reason || "aucune raison définie")
      //send confirm message
      const embed = new MessageEmbed()
        .setTitle("<:moderatorcertified:875466217425604680> mute")
        .setDescription(`${muteInfo.displayName} à bien été mute`)
        .addField("raison", reason || "aucune raison définie")
        .addField("durer", `${time}heure(s)`)
      await interaction.editReply({ embeds: [embed], ephemeral: true })
    } catch (error) {
      const embed = new MessageEmbed()
        .setTitle("<:support:875466211205480500> erreur")
        .setDescription("id invalide")
        .setColor("#ed3916")
        .setTimestamp()
      await interaction.editReply({ embeds: [embed], ephemeral: true })
    }
  }
}