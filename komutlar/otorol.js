const Discord = require("discord.js")
const db = require("orio.db")
const { MessageButton } = require("discord-buttons")

exports.run= async(client, message, args) => {

const prefix = "c!"

const linkbuton = new MessageButton()
  .setURL('https://aylink.co/clay')
  .setLabel('Destek')
  .setEmoji('✉️')
  .setStyle('LINK');

let emote = {
başarılı: "<a:successful:982734530274271262>",
başarısız: "<a:iptal:982407033854754816>"
}

if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("> "+ emote.başarısız + " **Başarasız!** Bu komutu kullanamazsın **Yönetici** iznin bulunmuyor.");

let data = db.get("otorol_"+message.guild.id)
let mesajdata = db.get("otorolmesaj_"+message.guild.id)
let rol = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
let kanal = message.mentions.channels.first() ||message.guild.channels.cache.get(args[0]);
let argüman = args[0]
let argüman2 = args[1]
let mesaj = args.slice(1).join(" ")

if(argüman === "sıfırla"){

if(!data) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Otorol zaten ayarlanmamış! `);
  
db.delete("otorol_"+message.guild.id)
message.channel.send(`> ${emote.başarılı} **Başarılı!** Otorol sistemi başarıylı silindi!`)

return;           
}  

if(argüman === "mesaj"){
if(argüman2 === "sıfırla"){

if(!mesajdata) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Otorol mesaj zaten ayarlanmamış! `);
  
db.delete("otorolmesaj_"+message.guild.id)
message.channel.send(`> ${emote.başarılı} **Başarılı!** Otorol mesajı başarıyla sıfırlandı!`)

return;           
}  

if(mesajdata) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Otorol mesajı zaten ayarlanmış! **Sıfırlamak İçin:** \`${prefix}otorol mesaj sıfırla\``)
  
if(!mesaj) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Lütfen ayarlamak istediğiniz mesajı belirtin! **Sıfırlamak İçin:** \`${prefix}otorol mesaj <mesaj>\``)

if(mesaj.length > 2000) return message.channel.send("> "+ emote.başarısız +" **Başarısız!** Otorol mesajı en fazla 2000 karakter olmadılır!")


db.set("otorolmesaj_"+message.guild.id, mesaj)
  
const embed = new Discord.MessageEmbed()
.setTitle(`${emote.başarılı} Başarılı!`)
.setDescription(`> Başarılı kullanıcı sunucuya girdiğinde ayarlanan mesaj atılacak.`)
.addField("Mesaj <a:down:982383143271149579>", "```" + mesaj + "```")
.setColor("RANDOM");

message.channel.send(embed); 

return;           
}  

if(!argüman){

  let embed = new Discord.MessageEmbed()
  .setTitle(emote.başarısız +" Başarısız")   
  .setDescription(`> **Lütfen ne yapmak istediğnizi belirtin. Örnekler;**`)
  .addField("Otorol <a:down:982383143271149579>", `\`\`\`${prefix}otorol @rol #kanal\n${prefix}otorol sıfırla\`\`\``) 
  .addField("Otorol Mesaj <a:down:982383143271149579>", `\`\`\`${prefix}otorol mesaj <mesaj>\n${prefix}otorol mesaj sıfırla\`\`\``)
  .setColor("RANDOM")
  .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
  .setTimestamp()
  return message.channel.send({embed: embed, buttons: [linkbuton]})
    }

if(data) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Otorol sistemi zaten ayarlanmış! **Sıfırlamak İçin:** \`${prefix}otorol sıfırla\``)

if(!rol) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Lütfen rol belirtin! **Örnek:** \`${prefix}otorol @rol kanal\``);

if(!kanal) return message.channel.send(`> ${emote.başarısız} **Başarısız!** Lütfen kanal belirtin! **Örnek:** \`${prefix}otorol @rol kanal\``);

await db.set("otorol_"+message.guild.id, {
  rol: rol.id,
  kanal: kanal.id
  })
  
const embed = new Discord.MessageEmbed()
.setTitle(`${emote.başarılı} Başarılı!`)
.setDescription(`> Başarılı kullanıcı sunucuya girdiğinde ${rol} rolünü alıca ve ${kanal} kanalına mesaj atılcak.`)
.addField("Rol <a:down:982383143271149579>", "```" + rol.name + " | " + rol.id + "```")
.addField("Kanal <a:down:982383143271149579>", "```" + kanal.name+ " | " + kanal.id + "```")
.setColor("RANDOM");

return message.channel.send(embed); 
   
};
exports.conf = {
aliases: []
}

exports.help = {
name: "otorol"
}