const express = require('express');
const router = express.Router();

//Models
const Task = require("../models/task");
const File_tasks = require("../models/file_task");
const Responsible = require("../models/responsible");

router.get("/responsible", async(req, res) => {
   var data = await Responsible.findAll().then(responsibles => res.json(responsibles));
   res.json({data});
});

router.get("/responsible/:id", async(req, res) => {
   let idresponsible = req.params.id;
   var data = await Responsible.findOne({ where: { idresponsible: idresponsible } }).then(task => res.json(task));

   res.json({data});
});

router.post("/responsible", async(req, res) => {
   const {name, position, state } = req.body;
   const responsibleData = await Responsible.create({
      name: name,
      position: position,
      state: state,
      date_at: new Date(),
      date_end: new Date()
    });

   res.json({responsibleData});
});

router.patch("/responsible", async(req, res) => {
   const {idresponsible, name, position, state } = req.body;
   const responsibleData = await Responsible.update({
      name: name,
      position: position,
      state: state
    },{
      where:{
         idresponsible:idresponsible
      }
    });

   res.json({responsibleData});
});

module.exports = router;