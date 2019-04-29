exports.up = function(connection, Promise) {
  return connection.schema.createTable('comments', commentsTable => {
    commentsTable.increments('comment_id').primary();
    commentsTable
      .string('author')
      .references('username')
      .inTable('users')
      .onDelete('CASCADE')
      .notNullable();
    commentsTable
      .integer('article_id')
      .references('article_id')
      .inTable('articles')
      .onDelete('CASCADE')
      .notNullable();
    commentsTable.integer('votes').defaultTo(0);
    commentsTable.date('created_at').defaultTo(connection.fn.now());
    commentsTable.string('body', 2000).notNullable();
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('comments', commentsTable => {});
};
