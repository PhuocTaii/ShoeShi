# SHOESHI - Shoe eCommerce Web-app

An online shoes retailer for 2 types of users: Customer and Admin.

![Customer](/demo/customer.png "Customer")

![Admin](/demo/admin.png "Admin")

## Features

### For customer

- Authentication
- Catalog and product details
- Shopping cart
- Checkout
- User profile
- Order history

### For admin

- Login
- Dashboard
- Account management
- Product attributes (categories, manufacturers, colors, sizes) management
- Product management
- Order management

## Technologies

- MVC architecture
- HTML, CSS, JavaScript
- [AJAX](https://api.jquery.com/jQuery.ajax/)
- [Node.js](https://nodejs.org/en)
- [MongoDB](https://www.mongodb.com/)
- [Cloudinary](https://cloudinary.com/) for uploading images
- [Passport.js](https://www.passportjs.org/) for authentication

## Folder structure

At the beginning, use [express-generator](https://expressjs.com/en/starter/generator.html) to create a skeleton. After adding some necessary directories and files, it should look like this:

```text
.
├── bin/
│   └── www
├── config/
│   └── cloudinary.config.js
│   └── handlebars.config.js
│   └── passport.config.js
├── node-modules/
├── package.json
├── package-lock.json
├── public/
│   ├── assets/
│   ├── js/
│   └── stylesheets/
├── routes/
├── controllers/
├── middleware/
│   └── authenticationMiddleware.js
├── models/
├── services/
├── views/
│   ├── layout/
├── └── *.hbs
├── .env
├── .gitignore
├── .prettierrc
├── app.js
└── README.md
```
