const { MessageAttachment, Client, Message, MessageEmbed} = require("discord.js");
const Canvas = require('canvas')
    , Image = Canvas.Image
    , Font = Canvas.Font
    , path = require('path');
module.exports.execute = async(client, message, args) => {
  let kullanici = message.mentions.users.first() || client.users.cache.get(args[0]) || (args.length > 0 ? client.users.cache.filter(e => e.username.toLowerCase().includes(args.join(" ").toLowerCase())).first(): message.author) || message.author;
  let uye = message.guild.member(kullanici);
  let puanoku = databasem.coinOku(uye)

    let embed = new MessageEmbed().setAuthor(ayarlar.embed.başlık, message.guild.iconURL({dynamic: true})).setColor(ayarlar.embed.renk)

    const canvas = Canvas.createCanvas(620, 400);
        const ctx = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://media.discordapp.net/attachments/835942560286769152/836389946315112484/richard_bank.png');
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = '#74037b';
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
        ctx.font = '25px Verdana';
        ctx.fillStyle = '#ffffff';
        ctx.fillText(puanoku || 0, canvas.width / 4.1, canvas.height / 3.7);
        ctx.fillText(`PARA`, canvas.width / 4.1, canvas.height / 1.92);
        ctx.fillText(uye.displayName, canvas.width / 3.6, canvas.height / 1.25);
        ctx.fillText(`ID: ${uye.id}`, canvas.width / 3.6, canvas.height / 1.1);
        ctx.beginPath();
        ctx.arc(125, 125, 100, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.clip();
        const attachment = new MessageAttachment(canvas.toBuffer(), 'coin.jpg');
/*          let x = message.channel.wsend(`Cüzdan Verisi çekiliyor.`);
          message.delete();*/
        message.channel.wsend(`[ **${uye.user.tag}** ] Kullanıcısının hesap bilgileri:\n`,attachment)
            
  
        
      };
module.exports.configuration = {
    name: "coin",
    aliases: ["balance"],
    usage: "avatar [üye]",
    description: "Belirtilen üyenin avatarını gösterir."
};

