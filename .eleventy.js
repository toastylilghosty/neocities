import { readFileSync } from 'fs';
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
        return items
    });

    const links = readFileSync(("./dev/websites.csv"),  { encoding: 'utf8', flag: 'r' }, (err, data) => {
        if (err) throw err;
        console.log(data);
        console.log("websites!")
    });

    eleventyConfig.addCollection("links", function (collection) {
        //name, url, tag
        let items = links.split("\n");

        let linkCollection = items.map((x) => {
            let item = x.split(",")
            return {
                name: item[0],
                url: item[1],
                tag: item[2]
            }
        })

        return linkCollection
    })

    eleventyConfig.addPassthroughCopy("dev/style.css");
    eleventyConfig.addPassthroughCopy("dev/robots.txt");
    eleventyConfig.addPassthroughCopy("dev/img/*");
    eleventyConfig.addPassthroughCopy("dev/img/**/*");
    eleventyConfig.addGlobalData("permalink", "{{ page.filePathStem }}.html");
};