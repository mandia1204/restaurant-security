import express from './expressServer.js';
import commonHeaders from './routes/commonHeaders.js';
import userRoutes from './routes/userRoutes.js';
import tokenRoutes from './routes/tokenRoutes.js'
import colors from 'colors/safe';

const app = express().getServer();

commonHeaders(app);
userRoutes(app);
tokenRoutes(app);

const port = 3001;
app.listen(port, (err) => {
  console.log(colors.green(`Listening on port ${port}`));
  if (err) {
    console.log(err);
  } else {
    //open(`http://localhost:${port}`);
  }
});
