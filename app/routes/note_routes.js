const ObjectID = require('mongodb').ObjectID;
const env = process.env.NODE_ENV || 'dev';

module.exports = function(app) {

    app.get('/', (req, res) => {
        res.render('index.ejs', { mode: env });
    });

    app.get('/note', (req, res) => {
        if (!req.xhr) {
            return res.sendStatus(404);
        }
        let db = req.db;
        return db.collection('notes').find().sort({_id: -1}).limit(30).toArray((err, result) => {
            if (err)  {
                return res.status(400).send({error: err});
            }
            res.send(result);
        })
    });

    app.get('/note/new', (req, res) => {
        res.render('index.ejs', { mode: env });
    });


    app.get('/note/:id', (req, res) => {
        if (!req.xhr) {
            res.render('index.ejs', { mode: env });
        } else {
            let db = req.db;
            const noteId = req.params.id;
            const details = { '_id': new ObjectID(noteId) };
            db.collection('notes').findOne(details, (err, item) => {
                if (!item || err) {
                    res.status(404).send({ error: "This note doesn't exist or has been deleted"});
                } else {
                    res.send(item);
                }
            });
        }
    });

    app.post('/note', (req, res) => {
        let db = req.db;

        const note = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            surname: req.body.surname,
            status: req.body.status,
        };

        db.collection('notes').insert(note, (err, result) => {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                res.send(result.ops[0]);
            }
        });
    });



    app.delete('/note/:id', (req, res) => {
        let db = req.db;
        const noteId = req.params.id;
        const details = { '_id': new ObjectID(noteId) };

        db.collection('notes').remove(details, (err) => {
            if (err) {
                res.send({'error': 'An error has occurred'})
            }  else {
                res.send({'success': `Note ${noteId} has been deleted! :'(`})
            }
        });
    });


    app.put('/note/:id', (req, res) => {
        let db = req.db;
        const noteId = req.params.id;
        const details = { '_id': new ObjectID(noteId) };

        const note = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            surname: req.body.surname,
            status: req.body.status,
        };

        db.collection('notes').update(details, note, (err, result) => {
            if (err) {
                res.send({'error': 'some error'})
            }  else {
                res.send(note);
            }
        });
    });

};