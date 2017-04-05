import userService from '../services/userService.js';
const userRoutes = (app) => {
  const service = userService();
  /* CREATE */
  app.post('/user', (req, res) => {
      service.saveUser(req.body).then((user)=>{
        res.json({info: 'user created successfully', data: user});
      }).catch((err)=>{
        res.json({info: 'error during find users', error: err});
      });
  });
  /* READ */
  app.get('/user', (req, res) => {
    service.findUsers({}, { userName: "asc"}).then((users) => {
      res.json({info: 'users found successfully', data: users});
    }).catch((err) => {
      res.json({info: 'error during find users', error: err});
    });
  });
};

export default userRoutes;
