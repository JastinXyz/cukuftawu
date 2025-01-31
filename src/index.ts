import { Events, CommandHandler, Ctx } from "@mengkodingan/ckptw";
import path from "path";
import bot from "./client";
import config from "../config";
import { initGroups, addContact, initSingleGroup, addUser } from "./Database/index";
import chalk from 'chalk';

bot.ev.once(Events.ClientReady, async () => {
    await initGroups(bot);
    bot.consolefy?.success("Client Ready");
});


bot.ev.on(Events.MessagesUpsert, async (m, ctx) => {
    let senderJid = ctx.sender.decodedJid;
    if (senderJid) {
        await addUser(bot, senderJid);
        await addContact(bot, senderJid);
    }
});

bot.ev.on(Events.MessagesUpsert, async(m, ctx: Ctx) => {
    let decodedJid = ctx.decodedId!;
    if(decodedJid.endsWith('@g.us')) {
        let replacedJid = decodedJid.replace("@g.us", "");
        let hasInDB = await bot.db.has(`groups.${replacedJid}`);
        if(!hasInDB) await initSingleGroup(bot, decodedJid);

        let members = await bot.db.get(`groups.${replacedJid}`);
        members = members.map((x: any) => ctx.decodeJid(x.id) === ctx.sender.decodedJid ? { ...x, sent: x.sent + 1 } : x);
        await bot.db.set(`groups.${replacedJid}`, members);
    }
});

bot.ev.on(Events.UserJoin, async(m) => {
    let decodedJid = bot.decodeJid(m.id);
    let replacedJid = decodedJid.replace("@g.us", "");
    let hasInDB = await bot.db.has(`groups.${replacedJid}`);
    if(!hasInDB) await initSingleGroup(bot, decodedJid);

    let members = await bot.db.get(`groups.${replacedJid}`);
    for (let i = 0; i < m.participants.length; i++) {
        let member = m.participants[i];
        let hasMember = members.find((x: any) => bot.decodeJid(x.id) === bot.decodeJid(member));
        if(!hasMember) members.push({ id: bot.decodeJid(member), sent: 0 });
    }

    await bot.db.set(`groups.${replacedJid}`, members);
});

const cmd = new CommandHandler(bot, path.resolve('dist', 'src') + '/commands');
cmd.load(config.commandHandlerLog);

process.on('unhandledRejection', (reason, promise) => {
    console.error(chalk.red(`Unhandled promise rejection: ${reason}`));
    process.exit(1);
});

process.on('uncaughtException', (error) => {
    console.error(chalk.red(`Uncaught exception: ${error.message}`));
    process.exit(1);
});

bot.launch();