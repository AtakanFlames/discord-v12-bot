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
.setAuthor('', msg.guild.iconURL())
.setThumbnail('https://cdn.discordapp.com/attachments/959901141427171368/962512855486332948/a_50853891c0ebbd3aafa9ca9de6ded301.gif')
.addField('<a:hype:962510530600386570> Üye Bilgileri:', ` **${humanCount}** Kullanıcı Bulunuyor.`)
.addField('<:blueboost:962511809003278387> Sunucu Boost Bilgi:' ,`**${msg.guild.premiumTier}. **Seviye Avantajlarından Yararlanıyor.`) 
.addField('<a:booster:962511674366103582> Takviye Sayısı: ',` Sunucu'ya **${msg.guild.premiumSubscriptionCount}** Takviye Yapıldı.`)       
.setTimestamp()
.setColor('RANDOM')
        return yukleniyor.edit('', sunucu);
};

module.exports.conf = {
aliases: ['say','say','server'],
permLevel: 0,
kategori: 'Komutlar'
};

module.exports.help = {
    name: 'say',
    description: 'Sunucu hakkında detaylı bilgi verir.',
    usage: 'say'
};