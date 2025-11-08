const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Main DashBoard!')
})

app.get('/tours', (req, res) => {
  res.send('Main Tour Management!')
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