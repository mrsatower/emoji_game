
// Ball //////////////////
class Ball {
  constructor() {
    // Elements 
    this.ball = document.getElementById('ball')
    this.sho = document.querySelector('.shoot')
    this.faces = ['😃', '😄', '😙', '😵']
    
    this.ball.innerHTML = this.faces[0]

    // Events
    this.jumpin = false
    this.jumpKeyUp = false
    this.jumpKeyDown = false
    this.shootKeyDown = false

    // variables jump
    this.v0 = 30 
    this.g = -30
    this.t = 0.1
    this.x0 = 0
    this.x = 0
    this.ballPos = [180, 80]
    // variables shoot
    this.s = 0
    this.xs = 0
    this.shoPos = [180, 80]
  }

  // up aceleration (impulse)
  impulse() {
    this.x0 = this.x;
    this.x = Math.floor(this.v0*this.t - 1/2 * this.g * this.t*this.t);
    this.ballPos.splice(0, 1, 180-this.x);
    this.ball.style.top = `${this.ballPos[0]}px`;
    this.t+=0.1;
    this.ball.innerHTML = this.faces[1]
        
    // height limit
    if (this.x >= 120) {
      this.jumpKeyUp = true;
      this.t = 0.1;
    }
  }

  // Free Fall (stop aceleration and fall)
  jump() {
    this.x = Math.floor(this.x0 + this.v0*this.t + 1/2 * this.g * this.t*this.t);
    this.ballPos.splice(0, 1, 180-this.x);
    this.ball.style.top = `${this.ballPos[0]}px`;
    this.t+=0.1;
    
    if (this.x <= 0) {
      this.jumpin = false;    
      this.ball.style.top = 180+'px';
      this.x=0;
      this.t = 0.1;
      this.jumpKeyDown = this.jumpKeyDown ? false : true;
      this.jumpKeyUp = this.jumpKeyUp ? false : true;
    
      this.ball.innerHTML = this.faces[0]
    }
  }

  jumpEventStart(action) {
    if (action === 'start' && (this.jumpKeyDown === false && this.jumpKeyUp === false)) {
      this.jumpin = true
      this.jumpKeyDown = true
    } 
    if (action === 'stop' && (this.jumpKeyDown === true && this.jumpKeyUp === false)) {
      this.t = 0.1
      this.jumpKeyUp = true
    }
  }

  // shoot
  shoot() {
    this.shoPos.splice(1, 1, this.ballPos[1]+this.s);
    this.sho.style.display = 'inline';
    this.sho.style.left = `${this.shoPos[1]}px`;
    this.s+=4;
        
    if (this.s >= 250) {
      this.s = 0;
      this.shootKeyDown = false;
      this.ball.innerHTML = this.faces[0]
    }
  }
  
  shootEventStart() {
    if (this.shootKeyDown === false) {
      this.shootKeyDown = true;
      // altura proyectil
      this.xs = this.ballPos[0]+5;
      this.shoPos.splice(0, 1, this.xs);
    
      this.sho.style.top = `${this.shoPos[0]}px`;
      this.ball.innerHTML = this.faces[2]
      this.sho.innerHTML = '❤️'
    }
  }   
}

export default Ball
