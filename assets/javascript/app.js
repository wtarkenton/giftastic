// Initial array of emotions
$(document).ready(function(){
    var topics = ['Cat', 'Dog', 'Fish', 'Lion', 'Scunk', 'Monkey', 'Hippo'];

    // ========================================================

  //  create topics array buttons
    function buttonAnimal(){
        $('#buttonsView').empty();
        
        for ( var i=0; i < topics.length; i++) {
            //create all buttons
            var a = $('<button>');
            a.addClass('animals');
            a.attr('data-name', topics[i]);
            a.text(topics[i]);
            $('#buttonsView').append(a);
        }
    }    
    buttonAnimal();
   

//on button click
  $(document).on('click', '.animals', function() {

    var animal = $(this).html(); 
    console.log(animal);
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10";
        // console.log(queryURL);
        $.ajax({url: queryURL, method: 'GET'})
        .done(function(response) {
            // grabs the data
            var results = response.data;
            // console.log(results);
            //empties the div before adding more gifs
            $('#animalView').empty();
                //loops through the data
                for ( var j=0; j < results.length; j++) {
                    var imageDiv = $('<div>');
                    var imageView = results[j].images.fixed_height.url;
                    var still = results[j].images.fixed_height_still.url;
                        // console.log(imageView);  
                    var animalImage = $('<img>').attr("src", still).attr('data-animate', imageView).attr('data-still', still);
                    animalImage.attr('data-state', 'still');
                    $('#animalView').prepend(animalImage);
                    animalImage.on('click', playGif);
                    
                    // pulling the rating
                        var rating = results[j].rating;
                            // console.log(rating);
                        var displayRated= $('<p>').text("Rating: " + rating);
                        $('#animalView').prepend(displayRated);
            
                } //for loop
        }); // done response

        function playGif() { 
                    var state = $(this).attr('data-state');
                    console.log(state);
                 if ( state == 'still'){
                     $(this).attr('src', $(this).data('animate'));
                      $(this).attr('data-state', 'animate');
                 } else{
                     $(this).attr('src', $(this).data('still'));
                     $(this).attr('data-state', 'still');
                    }

                } //on click animal
                
    }) // document on click

       


//adding new button
$(document).on('click', '#addAnimal', function(){
    if ($('#animal-input').val().trim() == ''){
      alert('Input can not be left blank');
   }
   else {
    var animal = $('#animal-input').val().trim();
    topics.push(animal);
    $('#animal-input').val('');
    buttonAnimal();
    return false;

    }

});



});  //document ready

