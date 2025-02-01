require('dotenv').config();

/** @type {import('./src/common/types').Config} */
module.exports = {
    client: {
        prefix: /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/,
        printQRInTerminal: false,
        readIncommingMsg: true,
        usePairingCode: true,
        selfReply: true,
        phoneNumber: process.env.BOT_PHONE_NUMBER,
        autoMention: true
    },
    commandHandlerLog: true,
    botOwnerID: process.env.BOT_OWNER_ID?.split(", "),
    hasteServer: process.env.HASTE_SERVER,
    sticker: {
        pack: 'npmjs.com/@mengkodingan/ckptw',
        author: 'github.com/mengkodingan/ckptw'
    },
    message: {
        cooldown: "⏰ Cooldown! Mohon tunggu selama {timeleft}.",
        invalidUsage: "❌ Contoh penggunaan: {prefix}{command} {args}",
        error: "❌ Terjadi kesalahan saat menjalankan perintah.",
        onlyOwner: "❌ Perintah ini hanya bisa dijalankan oleh pemilik bot.",
        onlyGroup: "❌ Perintah ini hanya bisa dijalankan di dalam grup.",
        onlyAdmin: "❌ Perintah ini hanya bisa dijalankan oleh admin grup.",
        maxCharacter: "❌ Teks terlalu panjang! Maksimal {max_character} karakter.",
        banned: "❌ Kamu telah di ban dari bot ini.",
    }
}