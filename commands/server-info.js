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
      const allChannels = interaction.guild.channels.cache.get() || await interaction.guild.channels.fetch().catch((err) => {})
      console.log(allChannels);
      const textChannel = allChannels.filter((channels) => channels.type === "GUILD_TEXT")
      const voiceChannels = allChannels.filter((channels) => channels.type === "GUILD_VOICE")
      //embed
      const embed = new MessageEmbed()
        .setTitle(`information de ${interaction.guild.name}`)
        .setDescription(`${interaction.guild.description? interaction.guild.description : "aucune description définie"}`)
        .addField("**<:redstars:875466216557408327> id**",interaction.guild.id)
        .addField("**<:inbox:875466215886299186> crée le**", `${new Date(interaction.guild.createdAt).toLocaleString("fr-FR",optionsDate)}`)
        .addField("**<:members:875466215831777311> nombre de membre**", `${interaction.guild.memberCount}`)
        .addField("**<:staff:875466212430196747> id du propriétaire**", `${interaction.guild.ownerId}`)
        .addField("**<:verified:875466217056509952> vérifier**", `${interaction.guild.verified? "oui" : "non"}`)
        .addField("**<:partner:875466216297340979> partenaire**", `${interaction.guild.partnered? "oui" : "non"}`)
        .addField("**<:line:875466215521406986> premium progresse bar**", `${interaction.guild.premiumProgressBarEnabled? "activé" : "désactiver"}`)
        .addField("**<:redgift:875466211390013471> nombre de boost**", `${interaction.guild.premiumSubscriptionCount}`)
        .addField("**<:integration:875466216288952431> widget**", `${interaction.guild.widgetEnabled? "activé" : "désactiver"}`)
        .addField("**<:annoucement:875466216272171078> salon système**", `${interaction.guild.systemChannel? interaction.guild.systemChannel : "aucun salon défini"}`)
        .addField("**<:rules:875466211587145809> salon des règles**", `${interaction.guild.rulesChannel? interaction.guild.systemChannel : "aucun salon défini"}`)
        .addField("**<:members:875466215831777311> membre maximum**", `${interaction.guild.maximumMembers}`)
        .addField("**<:textchannel:875466216607740014> salon textuel**",`${textChannel.size}`)
        .addField("**<:voicechannel:875466216733569056> salon vocal**", `${voiceChannels.size}`)
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