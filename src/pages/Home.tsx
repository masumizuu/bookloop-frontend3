import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
    const [userId, setUserId] = useState<number | null>(null);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         const user = await getCurrentUser();
    //         if (user) setUserId(user.user_id);
    //     };
    //
    //     fetchUser();
    // }, []);

    return (
        <div className="min-h-screen w-screen">

            {/* Navigation Bar */}
            <nav className="absolute top-0 z-10 text-cream-0 py-2 px-8 flex flex-row items-center shadow-lg text-xl bg-brown-0 bg-opacity-50 w-full font-pd italic font-bold">
                <div className="w-1/3">
                    <img src="/logo.svg" alt="bookloop" className="h-14 w-14" />
                </div>

                <ul className="flex gap-5 w-full justify-center">
                    <li>
                        <NavLink
                            to="/home"
                            className={`hover-text-glow hover:text-xl ${location.pathname === "/home" ? "glow-brown" : ""}`}
                        >
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/home/search"
                            className={`hover-text-glow hover:text-xl ${location.pathname.startsWith("/home/search") ? "glow-brown" : ""}`}
                        >
                            Search
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to={`/wishlist/${userId}`}
                            className={({ isActive }) =>
                                `hover-text-glow hover:text-xl ${isActive ? "glow-brown" : ""}`
                            }
                        >
                            Wishlist
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/donate"
                            className={({ isActive }) =>
                                `hover-text-glow hover:text-xl ${isActive ? "glow-brown" : ""}`
                            }
                        >
                            Donate
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/shelf"
                            className={({ isActive }) =>
                                `hover-text-glow hover:text-xl ${isActive ? "glow-brown" : ""}`
                            }
                        >
                            Shelf
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/drop-off"
                            className={({ isActive }) =>
                                `hover-text-glow hover:text-xl ${isActive ? "glow-brown" : ""}`
                            }
                        >
                            Drop-off
                        </NavLink>
                    </li>
                </ul>

                <div className="w-1/3 justify-items-end">
                    <img src="/logo.svg" alt="bookloop" className="h-14 w-14" />
                </div>
            </nav>

            {/* Main Content */}
            <main className="w-full h-full">
                <Outlet /> {/* Dynamic content changes here */}
            </main>

            {/* Footer */}
            {/*<footer className="absolute bottom-0 text-brown-0 text-center py-3 w-full bg-brown-0 bg-opacity-30">*/}
            {/*    (C) {new Date().getFullYear()} BookLoop. All rights reserved.*/}
            {/*</footer>*/}
        </div>
    );
};

export default Home;