# Assignment 03

## Brief 

Choose a “mini-game” to rebuild with HTML, CSS and JavaScript. The requirements are:

- The webpage should be responsive
- Choose an avatar at the beginning of the game
- Keep track of the score of the player
- Use the keyboard to control the game (indicate what are the controls in the page). You can also use buttons (mouse), but also keyboard.
- Use some multimedia files (audio, video, …)
- Implement an “automatic restart” in the game (that is not done via the refresh of the page)

The application **must** have those requirements:

- The webpage is responsive
- Use a web API (you choose which one best fists for your project) to load the data and display them in the webpage
- At least one multimedia file (for user feedback interactions, or content itself)
- Develop a navigation system that allows the user to navigate different sections with related content and functionalities



## Screenshots 

![first screenshot](/DOC/screenshot_03_1.jpg)
![second screenshot](/DOC/screenshot_03_2.jpg)


## Project description 

In the game, the player’s mission is to hit all the asteroids coming toward them and accumulate points. Otherwise, they will be hit and lose a life, with a total of three lives. If an asteroid flies past the player without being destroyed, the spaceship will also lose one life. If the spaceship loses all three lives, the game restarts.


## Block Diagram 
![block diagram svg](/DOC/Block_diagram.svg)


## Function List 

1.showSection(sectionName)
Arguments 
sectionName: "menu”, “game”, "how-to-play”, "credits"
Description: Shows only requested sections. 

2.displayData(data)
Arguments 
data from NASA DONKI API
Description: Calculate the number of geomagnetic storms

3.displayError(error) 
Arguments
error
Description : if an error occurs a text will be displayed. 

4.setup()
Description: when the buttons are pressed an avatar is chosen, the music stars, avatar selection screen is hidden and startGame() is called 

5.startGame ()
Description: controls for the navigation are organised, it calls newAsteroid (), it defines newAsteroid, newBullet, shot(), bulletMove(), collision() and score()

6.newAsteroid()
Description: it creates and animate a new asteroid. 

7.newBullet ()
Description : it creates a new bullet that is fired by the spaceship.

8.shot(bullet, timer) 
Arguments
Bullet and timer 
Description: it verify the collision between the bullet and the asteroid. 

9.bulletMove(bullet) 
Arguments 
bullet 
Description: animation of the bullet so it moves to the top. 

10.collision()
Description: it verifies the collision between the spaceship and the asteroids. 

11.addScore ()
Description: It add +1 scores and update the number of the score on the page.

12.lossLife ()
Description: It manages the loss of the lives. 

13.death()
Description: it is used when players  loose all their  lives. 

14.restartGame()
Description: it resets the game on its initial state. 

## Content and Data sources

Sounds
Music by Maksym Dudchyk from Pixabay
Sound Effect by Universfield from Pixabay
Sound Effect by Ahmed Abdulaal from Pixabay
Sound Effect by u_j8f4w9g47f from Pixabay

Sound Effect by <a href="https://pixabay.com/users/ahmed_abdulaal-49290858/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=312360">Ahmed Abdulaal</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=312360">Pixabay</a>

Visual 
https://media4.giphy.com/media/v1.Y2lkPTc5MGI3NjExbWUxeGlpejR2MTlwb2I4azJ2MW1la3I1YjBiOHJ5cXJxM2hxZDJqcSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/TgGXWJOkIiUihSRV6V/giphy.gif

heart-svgrepo-com.svg

<a href="http://www.freepik.com">Designed by Freepik</a>


## API Documentation 

![third screenshot](/DOC/screen_shot_03_API.jpeg)

NASA DONKI - Geomagnetic Storms API 
The game uses the NASA DONKI Geomagnetic Storms API to collect the number of geomatics storms recorded in the last 30 day.

In the exercise the system automatically considers the last 30 days but if I want to include a specific range of time I have to consider parameters such as Start Date and End Day in API.

Endpoint
https://api.nasa.gov/DONKI/GST

In the game the number of storms influences the speed of asteroids, they will move faster if the amount of geomagnetic storms increase.
