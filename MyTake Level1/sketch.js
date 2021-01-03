import Game from './Game.js'
import * as p5 from './libraries/p5';
import * as listeners from './setting_level' 
// need to import listeners for webpack to add this to bundle

let s = (sk) => {    

  sk.setup = () =>{
    sk.createCanvas(Game.canvasWidth, Game.canvasHeight)
    Game.resetTiles()
  }

  sk.draw = () => {
    sk.background(255,255,255)
    Game.drawTiles()
    if (!Game.editing && Game.humanPlaying) {
      Game.updatePlayer()
      Game.drawPlayer()
    } else if (!Game.editing) {
      Game.trainNormally()
    }
  }

  sk.mousePressed = () => {
    if (Game.editing) {
      let selectedTile = Game.getTileFromCoords(sk.mouseX, sk.mouseY)
      if (selectedTile)
        Game.turnOnTile(selectedTile)
    }
  }

  sk.mouseReleased = () => {
    if (Game.editing)
      Game.clearDragging()
  }

  sk.mouseDragged = () => {
    if (Game.editing)
      Game.mouseDragged(sk.mouseX, sk.mouseY)
  }
  sk.keyPressed = () => {
    if (Game.humanPlaying) {
      switch(sk.keyCode){
        case 87: // W
          Game.player.setVel(0, -1)
          break;
        case 65: // A
          Game.player.setVel(-1, 0)
          break;
        case 83: // S
          Game.player.setVel(0, 1)
          break;
        case 68: // D
          Game.player.setVel(1, 0)
          break;
      }
    }
  }
  sk.keyReleased = () => {
    if (Game.humanPlaying) {
      switch(sk.keyCode){
        case 87: // W
          Game.player.setVel(0, 1)
          break;
        case 65: // A
          Game.player.setVel(1, 0)
          break;
        case 83: // S
          Game.player.setVel(0, -1)
          break;
        case 68: // D
          Game.player.setVel(-1, 0)
          break;
      }
    }
  }
}
const P5 = new p5(s);

// function keyPressed(){
//   if(humanPlaying){

//     setPlayerVelocity();
//   }else{//if human is not playing
//     switch(key) {
//     case ' ':
//       showBest = !showBest;
//       break;
//     case 'G'://replay gens
//       if (replayGens) {
//         upToGenPos = 0;
//         replayGens = false;
//         loadDots();
//       } else
//         if (testPopulation.genPlayers.length > 0) {
//           replayGens = true;
//           genPlayer = testPopulation.genPlayers[0].gimmeBaby();
//           saveDots();
//           resetDots();
//         }
//       break;
//     }
//   }

//   if(key == 'P'){
//     if (humanPlaying) {//if human is currently playing

//      //reset dots to position
//      humanPlaying = false;
//      loadDots();
//    } else {//if AI is currently playing
//      if (replayGens) {
//        upToGenPos = 0;
//        replayGens = false;
//      }
//      humanPlaying = true;
//      p = new Player();
//      p.human = true;
//      //save the positions of the dots
//      saveDots();
//      resetDots();
//    }
//   }
// }


// function keyReleased(){
//   if(humanPlaying){
//     switch(keyCode) {
//     case UP_ARROW:
//       up = false;
//       break;
//     case DOWN_ARROW:
//       down = false;
//       break;
//     case RIGHT_ARROW:
//       right = false;
//       break;
//     case LEFT_ARROW:
//       left = false;
//       break;
//     }
//     switch(key){
//       case 'W':
//         up = false;
//         break;
//       case 'S':
//         down = false;
//         break;
//       case 'D':
//         right = false;
//         break;
//       case 'A':
//         left = false;
//         break;
//     }

//     setPlayerVelocity();
//   }

// }
// //set the velocity of the player based on what keys are currently down

// function setPlayerVelocity(){
//   p.vel.y= 0;
//   if (up) {
//     p.vel.y -=1;
//   }
//   if (down) {
//     p.vel.y +=1;
//   }
//   p.vel.x= 0;
//   if (left) {
//     p.vel.x -=1;
//   }
//   if (right) {
//     p.vel.x +=1;
//   }

// }

export default P5;
