module.exports = () => {
   let guild = client.guilds.cache.get(sistem.server);
 	setInterval( async () => {
  let channels = guild.channels.cache.filter(channel => channel.type == "voice" && channel.members.size > 0);
  channels.forEach(channel => {
/*     let members = channel.members.filter(member => !member.user.bot && !member.voice.selfDeaf);
  */    
       let members = channel.members.filter(member => !member.user.bot);
      members.forEach(member => {
 /*          if(member.roles.cache.has(roller.jail) || member.roles.cache.has(roller.cezali) || member.roles.cache.has(roller.yasaklitag) || member.roles.cache.get(roller.unregister)) return;
   /*  if(!member.user.username.includes(ayarlar.tag) &&  !member.roles.cache.has(roller.family) && member.hasPermission('ADMINISTRATOR')) return;
     */   databasem.coinEkle(member, coinsistem.odül.ses)
      });
  });
  }, coinsistem.kacmilisaniyesonra);
}

module.exports.config = {
    Event: "ready"
}