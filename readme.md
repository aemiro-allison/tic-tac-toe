# Tic-Tac-Toe Development Process

### The Flow of the Game
I decided to omit a start button as having the user click on the start button to start every game would be tiring, therefore the game was automatically reset after a game was won or if there as a draw. The game had two types of resets: A normal reset (*to just reset the current game*) and a hard reset (*resets everything including player scores.*).

Wireframe of Game Flow:
![Wireframe of Game Flow Logic](readme-assets/tictactoe-wireframe)

### The Winning Logic
I first approached the tic-tac-toe game by figuring out an algorithm to determine a winner from the 3x3 board. I started by looking at all the possible conditions that a player could get a match of three on the board. After every move, I though of checking whether a player had gotten any of these 8 possible winning conditions, then they would be the winner.
