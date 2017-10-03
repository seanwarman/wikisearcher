$("document").ready(function()	{

	// $("button").click(function()	{
	button = function()	{

		$("li").detach();


		//have to put the vars inside this click function so they reset each time.
		var infoArr = [];
		var searchStr = "";
		var title = "";

		//this takes the text in the form (id=formEntry) and puts it into searchStr.
		searchStr = document.getElementById("formEntry").value;

		if (searchStr === "")	{
			// alert("Please enter a something to search!")
			alert("Please enter a something to search!");
		} else {
			//then the request is called with searchStr as the search. (don't know why but this doesn't need any
		//formatting for spaces ect. ?).... I tried putting this url into firefox using a search term with spaces
		//and it still works, possibly this is only with firefox, not sure, I'd have to test with other browsers.
			$.ajax	({
				url: "https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=" + searchStr + "&utf8=&format=json",
				type: "GET",
				dataType: "jsonp"
			})

		//now i put 7 search descriptions from the json into an array.
		//and put them into the DOM as list items.
			.done(function(json)	{
				if (json.query.search[0] === undefined)	{
					alert("Wikipedia has no articles for this search!");
					// alert("Wiki has no articles on this search!")
				} else	{
					$("ul").hide();
					for (var i = 0; i < 7; i ++)	{
						title = json.query.search[i].title;
					 	infoArr.push(json.query.search[i].snippet);
						$("ul").append("<a target='_blank' href='https://en.wikipedia.org/wiki/" + title + "'><li><h3>" + title + "</h3>" + infoArr[i] + "...</li></a>");
					}
					//slide the search answers in and push the tile and form up.
					$("ul").show(1000);
					$( "h1" ).animate(
						{
			   				top: 0
						},
							// Duration
							600,
					);
					$( "form" ).animate(
						{
			   				top: 60
						},
							// Duration
							600,
					);
									} //end else
			}) //end .done function
		} //end ajax lookup
	} // end button function
});