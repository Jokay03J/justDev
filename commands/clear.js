const { SlashCommandBuilder } = require("@discordjs/builders")
const { Permissions } = require("discord.js")

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("supprime le nombre de message sélectionner(au maximum 99)")
    .addIntegerOption((option) => option.setName("nombre").setDescription("nombre de message a supprimer(au maximum 99)").setRequired(true)),
  async execute(interaction) {
    try {
      //check if member has permissions
      if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return await interaction.reply({ content: ":x: vous n'avez pas la permission d'utiliser cette commande", ephemeral: true })
      //check if bot has MANAGE CHANNEL 
      if (!interaction.guild.me.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return await interaction.reply({ content: ":x: je n'ai pas la permissions de supprimer des messages!(||MANAGE_MESSAGES||)", ephemeral: true })
      //number of message to delete
      const messageNumber = interaction.options.getInteger("nombre")
      //check if messageNumber is highest 99
      if (messageNumber > 99) return await interaction.reply({ content: ":x: le nombre message à supprimer ne doit pas dépasser 99!", ephemeral: true })
      //bulkDelete messgae in TextChannel
      const messageDeleted = await interaction.channel.bulkDelete(messageNumber, true)
      //send confirm message with the number of message deleted
      await interaction.reply({ content: `:white_check_mark: ${messageDeleted.size} ${messageDeleted.size === 1 ? "message à été" : "messages ont bien été"} supprimer!`, ephemeral: true })
      //catch error
    } catch (error) {
      //log error
      console.log(error);
      //send error message
      return interaction.reply({ content: ":x: une erreur est survenue veuillez réessayer plus tard", ephemeral: true })
    }
  }
}