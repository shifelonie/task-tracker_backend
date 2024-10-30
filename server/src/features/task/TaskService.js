import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class TaskService {
  async getTask({ search, page = 1, limit = 10 }) {
    const where = {};
    if (search) {
      where.OR = [{ name: { contains: search, mode: "insensitive" } }];
    }

    const skip = (page - 1) * limit;
    const take = limit;

    try {
      const tasks = await prisma.task.findMany({
        where,
        skip,
        take,
        // Include project and pic names
        include: {
          project: {
            select: { name: true, id: true },
          },
          pic: {
            select: { name: true, id: true },
          },
        },
      });

      const totaltask = await prisma.task.count({ where });

      // Format tasks to include project and pic names at top level
      const formattedTasks = tasks.map((task) => ({
        id: task.id,
        name: task.name,
        description: task.description,
        deadline: task.deadline,
        status: task.status,
        projectName: task.project.name, // Flatten project name
        projectId: task.project.id,
        picName: task.pic.name, // Flatten pic name
        picId : task.pic.id
      }));

      return {
        tasks: formattedTasks,
        totalRecords: totaltask,
      };
    } catch (error) {
      console.error("Error mengambil data task:", error);
      throw new Error(`Gagal untuk mengambil data task: ${error.message}`);
    }
  }

  async createTask({
    name,
    description,
    deadline,
    status,
    project_id,
    pic_id,
  }) {
    try {
      // Format the deadline to ISO-8601 format
      const formattedDeadline = new Date(deadline).toISOString(); // This will automatically convert to "YYYY-MM-DDTHH:MM:SS.sssZ"
  
      // Check if name is valid
      if (!name || name.trim() === "") {
        throw new Error("Name tidak boleh kosong.");
      }
  
      const task = await prisma.task.create({
        data: {
          name,
          description,
          deadline: formattedDeadline,
          status,
          project: {
            connect: { id: project_id },
          },
          pic: {
            connect: { id: pic_id },
          },
        },
      });
  
      return task;
    } catch (error) {
      console.error("Error creating data task: ", error);
      throw new Error(`Gagal untuk menambah data task: ${error.message}`);
    }
  }
  

  async updateTask(
    id,
    { name, description, deadline, status, project_id, pic_id }
  ) {
    try {
      const formattedDeadline = new Date(deadline).toISOString(); // This will automatically convert to "YYYY-MM-DDTHH:MM:SS.sssZ"

      const data = {
        name,
        description,
        deadline: formattedDeadline,
        status,
        project: {
          connect: { id: project_id },
        },
        pic: {
          connect: { id: pic_id },
        },
      };

      const task = await prisma.task.update({
        where: { id: id },
        data: data,
      });

      return task;
    } catch (error) {
      console.error("Error updating data project:", error);
      throw new Error(`Gagal untuk mengupdate data project: ${error.message}`);
    }
  }

  async deleteTask(id) {
    try {
      await prisma.task.delete({
        where: { id },
      });
      return { message: "Data Project berhasil dihapus" };
    } catch (error) {
      console.error("Error deleting data project:", error);
      throw new Error(`Gagal untuk menghapus project: ${error.message}`);
    }
  }
}

export const taskService = new TaskService();
