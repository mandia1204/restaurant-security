module.exports = {
  async up(db) {
    await db.createCollection('users');
    await db.createCollection('tokens');
    await db.createCollection('roles');
  },

  async down(db) {
    await db.dropCollection('users');
    await db.dropCollection('tokens');
    await db.dropCollection('roles');
  },
};
