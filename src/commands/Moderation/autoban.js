import { SlashCommandBuilder, PermissionFlagsBits } from 'discord.js';
import { successEmbed } from '../../utils/embeds.js';

export default {
    data: new SlashCommandBuilder()
        .setName('autoban')
        .setDescription('Enable AutoBan on a channel')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Channel to protect')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

    category: 'moderation',

    async execute(interaction, config, client) {
        const channel = interaction.options.getChannel('channel');

        if (!client.autobanChannels) {
            client.autobanChannels = new Set();
        }

        client.autobanChannels.add(channel.id);

        await interaction.reply({
            embeds: [
                successEmbed(
                    '✅ AutoBan Enabled',
                    `Anyone who sends a message in ${channel} will be banned.`
                )
            ]
        });
    },
};
