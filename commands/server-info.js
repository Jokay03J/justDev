const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("server-info")
    .setDescription("donne les infos du serveur"),
  async execute(interaction) {
    await interaction.deferReply()
    try {
      //check if guild is available
      if (!interaction.guild.available) return await interaction.editReply({ content: ":x: le serveur n'est pas disponible,veuillez réessayer plus tard" });
      //option for date
      let optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      //channel count
      const allChannels = interaction.guild.channels.cache.get() || await interaction.guild.channels.fetch().catch((err) => { })
      const textChannel = allChannels.filter((channels) => channels.type === "GUILD_TEXT")
      const voiceChannels = allChannels.filter((channels) => channels.type === "GUILD_VOICE")
      //embed
      const embed = new MessageEmbed()
        .setTitle(`information de ${interaction.guild.name}`)
        .setDescription(`${interaction.guild.description ? interaction.guild.description : "aucune description définie"}`)
        .addField("**<:redid:953019090786738207> id**", interaction.guild.id, true)
        .addField("**<:addicon:953252841647145000> crée le**", `${new Date(interaction.guild.createdAt).toLocaleString("fr-FR", optionsDate)}`, true)
        .addField("**<:members:875466215831777311> nombre de membre**", `${interaction.guild.memberCount}`, true)
        .addField("**<:staff:875466212430196747> id du propriétaire**", `${interaction.guild.ownerId}`, true)
        .addField("**<:verified:875466217056509952> vérifier**", `${interaction.guild.verified ? "oui" : "non"}`, true)
        .addField("**<:partner:875466216297340979> partenaire**", `${interaction.guild.partnered ? "oui" : "non"}`, true)
        .addField("**<:line:875466215521406986> premium progresse bar**", `${interaction.guild.premiumProgressBarEnabled ? "activé" : "désactiver"}`, true)
        .addField("**<:boost:953254584418201631> nombre de boost**", `${interaction.guild.premiumSubscriptionCount}`, true)
        .addField("**<:integration:875466216288952431> widget**", `${interaction.guild.widgetEnabled ? "activé" : "désactiver"}`, true)
        .addField("**<:annoucement:875466216272171078> salon système**", `${interaction.guild.systemChannel ? interaction.guild.systemChannel : "aucun salon défini"}`, true)
        .addField("**<:rules:875466211587145809> salon des règles**", `${interaction.guild.rulesChannel ? interaction.guild.systemChannel : "aucun salon défini"}`, true)
        .addField("**<:members:875466215831777311> membre maximum**", `${interaction.guild.maximumMembers}`, true)
        .addField("**<:textchannel:875466216607740014> salon textuel**", `${textChannel.size}`, true)
        .addField("**<:voicechannel:875466216733569056> salon vocal**", `${voiceChannels.size}`, true)
        .setColor("#ff0000")
        .setThumbnail(interaction.guild.iconURL())
      //send embed
      await interaction.editReply({ embeds: [embed] })
    } catch (error) {
      console.log(error);
      await interaction.editReply({ content: ":x: une erreur est survenue" })
    }
  }
}