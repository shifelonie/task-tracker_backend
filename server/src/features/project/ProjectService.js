import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProjectService {
  async getProject({ search, page = 1, limit = 10 }) {
    const where = {};
    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }];
    }

    const skip = (page - 1) * limit;
    const take = limit;

    try {
      const project = await prisma.project.findMany({
        where,
        skip,
        take,
      });

      const totalProject = await prisma.project.count({ where });

      return {
        project,
        totalRecords: totalProject,
      };
    } catch (error) {
      console.error("Error mengambil data project:", error);
      throw new Error(`Gagal untuk mengambil data project: ${error.message}`);
    }
  }

  async createProject({ name }) {
    try {
      const project = await prisma.project.create({
        data: {
          name,
        },
      });
    } catch (error) {
      console.error("Error creating data project: ", error);
      throw new Error(`Gagal untuk menambah data project: ${error.message}`);
    }

    if (!name || name.trim() === "") {
      throw new Error("Name tidak boleh kosong.");
    }  
  }

  async updateProject(id, { name }) {
    try {
      const data = {
        name,
      };

      const project = await prisma.project.update({
        where: { id: id },
        data: data,
      });

      return project;
    } catch (error) {
      console.error("Error updating data project:", error);
      throw new Error(`Gagal untuk mengupdate data project: ${error.message}`);
    }
  }

  async deleteProject(id) {
    try {
      await prisma.project.delete({
        where: { id },
      });
      return { message: "Data Project berhasil dihapus" };
    } catch (error) {
      console.error("Error deleting data project:", error);
      throw new Error(`Gagal untuk menghapus data project: ${error.message}`);
    }
  }
}

export const projectService = new ProjectService();
