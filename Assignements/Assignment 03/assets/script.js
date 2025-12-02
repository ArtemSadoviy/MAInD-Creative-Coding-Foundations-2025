
let spaceship = document.getElementById("Spaceship")  // scelgo il blocco con la navicella spaziale 
const laserShoot = document.getElementById("laser-shoot") // scelgo l'audio per lo sparo 
let avatarSelect = document.getElementById("avatar-select"); // sezione dove si trovano i 4 avatar 
let buttons = avatarSelect.querySelectorAll("button"); // dentro la seziine avatar tutti i bottoni devono essere selezionati
const scoreSpan = document.getElementById("score");  //seleziono i punti
const apiError = document.getElementById("api-error"); 


// per la navigazione
const menuSection = document.getElementById("menu"); //sezione del menu pricipale 
const gameSection = document.getElementById("game-screen"); //schermata di gioco 
const howToPlaySection = document.getElementById("how-to-play-section"); //schermata dove è spiegato come si gioca
const creditsSection = document.getElementById("credits-section");  //schermata con gli attributi 
let asteroidSpeed = 1; // velocità con cui si muovono gli asteroidi 
const buttonPlay = document.getElementById("button-play"); // pulsante che fa partire il gioco, si trova nel menu 
const buttonHowToPlay = document.getElementById("button-how-to-play"); //pulsante che porta alla sezione della spiegazione del gicoo
const buttonCredits = document.getElementById("button-credits"); //pulsante che porta alla sezione degli attributi
const buttonBackHowToPlay = document.getElementById("back-menu-from-how-to-play"); //pulsante che porta dalla sezione how to play al menu
const buttonBackCredits = document.getElementById("back-menu-from-credits"); // pulsante che porta dalla sezine credits al menu 

//variabili che riguardano la vita 
let lifes = 3; 
let score = 0; 
let life_check = true;

buttonPlay.addEventListener("click", () => { //quando il giocatore schiaccia il puslante PLAY viene eseguita la funzione e appare la schermata del gioco
    showSection("game");
});
buttonHowToPlay.addEventListener("click", () => { // quando il giocatore schiaccia il pulsante How to Play play la funzione viene eseguita e appare la sezione How to Play
    showSection("how-to-play");
});
buttonCredits.addEventListener("click", () => { // quando il giocatore schiaccia il pulsante Credits la funzione viene eseguita e il appare la sezione Credits
    showSection("credits");
});
buttonBackHowToPlay.addEventListener("click", () => { // quando il giocatore schiaccia il pulsante la funzione viene eseguita e si torna al menu dalla sezione How to play 
    showSection("menu");
});
buttonBackCredits.addEventListener("click", () => { // quando il giocatore schaiccia il pulsante la funzione viene eseguita e si torna al menu dalla sezione Credits. 
    showSection("menu");
});

// Devo nascondere le sezioni perchè contemporaneamente posso avere piu' sezioni che si sovrapponogno 
function showSection (sectionName) {
    menuSection.style.display = "none"; 
    gameSection.style.display = "none"; 
    howToPlaySection.style.display = "none"; 
    creditsSection.style.display = "none"; 

// Questa parte parte controlla quale sezione ho richiesto
if (sectionName === "menu"){
    menuSection.style.display = "flex"; 
} else if (sectionName === "game"){
    gameSection.style.display = "block"; 
}else if (sectionName === "how-to-play"){
    howToPlaySection.style.display = "flex"; 
} else if (sectionName === "credits"){
    creditsSection.style.display = "flex"; 
}
}

showSection("menu") // quando apro il gioco la prima schermata che deve apparire è quella del menu 

// Bottoni per spostarsi e sparare con la navicella in mobile mode
const buttonLeft = document.getElementById("move-to-left"); // bottone per spostarsi a sinistra 
const buttonRight = document.getElementById("move-to-right"); // bottone per spostarsi a destra 
const buttonShoot = document.getElementById("shoot-on-click"); // bottone per sparare 

//API 
/*
const API_KEY = "GcjkbJUzh8cN6ChknrlJ4HYTLuWUdTsOTXdwWMwU";  //API KEY
const API_URL = "https://api.nasa.gov/DONKI/GST?api_key=" + API_KEY; 

fetch(API_URL)
  .then(response => response.json()) 
  .then(data => displayData(data))
  .catch(error => displayError (error));

// funzione per visualizzare i dati ottenuti 
  function displayData(data){

    console.log("NASA's data:", data);
    const stormCalculation = data.length;  // il numero degli elementi nell'array corrisponde al numero delle tempeste. Dalla console vedo il numero. 
    asteroidSpeed = 1 + Math.min(stormCalculation,7); //alla velocità base che è 1 devo aggiungere il numero di tempeste, tuttavia queste tempeste non possono essere piu' di 7 perchè altrimenti la velocità diventa troppo alta 
    console.log("Storms:", stormCalculation); // sulla console vedo quante tempeste ci sono state 
    console.log("Asteroids'speed:", asteroidSpeed); // sulla console visualizzo la velocità che è data da 1 + n di tempeste 
    const stormCalculationSection = document.getElementById("number-of-storms");  // seleziono la sezione nella quale voglio mostrare il numero delle tempeste 
    const speedSection = document.getElementById("speed");  //seleziono la sezione dove voglio mostrare la velocità degli asteroidi
    stormCalculationSection.textContent = `Geomagnetic storms in the last 30 days: ${stormCalculation}`;   //aggiungo alla sezione il testo e il numero delle tempeste 
    speedSection.textContent = `Asteroid speed: ${asteroidSpeed}`; //aggiungo il testo e la velocità degli asteroidi alal sezione. 

    function displayError(error){
        console.log("error"); 
        const ERROR_MESSAGE = "An error is occuring"; 
        apiError.innerText = ERROR_MESSAGE; 
    }
  }
*/
function setup() { // set avatar
    buttons.forEach(function(btn) { // ai 4 bottoni: avatar_1,_2,_3,_4.Devo aggiungere un Listener 
        btn.addEventListener("click", function() { 
            let avatarClass = this.id; // viene selezionata la classe dell'avatar scelto 
            spaceship.className = avatarClass; // scelta della skin della navicella 
            const backgroundMusic = document.getElementById("background-music");  // parte la musica del gioco
            backgroundMusic.play(); 
            avatarSelect.style.display = "none"; // non devo vedere lo screen con gli avatar dopo aver scelto la mia navicella spaziale 
            startGame(); // il gioco viene avviato
        });
    });
}

setup() //la funzione sopra viene eseguita

function startGame(){ 

    // Aggiungo un event listener che farà partire una function ogni volta che i tasti verranno premuti.
    document.addEventListener('keydown', function(event){                                                     
        switch(event.key){
           
            case "ArrowLeft": //Premo sulla freccia sinistra 
                event.preventDefault(); // devo bloccare il comportamento del browser che altrimenti scrolla a sinistra quando prmeo la freccia 
                spaceship.style.left = spaceship.offsetLeft - 50 + "px";  // style è responsabile per la posizione della navicella spaziale.Offset é la distnaza da sinsitra, e voglio aggiungere   -50 px alla posizione di partenza 
                break;
            //Premo sulla freccia desra 
            case "ArrowRight":
                event.preventDefault(); // devo bloccare il comportamento del browser che altrimenti scrolla a destra quando prmeo la freccia 
                spaceship.style.left = spaceship.offsetLeft + 50 + "px"; // Invece quando schiaccio sulla freccia destra, la navicella si sposterà di + 50 rispetto alla posizione attuale.
                break;

            // Premo su spazio
            case " ":
                event.preventDefault(); // devo bloccare il comportamento del browser che altrimenti scrolla in basso  quando premo sullo spazio. 
                newBullet(); // la funzione è chiamata qui, perchè ogni volta che schiaccio sullo spazio deve partire un bullet. 
                laserShoot.currentTime = 0; // audio 
                laserShoot.play(); //riproduzione dell'audio dello sparo.
                break;
        }
    })

    // Interazione con bottoni per ipad and mobile
    buttonLeft.addEventListener("click", function () {
        spaceship.style.left = spaceship.offsetLeft - 50 + "px"; // spostare la navicella verso sinistra quando l'icona viene premuta rispetto alla sua posizione attuale 
    });
    
    buttonRight.addEventListener("click", function () {
    
        spaceship.style.left = spaceship.offsetLeft + 50 + "px"; // spostare la navicella  verso destraquando l'icona viene premuta.
    });

    // suono
    buttonShoot.addEventListener("click", function () { 
        newBullet(); // la funzione viene chiamata qui perchè ogni volta che schaccio sull'icona per sparare, un nuovo proiettile deve partire dalla navicella. 
        laserShoot.currentTime = 0; // far ripartire ils suono dello sparo
        laserShoot.play(); // riproduzione del suono dello sparo. 
    });


    function newAsteroid() {
        if (life_check == false) return; // se il giocatore finisce tutte le sue vite, i nuovi asteroidi non devono essere creati. 
        let asteroid = document.createElement("div"); // creatione del nuovo div che rappresenta l'asteroide
        asteroid.className = "asteroid"; // per poter modificare l'asteoroide nel css. 
        asteroid.style.top = "-100px"; // l'asteroide deve partire fuori dallo schermo 
        document.body.appendChild(asteroid); //aggiungo l'asteroide alla pagina
        asteroid.style.left = random(0, document.body.clientWidth - 80) + "px"; // random si riferisce alla funzione che ho inserito in fondo,  la quale serve per generare in modo casuale gli asteroidi
    
        let timerId = setInterval(function () {
            asteroid.style.top = (asteroid.offsetTop + asteroidSpeed) + "px";  // animazione dell'asteroide che scende 
            if (asteroid.offsetTop > document.body.clientHeight) { // se l'asteroide esce fuori dallo schermo: 
                asteroid.remove();  // l'asteroide viene rimosso 
                clearInterval(timerId); // l'animazione si ferma 
                lossLife(); // una vita viene tolta al giocatore

            if (life_check) {   // se il giocatore ha ancora vite, un nuovo asteoride viene creato 
                newAsteroid(); 
               }
            }
            collision() // controllo se c'è stata o meno la collissione 
        }, 30); // il codice viene ripetito ogni 30 millisecondi 
        asteroid.dataset.timer = timerId; 
        console.log(life_check)
    } 

    newAsteroid(); // creazione dell'asteroide


    // Creazione del proiettile 
    function newBullet (){
        let bullet = document.createElement("div"); //creo un elemento div per il proiettile 
        bullet.className = "bullet";  // aggiungo la classe per poterlo editare nel css
        document.body.appendChild(bullet); // il proiettile compare nella pagina
        bullet.style.left = (spaceship.offsetLeft + 70) + "px";   // il proiettile  deve essere posizionato al centro della navicella spaziale
        bullet.style.top = (spaceship.offsetTop - bullet.offsetHeight) + "px"; // inoltre  proiettile deve essere posizionato sulla punta della navicella spaziale. 
        bulletMove(bullet) //funzione per far muovere il proiettile
    }

    function shot (bullet, timer){
       //coordinate del punto sopra e sotto del proiettile 
       let topBullet = bullet.offsetTop; 
       let bottomBullet = bullet.offsetTop + bullet.offsetHeight; 
   
    //    console.log(topBullet)
    //    console.log(bottomBullet)

       let asteroid = document.querySelector (".asteroid"); 
       if (asteroid != null){

        //coordinate del punto sopra e sotto dell'asteroide 
       let topAsteroid = asteroid.offsetTop
       let bottomAsteroid = asteroid.offsetTop + asteroid.offsetHeight; 
   
       let leftBullet = bullet.offsetLeft; 
       let leftAsteroid = asteroid.offsetLeft; 

       let rightBullet = leftBullet + bullet.offsetWidth;
       let rightAsteroid = leftAsteroid + asteroid.offsetWidth;
   
        // check the collision bullet-asteroid
        if (
            bottomBullet >= topAsteroid && topBullet <= bottomAsteroid  && rightBullet >= leftAsteroid && leftBullet <= rightAsteroid)  {
                asteroid.className = 'explosion';
               clearInterval(asteroid.dataset.timer)
   
               const rewardMusic = document.getElementById("reward-music"); 
               rewardMusic.currentTime = 0; 
               rewardMusic.play(); 
               
               addScore(); //  lo score deve essere aggiunto ogni volta che si verifica una esplosione

               setTimeout(function(){
                   asteroid.remove(); 
                   newAsteroid(); 
               }, 1000 )
           }
       }
    }

    function bulletMove(bullet){

        let timerId = setInterval(function(){

        //spostare a destra il proiettile 
        bullet.style.top = bullet.offsetTop - 10 + "px";

        //verificare se il proiettile colpisce l'asteroide 
        shot(bullet, timerId)
        if (bullet.offsetTop + bullet.offsetHeight < 0){
            bullet.remove()
            clearInterval (timerId)
        } 
        }, 16 )
    }

    function collision (){ // con spaceship

        let asteroid = document.querySelector('.asteroid')
        if (
            asteroid.offsetTop + asteroid.offsetHeight >= spaceship.offsetTop +50 &&   
            asteroid.offsetTop <= spaceship.offsetTop + spaceship.offsetHeight && 
            asteroid.offsetLeft + asteroid.offsetWidth >= spaceship.offsetLeft +50 &&
            asteroid.offsetLeft <= spaceship.offsetLeft + spaceship.offsetWidth -50
        ) {
            clearInterval(asteroid.dataset.timer); 

            setTimeout(function(){
                    asteroid.remove(); 
                    newAsteroid(); 
                }, 500 ); 
            lossLife()

            const collisionSound = document.getElementById("collision-sound"); 
            collisionSound.currentTime = 0; 
            collisionSound.play(); 
        }
    }

    // l'aggiunta dei punti 
    function addScore() {  
        score++;
        scoreSpan.textContent = score;
    }
}

//perdita della vita 
function lossLife(){
    lifes--; 
    console.log(lifes)

    let lifesBlock = document.querySelector('#lifes'); 
    let life = lifesBlock.querySelector("span"); 
    life.remove(); 
    
    if (lifes < 1 ){
        life_check = false;
        console.log(lifes, life_check)
        death()
    } 
}

// questa funzione serve nel momento in cui perdo tutte le mie vite a disposizione 
function death(){

    const backgroundMusic = document.getElementById("background-music"); 
    backgroundMusic.pause(); 
    backgroundMusic.currentTime = 0; 

    const restartButton = document.createElement('button');
    restartButton.textContent = 'restart the game';
    restartButton.id = 'restart-game';

    document.body.appendChild(restartButton);

    restartButton.addEventListener("click", function () {
        restartGame();
        restartButton.remove();
        menuButton.remove(); 
    });

    const menuButton = document.createElement('button')
    menuButton.textContent = "menu"
    menuButton.id = 'menu-button'
    document.body.appendChild(menuButton);

    menuButton.addEventListener ("click", function (){
        restartGame (); 
        showSection ("menu"); 
        menuButton.remove(); 
        restartButton.remove(); 
    })
}

//questa funzione mi serve per poter arrivare allo stato iniziale del gioco, ovvero quando ho 3 vite e i punti sono 0
function restartGame(){
    lifes = 3;  // numero di vite 
    score = 0; // punti 
    life_check = true;

    let lifesBlock = document.querySelector('#lifes'); 
    lifesBlock.innerHTML = '<span></span><span></span><span></span>';

    scoreSpan.textContent = 0;
    avatarSelect.style.display = 'flex';
}

// ------------------------

// Ottenere un numero random per generare gli astroidi in modo casuale
function random(min,max){
    let rand = min + Math.random() * (max + 1 -min); 
    return Math.floor(rand); 
}


