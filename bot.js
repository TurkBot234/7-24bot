const { CommandoClient, SQLiteProvider } = require ('discord.js-commando');
const path = require('path');
moment = require('moment');
sqlite = require('sqlite');
Discord = require('discord.js');
request = require('request');
snekfetch = require('snekfetch');
Jimp = require('jimp');
fs = require('fs');



const client = new CommandoClient({
  owner: '319427991824367617',
  commandPrefix: 't!'
});

client.registry 
 .registerDefaultTypes()
 .registerGroups([
   ['sunucu','Sunucu '],
   ['ayarlar', 'Ayarlar'],
   ['admin', 'Admin'],
   ['util', 'util'],
   ['bot', 'bot'],
 ])
 .registerDefaultGroups()
 .registerDefaultCommands()
 .registerCommandsIn (path.join(__dirname,'commando'));

 sqlite.open(path.join(__dirname, "database.sqlite3")).then((db) => {
   client.setProvider(new SQLiteProvider(db));
 });

client.on ('ready', () => {
   client.user.setActivity("Commando ile kodlanıyor", {type:"WATCHING"})
   console.log(` LOG : Bot Aktif`);
 });

 client.on('messageUpdate', async (oldMsg, newMsg) => {
  if (!newMsg.guild) return;
		if (newMsg.author.bot) return;
		//ANTIREKLAM
		const antiadvariable = client.provider.get(newMsg.guild.id, 'reklamEngel', []);
		if (antiadvariable ==! true) return;
		if (antiadvariable === true) {
		const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
			if (swearWords.some(word => newMsg.content.toLowerCase().includes(word))) {
				if (!newMsg.member.hasPermission("ADMINISTRATOR")) {
					newMsg.delete();
					return newMsg.reply('Reklam yapmamalısın!').then(reply => reply.delete(3000));
				}
			}
    }
  
});
client.on('message', async msg => {
  if (!msg.guild) return;
  const veri = client.provider.get(msg.guild.id, 'reklamEngel', []);
  const veri2 = client.provider.get(msg.guild.id, 'linkEngel', []);
  if (veri ==! true) return;
  if (veri === true) {
      const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
      if (swearWords.some(word => msg.content.includes(word))) {
        try {
            if (!msg.member.hasPermission("BAN_MEMBERS")) {
                msg.delete();

                return msg.reply('Reklam yapmamalısın!').then(msg => msg.delete(3000));
            }
        } catch(err) {
          console.log(err);
        }
      }
  }
});
client.on('guildMemberAdd', async member => {
		if (!member.guild) return;
		const enabled = client.provider.get(member.guild.id, 'logsEnable', []);
		if (enabled !== true) return;
		const logCh = client.provider.get(member.guild.id, 'logsChannel', []);
		if (!logCh) return;
		if (member.guild.channels.get(logCh) === undefined || member.guild.channels.get(logCh) === null) return;
		if (member.guild.channels.get(logCh).type === "text") {
			var embed = new Discord.RichEmbed()
			.setTitle('Üye katıldı.')
			.setAuthor(member.user.tag, member.user.avatarURL)
			.setColor(3066993)
			.setDescription(`<@!${member.user.id}>, ${member.user.tag}`)
			.setThumbnail(member.user.avatarURL)
			.setFooter(`ID: ${member.user.id}`)
			.setTimestamp();
			member.guild.channels.get(logCh).send({embed});
		}
	});
client.on('message', msg => {
  if (!msg.guild) return;
  const veri = client.provider.get(msg.guild.id, 'linkEngel', []);
  if (veri !== true) return;
  if (veri === true) {
  const swearWords = ["discord.gg", "discord.me", "discordapp.com", "discord.io", "discord.tk"];
  if (swearWords.some(word => msg.content.includes(word))) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) {
      return;
    }
  }
  var regex = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
  if (regex.test(msg.content)==true) {
    if (!msg.member.hasPermission("BAN_MEMBERS")) {
      msg.delete();
      
      return msg.reply('Reklam yapmamalısın!').then(msg => msg.delete(3000));
    } else {
      return;
    };
  } else {
    return;
  };
  };
});

client.on('guildMemberAdd', async member => {
  const veri = client.provider.get(member.guild.id, 'girisRolK', []);
  if (veri ==! true) return;
  if (veri === true) {
    const girisrolveri = client.provider.get(member.guild.id, 'girisRol', []);
    if (member.guild.roles.get(girisrolveri) === undefined || member.guild.roles.get(girisrolveri) === null) return;
    member.addRole(girisrolveri);
  }
});
 client.login('NDcyNzg4NjQyMzk4NDcwMTQ1.Dnf_ow.K1IH7nfHGRovTx59Ey9-7uPbMzc')