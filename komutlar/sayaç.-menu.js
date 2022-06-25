const Discord = require('discord.js')
exports.run = (client, message, args) => {
const { MessageButton } = require("discord-buttons")


  const linkbuton = new MessageButton()
  .setURL('https://aylink.co/clay')
  .setLabel('Destek')
  .setEmoji('✉️')
  .setStyle('LINK');
 
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("> <a:iptal:982407033854754816> **|** `Başarasız!` **Bu komutu kullanamazsın** `Yönetici` **iznin bulunmuyor.**");


  let prefix = "c!"
  let clayembed = args.slice().join(' ')
  const clayxd = new Discord.MessageEmbed()
  .setTitle("<a:staff:982734428235235348> **Sayaç Menü** <a:staff:982734428235235348>")   
  .setDescription(`> **Lütfen ne yapmak istediğnizi belirtin. Örnekler;**`)
  .addField("Sayaç <a:down:982383143271149579>", `\`\`\`${prefix}sayaç #kanal <sayı>\n\`\`\``) 
  .setColor("RANDOM")
  .setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
  .setTimestamp();
 message.channel.send(({embed: clayxd, buttons: [linkbuton]}))
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['sayaç-menu','sayaç-menü'],
  permLevel: 0
}

exports.help = {
  name: 'sayaç-menu'
}