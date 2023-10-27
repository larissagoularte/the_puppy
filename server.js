const express = require('express')
var bodyParser = require('body-parser')

const mysql = require('mysql');

const app = express()
const port = 3000

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

//parse application/json
app.use(bodyParser.json())

app.use(express.static('public'))


const dbase = mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"",
    database:"the_puppy",
})

dbase.connect(function(err){
    if(err)throw err;
    
    console.log("Database Connected!");
    
    });

    
app.get('/puppy', (req, res) => {
    const puppyData = {}; 

    dbase.query('SELECT name, happy, hunger, thirst FROM puppy', (err, result) => {
      if (err) {
        console.error('Error fetching data from the database:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {

        if (result.length > 0) {
          puppyData.name = result[0].name;
          puppyData.hunger = result[0].hunger;
          puppyData.thirst = result[0].thirst;
          puppyData.happy = result[0].happy;
        }
    
        res.json(puppyData);
      }
        });
      });
      
    
app.post('/resetPuppy', (req, res) => {
    const sql = `
    UPDATE puppy
    SET hunger = 50, thirst = 50, happy = 50
  `;

  dbase.query(sql, (err, result) => {
    if (err) {
      console.error('Error resetting puppy values:', err);
      res.status(500).json({ error: 'Internal server error' });
    } else {
      console.log('Puppy values reset successfully');
      res.json({ message: 'Puppy values reset successfully' });
    }
  });
});

app.post('/updateHappy', (req, res) => {
    const { name, newHappyValue } = req.body;

    if (!name || newHappyValue === undefined) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    
    const sql = `UPDATE puppy SET happy = ${newHappyValue} WHERE name = ?`;
    
    dbase.query(sql, [name], (err, result) => {
      if (err) {
        console.error('Error updating happiness:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Happiness updated successfully');
        res.json({ message: 'Happiness updated successfully' });
      }
    });
});

app.post('/updateThirst', (req, res) => {
    const { name, newThirstValue } = req.body;

    if (!name || newThirstValue === undefined) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    
    const sql = `UPDATE puppy SET thirst = ${newThirstValue} WHERE name = ?`;
    
    dbase.query(sql, [name], (err, result) => {
      if (err) {
        console.error('Error updating thirst:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Thirst updated successfully');
        res.json({ message: 'Thirst updated successfully' });
      }
    });
});

app.post('/updateHunger', (req, res) => {
    const { name, newHungerValue } = req.body;

    if (!name || newHungerValue === undefined) {
      res.status(400).json({ error: 'Bad request' });
      return;
    }
    
    const sql = `UPDATE puppy SET hunger = ${newHungerValue} WHERE name = ?`;
    
    dbase.query(sql, [name], (err, result) => {
      if (err) {
        console.error('Error updating hunger:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
        console.log('Hunger updated successfully');
        res.json({ message: 'Hunger updated successfully' });
      }
    });
});
      

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })