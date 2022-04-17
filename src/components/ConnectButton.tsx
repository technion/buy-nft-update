import { useRouter } from 'next/router';

const ConnectButton = ({ connect }: { connect: () => void }) => {
  const router = useRouter();

  return (
    <>
      <div className="relative my-4">
        <div className="flex absolute inset-0 items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
      </div>
      <div>
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
          onClick={connect}
        >
          <div className="flex justify-center items-center">
            <span className="ml-4">
              <img
                src={`${router.basePath}/assets/metamask-fox-wordmark-horizontal.svg`}
                alt="Metamask Logo"
              />{' '}
              Click to Connect your Metamask wallet
            </span>
          </div>
        </button>
      </div>
    </>
  );
};

export { ConnectButton };
