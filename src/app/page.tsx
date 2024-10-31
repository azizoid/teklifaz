const Home = () => (
  <>
    <h2 className="text-3xl font-bold text-blue-700 mb-6">Welcome to Teklifaz</h2>
    <p className="text-lg mb-4">
      Discover and contribute to Azeri developer projects! Here, you can find various open-source repositories
      built by developers in our community.
    </p>

    <section className="container mx-auto py-16 px-4 lg:px-0 grid grid-cols-1 lg:grid-cols-3 gap-8 bg-white">

      <div className="lg:col-span-1 flex flex-col justify-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          IT & Cloud <br /> Consulting Firm
        </h1>
        <p className="text-lg text-gray-600 max-w-md">
          We are an IT consulting firm for SMBs and Enterprises in cybersecurity, cloud, and e-commerce industries.
        </p>
      </div>


      <div className="lg:col-span-2">
        <div className="space-y-8">
          <div className="flex items-start space-x-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">Software Consulting</h2>
              <p className="text-gray-600">Innovative software development tailored to meet client needs.</p>
            </div>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex items-start space-x-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">IT Staff Augmentation</h2>
              <p className="text-gray-600">We build top-tier IT teams with expertise across industries.</p>
            </div>
          </div>
          <div className="border-t border-gray-200"></div>
          <div className="flex items-start space-x-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-800">SOC as a Service</h2>
              <p className="text-gray-600">Seamlessly integrating with your IT infrastructure for security needs.</p>
            </div>
          </div>

        </div>
      </div>
    </section>
  </>
);

export default Home