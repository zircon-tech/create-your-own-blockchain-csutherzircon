import {Block} from './block';
import {Blockchain} from './blockchain';

const blockchain = new Blockchain();
console.log('----------------------');
console.log('BLOCKCHAIN PARAMETERS');
console.log(`   difficulty: ${blockchain.difficulty}`);
console.log(`   blockTime:  ${blockchain.blockTime}`);
console.log('----------------------');
console.log(blockchain.chain[0].toString());
for (let i = 0; i < 5; i++) {
  const block = blockchain.addBlock(new Block(`{data: "Bloque ${i}"}`));
  console.log(`BLOCKCHAIN difficulty: ${blockchain.difficulty}`);
  console.log(block.toString());
}

console.log(`BLOCKCHAIN IS ${blockchain.isValid() ? '' : 'NOT '}VALID`);
