const { GuildMember } = require("discord.js");

module.exports = async (member) => {
if(member.user.bot) return;
let coinoku = databasem.coinOku(member)
if(coinoku >= 5) databasem.coinTemizle(member);
}

module.exports.config = {
    Event: "guildMemberRemove"
}