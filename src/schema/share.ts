import * as yup from 'yup';

export const thumbnailSchema = yup.object({
    url: yup.string().optional(),
    alt: yup.string().optional(),
    ref_url: yup.string().optional(),
});

export const additionalSchema = yup
    .array()
    .of(
        yup.object({
            key: yup.string().required(),
            value: yup.string().optional(),
        }),
    )
    .optional();

export const additionalThumbnailSchema = yup
    .array()
    .of(
        yup.object({
            key: yup.string().required(),
            value: thumbnailSchema.optional(),
        }),
    )
    .optional();

export const optionSchema = yup
    .object({
        value: yup.string(),
        label: yup.string(),
    })
    .nullable();
