import p5 from './sketch'
import Game from './Game'
export default class Brain {
  constructor (size) {
    this.directions = []
    this.step = 0
    this.populateDirections(size)
  }

  nextVel() {
    let nextStep = this.directions[this.step]
    this.step++
    return nextStep
  }

  hasStepsLeft() {
    return this.step < this.directions.length
  }

  populateDirections(size) {
    for (let i = 0; i < size; i++) {
      this.directions.push(this.getRandomDirection())
    }
  }

  //mutates the brain by setting some of the directions to random vectors
  mutate(died, deathStep) {
    //chance that any vector in directions gets changed
    for (var i =0; i< this.directions.length; i++) {
      var rand = Math.random();
      if (died && i > deathStep - 10) {
        rand = Math.random() * 0.2;
      }

      if (rand < Game.mutationRate) {
        //set this direction as a random direction
        this.directions[i] = this.getRandomDirection();
      }
    }
  }

  //returns a random PVector
  getRandomDirection() {
    var randomNumber = Math.floor(Math.random() * 9);
    switch(randomNumber) {
    case 0:
      return p5.createVector(0, 1);
    case 1:
      return p5.createVector(1, 1);
    case 2:
      return p5.createVector(1, 0);
    case 3:
      return p5.createVector(1, -1);
    case 4:
      return p5.createVector(0, -1);
    case 5:
      return p5.createVector(-1, -1);
    case 6:
      return p5.createVector(-1, 0);
    case 7:
      return p5.createVector(-1, 1);
    case 8:
      return p5.createVector(0, 0);
    }

    return p5.createVector();
  }

  increaseMoves() {
    for(var i = 0 ; i< 5 ;i++) {
      this.directions.push(this.getRandomDirection());
    }
  }

  clone() {
    // check this
    let clonedBaby = new Brain(this.directions.length)
    for (let i = 0; i < this.directions.length; i++) {
      clonedBaby.directions[i] = this.directions[i].copy();
    }
    clonedBaby.step = 0
    return clonedBaby
  }
}
