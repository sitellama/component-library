import { useEffect } from "react";
import { Location, Outlet, useLocation } from "react-router-dom";
import ReactGA from 'react-ga';
import { Header } from "../components/1-header";
import { Footer } from "../components/3-footer";
import { classNames } from "@/utils";

ReactGA.initialize('UA-000000-01');

export function Root() {
    const loc = useLocation();

    useEffect(
        () => {
            reportGA(loc);
        }, [loc.pathname, loc.search]
    );

    return (<>
        <div className="relative bg-zinc-100">
            <Header className={classNames(loc.pathname === "/" && "absolute")} />
            <Outlet />
        </div>

        <Footer />
    </>);
}

function reportGA(loc: Location) {
    ReactGA.pageview(loc.pathname + loc.search, undefined, "0-root-title");

    ReactGA.event({
        category: 'Page Click',
        action: 'Clicked on Buy Now',
        label: 'Product Page',
    });
}
