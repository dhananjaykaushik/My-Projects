const Question = require('../../models/question/question');
const Reply = require('../../models/reply/reply');
const Answer = require('../../models/answer/answer');
const ApiSuccessResponse = require('../../models/api/success-response');
const questionBody = require('../../data/question-body');
const answerBody = require('../../data/anwer-body');

const router = require('express').Router();

// Handling question paths
router.get('/', (request, response) => {
    
    // Returning a hard-coded question data
    const question = new Question();
    question.title = 'What is the difference between these mondaic functions?';
    question.votes = 10;
    question.body = questionBody;
    question.createdBy = '007';
    question.creation = 'today';
    question.lastActivity = 'today';
    question.viewCount = 13;
    question.tags = ['haskell', 'monads'];
    const reply1 = new Reply();
    reply1.body = `<code>return []</code> means in the context of a list <code>[[]]</code>, this is necessary for <code>ys</code>, since if we return <code>[]</code>, then <code>ys</code> "does not take a value", hence the result will be an empty list as well.`;
    reply1.createdBy = 'Willem Van Onsem';
    reply1.creation = '45 minutes ago';
    reply1.votes = 2;
    question.replies = [reply1];

    const answer1 = new Answer();
    answer1.body = answerBody;
    answer1.votes = 5;
    answer1.createdBy = 'Willem Van Onsem';
    answer1.creation = '41 minutes ago';
    question.answers = [answer1];
    
    response.send(
        new ApiSuccessResponse(
            200,
            question
        )
    );

});

module.exports = router;