const entry = require('../models/entries.model');

// GET
// GET http://localhost:3000/api/entries
// GET http://localhost:3000/api/entries?email=hola@gmail.com

const getEntries = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getEntriesByEmail(req.query.email);
    } else {
        entries = await entry.getAllEntries();
    }
    res.status(200).json(entries); //[con las entries encontradas]
}

// CREATE
// POST http://localhost:3000/api/entries
const createEntry = async (req, res) => {
    const newEntry = req.body;
    const response = await entry.createEntry(newEntry);
    res.status(201).json({
        "items_created": response,
        data: newEntry
    });
}

// UPDATE
// PUT http://localhost:3000/api/entries
const updateEntry = async (req, res) => {
    // const { title } = req.params;
    const { title, newContent, newDate, newTitle, newCategory } = req.body;

    try {
        const result = await entry.updateEntry(title, newContent, newDate, newTitle, newCategory);
        if (result > 0) {
            res.status(200).json({ message: 'Entrada actualizada correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró ninguna entrada con ese título' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar la entrada' });
    }
}

// DELETE 
const deleteEntry = async (req, res) => {
    // const { title } = req.params.title;
    const { title } = req.body;
    try {
        const result = await entry.deleteEntry(title);

        if (result > 0) {
            res.status(200).json({ message: 'Entrada eliminada correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró ninguna entrada con ese título' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar la entrada' });
    }
}

module.exports = {
    getEntries,
    createEntry,
    updateEntry,
    deleteEntry
}

