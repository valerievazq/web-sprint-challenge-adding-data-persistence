exports.up = async function (knex) {
  await knex.schema.createTable("projects", (table) => {
    table.increments();
    table.text("project_name").notNull();
    table.text("project_description");
    table.boolean("completed").defaultTo(false);
  });

  await knex.schema.createTable("resources", (table) => {
    table.increments();
    table.text("resource_name").notNull();
    table.text("resource_description");
  });

  await knex.schema.createTable("tasks", (table) => {
    table.increments();
    table.text("task_description").notNull();
    table.text("task_note");
    table.boolean("task_completed").notNull().defaultTo(false);
    table
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("RESTRICT")
      .onUpdate("CASCADE");
  });

  // await knex.schema.createTable("projects_tasks", (table) => {
  //   table
  //     .integer("project_id")
  //     .unsigned()
  //     .notNullable()
  //     .references("id")
  //     .inTable("projects")
  //     .onDelete("RESTRICT")
  //     .onUpdate("CASCADE");
  //   table
  //     .integer("task_id")
  //     .unsigned()
  //     .notNullable()
  //     .references("id")
  //     .inTable("tasks")
  //     .onDelete("RESTRICT")
  //     .onUpdate("CASCADE");
  //   table.primary(["project_id", "task_id"]);
  // });

  await knex.schema.createTable("project_resources", (tbl) => {
    tbl
      .integer("project_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("projects")
      .onDelete("RESTRICT");
    tbl
      .integer("resource_id")
      .unsigned()
      .notNullable()
      .references("id")
      // this table must exist already
      .inTable("resources")
      .onDelete("RESTRICT");
    tbl.primary(["project_id", "resource_id"]);
  });
};
exports.down = async function (knex) {
  await knex.schema.dropTableIfExists("project_resources");
  await knex.schema.dropTableIfExists("projects_tasks");
  await knex.schema.dropTableIfExists("projects");
  await knex.schema.dropTableIfExists("resources");
  await knex.schema.dropTableIfExists("tasks");
};
