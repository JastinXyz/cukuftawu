import { Ctx, MessageType } from "@mengkodingan/ckptw";
import { downloadContentFromMessage } from "@whiskeysockets/baileys";

module.exports = {
    name: "toimage",
    aliases: ['toimg'],
    description: "Convert sticker menjadi file.",
    cooldown: 1,
    category: "tools",
    code: async(ctx: Ctx) => {
        try {
            const quotedMessage = ctx._msg.message?.extendedTextMessage?.contextInfo?.quotedMessage as any;
            if(!quotedMessage) return ctx.react(ctx.id!, '❌');

            let type = ctx._self.getContentType(quotedMessage);
            if(type !== MessageType.stickerMessage) return ctx.react(ctx.id!, '❌');

            let stream = await downloadContentFromMessage(quotedMessage[type], type.slice(0, -7));
            let buff = Buffer.from([]);

            for await (const chunk of stream) {
                buff = Buffer.concat([buff, chunk]);
            }

            ctx.reply({ image: buff, mimetype : "image/png" });
        } catch (err) {
            console.log("[TOIMAGE ERR]", err)
        }
    }
}