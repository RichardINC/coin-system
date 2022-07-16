const { Discord, MessageEmbed, Client, WebhookClient } = require('discord.js');
const client = new Client();
const db = require("quick.db");
const fs = require("fs");
const moment = require("moment");
require("moment-duration-format");
const emojiler = require("./scaryemojiler.json");
const engelli = require("./scaryengelli.json");
const genel = require("./scarygenel.json");
const guvenli = require("./scaryguvenli.json");
const kanallar = require("./scarykanallar.json");
const roller = require("./scaryroller.json");

const commands = new Map();
global.commands = commands;
const aliases = new Map();
const guildInvites = new Map();
global.aliases = aliases;
global.client = client;

const richard = require('./database/richard');
const richardDatabase = require('./database/richardDatabase');
const richardReply = require('./database/richardReply');

// System Required
richard.sistemGereksinimleri();
richardReply.replyFetch();

// richard(Util's)
require("./database/richardUtils");

// richard(Sistemler)
richard.sistemÇalıştır("coin");


fs.readdir("./verycommand", (err, files) => {

    if(err) return console.error(err);

    files = files.filter(file => file.endsWith(".js"));

    console.log(`${files.length} komut yüklenecek.`);

    files.forEach(file => {

        let prop = require(`./verycommand/${file}`);

        if(!prop.configuration) return;

        console.log(`${prop.configuration.name} komutu yükleniyor!`);

        if(typeof prop.onLoad === "function") prop.onLoad(client);

        commands.set(prop.configuration.name, prop);

        if(prop.configuration.aliases) prop.configuration.aliases.forEach(aliase => aliases.set(aliase, prop));

    });

});

fs.readdir("./veryevent", (err, files) => {

    if(err) return console.error(err);

    files.filter(file => file.endsWith(".js")).forEach(file => {

        let prop = require(`./veryevent/${file}`);

        if(!prop.configuration) return;

        client.on(prop.configuration.name, prop);

    });

});

  client.on("message", (message) => {

        if (message.author.bot ||!message.content.startsWith(genel.prefix) || !message.channel || message.channel.type == "dm") return;

        let args = message.content

          .substring(genel.prefix.length)

          .split(" ");

        let command = args[0];

        let bot = message.client;

        args = args.splice(1);

        let calistirici;

        if (commands.has(command)) {

          calistirici = commands.get(command);

          calistirici.execute(bot, message, args);

        } else if (aliases.has(command)) {

          calistirici = aliases.get(command);

          calistirici.execute(bot, message, args);

        }

  });
client.splitEmbedWithDesc = async function(description, author = false, footer = false, features = false) {
  let embedSize = parseInt(`${description.length/2048}`.split('.')[0])+1
  let embeds = new Array()
  for (var i = 0; i < embedSize; i++) {
    let desc = description.split("").splice(i*2048, (i+1)*2048)
    let x = new MessageEmbed().setDescription(desc.join(""))
    if (i == 0 && author) x.setAuthor(author.name, author.icon ? author.icon : null)
    if (i == embedSize-1 && footer) x.setFooter(footer.name, footer.icon ? footer.icon : null)
    if (i == embedSize-1 && features && features["setTimestamp"]) x.setTimestamp(features["setTimestamp"])
    if (features) {
      let keys = Object.keys(features)
      keys.forEach(key => {
        if (key == "setTimestamp") return
        let value = features[key]
        if (i !== 0 && key == 'setColor') x[key](value[0])
        else if (i == 0) {
          if(value.length == 2) x[key](value[0], value[1])
          else x[key](value[0])
        }
      })
    }
    embeds.push(x)
  }
  return embeds
};



/*
Mesaja emoji koyma qwe ${client.emojis.cache.get(emojiler.isim)}
*/

/*////////////// VOICE LOG
client.on('voiceStateUpdate', async (oldState, newState) => {  
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setColor('RANDOM');  
  
  if (!oldState.channelID && newState.channelID) return newState.guild.channels.cache.get(kanallar.voicelog).send(scaryemb.setDescription(`<@${newState.guild.members.cache.get(newState.id).id}> üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanala girdi!`));
  if (oldState.channelID && !newState.channelID) return newState.guild.channels.cache.get(kanallar.voicelog).send(scaryemb.setDescription(`<@${newState.guild.members.cache.get(newState.id).id}> üyesi \`${newState.guild.channels.cache.get(oldState.channelID).name}\` adlı sesli kanaldan ayrıldı!`));
  if (oldState.channelID && newState.channelID && oldState.channelID != newState.channelID) return newState.guild.channels.cache.get(kanallar.voicelog).send(scaryemb.setDescription(`<@${newState.guild.members.cache.get(newState.id).id}> üyesi ses kanalını değiştirdi! (\`${newState.guild.channels.cache.get(oldState.channelID).name}\` => \`${newState.guild.channels.cache.get(newState.channelID).name}\`)`));
  if (oldState.channelID && oldState.selfMute && !newState.selfMute) return newState.guild.channels.cache.get(kanallar.voicelog).send(scaryemb.setDescription(`<@${newState.guild.members.cache.get(newState.id).id}> üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi susturmasını kaldırdı!`));
  if (oldState.channelID && !oldState.selfMute && newState.selfMute) return newState.guild.channels.cache.get(kanallar.voicelog).send(scaryemb.setDescription(`<@${newState.guild.members.cache.get(newState.id).id}> üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini susturdu!`));
  if (oldState.channelID && oldState.selfDeaf && !newState.selfDeaf) return newState.guild.channels.cache.get(kanallar.voicelog).send(scaryemb.setDescription(`<@${newState.guild.members.cache.get(newState.id).id}> üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendi sağırlaştırmasını kaldırdı!`));
  if (oldState.channelID && !oldState.selfDeaf && newState.selfDeaf) return newState.guild.channels.cache.get(kanallar.voicelog).send(scaryemb.setDescription(`<@${newState.guild.members.cache.get(newState.id).id}> üyesi \`${newState.guild.channels.cache.get(newState.channelID).name}\` adlı sesli kanalda kendini sağırlaştırdı!`));
});
////////////// VOICE LOG
*/
client.on('voiceStateUpdate', async (oldState, newState) => {  
            if(newState.member.bot) return   
    if(newState.member.hasPermission('ADMINISTRATOR')) return
                                             
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setColor('RANDOM');
    let richuyarilari = await db.fetch(`streameruyarildinbremin_${newState.member.id}`);
  if(richuyarilari >= 1) {
db.delete(`streameruyarildinbremin_${newState.member.id}`)

newState.member.roles.add(roller.streamercezalırolü)

client.channels.cache.get(kanallar.streamercezalılog).send(scaryemb.setDescription(`${newState.member} üyesi **18 yaşından** küçük olmasına rağmen +18 kanallara giriş yaptığından dolayı sesten atıldı!
Giriş yaptığı kanal: <#${kanallar.streamer18kanal1}>`))
                       }
    if(!newState.member.displayName && !newState.member.displayName.includes('|') && !isNaN(newState.member.displayName.split('| ')[1] || "")) return 
  if(!newState.member.voice || newState.member.voice.channelID != kanallar.streamer18kanal1) return
  if(Number(newState.member.displayName.split('|')[1]) < 18) { 
  newState.member.voice.setChannel(null)
  db.add(`streameruyarildinbremin_${newState.member.id}`, 1)
}
  });

/*
////////////// ÇIK GİR ESKİ İSİM VE ROLLER
const Discord  = require('discord.js'); 
const verydb = require("quick.db"); 
//////////////
client.on("guildMemberRemove", async member => {
    verydb.set(`cikanroller.${member.id}`, member.roles.cache.map(x => x.id))
  });
//////////////
client.on("guildMemberAdd", async member => {
let scarygirdi = await verydb.get(`cikanroller.${user.id}`);
await user.roles.set(scarygirdi).catch(e => { });
await verydb.delete(`cikanroller.${user.id}`);
});
////////////// ÇIK GİR ESKİ İSİM VE ROLLER
*/
///////////////////////////
Date.prototype.toTurkishFormatDate = function (format) {
  let date = this,
    day = date.getDate(),
    weekDay = date.getDay(),
    month = date.getMonth(),
    year = date.getFullYear(),
    hours = date.getHours(),
    minutes = date.getMinutes(),
    seconds = date.getSeconds();

  let monthNames = new Array("Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık");
  let dayNames = new Array("Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi");

  if (!format) {
    format = "dd MM yyyy | hh:mm";
  };
  format = format.replace("mm", month.toString().padStart(2, "0"));
  format = format.replace("MM", monthNames[month]);
  
  if (format.indexOf("yyyy") > -1) {
    format = format.replace("yyyy", year.toString());
  } else if (format.indexOf("yy") > -1) {
    format = format.replace("yy", year.toString().substr(2, 2));
  };
  
  format = format.replace("dd", day.toString().padStart(2, "0"));
  format = format.replace("DD", dayNames[weekDay]);
  return format;
};
client.toDate = (date) => {
    var tarih = "";
    tarih = new Date(date).toLocaleString("tr-TR", { timeZone: "Europe/Istanbul" });
    return tarih;
  };
////////////// YASAKLI TAG
client.on("guildMemberAdd", member => {

if(member.user.username.includes(engelli.yasaklitag)) {
member.roles.set(roller.yasaklitag)
member.roles.remove(roller.kayitsiz)
}
});/*
////////////////
client.on("userUpdate", function(oldUser, newUser) {
    if (oldUser.username === newUser.username) return;
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setColor('RANDOM');  
    let tag = engelli.yasaklitag
    let member = client.guilds.cache.get(genel.server).members.cache.get(oldUser.id);
    let rolleri = client.guilds.cache.get(genel.server).members.cache.get(oldUser.id).roles.cache.filter(r => r.id !== "@everyone" && r.id !== roller.booster).map(r => r.id)
    let eskikullanici = oldUser.username;
    let yenikullanici = newUser.username;
    let dm = oldUser;
  
    if (eskikullanici.includes(tag)) {
      if (!yenikullanici.includes(tag)) {
        member.roles.remove(rolleri);
        member.roles.add(roller.kayitsiz);
      }
    }
  
    if (!eskikullanici.includes(tag)) {
      if (yenikullanici.includes(tag)) {
        member.roles.add(roller.yasaklitag);
      }
    }
  });
////////////// YASAKLI TAG [roller.booster, roller.yasaklitag]
//////////////// CHAT GUARD
client.on('message', async(message) => {
    if(!message.guild) return
    if(message.author.bot) return;
    if(message.member.roles.cache.has(roller.developer)) return; 
    let scaryemb = new MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    let yasak = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".gg/", "dc.gg", "gg/", "invite/", "/invite", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
    if(yasak.some(a => message.content.includes(a))) {
      await message.delete()
      if(db.get(`reklam_${message.author.id}`) > 3){
        await message.member.ban({reason:'Reklam Engel 5/5'}).catch(err => {return;})
        await message.channel.send(scaryemb.setDescription(`**${message.member} Adlı Kullanıcı 5 Defa Reklam Yaptığından Sunucudan Yasaklandı!**`)
          ).then(a => a.delete({timeout:5000}))
        await message.guild.channels.cache.get(kanallar.reklamlog).send(scaryemb.setDescription(`**${message.member} (${message.author.id}) Adlı Kullanıcı 5 Kere Reklam Yaptığından Sunucudan Yasaklandı!**`)).then(a => a.delete({timeout:5000}))
        db.delete(`reklam_${message.author.id}`)
      } else {
        await db.add(`reklam_${message.author.id}`, 1)
        await message.channel.send(scaryemb.setDescription(`${message.author} bağlantı paylaşamazsın!`)).then(a => a.delete({timeout:5000}))
      }    
    }
  })
  ////////////////
  client.on("messageUpdate", async (oldmessage, newmessage) => {
    if(!newmessage.guild) return
    if(newmessage.author.bot) return;
    if(newmessage.member.roles.cache.has(roller.developer)) return;
    let scaryemb = new MessageEmbed().setAuthor(newmessage.member.displayName, newmessage.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    let yasak = ["discord.app", "discord.gg","discordapp","discordgg", ".com", ".gg/", "dc.gg", "gg/", "invite/", "/invite", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az", ".cf", ".me", ".in"]
    if(yasak.some(a => newmessage.content.includes(a))){
      await newmessage.delete()
      if(db.get(`reklam_${newmessage.author.id}`) > 3){
        await newmessage.member.ban({reason:'Reklam Engel 5/5'})
        await newmessage.channel.send(scaryemb.setDescription(`**${newmessage.member} Adlı Kullanıcı 5 Defa Reklam Yaptığından Sunucudan Yasaklandı!**`)
        ).then(a => a.delete({timeout:5000}))
        await newmessage.guild.channels.cache.get(kanallar.reklamlog).send(scaryemb.setDescription(`**${newmessage.member} (${newmessage.author.id}) Adlı Kullanıcı 5 Kere Reklam Yaptığından Sunucudan Yasaklandı!**`)
        ).then(a => a.delete({timeout:5000}))
        db.delete(`reklam_${newmessage.author.id}`)
      } else {
        await db.add(`reklam_${newmessage.author.id}`, 1)
        await newmessage.channel.send(scaryemb.setDescription(`${newmessage.author} bağlantı paylaşamazsın!`)
        ).then(a => a.delete({timeout:5000}))
      }    
    }
  });
  ////////////////
  client.on('message', message => {
    if(!message.guild) return;
    if(!message.member.roles.cache.has(roller.developer)) return;
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setAuthor(message.member.displayName, message.author.avatarURL({ dynamic: true })).setColor('RANDOM');  
    let prefix = genel.prefix
    var command = message.content.toLowerCase().slice(prefix.length).split(' ')[0];
    var args = message.content.split(' ').slice(1);
    if(command === 'reklam-sil'){
      if(!message.member.roles.cache.has(roller.developer)) return;
      let user = message.mentions.members.first() || message.guild.members.cache.get(args[0])
      if(!user) return message.channel.send('Bir Kullanıcı Belirtmelisin!')
      if(!db.get(`reklam_${user.id}`)) return message.channel.send(scaryemb.setDescription('**Belirtilen Kullanıcı Daha Önce Reklam Yapmamış!**'))
      db.delete(`reklam_${user.id}`)
      message.channel.send(scaryemb.setDescription(`**${user} Adlı Kullanıcının Reklam Sayısı Sıfırlandı!**`))
    }
  })
  //////////////// CHAT GUARD
*/
  /////////////// ACILIS
client.on("ready", async () => {
  client.user.setPresence({ activity: { name: genel.activity }, status: "online" });
  console.log("AGA KALK AGA BEN GELDIM")
  client.guilds.cache.forEach(guild => {
    guild.fetchInvites().then(invites => guildInvites.set(guild.id, invites)).catch(err => console.log(err));
  });
  });
  /////////////// ACILIS

  ////////////// CHATE BOOSTER HARICI FOTO ENGEL
  client.on('message', (message) => {
    if(message.attachments.size >= 1){
     if(message.channel.id == kanallar.chat){
      if(message.member.premiumSinceTimestamp == 0){
        if(guvenli.guvenli[message.author.id]) return;
         message.delete();	  
      }
     }
    }
  })
  ////////////// CHATE BOOSTER HARICI FOTO ENGEL  

  ///////////// GIRIS VE CIKIS
client.on("inviteCreate", async invite => guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()));
//////////
client.on("inviteDelete", invite => setTimeout(async () => { guildInvites.set(invite.guild.id, await invite.guild.fetchInvites()); }, 5000));
//////////

client.on("guildMemberAdd", async (member) => {    
  if (member.user.bot) return;
  let cachedInvites = guildInvites.get(member.guild.id);
  let newInvites = await member.guild.fetchInvites();  
  let usedInvite = newInvites.find(inv => cachedInvites.get(inv.code).uses < inv.uses) || cachedInvites.find(inv => !newInvites.has(inv.code)) || {code: member.guild.vanityURLCode, uses: null, inviter: {id: null}};
  let daveteden = client.users.cache.get(usedInvite.inviter.id) || {id: member.guild.id};
      db.add(`davetettim_${usedInvite.inviter.id}_${member.guild.id}`, +1);
      db.set(`bunudavet_${member.id}`, usedInvite.inviter.id);
      let davetsayi;
        davetsayi = await db.fetch(`davetettim_${usedInvite.inviter.id}_${member.guild.id}`);
    
    let davetsayi2 = await db.fetch(`davetettim_${usedInvite.inviter.id}_${member.guild.id}`);
    var toplamüye = member.guild.memberCount;
    let scaryemb = new MessageEmbed().setFooter(genel.footer).setColor('RANDOM');  
    let memberDay = (Date.now() - member.user.createdTimestamp);
    let createAt = moment.duration(memberDay).format("Y [Yıl], M [Ay], W [Hafta], DD [Gün]").replace(" 0 Hafta,","").replace("0 Yıl,","").replace(" 0 Ay,","").replace(" 0 Gün,","");
    let createAt2 = moment.duration(memberDay).format("DD [Gün], HH [saat], mm [dakika]").replace(" 0 Gün,","").replace("0 Saat,","").replace(" 0 Dakika,","");
  let isMemberFake = (Date.now()-member.user.createdTimestamp) < 1000 * 60 * 60 * 24 * 7;
  const webhookClient = new WebhookClient('828233452285460531', 'F3O6HK-7TLfyksc2I6o38OV0aTsw0mYgWc02DgJYzUqyIWdQr-YSdmuX06uvzsSVQOCk');
  if (isMemberFake) {   
 webhookClient.send(`🎉 ${genel.servername}'a hoşgeldin ${member}! Hesabın \`${createAt2} önce\` açılmış [${client.emojis.cache.get(emojiler.hata)}] <@&${roller.register}>

Sunucu kurallarımız \`#kurallar\` kanalında belirtilmiştir. Cezaların kuralları okuduğun varsayılarak işlenecektir.

Seninle birlikte **${toplamüye}** üyeye ulaştık, **Yazılı veya etiket tagımızı** alarak kayıt olabilisin.

**${daveteden}** \`${davetsayi}\` davet sayısına ulaştı. 🎉`) 
    member.roles.add(roller.cezali)
   } else { 
 webhookClient.send(`🎉 ${genel.servername}'a hoşgeldin ${member}! Hesabın \`${createAt} önce\` açılmış [${client.emojis.cache.get(emojiler.onay)}]

Sunucu kurallarımız \`#kurallar\` kanalında belirtilmiştir. Cezaların kuralları okuduğun varsayılarak işlenecektir.
<@&${roller.register}>
Seninle birlikte **${toplamüye}** üyeye ulaştık, sol tarafta bulunan **Ses teyit odalarına** girerek kayıt olabilisin.

**${daveteden}** \`${davetsayi2}\` davet sayısına ulaştı. 🎉`)
      member.roles.add(roller.unregister)}
});
  client.on("guildMemberRemove", async member => {
    let davetçi = await db.fetch(`bunudavet_${member.id}`);
    const daveteden = member.guild.members.cache.get(davetçi);
          db.add(`davetettim_${davetçi}_${member.guild.id}`, -1);
  });

  ///////////// GIRIS VE CIKIS
////////////////////////

client.on("userUpdate", async function(oldUser, newUser) {
    const guildID = genel.server
    const roleID = roller.family
    const tag = genel.hashtag
    const log2 = kanallar.taglog
  
    const guild = client.guilds.cache.get(guildID)
    const role = guild.roles.cache.find(roleInfo => roleInfo.id === roleID)
    const member = guild.members.cache.get(newUser.id)
    const embed = new MessageEmbed().setColor("RANDOM").setTimestamp().setFooter(genel.footer);
   if (newUser.discriminator !== oldUser.discriminator) {
        if (oldUser.discriminator == genel.hashtag && newUser.discriminator !== genel.hashtag) {
            member.roles.remove(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser} etiketinden \`1457\` çıkartarak ailemizden ayrıldı!`))
        } else if (oldUser.discriminator !== genel.hashtag && newUser.discriminator == genel.hashtag) {
            member.roles.add(roleID)
            client.channels.cache.get(log2).send(embed.setDescription(`  ${newUser}  etiketine \`1457\` alarak ailemize katıldı`))
            client.channels.cache.get(chat).send(`Tebrikler, ${newUser} tag alarak ailemize katıldı ona sıcak bir **'Merhaba!'** diyin.(#1457)`)
        }
    }
 
  })


///////////////////







/*
async function yasaklitag() {
    let guild = client.guilds.cache.get(genel.server);
    let data = await db.get(`yasaklitaglar.${guild.id}`) || []

guild.members.cache.filter(s => data.some(x => s.user.username.includes(x)) && !s.roles.cache.has(roller.booster)).forEach(m => m.roles.set([roller.booster, roller.yasaklitag]))
}
setInterval(async() => {
    yasaklitag()
}, 10000)// 10 saniyede bir tarar değiştirebilirsiniz.
*/

  ///////////// CHAT GECERLI ILTIFAT

  const scaryiltifat = [
     'Gözlerindeki saklı cenneti benden başkası fark etsin istemiyorum.',
     'Mavi gözlerin, gökyüzü oldu dünyamın.',
     'Parlayan gözlerin ile karanlık gecelerime ay gibi doğuyorsun.',
     'Huzur kokuyor geçtiğin her yer.',
     'Öyle bir duru güzelliğin var ki, seni gören şairler bile adına günlerce şiir yazardı.',
     'Gözlerinin hareketi bile yeter  benim aklımı başımdan almaya.',
     'Güller bile kıskanır seni gördükleri zaman kendi güzelliklerini.',
     'Hiç yazılmamış bir şiirsin sen, daha önce eşi benzeri olmayan.',
     'Adım şaire çıktı civarda. Kimse senin şiir olduğunun farkında değil henüz.',
     'Etkili gülüş kavramını ben senden öğrendim.',
     'Seni anlatmaya kelimeler bulamıyorum. Nasıl anlatacağımı bilemediğim için seni kimselere anlatamıyorum.',
     'Gözlerinle baharı getirdin garip gönlüme.',
     'Bir gülüşün ile çiçek açıyor bahçemdeki her bir çiçek.',
     'Yuva kokuyor kucağın. Sarılınca seninle yuva kurası geliyor insanın.',
     'Sen bu  dünyadaki bütün şarkıların tek sahibisin. Sana yazılıyor bütün şarkılar ve şiirler. Adın geçiyor bütün namelerde.',
     'Seni yüreğimde taşıyorum ben, sırtımda taşımak ne kelime. Ömrüm boyunca çekmeye hazırım her anlamda senin yükünü.',
     'Hayatıma gelerek hayatımdaki bütün önemli şeylerin önemsiz olmasını sağladın. Artık sensin tek önem verdiğim şu hayatta.',
     'Sen benim bu hayattaki en büyük duamsın.  Gözlerin adeta bir ay parçası. Işık oluyorsun karanlık gecelerime.',
     'Aynı zaman diliminde yaşamak benim için büyük ödüldür.',
     'Kalbime giden yolu aydınlatıyor gözlerin.  Sadece sen görebilirsin kalbimi. Ve sadece ben hissedebilirim bana karşı olan hislerini.',
     'Onu Bunu Boşver de bize gel 2 bira içelim.',
     'Richard seni çok sevdi...',
     'Mucizelerden bahsediyordum.',
  ];
/////////////
  client.on("message", async message => {
    if(message.channel.id !== kanallar.chat) return;
    let scaryiltlimit = db.get('scaryiltifatlar');
    await db.add("scaryiltifatlar", 1);
    if(scaryiltlimit >= 100) {  
      db.delete("scaryiltifatlar");
      const random = Math.floor(Math.random() * ((scaryiltifat).length - 1) + 1);
      message.reply(`${(scaryiltifat)[random]}`);
    };
  });
  ///////////// CHAT GECERLI ILTIFAT

  ///////////// SNIPE
  client.on("messageDelete", async(message) => {
    if (message.channel.type === "dm" || !message.guild || message.author.bot) return;
  let scarysnipelendin = {
  icerik: message.content,
  sahip: message.author.id,
  yazildi: message.createdTimestamp,
  silindi: Date.now(), 
  kanal: message.channel.id
  }
  await db.set(`scarysnipe.${message.guild.id}`, scarysnipelendin)
  });   
  ///////////// SNIPE

  ///////////// 


  
  ///////////// 


  /*

{
  "install": {
    "include": [
      "^package\\.json$",
      "^\\.env$"
    ]
  },
  "restart": {
    "exclude": [
      "^public/",
      "^dist/"
    ],
    "include": [
      "\\.js$",
      "\\.coffee$",
      "\\.json"
    ]
  },
  "throttle": 900000
}





*/

client.login(genel.token);

