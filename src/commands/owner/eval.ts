import { Ctx, monospace } from "@mengkodingan/ckptw";
import { hastebin } from "../../lib/hastebin";
import dotenv from "dotenv";
dotenv.config();

module.exports = {
    name: "eval",
    description: "evalute js code",
    aliases: ['e'],
    cooldown: 0,
    category: "owner",
    code: async(ctx: Ctx) => {
        if (!process.env.BOT_OWNER_ID?.split(", ").includes(ctx.sender.decodedJid?.replace("@s.whatsapp.net", "")!)) return;
        let code = ctx.args.join(" ").replace(/```(?:[^\s]+\n)?(.*?)\n?```/gm, (_, a) => a);

        try {
            if(!code) return ctx.reply({ text: 'No code provided! use codeblock instead!' })
            let isAsync = /--async$/.test(code);
            let toExec = isAsync ? code.replace(/--async$/, "") : code;
            let evaled = require("util").inspect(await eval(isAsync ? `(async () => {\n${toExec}\n})()` : toExec), {
                depth: 0
            });

            const output = evaled.length > 2000 ? await hastebin(evaled) : monospace(evaled);
            
            return ctx.sendMessage(ctx.id!, { text: output });
        } catch (err) {
            const cleaned = String(err);
            const output = cleaned.length > 2000 ? await hastebin(cleaned) : monospace(cleaned);
            return ctx.sendMessage(ctx.id!, { text: output });
        }
    }
}