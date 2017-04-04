import User from '../models/userModel.js';

/* eslint-disable no-console */

const userRoutes = (app) => {

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    console.log(req.method, req.url, req.headers );
    next();
  });
  /* CREATE */
  app.post('/user', (req, res) => {
      const newUser = new User(req.body);
      newUser.save((err) => {
          if (err) {
            res.json({info: 'error during user create', error: err});
          }else{
            res.json({info: 'user created successfully', data: newUser});
          }
      });
  });

  /* READ */
  app.get('/user', (req, res) => {
    const promise = User.find().sort({ userName: "asc"}).exec();

    promise.then((users)=>{
      res.json({info: 'users found successfully', data: users});
    }).catch((err)=>{
      res.json({info: 'error during find users', error: err});
    });
  });
};

export default userRoutes;
