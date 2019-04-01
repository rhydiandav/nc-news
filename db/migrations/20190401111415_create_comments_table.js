exports.up = function(connection, Promise) {
  return connection.schema.createTable('comments', commentsTable => {
    commentsTable.increments('comment_id').primary();
    commentsTable
      .string('author')
      .references('users.username')
      .notNullable();
    commentsTable
      .integer('article_id')
      .references('articles.article_id')
      .notNullable();
    commentsTable.integer('votes').defaultTo(0); // needs to default to 0
    commentsTable.date('created_at').defaultTo(connection.fn.now()); // default to current date, need to test
    commentsTable.string('body').notNullable();
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('comments', commentsTable => {});
};
