const { Client, Message, MessageEmbed} = require("discord.js");
let kullanamayanlar = {}
const richard = require("../database/richardGet");
const richardDatabase = require("../database/richardDatabase");
const coinIsmi = coinsistem.coinIsmi
module.exports.execute = (client, message, args) => {
  if(kullanamayanlar[message.author.id]!=null) return message.channel.wsend("Günlük "+ coinIsmi+"'ini almışsın!") //eğer kullanıcının idsi kullanamayanlar listesinde varsa hata verecek ve komutu işleme sokmayacak.

        const coins = Math.floor(Math.random() * 300) + 1;
        message.channel.send(`**${coins}** Kazandın Yarında Gelip Paranı Alabilrsin!`)
        databasem.coinEkle(message.member, coins)
    kullanamayanlar[message.author.id]=1; //şimdi kullanıcı komutu kullandığı için listeye ekliyoruz ve verisini 1 yapiyoruz.
        
    setTimeout(() => { //burda 5 saniyelik bi bekleme süresi oluşturduk 5 saniye bitince kullanıcıyı listeden silecek.
        kullanamayanlar[message.author.id]=null; //kullanamayanlar listesini siliyoruz.
    }, 1000 * 60 * 60 * 24);


      };
module.exports.configuration = {
    name: "daily",
    aliases: ["günlük"],
    usage: "avatar [üye]",    
    description: "Belirtilen üyenin avatarını gösterir."
};

