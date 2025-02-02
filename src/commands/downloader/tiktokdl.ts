import { bold, Ctx, italic } from "@mengkodingan/ckptw";
import axios from "axios";
import generateMessage from "../../lib/generateMessage";
import makeCooldown from "../../lib/makeCooldown";

module.exports = {
    name: "tiktokdl",
    aliases: ['ttdl'],
    description: "Tiktok downloader.",
    cooldown: 5,
    category: "downloader",
    args: ["<url>"],
    code: async(ctx: Ctx) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));
            let url = ctx.args[0];

            let { data } = await axios('https://api.tiklydown.eu.org/api/download?url=' + url);

            if(!data.images && !data.video) return ctx.reply(italic(`❌ Video atau foto tidak ditemukan.`));

            let caption = `${data.title}
                    
👍 ${bold(data.stats.likeCount + " Likes")}
🔁 ${bold(data.stats.shareCount + " Shares")}
💬 ${bold(data.stats.commentCount + " Comments")}
🔄️ ${bold(data.stats.playCount + " Views")}
🔖 ${bold(data.stats.saveCount + " Saves")}`;
            
            if(data.video) {
                let { data: cover } = await axios(data.video.origin_cover, {
                    responseType: 'arraybuffer'
                });

                ctx.reply({ video: { url: data.video.noWatermark }, caption, jpegThumbnail: cover });
            } else if(data.images) {
                await Promise.all(data.images.map(async (img: { url: string }) => {
                    await ctx.sendMessage(ctx.id!, { image: { url: img.url }, jpegThumbnail: '' });
                }));

                ctx.reply({ text: caption });
            }
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[TIKTOKDL ERR]", err)
        }
    }
}