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
    let urunler = [["ID", "Ürün İsmi", "Ürün Detayı" ,"Ürün Fiyatı"]];
  urunler = urunler.concat(urundata.map(value => { 
         let urunfiyatioku = `${value.urunFiyati} 💵`	
           return [
          `#${value.Id}`,
          `${value.urunAdi}`,
          `${value.urunDetayi}`,
          `${urunfiyatioku}`,
        ]
    }))
    let ürünler = message.channel.wsend(new MessageEmbed()/*.setDescription(`${uye} Üyesinin Mağazası!.\n\n **Mağazamıza hoşgeldiniz!** Aşağıdan paranızın yettiği öğeyi satın alabilirsiniz!\n\n Toplam Paranız: **${puansorgu}**\n\n Paranızın yettikleri,  \`✔️\`  Paranızın Yetmedikleri,  \`✖️\`  ile belirtilmiştir. \n\n\`\`\`css
${shopList.join("\n\n")}\`\`\``).setFooter(`Almak istediğiniz ürünü `+ sistem.prefix +`al ID şeklinde satın alabilirsiniz.`).setColor(ayarlar.embed.renk).setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048}))*/
.setColor(ayarlar.embed.renk).setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true, size: 2048})).setDescription(`\n.`).addField(`🛒 ${coinIsmi} Market listesi aşşağıda listelendiği gibidir;`,`\`\`\`css
${table.table(urunler, {
          border: table.getBorderCharacters(`void`),
          columnDefault: {
            paddingLeft: 0,
            paddingRight: 1,

        },
        columns: {
          0: {
              paddingLeft: 1
          },
          1: {
              paddingLeft: 1,
              alignment: "center"
          },
          2: {
              paddingLeft: 1,
              alignment: "center"
          },
          3: {
              paddingLeft: 1,
              alignment: "center"
          },
          4: {
              paddingLeft: 1,
              alignment: "center"
          },
      },
        drawHorizontalLine: (index, size) => {
          return index === 0 || index === 1 || index === size;
      }
      })}\`\`\``).setFooter(sistem.footer)).then(async msg => {
    let collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);
    collector.on("collect", async(reaction, user) => {
  
      if (reaction.emoji.id == emojiler.market) {let satinal = message.channel.wsend(`${message.guild.emojiGöster(emojiler.market)} Merhaba, satın almak istediğin ürünün \`#ID\` numarasını girermisiniz?`)
          message.channel.awaitMessages(filter, {max: 1, time: 10000}).then(async richard => {
        let ürünid = richard.first().content
        let alıncakürün = coinsistem.Ürünler[coinsistem.Ürünler.indexOf(coinsistem.Ürünler.find(x => x.Id == ürünid))]
        if(alıncakürün) {
        let satınalma = await message.channel.wsend(`${message.guild.emojiGöster(emojiler.market)} **#${alıncakürün.Id}** numaralı \`${alıncakürün.urunAdi}\` isimli ürünü \`${alıncakürün.urunFiyati} 💵\` fiyatına satın almak istiyormusun? (__Evet__/__Hayır__)`)
        message.channel.awaitMessages(filter, { errors: ["time"], max: 1, time: 10000})
        .then(async richardsatinal => {
            if(richardsatinal.first().content.toLowerCase() === "hayır" || richardsatinal.first().content.toLowerCase() === "Hayır" || richardsatinal.first().content.toLowerCase() === "h" || richardsatinal.first().content.toLowerCase() === "H") {
            ürünler.reactions.removeAll();
            message.channel.wsend(`${message.guild.emojiGöster(emojiler.hata)} \`${alıncakürün.urunAdi}\` isimli ürünü satın almaktan vazgeçtin.`).then(x => {x.delete({timeout: 7500})});
            satınalma.delete()
            };
            if(richardsatinal.first().content.toLowerCase() === "evet" || richardsatinal.first().content.toLowerCase() === "Evet" || richardsatinal.first().content.toLowerCase() === "E" || richardsatinal.first().content.toLowerCase() === "e") {
                if(puansorgu >= alıncakürün.urunFiyati) {
                    if(alıncakürün.urunRolMu == '1') {
                        if(uye.roles.cache.has(alıncakürün.urunRolId)) return message.channel.wsend(`${message.guild.emojiGöster(emojiler.market)} \`${alıncakürün.urunAdi}\` isimli ürünü önceden satın almışsın!`).then(x => {
                          ürünler.reactions.removeAll();
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
                        message.channel.wsend(`${message.guild.emojiGöster(emojiler.onay)} **${alıncakürün.urunAdi}** isimli ürün size bir hediye gönderdi, lütfen rollerinizi kontrol edin.`).then(x => x.delete({timeout: 7500}))
                    };
                    richardDatabase.coinSil(uye, alıncakürün.urunFiyati)
                    msg.reactions.removeAll();
                    satınalma.delete();
                    message.channel.wsend(embed.addField(`Başarılı!`,`\`${alıncakürün.urunAdi}\` isimli ürünü başarıyla satın aldın!`).addField(`Ürün Bilgisi`,`\`#satın-alma-log\` isimli kanala bilgi geçildi.\nÜrün teslimi için yöneticisi olan kişilere başvurun.`).addField('Ürün ve hesap bakiyesi', `\`Ürün Fiyatı: ${alıncakürün.urunFiyati} 💵\``, true).addField(`᲼`,`\`Güncel Bakiye: ${puansorgu - alıncakürün.urunFiyati} 💵\``, true)).then(x => x.delete({timeout: 15000}));
                    message.guild.kanalBul("satın-alma-log").wsend(embed2.setDescription(`${uye} isimli üye **${tarihsel(Date.now())}** tarihinde **${alıncakürün.urunAdi}** isimli ürünü \`${alıncakürün.urunFiyati} 💵\` fiyatına satın aldı.`))
                } else {
                    msg.reactions.removeAll();
                    message.channel.wsend(`\`Yeterli ${coinsistem.coinIsmi} bulunamadı.\``).then(x => x.delete({timeout: 7500}));
                }
            }
          })
        } else {
          ürünler = await ürünler.reactions.removeAll();
          satinal.delete();
          ürünler.delete({timeout: 5000});
          return;
        }
        })
}});
        
      }) 
      };
module.exports.configuration = {
    name: "market",
    aliases: ["marketim"],
    usage: "LVBEL ANA SKM",
    description: "LVBEL ANNENİ HRRR"
};

