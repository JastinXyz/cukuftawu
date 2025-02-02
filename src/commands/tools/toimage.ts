import { Cooldown, Ctx, italic, MessageType } from "@mengkodingan/ckptw";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "toimage",
    aliases: ['toimg'],
    description: "Convert sticker menjadi file.",
    cooldown: 1,
    category: "tools",
    code: async(ctx: Ctx) => {
        try {
            const buff = await ctx.quoted.media.toBuffer();
            if(!buff) return ctx.reply(italic('❌ Reply ke sticker saat menggunakan command ini.'));

            ctx.reply({ image: buff, mimetype : "image/png" });
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[TOIMAGE ERR]", err)
        }
    }
}