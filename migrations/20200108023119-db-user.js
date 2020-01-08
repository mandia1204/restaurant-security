module.exports = {
  async up(db) {
    await db.addUser('security_user', '1234', {
      roles: ['readWrite', 'dbAdmin'],
    });
  },

  async down(db) {
    await db.removeUser('security_user');
  },
};
