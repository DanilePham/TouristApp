module.exports.listTours = async (req, res) => {
    res.render('admin/page/tour-list', { pagetitle: "Tour List" })
}

module.exports.createTour = async (req, res) => {
    res.render('admin/page/tour-create', { pagetitle: "Create Tour" })
}

module.exports.trashTours = async (req, res) => {
    res.render('admin/page/tour-trash', { pagetitle: "Trash Tours" })
}