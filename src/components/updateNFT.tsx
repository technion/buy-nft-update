import { useEffect, useState } from 'react';

import { ethers } from 'ethers';

import { Getmetamask } from '@/components/Getmetamask';

import LolNFT from '../utils/LolNFT.json';
import { ConnectButton } from './ConnectButton';
import { UpdateURIForm } from './UpdateURIForm';

const CONTRACT_ADDRESS = '0x03628Ed1d3234c4dFe49517775b17C676B11c116';

const encodeTokenURI = (uri: any) => {
  const metadata = {
    name: 'LolNFT',
    description: 'A pay for update ',
    image: uri,
  };
  return `data:application/json;base64,${window.btoa(
    JSON.stringify(metadata)
  )}`;
};

const UpdateNFT = () => {
  const [connectStatus, setConnectStatus] = useState<string | null>(null);

  const submitURIUpdate = async (form: React.SyntheticEvent) => {
    // Typing: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/forms_and_events/
    form.preventDefault();
    const target = form.target as typeof form.target & {
      uri: { value: string };
    };

    const newURI = encodeTokenURI(target.uri.value.trim());
    try {
      const { ethereum } = window as any;
      if (!ethereum) {
        throw Error('Metamask extension not found');
      }
      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();
      const connectedContract = new ethers.Contract(
        CONTRACT_ADDRESS,
        LolNFT.abi,
        signer
      );
      const nftTxn = await connectedContract.buyURLUpdate(0, newURI, {
        value: 4,
      });
      await nftTxn.wait();
      console.log(
        `Updated, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`
      );
    } catch (error) {
      console.log(error);
    }
  };

  const connectWallet = () => {
    // The flow of this component is such that this function should only be called after the ethereum object is confirmed
    // So we can expect the object to exist
    const { ethereum } = window as any; // Typescript doesn't know about the Metamask extension
    ethereum
      .request({ method: 'eth_requestAccounts' })
      .then((accounts: any) => {
        setConnectStatus(accounts[0]);
      });
  };
  useEffect(() => {
    const { ethereum } = window as any; // Typescript doesn't know about the Metamask extension
    if (!ethereum) {
      setConnectStatus('NO WALLET');
      return;
    }

    const checkIfWalletIsConnected = async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        setConnectStatus('NOT CONNECTED');
        return;
      }
      setConnectStatus(accounts[0]);
    };
    checkIfWalletIsConnected();
  }, []);

  if (connectStatus == null) {
    return <>Page Loading</>;
  }
  if (connectStatus === 'NO WALLET') {
    return <Getmetamask />;
  }
  if (connectStatus === 'NOT CONNECTED') {
    return <ConnectButton connect={connectWallet} />;
  }
  /*
  return (
    <>
      <form onSubmit={submitURIUpdate}>
        <input id="uri" type="text" required />
        <button type="submit" className="cta-button connect-wallet-button">
          Submit
        </button>
      </form>
      You are logged in! Welcome account {connectStatus}
    </>
  );
  */
  return <UpdateURIForm submitURIUpdate={submitURIUpdate} />;
};

export { UpdateNFT };
