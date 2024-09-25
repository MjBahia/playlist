const db = require('../config/db');

const Song = {
    getAll: (callback) => {
        db.query('SELECT * FROM songs', callback);
    },
    add: (songData, callback) => {
        db.query('INSERT INTO songs SET ?', songData, callback);
    },
    delete: (id, callback) => {
        db.query('DELETE FROM `songs` WHERE id = ?', id, callback);
    },
    update: (id, songData, callback) => {
        db.query('UPDATE songs SET ? WHERE id = ?', [songData, id], callback);
    },
    
    getById: (id, callback) => {
        db.query('SELECT * FROM songs WHERE id = ?', [id], callback);
    },
};

module.exports = Song;
