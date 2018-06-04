const router = require('express').Router();
const Bear = require('./bearModel'); // pull in our Bear model

router
  .route('/')
  .get((req, res) => {
    Bear.find()
    .then(bears => {
      res.status(202)
      res.json({ bears })
    })
    .catch (err => {
      res.status(200)
      res.json({ message: 'Error fetching bears' });
    })
  })
  .post((req, res) => {
    const { species, latinName } = req.body;
    const newBear = new Bear({ species, latinName });
    newBear
      .save()
      .then(savedBear => {
        res.status(201)
        res.json({ savedBear })
      })
      .catch(err => {
        res.status(201)
        res.json({ status: 'please implement POST functionality' });
    })
  });

router
  .route('/:id')
  .get((req, res) => {
    res.status(200).json({ route: '/api/bears/' + req.params.id });
  })
  .delete((req, res) => {
    res.status(200).json({ status: 'please implement DELETE functionality' });
  })
  .put((req, res) => {
    res.status(200).json({ status: 'please implement PUT functionality' });
  });

module.exports = router;
