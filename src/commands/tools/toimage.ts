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
            const buff = await ctx.quoted.media.toBuffer();
            if(!buff) return ctx.react(ctx.id!, '❌');

            ctx.reply({ image: buff, mimetype : "image/png" });
        } catch (err) {
            console.log("[TOIMAGE ERR]", err)
        }
    }
}