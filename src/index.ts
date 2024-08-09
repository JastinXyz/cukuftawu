import { Client, Events, CommandHandler } from "@mengkodingan/ckptw";
import path from "path";

const bot = new Client({
    prefix: /^[°•π÷×¶∆£¢€¥®™✓=|~zZ+×_*!#%^&./\\©^]/,
    printQRInTerminal: true,
    readIncommingMsg: true
});

bot.ev.once(Events.ClientReady, (m) => {
    console.log(`ready at ${m.user.id}`);
});

bot.command('ping', async(ctx) => ctx.reply({ text: 'pong!' }));

const cmd = new CommandHandler(bot, path.resolve('dist') + '/commands');
cmd.load();

bot.launch();