const pool = require('../config/db_pgsql');
const queries = require('../queries/entries.queries') // Queries SQL


//GET
const getEntriesByEmail = async (email) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getEntriesByEmail, [email])
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//GET
const getAllEntries = async () => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.getAllEntries)
        result = data.rows
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
        return result
    }
}

// CREATE
const createEntry = async (entry) => {
    const { title, content, email, category } = entry;
    let client, result;
    try {
        client = await pool.connect(); //Espera a abrir la conexión
        const data = await client.query(queries.createEntry, [title, content, email, category])
        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

// UPDATE
const updateEntry = async (title, newContent, newDate, newTitle, newCategory) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.updateEntry, [title, newContent, newDate, newTitle, newCategory])

        result = data.rowCount
    } catch (err) {
        console.log(err);
        throw err;
    } finally {
        client.release();
    }
    return result
}

//DELETE
const deleteEntry = async (title) => {
    let client, result;
    try {
        client = await pool.connect();
        const data = await client.query(queries.deleteEntry, [title])
        result = data.rowCount
    } catch (err) {
        console.log(err)
        throw err;
    } finally {
        client.release();
    }
    return result
}

const entries = {
    getEntriesByEmail,
    getAllEntries,
    createEntry,
    updateEntry,
    deleteEntry
}

module.exports = entries;