import { SEO } from "../../utils/seo";
import { HeroBanner } from "../4-library/herobanner";
import PriceSection from "../4-library/pricing-section";
import { PortfolioFeatured } from "../4-library/portfolio-featured";
import { ContactForm } from "../4-library/contact-form";
import mascot from "../../assets/llama_mascot-form.webp";
import recentWork from "../../assets/recent-work.webp";
import s6Horses from "../../assets/portfolio1.webp";
import kcrafts from "../../assets/portfolio2.webp";
import bsf from "../../assets/portfolio3.webp";
import Growth from "../4-library/growth";
import Intro from "../4-library/intro";
import { LlamaTechnology } from "../4-library/llama-technology";
import Carousel from "../4-library/carousel";
import Components from "@/ui/components";

export function Home() {
    return (
        <>
            <SEO title="Home | Sitellama" description="We build custom websites with fast speeds, great user experiences and that meet your business needs." href="https:www.sitellama.com/" />

            <HeroBanner />

            <Components />
        </>
    );
}
