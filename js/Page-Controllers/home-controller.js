/*
* Author: Alex Thomas
* Assignment: WE3WE4.0 Mobile Web Applications, Digital Skills Academy
* Date : 2016/05/16
* Ref:

Functions in this file
.on("pagebeforecreate")
 homePage_Hidden()
*/

//the home page displays the video of the day and all the categories of videos for the day
$( "#Home" ).on( "pagebeforecreate", function( event, ui ) {

    //need to call (window).resize to fit the iframes to full width as there is a function that is attached that to handle it and i found it would be few pixels off not sure why I think its because jquery is doing stuff so need to call it after page create
    $(window).resize();

    //set todays featured video in the iframe
    $(this).find('iframe').attr("src" , getYoutubeIframeSRCFromID(data.featureVideo.youtubeID));

    //set todays theme
    $(this).find(".today-theme").html("Todays Theme : " + data.theme);

    //create the rows of categories
    rows = "";
    data.categories.forEach(function(category){
        //prepare variables
        name = category.name;
        imageLink = category.image;
        count = category.videos.length;

        //create the category row HTML and append it to rows string
        rows += HTMLCategoryRow( name , imageLink , count );
    });
    //add the HTML to the UL
    $(this).find('.category-list').html(rows)
                                    //add the click event onto the UL so it recieves any clicks done on the <li>
                                    .on("click","li",function(){
                                        console.log("state change on category index : " +  $(this).index());
                                        //set the state of the catogoryIndex to the index of the clicked <li>
                                        state.categoryIndex = $(this).index();
                                    });

    //create the search page rows from all the videos
    searchHTML = "";
    //iterate over all categories
    data.categories.forEach(function(category,categoryIndex){
        //iterate over all categories
        category.videos.forEach(function(video,videoIndex){
            //prepare variables
            name = video.name;
            imgSRC = getYoutubeThumbnailImageLinkFromID(video.youtubeID);

            //add html to searchHTML
            searchHTML += HTMLSearch(categoryIndex , videoIndex , imgSRC , name);
        });
    });
    //add the html to th search videos div and add a click event so we can keep track of what the selected video is
    $(this).find('#search-videos').html(searchHTML)
                                       .on("click" , "a" , function(){
                                           state.categoryIndex = $(this).data("category");
                                           state.videoIndex = $(this).data("video");

                                           //to fix a bug I was getting with im setting this variable to keep track of where we came from on video page
                                           videoPage_fromHomePageBackHREF = true;
                                       });
});

function homePage_Hidden(){
    pauseVideoOnPage($( "#Home" ));
}
