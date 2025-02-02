import { bold, Cooldown, Ctx, italic } from "@mengkodingan/ckptw";
import bot from "../../client";
import generateMessage from "../../lib/generateMessage";
import makeCooldown from "../../lib/makeCooldown";

module.exports = {
    name: "topsider",
    aliases: ['topseeder', 'sider', 'seeder'],
    description: "Sider harap aktif di grup ini, mohon kerja samanya.",
    cooldown: 1,
    group: true,
    category: "grup",
    code: async(ctx: Ctx) => {
        if(module.exports.cooldown && makeCooldown(ctx, module.exports.cooldown)) return;
        
        try {
            const groupMembers = await ctx.group().members();
            let isSenderAdmin = groupMembers.filter((x) => x.id === ctx.sender.decodedJid && (x.admin === 'admin' || x.admin === 'superadmin'));

            if (!isSenderAdmin.length) return ctx.reply(generateMessage('onlyAdmin', { ctx }));

            let members = await bot.db.get(`groups.${ctx.decodedId?.replace("@g.us", "")}`);
            members = members.filter((x: { id: string }) => ctx.decodeJid(x.id) !== ctx.decodeJid(ctx._client.user?.id!));
            members = members.sort((a: any, b: any) => a.sent - b.sent);

            let group = await ctx.group().metadata();
            let text = `${italic(bold(`TOP SIDER ALL TIME ${group.subject}`))}\n\n`;

            members.map((x: { id: string, sent: number }, idx: number) => {
                let mention = ctx.decodeJid(x.id).replace("@s.whatsapp.net", "");
                if (idx === 0) {
                    text += `🥇 @${mention} - ${x.sent} pesan\n`;
                } else if (idx === 1) {
                    text += `🥈 @${mention} - ${x.sent} pesan\n`;
                } else if (idx === 2) {
                    text += `🥉 @${mention} - ${x.sent} pesan\n`;
                } else {
                    text += `${idx + 1}. @${mention} - ${x.sent} pesan\n`;
                }
            });

            ctx.reply(text)
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[TOPSIDER ERR]", err)
        }
    }
}