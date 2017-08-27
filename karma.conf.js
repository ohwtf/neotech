module.exports = function(config) {
    config.set({

        basePath: '',

        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        frameworks: ["karma-typescript", "jasmine-ajax", "jasmine", 'jasmine-matchers'],

        files: [
            "node_modules/jasmine-ajax/lib/mock-ajax.js",
            { pattern: "app/src/javascript/**/*.+(ts|ejs)" }
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript', 'coverage'],
            '**/*.ejs': ['ejs']
        },

        ejsOptions: {
            parentPath: './app/src/javascript'
        },

        karmaTypescriptConfig: {
            compilerOptions: {
                "moduleResolution": "node",
                "declaration": true,
                "removeComments": true,
                "emitDecoratorMetadata": true,
                "experimentalDecorators": true,
                "pretty": true,
                "allowUnreachableCode": false,
                "allowUnusedLabels": false,
                "stripInternal": true,
                "noImplicitAny": true,
                "module": "commonjs",
                "skipLibCheck": true,
                "noImplicitReturns": false,
                "noImplicitUseStrict": false,
                "noFallthroughCasesInSwitch": true,
                "allowSyntheticDefaultImports": true,
                "allowJS": true,
                "target": "ES5",
                "lib":["es6","dom"],
                "types" : ["node", "jasmine", "core-js", "jasmine-matchers", "jasmine-ajax"],
                "typeRoots": [
                    "node_modules/@types/*"
                ]
            },
            bundlerOptions: {
                addNodeGlobals: ["ejs", "JST"]
            },
            include: ["app/src/javascript/**/*.ts", "app/src/javascript/**/*.ejs", "node_modules/jasmine-ajax/lib/mock-ajax.js"],
            exclude: ["node_modules", "*/**/*.ejs"],
            reports:
                {
                    "html": "coverage",
                    "text-summary": ""
                }
        },

        port: 9876,
        colors: true,
        autoWatch: true,
        singleRun: false,
        concurrency: Infinity,

        reporters: ["progress", "coverage", "karma-typescript"],

        browsers: ["Chrome"]
    });
};

