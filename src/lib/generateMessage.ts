import { Cooldown, Ctx, italic } from "@mengkodingan/ckptw";
import config from "../../config";
import ms from "ms";

interface Options {
    ctx: Ctx;
    cooldown?: Cooldown;
    args?: string;
    max_character?: number;
}

export default function generateMessage(key: keyof typeof config.message, options: Options) {
    return italic(config.message[key]
        .replace(/{timeleft}/g, options.cooldown ? ms(options.cooldown?.timeleft) : '{timeleft}')
        .replace(/{prefix}/g, options.ctx._used.prefix as string)
        .replace(/{command}/g, options.ctx._used.command as string)
        .replace(/{args}/g, options.args || '')
        .replace(/{max_character}/g, options.max_character ? options.max_character.toString() : '{max_character}')
    )
}