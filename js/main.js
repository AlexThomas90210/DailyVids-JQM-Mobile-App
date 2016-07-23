/*
* Author: Alex Thomas
* Assignment: WE3WE4.0 Mobile Web Applications, Digital Skills Academy
* Date : 2016/05/16
* Ref:


Functions in this file:
loadData()
onYouTubePlayerAPIReady()
pauseVideoOnPage(page)
preloadYoutubeThumbnails()
changePageTitle( page , title )
getYoutubeIframeSRCFromID( id )
getYoutubeThumbnailImageLinkFromID( id )
$( document ).on( "pagecontainerbeforehide")
$(document).on( "pagecontainershow")
$( document ).on( "pagecontainerbeforeshow")
(window).resize()

*/
//keeping track of what the index of the category the user has selected and also which video he has selected
var state = {
    categoryIndex:0,
    videoIndex:0,
};

//object where the json object of videos will be kept
var data = {};

//populate the data object
function loadData(){
    //getting myJSON from AnimalsJSON.js but could make a ajax call here for the most recent JSON from a server,
    //The JSON tells the app which images to use , I have local images but the idea being those images are on the server
    data = myJSON;
}

//I was having lots of trouble pausing videos when the user navigates away from a page playing a video
//I found this
// REF https://css-tricks.com/play-button-youtube-and-vimeo-api/
// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//youtube api stuff , this is called when its ready
function onYouTubePlayerAPIReady() {
    player = new YT.Player('video');
}

//pause all videos for when a user is changing page to stop the video making noise,gona pause all iframes and just call this function where a page transition occurs
function pauseVideoOnPage(page){
    //didnt really take the exact code btut the .postMessage({}) part
    //REF: http://stackoverflow.com/questions/8667882/how-to-pause-a-youtube-player-when-hiding-the-iframe
    page.find(".iframe")[0].contentWindow.postMessage('{"event":"command","func":"' + 'pauseVideo' + '","args":""}', '*');

}

//preload all images that are dynamicaly added to the dom thoughout the app lifecycle ,
// Kinda heavy on http requests and bandwidth but the thumbnails are small enough images , you can specify the size see getYoutubeThumbnailImageLinkFromID();
// I thought maybe the whole point of making an app like this is to have everything loaded in one go
function preloadYoutubeThumbnails(){
    //iterate over all categories
    data.categories.forEach(function(category){
        // iterate over all videos in the category
        category.videos.forEach(function(video){
            //create an image to with the src so the browser caches the image
            console.log("pre-loading thumbnail image from youtube");
            $('<img/>')[0].src = getYoutubeThumbnailImageLinkFromID(video.youtubeID);
        });
    });
}

//Change title of a page
function changePageTitle(page,title){
    page.find("div[data-role='header'] > h1").html(title);
}

//convert youtube id to iframe src string
function getYoutubeIframeSRCFromID(id){
    return "http://www.youtube.com/embed/" + id + "?rel=0&autoplay=1&showinfo=0&enablejsapi=1&version=3&playerapiid=ytplayer";
}

//youtube provides thumnails for the videos which ill be using when a category is selected just need the correct string for the video Id
function getYoutubeThumbnailImageLinkFromID(id){
    // the "/1" at end of url specifies the size of the image in youtube API , im getting small versions of it since theres not really a need for big ones
    return "http://img.youtube.com/vi/" + id + "/mqdefault.jpg";
}

// I dont understant why the $('#page').on("pagebeforeshow",function(event){} is deprecated and now they want us to use this pagecontainer widget .
// maybe there is something I dont understand but this makes the code all bunched up in a not nice way IMO,
// if it wasnt deprecated I could have seperate .js files for each page as a controller of that page (so all logic to a page is centralised)
//but now I have to have a big handler for each event thats called everytime and then checking which page caused the event.
// this is my frist time using JQM so maybe there's a valid reason why they changed that but I would much prefer the other way.
// it makes me not like JQM and want to look more into those other frameworks you spoke about in the lecture on frameworks.
// I considered adding another framework to the project because of this but as the brief stated JQM i just stuck to pure JQM and its not so bad since I dont have many pages
// I could create all the dynamic content in click events on the buttons that take you to the next page but that doesnt solve the problem of having all logic related to a page in a centalised location so its easier to manage

// App Create
$( document ).on( "pagecontainercreate", $.mobile.pageContainer, function ( e, ui ) {
    // load the json into the data variable
    loadData();
});

// Page Hide
$( document ).on( "pagecontainerhide", $.mobile.pageContainer, function( event, ui ) {
    if ( ui.prevPage.attr("id") === "Video" ){
        videoPage_Hidden();
    }
    if ( ui.prevPage.attr("id") === "Home" ){
        homePage_Hidden();
    }
} );

// Page Before Show
$( document ).on( "pagecontainerbeforeshow", $.mobile.pageContainer, function ( e, ui ) {
    if (ui.toPage.attr('id') === "Category"){
        categoryPage_prepare();
    }
    if (ui.toPage.attr('id') === "Video"){
        videoPage_Prepare();
    }
});


//the following code I took from css tricks to make sure the iframes are always the correct aspect ratio even when theview size changes, I changed a little bit of it
// REF: https://css-tricks.com/NetMag/FluidWidthVideo/Article-FluidWidthVideo.php
// Find all YouTube videos
var $allVideos = $("iframe"),
    // The element that is fluid width
    $fluidEl = $("body");
// Figure out and save aspect ratio for each video
$allVideos.each(function() {
  $(this)
    .data('aspectRatio', this.height / this.width)
    // and remove the hard coded width/height
    .removeAttr('height')
    .removeAttr('width');
});

// When the window is resized
$(window).resize(function() {
  var newWidth = $fluidEl.width();
  // Resize all videos according to their own aspect ratio
  $allVideos.each(function() {
    var $el = $(this);
    $el
      .width(newWidth)
      .height(newWidth * $el.data('aspectRatio'));
  });
});
