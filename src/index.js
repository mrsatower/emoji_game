// EMOJI LOVE GAME. v0.9
// by MrSatower. 2018 - 2021
//

import Ball from './Ball.js'
import Enemy from './Enemy.js'


// Initial values
let crash = false

// create character instance
const ball = new Ball()

// create enemy instances
const enemy = new Enemy()


// CONTROLS /////////////
// Key press events 
// Jump
document.addEventListener('keydown', e => {
  if (e.keyCode === 38 || e.keyCode === 74) {
    ball.jumpEventStart('start')
  }
});    
document.addEventListener('keyup', e => {
  if (e.keyCode === 38 || e.keyCode === 74) {
    ball.jumpEventStart('stop')
  }
});
// Shoot 
document.addEventListener('keydown', e => {
  if (e.keyCode === 83) ball.shootEventStart()
});

// Touch bottons events
// Jump
document.getElementById('on-j').addEventListener('touchstart', () => {
  ball.jumpEventStart('start')
}); 
document.getElementById('on-j').addEventListener('touchend', () => {        
  ball.jumpEventStart('stop')
});
// Shoot
document.getElementById('on-s').addEventListener('touchstart', () => {
  ball.shootEventStart()
});


// INTERACTION //////////
function interaction(ballPos, shoPos, enePos, d) {
  // Ball and enemy crash 
  if (
    ballPos[0]-d <= enePos[0] && 
    enePos[0] <= ballPos[0]+d && 
    ballPos[1]-d <= enePos[1] && 
    enePos[1] <= ballPos[1]+d
  ) {
    crash = true
  }

  // Shoot impact
  if (
    shoPos[0]-17 <= enePos[0] && 
    enePos[0] <= shoPos[0]+3 && 
    shoPos[1]-4 <= enePos[1] && 
    enePos[1] <= shoPos[1]+4
  ) {
    enemy.enemyElem.innerHTML = '✨'
    setTimeout(() => {
      enemy.eneY = 0
      setTimeout(() => {
        enemy.onAttack = false
      }, 50)
    }, 160)
  }
}


// Game loop ///////////
let loop = setInterval(() => {
  // Ball jump
  if (ball.jumpKeyDown && !ball.jumpKeyUp) ball.impulse()
  if (ball.jumpKeyUp) ball.jump()
  // Ball shoot
  if (ball.shootKeyDown) ball.shoot()

  // Enemy
  if (!enemy.onAttack) enemy.enemyX()
  else enemy.enemyMove()

  // Interaction
  interaction(ball.ballPos, ball.shoPos, enemy.enePos, 15)

  if (crash) {
    console.log('Game over!')
    clearInterval(loop)
    ball.ball.innerHTML = ball.faces[3]
    
    // anular eventListeners!!
  }
}, 1000/60)

window.onload = loop

