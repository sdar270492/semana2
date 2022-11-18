const Post = require('../models/post.model');
const createError = require("http-errors");

module.exports.list = (req, res, next) => {

    Post.find()
        .then(posts => res.status(200).json(posts))
        .catch(next);

}

module.exports.create = (req, res, next) => {

    // const data = { text } = req.body;
    const data = req.body;
    Post.create({
        ...data
    })
        .then(posts => res.status(201).json(posts))
        .catch((error) => {
            res.status(400).json(error);
            next;
        });

}

module.exports.detail = (req, res, next) => {
    Post.findById(req.params.id)
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                next(createError(404, "post not found"));
            }
        })
        .catch(next);
}

module.exports.edit = (req, res, next) => {
    // const data = { text } = req.body;
    const data = req.body;

    Object.assign(req.body, data);

    Post.findByIdAndUpdate(req.params.id, req.body, { useFindAndModify: false })
        .then(post => {
            if (post) {
                res.status(200).json(post);
            } else {
                next(createError(404, "post not found"));
            }
        })
        .catch(next);

}

module.exports.delete = (req, res, next) => {

    Post.findByIdAndDelete(req.params.id)
        .then(post => {
            if (post) {
                res.status(204).json(post);
            } else {
                next(createError(404, "post not found"));
            }
        })
        .catch(next);

}