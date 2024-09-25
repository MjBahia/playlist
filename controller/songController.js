const Song = require('../models/song');

const songsController = {
    index: (req, res) => {
        Song.getAll((err, results) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.render('index', { songs: results });
        });
    },
    add: (req, res) => {
        res.render('add');
    },
    create: (req, res) => {
        const { title, artist } = req.body;
        const newSong = {
            title,
            artist,
            filename: req.file.filename // Get the uploaded file's filename
        };
        Song.add(newSong, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    delete: (req, res) => {
        const { id } = req.params; // Correctly fetch the ID from URL params
        Song.delete(id, (err) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.redirect('/');
        });
    },
    update: (req, res) => {
        const { title, artist } = req.body;
        const { id } = req.params;
    
        // Prepare the data to be updated
        const updatedSong = {
            title,
            artist,
            filename: req.file ? req.file.filename : null // New file only if uploaded
        };
    
        // Fetch current song to retain filename if no new file is uploaded
        Song.getById(id, (err, existingSong) => {
            if (err) {
                return res.status(500).send(err);
            }
    
            // If no new file uploaded, keep the existing filename
            if (!updatedSong.filename) {
                updatedSong.filename = existingSong.filename;
            }
    
            console.log("Updating song:", updatedSong); // Debug log
    
            // Proceed to update the song with the complete data
            Song.update(id, updatedSong, (err) => {
                if (err) {
                    return res.status(500).send(err);
                }
                res.redirect('/'); // Redirect back to the playlist
            });
        });
    },
    
    
    
    
    edit: (req, res) => {
        const { id } = req.params;
        Song.getById(id, (err, song) => {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            if (!song) {
                return res.status(404).send("Song not found");
            }
            res.render('edit', { song }); // Here you pass the song object to the view
        });
    },
    

    
};

module.exports = songsController;
