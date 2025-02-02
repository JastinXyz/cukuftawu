import { Ctx } from "@mengkodingan/ckptw";
import axios from "axios";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "ytmp4",
    description: "Youtube to MP4.",
    cooldown: 5,
    category: "downloader",
    args: ["<url>"],
    hidden: true,
    code: async(ctx: Ctx) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));
            let url = ctx.args[0];

            let { data } = await axios('https://ytdl.axeel.my.id/api/download/video?url=' + url);
            ctx.reply({ video: { url: data.downloads.url } });
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[TIKTOKDL ERR]", err)
        }
    }
}