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
            const messageType = ctx.getMessageType();
            const quotedMessage = ctx.quoted;

            if (!quotedMessage && messageType !== MessageType.imageMessage && messageType !== MessageType.videoMessage) return ctx.react(ctx.id as string, "❌");

            let buffer;

            if(quotedMessage) {
                let type = ctx.getContentType(quotedMessage) as keyof typeof quotedMessage;
                let stream = await ctx.downloadContentFromMessage(quotedMessage[type] as any, type.slice(0, -7) as any);
                let buff = Buffer.from([]);

                for await (const chunk of stream) {
                    buff = Buffer.concat([buff, chunk]);
                }

                buffer = buff;
            } else {
                buffer = await ctx.getMediaMessage(ctx._msg, "buffer");
            }

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