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
      //embed
      const embed = new MessageEmbed()
        .setTitle(`information de ${interaction.guild.name}`)
        .setDescription(`${interaction.guild.description? interaction.guild.description : "aucune description définie"}`)
        .addField("**id**",interaction.guild.id)
        .addField("**crée le**", `${new Date(interaction.guild.createdAt).toLocaleString("fr-FR",optionsDate)}`)
        .addField("**nombre de membre**", `${interaction.guild.memberCount}`)
        .addField("**id du propriétaire**", `${interaction.guild.ownerId}`)
        .addField("**partenaire**", `${interaction.guild.partnered? "oui" : "non"}`)
        .addField("**premium progresse bar**", `${interaction.guild.premiumProgressBarEnabled? "activé" : "désactiver"}`)
        .addField("**nombre de boost**", `${interaction.guild.premiumSubscriptionCount}`)
        .addField("**widget**", `${interaction.guild.widgetEnabled? "activé" : "désactiver"}`)
        .addField("**salon système**", `${interaction.guild.systemChannel? interaction.guild.systemChannel : "aucun salon défini"}`)
        .addField("**salon des règles**", `${interaction.guild.rulesChannel? interaction.guild.systemChannel : "aucun salon défini"}`)
        .addField("**membre maximum**", `${interaction.guild.maximumMembers}`)
        .setThumbnail(interaction.guild.iconURL())
      //send embed
      await interaction.editReply({ embeds: [embed] })
    } catch (error) {
      console.log(error);
      await interaction.editReply({ content: ":x: une erreur est survenue" })
    }
  }
}