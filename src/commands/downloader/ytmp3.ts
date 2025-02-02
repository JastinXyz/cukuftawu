import { Ctx } from "@mengkodingan/ckptw";
import axios from "axios";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "ytmp3",
    description: "Youtube to MP3.",
    cooldown: 5,
    category: "downloader",
    args: ["<url>"],
    hidden: true,
    code: async(ctx: Ctx) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));
            let url = new URL(ctx.args[0]);

            let body = new URLSearchParams();
            body.set('url', url.href);

            let { data } = await axios.post('https://www.youtubemp3.ltd/convert', body, {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                }
            });

            await ctx.reply({ audio: { url: data.link }, mimetype: 'audio/mp4' });
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[YTMP3 ERR]", err)
        }
    }
}