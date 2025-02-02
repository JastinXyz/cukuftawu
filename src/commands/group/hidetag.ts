import { Ctx } from "@mengkodingan/ckptw";
import dotenv from "dotenv";
import generateMessage from "../../lib/generateMessage";
dotenv.config();

module.exports = {
    name: "hidetag",
    description: "🤔",
    aliases: ['htg'],
    cooldown: 0,
    group: true,
    category: "grup",
    code: async(ctx: Ctx) => {        
        try {
            const members = await ctx.group().members();

            let isSenderAdmin = members.filter((x) => x.id === ctx.sender.decodedJid && (x.admin === 'admin' || x.admin === 'superadmin'));
            if (!isSenderAdmin.length) return ctx.reply(generateMessage('onlyAdmin', { ctx }));
            
            ctx.sendMessage(ctx.id!, { text: ctx.args.join(" ") || String.fromCharCode(8206).repeat(4001), mentions: members.map(m => m.id) })
        } catch (err) {
            console.log("[HIDETAG ERR]", err)
        }
    }
}