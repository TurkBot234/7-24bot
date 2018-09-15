const { Command } = require('discord.js-commando');
const moment = require('moment');
const { stripIndents } = require('common-tags');

const humanLevels = {
	0: 'None',
	1: 'Low',
	2: 'Medium',
	3: '(╯°□°）╯︵ ┻━┻',
	4: '┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻'
};

module.exports = class ServerInfoCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sunucubilgi',
			aliases: ['server'],
			group: 'sunucu',
			memberName: 'sunucubilgi',
			description: 'sunucu hakkında bilgi verir.',
			details: `sunucu hakkında bilgiler verir.`,
			guildOnly: true,
			throttling: {
				usages: 2,
				duration: 3
			}
		});
	}

	run(msg) {
		return msg.embed({
			color: 3447003,
			description: `hakkında : **${msg.guild.name}** (ID: ${msg.guild.id})`,
			fields: [
				{
					name: '❯ Kanallar',
					/* eslint-disable max-len */
					value: stripIndents`
						• ${msg.guild.channels.filter(ch => ch.type === 'text').size} Metin, ${msg.guild.channels.filter(ch => ch.type === 'voice').size} Sesli
						• Normal: ${msg.guild.defaultChannel}
						• AFK: ${msg.guild.afkChannelID ? `<#${msg.guild.afkChannelID}> after ${msg.guild.afkTimeout / 60}min` : 'None.'}
					`,
					/* eslint-enable max-len */
					inline: true
				},
				{
					name: '❯ Üyeler',
					value: stripIndents`
						• ${msg.guild.memberCount} members
						• Sahip: ${msg.guild.owner.user.tag}
						(ID: ${msg.guild.ownerID})
					`,
					inline: true
				},
				{
					name: '❯ Diğer',
					value: stripIndents`
						• Roller: ${msg.guild.roles.size}
						• Bölge: ${msg.guild.region}
						• Düzenlendi: ${moment.utc(msg.guild.createdAt).format('dddd, MMMM Do YYYY, HH:mm:ss ZZ')}
						• Doğrulama seviyesi: ${humanLevels[msg.guild.verificationLevel]}
					`
				}
			],
			thumbnail: { url: msg.guild.iconURL }
		});
	}
};