const SHA256=require('crypto-js/SHA256');

class Block{
    constructor(index, timestamp, data, previousHash=''){
        this.index=index;
        this.timestamp=timestamp;
        this.data=data;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
    }
}

class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
    }

    createGenesisBlock(){
        return new Block(0, "05/10/2023", "GenesisBlock", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    addBlock(newBlock){
        newBlock.previousHash=this.getLatestBlock().hash;
        newBlock.hash=newBlock.calculateHash();
        this.chain.push(newBlock);
    }

}

let icegreenCoin = new Blockchain();
icegreenCoin.addBlock(new Block(1 , "05/10/2023", "sent= 16"));
icegreenCoin.addBlock(new Block(2 , "05/10/2023", "recv= 32"));
icegreenCoin.addBlock(new Block(3 , "05/10/2023", "sent= 100"));

console.log(JSON.stringify(icegreenCoin, null, 2));

