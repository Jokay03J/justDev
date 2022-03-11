const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("envoie le ping du bot"),
    async execute(interaction) {
      //set defer reply
      await interaction.deferReply()

      try {
        //send ping
        await interaction.editReply({ content: `le ping du bot est: ${interaction.client.ws.ping}ms`})
      } catch (error) {
        await interaction.editReply({ content: ":x: une erreur est survenue !"})
      }
    }
}