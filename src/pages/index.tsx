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
      <a href="https://github.com/ixartz/Next-js-Boilerplate">
        <img
          src={`${router.basePath}/assets/images/nextjs-starter-banner.png`}
          alt="Nextjs starter banner"
        />
      </a>
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
          View the <a href={OPENSEA_LINK}></a>
          contract on Opensea
        </li>
      </ul>

      <p>
        Website was built using{' '}
        <a href="https://github.com/ixartz/Next-js-Boilerplate">
          Nextjs Boilerplate
        </a>
        . You can also browse our{' '}
        <a href="https://creativedesignsguru.com/category/nextjs/">
          Premium NextJS Templates
        </a>{' '}
        on our website to support this project.
      </p>
    </Main>
  );
};

export default Index;
