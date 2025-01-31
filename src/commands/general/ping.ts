import { Cooldown, Ctx } from "@mengkodingan/ckptw";
import generateMessage from "../../lib/generateMessage";
import makeCooldown from "../../lib/makeCooldown";

module.exports = {
    name: "ping",
    description: "Pong!",
    cooldown: 1,
    category: "general",
    code: async(ctx: Ctx) => {
        if(module.exports.cooldown && makeCooldown(ctx, module.exports.cooldown)) return;

        try {
            ctx.reply({ text: `🥰 ${Date.now() - (ctx.msg.messageTimestamp * 1000)}ms` })
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[PING ERR]", err)
        }
    }
}