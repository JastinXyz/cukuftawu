import { Ctx } from "@mengkodingan/ckptw";
import makeCooldown from "../lib/makeCooldown";

export default async function cooldownMiddleware(ctx: Ctx, next: () => Promise<void>) {
    let cmds = ctx.bot.cmd?.toJSON();
    cmds = cmds?.filter((x: any) => x.name === ctx.used.command || x.aliases?.includes(ctx.used.command));

    if (cmds) {
        for (const cmd of cmds) {
            if (cmd.cooldown && makeCooldown(ctx, cmd.cooldown)) return;
        }
    }

    await next();
}