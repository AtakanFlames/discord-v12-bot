const Discord = require('discord.js')

    exports.run = async(client, message, args) => {

        const unban = await message.guild.fetchBans()
        
        for(const cs of unban.array()){
            await message.guild.members.unban(cs.user.id)
        }
    return message.reply("<a:successful:982734530274271262> **|** **Tüm ``Banlar`` Başarıyla Açıldı!**").then(mr => mr.delete({timeout: 7500}))
    } 

exports.conf = {

    aliases: ['Unbanall','UNBANALL','unban all','Unban all']
}

exports.help = {
    name: 'unbanall'
}