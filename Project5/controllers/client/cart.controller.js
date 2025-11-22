 module.exports.getCartPage = (req, res) => {
  res.render('client/pages/cart', { pagetitle: "Cart" })
}