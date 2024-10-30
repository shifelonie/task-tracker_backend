import vine from "@vinejs/vine";

export const picValidator = vine.object({
  name: vine.string(),
});

export const updatePicValidator = vine.object({
  name: vine.string(),
});
