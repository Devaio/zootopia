// This is a database script!  NOT an express app

var mongoose = require('mongoose'),
  Exhibit = require('../models/exhibits');

mongoose.connect("mongodb://localhost/zoo");

var exhibitData = [
  {
    animals: ["python", "cobra", "boa"],
    name: "Snake House",
    size: 2,
    indoors: true,
    cleaningSchedule: {
      mon: false,
      tue: false,
      wed: false,
      thu: true,
      fri: false,
    }
  },{
    animals: ["otters", "penguins"],
    name: "Otter Kingdom",
    size: 3,
    indoors: false,
    cleaningSchedule: {
      mon: true,
      tue: false,
      wed: true,
      thu: false,
      fri: true,
    }
  },{
    animals: ["arabian", "clydesdale", "mustang"],
    name: "Equestrian Estate",
    size: 4,
    indoors: false,
    cleaningSchedule: {
      mon: false,
      tue: true,
      wed: false,
      thu: true,
      fri: false,
    }
  },
]

exhibitData.forEach((exhibitObj)=>{
  
  var exhib = new Exhibit(exhibitObj);
  
  exhib.save((err, doc)=>{
    console.log(err)
  });
  
});



