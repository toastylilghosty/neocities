export const config = {
    dir: {
        input: "dev",
        output: "public"
    }
};

export default function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("dev/style.css");
    eleventyConfig.addPassthroughCopy("dev/robots.txt");
    eleventyConfig.addPassthroughCopy("dev/img/*");
};