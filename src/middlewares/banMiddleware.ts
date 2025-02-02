import { Ctx } from "@mengkodingan/ckptw";
import bot from "../client";
import generateMessage from "../lib/generateMessage";

export default async function banMiddleware(ctx: Ctx, next: () => Promise<void>) {
    let banlist = await bot.db.get('bans');
    if(banlist && banlist.includes(ctx.sender.decodedJid?.replace("@s.whatsapp.net", ""))) return ctx.reply(generateMessage('banned', { ctx }));

    await next();
}