class richardEvent {
    static fetchEvent(fileName) {
        let referans = require(`../veryevent/${fileName}`);
        global.client.on(referans.config.Event, referans);
        console.log('\x1b[32m%s\x1b[0m', `[ richard Default Etkinlik ] ${fileName} yüklendi.`);
    }
}

module.exports = richardEvent;