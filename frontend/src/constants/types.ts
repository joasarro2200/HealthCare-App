export type GenericObject = { [key: string]: any };

export type ValidationField = {
    required: boolean,
    maxLength: number,
    pattern: any,
}
