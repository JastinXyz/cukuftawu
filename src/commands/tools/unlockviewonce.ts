import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "unlockviewonce",
    description: "Membuka view once.",
    cooldown: 5,
    category: "tools",
    code: async(ctx: Ctx) => {
        try {
            let quoted = ctx.quoted.viewOnceMessageV2?.message as any;
            let messageType = ctx.getContentType(quoted) as any;
            let media = await ctx.downloadContentFromMessage(quoted[messageType] as any, messageType?.slice(0, -7))
            
            let buffer = Buffer.from([]);
            for await (const chunk of media) {
                buffer = Buffer.concat([buffer, chunk]);
            }

            if(messageType === MessageType.imageMessage) {
                ctx.reply({ image: buffer });
            } else if(messageType === MessageType.videoMessage) {
                ctx.reply({ video: buffer });
            }
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[VIEWONCE ERR]", err)
        }
    }
}