import { Ctx, MessageType } from "@mengkodingan/ckptw";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";
import { Sticker, StickerTypes } from 'wa-sticker-formatter';

module.exports = {
    name: "sticker",
    aliases: ['s', 'stiker'],
    code: async(ctx: Ctx) => {
        try {
            const messageType = ctx.getMessageType();
            const quotedMessage = ctx._msg.message?.extendedTextMessage?.contextInfo?.quotedMessage as any;

            if (!quotedMessage && messageType !== MessageType.imageMessage && messageType !== MessageType.videoMessage) {
                ctx.react(ctx.id as string, "❌");
            }

            let buffer;

            if(quotedMessage) {
                let type = ctx._self.getContentType(quotedMessage);
                let stream = await downloadContentFromMessage(quotedMessage[type], type.slice(0, -7));
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