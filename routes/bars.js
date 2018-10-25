'use strict';

const express = require('express');
const app = express();

const Bar = require('../models');

const router = express.Router();


//get data for all bars
router.get('/bars', (req, res) => {
  Bar.find()
    .then(results => {
      //serialize each response
      res.json(results.map(bar => bar.serialize()));
      // res.json(results);

    })
    .catch(err => {
      //error if request fails
      console.error(err);
      res.status(500).json({ error: 'bad bad bad' });
    });
});

//get data for single bar by id
router.get('/bars/:id', (req, res) => {
  Bar.findById(req.params.id)
    .then(bar => {
      res.json(bar.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'ughhhhhhhh no no' });
    });
});

//post bar data
router.post('/bars', (req, res) => {
  //required fields for post
  let requiredFields = ['name', 'address', 'hours'];
  //check if each required field is present. If a field is not present, return an error message
  for (var i = 0; i < requiredFields.length; i++) {
    let field = requiredFields[i];
    if (!field) {
      return res.status(400).json({ error: 'missing field in request body' });
    }
  }
  //create new data object
  Bar.create({
    name: req.body.name,
    address: req.body.address,
    hours: req.body.hours,
    description: req.body.description,
    neighborhood: req.body.neighborhood,
    phone: req.body.phone,
    rating: req.body.rating,
    review: req.body.review,
    link: req.body.link,
    img: req.body.img,
    patio: req.body.patio,
  })
    .then(newBar=> {
      res.status(201).json(newBar.serialize());
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'ughhhhhhhh no no' });
    });
});

//update bar data object
router.put('/bars/:id', (req, res) => {
  const { id } = req.params;
  let { 
    name, 
    address, 
    hours, 
    description,
    neighborhood,
    phone,
    rating,
    review,
    price,
    link,
    img,
    patio   
  } = req.body;
  
  const updateBar = {};

  if(name) updateBar.name = name;
  if(address) updateBar.address = address;
  if(hours) updateBar.hours = hours; 
  if(description) updateBar.description = description;
  if(neighborhood) updateBar.neighborhood = neighborhood;
  if(phone) updateBar.phone = phone;
  if(rating) updateBar.rating = rating;
  if(review) updateBar.review = review;
  if(price) updateBar.price = price;
  if(link) updateBar.link = link;
  if(img) updateBar.img = img;
  if(patio) updateBar.patio = patio;


  Bar.findByIdAndUpdate({_id: id}, updateBar, { new: true })
    .then(result => {
      res.status(201).json(result);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'ughhhhhhhh no no' });
    });
});

//delete bar data object
router.delete('/bars/:id', (req, res) => {
  Bar.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).json({ message: 'success, my friend!' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'ughhhhhhhh no no' });
    });
});

module.exports = router;