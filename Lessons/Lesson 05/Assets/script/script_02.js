
const CONTAINER = document.getElementById('container')

fetch('./assets/data/MOCK_DATA.json') // get the data from an external source, explain that my file is a json file
  .then(response => response.json()) // parse/convert the data in JavaScript format
  .then(data => displayData(data)) // dispay the data in the console 
  .catch(error => displayError(error))

  function displayData(data){
    console.log(data)

    const FILTERED = data.filter((obj)=> obj.age > 20 && obj.age<39)
    console.log(FILTERED.length)

    const SORT = FILTERED.sort((a,b) => b.age - a.age)

    for(let person of SORT){

        const PERSON_BOX = document.createElement('li') 
        const PERSON_INFO = document.createElement('div')
        const PERSON_BAR = document.createElement('div')


        PERSON_INFO.textContent = `${person.first_name} ${person.last_name} ${person.age} ${person.age}  ${person.gender}`

        const BAR_WIDTH = person.age*5; 
        PERSON_BAR.style.width = `${person.age}px`
        PERSON_BAR.className='bar'

        let BAR_COLOR = "gray "
        if (person.grnder == 'Male'){
            BAR_COLOR='BLUE'

         }

         else if (person.gender =='Female'){
                    BAR_COLOR='pink'

                }

         else{ 
                    BAR_COLOR='Orage'
          }

          PERSON_BAR.style.backgroundColor = BAR_COLOR;

        PERSON_BOX.appendChild(PERSON_INFO)
        PERSON_BOX.appendChild(PERSON_BAR)
        
        CONTAINER.appendChild(PERSON_BOX)
    }


  }

  function displayError(error) {
    console.log(error)
  }