import { Cooldown, Ctx, italic, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';
import config from "../../../config";
import { upload } from "../../lib/upload";
import filetype from 'file-type'
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";
import { messageTypeFromBuffer } from "../../lib/util";

module.exports = {
    name: "sticker",
    aliases: ['s', 'stiker'],
    description: "Convert gambar atau gif/mp4 ke sticker.",
    cooldown: 1,
    category: "tools",
    args: ["<argument?>"],
    code: async(ctx: Ctx) => {
        try {
            let buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
            if(!buffer) return ctx.reply(italic('❌ Reply ke media atau jadikan sebagai caption.'));
        
            let bufferType = await messageTypeFromBuffer(buffer);

            if(ctx.args.length && bufferType !== 'video') {
                let uploaded = await upload(buffer);
                let cap = ctx.args.join(" ").split("|");

                
                if(cap.length === 1) {
                    cap.push("_");
                    cap.reverse();
                }
                
                buffer = `https://api.memegen.link/images/custom/${encodeURIComponent(cap[0])}/${encodeURIComponent(cap[1])}.png?background=${uploaded}?font=impact` as any
            }
            
            const sticker = new Sticker(buffer as any, {
                pack: config.sticker.pack,
                author: config.sticker.author,
                type: StickerTypes.FULL,
                categories: [],
                id: ctx.id!,
                quality: 50,
            });

            return ctx.reply(await sticker.toMessage());
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[STICKER ERR]", err)
        }
    }
}