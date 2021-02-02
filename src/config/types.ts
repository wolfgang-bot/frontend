export namespace API {
    enum INSTANCE_STATES {
        ACTIVE = "active",
        INACTIVE = "inactive",
        STARTING = "starting",
        STOPPING = "stopping"
    }

    type DescriptiveObject = {
        [key: string]: {
            value: string | number | any[] | DescriptiveObject,
            description?: string,
            constraints?: string,
        }
    }

    export type Response = {
        status: string,
        data?: any,
        message?: string
    }

    export type Guild = {
        id: string,
        name: string,
        icon?: string,
        icon_animated: string,
        isActive?: boolean,
        owner: boolean,
        permissions: number,
    }

    export type User = {
        id: string,
        username?: string,
        discriminator?: string,
        avatar?: string,
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