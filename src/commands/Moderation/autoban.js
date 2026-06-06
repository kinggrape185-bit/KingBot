const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('autoban')
        .setDescription('Enable autoban for a channel')
        .addChannelOption(option =>
            option.setName('channel')
                .setDescription('Channel to protect')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),

    async execute(interaction) {
        const channel = interaction.options.getChannel('channel');

        interaction.client.autobanChannels ??= new Set();
        interaction.client.autobanChannels.add(channel.id);

        await interaction.reply({
            content: `AutoBan enabled for ${channel}.`,
            ephemeral: true
        });
    }
};
