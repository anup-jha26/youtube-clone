import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsYoutube } from 'react-icons/bs';
import { CiSearch } from 'react-icons/ci';
import { AiOutlineClose } from 'react-icons/ai';

function Navbar({ search, setSearch }: { search: string; setSearch: (q: string) => void }) {
    const navigate = useNavigate();

    const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            navigate(search.trim() ? `/search?query=${search}` : '/');
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full bg-[#0c0c0c]">
            <nav className="flex justify-between items-center h-14 w-[95%] mx-auto gap-2 md:gap-0">
                {/* Left Section: Logo & Menu */}
                <div className="flex items-center gap-3 md:gap-8 cursor-pointer">
                    <a
                        href="#offcanvasExample"
                        role="button"
                        aria-controls="offcanvasExample"
                        data-bs-toggle="offcanvas"
                    >
                        <RxHamburgerMenu className="text-lg sm:text-xl" />
                    </a>
                    <div className="flex items-center gap-1" onClick={() => navigate('/')}>
                        <BsYoutube className="text-2xl sm:text-3xl text-red-600" />
                        <span className="text-lg sm:text-xl">Youtube</span>
                    </div>
                </div>

                {/* Center Section: Search Bar */}
                <div className="flex items-center">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="flex items-center h-9 sm:h-10 border border-neutral-700 rounded-full overflow-hidden">
                            <div className="flex items-center pr-3 sm:pr-5">
                                <input
                                    type="text"
                                    value={search}
                                    placeholder="Search"
                                    className="w-full md:w-96 px-3 text-md sm:text-lg text-zinc-300 placeholder-neutral-500 bg-[#0c0c0c] focus:outline-none"
                                    onChange={(e) => setSearch(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                />
                                <AiOutlineClose
                                    onClick={() => setSearch('')}
                                    className={`text-md sm:text-lg cursor-pointer text-neutral-400 ${search ? 'visible' : 'invisible'
                                        }`}
                                />
                            </div>
                            <button
                                type="submit"
                                className="w-16 flex items-center justify-center border-l border-neutral-700"
                            >
                                <CiSearch className="text-xl sm:text-2xl text-neutral-200" />
                            </button>
                        </div>
                    </form>
                </div>

                {/* Right Section: Placeholder */}
                <div className="hidden lg:block">{/* Reserved for future content */}</div>
            </nav>
        </header>
    );
}

export default Navbar;