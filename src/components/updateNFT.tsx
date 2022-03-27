import { useState } from 'react';

const UpdateNFT = () => {
  const { ethereum } = window;
  const [currentAccount, setCurrentAccount] = useState(null);

  if (!ethereum) {
    return <>Please install Metamask!</>;
  }
  if (currentAccount === null) {
    return (
      <button className="cta-button connect-wallet-button">
        Connect to Wallet
      </button>
    );
  }
  return (
    <>
      <form>
        <input id="uri" type="text" required />
        <button type="submit" className="cta-button connect-wallet-button">
          Submit
        </button>
      </form>
      You are logged in!
    </>
  );
};

export { UpdateNFT };
