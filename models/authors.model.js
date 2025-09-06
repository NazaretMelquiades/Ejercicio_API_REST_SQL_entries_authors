const pool = require('../config/db_pgsql');
const queries = require('../queries/authors.queries');

// GET
const getAllAuthors = async () => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAllAuthors)
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// GET
const getAuthorByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect(); // Espera a abrir conexion
        const data = await client.query(queries.getAuthorByEmail, [email])
        result = data.rows

    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// CREATE
const createAuthor = async (author) => {
    const { name, surname, email, image } = author;
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.createAuthor, [name, surname, email, image]);
        result = data.rowCount;
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

// UPDATE
const updateAuthor = async (email, newName, newSurname, newEmail, newImage) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateAuthor, [email, newName, newSurname, newEmail, newImage])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// DELETE
const deleteAuthor = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteAuthor, [email]);
        result = data.rowCount; // Devuelve cuántas filas se eliminaron
    } catch (err) {
        console.error('Error deleting author:', err);
        throw err;
    } finally {
        client.release();
    }
    return result;
}

const authors = {
    getAllAuthors,
    getAuthorByEmail,
    createAuthor,
    updateAuthor,
    deleteAuthor
}

module.exports = authors;

