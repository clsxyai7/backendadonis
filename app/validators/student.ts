import vine from '@vinejs/vine'


export const studentValidator = vine.create({
    name: vine.string().minLength(2).maxLength(255),
    firstname: vine.string().minLength(2).maxLength(255),
    classgroupId:vine.number(),
})


export const getStudentsQueryValidator = vine.create({
    page: vine.number().min(1).optional(),
    limit: vine.number().min(1).max(100).optional(),
    sort: vine.enum(['name', 'firstname', 'created_at']).optional(), // trier par nom, prénom ou date  de création
    order: vine.enum(['asc', 'desc']).optional(), // ordre de tri
    classGroupId: vine.number().optional(),
    search: vine.string().trim().minLength(1).optional(),
})