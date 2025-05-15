/********************************************************************************
* WEB422 – Assignment 1
*
* I declare that this assignment is my own work in accordance with Seneca's
* Academic Integrity Policy:
*
* https://www.senecapolytechnic.ca/about/policies/academic-integrity-policy.html
*
* Name: Khanh Anh Kiet Nguyen Student ID: 170049233 Date: May 13, 2025
*
* Published URL on Vercel:
*
********************************************************************************/
const express = require('express');
const cors = require('cors');

const SitesDB = require("./modules/sitesDB.js");
const db = new SitesDB();

require('dotenv').config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Allow cross-origin requests
app.use(express.json()); // Parse JSON bodies
app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public'));
require('pg'); // explicitly require the "pg" module
const Sequelize = require('sequelize');


app.get('/', (req, res) => {
  res.json({
    message: "API Listening",
    term: "Summer 2025",
    student: "Khanh Anh Kiet Nguyen"
  });
});

// POST - Add new site
app.post('/api/sites', (req, res) => {
    db.addNewSite(req.body)
      .then(data => res.status(201).json(data))
      .catch(err => res.status(500).json({ message: err }));
  });
  

// GET - Paginated and optionally filtered
app.get('/api/sites', (req, res) => {
const { page, perPage, name, region, provinceOrTerritoryName } = req.query;

db.getAllSites(parseInt(page), parseInt(perPage), name, region, provinceOrTerritoryName)
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ message: err }));
});

// GET by ID
app.get('/api/sites/:id', (req, res) => {
    db.getSiteById(req.params.id)
        .then(data => {
        if (!data) res.status(404).json({ message: 'Site not found' });
        else res.json(data);
        })
        .catch(err => res.status(500).json({ message: err }));
});

// PUT by ID
app.put('/api/sites/:id', (req, res) => {
db.updateSiteById(req.body, req.params.id)
    .then(() => res.status(204).json({message: 'Site already be changed sucessfully'}))
    .catch(err => res.status(500).json({ message: err }));
});

// DELETE by ID
app.delete('/api/sites/:id', (req, res) => {
db.deleteSiteById(req.params.id)
    .then(() => res.status(204).json({message: 'Site already be deleted sucessfully'}))
    .catch(err => res.status(500).json({ message: err }));
});
  

db.initialize(process.env.MONGODB_CONN_STRING).then(()=>{
    app.listen(PORT, ()=>{
        console.log(`server listening on: ${PORT}`);
    });
}).catch((err)=>{
    console.log(err);
});

