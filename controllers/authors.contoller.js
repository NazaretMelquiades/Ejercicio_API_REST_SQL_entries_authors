const entry = require('../models/authors.model');

// GET
// http://localhost:3000/api/authors
// http://localhost:3000/api/authors?email=alejandru@thebridgeschool.es
const getAuthors = async (req, res) => {
    let entries;
    if (req.query.email) {
        entries = await entry.getAuthorByEmail(req.query.email);
    } else {
        entries = await entry.getAllAuthors();
    }
    res.status(200).json(entries); //[con las entries encontradas]
}

// CREATE 
// POST http://localhost:3000/api/authors/
const createAuthor = async (req, res) => {
    const newAuthor = req.body;

    try {
        const response = await entry.createAuthor(newAuthor);
        res.status(201).json({
            message: 'Autor creado correctamente',
            items_created: response,
            data: newAuthor
        });
    } catch (err) {
        console.error('Error en createAuthor:', err);
        res.status(500).json({ error: 'Error al crear autor' });
    }
};

// UPDATE
// PUT http://localhost:3000/api/authors/ 
const updateAuthor = async (req, res) => {
    const { email, newName, newSurname, newEmail, newImage } = req.body;

    try {
        const result = await entry.updateAuthor(email, newName, newSurname, newEmail, newImage);
        if (result > 0) {
            res.status(200).json({ message: 'Autor actualizado correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró ningún autor con ese email' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al actualizar el autor' });
    }
}

// DELETE
// DELETE http://localhost:3000/api/authors/
const deleteAuthor = async (req, res) => {
    const { email } = req.body;
    try {
        const result = await entry.deleteAuthor(email);

        if (result > 0) {
            res.status(200).json({ message: 'Autor eliminado correctamente' });
        } else {
            res.status(404).json({ message: 'No se encontró ningún autor con ese email' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error al eliminar el autor' });
    }
}

module.exports = {
    getAuthors,
    createAuthor,
    updateAuthor,
    deleteAuthor
}
