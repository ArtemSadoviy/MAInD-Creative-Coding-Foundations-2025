// console.log('ciao')

// const HOBBIES =["judo", "boxe", "cycling"]

// console.log(HOBBIES)

// const PERSON ={
//     name:"Sasha", 
//     lastname:"Bravo", 
//     hobbies: HOBBIES
// }
// console.log(PERSON)

// console.log(PERSON.name)
// console.log(PERSON.hobbies)

// const CONTAINER = document.getElementById('container')




// for (hobby of PERSON.hobbies){
//     const ITEM = document.createElement('li'); 
//     ITEM.textContent=hobby; 
//     ITEM.innerHTML = hobby;  // inside this property you can include other span, div, etc. in case of text content you can only add the text. 
//     console.log(hobby);
//     CONTAINER.appendChild(ITEM); 
// }

const CONTAINER = document.getElementById('contaner')
fetch('./assets/data/data.json') // get the data from an external source, explain that my file is a json file
  .then(response => response.json()) // parse/convert the data in JavaScript format
  .then(data => console.log(data)) // dispay the data in the console 
  .catch(error => console.error('Error:', error)) // display an error if the data cannot be loaded
  .catch(error => displayError(error))
 

  function display(data){
    console.log(data)



    for (hobby of data.hobbies){

        counter += 1
        const ITEM = document.createELement('li')
        ITEM.textContent=`*** ${hobby}`  // i have two strings plus the data coming from json.
        CONTAINER.appendCHild(ITEM)
    }
    }

    function displayError(error){
        console.log(error)
    }

  