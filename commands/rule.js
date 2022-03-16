const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageEmbed, MessageActionRow, MessageButton, Permissions } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("rule")
    .setDescription("envoie le message de réglement"),
  async execute(interaction) {
    await interaction.deferReply();
    try {
      if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_GUILD)) return await interaction.editReply({ content: ":x vous n'avez pas la permission d'éxecuter cette commande", ephemeral: true })
      //embed
      const embed = new MessageEmbed()
        .setTitle("**<:rules:875466211587145809> | Règles du serveur**")
        .addField("**<:settings:875466211146743829> | Conditions d'utilisations de discord :**",
          `> - Les conditions d'utilisation discord(ToS) doivent être respecter.
        > - Interdiction de mentionner ou proposer des méthodes illégals(better discord, générateur de clés discord, steam, etc...)
        > - Interdiction de faire de la pub MP.`, false)
        .addField("**<:members:875466215831777311> | Pseudonymes et images :**",
          `> - Ne doit pas avoir de caractère spéciaux et/ou pornographique.
        > - Ne doit pas pouvoir être confondu/ressemblant avec/à celui d'un membre du staff.
        > - Ne doit pas contenir de propos racistes, homophobes, sexistes ou faire référence à la drogue.`, false)
        .addField("**<:redstars:875466216557408327> | Conduite :**",
          `> - Ne pas recourir aux insultes.
        > - Les ghosts pings sont interdits.
        > - Soyez respectueux, courtois, poli envers les utilisateurs et le staff. 'Bonjour', 'Merci', 'Au revoir' n'ont jamais tué personne, vous pouvez être plus familier également, on est pas dans une entreprise non plus .
        > - Ne dévoilez sous aucun prétexte vos informations de compte, même à un membre du staff !`, false)
        .addField("<:support:875466211205480500> | Besoin d'aides :",
          `> - Si vous rencontrez le besoin d'un personnel du staff, merci de vous diriger dans le canal : #・aide-staff`, false)
        .addField("<:moderatorcertified:875466217425604680> | Sanctions encourues :",
          `> - Les sanctions peuvent varier selon la gravité de la faute.
        > - Les sanctions seront à l'appréciation du membre du Staff en fonction de la gravité de la faute.
        > - Les insultes sont réprimandées par un mute ou un bannissement. Tout est proportionnel à la gravité des insultes et leur contexte.
        > - Les pseudonymes 'hors-charte' peuvent être sanctionnés par un bannissement , un kick ou tout simplement une demande de changement de pseudonyme. Si le joueur refuse d'obtempérer, le modérateur se réservera le droit de le bannir.
        > - L'usurpation d'identité d'un membre du staff, avec ou sans intention de nuire, se verra immédiatement et sans préavis sanctionnée d'un ban.
        > - En cas de récidive, le staff se réserve le droit d'alourdir les sanctions.`, false)
        .setImage("https://cdn.discordapp.com/attachments/859923071376687104/871349084466851860/standard_1.gif")
        .setFooter({ text: "ces règles peuvent évoluer à tout moment", iconURL: "https://cdn.discordapp.com/attachments/859923071376687104/951915737470074888/fd0f6fbf3078586434b9745a59f90af5.png" })
        .setColor("#ff0000")
      //button components
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("acceptRule")
          .setEmoji("✔️")
          .setLabel("accepter les règles")
          .setStyle("SUCCESS")
      )
      //send message
      await interaction.editReply({ embeds: [embed], components: [row] })
    } catch (error) {
      await interaction.editReply({ content: `:x: une erreur est survenue! \n${error}` })
    }
  }
}