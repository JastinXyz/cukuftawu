import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

module.exports = {
    name: "sticker",
    aliases: ['s', 'stiker'],
    description: "Convert gambar atau gif/mp4 ke sticker.",
    cooldown: 1,
    category: "tools",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            let buffer = await ctx.msg.media.toBuffer() || await ctx.quoted.media.toBuffer();
            if(!buffer) return ctx.react(ctx.id as string, "❌");

            const sticker = new Sticker(buffer as any, {
                pack: 'npmjs.com/@mengkodingan/ckptw',
                author: 'bot gawul',
                type: StickerTypes.FULL,
                categories: [],
                id: ctx.id!,
                quality: 50,
            });

            return ctx.reply(await sticker.toMessage());
        } catch (err) {
            console.log("[STICKER ERR]", err)
        }
    }
}