const { Client, Message, MessageEmbed} = require("discord.js");
const richard = require("../database/richardGet");
const richardDatabase = require("../database/richardDatabase");
const table = require("table");
const coinIsmi = coinsistem.coinIsmi
module.exports.execute = (client, message, args) => {
    if(!coinsistem.sistem) return; 
    let embed2 = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)
    let kullanici = message.author;
    let uye = message.guild.member(kullanici);
      
/*    if(!uye.roles.cache.has(roller.Teyit.tagRolü) && !uye.hasPermission('ADMINISTRATOR') && !uye.user.username.includes(ayarlar.tag) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: İsminiz de \`${ayarlar.tag}\` sembolü bulunmadığından coin işlemi yapamazsınız!`).then(x => x.delete({timeout: 5000}));
  */  let puansorgu = richardDatabase.coinOku(uye)
    let urundata = coinsistem.Ürünler
    var filter = msj => msj.author.id === message.author.id && msj.author.id !== client.user.id;
        const ürünid = args[0]
        if(!ürünid) return message.channel.wsend("Marketten ürün almak için geçerli bir `Ürün ID` girmelisin")
        
        let alıncakürün = coinsistem.Ürünler[coinsistem.Ürünler.indexOf(coinsistem.Ürünler.find(x => x.Id == ürünid))]
        if(alıncakürün) {
        let satınalma = message.channel.wsend(`${message.guild.emojiGöster(emojiler.market)} **#${alıncakürün.Id}** numaralı \`${alıncakürün.urunAdi}\` isimli ürünü \`${alıncakürün.urunFiyati} 💵\` fiyatına satın almak istiyormusun? (__Evet__/__Hayır__)`)
        message.channel.awaitMessages(filter, { errors: ["time"], max: 1, time: 10000})
        .then(async richardsatinal => {
            if(richardsatinal.first().content.toLowerCase() === "hayır" || richardsatinal.first().content.toLowerCase() === "Hayır" || richardsatinal.first().content.toLowerCase() === "h" || richardsatinal.first().content.toLowerCase() === "H") {
            message.channel.wsend(`${message.guild.emojiGöster(emojiler.hata)} \`${alıncakürün.urunAdi}\` isimli ürünü satın almaktan vazgeçtin.`).then(x => {x.delete({timeout: 7500})});
            satınalma.delete()
            };
            if(richardsatinal.first().content.toLowerCase() === "evet" || richardsatinal.first().content.toLowerCase() === "Evet" || richardsatinal.first().content.toLowerCase() === "E" || richardsatinal.first().content.toLowerCase() === "e") {
                if(puansorgu >= alıncakürün.urunFiyati) {
                    if(alıncakürün.urunRolMu == '1') {
                        if(uye.roles.cache.has(alıncakürün.urunRolId)) return message.channel.wsend(`${message.guild.emojiGöster(emojiler.market)} \`${alıncakürün.urunAdi}\` isimli ürünü önceden satın almışsın!`).then(x => {
                          x.delete({timeout: 7500})
                          satınalma.delete()
                        });
/*                        if(alıncakürün.urunYetkimi == '1') {
                        if(!roller.kurucuRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.altYönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !roller.Yetkiler.some(oku => message.member.roles.cache.has(oku)) && !roller.yönetimRolleri.some(oku => message.member.roles.cache.has(oku)) && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.wsend(`Hata: \`${alıncakürün.urunAdi}\` isimli ürünü sadece yetkililer satın alabilir!`).then(x => {
                          ürünler.reactions.removeAll();
                          x.delete({timeout: 7500}) 
                          satınalma.delete()
                        });
                        } else {
                            uye.roles.add(alıncakürün.urunRolId)
                        }*/
                            uye.roles.add(alıncakürün.urunRolId)
                       message.channel.wsend(`${uye}, **${alıncakürün.urunAdi}** isimli ürünü başarıyla satın aldın, rollerini kontrol edebilirsin!`);
                    } else {  message.channel.wsend(`${uye}, **${alıncakürün.urunAdi}** isimli ürünü başarıyla satın aldın, senin için yetkililere kayıt düştüm en kısa sürede dönüş yapılacaktır!`);

                    richardDatabase.coinSil(uye, alıncakürün.urunFiyati)
                    satınalma.delete();
                    message.guild.kanalBul("satın-alma-log").wsend(embed2.setDescription(`${uye} isimli üye **${tarihsel(Date.now())}** tarihinde **${alıncakürün.urunAdi}** isimli ürünü \`${alıncakürün.urunFiyati} 💵\` fiyatına satın aldı.`))
                } } else {
                    message.channel.wsend(`\`Yeterli ${coinsistem.coinIsmi} bulunamadı.\``).then(x => x.delete({timeout: 7500}));
                }
            }
          })
        }
        
      };
module.exports.configuration = {
    name: "al",
    aliases: ["buy"],
    usage: "avatar [üye]",
    description: "Belirtilen üyenin avatarını gösterir."
};

