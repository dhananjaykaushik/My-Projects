const SERVER_URL = 'http://localhost:3000';

const articleContainer = document.getElementById('article-container');
const newArticleButton = document.getElementById('new-article');
const updateArticleButton = document.getElementById('update-article');


const readArticleContainer = document.getElementById('read-article-container');
const readArticleHeading = document.getElementById('read-article-heading');

let articleUnderUpdation = null;

async function getArticles() {

    articleContainer.innerHTML = '';

    const articlesRes = await (await fetch(`${SERVER_URL}/articles`)).json();
    const articles = articlesRes.response;
    articles.forEach(
        article => populateArticle(article)
    );
}

const populateArticle = (article) => {
    const articleDiv = document.createElement('div');
    articleDiv.className = 'card w-100';
    const articleBodyDiv = document.createElement('div');
    articleBodyDiv.className = 'card-body';

    const articleTitle = document.createElement('h4');
    articleTitle.className = 'card-title';
    articleTitle.innerText = article.name;

    const articleText = document.createElement('p');
    articleText.className = 'card-text';
    articleText.innerText = article.shortDescription;
    articleText.innerHTML += `
    <br>
    <strong>${new Date(article.creationDate).toLocaleDateString()}</strong>
    `;


    const buttonReadMore = document.createElement('a');
    buttonReadMore.className = 'btn btn-primary';
    buttonReadMore.innerText = 'Read More';
    buttonReadMore.href = '#';
    buttonReadMore.setAttribute('data-toggle', 'modal');
    buttonReadMore.setAttribute('data-target', '#readArticleModal');
    buttonReadMore.onclick = () => {
        readArticle(article)
    };
    
    const buttonEdit = document.createElement('a');
    buttonEdit.className = 'btn btn-warning';
    buttonEdit.innerText = 'Edit';
    buttonEdit.href = '#';
    buttonEdit.setAttribute('data-toggle', 'modal');
    buttonEdit.setAttribute('data-target', '#updateFormModal');
    buttonEdit.onclick = () => {
        articleUnderUpdation = article;
        $('#updateBlogTitle').val(articleUnderUpdation.name);
        $('#updateBlogDescription').val(articleUnderUpdation.shortDescription);
        $('#updateBlogMarkdown').val(articleUnderUpdation.markdown);
    };

    const buttonDelete = document.createElement('a');
    buttonDelete.className = 'btn btn-danger';
    buttonDelete.innerText = 'Delete';
    buttonDelete.href = '#';
    buttonDelete.onclick = () => {
        deleteArticle(article)
    };

    articleBodyDiv.appendChild(articleTitle);
    articleBodyDiv.appendChild(articleText);
    articleBodyDiv.appendChild(buttonReadMore);
    articleBodyDiv.appendChild(buttonEdit);
    articleBodyDiv.appendChild(buttonDelete);

    articleDiv.appendChild(articleBodyDiv);

    articleContainer.appendChild(articleDiv);
};


const editArticle = async (event) => {
    const updateBlogTitle = $('#updateBlogTitle').val();
    const updateBlogDescription = $('#updateBlogDescription').val();
    const updateBlogMarkdown = $('#updateBlogMarkdown').val();

    const reqBody = {
        id: articleUnderUpdation._id,
        title: updateBlogTitle,
        description: updateBlogDescription,
        markdown: updateBlogMarkdown
    };

    const response = await (await fetch(`${SERVER_URL}/articles/update`, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })).json();

    getArticles();
};

const deleteArticle = async (article) => {
    const reqBody = {
        id: article._id
    };
    const response = await(await fetch(`${SERVER_URL}/articles/delete`, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })).json();
    getArticles();
};

const readArticle = (article) => {
    readArticleHeading.innerHTML = article.name;
    const mardownConverter = new showdown.Converter();
    readArticleContainer.innerHTML = mardownConverter.makeHtml(article.markdown);  
};


const newArticle = async () => {
    const createBlogTitle = $('#createBlogTitle').val();
    const createBlogDescription = $('#createBlogDescription').val();
    const createBlogMarkdown = $('#createBlogMarkdown').val();

    const reqBody = {
        title: createBlogTitle,
        description: createBlogDescription,
        markdown: createBlogMarkdown
    };

    const response = await (await fetch(`${SERVER_URL}/articles/create`, {
        method: 'POST',
        body: JSON.stringify(reqBody),
        headers: {
            'Content-Type': 'application/json'
        },
    })).json();
    getArticles();
}

newArticleButton.onclick = newArticle;
updateArticleButton.onclick = editArticle;
getArticles();