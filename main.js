const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

const userlikeid = []

function getProfile(profile) {
    if (profile.image) {
        return `<img class="profile-pic" src="${profile.image}" alt="${profile.name}">`
    }
    else{
        let initials = profile.name.split(' ').reduce((acc,value)=> {
            return acc + value.charAt(0)
        },'')
        return `
            <div class="profile-pic-default">
            <span>${initials}</span>
            </div>
        `;
    }
}

function formateDate(createdat) {
    const d = new Date(createdat)
    let formattedDate = d.toLocaleDateString('it-IT')
    console.log(formattedDate);
    return formattedDate
}

// main function generate html
    const father = document.getElementById('container')
    let value;
    posts.forEach((value, index) => {
    let post = document.createElement('div')
    post.className = "post"
    post.setAttribute('id', `${value.id}`)
    post.innerHTML = 
    `<div class="post__header">
    <div class="post-meta">                    
        <div class="post-meta__icon">
            ${getProfile(value.author)}                   
        </div>
        <div class="post-meta__data">
            <div class="post-meta__author">${value.author.name}</div>
            <div class="post-meta__time">${formateDate(value.created)}</div>
        </div>                    
    </div>
   </div>
   <div class="post__text">${value.content}</div>
   <div class="post__image">
    <img src="${value.media}" alt="foto post ${value.id}">
   </div>
   <div class="post__footer">
    <div class="likes js-likes">
        <div class="likes__cta">
            <a class="lk like-button  js-like-button" href="" data-postid="${value.id}">
                <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                <span class="like-button__label">Mi Piace</span>
            </a>
        </div>
        <div class="likes__counter">
            Piace a <b id="like-counter-${value.id}" class="js-likes-counter">${value.likes}</b> persone
        </div>
    </div> 
   </div>`
    father.append(post);
});
    
const likebtn = document.querySelectorAll('.like-button');
likebtn.forEach((el,i) => {
    el.addEventListener('click' , function(e){
        // evito href dell'ancora
        e.preventDefault();
        // aggiungo 7rimuovo classe button liked green
        el.classList.toggle('like-button--liked');
        // recupero dal dataset intero l'id del likebutton premuto
        const postId = parseInt(el.dataset.postid)
        // prendo l'elemento che contiene il numero likes
        const likes = document.getElementById('like-counter-'+postId)
        console.log(likes);

        // recupero dall'array dei post l'indice corrente
        const postindex = posts.findIndex((value) => {
            return value.id === postId;
        })
        console.log('indice' , postindex);

        if (postindex === -1) return;

        // recupero dall'array dei post piaciuti l'indice dell'id
        const likeIndex = userlikeid.indexOf(postId);

        // trovo l'indice decremento il like e rimuovo l'indice dall'array
        if (likeIndex !== -1) {
            posts[postindex].likes -= 1;
            userlikeid.splice(likeIndex, 1)
        }
        // viceversa non trovo l'id incremento i like e aggiungo l'id all array
        else{
            posts[postindex].likes += 1;
            userlikeid.push(postId)
        }
        // inserisco il nuovo valore like
        likes.innerHTML = posts[postindex].likes
    })       
});

