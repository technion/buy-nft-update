import { useRouter } from 'next/router';

import { CurrentNFT } from '@/components/currentNFT';
import { UpdateNFT } from '@/components/updateNFT';
import { Meta } from '@/layout/Meta';
import { Main } from '@/templates/Main';

const OPENSEA_LINK =
  'https://testnets.opensea.io/assets/0x03628Ed1d3234c4dFe49517775b17C676B11c116/0';

const Index = () => {
  const router = useRouter();

  return (
    <Main
      meta={
        <Meta
          title="Mutable NFT Project"
          description="A project that allows users to buy updates to an NFT URL"
        />
      }
    >
      <img
        src={`${router.basePath}/assets/mutable-nft-logo.png`}
        alt="Mutable NFT Project"
      />

      <h1 className="text-2xl font-bold">
        Live NFT Updates shown in below image
      </h1>
      <p>
        <span role="img" aria-label="rocket">
          🚀
        </span>{' '}
        Did you think NFTs couldn&apos;t be changed? Any anonymous user may use
        Ethereum to purchase updates to the NFT URL .{' '}
        <span role="img" aria-label="zap">
          ⚡️
        </span>
        Cat pictures recommended for updates!
      </p>
      <CurrentNFT />
      <UpdateNFT />
      <h2 className="text-lg font-semibold">How does it work?</h2>
      <p>The Solidity contract below, includes an update function. </p>
      <ul>
        <li>
          <span role="img" aria-label="fire">
            🔥
          </span>{' '}
          <a href="https://github.com/technion/lol-nft">Solidity code</a> for
          for Ethereum contract
        </li>
        <li>
          <span role="img" aria-label="tada">
            🎉
          </span>{' '}
          View the <a href={OPENSEA_LINK}>contract on Opensea</a>
        </li>
        <li>
          <span role="img" aria-label="fox_face">
            🦊
          </span>{' '}
          For obvious reasons I cannot prevent a person making this page NSFW,
          please consider this when accessing
        </li>
      </ul>
    </Main>
  );
};

export default Index;
