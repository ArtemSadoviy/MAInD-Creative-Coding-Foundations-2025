// buttons
const addButton = document.getElementById('add-btn'); 
const listButton = document.getElementById('list-view-btn'); 
const cardButton = document.getElementById('card-view-btn');
const labelColorBox = document.getElementById('label-and-color-input'); 


// elementns 
const animalInput = document.getElementById('animal-input'); 
const animalList = document.getElementById('animal-list-container'); 
const headerPicker = document.getElementById('color-input');


document.body.classList.toggle('list-view-mode', animalList.classList.contains('list-view'));

// event listeners 

// LIST VIEW
listButton.addEventListener('click', () => {
    console.log('List button pressed');

    animalList.classList.remove('card-view');
    animalList.classList.add('list-view');
    document.body.classList.add('list-view-mode');

    //remove color background when there is a change between card-view and list-view 
    animalList.querySelectorAll('.li-and-delete-button > li')
      .forEach(li => { li.style.backgroundColor = ''; });
  });
  
  // CARD VIEW
cardButton.addEventListener('click', () => {
    console.log('card button pressed');

    animalList.classList.remove('list-view');
    animalList.classList.add('card-view');
    document.body.classList.remove('list-view-mode');
    animalList.style.backgroundColor = ''; 
  });

  // remove an element when the X button is clicked.
document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      btn.parentElement.remove(); 
    });
  });

// Add
addButton.addEventListener('click', () => {
    const inputValue = animalInput.value.trim();
    if (!inputValue) return;

    //create a new container 
    const container = document.createElement('div');
    container.className = 'li-and-delete-button';
  
    //create a li with the name of an animal
    const listElement = document.createElement('li');
    listElement.textContent = inputValue;

    //the selected color is applied in card view and it is not need in list-view
    if (animalList.classList.contains('card-view')) {
    listElement.style.backgroundColor = headerPicker?.value || '';
    } else {
    listElement.style.backgroundColor = '';
    }

    //create X botton in order to remove an animal 
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.type = 'button';
    deleteBtn.textContent = 'X';
    deleteBtn.addEventListener('click', () => container.remove());

    //color picker for each card 
    const picker = document.createElement('input');
    picker.type = 'color';
    picker.className = 'color-picker';
    picker.hidden = true;

   //emoji button for the color 
    const colorBtn = document.createElement('button');
    colorBtn.className = 'color-btn';
    colorBtn.type = 'button';
    colorBtn.innerHTML = '&#127912;';

    container.append(listElement, deleteBtn, picker, colorBtn);
    animalList.appendChild(container);
  
    //clean the input 
    animalInput.value = '';
  });
  


animalList.addEventListener('click', (event) => {
  //color can be changed when i am in card view 
    if (!animalList.classList.contains('card-view')) return;
  
    // the cliicked element is the button
    const btn = event.target.closest('.color-btn');
    if (!btn) return;
  
    const row = btn.closest('.li-and-delete-button');
    const picker = row.querySelector('.color-picker');
    const li = row.querySelector('li');
    if (!picker || !li) return;
  
    const rgb = getComputedStyle(li).backgroundColor;
    
    // here I asked chat gpt for help in order to have a formula that changes my rgb in hex 
    const toHex = (rgbStr) => {
      const m = rgbStr && rgbStr.match(/\d+/g);
      if (!m) return null;
      const [r, g, b] = m.map(Number);
      const h = (n) => n.toString(16).padStart(2, '0');
      return `#${h(r)}${h(g)}${h(b)}`;
    };
    const cur = toHex(rgb);
    if (cur) picker.value = cur;

    picker.click();
    const apply = () => { li.style.backgroundColor = picker.value; };
    picker.oninput = apply;
    picker.onchange = apply;
  });
  
  //change the color of background of list view's container 
  const listBgPicker = document.getElementById('list-bg-picker');
  listBgPicker.addEventListener('input', () => {
  if (document.body.classList.contains('list-view-mode')) {
    animalList.style.backgroundColor = listBgPicker.value;
    }
});