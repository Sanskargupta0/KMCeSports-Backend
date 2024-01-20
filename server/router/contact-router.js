const express = require("express");
const router = express.Router();
const contact = require("../controllers/contact.-controllers")
const Schema = require("../validator/contact-validator");
const validate = require("../middleware/validate-middleware");


router
.route('/contact')
.post(validate.contactMiddleware(Schema.contactSchema),contact.constactForm);

router
 .route('/subscribeEmail')
 .post(validate.schemaMiddleware(Schema.emailSchema),contact.subscribeEmail);

module.exports=router;