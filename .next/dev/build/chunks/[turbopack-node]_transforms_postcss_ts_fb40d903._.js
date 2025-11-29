module.exports = [
"[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/nextjs_space/postcss.config.js_.loader.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript, async loader)", ((__turbopack_context__) => {

__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "chunks/1e225_33f30b46._.js",
  "chunks/[root-of-the-server]__9ec61fdb._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[turbopack-node]/transforms/postcss.ts { CONFIG => \"[project]/nextjs_space/postcss.config.js_.loader.mjs [postcss] (ecmascript)\" } [postcss] (ecmascript)");
    });
});
}),
];