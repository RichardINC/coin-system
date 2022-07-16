const { Client, Message, MessageEmbed} = require("discord.js");
const richard = require("../database/richardGet");
const richardDatabase = require("../database/richardDatabase");
const coinIsmi = coinsistem.coinIsmi
module.exports.execute = (client, message, args) => {
  if(message.author.id !== sistem.owner) return 

        let kullanici = message.mentions.users.first() || client.users.cache.get(args[1]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
                const coins = args[2];
        if(args[0] !== "ekle" && args[0] !== "sil") return message.channel.wsend(`Komutu doğru kullanmalısın. \`${sistem.prefix}para ekle/sil <@Richârd/ID> <Miktar>\``).then(x => x.delete({timeout: 5000}));
        let uye = message.guild.member(kullanici);
        if(!uye && !coins) return message.channel.wsend('Komutu doğru kullanmalısın. \`'+ sistem.prefix +'para ekle/sil <@Richârd/ID> <Miktar>\`').then(x => x.delete({timeout: 5000}));    
    if(args[0] === "ekle") {
        if(!uye && !coins) return message.channel.wsend('Komutu doğru kullanmalısın. \`'+ sistem.prefix +'para ekle/sil <@Richârd/ID> <Miktar>\`').then(x => x.delete({timeout: 5000}));    
              message.channel.wsend(`${message.member}, ${uye} kişisine **${coins} ${coinIsmi}** başarıyla eklendi!`)
              databasem.coinEkle(uye, coins)
              message.react(emojiler.onay)
    };

  if(args[0] === "sil") {
        if(!uye && !coins) return message.channel.wsend('Komutu doğru kullanmalısın. \`'+ sistem.prefix +'para ekle/sil <@Richârd/ID> <Miktar>\`').then(x => x.delete({timeout: 5000}));    
              message.channel.wsend(`${message.member}, ${uye} kişisinden **${coins} ${coinIsmi}** başarıyla eksiltildi!`)
              databasem.coinSil(uye, coins)
              message.react(emojiler.onay)
    };

      };
module.exports.configuration = {
    name: "para",
    aliases: ["para"],
    usage: "avatar [üye]",    
    description: "Belirtilen üyenin avatarını gösterir."
};

