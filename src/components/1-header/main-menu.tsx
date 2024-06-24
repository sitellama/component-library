import { CSSProperties, useRef, useState } from "react";
import { Link, Location, NavLink, useLocation } from "react-router-dom";
import { useClickAway } from "react-use";
import { classNames, cn } from "@/utils";
import { IconCross, IconHamburger } from "@/ui";
import { createPortal } from "react-dom";

const linkClasses = "\
px-2 py-3 text-sm \
\
text-slate-900 \
bg-slate-300 \
hover:bg-sky-500 hover:text-white \
";

const linkActiveClasses = "!bg-white-700";

const itemClasses = (path: string, loc: Location): string => {
    const isActive = path === loc.pathname;
    return classNames(linkClasses, isActive && linkActiveClasses);
};

const menuRowClasses = "\
py-8 \
\
hidden \
sm:flex \
1space-x-4 \
";

const menuColClasses = "\
w-full \
sm:hidden \
\
bg-green-500 \
\
flex flex-col items-center \
";

export function MainMenu() {
    const loc = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const ref = useRef(null);

    useClickAway(ref, () => {
        closeMenu();
    });

    function closeMenu() {
        setIsMenuOpen(false);
    }

    return (
        <div className="z-50">
            <MenuBody className={menuRowClasses} closeMenu={closeMenu} loc={loc} />

            <div className="relative">
                <div>
                    <button
                        className="sm:hidden"
                        onClick={() => setIsMenuOpen((v) => !v)}
                        role="navigation"
                        aria-label="Main Menu" // aria-state={isMenuOpen ? "open" : "closed"}
                    >
                        {isMenuOpen
                            ? <IconCross className="size-7 fill-white" />
                            : <IconHamburger className="size-7 fill-white" />
                        }
                    </button>

                        {isMenuOpen &&
                            createPortal(
                                <div ref={ref} className="w-full absolute right-0 top-0 flex justify-end">
                                    <MenuBody className={menuColClasses} closeMenu={closeMenu} loc={loc} />
                                </div>, document.body
                            )
                        }
                </div>
            </div>
        </div>
    );
}

const c2Classes = "\
block \
px-3 \
py-2 \
text-2xl \
\
text-gray-900 \
dark:text-white \
dark:hover:bg-gray-700 \
dark:hover:text-white \
\
sm:hover:bg-gray-100 \
hover:bg-transparent \
\
1border-red-500 1border \
\
\
1md:p-0 \
1md:border-0 \
1md:hover:bg-transparent \
1md:hover:text-blue-700 \
1md:dark:hover:text-blue-500 \
1md:dark:hover:bg-transparent \
\
select-none \
\
";

function OurLink({ label, to, loc }: { label: string; to: string; loc: Location; }) {
    const isActive = to === loc.pathname;
    return (
        <li>
            {/* <Link to={to} className={itemClasses(to, loc)} aria-current={isActive ? "page" : undefined}>
                {label}
            </Link> */}

            <a
                href={to}
                className={classNames(c2Classes, isActive && "text-white")}
                target="_blank"
                aria-current={isActive ? "page" : undefined}
                onClick={(e) => {
                    e.preventDefault();
                    console.log("clicked");

                    window.location.href = to;
                }
                }
            >
                {label}
            </a>
        </li>
    );
}

function MenuBody({ closeMenu, loc, className }: { closeMenu: () => void; loc: Location; className?: string; }) {
    return (
        <ul className={className}>
            <OurLink label="Home" to="/" loc={loc} />
            <OurLink label="Services" to="/services" loc={loc} />
            <OurLink label="Portfolio" to="/portfolio" loc={loc} />
            <OurLink label="Pricing" to="/pricing" loc={loc} />
            <OurLink label="Contact" to="/contact" loc={loc} />
        </ul>
    );
}