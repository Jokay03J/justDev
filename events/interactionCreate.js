const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");

module.exports = {
  name: 'interactionCreate',
  once: false,
  async execute(interaction, client) {
    //handling command
    if (interaction.isCommand()) {
      const command = client.commands.get(interaction.commandName);

      if (!command) return;

      try {
        await command.execute(interaction);
      } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
      }
    }

    //handling selected menu
    if (interaction.isSelectMenu()) {
      switch (interaction.customId) {
        case "selectRole":
          const fetchMember = interaction.guild.members.cache.get(interaction.member.id) || await interaction.guild.members.fetch(interaction.member.id).catch((err) => { });
          //remove all role
          fetchMember.roles.remove("952597846102782013") //dev role
          fetchMember.roles.remove("952597799927689266") //commu role
          fetchMember.roles.remove("952597758668341318") //gaming role
          for (role of interaction.values) {
            if (role === "dev_role") fetchMember.roles.add("952597846102782013")
            if (role === "commu_role") fetchMember.roles.add("952597799927689266")
            if (role === "gaming_role") fetchMember.roles.add("952597758668341318")
          }
          return interaction.reply({ content: "vos rôles ont bien été mis à jour!", ephemeral: true })
          break;
      }
    }
    //handling button interaction
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "createTicket":
          //create channel with permissions
          const channelCreated = await interaction.guild.channels.create(`ticket-${interaction.member.displayName}`,
            {
              parent: "952669017678688317", reason: `creation d'un ticket(${interaction.member.displayName})`,
              permissionOverwrites: [
                {
                  //everyone
                  id: interaction.guild.roles.everyone,
                  deny: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                },
                {
                  //author
                  id: interaction.member.id,
                  allow: ["VIEW_CHANNEL", "SEND_MESSAGES"]
                },
                {
                  //bot
                  id: interaction.guild.me.id,
                  allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "MANAGE_CHANNELS"]
                }
              ]
            })
          interaction.reply({ content: `le ticket à bien été crée, ${channelCreated}`, ephemeral: true })
          //action row
          const row = new MessageActionRow()
            .addComponents(
              new MessageButton()
                .setCustomId("deleteTicket")
                .setLabel("supprimer le ticket")
                .setStyle("DANGER")
                .setEmoji("❌")
            )
          //embed
          const embed = new MessageEmbed()
            .setTitle(`ticket de ${interaction.member.displayName}`)
            .setDescription("pose ta question/problème,le support devrais te répondre")
          channelCreated.send({ embeds: [embed], components: [row] })
          break;

        case "deleteTicket":
          //fetch channel to delete
          const fetchedChannel = interaction.guild.channels.cache.get(interaction.channelId) || await interaction.guild.channels.fetch(interaction.channelId).catch((err) => {})
          //delete channel
          fetchedChannel.delete({ reason: "fermeture d'un ticket"})
          break;
      }
    }
  },
};