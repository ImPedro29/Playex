const Video = require("./schemas/videos");
const labels = require('../labels');
const fs = require('fs');

// const storage = GoogleCloudStorage({
//     projectId: '695398308072',
//     keyFilename: 'AIzaSyAubs7NI6fOigCOzTMPVWGXXz7sCxUradI',
// });

module.exports = {
    create: async (req, res) => {
        let {owner} = req.body;
        let {lang} = req.query;

        //Lembrar de tratar quando n tem lingua

        let responseError = false;
        let data = [];

        if(!req.files) res.status(405).json({message: labels[lang || 'pt_BR'].error.noFiles});

        for (let file of req.files.video) {
            if (file.size < 2000000000) {

                let {mimetype, name, size} = file;

                let video = new Video(
                    {
                        title: name,
                        owner,
                        size,
                        mimetype
                    }
                );

                let response = await new Promise(((resolve, reject) => {
                    video.save((err, obj) => {
                        if (err) {
                            if (err.name === 'ValidatorError') responseError = {message: labels[lang || 'pt_BR'].error.registerSameKeys.replace('$param', 'Owner')};
                            else responseError = {message: labels[lang || 'pt_BR'].error.default};
                            console.log(err);
                            reject(responseError);
                        } else{
                            resolve(obj);
                        }
                    });
                }));

                await new Promise(((resolve, reject) => {
                    fs.writeFile('../Playex/tmp/' + response._id, file.data, function (err) {
                        if (err) reject(err);
                        else resolve();
                    });
                }));

                data.push(response);

            } else {
                responseError = {message: labels[lang || 'pt_BR'].error.videoSizeError.replace('$param', '2')};
            }
        }

        if (responseError) res.status(500).json(responseError);
        else res.status(201).json({data});
    },
    delete: (req, res) => {
        let {id} = req.params;
        let {lang} = req.query;

        Video.findOneAndDelete({_id: id}, (err) => {
            if (err) res.status(500).json({message: labels[lang || 'pt_BR'].error.default});
            // else if(err.message === "not exits")res.json({message: labels[lang || 'pt_BR'].error.failureDeleteNoExists});
            else res.json({message: labels[lang || 'pt_BR'].success})
        })
    },
    get: (req, res) => {
        let {id} = req.params;
        let {lang} = req.query;

        Video.findOne({_id: id}, (err, data) => {
            if (err) res.status(500).json({message: labels[lang || 'pt_BR'].error.default});
            else res.json({data});
        })
    },
    update: (req, res) => {
        let {id} = req.params;
        let {lang} = req.query;

        Video.findOneAndUpdate({_id: id}, req.body,{ returnOriginal: false }, (err, data) => {
            if (err) res.status(500).json({message: labels[lang || 'pt_BR'].error.default});
            else res.json({data});
        })
    }
};