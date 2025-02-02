import { Cooldown, Ctx, MessageType } from "@mengkodingan/ckptw";
import axios from "axios";
import makeCooldown from "../../lib/makeCooldown";
import generateMessage from "../../lib/generateMessage";

module.exports = {
    name: "get",
    aliases: ['fetch'],
    description: "Send a get request to the requested url.",
    cooldown: 5,
    category: "tools",
    args: ["<argument>"],
    code: async(ctx: any) => {
        try {
            if(!ctx.args.length) return ctx.reply(generateMessage('invalidUsage', { ctx, args: module.exports.args.join(" ") }));

            let { href } = new URL(ctx.args[0])
            let res = await axios.get(href);
            if (!/text|json/.test(res.headers['content-type'])) {
                return ctx._self.sendFile(ctx.id, href, '', href, ctx.msg);
            } else {
                if (res.headers['content-type'].includes('json')) {
                    return ctx.reply(JSON.stringify(res.data, null, 2));
                } else {
                    return ctx.reply(res.data);
                }
            }
        } catch (err) {
            ctx.reply(generateMessage('error', { ctx }));
            console.log("[GET ERR]", err)
        }
    }
}