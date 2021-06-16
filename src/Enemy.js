class Enemy {
  constructor() {
    this.enemyElem = document.getElementById('misile')
    this.onAttack = false
    this.faces = ['👾', '👻', '👿', '👽', '👺', '👹', '🤡', '💀', '🧟', '🧛', '🤖', '🎅', '🧚', '🧙', '🧝', '💣', '⛄', '🦇', '🧞', '🦹']
    this.eneY = 0;
    this.eneX = 0;
    this.enePos = [180, 320];
    this.d = 19; // size enemy
  }

  // Enemy inital position
  enemyX() {
    this.onAttack = true
    this.eneX = Math.floor(Math.random()*6)*20;
    this.enePos.splice(0, 1, 180-this.eneX); 
    this.enemyElem.style.top = `${this.enePos[0]}px`;
    
    // select ramdom face
    this.faceIndex = Math.floor(Math.random()*this.faces.length)
    //console.log(this.faceIndex)
    this.enemyElem.innerHTML = this.faces[this.faceIndex]
    this.enemyElem.style.display = 'block'
  }
  // enemy movement
  enemyMove() {
    this.eneY++
    this.enePos.splice(1, 1, 320-this.eneY);
    this.enemyElem.style.left = `${this.enePos[1]}px`;

    // End screen 
    if (this.enePos[1] < -this.d) {
      this.onAttack = false
      this.eneY = 0;
    }
  }
}

export default Enemy
