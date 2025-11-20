# Assignment 02

## Brief 

Choose a “mini-game” to rebuild with HTML, CSS and JavaScript. The requirements are:

- The webpage should be responsive
- Choose an avatar at the beginning of the game
- Keep track of the score of the player
- Use the keyboard to control the game (indicate what are the controls in the page). You can also use buttons (mouse), but also keyboard.
- Use some multimedia files (audio, video, …)
- Implement an “automatic restart” in the game (that is not done via the refresh of the page)

## Screenshots 

![first screenshot](/Assignements/Assignment%2002%20/DOC/Screenshot_02_1.jpg)
![second screenshot](/Assignements/Assignment%2002%20/DOC/Screenshot_02_2.jpg)


## Project description 

In the game, the player’s mission is to hit all the asteroids coming toward them and accumulate points. Otherwise, they will be hit and lose a life, with a total of three lives. If an asteroid flies past the player without being destroyed, the spaceship will also lose one life. If the spaceship loses all three lives, the game restarts.


## Block Diagram 
![block diagram svg](/Assignements/Assignment%2002%20/DOC/Block%20Diagram%20.svg)



## Function list 
1.Set up()
Assigns the selected avatar to the spaceship and closes the window with the avatars. </br>
2.startGame ()
Inside of it are located keyboards rules  for the navigation of the spaceship. It also contains functions for the creation of asteroids, function for the creation of laser bullet, function for the shot, function for the movement of the bullet, function for the collision between spaceship and asteroid, function for score accumulation. </br>
3.newAsteroid ()
A new Asteroid is created  and is moving from top to bottom, there is also a verification if the asteroid has hit the spaceship or it goes out of the screen.</br>
4.newBullet()
A laser bullet is created and it has to be centred to the spaceship, so there is symmetry during the shot. </br>
5.bulletMove(bullet)
The bullet moves with a speed of 16ms to the top. </br>
6.shot(bullet, timer) 
It checks the collision between the asteroid and the bullet</br>
7.collision()
It verify if an Asteroid has hit a spaceship. </br>
8.addScore ()
The score number is increased by 1. </br>
9.lossLife()
The number of life is decreased by 1. </br>
10. death()
It creates the button called Restart The Game.</br>
11.RestartGame ()
Life and scores are reset, </br>
12.(random mix ,max) 
Generates a random value so asteroids can appear in different location. 

