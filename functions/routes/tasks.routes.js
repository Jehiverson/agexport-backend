const express = require('express');
const router = express.Router();
const Sequelize = require("sequelize");

//Models
const Task = require("../models/task");
const File_tasks = require("../models/file_task");
const Responsible = require("../models/responsible");
const moment = require('moment');
const Op = Sequelize.Op;

router.get("/task", async(req, res) => {
   var data = await Task.findAll({
      include: [{
        model: Responsible
       },{
         model: File_tasks
        }],
        where: {
         status:"Active"
        }
    }).then(tasks => res.json(tasks));
   res.json({data});
});

router.get("/task/:id", async(req, res) => {
   let idTask = req.params.id;
   var data = await Task.findOne({
      where: { idtask: idTask }, 
      include: [{
        model: Responsible
       },{
         model: File_tasks
        },]
    }).then(task => res.json(task));

   res.json({data});
});

router.get("/task-nextEnd", async(req, res) => {
   console.log(moment(new Date()).add(2, "days"),moment(new Date()).add(4, "days"))
   var data = await Task.findAll({
      order: [
         ["date_end","ASC"]
      ],
      include: [{
        model: Responsible
       },{
         model: File_tasks
        }],
        where:{
         date_end:{
            [Op.between]: [moment(new Date()).subtract(1, "days"),moment(new Date()).add(2, "days")],
         },
         status:"Active"
      }
    }).then(tasks => res.json(tasks));
   res.json({data});
});

router.post("/task", async(req, res) => {
   const {IdResponsible, title, description, status, priority } = JSON.parse(req.body);
   const taskData = await Task.create({
      IdResponsible:IdResponsible,
      title:title,
      description:description,
      status:status,
      priority:priority,
      date_at: new Date(),
      date_end: new Date()
    });
    
   res.json({taskData});
});

router.patch("/task", async(req, res) => {
   const {idtask, IdResponsible, title, description, status, priority } = JSON.parse(req.body);
   const taskData = await Task.update({
      IdResponsible:IdResponsible,
      title:title,
      description:description,
      status:status,
      priority:priority,
    },{
      where:{
         idtask:idtask
      }
    });

   res.json({taskData});
});



 
module.exports = router;