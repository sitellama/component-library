import { RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { CookiesPopup } from './ui/cookies-popup';
import { router } from './routes';
import { useEffect } from 'react';

function scrollToHashElement() {
    const { hash } = window.location;

    const elementToScroll = document.getElementById(hash?.replace("#", ""));
    if (!elementToScroll) {
        console.log('%celement not found', 'color: red');
        return;
    }

    const iframe = document.querySelector('iframe');
    if (!iframe) {
        console.log('%ciframe not found', 'color: red');
        return;
    }

    console.log({ elementToScroll, rect: elementToScroll.getBoundingClientRect(), windowTop: window.scrollY });
    console.log('offsetTop', elementToScroll.offsetTop, 'clientTop', elementToScroll.clientTop);

    window.scrollTo({
        top: elementToScroll.offsetTop,
        behavior: "instant"// "smooth"
    });
}

export function App() {
    useEffect(() => {
        setTimeout(
            () => {
                scrollToHashElement();
            }, 1000
        );

        window.addEventListener("hashchange", scrollToHashElement);

        return () => {
            window.removeEventListener("hashchange", scrollToHashElement);
        };
    }, []);

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <HelmetProvider context={{}}>
                <RouterProvider router={router} />
                <CookiesPopup />
            </HelmetProvider>
        </div>
    );
}
