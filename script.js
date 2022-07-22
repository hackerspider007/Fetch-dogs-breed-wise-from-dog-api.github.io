var breedImage = $("#breed-image");
var dropdown = $("#dog-breeds");
var getImageButtonClicked = false;
var breed;

$.get("https://dog.ceo/api/breeds/list/all", function (data, status) {
/*  dogBreeds object-------->>
{   
    //name of property: property // this is how objects are written in js
    affenpinscher: Array(0),//name of breed(property name) : Array(0) <---(array of the names of sub-breed)
     african: Array(0), 
     airedale: Array(0),
      akita: Array(0), 
     appenzeller: Array(0),

     ....... the list goes on
    }
    
*/
    //here the names of property in dogBreeds object are the names of breeds of dog.
    //each property of dogBreeds object is an array of the sub-breed of the breed.

    let dogBreeds = data.message;
    //boxer: [a b c];
    console.log(dogBreeds);

// here we are using for in loop to traverse over the dogBreeds object to acess all the properties of dogBreeds object
    //this will give us the name of breed 

    for (let breed in dogBreeds) {

        // using template string
        $("#dog-breeds").append(`<option value=${breed}> ${breed}</option>`);

    }



});

$("#dog-breeds").change(function () {

    allowSubmit = false;

});

$("div button").click(function (event) {//handling click on get image button
    

    if (getImageButtonClicked == false) {

        breed = $("#dog-breeds").val();// we are re-assigning the value of breed here. this will return us the 
        //breed = boxer;
        console.log(breed);
      
        displayDog(breed);// here breed is the current breed object that is returned from the
        //server when the api for the selected breed is hit.
        // It is an object that contains the image url and status of the selected dog breed.
        
        getImageButtonClicked = true;//we will change getImageButtonClicked to true because the get image button can only be clicked once for a particular breed.
        //Clicking on it multiple times for the same breed should not make api make api calls again.
        // lets say we click on the 'Get Image' button again without changing the breed then in that case we
        //don't need to make the api call again. So , clicking on the  'Get Image' button again without changing 
        //the breed should not change the image. It will not have any effect and the image will not change.Thats 
        //why we are taking this boolean variable getImageButtonClicked which will tell us wether the get image button 
        //has been clicked or not yet for the current breed. 

    }

});

$("#next a").click(function (event) {//handling click on next button

     event.preventDefault();//using event.preventDefault() to stop the default behaviour of the event .
    //If we do not
    // use preventDefault() here then upon clicking next button it will change the selected breed 
    //to the first breed of the response object
    //i.e affenpinscher automatically and clicking upon the next button will change the layout of the screen 
    //to the default state i.e no image will be dispalyed on the screen . because the breed will not be stored anywhere
    // and when we click on next then we will fetch the selected breed again and when we will try to fetch 
    //the selected breed name the breed will be changed to affenpinscher by default
    //and it will set the selected breed to affenpinscher by default.  

    
        displayDog(breed);


});

function displayDog(breed) {

    let url = "https://dog.ceo/api/breed/" + breed + "/images/random";//url of the api that fetches us a random image of the selected breed
  

        // console.log($("#breed-image img"));
        $("#breed-image img").remove(); // we will remove the curent image and replace it with the next image

    $.get(url, function (data, status) {
       // console.log(data);//this get method will get us a random image of the selected breed.
        // we are replacing the current image with next image here
        let imageUrl = data.message;//imageUrl contains the url of the image of the current breed that is selected


        $("#breed-image").append(`<img src='${imageUrl}' >`);//adding the image of the selected breed on the webpage
        
    });

}
