import { projectService } from "./ProjectService.js";
import vine, { errors } from "@vinejs/vine";
import {
  projectValidator,
  updateProjectValidator,
} from "./ProjectValidation.js";

export const getProject = async (req, res) => {
  const { search, page = 1, limit = 10 } = req.query;
  try {
    const result = await projectService.getProject({
      search,
      page: Number(page),
      limit: Number(limit),
    });
    res.status(200).json({
      msg: "success",
      data: result.project,
      totalRecords: result.totalRecords,
    });
  } catch (error) {
    console.error("Error mengambil data project:", error);
    res
      .status(500)
      .json({
        msg: "Error terjadi saat mengambil data project",
        errors: error.message,
      });
  }
};

export const createProject = async (req, res) => {
  const data = req.body;
  const validator = vine.compile(projectValidator);

  try {
    const payload = await validator.validate(data);
    const project = await projectService.createProject({ ...payload });
    res.status(201).json({
      msg: "Data project berhasil dibuat",
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
          msg: "Error terjadi saat menambah data project",
          errors: error.message,
        });
    }
  }
};

export const updateProject = async (req, res) => {
  const data = req.body;
  const { id } = req.params;
  const validator = vine.compile(updateProjectValidator); // Using updateProjectValidator

  try {
    const payload = await validator.validate(data);
    const project = await projectService.updateProject(id, { ...payload });
    res.status(200).json({
      msg: "Data project berhasil diupdate",
      data: project,
    });
  } catch (error) {
    if (error instanceof errors.E_VALIDATION_ERROR) {
      res.status(400).json({ errors: error.messages });
    } else {
      console.error(error);
      res
        .status(500)
        .json({
          msg: "Error terjadi saat mengupdate data project",
          errors: error.message,
        });
    }
  }
};

export const deleteProject = async (req, res) => {
  const { id } = req.params;

  try {
    await projectService.deleteProject(id);
    res.status(200).json({ msg: "Data Project berhasil dihapus" });
  } catch (error) {
    console.error("Error menghapus data project:", error);
    res
      .status(500)
      .json({
        msg: "Error terjadi saat menghapus data project",
        errors: error.message,
      });
  }
};
