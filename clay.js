const Discord = require('discord.js');
const client = new Discord.Client();
const ayarlar = require('./ayarlar.json');
const chalk = require('chalk');
const moment = require('moment');
var Jimp = require('jimp');
const { Client, Util } = require('discord.js');
const fs = require('fs');
const db = require('quick.db');
const http = require('http');
const express = require('express');
const disbut = require("discord-buttons")(client)
require('./util/eventLoader.js')(client);
const path = require('path');
const snekfetch = require('snekfetch');
const ReactionRole = require("reaction-role");

var prefix = ayarlar.prefix;

const log = message => {
    console.log(`${message}`);
};

client.on('message', msg => {

    if(client.ping > 550) {
    
                let bölgeler = ['singapore', 'eu-central', 'india', 'us-central', 'london',
                'eu-west', 'amsterdam', 'brazil', 'us-west', 'hongkong', 
                'us-south', 'southafrica', 'us-east', 'sydney', 'frankfurt',
                'russia']
               let yenibölge = bölgeler[Math.floor(Math.random() * bölgeler.length)]
               let sChannel = msg.guild.channels.find(c => c.name === "saldırı-koruma")
    
               sChannel.send(`⚠UYARI⚠\n \n🔸 Sunucunun Pingi Yükseldiğinden Dolayı Bölge Değiştirildi!\n🔸 Yeni Bölge: ${yenibölge} `+ client.ping)
               msg.guild.setRegion(yenibölge)
               .then(g => console.log("🌍 Bölge:" + g.region))
               .then(g => msg.channel.send("✅ Bölge **"+ g.region  + " Olarak Değiştirildi! 🏡"))
               .then(msg.reply('✅ Bölge Değiştirildi! ')) 
               .catch(console.error);
    }});

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./komutlar/', (err, files) => {
    if (err) console.error(err);
    log(`${files.length} komut yüklenecek.`);
    files.forEach(f => {
        let props = require(`./komutlar/${f}`);
        log(`Yüklenen komut: ${props.help.name}.`);
        client.commands.set(props.help.name, props);
        props.conf.aliases.forEach(alias => {
            client.aliases.set(alias, props.help.name);
        });
    });
});




client.reload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.load = command => {
    return new Promise((resolve, reject) => {
        try {
            let cmd = require(`./komutlar/${command}`);
            client.commands.set(command, cmd);
            cmd.conf.aliases.forEach(alias => {
                client.aliases.set(alias, cmd.help.name);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};




client.unload = command => {
    return new Promise((resolve, reject) => {
        try {
            delete require.cache[require.resolve(`./komutlar/${command}`)];
            let cmd = require(`./komutlar/${command}`);
            client.commands.delete(command);
            client.aliases.forEach((cmd, alias) => {
                if (cmd === command) client.aliases.delete(alias);
            });
            resolve();
        } catch (e) {
            reject(e);
        }
    });
};

client.elevation = message => {
    if (!message.guild) {
        return;
    }
    let permlvl = 0;
    if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
    if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
    if (message.author.id === ayarlar.sahip) permlvl = 4;
    return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;
// client.on('debug', e => {
//   console.log(chalk.bgBlue.green(e.replace(regToken, 'that was redacted')));
// });

client.on('warn', e => {
    console.log(chalk.bgYellow(e.replace(regToken, 'that was redacted')));
});

client.on('error', e => {
    console.log(chalk.bgRed(e.replace(regToken, 'that was redacted')));
});

client.login(ayarlar.token);
 
//////////////// MOD LOG /////////////////
{ 
  const cdb = require("orio.db")
  
  client.on("roleDelete", async role => {
    let kanal = await cdb.get(`kkk_${role.guild.id}`);
    if (!kanal) return;
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_DELETE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
    
  
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir rol silindi!`)
      .addField(`Silen`, `<@${entry.executor.id}>`)
      .addField(`Silinen Rol`, role.name);
    client.channels.cache.get(kanal).send(embed);
  });
  
  client.on("roleCreate", async role => {
    let kanal = await cdb.get(`kkk_${role.guild.id}`);
    if (!kanal) return;
    const entry = await role.guild
      .fetchAuditLogs({ type: "ROLE_CREATE" })
      .then(audit => audit.entries.first());
    if (entry.executor.id == client.user.id) return;
   
    const embed = new Discord.MessageEmbed()
      .setTitle(`Bir rol açıldı!`)
      .addField(`Açan`, `<@${entry.executor.id}>`)
      .addField(`Açılan Rol`, role.name);
    client.channels.cache.get(kanal).send(embed);
  });         
  } 
  ///////////////// MOD LOG BİTİŞ /////////////////

    //////// OTO ROL /////
    client.on("guildMemberAdd", async member => {
        const cdb = require("orio.db")
        
        let data = await cdb.get(`otorol_${member.guild.id}`)   
        let mesaj =  cdb.get(`otorolmesaj_${member.guild.id}`)  
        if(!data) return
        
        if(!mesaj) {
            let otorolgiriş = new Discord.MessageEmbed()
            .setTitle("<a:staff:982734428235235348> **Tyrie Otorol** <a:staff:982734428235235348>\n")

            .setDescription("> <a:sabittik:987580906996920341> **Otomatik Rol Verildi **\n" + 
            `> <a:raptiye:982683600757620826> *Seninle Beraber* **${member.guild.memberCount}**` + " *Kişiyiz!*\n" +
            `> <a:blackheart:987117384898854963> <@${member.user.id}> **Hoşgeldin!**`)
            .setImage('https://cdn.discordapp.com/attachments/982690953041150044/987580084586156072/standard_3.gif')
            .setColor("GREEN")
            .setTimestamp()
            client.channels.cache.get(data.kanal).send(otorolgiriş)
            member.roles.add(data.rol)  
        
        return;
        } 
        
        if(mesaj) {
        
          var mesajs = mesaj
        .replace("-uye-", `${member.user.tag}`)
        .replace("-rol-", `${member.guild.roles.cache.get(data.rol).name}`)
        .replace("-server-", `${member.guild.name}`)
        .replace("-uyesayisi-", `${member.guild.memberCount}`)
        .replace("-botsayisi-", `${member.guild.members.cache.filter(m => m.user.bot).size}`)

          member.roles.add(data.rol)
          client.channels.cache.get(data.kanal).send(mesajs)
        
        }  
          
        }); 
    
        ///// oto rol bitiş //////

        //// sayaç ///
        client.on("guildMemberAdd", member => {
            const profil = JSON.parse(fs.readFileSync("./database/sayaç.json", "utf8"));
            if (!profil[member.guild.id]) return;
            if (profil[member.guild.id]) {
              let sayaçkanalID = profil[member.guild.id].kanal;
              let sayaçsayı = profil[member.guild.id].sayi;
              let sayaçkanal = client.channels.cache.get(sayaçkanalID);
              let aralık = parseInt(sayaçsayı) - parseInt(member.guild.memberCount);
              let sayaçgiriş = new Discord.MessageEmbed()
              .setTitle("<a:staff:982734428235235348> **Tyrie Sayaç** <a:staff:982734428235235348>\n")

              .setDescription(
                "> <a:oksag:987553416022745168>" +  
                ` <@${member.user.id}>` + 
                "  *Sunucuya Katıldı!* \n" + 
                "> <a:blackheart:987117384898854963> " + `**${sayaçsayı}**` + " *Kişi Olmamıza*" + ` **${aralık}**` + " *Kişi Kaldı!*\n" +
                "> <a:raptiye:982683600757620826>" + ` **${member.guild.memberCount}** ` + "*Kişiyiz!*")
              .setImage('https://c.tenor.com/vAdNbp-gxFUAAAAd/welcome-discord.gif')
              .setColor("PINK")
              .setTimestamp()
            sayaçkanal.send(sayaçgiriş)
            } 
          });
          

          client.on("guildMemberRemove", member => {
            const profil = JSON.parse(fs.readFileSync("./database/sayaç.json", "utf8"));
            if (!profil[member.guild.id]) return;
            if (profil[member.guild.id]) {
              let sayaçkanalID = profil[member.guild.id].kanal;
              let sayaçsayı = profil[member.guild.id].sayi;
              let sayaçkanal = client.channels.cache.get(sayaçkanalID);
              let aralık = parseInt(sayaçsayı) - parseInt(member.guild.memberCount);
              let sayaççıkış = new Discord.MessageEmbed()
              .setTitle("<a:staff:982734428235235348> **Tyrie Sayaç** <a:staff:982734428235235348>\n")
              
              .setDescription(
                "> <a:oksol:987553708466397264>" +  
                ` <@${member.user.id}>` + 
                "  *Sunucudan Ayrıldı!!* \n" + 
                "> <:brokenheart:987562803000901713> " + `**${sayaçsayı}**` + " *Kişi Olmamıza*" + ` **${aralık}**` + " *Kişi Kaldı!*\n" +
                "> <a:raptiye:982683600757620826>" + ` **${member.guild.memberCount}** ` + "*Kişiyiz!*")
              .setImage('https://cdn.discordapp.com/attachments/982690953041150044/987562556828819486/standard_3.gif')
              .setColor("RED")
              .setTimestamp()
            sayaçkanal.send(sayaççıkış)
            } 
          });
          // sayaç bitiş //