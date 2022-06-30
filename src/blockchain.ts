import {Block} from './block';

const config = require('config');

export class Blockchain {
  chain: Block[];
  difficulty: number;
  blockTime: number;
  constructor() {
    // chain starts with a Genesys Block
    this.chain = [new Block('Genesys Block')];
    this.difficulty = config.get('START_DIFFICULTY');
    this.blockTime = config.get('BLOCKTIME');
  }

  getLastBlock(): Block {
    return this.chain[this.chain.length - 1];
  }

  addBlock(block: Block) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(Object.freeze(block));
    //Adjust difficulty based on current build time. 
    //If it is lower than the blocktime then the difficulty is increased and if not it is decreased.
    this.difficulty +=
      Date.now() - parseInt(this.getLastBlock().timestamp) < this.blockTime
        ? 1
        : -1;
    return block;
  }

  isValid(blockchain = this) {
    //Checking if each element of the chain is valid, we determine if the entire chain is valid
    //Every Block must have previous block hash equal than current prev hash.
    //And current Block hash equal than recalculated Block hash (this is to check than data or hash has been changed)
    for (let index = 1; index < blockchain.chain.length; index++) {
      const currentBlock = blockchain.chain[index];
      const prevBlock = blockchain.chain[index - 1];
      if (
        currentBlock.hash !== currentBlock.getHash() ||
        prevBlock.hash !== currentBlock.prevHash
      ) {
        return false;
      }
    }
    return true;
  }
}
