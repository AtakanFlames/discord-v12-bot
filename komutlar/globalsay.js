const Discord = require('discord.js');

exports.run = async(client, msg) => {

function checkDays(date) {
            let now = new Date();
            let diff = now.getTime() - date.getTime();
            let days = Math.floor(diff / 86400000);
            return days + (days == 1 ? " gün" : " gün") + " önce";
        };
        let guild = msg.channel.guild
        let serverSize = msg.guild.memberCount;
        let botCount = msg.guild.members.cache.filter(m => m.user.bot).size;
        let humanCount = serverSize - botCount;
        let verifLevels = ["Yok", "Düşük hesapta e-posta doğrulanmış olmalıdır", "Orta - Discord'a 5 dakikadan daha uzun süre kayıtlı olmalıdır", "Yüksek - (╯ ° □ °） ╯︵ ┻━┻ - sunucunun üyesi 10 dakikadan uzun olmalıdır", "Çok Yüksek - ┻━┻ ミ ヽ (ಠ 益 ಠ) ﾉ 彡 ┻━┻ - doğrulanmış bir telefon numarasına sahip olmalıdır"];


    
            const yukleniyor = await msg.channel.send(`<a:cark:982408014151712808> **| Sunucu Bilgileri Araştırılıyor!**`);

let sunucu = new Discord.MessageEmbed()
.setTitle('<a:blackheart:987117384898854963> **Tyrie Global Say**')
.setAuthor('', msg.guild.iconURL())
.setThumbnail('https://cdn.discordapp.com/attachments/984158938054406226/987138849568333894/a_0967c0da80182b3738f21e813d5f597c.gif')
.setDescription(`> <a:cevher:987115694028116069> **${client.guilds.cache.size}** **Sunucuya Hizmet Veriyorum.**

> <a:elmas:984165098966884416> **${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()}** **Kullanıcıya Hizmet Veriyorum.**`)
.setTimestamp()
.setColor('WHITE')
        return yukleniyor.edit('', sunucu);
};

module.exports.conf = {
aliases: ['globalsay'],
permLevel: 0,
kategori: 'Komutlar'
};

module.exports.help = {
    name: 'globalsay',
    description: 'Sunucu hakkında detaylı bilgi verir.',
    usage: 'globalsay'
};