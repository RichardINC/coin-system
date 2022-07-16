const {Guild} = require('discord.js');
const emojiler = require("../scaryemojiler.json");
const engelli = require("../scaryengelli.json");
const genel = require("../scarygenel.json");
const guvenli = require("../scaryguvenli.json");
const kanallar = require("../scarykanallar.json");
const roller = require("../scaryroller.json");
const qdb = require('quick.db');
const pdb = new qdb.table("puan");
const ms = require('ms');
    class richardDatabase {

        static coinOku(uye) {
            let puangor = pdb.get(`puancik.${uye.id}.puan`) || 0
            return puangor;
        }

        static coinEkle(uye, miktar) {
            pdb.add(`puancik.${uye.id}.puan`, miktar)
        }

        static envanterEkle(uye, miktar) {
            pdb.add(`puancik.${uye.id}.puan`, miktar)
        }
        static envanterSil(uye, miktar) {
            pdb.add(`puancik.${uye.id}.puan`, miktar)
        }
        static envanterListele(uye) {
            pdb.add(`puancik.${uye.id}.puan`)
        }
      
        static coinTemizle(uye) {
                pdb.set(`puancik.${uye.id}.puan`, 0);
        }

        static mesajSil(uye) {
            qdb.delete(`mesajkontrol.${uye.id}`);
        }
        static mesajKontrol(uye) {
            let kontrol = qdb.get(`mesajkontrol.${uye.id}`);
            return kontrol;
        }
        static mesajEkle(uye) {
            qdb.add(`mesajkontrol.${uye.id}`, 1);
        }
        static coinSil(uye, coin) {
            pdb.subtract(`puancik.${uye.id}.puan`, coin);
        }    }
module.exports = richardDatabase;
