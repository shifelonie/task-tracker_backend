import { picService } from "./PicService.js";
import vine, { errors } from "@vinejs/vine";
import { picValidator, updatePicValidator } from "./PicValidation.js";

export const getPic = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  try {
    const result = await picService.getPic({
      search,
      page: Number(page),
      limit: Number(limit),
    });
    res.status(200).json({
      msg: "success",
      data: result.pic,
      totalRecords: result.totalRecords,
    });
  } catch (error) {
    console.error("Error mengambil data pic:", error);
    res
      .status(500)
      .json({ msg: "Error terjadi saat ingin mengambil data pic", errors: error.message });
  }
};

export const createPic = async (req, res) => {
  const data = req.body;
  const validator = vine.compile(picValidator);

  try {
    const payload = await validator.validate(data);
    const pic = await picService.createPic({ ...payload });
    res.status(201).json({
      msg: "Data pic berhasil dibuat",
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
          msg: "Error terjadi saat ingin menambah data pic",
          errors: error.message,
        });
    }
  }
};

export const updatePic = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const validator = vine.compile(updatePicValidator); // Using updatePicValidator

  try {
    const payload = await validator.validate(data);
    const pic = await picService.updatePic(id, { ...payload });
    res.status(200).json({
      msg: "Data pic berhasil diupdate",
      data: pic,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      res
        .status(500)
        .json({
          msg: "Error terjadi saat mengupdate data pic",
          errors: error.message,
        });
    }
  }
};

export const deletePic = async (req, res) => {
  const { id } = req.params;

  try {
    await picService.deletePic(id);
    res.status(200).json({ msg: "data pic berhasil dihapus" });
  } catch (error) {
    console.error("Error menghapus data pic:", error);
    res
      .status(500)
      .json({ msg: "Error terjadi saat ingin menghapus data pic", errors: error.message });
  }
};
