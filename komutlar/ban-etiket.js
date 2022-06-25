const Discord = require("discord.js");
exports.run = async (client, message, args) => {

  if (!message.member.hasPermission("BAN_MEMBERS")){
      const yetkiyok = new Discord.MessageEmbed()
      .setTitle('<a:iptal:982381710350106634> **Bu Bir Uyarıdır!**')
      .setDescription(`<a:iptal:982381710350106634> **|** ${message.author} **Bu kodu kullanmak için gerekli yetkiye sahip değilsin.**`)
      .setColor('RED')
      .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
      .setTimestamp()
      return message.channel.send(yetkiyok)
  }

        
  let dcs_user = message.mentions.users.first();
  let reason = args.slice(1).join(' ');

        
         if (isNaN(dcs_user)){
            const kullanicihata = new Discord.MessageEmbed()
            .setTitle('<a:iptal:982381710350106634> **Bu Bir Uyarıdır!**')
            .setDescription(`${message.author} **Banlanacak @clay etiketle...**`)
            .setColor('RED')
            .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
            .setTimestamp()
            return message.channel.send(kullanicihata);
        };

          message.guild.members.ban(dcs_user);

          const ban =  new Discord.MessageEmbed()
          .setTitle('<a:successful:982734530274271262> **|** **BANNED!**')
          .setDescription(`> **Yasaklanan Kullanıcı: **${dcs_user}

          > ${message.author} **Tarafından Sunucudan Yasaklandı!**
          
          > <a:kitap:982380649728065538> **Sebep:** ${reason}`)
          .setColor('GREEN')
          .setImage('https://c.tenor.com/WjAeRuEJaQoAAAAd/thor-ban.gif')
          .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
          .setTimestamp()
          return message.channel.send(ban);
      };
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["ban","etiket-ban","etiketban","banetiket","ban-etiket"]
};

exports.help = {
  name: "ban",
  description: "ban işte orospu evladı",
  usage: "ban"
};