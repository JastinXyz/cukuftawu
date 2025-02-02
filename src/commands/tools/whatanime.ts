import { bold, Cooldown, Ctx, italic } from "@mengkodingan/ckptw";
import { upload } from "../../lib/upload";
import { messageTypeFromBuffer } from "../../lib/util";
import axios from "axios";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "whatanime",
    aliases: ['whatanim'],
    description: "Identifikasi anime dari gambar.",
    cooldown: 5,
    category: "tools",
    code: async(ctx: Ctx) => {
        try {
            let buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
            if(!buffer) return ctx.reply(italic('❌ Reply ke media atau jadikan sebagai caption.'));

            let bufferType = await messageTypeFromBuffer(buffer);
            if(bufferType !== 'image') return ctx.reply(italic('❌ Harus beruba gambar.'));

            let uploaded = await upload(buffer);
            let { data } = await axios(`https://api.trace.moe/search?anilistInfo&url=${encodeURIComponent(uploaded)}`);

            ctx.reply({ image: { url: data.result[0].image }, caption: `${bold(`${data.result[0].anilist.title.native} (${data.result[0].anilist.title.romaji})`)}

🔗 https://anilist.co/anime/${data.result[0].anilist.id}
🕒 Episode ${data.result[0].episode}, di ${new Date(data.result[0].from * 1000).toISOString().substr(11, 8)}
🤔 ${(data.result[0].similarity * 100).toFixed(1)}% Kemiripan` });
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[WHATANIME ERR]", err)
        }
    }
}