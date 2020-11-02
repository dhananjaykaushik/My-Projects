// const posts = [
//     { title: 'Post One', posts: 'This is post one' },
//     { title: 'Post Two', posts: 'This is post two' }
// ];

// function getPosts() {
//     setTimeout(
//         () => {
//             let str = '';
//             posts.forEach(
//                 post => {
//                     str += `Post title: ${post.title}\n`;
//                 }
//             );
//             console.log(str);
//         }, 1000
//     );
// }

// function createPost(post, callback) {
//     setTimeout(
//         () => {
//             posts.push(post);
//             callback();
//         }, 2000
//     );
// }

// createPost(
//     { title: 'Post Three', posts: 'This is post three' },
//     getPosts
// );






// function test(func) {
//     console.log('HELLO');
//     func();
// }

// function done() {
//     console.log('DONE');
// }

// test(done);


// XHR ( AJAX )

// 1st api -> function ( 2nd api ) -> function ( 3rd api ) 
// Chaining
// Pyramid of doom
// ES6 ( Promises )

// const promise1 = new Promise(
//     (resolve, reject) => {

//         setTimeout(
//             () => {
//                 // Logic perform
//                 const isError = true;

//                 if (isError) {
//                     reject('Error due to something');
//                 } else {
//                     resolve('Successfully done');
//                 }
//             }, 2000
//         );

//     }
// );

// function responseHandler(msg) {
//     console.log(`Message: ${msg}`);
// }

// async function init() {
//     // Thread block
    // await promise1.then(responseHandler).catch(responseHandler);
//     // console.log('+++++++++++++');
//     const promise2 = 10;
//     const promise3 = Promise.resolve('Resolveddd...');

//     Promise.all([promise1, promise2, promise3]).then(
//         (data) => {
//             console.log(data);
//         }
//     ).catch(
//         err => {
//             console.error(err);
//         }
//     );

// }



// init();








