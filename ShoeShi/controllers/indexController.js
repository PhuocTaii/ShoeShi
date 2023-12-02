const indexController = {
    getCustomerHomePage: (req, res) => {
        res.render('customer/index', {
            extraStyles: 'home.css',
            layout: 'customer/layout/main',
        })
    },

    getAdminHomePage: (req, res) => {
        res.render('admin/index', {
            extraStyles: 'dashboard.css',
            layout: 'admin/layout/main',
        })
    }
}

module.exports = indexController;