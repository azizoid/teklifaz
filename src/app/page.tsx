const Home = () => (
  <>
    <h2 className="text-3xl font-bold text-blue-700 mb-6">Welcome to Teklifaz</h2>
    <p className="text-lg mb-4">
      Discover and contribute to Azeri developer projects! Here, you can find various open-source repositories
      built by developers in our community.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-xl font-bold text-blue-600">Project 1</h3>
        <p className="text-gray-700">A short description of the project.</p>
      </div>
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-xl font-bold text-blue-600">Project 2</h3>
        <p className="text-gray-700">A short description of the project.</p>
      </div>
      <div className="bg-white shadow-md rounded-md p-4">
        <h3 className="text-xl font-bold text-blue-600">Project 3</h3>
        <p className="text-gray-700">A short description of the project.</p>
      </div>
    </div>
  </>
);

export default Home