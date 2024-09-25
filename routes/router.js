const express = require('express');
const multer = require('multer');
const router = express.Router();
const songsController = require('../controller/songController');

// Setup for file storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/audio'); // Adjust the path as necessary
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // Save file with the original name
    }
});

const upload = multer({ storage: storage });

router.get('/', songsController.index);
router.get('/add', songsController.add);
router.post('/add', upload.single('audioFile'), songsController.create);
router.get('/edit/:id', songsController.edit); // Get route for 
router.post('/edit/:id', upload.single('audioFile'), songsController.update); // Post route for updating
router.post('/delete/:id', songsController.delete);

module.exports = router;
