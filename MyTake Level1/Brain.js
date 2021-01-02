import p5 from './sketch'
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
}
