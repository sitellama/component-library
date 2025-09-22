const fs = require('fs');
const path = require('path');

const fileContent = `export const Reviews = () => {
    return (
        <section className="py-12 bg-gray-50 sm:py-16 lg:py-20">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    <div className="text-center">
                        <p className="text-lg font-medium text-gray-600 font-pj">2,157 people have said how good Rareblocks</p>
                        <h2 className="mt-4 text-3xl font-bold text-gray-900 sm:text-4xl xl:text-5xl font-pj">Our happy clients say about us</h2>
                    </div>
                    <div className="mt-8 text-center md:mt-16 md:order-3">
                        <a href="#" title="" className="pb-2 text-base font-bold leading-7 text-gray-900 transition-all duration-200 border-b-2 border-gray-900 hover:border-gray-600 font-pj focus:outline-none focus:ring-1 focus:ring-gray-900 focus:ring-offset-2 hover:text-gray-600"> Check all 2,157 reviews </a>
                    </div>
                    <div className="relative mt-10 md:mt-24 md:order-2">
                        <div className="absolute -inset-x-1 inset-y-16 md:-inset-x-2 md:-inset-y-6">
                            {/* Tailwind gradient background */}
                            <div
                                className="w-full h-full max-w-5xl mx-auto rounded-3xl opacity-30 blur-lg filter"
                                style={{
                                    background: "linear-gradient(90deg, #44ff9a -0.55%, #44b0ff 22.86%, #8b44ff 48.36%, #ff6644 73.33%, #ebff70 99.34%)"
                                }}
                            ></div>
                        </div>
                        {/* ...rest of your component... */}
                    </div>
                </div>
            </div>
        </section>
    );
};
`;

const targetPath = path.join(__dirname, 'src/components/4-library/reviews/reviews.tsx');

if (fs.existsSync(targetPath)) {
  throw new Error('File already exists at: ' + targetPath);
} else {
  fs.writeFileSync(targetPath, fileContent, 'utf8');
  console.log('File created at:', targetPath);
}