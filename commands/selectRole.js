const { SlashCommandBuilder } = require("@discordjs/builders");
const { MessageActionRow, Permissions, MessageSelectMenu } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("role")
    .setDescription("select menu pour choisir des roles"),
  async execute(interaction) {
    try {
      //check if author has permissions
      if (!interaction.member.permissions.has(Permissions.FLAGS.MANAGE_MESSAGES)) return interaction.reply({ content: ":x: vous n'avez pas la permissions d'executer cette commande!", ephemeral: true })
      const row = new MessageActionRow()
        .addComponents(
          new MessageSelectMenu()
            .setCustomId('selectRole')
            .setPlaceholder('Veuillez sélectionner un role')
            .setMinValues(1)
            .setMaxValues(3)
            .addOptions([
              {
                label: 'Gaming',
                description: 'accedez à la catégorie gaming',
                value: 'gaming_role',
              },
              {
                label: 'Communauté',
                description: 'accedez à la communauté',
                value: 'commu_role',
              },
              {
                label: 'Dev',
                description: 'accedez a la catégorie developpement',
                value: 'dev_role',
              },
            ]),
        );
      //send response
      await interaction.reply({ content: ":video_game: Gaming\n:globe_with_meridians: Communauté\n:computer: Dev", components: [row] })
    } catch (error) {
      await interaction.reply({ content: `une erreur est survenue\n${error}`,ephemeral: true})
    }
  }
}