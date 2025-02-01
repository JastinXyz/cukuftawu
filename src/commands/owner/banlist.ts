import { Ctx } from "@mengkodingan/ckptw";
import dotenv from "dotenv";
import config from "../../../config";
import generateMessage from "../../lib/generateMessage";
import bot from "../../client";
dotenv.config();

module.exports = {
    name: "banlist",
    description: "List banned user.",
    cooldown: 0,
    category: "owner",
    args: ["<argument>"],
    code: async(ctx: Ctx) => {        
        try {
            if (!config.botOwnerID.includes(ctx.sender.decodedJid?.replace("@s.whatsapp.net", "")!)) return ctx.reply(generateMessage('onlyOwner', { ctx }));

            let banlist = await bot.db.get('bans');
            ctx.reply({ text: banlist.join("\n") });
        } catch (err) {
            console.log("[HIDETAG ERR]", err)
        }
    }
}