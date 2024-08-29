import { Client, Events, CommandHandler } from "@mengkodingan/ckptw";
import path from "path";

const bot = new Client({
    prefix: /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/,
    printQRInTerminal: true,
    readIncommingMsg: true,
    WAVersion: [2, 3000, 1015901307]
});

bot.ev.once(Events.ClientReady, (m) => {
    console.log(`ready at ${m.user.id}`);
});

const cmd = new CommandHandler(bot, path.resolve('dist') + '/commands');
cmd.load();

bot.launch();