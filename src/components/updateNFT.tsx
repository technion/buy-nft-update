import { useCallback, useEffect, useState } from 'react';

import { ethers } from 'ethers';

import { Getmetamask } from '@/components/Getmetamask';

import LolNFT from '../utils/LolNFT.json';
import { ConnectButton } from './ConnectButton';
import { UpdateURIForm } from './UpdateURIForm';

const CONTRACT_ADDRESS = '0x03628Ed1d3234c4dFe49517775b17C676B11c116';

const encodeTokenURI = (uri: string) => {
  const metadata = {
    name: 'LolNFT',
    description: 'A pay for update ',
    image: uri,
  };
  return `data:application/json;base64,${window.btoa(
    JSON.stringify(metadata)
  )}`;
};

type UpdateState =
  | 'NO WALLET'
  | 'NOT CONNECTED'
  | 'CONNECTED'
  | 'UPDATED'
  | 'CONFIRMED';

const UpdateNFT = () => {
  const [connectStatus, setConnectStatus] = useState<{
    UpdateState: UpdateState;
    message?: string;
  } | null>(null);

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
      setConnectStatus({
        UpdateState: 'UPDATED',
        message: 'Sending update, please await execution...',
      });
      const nftTxn = await connectedContract.buyURLUpdate(0, newURI, {
        value: 4,
      });
      await nftTxn.wait();
      setConnectStatus({
        UpdateState: 'UPDATED',
        message: `NFT Update processed, see transaction: https://rinkeby.etherscan.io/tx/${nftTxn.hash}`,
      });
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
        setConnectStatus({ UpdateState: 'CONNECTED', message: accounts[0] });
      });
  };

  const respondEvent = (_from: string, tokenId: ethers.BigNumber) => {
    setConnectStatus({
      UpdateState: 'CONFIRMED',
      message: `Your NFT update has been confirmed. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`,
    });
  };

  const setupEventListener = useCallback(async () => {
    try {
      const { ethereum } = window as any; // Typescript doesn't know about the Metamask extension
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

      connectedContract.on('LolUpdatedURI', respondEvent);
      return connectedContract;
    } catch (e) {
      // No error worth catching here. Simply don't run the event listener.
    }
    return null;
  }, []);

  useEffect(() => {
    const { ethereum } = window as any; // Typescript doesn't know about the Metamask extension
    if (!ethereum) {
      setConnectStatus({ UpdateState: 'NO WALLET' });
      return;
    }

    const checkIfWalletIsConnected = async () => {
      const accounts = await ethereum.request({ method: 'eth_accounts' });
      if (accounts.length === 0) {
        setConnectStatus({ UpdateState: 'NOT CONNECTED' });
        return;
      }
      setConnectStatus({ UpdateState: 'CONNECTED', message: accounts[0] });
    };
    checkIfWalletIsConnected();
  }, []);

  useEffect(() => {
    // Setup the event listener. We retain the object so we can clear it after an unmount
    let contract: ethers.Contract | null;
    if (connectStatus?.UpdateState === 'CONNECTED') {
      setupEventListener().then((c) => {
        contract = c;
      });
    }
    return () => {
      contract?.removeListener('LolUpdatedURI', respondEvent);
    };
  }, [connectStatus, setupEventListener]);

  if (connectStatus == null) {
    return <>Page Loading</>;
  }
  if (connectStatus.UpdateState === 'NO WALLET') {
    return <Getmetamask />;
  }
  if (connectStatus.UpdateState === 'NOT CONNECTED') {
    return <ConnectButton connect={connectWallet} />;
  }
  if (connectStatus.UpdateState === 'CONNECTED') {
    // connectStatus.message can't actually be undefined here - it's allowed to be undefined to suit other status codes
    // The || ensures Typescript knows something will be sent here and the account parameter must be some form of string
    return (
      <UpdateURIForm
        submitURIUpdate={submitURIUpdate}
        account={connectStatus.message || ''}
      />
    );
  }
  if (connectStatus.UpdateState === 'UPDATED') {
    return (
      <div className="relative my-4">
        <div className="flex absolute inset-0 items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="flex relative justify-center text-sm">
          <span className="px-2 text-neutral-600 bg-white">
            {' '}
            {connectStatus.message}{' '}
          </span>
        </div>
      </div>
    );
  }
  if (connectStatus.UpdateState === 'CONFIRMED') {
    return (
      <div className="relative my-4">
        <div className="flex absolute inset-0 items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="flex relative justify-center text-sm">
          <span className="px-2 text-neutral-600 bg-white">
            {' '}
            {connectStatus.message}{' '}
          </span>
        </div>
      </div>
    );
  }
  throw new Error('Unmatched code');
};

export { UpdateNFT };
