import { Ctx } from "@mengkodingan/ckptw";
import dotenv from "dotenv";
import config from "../../../config";
import generateMessage from "../../lib/generateMessage";
import bot from "../../client";
dotenv.config();

module.exports = {
    name: "ban",
    description: "Ban user.",
    cooldown: 0,
    category: "owner",
    args: ["<argument>"],
    code: async(ctx: Ctx) => {        
        try {
            if (!config.botOwnerID.includes(ctx.sender.decodedJid?.replace("@s.whatsapp.net", "")!)) return ctx.reply(generateMessage('onlyOwner', { ctx }));
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));

            let banlist = await bot.db.get('bans');

            let user = ctx.args;
            let mentions = ctx.getMentioned();

            if(mentions && mentions.length) {
                user = mentions;
            }

            for (let u of user) {
                let userIndex = banlist.findIndex((x: any) => x === ctx.decodeJid(u).replace("@s.whatsapp.net", ""));
                if (userIndex !== -1) {
                    return ctx.reply({ text: `User ${u} already banned!` });
                }

                banlist.push(ctx.decodeJid(u).replace("@s.whatsapp.net", ""));
            }

            await bot.db.set('bans', banlist);

            ctx.react(ctx.id!, '✅')
        } catch (err) {
            console.log("[HIDETAG ERR]", err)
        }
    }
}