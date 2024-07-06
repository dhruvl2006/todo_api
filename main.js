import express from 'express'
const app = express()
const port = 3000
import mongoose from 'mongoose'
import TODO from './models/todo.js'


app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.use(express.json());

app.get('/get', async (req, res) => {
    try {
        const todos = await TODO.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.get('/get/:id', async (req, res) => {
    try {
        const todo = await TODO.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });
        res.json(todo);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

app.patch('/update/:id', async (req, res) => {
    try {
        const todo = await TODO.findById(req.params.id);
        if (!todo) return res.status(404).json({ message: 'Todo not found' });

        if (req.body.title != null) {
            todo.title = req.body.title;
        }
        if (req.body.description != null) {
            todo.description = req.body.description;
        }
        const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})
app.patch('/update/completed/:id', async (req, res)=>{
    try{
    const todo = await TODO.findById(req.params.id);
    if (req.body.completed != null) {
        todo.completed = req.body.completed;
    }
    const updatedTodo = await todo.save();
        res.json(updatedTodo);
    } catch(err){
        res.status(400).json({ message: err.message });
    }
})
app.delete('/delete/:id', async (req, res)=>{
    try{
    const todo = await TODO.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });

    await todo.deleteOne();
    res.json({ message: 'Todo deleted' });
    } catch (err){
        res.status(500).json({ message: err.message });
    }

})

app.post('/create', async (req, res) => {
    try {
        console.log(req.body)
        const todo = new TODO({
            title: req.body?.title,
            description: req.body?.description,
            completed: req.body?.completed
        });
        try {
            const savedTodo = await todo.save();
            res.status(201).json(savedTodo);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

async function connectDB() {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/test');
        console.log('connected')
    } catch (error) {
        console.log(error)
    }
}

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
    connectDB()

})