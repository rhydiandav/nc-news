exports.up = function(connection, Promise) {
  return connection.schema.createTable('articles', articlesTable => {
    articlesTable.increments('article_id').primary();
    articlesTable.string('title').notNullable();
    articlesTable.string('body').notNullable();
    articlesTable.integer('votes').defaultTo(0); // needs to default to 0
    articlesTable.string('topic').references('topics.slug');
    articlesTable.string('author').references('users.username');
    articlesTable.date('created_at').defaultTo(connection.fn.now()); // default to current date, need to test
  });
};

exports.down = function(connection, Promise) {
  return connection.schema.dropTable('articles', articlesTable => {});
};
