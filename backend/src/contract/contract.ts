import Web3 from 'web3';
import ABI from '../ABI.json';

//https://sepolia.infura.io/v3/e0de627bc9634195a545c2cee7989ea8

//
const web3: Web3 = new Web3("https://eth-sepolia.g.alchemy.com/v2/lcgFyooUpazgR8K6EbRoqVof7_7exCDM");
const contractAddress: string = "0xa2f56d5bca5b8afd90fc2e309dfb41eff9840123";
const contract= new web3.eth.Contract(ABI as any[], contractAddress);



export { web3,contract };