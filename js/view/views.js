/*
* Author: Alex Thomas
* Assignment: WE3WE4.0 Mobile Web Applications, Digital Skills Academy
* Date : 2016/05/16
* Ref:


Functions in this file
HTMLCategoryRow(name,img,count)
HTMLVideoRow(name , imageSRC , letterForBlock , index)
HTMLSearch(categoryNumber , videoNumber , imgSRC , name)

*/
//view functions are all in this file
// for my dynamic views im only adding li's and not the whole ul so I can put the click handler on the ul to change the model of the selected li with event bubbling

//create category row li
function HTMLCategoryRow(name,img,count){
        html =  '<li><a href="#Category" data-transition="slide">' +
                    '<img src="' + img + '">' +
                    '<h3>' + name + '</h3> ' +
                    '<span class="ui-li-count">' + count + '</span></a>' +
                '</li>';
        return html;
}

//create thumbnail row li
function HTMLVideoRow(name , imageSRC , letterForBlock , index){
    html = '<div class="ui-block-' + letterForBlock + ' thumnail-grid__thumbnail" >'+
                '<a href="#Video" data-transition="slideup" data-index="'+index+'">' +
                    '<img src="'+ imageSRC +'" class = thumnail-grid__image alt="Thumbnail">' +
                    '<h5>'+ name +'</h5>' +
                '</a>'+
            '</div>' ;
    return html;
}

function HTMLSearch(categoryNumber , videoNumber , imgSRC , name){
    html =  '<a href="#Video" data-category="' + categoryNumber + '" data-video="' + videoNumber +'"  data-transition="slideup" data-filter="true" data-input="#search-input"> ' +
                    '<div class="search">' +
                        '<img class="search__image" src="' + imgSRC +'" alt="cats">' +
                        '<h6 class="search__name" >' + name +'</h6>' +
                    '</div>' +
                '</a>';
    return html;
}
