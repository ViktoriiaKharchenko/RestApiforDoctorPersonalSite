const Question = require('../models/Question-model')

const createQuestion = (req, res, err) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Question',
        })
    }

    var question = new Question(body)

    if (!question) {
        return res.status(400).json({ success: false, error: err })
    }

    question
        .save()
        .then(() => {
            return res.status(201).json({
                success: true,
                id: question._id,
                message: 'Question created!',
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Question not created!',
            })
        })
}

const updateQuestion = async (req, res) => {
    const body = req.body

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Question.findOne({ _id: req.params.id }, (err, Question) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Question not found!',
            })
        }
        Question.title = body.title
        Question.text = body.text
        Question.name = body.name
        Question.age = body.age
        Question.answer = body.answer

        Question
            .save()
            .then(() => {
                return res.status(200).json({
                    success: true,
                    id: Question._id,
                    message: 'Question updated!',
                })
            })
            .catch(error => {
                return res.status(404).json({
                    error,
                    message: 'Question not updated!',
                })
            })
    })
}

const deleteQuestion = async (req, res) => {
    await Question.findOneAndDelete({ _id: req.params.id }, (err, Question) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (!Question) {
            return res
                .status(404)
                .json({ success: false, error: `Question not found` })
        }

        return res.status(200).json({ success: true, data: Question })
    }).catch(err => console.log(err))
}

const getQuestionById = async (req, res) => {
    await Question.findOne({ _id: req.params.id }, (err, Question) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: Question })
    }).catch(err => console.log(err))
}

const getQuestions = async (req, res) => {
    await Question.find({questionId: null}, (err, Questions) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!Questions.length) {
            return res
                .status(404)
                .json({ success: false, error: `Question not found` })
        }
        return res.status(200).json({ success: true, data: Questions })
    }).catch(err => console.log(err))
}

module.exports = {
    createQuestion,
    updateQuestion,
    deleteQuestion,
    getQuestions,
    getQuestionById,
}
