const chalk = require('chalk');
const moment = require('moment');
const ayarlar = require('../ayarlar.json');
const Discord = require('discord.js')
  
    //Botun Durumu
    //online=Çevrimiçi
    //idle=Boşta
    //dnd=Rahatsız Etmeyin
module.exports = client => {
  client.user.setStatus("");
  client.user.setPresence({ activity: { name: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toLocaleString()} Helping The Member!` }, status: "online" })},12000