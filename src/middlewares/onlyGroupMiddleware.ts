import { Ctx } from "@mengkodingan/ckptw";
import generateMessage from "../lib/generateMessage";

export default async function onlyGroupMiddleware(ctx: Ctx, next: () => Promise<void>) {
    let cmds = ctx.bot.cmd?.toJSON();
    cmds = cmds?.filter((x: any) => x.name === ctx.used.command || x.aliases?.includes(ctx.used.command));

    if (cmds) {
        for (const cmd of cmds) {
            if (cmd.group) {
                if (!ctx.isGroup()) return ctx.reply(generateMessage('onlyGroup', { ctx }));
            }
        }
    }

    await next();
}