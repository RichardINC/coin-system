const { Message, MessageEmbed } = require("discord.js");
const veriler = new Map();

module.exports = async (message) => {
/*    if(message.webhookID || message.author.bot || message.channel.type === "dm" || !message.guild || message.content.startsWith(sistem.prefix)) return;
/*    if(message.member.roles.cache.has(roller.jail) || message.member.roles.cache.has(roller.cezali) || message.member.roles.cache.has(roller.yasaklitag) || message.member.roles.cache.get(roller.unregister)) return;
    /*if(!message.member.user.username.includes(ayarlar.tag) &&  !message.member.roles.cache.has(roller.family)) return;
   */ databasem.mesajEkle(message.member);
    let kontrol = databasem.mesajKontrol(message.member);
    if(kontrol >= coinsistem.kacmesajdabir) {
    databasem.mesajSil(message.member);
    databasem.coinEkle(message.member, coinsistem.odül.mesaj)
   }
}

module.exports.config = {
    Event: "message"
}