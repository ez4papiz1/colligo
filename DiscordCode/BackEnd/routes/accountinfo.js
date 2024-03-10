const mongoose = require('mongoose');
const express = require('express');
mongoose.connect('mongodb://localhost:27017/colligo');
const db = mongoose.connection;
const coll = db.collection("AccountInfo");
const router = express.Router();

router.get("/"), (req,res) => {
    res.json(coll.find(req.query));
}

router.post("/"), (req,res) => {
    coll.insert(req.body);
}

router.put("/"), (req,res) => {
    coll.findOneAndUpdate(req.query, req.body);
}

router.delete("/"), (req,res) => {
    coll.delete(req.body);
}

module.exports = router;