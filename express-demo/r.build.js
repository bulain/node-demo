({
    baseUrl: "public/javascripts",
    paths: {
        jquery: "jquery.min",
        bootstrap: "bootstrap.min"
    },
    excludeShallow: ['jquery', 'bootstrap'],
    name: "main",
    out: "public/javascripts/all.js"
})