const router = require('express').Router();
const ApiSuccessResponse = require('../../models/api/success-response');
const ApiErrorResponse = require('../../models/api/error-response');

router.post('/', (request, response) => {
    const email = request.body ? request.body.email : null;
    const password = request.body ? request.body.password : null;

    if (email && password && email === 'john@gmail.com' && password === 'password@12345') {
        response.send(new ApiSuccessResponse(200, { authorized: true }));
    } else {
        response.send(new ApiErrorResponse(401, 'ErrorReff001', 'Invalid email or password'));
    }
});

module.exports = router;