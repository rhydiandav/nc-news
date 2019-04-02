exports.up = function(connection, Promise) {
  return connection.schema.createTable('articles', articlesTable => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.string('body', 2000).notNullable();
    articlesTable.integer('votes').defaultTo(0);
    articlesTable
      .string('topic')
      .references('slug')
      .inTable('topics');
    articlesTable
      .string('author')
      .references('username')
      .inTable('users');
    articlesTable.date('created_at').defaultTo(connection.fn.now());
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('articles', articlesTable => {});
};
