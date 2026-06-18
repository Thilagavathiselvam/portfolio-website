const express = require("express");
const router = express.Router();

const Contact = require("../models/Contact");

router.post("/", async (req, res) => {

    try {

        const contact = new Contact({
            name: req.body.name,
            email: req.body.email,
            message: req.body.message
        });

        await contact.save();

        res.status(201).json({
            message: "Message Sent Successfully"
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;