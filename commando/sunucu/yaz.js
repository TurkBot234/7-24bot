const { Command } = require ('discord.js-commando');
const { RichEmbed } = require('discord.js');

module.exports = class YazCommand extends Command {
    constructor(client){
        super(client, {
            name: 'yaz',
            group: 'sunucu',
            memberName:'yaz',
            description:'Bota yazı yazırırsınız',

            args: [
                {
                    key:'yazilan',
                    prompt:'Bota Ne yazdırmak İstersin',
                    type:'string'
                }
            ]
        })
    }
     run(msg,args){
 const { yazilan } = args;
 const embed = new RichEmbed()
 .setDescription(yazilan)
 return msg.embed(embed)

    }
}