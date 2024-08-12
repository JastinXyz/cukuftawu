import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";

module.exports = {
    name: "toimage",
    aliases: ['toimg'],
    description: "Convert sticker menjadi file.",
    cooldown: 1,
    category: "tools",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            const quotedMessage = ctx._msg.message?.extendedTextMessage?.contextInfo?.quotedMessage as any;
            if(!quotedMessage) return ctx.react(ctx.id!, '❌');

            let type = ctx._self.getContentType(quotedMessage);
            if(type !== MessageType.stickerMessage) return ctx.react(ctx.id!, '❌');

            let stream = await ctx.downloadContentFromMessage(quotedMessage[type], type.slice(0, -7) as any);
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