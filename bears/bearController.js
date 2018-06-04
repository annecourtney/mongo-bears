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

    if (!species || !latinName) {
      res.status(400)
      res.json({ message: "Please provide both species and latinName for the bear." });
      return;
    }
    newBear.save()
      .then( bear => {
        res.status(201)
        res.json({ bear });
      })
      .catch(err => {
        res.status(201)
        res.json({ message: "Error, Cannot add new Bear." });
    })
  });

router
  .route('/:id')
  .get((req, res) => {
    const { id } = req.params

    Bear.findById(id)
    .then( bear => {
      if (bear === null) {
        res.status(404)
        res.json({ message: "The bear with the specified ID does not exist." })
      } 
      else {
        res.status(200)
        res.json(bear);
      }
    })
      .catch(err => {
        res.status(500)
        res.json({ message: "Error, No bear by that id in DB"})
    })
  })
  .delete((req, res) => {
    const { id } = req.params;

    Bear.findByIdAndRemove(id)
    .then(deletedBear => {
      if (deletedBear === null) {
        res.status(404)
        res.json({ message: "The bear with the specified ID does not exist." })
      } else {
        res.status(200)
        res.json({ deletedBear });
      }
    })
    .catch( err => {
      res.status(500).json({ message: "The bear could not be removed" })
    })
  })
  .put((req, res) => {
    const { id } = req.params;
    const changes = req.body;
    
    Bear.findByIdAndUpdate(id, changes)
      .then( bear => {
        if (bear === null) {
          res.status(404)
          res.json({ message: "The bear with the specified ID does not exist." })
        } 
        else {
          Bear.findById(id)
            .then( updatedBear => {
              if (updatedBear == null) {
                res.status(404)
                res.json({ message: "The bear with the specified ID does not exist." })
              } 
              else {
                res.status(200)
                res.json({ updatedBear });
              }
            })
            .catch( err => {
              res.status(500)
              res.json({ message: "The bear information could not be retrieved." })
            })}
      })
      .catch( err => {
        res.status(500).json({ message: "The bear information could not be modified." })
      })
  });

module.exports = router;
