import vine from "@vinejs/vine";

export const projectValidator = vine.object({
  name: vine.string(),
});

export const updateProjectValidator = vine.object({
  name: vine.string(),
});
