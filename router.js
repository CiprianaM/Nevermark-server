const router = require ('express').Router();
const {getAllUrls, createNewUrl, deleteUrl} = require ('./controllers/url');

router.get('/urls', getAllUrls);
router.post('/urls', createNewUrl);
router.delete('/urls/:id', deleteUrl);

module.exports = router;