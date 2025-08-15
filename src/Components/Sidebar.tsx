import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RxHamburgerMenu } from 'react-icons/rx';
import { BsYoutube } from 'react-icons/bs';
import { MdHomeFilled, MdOutlineSportsVolleyball, MdOutlineLightbulb } from 'react-icons/md';
import { TbMusic, TbDeviceGamepad2, TbHanger } from 'react-icons/tb';
import { BiMoviePlay } from 'react-icons/bi';
import { FaRegNewspaper } from 'react-icons/fa';

const API_KEY = import.meta.env.VITE_API_KEY;

function Sidebar({
    filter,
    setFilter,
    setCategoryId
}: {
    filter: string;
    setFilter: (filter: string) => void;
    setCategoryId: (categoryId: string | null) => void;
}) {
    const navigate = useNavigate();
    const [categoriesData, setCategoriesData] = useState<any[]>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const { data } = await axios.get(
                    `https://www.googleapis.com/youtube/v3/videoCategories?key=${API_KEY}&part=snippet&regionCode=US`
                );
                setCategoriesData(data.items);
            } catch (err) {
                console.error('Failed to fetch categories');
            }
        };

        fetchCategories();
    }, []);

    const mainLinks = [
        {
            icon: <MdHomeFilled className="text-xl" />,
            name: 'Home',
            filterTag: 'home',
            categoryId: null
        }
    ];

    const categoriesLinks = [
        { name: 'Music', filterTag: 'music', icon: <TbMusic className="text-xl" />, title: 'Music' },
        { name: 'Sport', filterTag: 'sport', icon: <MdOutlineSportsVolleyball className="text-xl" />, title: 'Sports' },
        { name: 'Gaming', filterTag: 'gaming', icon: <TbDeviceGamepad2 className="text-xl" />, title: 'Gaming' },
        { name: 'Movies', filterTag: 'movies', icon: <BiMoviePlay className="text-xl" />, title: 'Movies' },
        { name: 'News', filterTag: 'news', icon: <FaRegNewspaper className="text-xl" />, title: 'News & Politics' },
        { name: 'Fashion', filterTag: 'fashion', icon: <TbHanger className="text-xl" />, title: 'Howto & Style' },
        { name: 'Course', filterTag: 'course', icon: <MdOutlineLightbulb className="text-xl" />, title: 'Education' }
    ].map(link => ({
        ...link,
        categoryId: categoriesData.find(item => item.snippet.title === link.title)?.id || null
    }));

    const handleSelection = (filterTag: string, categoryId: string | null, redirect = false) => {
        setFilter(filterTag);
        setCategoryId(categoryId);
        if (redirect) navigate('/');
    };

    return (
        <aside className="w-full h-full text-white bg-[#0c0c0c]" data-bs-toggle="offcanvas">
            {/* Header */}
            <div className="flex items-center gap-8 w-[85%] mx-auto h-14">
                <a
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                    data-bs-toggle="offcanvas"
                >
                    <RxHamburgerMenu className="text-xl" />
                </a>
                <div className="flex items-center gap-1 cursor-pointer" onClick={() => navigate('/')}>
                    <BsYoutube className="text-3xl text-red-600" />
                    <span className="text-xl">Youtube</span>
                </div>
            </div>

            {/* Main Links */}
            <ul className="border-b border-zinc-700">
                {mainLinks.map(({ icon, name, filterTag, categoryId }) => (
                    <li
                        key={name}
                        className={`pl-6 py-3 hover:bg-neutral-800 ${filter === filterTag ? 'bg-neutral-800' : ''
                            }`}
                        onClick={() => handleSelection(filterTag, categoryId, true)}
                    >
                        <div className="flex items-center gap-5">
                            {icon}
                            <span className="text-sm">{name}</span>
                        </div>
                    </li>
                ))}
            </ul>

            {/* Category Links */}
            <ul className="border-b border-zinc-700">
                {categoriesLinks.map(({ icon, name, filterTag, categoryId }) => (
                    <li
                        key={name}
                        className={`pl-6 py-3 hover:bg-neutral-800 ${filter === filterTag ? 'bg-neutral-800' : ''
                            }`}
                        onClick={() => handleSelection(filterTag, categoryId)}
                    >
                        <div className="flex items-center gap-5">
                            {icon}
                            <span className="text-sm">{name}</span>
                        </div>
                    </li>
                ))}
            </ul>
        </aside>
    );
}

export default Sidebar;