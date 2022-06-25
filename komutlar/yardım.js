const { MessageEmbed } = require("discord.js");
module.exports.run = async (client, message, args) => {
const { MessageButton } = require("discord-buttons")

const prefix = "c!"

let buton = new MessageButton()
.setStyle("grey")
.setLabel("Moderasyon ")
.setEmoji("🛠️")
.setID("moderasyon")
let linkbuton = new MessageButton()
  .setURL('https://aylink.co/clay')
  .setLabel('Destek')
  .setEmoji('✉️')
  .setStyle('LINK')
let buton1 = new MessageButton()
.setStyle("grey")
.setLabel("Kullanıcı ")
.setEmoji("💎")
.setID("kullanıcı")
let buton2 = new MessageButton()
.setStyle("grey")
.setLabel("Bot ")
.setEmoji("⚙️")
.setID("bot")
let buton5 = new MessageButton()
.setStyle("grey")
.setLabel("Welcome")
.setEmoji("🙋‍♂️")
.setID("Welcome")
let buton6 = new MessageButton()
.setStyle("grey")
.setLabel("Sayaç ")
.setEmoji("📈")
.setID("Sayaç")
let buton3 = new MessageButton()
.setStyle("green")
.setLabel("AnaSayfa")
.setEmoji("🏠")
.setID("anasayfa")

let buton4 = new MessageButton()
.setStyle("red")
.setLabel("Zaman Aşımı")
.setDisabled(true)
.setID("Zaman Aşımı")

let embed = new MessageEmbed()
.setTitle(`<:hypesquad:982337560028270652> Yardım Menüsü <:hypesquad:982337560028270652>`)
.setDescription(`> *Botun komutları hakkında bilgi almak için istediğiniz seçeneğin butonuna tıklayın!*`)
.addField("・ <:developer:982331487330402354>  **Moderasyon**",
"> Butonuna tıklayarak **Moderasyon Komutları** hakkında bilgi alabilirsiniz.")
.addField("・ <a:pinkelmas:982365259715198998>  **Kullanıcı**",
"> Butonuna tıklayarak **Kullanıcı Komutları** hakkında bilgi alabilirsiniz.")
.addField("・ <:bot:982365674284396614>  **Bot**",
"> Butonuna tıklayarak **Bot Komutları** hakkında bilgi alabilirsiniz.")
.addField("・ <a:kitap:982380649728065538> **Anasayfa**",
"> Butonuna tıklayarak bu sayfaya geri dönersiniz.")
.setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
.setColor("RANDOM")
.setTimestamp()

message.channel.send({embed: embed, buttons: [buton, buton1, buton2, buton5, linkbuton]}).then(async msg => {

const filter = x => x.clicker.user.id === message.author.id
let collector = msg.createButtonCollector(filter, { time: 60000})

collector.on("collect", async button => {
if(button.id === "moderasyon") {

let moderasyon = new MessageEmbed()
.setTitle(`<:hypesquad:982337560028270652> Moderasyon Menüsü <:hypesquad:982337560028270652>`)
.setDescription(`
> **Botun moderasyon komutları hakkında bilgi alırsınız!**

> <a:down:982383143271149579> ・ **Komutlar**

> <a:elmas:983830460398456842> ・ **${prefix}ban <@üye>** *(Üyeyi banlarsınız.)*

> <a:elmas:983830460398456842> ・ **${prefix}kick <@üye>** *(Üyeyi kicklersiniz.)*

> <a:elmas:983830460398456842> ・ **${prefix}ban-list** *(Sunucudaki Banlı Üyeleri Gösterir.)*

> <a:elmas:983830460398456842> ・ **${prefix}nuke** *(Kanaldaki Tüm Mesajları Siler.)*

> <a:elmas:983830460398456842> ・ **${prefix}mod-log** *(Mod-Log Ayarlar.)*
  
> <a:elmas:983830460398456842> ・ **${prefix}sil** *(Mesajları Siler.)*

> <a:elmas:983830460398456842> ・ **${prefix}unbanall** *(Tüm Sunucudaki Üyelerin Banını Açar.)*

> <a:elmas:983830460398456842> ・ **${prefix}forceban** *(Forceban Atar.)*

> <a:elmas:983830460398456842> ・ **${prefix}ban-id** *(İd İle Ban Atarsınız.)*

> <a:elmas:983830460398456842> ・ **${prefix}say** *(Sunucudaki Üyeleri Sayar.)*

`)

.setFooter(`${message.author.username} Tarafından Kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
.setColor("RANDOM")
.setTimestamp()

msg.edit({content: "", embed: moderasyon, buttons: [buton3]})

}

if(button.id === "kullanıcı") {

let kullanıcı = new MessageEmbed()
.setTitle("<:hypesquad:982337560028270652> Kullanıcı Menüsü <:hypesquad:982337560028270652>")
.setDescription(`> **Botun moderasyon komutları hakkında bilgi alırsınız!**

> <a:down:982383143271149579> ・ **Komutlar**

> <a:cevher:987115694028116069> ・ **${prefix}banner <@üye>** *(Üyenin Bannerını Atar.)*

`)
.setFooter(`${message.author.username} tarafından kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
.setColor("RANDOM")

msg.edit({content: "", embed: kullanıcı, buttons: [buton3]})

}

if(button.id === "bot") {

let bot = new MessageEmbed()
.setTitle("<:hypesquad:982337560028270652> Bot Menüsü <:hypesquad:982337560028270652>")
.setDescription(`> **Botun moderasyon komutları hakkında bilgi alırsınız!**

> <a:down:982383143271149579> ・ **Komutlar**

> <a:cevher:987115694028116069> ・ **${prefix}globalsay ** *(Botu Statlarını Atar.)*

`)
.setFooter(`${message.author.username} tarafından kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
.setColor("RANDOM")

msg.edit({content: "", embed: bot, buttons: [buton3]})

}

if(button.id === "Welcome") {

  let kullanıcı = new MessageEmbed()
  .setTitle("<:hypesquad:982337560028270652> Welcome Menüsü <:hypesquad:982337560028270652>")
  .setDescription(`
  > **Botun moderasyon komutları hakkında bilgi alırsınız!**

> <a:down:982383143271149579> ・ **Komutlar**

> <a:oksag:987553416022745168> ・ **sayaç-menu** *(Sunucuza Sayaç Ekler.)*

> <a:hype:982694737368735784> ・ **otorol** *(Sunucunuza Hem Oto Rol/Giriş Sağlar.)*
`)
  .setFooter(`${message.author.username} tarafından kullanıldı.`, message.author.displayAvatarURL({dynamic:true}))
  .setColor("RANDOM")
  
  msg.edit({content: "", embed: kullanıcı, buttons: [buton3]})
  
  }

if(button.id === "anasayfa") {

msg.edit({content: "", embed: embed, buttons: [buton, buton1, buton2, buton5, linkbuton]})

}

button.reply.defer();
})

collector.on("end", async button => {

msg.edit({content: "", embed: embed, button: buton4})

        })
    })
};
module.exports.conf = {
  aliases: []
};
module.exports.help = {
  name: "yardım"
};