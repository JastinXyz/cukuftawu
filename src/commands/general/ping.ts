import { Cooldown, Ctx } from "@mengkodingan/ckptw";

module.exports = {
    name: "ping",
    description: "Pong!",
    cooldown: 1,
    category: "general",
    code: async(ctx: Ctx) => {
        const cd = new Cooldown(ctx, 1000);
        if(cd.onCooldown) return ctx.react(ctx.id!, '⏰');

        try {
            ctx.reply({ text: `🏓 ${Date.now() - (ctx.msg.messageTimestamp * 1000)}ms` })
        } catch (err) {
            console.log("[PING ERR]", err)
        }
    }
}