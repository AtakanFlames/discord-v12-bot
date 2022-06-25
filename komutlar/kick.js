const Discord = require("discord.js")
module.exports.run= async(client, message, args) => {

let kullanıcı = message.mentions.members.first(); 
let sebep = args.slice(1).join(" ")


if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("<a:iptal:982407033854754816> **| Bu Komutu Kullanamazsın!**")

if (!kullanıcı) return message.channel.send("<a:iptal:982407033854754816> **| Bir Kullanıcı Etiketlemelisin!**")
if (!sebep) {
sebep = "Sebep Belirtilmedi!"
}

let dcs = new Discord.MessageEmbed()
.setColor("RANDOM")
.setDescription("<a:hype:984165431935909938> **Atılan Kullanıcı:** <@" + kullanıcı.id + ">\n\n <:github:983830172140724364> **Atan Yetkili:** <@" + message.author.id + ">\n\n <:tersoruisareti:984166677241544777> **Atılma Sebebi:** `" + sebep + "`")
.setFooter(client.user.username,client.user.avatarURL({dynamic: true}))
.setImage('https://giffiles.alphacoders.com/483/48379.gif')
.setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
.setTimestamp()
message.delete()
message.channel.send(dcs)
kullanıcı.kick(sebep)

}
module.exports.conf = {
aliases: []
}

module.exports.help = {
name: "kick"
}