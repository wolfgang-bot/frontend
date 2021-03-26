import { UTCTimestamp } from "lightweight-charts"

export enum INSTANCE_STATES {
    ACTIVE,
    INACTIVE,
    STARTING,
    STOPPING
}

export enum ARGUMENT_TYPES {
    STRING = "string",
    NUMBER = "number",
    TEXT_CHANNEL = "text_channel",
    VOICE_CHANNEL = "voice_channel",
    CATEGORY_CHANNEL = "category_channel",
    ROLE = "role"
}

export enum EVENT_TYPES {
    GUILD_ADD,
    GUILD_REMOVE,
    USER_ADD,
    MODULE_INSTANCE_START,
    MODULE_INSTANCE_STOP,
    GUILD_MEMBER_ADD,
    GUILD_MEMBER_REMOVE,
    MESSAGE_SEND,
    VOICECHANNEL_LEAVE
}

export enum GUILD_STATUS {
    INACTIVE,
    PENDING,
    ACTIVE
}

export declare namespace Discord {
    export type Channel = {
        id: string,
        type: string,
        deleted: boolean,
        createdTimestamp: number
    }

    export type GuildChannel = Channel & {
        guild: string,
        name: string,
        parentID?: string,
        rawPosition: number
    }

    export type TextChannel = GuildChannel & {
        lastMessageID?: string,
        lastPinTimestamp?: number,
        nsfw: boolean,
        rateLimitPerUser: number,
        topic?: string
    }

    export type CategoryChannel = GuildChannel

    export type Role = {
        id: string,
        name: string,
        permissions: number,
        rawPosition: number,
        createdTimestamp: number,
        deleted: boolean,
        guild: string,
        hoist: boolean,
        managed: boolean,
        mentionable: boolean,
        color: number
    }
}

export declare namespace API {
    export type Response<T> = {
        status: "ok" | "error",
        data?: T,
        message?: any
    }

    export type OAuthPopupResponse = Response<{
        token: string,
        user: User
    }> & { source: string }

    export type Guild = {
        id: string,
        name: string,
        icon?: string,
        icon_animated: string,
        status?: GUILD_STATUS,
        owner: boolean,
        permissions: number,
        channels: ReduxAPIState<Record<string, Discord.GuildChannel>>,
        roles: ReduxAPIState<Record<string, API.Role>>,
        memberCount: ReduxAPIState<number>
    }

    export type User = {
        id: string,
        username?: string,
        discriminator?: number,
        avatar?: string,
        avatar_animated?: string,
        locale: string,
        isBotAdmin: boolean
    }

    export type Module = {
        key: string,
        name: string,
        desc: string,
        features: string[],
        args: Argument[],
        commands: Command[],
        commandGroups: Record<string, Record<string, Command>>,
        isGlobal: boolean,
        isPrivate: boolean,
        isStatic: boolean,
        icon?: string
    }

    export type ModuleInstance = {
        moduleKey: string,
        guildId: string,
        state: INSTANCE_STATES,
        config: object
    }

    export type Argument = {
        type: ARGUMENT_TYPES,
        isArray?: boolean,
        isSelect?: boolean,
        key: string,
        name: string,
        desc: string,
        defaultValue?: any,
        selectOptions?: any[],
        allowEmptyArray?: boolean
    }

    export type GuildChannel = Discord.GuildChannel
    export type Role = Discord.Role

    export type EVENT_STREAM =
        "guilds" |
        "users" |
        "module-instances" |
        "user-guilds" |
        "guild-module-instances" |
        "members" |
        "messages" |
        "voice"

    export type Event<TMeta = undefined> = {
        type: EVENT_TYPES,
        timestamp: number,
        guild_id?: string,
        meta: TMeta
    }

    export type GuildEventMeta = {
        guildCount: number
    }

    export type UserEventMeta = {
        userCount: number
    }

    export type ModuleInstanceEventMeta = {
        instanceCount: number
    }

    export type MemberEventMeta = {
        memberCount: number
    }

    export type VoiceEventMeta = {
        duration: number
    }

    export type Stream<T> = {
        type: EVENT_STREAM,
        status: "idle" | "pending" | "flowing" | "paused",
        data: T[]
    }

    export type StreamArgs = {
        eventStream: EVENT_STREAM,
        guildId?: string
    }

    export type ExecutableCommand = {
        name: string,
        callableName: string,
        group: string,
        module: string,
        description: string,
        usage: string
    }

    export type CommandRegistry = ExecutableCommand & {
        commands: Record<string, Command>
    }

    export type Command = ExecutableCommand | CommandRegistry

    export type EmptyDataObject = {
        time: UTCTimestamp
    }

    export type OHLCDataObject = {
        time: UTCTimestamp,
        open: number,
        high: number,
        low: number,
        close: number
    }

    export type SVDataObject = {
        time: UTCTimestamp,
        value: number,
        up: number,
        down: number
    }

    export type OHLCDataset = (OHLCDataObject | EmptyDataObject)[]
    export type SVDataset = (SVDataObject | EmptyDataObject)[]
    
    export type Dataset = OHLCDataset | SVDataset
}

export type LoadingState = "idle" | "pending" | "success" | "error"

export type ReduxAPIState<T> = {
    data: T,
    status: LoadingState,
    error?: any
}
