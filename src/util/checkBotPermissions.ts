import { BotPermission } from "../types/Permission";
import { ResponseType } from "../types/Response";

export default (message: any, commandPermissions: BotPermission[]) => {
  if (
    commandPermissions &&
    commandPermissions.includes(BotPermission.CONNECT) &&
    !message.member.voice.channel
      .permissionsFor(message.client.user)
      .has(BotPermission.CONNECT)
  )
    return message.client.responses(message, ResponseType.noPermissionConnect);

  if (
    commandPermissions &&
    commandPermissions.includes(BotPermission.SPEAK) &&
    !message.member.voice.channel
      .permissionsFor(message.client.user)
      .has(BotPermission.SPEAK)
  )
    return message.client.responses(message, ResponseType.noPermissionConnect);

  return false;
};
