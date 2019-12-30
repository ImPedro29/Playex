const Playlist = require("./schemas/playlists");
const labels = require('../labels');

module.exports = {
    create: (req, res) => {
        let {title, owner, videos} = req.body;
        let {lang} = req.query;
        videos = videos.split(',');

        //Lembrar de tratar quando n tem lingua

        let video = new Playlist(
            {
                title,
                owner,
                videos
            }
        );

        video.save((err, data) => {
            if (err) {
                console.log(err);
                let response = '';
                if (err.code === 11000) response = {message: labels[lang || 'pt_BR'].error.registerSameKeys.replace('$param', Object.keys(err.keyPattern))};
                else if (err) response = {message: labels[lang || 'pt_BR'].error.default};
                res.status(500).json(response);
            } else res.status(201).json({data});
        })
    },
    delete: (req, res) => {
        let {id} = req.params;
        let {lang} = req.query;

        Playlist.findOneAndDelete({_id: id}, (err) => {
            if (err) res.status(500).json({message: labels[lang || 'pt_BR'].error.default});
            // else if(err.message === "not exits")res.json({message: labels[lang || 'pt_BR'].error.failureDeleteNoExists});
            else res.json({message: labels[lang || 'pt_BR'].success})
        })
    },
    get: (req, res) => {
        let {id} = req.params;
        let {lang} = req.query;

        Playlist.findOne({_id: id}, (err, data) => {
            if (err) res.status(500).json({message: labels[lang || 'pt_BR'].error.default});
            else res.json({data});
        })
    },
    update: (req, res) => {
        let {id} = req.params;
        let {lang} = req.query;

        Playlist.findOneAndUpdate({_id: id}, req.body,{ returnOriginal: false }, (err, data) => {
            if (err) res.status(500).json({message: labels[lang || 'pt_BR'].error.default});
            else res.json({data});
        })
    }
};