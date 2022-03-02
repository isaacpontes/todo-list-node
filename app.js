const express = require('express');
const methodOverride = require('method-override');
const path = require('path');
const indexRouter = require('./src/routes/index');
const checklistRouter = require('./src/routes/checklist');
const taskRouter = require('./src/routes/task');

require('dotenv').config();
require('./config/database');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method', { methods: ['POST', 'GET'] }));

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'src/views'));
app.set('view engine', 'ejs');

app.use('/', indexRouter);
app.use('/checklists', checklistRouter);
app.use('/checklists', taskRouter.dependent);
app.use('/tasks', taskRouter.simple);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Server started.');
})