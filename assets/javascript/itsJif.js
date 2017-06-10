$(document).ready(function(){
	var gifs = ["Shoujo", "Shounen", "Magical Girl", "Fantasy", "Mystery"];
//****************************************************************************

//Create gif buttons 
function buttonExpress(){
	$("#gButtons").empty();

	for (var i = 0; i < gifs.length; i++){
		//create buttons
		var a = $("<button>");
		a.addClass("anime");
		a.attr("data-name", gifs[i]);
		a.text(gifs[i]);
		$("#gButtons").append(a);
		}
	}
buttonExpress();

//on click function

$(document).on("click", ".anime", function() {
	var button = $("data-name").html();
	console.log("data-name");

	var queryURL= "https://api.giphy.com/v1/gifs/search?q=" + button +"&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(queryURL);

	$.ajax({url: queryURL, method: "GET"})
	.done(function(response){
		//grabbing the data
		var results = response.data;
		//gotta empty div before adding more gifs
		$("#Images").empty();
		for ( var g = 0; g < results.length; g++){
			var imageDiv= $("<div>");
			var viewImage = results[g].images.fixed_height.url;
			var still = results[g].images.fixed_height_still.url;
			var k = $("<img>").attr("src", still).attr('data-animate', viewImage).attr('data-still', still);
			k.attr("data-state", "still");
			$("#Images").prepend(k);
			k.on("click", playGif);		
			//creating the rating
			var rating = results[g].rating;
			// console.log(rating);
			var displayRating = $("<p>").text("Rating: " + rating);
			$("#Images").prepend(displayRating);
		}

	});

	function playGif(){
		var state = $("data-name").attr("data-state");
		console.log(state);

	if ( state === "still"){
		$("data-name").attr("src", $("data-name").data('animate'));
		$("data-name").attr('data-state', "animate");
	}
	else{
		$("data-name").attr("src", $("data-name").data("still"));
		$("data-name").attr("data-state", "still");
	}
	}
});


//adding a new button to the prev
$(document).on("click", "#addaButton", function(){
	if($("#anime-input").val().trim() == ""){
		alert("Input must be filled!");
	}
	else{
		var button = $('#anime-input').val().trim();
    gifs.push(button);
    $('#anime-input').val('');
    buttonExpress();
    return false;
	}
});
});
