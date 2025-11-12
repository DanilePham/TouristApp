const express = require('express');
require('dotenv').config();
const path = require('path');

const connectDatabase = require('./config/database.config');
connectDatabase.connect();
const app = express();
const port = 3000;

app.set(`views`, path.join(__dirname, `views`));
app.set(`view engine`, `pug`);

const clientRouter = require('./routers/client/index.router');

app.use(express.static(path.join(__dirname, `public`)));

app.use('/', clientRouter);
app.use('/tours', clientRouter);


app.get('/users', (req, res) => {
  res.send('Main User Management1!')
})



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


//Get: lấy dữ liệu từ server về
//Post: gửi dữ liệu lên server
//Put: cập nhật dữ liệu
//Delete: xóa dữ liệu
//Patch: cập nhật một phần dữ liệu
//req: dữ liệu gửi từ client lên server
//res: dữ liệu server trả về cho client