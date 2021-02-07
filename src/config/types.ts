export enum INSTANCE_STATES {
    ACTIVE,
    INACTIVE,
    STARTING,
    STOPPING
}

export enum ARGUMENT_TYPES {
    TEXT_CHANNEL = "text_channel",
    VOICE_CHANNEL = "voice_channel",
    CATEGORY_CHANNEL = "category_channel"
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
        channels: ReduxAPIState<Record<string, Discord.GuildChannel>>
    }

    export type User = {
        id: string,
        username?: string,
        discriminator?: number,
        avatar?: string,
        avatar_animated: string
    }

    export type DescriptiveConfig = DescriptiveObject
    export type Config = object

    export type Module = {
        name: string,
        isGlobal: boolean,
        isPrivate: boolean,
        translations: {
            desc: string,
            features: string[],
            args: Argument[]
        }
    }

    export type ModuleInstance = {
        moduleName: string,
        guildId: string,
        state: INSTANCE_STATES
    }

    export type Argument = {
        type: ARGUMENT_TYPES,
        name: string,
        displayName: string,
        desc: string
    }

    export type GuildChannel = Discord.GuildChannel
}

export type LoadingState = "idle" | "pending" | "success" | "error"

export type ReduxAPIState<T> = {
    data: T,
    status: LoadingState,
    error?: any
}

export type DescriptiveObject = {
    [key: string]: {
        value: string | number | any[] | DescriptiveObject,
        description?: string,
        constraints?: string
    }
}
