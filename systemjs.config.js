(function (global) {
    System.config({
        transpiler: 'transpiler-module',
        defaultJSExtensions: true,
        defaultExtension: 'js',
        paths: {
            // paths serve as alias
            'npm:': 'node_modules/'
        },
        meta: {
            'moment': { format: 'global' }
        },
        // map tells the System loader where to look for things
        map: {
            // our app is within the app folder
            app: './public',
            // angular bundles
            '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
            '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
            '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
            '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
            '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
            '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
            '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
            '@covalent/core': 'npm:@covalent/core/core.umd.js',
            // (optional) Additional configuration options
            '@covalent/http': 'npm:@covalent/http/http.umd.js',
            '@covalent/highlight': 'npm:@covalent/highlight/highlight.umd.js',
            '@covalent/markdown': 'npm:@covalent/markdown/markdown.umd.js',
            '@covalent/dynamic-forms': 'npm:@covalent/dynamic-forms/dynamic-forms.umd.js',
            '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
            "hammerjs": "npm:hammerjs/hammer.js",

            '@angular/animations': 'npm:@angular/animations/bundles/animations.umd.js',
            '@angular/animations/browser': 'npm:@angular/animations/bundles/animations-browser.umd.js',
            '@angular/platform-browser/animations': 'npm:@angular/platform-browser/bundles/platform-browser-animations.umd.js',

            '@angular/material': 'npm:@angular/material/bundles/material.umd.js',
            '@angular/cdk': 'npm:@angular/cdk/bundles/cdk.umd.js',

            //cdk
            '@angular/cdk/a11y': 'npm:@angular/cdk/bundles/cdk-a11y.umd.js',
            '@angular/cdk/bidi': 'npm:@angular/cdk/bundles/cdk-bidi.umd.js',
            '@angular/cdk/coercion': 'npm:@angular/cdk/bundles/cdk-coercion.umd.js',
            '@angular/cdk/keyboard': 'npm:@angular/cdk/bundles/cdk-keyboard.umd.js',
            '@angular/cdk/observe-content': 'npm:@angular/cdk/bundles/cdk-observe-content.umd.js',
            '@angular/cdk/platform': 'npm:@angular/cdk/bundles/cdk-platform.umd.js',
            '@angular/cdk/portal': 'npm:@angular/cdk/bundles/cdk-portal.umd.js',
            '@angular/cdk/rxjs': 'npm:@angular/cdk/bundles/cdk-rxjs.umd.js',
            '@angular/cdk/table': 'npm:@angular/cdk/bundles/cdk-table.umd.js',
            '@angular/cdk/testing': 'npm:@angular/cdk/bundles/cdk-testing.umd.js',


            '@swimlane/ngx-datatable': 'npm:@swimlane/ngx-datatable/release/index.js',

            // other libraries
            'rxjs':                      'npm:rxjs',
            'ng2-charts':                'npm:ng2-charts',
            'ejs':                       'npm:ejs/ejs',
            'moment': 'npm:moment/moment.js',
            'angular2-moment': 'npm:angular2-moment',
            'ng2-bootstrap/ng2-bootstrap': 'npm:ng2-bootstrap/bundles/ng2-bootstrap.umd.js',
            'angular-in-memory-web-api': 'npm:angular-in-memory-web-api'
        },

        packages: {
            "@swimlane/ngx-datatable": {
                defaultExtension: 'js'
            },
            "ejs": {
                defaultExtension: 'ejs'
            },
            app: {
                main: './main.js',
                defaultExtension: 'js'
            },
            'rxjs': {
                defaultExtension: 'js'
            },
            'angular-in-memory-web-api': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'angular2-moment': {
                main: './index.js',
                defaultExtension: 'js'
            },
            'ng2-charts': {
                main: 'ng2-charts.js',
                defaultExtension: 'js'
            }
        }
    });
})(this);