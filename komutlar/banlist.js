const Discord = require("discord.js");
const talkedRecently = new Set();

exports.run = async(client, message, args) => {
    
    
const bans = new Map();
            message.guild.fetchBans().then(g => {
                bans[g.id] = g;
                let banlist = (`${bans[g.id].map(ge => `\n > <@${ge.user.id}> (${ge.user.id})`).join('\n')}`)
                        try {     
                let noembed = new Discord.MessageEmbed()
                .setColor('#RED')
                .setDescription(`> **Bu Sunucuda Yasaklı Kullanıcı Bulunmuyor.**`)
                .setAuthor(message.guild.name, message.guild.iconURL({dynamic: true}) ? message.guild.iconURL({dynamic: true}) : "")
                .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
                .setTimestamp()
                if(banlist.length === 0) return message.channel.send(noembed)

                const embed = new Discord.MessageEmbed()
                    .setDescription(banlist)
                    .setAuthor(message.guild.name, message.guild.iconURL() ? message.guild.iconURL() : "")
                    .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
                    .setTimestamp()
                    .setColor('#GREEN')
                message.channel.send(embed)
                
                      } catch (err) {

        const embed = new Discord.MessageEmbed()
            .addField(`> **Sunucuda Bulunan Yasaklılar`, '<a:iptal:982407033854754816> Üzgünüm ama sunucunuzda fazla sayıda yasaklı kullanıcı bulunuyor Bu Yüzden gösteremiyorum. Discord buna izin vermiyor.**')
            .setColor('RED')
            .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
            .setTimestamp()
        message.channel.send(embed)
                      }

        });
    }
                                           
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['yasak-listesi','ban-list'],
  permLevel: 0
};

exports.help = {
  name: 'banlist',
  description: 'Sunucudaki Yasaklı Kullanıcıları Gösterir.',
  usage: 'banlist',
 
};