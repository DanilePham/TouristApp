const express = require('express')
const path= require('path');
const app = express()
const port = 3000

//Thiet Lap chua file pug
//render ra file pug
app.set(`views`, path.join(__dirname,`views`));

app.set(`view engine`, `pug`);

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/tours', (req, res) => {
  res.send('Main Tour Management1!')
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