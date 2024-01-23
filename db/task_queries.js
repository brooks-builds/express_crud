const db = require('./connection');

async function insertTask(task) {
    const id = await db('tasks').insert(task, 'id');

    return id;
}

async function getAllTasks() {
    return db('tasks').select();
}

async function getTaskById(id) {
    return db('tasks').select().where('id', id).first()
}

async function updateName(id, name) {
    return db('tasks').update({name}).where({id});
}

async function markCompletion(id, completed = false) {
    return db('tasks').update({completed}).where({id})
}

async function deleteTask(id) {
    return db('tasks').delete().where({id});
}

module.exports = {
    insertTask,
    getAllTasks,
    getTaskById,
    updateName,
    markCompletion,
    deleteTask,
};