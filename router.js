const router = require ('express').Router();
const {getAllUrls, createNewUrl, deleteUrl} = require ('./controllers/url');
const addNewRecord = require('./elasticControllers/addOne');

// router.get('', 'future search query');
router.post('', addNewRecord);
router.delete('/urls/:id', deleteUrl);

module.exports = router;