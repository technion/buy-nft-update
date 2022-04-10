import { useEffect, useState } from 'react';

import { ethers, providers } from 'ethers';

import LolNFT from '../utils/LolNFT.json';

// const OPENSEA_LINK =
//  'https://testnets.opensea.io/assets/0x03628Ed1d3234c4dFe49517775b17C676B11c116/0';

const CONTRACT_ADDRESS = '0x03628Ed1d3234c4dFe49517775b17C676B11c116';

const gettokenURI = async (): Promise<string> => {
  const provider = new providers.InfuraProvider('rinkeby');

  const contract = new ethers.Contract(CONTRACT_ADDRESS, LolNFT.abi, provider);
  const metadata = await contract.tokenURI(0);
  const uri = window.atob(
    metadata.replace('data:application/json;base64,', '')
  );
  const safeURL = new URL(JSON.parse(uri).image);
  if (!['http:', 'https:'].includes(safeURL.protocol)) {
    throw new Error('Invalid protocol');
  }

  return safeURL.href;
};

const CurrentNFT = () => {
  const [getURI, setURI] = useState<string | null>(null);
  useEffect(() => {
    const callgettokenURI = async () => {
      const uri = await gettokenURI();
      // console.log(uri);
      setURI(uri);
    };

    callgettokenURI();
  }, []);

  if (getURI === null) {
    return <>Loading NFT..</>;
  }
  return (
    <>
      Image is:
      <img src={getURI} alt="Test" />
    </>
  );
};

export { CurrentNFT };
