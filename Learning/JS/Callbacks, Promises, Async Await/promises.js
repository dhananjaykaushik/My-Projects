const posts = [
    { title: 'Post One', posts: 'This is post one' },
    { title: 'Post Two', posts: 'This is post two' }
];

function getPosts() {
    setTimeout(
        () => {
            let str = '';
            posts.forEach(
                post => {
                    str += `Post title: ${post.title}\n`;
                }
            );
            console.log(str);
        }, 1000
    );
}

function createPost(post) {
    return new Promise(
        (resolve, reject) => {
            setTimeout(
                () => {
                    posts.push(post);

                    // Some error checking....
                    const error = false;

                    if (!error) {
                        resolve();
                    } else {
                        reject('Error while creating post.');
                    }
                }, 2000
            );

        }
    );
}

// createPost(
//     { title: 'Post Three', posts: 'This is post three' }
// ).then(
//     () => {
//         console.log('THEN');
//         getPosts();
//     }
// ).catch(
//     (err) => {
//         console.log(err);
//     }
// );

// createPost(
//     { title: 'Post Three', posts: 'This is post three' }
// ).then(getPosts);

async function init() {
    await createPost(
        { title: 'Post Three', posts: 'This is post three' }
    );
    getPosts();
}
init();

// const promise1 = Promise.resolve('HELLO RESOLVED');
// const promise2 = 10;
// const promise3 = new Promise(
//     (resolve, reject) => {
//         setTimeout(resolve, 2000, 'HELLO RESOLVED AGAIN');
//     }
// );

// Promise.all([promise1, promise2, promise3]).then(
//     values => {
//         console.log(values);
//     }
// );