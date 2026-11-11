import vine from '@vinejs/vine'

export const classgroupValidator = vine.create({
    name:vine.string().minLength(2).maxLength(255)
})