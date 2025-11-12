const express = require('express');
require('dotenv').config();
const path = require('path');
const mongoose = require('mongoose');
//Kết nối đến MongoDB
mongoose.connect(process.env.DATABASE);
const Tour = mongoose.model('Tour', {
  name: String,
  time: String,
  vehicle: String
},
  "tours"
);
const app = express()
const port = 3000



console.log("ok backend")
//Thiet Lap chua file pug
//render ra file pug
app.set(`views`, path.join(__dirname, `views`));

app.set(`view engine`, `pug`);

app.get('/', (req, res) => {
  res.render('client/pages/home.pug', { pagetitle: "123" })
})

app.use(express.static(path.join(__dirname, `public`)));

app.get('/tours', async (req, res) => {
  const tourList = await Tour.find({});

  console.log(tourList);
  res.render('client/pages/tour-list.pug', {
    pagetitle: "Tour List",
    tourList: tourList
  })
})

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