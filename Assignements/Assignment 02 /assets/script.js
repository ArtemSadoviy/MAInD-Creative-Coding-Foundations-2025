
let spaceship = document.getElementById("Spaceship")  // scelgo la mia navicella spaziale 
 const laserShoot = document.getElementById("laser-shoot") // scelgo l'audio per lo sparo 
let avatarSelect = document.getElementById("avatar-select"); 
let buttons = avatarSelect.querySelectorAll("button");
const scoreSpan = document.getElementById("score");  
// console.log(spaceship) // sulla console ve do la riga n.2, quindi questa parte funziona

// Bottoni per spostarsi e sparare con la navicella in mobile mode
const buttonLeft = document.getElementById("move-to-left");
const buttonRight = document.getElementById("move-to-right");
const buttonShoot = document.getElementById("shoot-on-click");

//vite
let lifes = 3; 
let score = 0; 
let life_check = true;

function setup() { // set avatar
    buttons.forEach(function(btn) {
        btn.addEventListener("click", function() {
            let avatarClass = this.id;
            spaceship.className = avatarClass;
            avatarSelect.style.display = "none"; // non devo vedere lo screen con gli avatar dopo aver scelto la mia navicella spaziale 
            startGame();
        });
    });
}

setup()

function startGame(){
    // muove la spaceship - quellio che succede se schiaccio sulla tastiera 
    document.addEventListener('keydown', function(event){    //qui ho aggiunto un event listener, la sua struttura è document.addEventListener('nome del mio evento') e la funzione                                                          quindi quel keydown ha la funzione di ascoltare quando premo il tasto. Sulla console vedo una KeyEvent, questa parte funziona.
        switch(event.key){

            case "ArrowLeft":
                event.preventDefault();
                spaceship.style.left = spaceship.offsetLeft - 50 + "px";
                break;

            case "ArrowRight":
                event.preventDefault();
                spaceship.style.left = spaceship.offsetLeft + 50 + "px";
                break;
        
            case " ":
                event.preventDefault();
                newBullet();
                laserShoot.currentTime = 0;
                laserShoot.play();
                break;
        }
        // console.log(event)  
    })

    // Interazione con bottoni per ipad and mobile
    buttonLeft.addEventListener("click", function () {
        spaceship.style.left = spaceship.offsetLeft - 50 + "px";
    });
    
    buttonRight.addEventListener("click", function () {
    
        spaceship.style.left = spaceship.offsetLeft + 50 + "px";
    });

    // suono
    buttonShoot.addEventListener("click", function () {
        newBullet();
        laserShoot.currentTime = 0;
        laserShoot.play();
    });

    function newAsteroid() {
        if (life_check == false) return;
        let asteroid = document.createElement("div");
        asteroid.className = "asteroid";
        asteroid.style.top = "-100px";
        document.body.appendChild(asteroid);
        asteroid.style.left = random(0, document.body.clientWidth - 80) + "px"; // random si riferisce alla funzione che ho inserito in fondo,  la quale serve per generare in modo casuale gli asteroidi
    
        let timerId = setInterval(function () {
            asteroid.style.top = (asteroid.offsetTop + 5) + "px";  
            if (asteroid.offsetTop > document.body.clientHeight) {
                asteroid.remove(); 
                clearInterval(timerId); 

                // toglie la vita 
                lossLife(); 

            if (life_check) {   
                newAsteroid();
               }
            }
            collision()
        }, 30);
        asteroid.dataset.timer = timerId; 
        console.log(life_check)
    } 

    newAsteroid(); 

    function newBullet (){
        //block per il proiettile 
        let bullet = document.createElement("div");  // ho creato la mia variabile 
        // la classe è stata aggiunta 
        bullet.className = "bullet"; // ho selezionato la classe
        document.body.appendChild(bullet);
        //posizione del proiettile 
        bullet.style.left = spaceship.offsetLeft + 70 + "px";
        bullet.style.top = (spaceship.offsetTop - bullet.offsetHeight) + "px";
        // il proiettile viene aggiunto sul campo
        document.body.appendChild(bullet); 
    
        bulletMove(bullet)
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
            bottomBullet >= topAsteroid && topBullet <= bottomAsteroid  && rightBullet >= leftAsteroid && leftBullet <= rightAsteroid)  { /*per questa parte ho seguito un tutorial su youtube */
                asteroid.className = 'explosion';
               clearInterval(asteroid.dataset.timer)
   
               addScore(); // aggiunto qui la mia funzione, lo score deve essere aggiunto ogni volta che si verifica una esplosione
               
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
            asteroid.offsetTop + asteroid.offsetHeight >= spaceship.offsetTop &&    //per questa parte ho seguito un tutorial su youtube 
            asteroid.offsetTop <= spaceship.offsetTop + spaceship.offsetHeight && 
            asteroid.offsetLeft + asteroid.offsetWidth >= spaceship.offsetLeft &&
            asteroid.offsetLeft <= spaceship.offsetLeft + spaceship.offsetWidth
        ) {
         
            clearInterval(asteroid.dataset.timer); 

            setTimeout(function(){
                    asteroid.remove(); 
                    newAsteroid(); 
                }, 500 ); 
            lossLife()
        }
    }

// l'aggiunta dei punti 
    function addScore() {  
        score++;
        scoreSpan.textContent = score;
    }

}
//perdità della vita 
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
    const restartButton = document.createElement('button');
    restartButton.textContent = 'restart the game';
    restartButton.id = 'restart-game';

    document.body.appendChild(restartButton);

    restartButton.addEventListener("click", function () {
        restartGame();
        restartButton.remove();
    });
}


//questa funzione mi serve per poter arrivare allo stato iniziale del gioco, ovvero quando ho 3 vite e i punti sono 0
function restartGame(){
    lifes = 3;  // numero di vite 
    score = 0; // punti 
    life_check = true;

    let lifesBlock = document.querySelector('#lifes'); 
    lifesBlock.innerHTML = '<span></span><span></span><span></span>';

    scoreSpan.textContent = 0;
    avatarSelect.style.display = 'block';
}

// ------------------------

// Ho cercato su internet come ottenere un numero random e questa è la funzione  che ho trovato e applicato. In questo caso mi serve per generare gli astroidi in modo casuale
function random(min,max){
    let rand = min + Math.random() * (max + 1 -min); 
    return Math.floor(rand); 
}


