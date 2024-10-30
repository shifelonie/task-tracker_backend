import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class PicService {
  async getPic({ search }) {
    const where = {};
    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }];
    }

    try {
      const pic = await prisma.pic.findMany();

      const totalPic = await prisma.pic.count({ where });

      return {
        pic,
        totalRecords: totalPic,
      };
    } catch (error) {
      console.error("Error mengambil data pic:", error);
      throw new Error(`Gagal untuk mengambil data pic: ${error.message}`);
    }
  }

  async createPic({ name }) {
    try {
      const pic = await prisma.pic.create({
        data: {
          name,
        },
      });
    } catch (error) {
      console.error("Error membuat data pic: ", error);
      throw new Error(`Gagal untuk menambah data pic: ${error.message}`);
    }

    if (!name || name.trim() === "") {
      throw new Error("Name tidak boleh kosong.");
  }  
  }

  async updatePic(id, { name }) {
    try {
      const data = {
        name,
      };

      const pic = await prisma.pic.update({
        where: { id: id },
        data: data,
      });

      return pic;
    } catch (error) {
      console.error("Error updating data pic:", error);
      throw new Error(`Gagal untuk mengupdate data pic: ${error.message}`);
    }
  }

  async deletePic(id) {
    try {
      await prisma.pic.delete({
        where: { id },
      });
      return { message: "data pic berhasil dihapus" };
    } catch (error) {
      console.error("Error deleting data pic:", error);
      throw new Error(`Gagal untuk menghapus data pic: ${error.message}`);
    }
  }
}

export const picService = new PicService();
