export default function Header() {
    return (
        <header className="w-full bg-transparent text-white py-4 px-8 top-0 z-10">
            <div className="container mx-auto flex justify-between items-center">
                <div className="items-center">
                    <div className="text-4xl font-bold mr-4">SCI</div>
                    <div className="text-xs">Internal System Control</div>
                </div>
                <nav>
                    <ul className="flex space-x-4">
                        <li className="hover:bg-violet-700 px-3 py-2 rounded-md">Institution</li>
                        <li className="hover:bg-violet-700 px-3 py-2 rounded-md">Users</li>
                        <li className="hover:bg-violet-700 px-3 py-2 rounded-md">Reports</li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
