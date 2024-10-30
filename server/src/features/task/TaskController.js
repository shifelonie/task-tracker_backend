import { taskService } from "./TaskService.js";
import vine, { errors } from "@vinejs/vine";
import { taskValidator, updateTaskValidator } from "./TaskValidation.js";

export const getTask = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query; // Ambil query params dari request

  try {
    // Panggil service untuk mendapatkan task
    const result = await taskService.getTask({
      search,
      page: Number(page), // Pastikan page adalah number
      limit: Number(limit), // Pastikan limit adalah number
    });

    // Kirimkan response jika berhasil
    res.status(200).json({
      msg: "success",
      data: result.tasks, // Mengirim data task yang sudah diformat
      totalRecords: result.totalRecords, // Mengirim total task yang ditemukan
    });
  } catch (error) {
    // Log dan kirim error jika terjadi masalah
    console.error("Error mengambil task:", error);
    res.status(500).json({
      msg: "Error terjadi saat mengambil task",
      errors: error.message,
    });
  }
};

export const createTask = async (req, res) => {
  const data = req.body;
  const validator = vine.compile(taskValidator);

  try {
    const payload = await validator.validate(data);
    const task = await taskService.createTask({ ...payload });
    res.status(201).json({
      msg: "Data task berhasil dibuat",
      data: [],
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      res
        .status(500)
        .json({
          msg: "Error terjadi saat menambah data task",
          errors: error.message,
        });
    }
  }
};

export const updateTask = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const validator = vine.compile(updateTaskValidator); // Using updateTaskValidator

  try {
    const payload = await validator.validate(data);
    const task = await taskService.updateTask(id, { ...payload });
    res.status(200).json({
      msg: "Data task berhasil diupdate",
      data: task,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      res
        .status(500)
        .json({
          msg: "Error terjadi saat mengupdate data task",
          errors: error.message,
        });
    }
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    await taskService.deleteTask(id);
    res.status(200).json({ msg: "Data task berhasil dihapus" });
  } catch (error) {
    console.error("Error menghapus data task:", error);
    res
      .status(500)
      .json({
        msg: "Error terjadi saat menghapus data task",
        errors: error.message,
      });
  }
};
