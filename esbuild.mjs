import esbuild from "esbuild";

/* Traspiled JS code from TS */
const buildDir = "build";
const buildEntry = "server.js";

/* ESBuild outDir */
const distDir = "dist";
const distOutfile = "server.js";

esbuild
    .build({
        entryPoints: [`./${buildDir}/${buildEntry}`],
        bundle: true,
        platform: "node",
        target: "node18",
        outfile: `./${distDir}/${distOutfile}`,
        minify: true,
    })
    .catch(() => process.exit(1));
