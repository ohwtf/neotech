module.exports = function(config) {
    config.set({

        basePath: '',

        coverageReporter: {
            type : 'html',
            dir : 'coverage/'
        },

        frameworks: ["karma-typescript", 'jasmine', 'jasmine-matchers'],

        files: [
            { pattern: "app/src/javascript/**/*.ejs"},
            { pattern: "app/src/javascript/**/*.ts" }
        ],

        preprocessors: {
            '**/*.ts': ['karma-typescript', 'coverage'],
            '**/*.ejs': ['ejs'],
            'app/src/**/!(*spec|*mock).ts': ['karma-typescript', 'coverage'],
        },

        ejsOptions: {
            parentPath: 'app/views/index.ejs'
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
                "skipLibCheck": true,
                "noImplicitReturns": false,
                "noImplicitUseStrict": false,
                "noFallthroughCasesInSwitch": true,
                "allowSyntheticDefaultImports": true,
                "target": "ES5",
                "lib":["es6","dom"],
                "types" : ["node", 'jasmine', 'core-js', 'jasmine-matchers'],
                "typeRoots": [
                    "node_modules/@types/*"
                ],
            },
            include: ["app/src/javascript/**/*.ts"],
            exclude: ["node_modules", '*/**/*.ejs'],
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

        reporters: ['progress', 'coverage', 'karma-typescript'],

        browsers: ["Chrome"]
    });
};

