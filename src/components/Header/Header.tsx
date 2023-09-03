export const Header = ()=> <header className="bg-blue-600 p-4 text-white">
    <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-semibold">
            <a href="#">AppName</a>
        </div>
        <div className="w-1/2 md:w-1/3">
            <input type="text" placeholder="Search..." className="w-full p-2 rounded" />
        </div>
    </div>
</header>