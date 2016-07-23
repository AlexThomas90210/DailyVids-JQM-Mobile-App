/*
* Author: Alex Thomas
* Assignment: WE3WE4.0 Mobile Web Applications, Digital Skills Academy
* Date : 2016/05/16
* Ref:

Functions in this file
videoPage_Prepare()
videoPage_Hidden()
*/
//I set this variable to true if a video is clicked from the home page , was using data-rel and getting weird bugs I didnt understand 1 hour before submition deadline so doing this way instead as quick hack
var videoPage_fromHomePageBackHREF = false;

function videoPage_Prepare(){
    page = $("#Video");
    name = data.categories[state.categoryIndex].videos[state.videoIndex].name;
    youtubeSRCString = getYoutubeIframeSRCFromID(data.categories[state.categoryIndex].videos[state.videoIndex].youtubeID);

    //set video name
    page.find(".video-name").html(name);
    //set iframe src
    page.find("iframe").attr("src" , youtubeSRCString );
    //set backbutton href, use the variable that keeps track of it
    href = videoPage_fromHomePageBackHREF === true ? "Home" : "Category";
    $('#BuggyBackButton').attr("href" , "#"+href);
}

function videoPage_Hidden(){
    pauseVideoOnPage($("#Video"));
    videoPage_fromHomePageBackHREF = false;
    page.find("iframe").attr("src" , "");
}
