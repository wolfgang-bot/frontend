export enum INSTANCE_STATES {
    ACTIVE,
    INACTIVE,
    STARTING,
    STOPPING
}

export enum ARGUMENT_TYPES {
    TEXT_CHANNEL = "text_channel",
    VOICE_CHANNEL = "voice_channel",
    CATEGORY_CHANNEL = "category_channel",
    ROLE = "role"
}

export enum EVENT_TYPES {
    GUILD_MEMBER_ADD,
    GUILD_MEMBER_REMOVE,
    MESSAGE_SEND,
    VOICECHANNEL_JOIN,
    VOICECHANNEL_LEAVE
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
        isActive?: boolean,
        owner: boolean,
        permissions: number,
        channels: ReduxAPIState<Record<string, Discord.GuildChannel>>,
        roles: ReduxAPIState<Record<string, API.Role>>,
        config: ReduxAPIState<API.DescriptiveConfig>,
        memberCount: ReduxAPIState<API.MemberCount>
    }

    export type User = {
        id: string,
        username?: string,
        discriminator?: number,
        avatar?: string,
        avatar_animated?: string
    }

    export type DescriptiveConfig = DescriptiveObject
    export type Config = object

    export type Module = {
        key: string,
        isGlobal: boolean,
        isPrivate: boolean,
        icon?: string,
        translations: {
            name: string,
            desc: string,
            features: string[],
            args: Argument[]
        }
    }

    export type ModuleInstance = {
        moduleKey: string,
        guildId: string,
        state: INSTANCE_STATES
    }

    export type Argument = {
        type: ARGUMENT_TYPES,
        key: string,
        name: string,
        desc: string
    }

    export type GuildChannel = Discord.GuildChannel
    export type Role = Discord.Role
    
    export type MemberCount = number

    export type EVENT_STREAM = "module-instances" | "members" | "messages" | "voice"

    export type Event<TMeta = undefined> = {
        type: EVENT_TYPES,
        timestamp: number,
        guild_id?: string,
        meta: TMeta
    }

    export type MemberEventMeta = {
        memberCount: API.MemberCount
    }

    export type VoiceEventMeta = {
        duration: number
    }

    export type Stream<T> = {
        type: EVENT_STREAM,
        status: "idle" | "flowing" | "paused",
        data: T[]
    }

    export type StreamArgs = {
        eventStream: EVENT_STREAM,
        guildId: string
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
}

export type LoadingState = "idle" | "pending" | "success" | "error"

export type ReduxAPIState<T> = {
    data: T,
    status: LoadingState,
    error?: any
}

export type DescriptiveObject = {
    value: any,
    description?: string,
    constraints?: string
}
