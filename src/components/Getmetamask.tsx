import { useRouter } from 'next/router';

const Getmetamask = () => {
  const router = useRouter();

  return (
    <>
      <div className="relative my-4">
        <div className="flex absolute inset-0 items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="flex relative justify-center text-sm">
          <span className="px-2 text-neutral-600 bg-white">
            {' '}
            Interacting with web3 requires installing Metamask Wallet browser
            extension{' '}
          </span>
        </div>
      </div>
      <div>
        <a href="https://metamask.io/download.html">
          <button
            type="submit"
            className="
                    block
                    items-center
                    py-3.5
                    px-10
                    w-full
                    text-base
                    font-medium
                    text-center text-blue-600
                    rounded-xl
                    border-2
                    border-white
                    focus:outline-none
                    focus:ring-2 focus:ring-gray-500
                    focus:ring-offset-2
                    shadow-md
                    transition
                    duration-500
                    ease-in-out
                  "
          >
            <div className="flex justify-center items-center">
              <span className="ml-4">
                <img
                  src={`${router.basePath}/assets/metamask-fox-wordmark-horizontal.svg`}
                  alt="Metamask Logo"
                />{' '}
                Click to Download
              </span>
            </div>
          </button>
        </a>
      </div>
    </>
  );
};

export { Getmetamask };
