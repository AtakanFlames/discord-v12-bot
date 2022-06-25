const Discord = require('discord.js');
const fs = require('fs')
const profil = JSON.parse(fs.readFileSync("./database/sayaç.json", "utf8"));

exports.run = (client, message, args) => {
  if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send("> <a:iptal:982407033854754816> **|** **Bu Komutu Kullanabilmek İçin** `Sunucuyu Yönet` **Yetkisine Sahip Olmalısın!**")

  let mkanal = message.mentions.channels.first()
  let sayı = args[1]
  if(!mkanal) return message.channel.send("> <a:iptal:982407033854754816> **|** **Bir** `Kanal` **Etiketlemelisin!**") 
  if(!sayı) return message.channel.send("> <a:iptal:982407033854754816> **|** **Bir** `Sayı` **Girmelisin!**")
  if(sayı < message.guild.members.size) return message.channel.send("> <a:iptal:982407033854754816> **|** **Sayaç Sayısı Sunucudaki `Üye` Sayısından Fazla Olmalıdır!**\n**Üye Sayısı:** " + message.guild.members.size)
  if(sayı && mkanal) {
    if(!profil[message.guild.id]) {
      profil[message.guild.id] = {
        sayi: sayı,
        kanal: mkanal 
      } 
    }
    if(profil[message.guild.id]) {
      profil[message.guild.id].sayi = sayı;
      profil[message.guild.id].kanal = mkanal.id;
    }
    fs.writeFile("./database/sayaç.json", JSON.stringify(profil), (err) => {
        if(err) message.channel.send("Hata: " + err)
    })

    let nova = new Discord.MessageEmbed()
      .setTitle("<a:hype:982694737368735784> Sayaç Ayarlandı <a:hype:982694737368735784>")
      .setDescription(`<:kalem:987592767221923872> **Sayaç Kanalı:** ${mkanal}\n <a:yildiz:987593106767618058> **Sayaç:** \`${sayı}\``)
      .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
      .setColor("RANDOM")
      .setImage('https://4.bp.blogspot.com/-fnw6fsY9h1c/WnHLV3DOWsI/AAAAAAAADZ4/pHZNiVHrUDAViehGzz8fB2Ml59oYwetTwCLcBGAs/s1600/klavye-tuslari.gif')
      .setTimestamp()
    message.channel.send(nova)
  }
};

exports.conf = {
  aliases: []
};
exports.help = {
  name: 'sayaç'
};