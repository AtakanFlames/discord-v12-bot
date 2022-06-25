const Discord = require('discord.js')
const db = require("orio.db")
//dcs ekibi

exports.run = async (client, message, args) => {
if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`<a:iptal:982407033854754816> | Bu Komutu Kullanabilmek İçin **Yönetici** İznine Sahip Olmalısın!`);
if(!args[0]) return message.reply("<a:iptal:982407033854754816> **|** `c!log ayarla #kanal` **veya** `c!log sıfırla Yazmalısın!`")

  if(args[0] === "ayarla"){
  let channel = message.mentions.channels.first()
    if (!channel) {
        message.channel.send('<a:iptal:982407033854754816> **|** **Kullanım:** `c!log ayarla #kanal`')}
    
   
    message.channel.send(`<:onay:982408447184211988> **|** ** Log Kanalı ${channel} Olarak Ayarlandı.** `)
await db.set('kkk_'+message.guild.id, channel.id)
}
if(args[0] === "sıfırla"){
message.channel.send('<a:mesaj:982406784268533810> **|** **Log Kanalı Sıfırlandı!**')
await db.delete('kkk_'+message.guild.id)
}
}
    
exports.conf = {
    aliases: ["modlog","mod-log"]
}
//dcs ekibi
exports.help = {
    name: 'mod-log'
}