const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unmute")
    .setDescription("unmute le membre sélectionner")
    .addStringOption((option) => option.setName("membre").setDescription("membre à unmute").setRequired(true)),
  async execute(interaction) {
    //set defer response
    await interaction.deferReply()
    try {
      //check if author has moderate_members permissions
      if (!interaction.member.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return await interaction.editReply({ content: ":x: vous n'avez pas la permissions d'utiliser cette commande", ephemeral: true });
      //check if bot has moderate_members permissions
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MODERATE_MEMBERS)) return await interaction.editReply({ content: ":x: je n'ai pas la permissions d'unmute!(||MODERATE_MEMBERS||)" })
      //interaction options
      const member = interaction.options.getString("membre");
      //fetch member
      const fetchMember = interaction.guild.members.cache.get(member) || await interaction.guild.members.fetch(member).catch((err) => { });
      //unmute member
      const muteInfo = await fetchMember.timeout(0, "unmute");
      //send confirm message
      const embed = new MessageEmbed()
        .setTitle("<:moderatorcertified:875466217425604680> unmute")
        .setDescription(`${muteInfo.displayName} à bien été unmute`)
        .setTimestamp()
      await interaction.editReply({ embeds: [embed] })
    } catch (error) {
      console.log(error);
      const embed = new MessageEmbed()
        .setTitle("<:support:875466211205480500> erreur")
        .setDescription("id invalide")
        .setColor("#ed3916")
        .setTimestamp()
      return await interaction.editReply({ embeds: [embed], ephemeral: true })
    }
  }
}