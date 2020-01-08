module.exports = {
  async up(db) {
    await db.collection('users').insertOne({ userName: 'matt', password: '1234', isAdmin: true, roles: [] });

    const roles = [{ roleName: 'admin' }, { roleName: 'admin' }, { roleName: 'user' }, { roleName: 'operator' }, { roleName: 'reader' }];
    await db.collection('roles').insertMany(roles);
  },

  async down(db) {
    await db.collection('users').deleteOne({ userName: 'matt' });
    await db.collection('roles').deleteMany({});
  },
};
