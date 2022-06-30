const crypto = require('crypto');
const SHA256 = (message: string) =>
  crypto.createHash('sha256').update(message).digest('hex');

export class Block {
  data: string;
  timestamp: string;
  hash: string;
  prevHash: string;
  nonce: number;
  constructor(data = '') {
    //Just give data to create a Block. Timestamp its added in the contructor.
    this.timestamp = Date.now().toString();
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = '';
    this.nonce = 0;
  }

  getHash() {
    //Hash is created with all data in the Block. This will allow detect when Block data is changed
    return SHA256(
      this.prevHash + this.timestamp + JSON.stringify(this.data) + this.nonce
    );
  }

  mine(difficulty: number) {
    //When a block is created the difficulty is to 
    // create the hash that starts with a certain amount of zeros (difficulty)
    //
    //Alternative, you can adjust the difficulty with the log(16) (just like Bitcoin does)
    //const newDifficulty = Math.floor(Math.log(difficulty) / Math.log(16));
    const newDifficulty = difficulty;
    do {
      this.nonce++;
      this.hash = this.getHash();
    } while (!this.hash.startsWith(Array(newDifficulty + 1).join('0')));
  }

  toString() {
    return `Block Data
      timestamp: ${this.timestamp}
      data: ${this.data}
      hash: ${this.hash}
      prevHash: ${this.prevHash}
      nonce: ${this.nonce}
    `;
  }
}
