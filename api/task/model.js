// build your `Task` model here
const db = require("../../data/dbConfig");

function getTasks() {
  return (
    db("tasks as t")
      .join("projects as p", "p.id", "t.project_id")
      // .join("tasks as t", "t.id", "pt.task_id")
      .select(
        "t.project_id",
        "t.task_description",
        "t.task_note",
        "t.task_completed",
        "p.project_name",
        "p.project_description"
      )
  );
  // .where({ project_id });
}

function findById(id) {
  return db("tasks").where({ id }).first();
}

function addTask(task) {
  return db("tasks").insert(task);
}
function addTaskToProject(task, id) {
  return db("tasks").insert({ ...task, project_id: id });
}

// function addTaskToProject(data) {
//   return db("tasks").insert(data);
// }

module.exports = {
  getTasks,
  findById,
  addTask,
  addTaskToProject,
};
