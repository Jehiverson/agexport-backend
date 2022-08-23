const express = require('express');
const router = express.Router();

//Models
const Task = require("../models/task");
const File_tasks = require("../models/file_task");
const Responsible = require("../models/responsible");

router.get("/files", async(req, res) => {
   var data = await File_tasks.findAll({
      include: [{
         model: Task
        }],
        where:{
         state:"Active"
        }
   }).then(files => res.json(files));
   res.json({data});
});

router.get("/files/:id", async(req, res) => {
   let idFiles = req.params.id;
   var data = await File_tasks.findAll({ 
      include: [{
         model: Task
        }],
      where: { idtask: idFiles, state:"Active" } 
   }).then(file => res.json(file));
   res.json({data});
});

router.post("/files", async(req, res) => {
   const {idtask, name, url, state } = JSON.parse(req.body);
   console.log(JSON.parse(req.body))
   const filesData = await File_tasks.create({
      idtask: idtask,
      name: name,
      url: url,
      state: state,
      date_at: new Date(),
      date_upd: new Date()
    });

   res.json({filesData});
});

router.patch("/files", async(req, res) => {
   const { idfile_task, state } = JSON.parse(req.body);
   const filesData = await File_tasks.update({
      state: state
    },{
      where:{
         idfile_task:idfile_task
      }
   });

   res.json({filesData});
});

module.exports = router;