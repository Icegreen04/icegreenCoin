const SHA256=require('crypto-js/SHA256');

class transactions{
    constructor(fromaddress, toaddress, amount){
         this.fromaddress=fromaddress;
         this.toaddress=toaddress;
         this.amount=amount;
    }
}

class Block{
    constructor(timestamp, transactions, previousHash=''){
        this.timestamp=timestamp;
        this.transactions=transactions;
        this.previousHash=previousHash;
        this.hash=this.calculateHash();
        this.nonce=0;
    }

    calculateHash(){
        return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash +this.nonce).toString();
    }

    mineBlock(difficulty){
        while(this.hash.substring(0, difficulty) !== Array(difficulty+1).join("0")){
            this.nonce++;
            this.hash=this.calculateHash();
        }

        console.log("Block Mined: " + this.hash); 
    }
}


class Blockchain{
    constructor(){
        this.chain =[this.createGenesisBlock()];
        this.difficulty=2;
        this.pendingtransactions=[];
        this.miningreward=100;
    }

    createGenesisBlock(){
        return new Block("05/10/2023", "GenesisBlock", "0");
    }

    getLatestBlock(){
        return this.chain[this.chain.length-1];
    }

    minePendingTransactions(miningRewardAddress){
        let block= new Block(Date.now(), this.pendingtransactions);
        block.mineBlock(this.difficulty);

        console.log('Block mined successfully');
        this.chain.push(block);

        this.pendingtransactions = [
            new transactions(null, miningRewardAddress, this.miningreward)
        ];
    }

    createTransaction(transactions){
        this.pendingtransactions.push(transactions);
    }

    getBalanceofAddress(address){
        let balance = 0;

        for(const block of this.chain){
            for(const trans of block.transactions){
                if(trans.fromaddress === address){
                    balance -= trans.amount;
                }

                if(trans.toaddress === address){
                    balance += trans.amount;
                }
            }
        }

        return balance;
    }

    isChainValid(){
        for(let i=1; i< this.chain.length;i++){
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i-1];

            if(currentBlock.hash !== currentBlock.calculateHash()){
                return false;
            }

            if(currentBlock.previousHash !== previousBlock.hash){
                return false;
            }

        }

        return true;

    }

}

let icegreenCoin = new Blockchain();
icegreenCoin.createTransaction(new transactions('1','2', 16));
icegreenCoin.createTransaction(new transactions('2','1', 10));

console.log('starting the miner... ');
icegreenCoin.minePendingTransactions('Harshits-address');
console.log('\nBalance of Harshit is ', icegreenCoin.getBalanceofAddress('Harshits-address'));

icegreenCoin.createTransaction(new transactions('1','2', 20));
icegreenCoin.createTransaction(new transactions('3','2', 16));

console.log('starting the miner... ');
icegreenCoin.minePendingTransactions('Harshits-address');
console.log('\nBalance of Harshit is ', icegreenCoin.getBalanceofAddress('Harshits-address'));
console.log('\nBalance of address 2: ', icegreenCoin.getBalanceofAddress('2'));
