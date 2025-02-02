import { Ctx } from "@mengkodingan/ckptw";
import generateMessage from "../../lib/generateMessage";
import axios from "axios";

module.exports = {
    name: "shorturl",
    aliases: ['shorten', 'shortenurl'],
    description: "URL Shortener.",
    cooldown: 5,
    category: "tools",
    args: ["<argument>"],
    code: async(ctx: Ctx) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));

            let url = new URL(ctx.args[0]);
            let res = await axios.post(`https://cleanuri.com/api/v1/shorten`, { url: url.href });
            ctx.reply(res.data.result_url);
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[SHORTURL ERR]", err)
        }
    }
}