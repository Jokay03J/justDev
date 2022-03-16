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
          try {
            const fetchMember = interaction.guild.members.cache.get(interaction.member.id) || await interaction.guild.members.fetch(interaction.member.id).catch((err) => { });
            //remove all role
            fetchMember.roles.remove(process.env.DEVROLE) //dev role
            fetchMember.roles.remove(process.env.COMMUROLE) //commu role
            fetchMember.roles.remove(process.env.GAMINGROLE) //gaming role
            for (role of interaction.values) {
              if (role === "dev_role") fetchMember.roles.add(process.env.DEVROLE) //add dev role
              if (role === "commu_role") fetchMember.roles.add(process.env.COMMUROLE) //add commu role
              if (role === "gaming_role") fetchMember.roles.add(process.env.GAMINGROLE) //add gaming role
            }
            return interaction.reply({ content: "vos rôles ont bien été mis à jour!", ephemeral: true })
          } catch (error) {
            interaction.reply({ content: `:x: une erreur est survenue!\n${error}`, ephemeral: true })
          }
          break;
      }
    }
    //handling button interaction
    if (interaction.isButton()) {
      switch (interaction.customId) {
        case "createTicket":
          try {
            //create channel with permissions
            const channelCreated = await interaction.guild.channels.create(`ticket-${interaction.member.displayName}`,
              {
                parent: process.env.PARENTID, reason: `creation d'un ticket(${interaction.member.displayName})`,
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
          } catch (error) {
            interaction.reply({ content: `:x: une erreur est survenue!\n${error}`, ephemeral: true })
          }
          break;

        case "deleteTicket":
          try {
            //fetch channel to delete
            const fetchedChannel = interaction.guild.channels.cache.get(interaction.channelId) || await interaction.guild.channels.fetch(interaction.channelId).catch((err) => { })
            //delete channel
            fetchedChannel.delete({ reason: "fermeture d'un ticket" })
          } catch (error) {
            interaction.reply({ content: `une erreur est survenue!\n${error}`, ephemeral: true })
          }
          break;

        case "acceptRule":
          try {
            //fetch member
            const fetchMember = interaction.guild.members.cache.get(interaction.member.id) || await interaction.guild.members.fetch(interaction.member.id).catch((err) => { });
            //add role
            fetchMember.roles.add(process.env.RULEROLE)
            //send confirm message
            interaction.reply({ content: "✅ vous avez bien accepter les règles!", ephemeral: true })
          } catch (error) {
            interaction.reply({ content: `:x: une erreur est survenue!\n${error}`, ephemeral: true })
          }
          break;
      }
    }
  },
};