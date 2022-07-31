function PreparePage() {
  return (
    <>
      <main className="text-center md:text-left mb-4">
        <h1 className="text-2xl font-medium mb-4">
          Preparing content for the page
        </h1>
        <p className="text-lg">Wait few seconds...</p>
      </main>
      <div className="flex justify-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          width={75}
          height={75}
        >
          <path
            fill="#000"
            d="M73,50c0-12.7-10.3-23-23-23S27,37.3,27,50 M30.9,50c0-10.5,8.5-19.1,19.1-19.1S69.1,39.5,69.1,50"
          >
            <animateTransform
              attributeName="transform"
              attributeType="XML"
              type="rotate"
              dur="1s"
              from="0 50 50"
              to="360 50 50"
              repeatCount="indefinite"
            />
          </path>
        </svg>
      </div>
    </>
  );
}

export default PreparePage;
