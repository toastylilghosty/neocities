import { globSync } from 'glob';

export const config = {
    dir: {
        input: "dev",
        output: "public"
    }
};

export default function(eleventyConfig) {
    const galleries = globSync(["public/img/**/*.*"]);

    eleventyConfig.addCollection("galleries", function (collection) {
        let items = galleries.map((x) => {
            let paths = x.split("\\")
            let name = paths[paths.length -1]
            let gallery = paths[paths.length - 2]
            return {
                gallery: gallery,
                path: "img/" + gallery + "/" + name,
                name: name
            }
        })
        console.log(items)
        return items
    });

    eleventyConfig.addPassthroughCopy("dev/style.css");
    eleventyConfig.addPassthroughCopy("dev/robots.txt");
    eleventyConfig.addPassthroughCopy("dev/img/*");
    eleventyConfig.addPassthroughCopy("dev/img/**/*");
    eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");
};