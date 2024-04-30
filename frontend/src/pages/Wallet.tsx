/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, useState } from 'react';
import Web3 from 'web3';
import { useNavigate } from 'react-router-dom';
import ABI from "./ABI.json"
import { FidgetSpinner,Puff } from 'react-loader-spinner'


interface WalletProps {
  saveState: (state: { web3: Web3, contract: any, account: string }) => void;
}

declare global {
  interface Window {
    ethereum?: any; 
  }
}


const Wallet: FC<WalletProps> = ({ saveState }) => {
  const navigateTo = useNavigate();
  const [isLoading ,setIsLoading]=useState<boolean>(false);

  const connectWallet = async (): Promise<void> => {
    try {
        setIsLoading(true)
      if (window.ethereum ) {
        const web3 = new Web3(window.ethereum);
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts"
        })

        
        const contractAddress = "0xa2f56d5bca5b8afd90fc2e309dfb41eff9840123";
        const contract = new web3.eth.Contract(ABI as any [], contractAddress);
        saveState({ web3: web3, contract: contract, account: accounts[0] })
        navigateTo("/view-all-expense")
      } else {
        throw new Error
      }
    } catch (error) {
      console.error(error)
    }finally{
      setIsLoading(true)

    }
  }

  return (
    <>
      <div className="wallet_header ">
      <FidgetSpinner
       backgroundColor="#4D36F6"
       height="40"
       width="40"
       ariaLabel="fidget-spinner-loading"
       wrapperStyle={{}}
       wrapperClass="fidget-spinner-wrapper"
        visible={true}
        />
     <p>Expense Tracker</p>
      </div>
      <div className="connect_wallet_section expense_btn">
        <p> Please connect metamask </p>
        <button onClick={connectWallet}>Connect Wallet  </button>
        <Puff
  visible={isLoading}
  height="80"
  width="80"
  color="#4D36F6"
  ariaLabel="puff-loading"
  wrapperStyle={{}}
  wrapperClass=""
  />
        <p>wallet to access the app </p>
      </div>
    </>
  );
}



export default Wallet;