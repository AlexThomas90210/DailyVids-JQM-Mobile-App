The app is a list of youtube videos related to a theme , the idea is that everyday is a new theme like eg Sports highlights or Car racing or Soccer Goals.
The user would open the app and see the theme an be able to browse/search all the videos for that day.
The theme i picked here is funny animal videos so all the JSON is related to that.


(This bug is fixed , leaving it here just incase you wonder why im not using data-rel="back", had to remove it and keep track if the video page was displayed from home page search or category page)
Bug I could not figure out
1. Back button on video page (think it has to do with iframe loading youtube stuff or something just guessing have )
 On the video page ,The first time you open the video page its fine. the second time you open it , the back button needs to be clicked twice.
 unless you refresh the whole app again.

 like 1/10 times it screws up the whole navigation ,you press back and it takes you to a video you opened that you had already closed, its like its creating new pages or something,
 when it does that all the transitions before inverted..
 Im using the data-rel="back"
