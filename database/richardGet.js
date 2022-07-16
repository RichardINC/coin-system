const emojiler = require("../scaryemojiler.json");
async function GetUser(id) {
    try {
        return await global.client.users.fetch(id);
    } catch (error) {
        return undefined;
    }
};

function sayılıEmoji(sayi) {
    var basamakbir = sayi.toString().replace(/ /g, "     ");
    var basamakiki = basamakbir.match(/([0-9])/g);
    basamakbir = basamakbir.replace(/([a-zA-Z])/g, "Belirlenemiyor").toLowerCase();
    if (basamakiki) {
        basamakbir = basamakbir.replace(/([0-9])/g, d => {
            return {
                "0": emojiler.sayi0,
                "1": emojiler.sayi1,
                "2": emojiler.Sayı2,
                "3": emojiler.Sayı3,
                "4": emojiler.Sayı4,
                "5": emojiler.Sayı5,
                "6": emojiler.Sayı6,
                "7": emojiler.Sayı7,
                "8": emojiler.Sayı8,
                "9": emojiler.Sayı9
            }[d];
        });
    }
    return basamakbir;
}


global.client.users.getUser = GetUser;
global.client.getUser = GetUser;

module.exports = {
    GetUser,
    sayılıEmoji,
}