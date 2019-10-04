let currentPage = 1;


document.querySelector(`#searchbutton`).addEventListener(`click`, async () => {

    let footer = document.querySelector(`.currentpage`)
    footer.innerHTML = currentPage
    
    let images = await getImages();
    
    
    updateUI(images);

    
});

document.querySelector(`#searchbar`).addEventListener(`keyup`, function(event) {

    if (event.keyCode === 13) {
        
        event.preventDefault();
        
        document.getElementById(`searchbutton`).click();
    }

    
});


document.querySelector(`button#next`).addEventListener(`click`, async () => {


    currentPage++;

    let footer = document.querySelector(`.currentpage`)
    footer.innerHTML = currentPage
     
     let images = await getImages();
     
     
     updateUI(images);

});


document.querySelector(`button#prev`).addEventListener(`click`, async () => {

if(currentPage==1) {currentPage + 0} else {currentPage--;

    let footer = document.querySelector(`.currentpage`)
    footer.innerHTML = currentPage}
    

    let images = await getImages();
       
        
    updateUI(images);

});


async function getImages(){

    const apiKey = `2af54aca22ccb9c902078adc64b47907`;
    let method = `flickr.photos.search`;
    let text = document.querySelector(`#searchbar`).value
    let pages = document.querySelector(`#picperpage`).value
    const baseUrl = `https://api.flickr.com/services/rest`;
    let contentType = document.querySelector(`#contenttype`).value

    let url = `${baseUrl}?api_key=${apiKey}&method=${method}&text=${text}&per_page=${pages}&content_type=${contentType}&page=${currentPage}&format=json&nojsoncallback=1`;

    try {
    
        let resp = await fetch(url);
        let data = await resp.json();

        return await data;
    }


    catch(err) {
        console.error(err)
    }
}


function imgUrl(img, size){
    
    let imgSize = `z`
    if(size == `thumb`) { imgSize = `q`}
    if(size == `large`) { imgSize = `b`}

    url = `https://farm${img.farm}.staticflickr.com/${img.server}/${img.id}_${img.secret}_${imgSize}.jpg`;
    
    return url;
    
}


function updateUI(data){

    let main = document.querySelector(`main`);
    main.innerHTML = ``;

    data.photos.photo.forEach(img => {

        if(img.farm !== 0){

        let el = document.createElement(`img`);
        el.setAttribute(`src`, imgUrl(img, `thumb`));
        el.setAttribute(`alt`, img.title);

        el.addEventListener(`click`, () => {
           
           lightbox(img.title, imgUrl(img, `large`)) 
           
        })

        main.appendChild(el);

        }    
    });
}


function lightbox(title, url){
    
    let el = document.querySelector(`.overlay img`);
    el.setAttribute('src', url);
    el.setAttribute('alt', title);

    
    document.querySelector(`.overlay`).classList.add(`show`);

        document.querySelector(`.overlay`).addEventListener(`click`, () => {

            document.querySelector(`.overlay`).classList.remove(`show`);
        
        })
}