export const HomeBelowCategory = () => {
  return (
    <section className="bg-primary-200">
      <div className="mx-auto w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="text-center">
            <div className="inline-flex rounded-lg bg-orange-50 p-3 text-yellow-800">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-yellow-900">
              Free Shipping
            </h3>

            <p className="mt-2 text-pretty text-yellow-700">
              On all orders over $50
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Secure Payments
            </h3>

            <p className="mt-2 text-pretty text-gray-700">
              Trusted checkout process
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 13.5V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m12-3V3.75m0 9.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 3.75V16.5m-6-9V3.75m0 3.75a1.5 1.5 0 0 1 0 3m0-3a1.5 1.5 0 0 0 0 3m0 9.75V10.5"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              Easy Returns
            </h3>

            <p className="mt-2 text-pretty text-gray-700">
              30-day hassle-free returns
            </p>
          </div>

          <div className="text-center">
            <div className="inline-flex rounded-lg bg-gray-100 p-3 text-gray-700">
              <svg
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5M9 11.25v1.5M12 9v3.75m3-6v6"
                />
              </svg>
            </div>

            <h3 className="mt-4 text-lg font-semibold text-gray-900">
              24/7 Customer Support
            </h3>

            <p className="mt-2 text-pretty text-gray-700">
              We’re here to help anytime
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}