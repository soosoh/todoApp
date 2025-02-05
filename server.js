import express from 'express';

import {getTasks, deleteTask, addTask} from './db.js';

const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));

app.get('/', async (req, res) => {
    res.sendFile('index.html');
})

app.post('/', (req, res) => {
    addTask(req.body.task);
    res.redirect('/');
})

app.get('/mytasks', async (req, res) => {
    const tasks  = await getTasks();
    res.json(tasks);
    console.log(tasks.length + " tasks sent");
})

app.delete('/mytasks/:no', (req, res) => {
    console.log(req.params.no + " task deleted");
    deleteTask(req.params.no);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})