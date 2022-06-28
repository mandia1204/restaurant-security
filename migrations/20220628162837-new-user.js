module.exports = {
  async up(db) {
    await db.collection('users').insertOne({ userName: 'edson0104', password: 'abc123$$', isAdmin: false, roles: [] });
  },

  async down(db) {
    await db.collection('users').deleteOne({ userName: 'edson0104' });
  },
};
