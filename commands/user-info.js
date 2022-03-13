const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("user-info")
    .setDescription("obtient des information sur l'utilisateur sélectionner")
    .addStringOption((option) => option.setName("utilisateur").setDescription("utilisateur à voir")),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      //interaction option
      const memberOption = interaction.options.getString("utilisateur")
      if (!memberOption) {
        //fetch member
        const fetchMember = interaction.guild.members.cache.get(interaction.member.id) || await interaction.guild.members.fetch(interaction.member.id).catch((err) => { console.log(err); });
        //avatar url
        const avatar = fetchMember.avatarURL({ dynamic: true })
        //option for local date string
        let optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //embed
        const embed = new MessageEmbed()
          .setTitle(`information sur ${fetchMember.user.tag}`)
          .addField("**id**", fetchMember.id)
          .addField("**surnom**", fetchMember.nickname ? fetchMember.nickname : "aucun surnom définie pour ce serveur")
          .addField("**à rejoint le**", `${new Date(fetchMember.joinedAt).toLocaleString("fr-FR", optionsDate)}`)
          .addField("**compte crée le**", `${new Date(fetchMember.user.createdAt).toLocaleString("fr-FR", optionsDate)}`)
          .addField("**boost**", `${fetchMember.premiumSince ? new Date(fetchMember.premiumSince).toLocaleString(optionsDate) : "ne boost pas le serveur"}`)
          .addField("**rôle le plus haut**", `${fetchMember.roles.highest}`)
          .setThumbnail(avatar)
        await interaction.editReply({ embeds: [embed] })
      } else {
        const fetchMember = interaction.guild.members.cache.get(memberOption) || await interaction.guild.members.fetch(memberOption).catch((err) => { });
        //avatar url
        const avatar = fetchMember.avatarURL({ dynamic: true })
        //option for local date string
        let optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        //embed
        const embed = new MessageEmbed()
          .setTitle(`information sur ${fetchMember.user.tag}`)
          .addField("**id**", fetchMember.id)
          .addField("**surnom**", fetchMember.nickname ? fetchMember.nickname : "aucun surnom définie pour ce serveur")
          .addField("**à rejoint le**", `${new Date(fetchMember.joinedAt).toLocaleString("fr-FR", optionsDate)}`)
          .addField("**compte crée le**", `${new Date(fetchMember.user.createdAt).toLocaleString("fr-FR", optionsDate)}`)
          .addField("**boost**", `${fetchMember.premiumSince ? new Date(fetchMember.premiumSince).toLocaleString(optionsDate) : "ne boost pas le serveur"}`)
          .addField("**rôle le plus haut**", `${fetchMember.roles.highest}`)
          .setThumbnail(avatar)
        await interaction.editReply({ embeds: [embed] })
      }
    } catch (error) {
      console.log(error);
      const embed = new MessageEmbed()
        .setTitle("<:support:875466211205480500> erreur")
        .setDescription("id invalide")
        .setTimestamp()
      await interaction.editReply({ embeds: [embed] })
    }
  }
}