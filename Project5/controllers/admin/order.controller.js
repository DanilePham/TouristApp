module.exports.listOrders = async (req, res) => {
    res.render('admin/page/order-list', { pagetitle: "Order List" })
}

module.exports.editOrder=async(req,res) => {
    res.render('admin/page/order-edit',{pagetitle:"Order Edit"})
}                                                               