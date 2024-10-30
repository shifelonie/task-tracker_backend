import vine from "@vinejs/vine";

export const taskValidator = vine.object({
  name: vine.string(),
  description: vine.string(),
  deadline: vine.string(),
  status: vine.number(),
  project_id: vine.string(),
  pic_id: vine.string(),
});

export const updateTaskValidator = vine.object({
  name: vine.string(),
  description: vine.string(),
  deadline: vine.string(),
  status: vine.number(),
  project_id: vine.string(),
  pic_id: vine.string(),
});
