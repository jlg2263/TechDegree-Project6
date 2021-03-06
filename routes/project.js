/* Dependencies */

// Create express and router instance
// Require data file
const express = require('express');
const router = express.Router();
const { projects } = require('../data.json');

/* Routes */

// Get Index/Home page route with a redirect if no id is provided
router.get('/', (req, res) =>
{
    res.redirect('/');
});

// Get Project page w/ id provided
// Dynamic "project" route based on the id of the 
// project that render a customized version
router.get('/:id', (req, res, next) =>
{
    // Create local variables to hold data
    const projectId = req.params.id;
    const project = projects[projectId];

    // If project is true or found, render project
    if (projectId < projects.length) 
    {
        res.render('project', {project});
    }
    else
    {
        // Create error object to hand off to error handler
        // Log statement to indicate that this function is running
        const err = new Error('No Records Found');
        err.status = 400;
        console.log('400 Error - No Records Found');
        // Pass control forward through the app or end middleware function
        next(err);
    }
});

// Export router to be referenced in app.js file
module.exports = router;