export namespace API {
    enum INSTANCE_STATES {
        ACTIVE,
        INACTIVE,
        STARTING,
        STOPPING
    }

    type DescriptiveObject = {
        [key: string]: {
            value: string | number | any[] | DescriptiveObject,
            description?: string,
            constraints?: string
        }
    }

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
        permissions: number
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
        translations: Record<string, string | string[]>
    }

    export type ModuleInstance = {
        moduleName: string,
        state: INSTANCE_STATES
    }
}

export type LoadingState = "idle" | "pending" | "success" | "error"