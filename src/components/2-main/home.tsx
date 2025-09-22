import { SEO } from "../../utils/seo";
import { HeroBanner } from "../4-library/herobanner";
import Components from "@/ui/components";
import { Reviews, reviewsMobile, reviewsDesktop } from "../4-library/reviews";
import { ReviewsTest } from "../4-library/reviews/reviews-test";

const handleCreateFile = async () => {
  const res = await fetch('http://localhost:3001/api/create-reviews', { method: 'POST' });
  const data = await res.json();
  alert(data.message || data.error);
};

export function Home() {
    return (
        <>
            <SEO title="Home | Sitellama" description="We build custom websites with fast speeds, great user experiences and that meet your business needs." href="https:www.sitellama.com/" />

            <HeroBanner />

            <button onClick={handleCreateFile}>Create Reviews File</button>
            <ReviewsTest />
            <Reviews />

            <img src={reviewsMobile} alt="Reviews Mobile" />
            <img src={reviewsDesktop} alt="Reviews Desktop" />

            <Components />

        </>
    );
}
