/*
* Author: Alex Thomas
* Assignment: WE3WE4.0 Mobile Web Applications, Digital Skills Academy
* Date : 2016/05/16
* Ref:


Functions in this file
.on( "pagebeforecreate" )
categoryPage_prepare()

*/
$( "#Category" ).on( "pagebeforecreate", function( event, ui ) {
    $(this).find('.thumbnail-grid').on("click","a",function(){
        //set the video index in the state to the custom index attribute of the <a> tag
        state.videoIndex = $(this).data("index");

        //Putting out a console log to make it easier to understant the state
        console.log("state change on video index : " + $(this).data("index"));
        console.log("Video selected is in category : " + state.categoryIndex + " (" + data.categories[state.categoryIndex].name +"). Video : " + state.videoIndex + " (" + data.categories[state.categoryIndex].videos[state.videoIndex].name + ")" );
    });
});


//function to dynamicaly change the catogory page to the selected category , the state.categoryIndex must be corectly set for it to show the correct category
function categoryPage_prepare(){
    page = $('#Category');
    category = data.categories[state.categoryIndex];

    //change the title to selected category
    changePageTitle(page, category.name);

    //show all the episodes in grid style 2 per row
    thumbnailsHTML = "";
    //iterate over all the videos in the selected category
    category.videos.forEach(function(video,i){
        //get variables ready
        imageSRC = getYoutubeThumbnailImageLinkFromID(video.youtubeID);
        name = video.name;
        //for JQM grid with 2 per row I need to state the grid blocks  names in a,b,a,b,a,b,a,b
        //checking if modulas of 2 on i is equal to 0 , if it is then set the grid letter to "a" , which tells to JQM its a new row , else put it to "b" which will add it to the row
        letterForBlock = i % 2 === 0 ? "a" : "b";

        //append HTML to blocks string
        thumbnailsHTML += HTMLVideoRow(name,imageSRC,letterForBlock , i);
    });

    //add the html to the
    page.find('.thumbnail-grid').html(thumbnailsHTML);
}
