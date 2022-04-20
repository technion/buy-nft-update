const UpdateURIForm = ({
  submitURIUpdate,
  account,
}: {
  submitURIUpdate: (e: any) => void;
  account: string;
}) => {
  return (
    <section className="text-blueGray-700">
      <div className="container items-center py-12 px-5 lg:px-20">
        Welcome account {account}
        <div className="relative my-4">
          <div className="flex absolute inset-0 items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="flex relative justify-center text-sm">
            <span className="px-2 text-neutral-600 bg-white">
              {' '}
              Enter only the desired image url{' '}
            </span>
          </div>
        </div>
        <div
          className="
            flex flex-col
            my-6
            mx-auto
            w-full
            max-w-md
            bg-white
            rounded-lg
            transition
            duration-500
            ease-in-out
            md:mt-0
          "
        >
          <div className="mt-6">
            <form
              action="#"
              method="POST"
              className="space-y-6"
              data-bitwarden-watching="1"
              onSubmit={submitURIUpdate}
            >
              <div>
                <label
                  htmlFor="uri"
                  className="block text-sm font-medium text-neutral-600"
                >
                  {' '}
                  New Image URI{' '}
                </label>
                <div className="mt-1">
                  <input
                    id="uri"
                    name="uri"
                    type="url"
                    required
                    placeholder="https://example.com/images.png"
                    className="
                        block
                        py-3
                        px-5
                        w-full
                        text-base text-neutral-600
                        placeholder:text-gray-300
                        bg-gray-50
                        rounded-lg
                        border
                        border-transparent
                        focus:border-transparent focus:outline-none
                        focus:ring-2
                        focus:ring-white
                        focus:ring-offset-2
                        focus:ring-offset-gray-300
                        transition
                        duration-500
                        ease-in-out
                      "
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="
                      flex
                      justify-center
                      items-center
                      py-4
                      px-10
                      w-full
                      text-base
                      font-medium
                      text-center text-white
                      bg-blue-600
                      hover:bg-blue-700
                      rounded-xl
                      focus:outline-none
                      focus:ring-2
                      focus:ring-blue-500
                      focus:ring-offset-2
                      transition
                      duration-500
                      ease-in-out
                    "
                >
                  {' '}
                  Send URI Update to Blockchain{' '}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export { UpdateURIForm };
