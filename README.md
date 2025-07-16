<h1>Simon Game</h1>

<img width="1920" height="868" alt="simon game" src="https://github.com/user-attachments/assets/8d974b6e-f5c6-44e1-b51e-c80507a86139" />

<h2>Introduction</h2>
I was asked to bulid a game for my project, Hence i choosed the simon game, in order to play the game click 

<h2>Game Description:</h2>
Simon game is based on memory and remembering patterns, there are 4 colors which are :
<ul>
  <li>red</li>
  <li>green</li>
  <li>blue</li>
  <li>yellow</li>
</ul>

At the start of the game, a random color will turn to grey for few seconds and the player has to click that color,only then the player will be able to win and pass to the next level, when a player goes to the next level another color will get randomly selected by the computer "turn to grey" and the user has to click the colors from the previous levels first then click the newly selected color "the last one that turned red". If the player click the wrong pattern he will lose.

<h2>Attributions</h2>
four audios where used for this game and one lamp image , they can be found in this link <a href="https://github.com/hudasul/Project1-Simon-Game/tree/main/assets">assets</a>

<h2>Technologies used</h2>
<ul>
  <li>HTML</li>
  <li>CSS</li>
  <li>JavaScript</li>
  <li>Git</li>
</ul>

<h2>Game Mechanics</h2>
<h3>Starting The Game</h3>
First I created a start button in html, then using JavaScript I added an eventListener that gets trigired if the start button is clicked. basiclly if the button is clicked function "startGame is called" and the game start, when the start button is clicked it turns to grey indecating that it got clicked.

Also, in case the player quit the game "using quit buttun" or if he lose the game. the start button text changes from "Start Game" to "Play Again", so if the player wnted to play again he can simply clicked the button.

<h3>Quit The Game</h3>
This button is created in html also, then using JavaScript I added an eventListener that gets trigired if it got clicked. when this button is added the message that display the level the player is on turn to "you quitted the game at level (level player reached)". in order to that I used DOM to define "message" using h2 id which is "message" and then when the quit button is clicked I changed the messsage content using "message.textContent".

<h3>Creating computer pattern</h3>
The computer pattern is basiccliy the pattern of colors the player should click to win a level. In order to that I made a function called "creatRandomNumber" that creates a random number from 0 to 3, I also assigned an id to each on of the colors divs so when a random number is created the color whith the same id as the random number change color to grey for 500ms.

<h3>Creating Player pattern</h3>
Player pattern is an array of the ids of the colors the player has clicked, it used for determining win or lose. In order to know which color the player clicked I created "handleClick" that uses "event.target.id" to know what is the id of the color the player did click, then using "playerPattern.push(clickedID)" i pushed the clicked color id into the player pattern.

At the beggining of each level the player pattern gets emepty "length = 0" because the player have to click the correct colors all ovwr again on each level.


in order to change color i created "changeColor" and insid it i used setTimeout to change the color of the div from its original color to grey for 500ms.

<h3>Make sounds</h3>
when a color is clicked a sound will be heard, to do that i used 4 diffrent audios one for each color. I created a function called "makeSound" that takes the id of the color as an argument and then use ann array called "sounds" to play the color audio.


sounds array length is 4, if the id is 0 then the audio at sounds[0] will play and same goes with the other colors. for the colors ids red has "id=0", green has "id =1", blue has "id=2", and Yellow has "id=3", those id are specifed in the html file "index.html"

Also in case the player lose, a sound will be played, for that I made a function called checkPattern that I will explain down bellow

<h3>Win and lose</h3>
In order to chevk if a player has won a level i created a function called "checkPattern" that uses a  for loop to go through the playerPattern and check if the as the computer pattern. if computer and player patterns are the same the player win the level and goest to the next one, else he lose and the message changes to "You lost at level (number of the level the player lost)!"

the "checkPattern" function returns "true" or "false" and it is called inside handleClick function so that once the player click the wrong pattern he immeditly lose. Also if "checkPattern" return true a function named "flashNextButton" is called and it simply select another color and add it to the computer pattern by calling "flashButton" function but before that it will increase the level number by one using "level++" and shows a message in the color green showing the next level indecationg that the player have won and passed the previous level.


<h2>Planned future enhancements:</h2>
Enable the player to use help "by clicking the lamp img" more often, by giving one extra halp each time the player passes 10 levels.

