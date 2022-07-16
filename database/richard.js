const {Collection} = require('discord.js');
const fs = require('fs')
client.komutlar = new Collection();
client.komut = new Collection();
const moment = require('moment');
require("moment-duration-format");
require("moment-timezone");
const richardEvent = require('./richardEvent');


class richard {
    static komutYükle() {
        fs.readdir("./richard/Moderation", (err, files) => {
            if(err) return console.error(err);
            files = files.filter(file => file.endsWith(".js"));
            console.log('\x1b[36m%s\x1b[0m', `\n[ richard Moderasyon (${files.length}) adet Komut Yüklendi! ]`);
            files.forEach(file => {
            let referans = require(`../Moderation/${file}`);
            if(typeof referans.onLoad === "function") referans.onLoad(global.client);
                client.komutlar.set(referans.Isim, referans);
                    if (referans.Komut) {
                        referans.Komut.forEach(alias => client.komut.set(alias, referans));
                    }
            });
        });
    }
    static sistemGereksinimleri() {
        const sistem = global.sistem = require('../scarygenel.json');
        const emojiler = global.emojiler = require('../scaryemojiler.json');
        const databasem = global.databasem = require('../database/richardDatabase');
        const getim = global.getim = require('../database/richardGet');
        const kanallar = global.kanallar = require('../scarykanallar.json');
        const roller = global.roller = require('../scaryroller.json');
        const ayarlar = global.ayarlar = require('../verysettings/extends.json');
        const coinsistem = global.coinsistem = require('../verysettings/coinsystem');
        let aylartoplam = {
            "01": "Ocak",
            "02": "Şubat",
            "03": "Mart",
            "04": "Nisan",
            "05": "Mayıs",
            "06": "Haziran",
            "07": "Temmuz",
            "08": "Ağustos",
            "09": "Eylül",
            "10": "Ekim",
            "11": "Kasım",
            "12": "Aralık"
          };
          global.aylar = aylartoplam;
          const tarihsel = global.tarihsel = function(tarih) {
          let tarihci = moment(tarih).format("DD") + " " + global.aylar[moment(tarih).format("MM")] + " " + moment(tarih).format("YYYY HH:mm")   
          return tarihci;
          };
          const sayilariCevir = global.sayilariCevir = function(x) {
            return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          };
          const tarihhesapla = global.tarihHesapla = (date) => {
            const startedAt = Date.parse(date);
            var msecs = Math.abs(new Date() - startedAt);
          
            const years = Math.floor(msecs / (1000 * 60 * 60 * 24 * 365));
            msecs -= years * 1000 * 60 * 60 * 24 * 365;
            const months = Math.floor(msecs / (1000 * 60 * 60 * 24 * 30));
            msecs -= months * 1000 * 60 * 60 * 24 * 30;
            const weeks = Math.floor(msecs / (1000 * 60 * 60 * 24 * 7));
            msecs -= weeks * 1000 * 60 * 60 * 24 * 7;
            const days = Math.floor(msecs / (1000 * 60 * 60 * 24));
            msecs -= days * 1000 * 60 * 60 * 24;
            const hours = Math.floor(msecs / (1000 * 60 * 60));
            msecs -= hours * 1000 * 60 * 60;
            const mins = Math.floor((msecs / (1000 * 60)));
            msecs -= mins * 1000 * 60;
            const secs = Math.floor(msecs / 1000);
            msecs -= secs * 1000;
          
            var string = "";
            if (years > 0) string += `${years} yıl`
            else if (months > 0) string += `${months} ay ${weeks > 0 ? weeks+" hafta" : ""}`
            else if (weeks > 0) string += `${weeks} hafta ${days > 0 ? days+" gün" : ""}`
            else if (days > 0) string += `${days} gün ${hours > 0 ? hours+" saat" : ""}`
            else if (hours > 0) string += `${hours} saat ${mins > 0 ? mins+" dakika" : ""}`
            else if (mins > 0) string += `${mins} dakika ${secs > 0 ? secs+" saniye" : ""}`
            else if (secs > 0) string += `${secs} saniye`
            else string += `saniyeler`;
          
            string = string.trim();
            return `\`${string} önce\``;
          };
          
        
    }
  
    static sistemÇalıştır(sistemismi) {
      if(sistemismi === "coin") {
        if(global.coinsistem.sistem) {
          console.log("\x1b[33m%s\x1b[0m", "[ richard Coin System ] Çalıştırıldı!")
          richardEvent.fetchEvent("Coin/messageCoin");
          richardEvent.fetchEvent("Coin/voiceCoin")
          richardEvent.fetchEvent("Coin/memberRemoveCoin")
        }
      }
    }
}

module.exports = richard;