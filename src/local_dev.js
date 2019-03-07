(function (ng) {
    'use strict';

    ng.module('app')

        .constant('AppConfig', {
            // links:{
            //   home:'https://www.cerulli.com',
            //         formContact:'https://www.cerulli.com/lodestarcontactus.aspx',
            //         video:'https://player.vimeo.com/video/61349173',
            //         training:'https://www.cerulli.com/LodestarTraining.aspx',
            //         demo:'https://www.cerulli.com/LodestarDemo.aspx',
            //         learnMore:'https://cerulli.com/research-products/cerulli-lodestar/',
            //         info:'https://external.cerulli.com/file.sv?Cerulli-Lodestar-Helpful-Hints'
            // },
            hrefs: {
                "training.lodestar": {
                    "name": "training.lodestar",
                    "description": "Lodestar Training",
                    "href": "https://external.cerulli.com/LodestarTraining.Landing.fd"
                },
                "contact.lodestar": {
                    "name": "contact.lodestar",
                    "description": "Lodestar Contact Us",
                    "href": "https://external.cerulli.com/LodestarContactUs.fd"
                },
                "demo.lodestar": {
                    "name": "demo.lodestar",
                    "description": "Lodestar Demo",
                    "href": "https://external.cerulli.com/LodestarDemo.Landing.fd"
                },
                "learn_more.lodestar": {
                    "name": "learn_more.lodestar",
                    "description": "Lodestar Learn More",
                    "href": "https://cerulli.com/research-products/cerulli-lodestar/"
                },
                "intro_video.lodestar": {
                    "name": "intro_video.lodestar",
                    "description": "Lodestar Intro Video",
                    "href": "https://player.vimeo.com/video/61349173"
                },
                "hints.lodestar": {
                    "name": "hints.lodestar",
                    "description": "Lodestar Hints",
                    "href": "https://external.cerulli.com/file.sv?Cerulli-Lodestar-Helpful-Hints"
                },
                "home": {
                    "name": "home",
                    "description": "Home Website Address",
                    "href": "https://www.cerulli.com"
                }
            },

            tableau: {
                server: 'https://localdata.cerulli.com',
                testView: '335cad63-97b4-44fb-a6c9-4f6e7ff0b316/PracticeTypeFeatures',
                auth: 'user/tabauth'
            },

            b2c: {
                clientID: '36a43f27-7ee4-4ce6-8027-0385c3180ccd',
                authority: "https://login.microsoftonline.com/tfp/cerrulliassociatesb2cdev.onmicrosoft.com/B2C_1_SignUpOrIn/",
                b2cScopes: ["https://cerrulliassociatesb2cdev.onmicrosoft.com/lodestar/api"],
                webApi: 'https://cerrulliassociatesb2cdev.onmicrosoft.com/lodestar',

                redirectPath: 'http://localhost:8888/',

                // consentScopes: ["user.read"],
                // webApiEndpoint: "http://localhost:8080/Lodestar",
                // webApiScopes: ['api'],
                // userProfileEndpoint: "https://graph.microsoft.com/v1.0/me",
                // userProfileScopes: ["user.read"]
            },

            apiPath: 'http://localhost:8080/Lodestar/user/',
            apiPathAdmin: 'http://localhost:8080/Lodestar/admin/',

            application: {
                "versions": [{
                    "release": "Next_ProductTypeBreakOut",
                    "display": "Lodestar",
                    "context": "/LodestarNext",
                    "name": "lodestar",
                    "published_on": "2017-01-13T19:36:22",
                    "uploaded_on": "2017-01-13T19:36:17",
                    "location_description": "Beta"
                }, {
                    "release": "Next_ProductTypeBreakOut",
                    "display": "Interactive Data Supplements",
                    "context": "/IDSNext",
                    "name": "ids",
                    "published_on": "2017-01-13T19:36:22",
                    "uploaded_on": "2017-01-13T19:36:17",
                    "location_description": "Beta"
                }, {
                    "release": "Next_ProductTypeBreakOut",
                    "display": "Internal Subscriptions",
                    "context": "/InternalNext",
                    "name": "internal",
                    "published_on": "2017-01-13T19:36:22",
                    "uploaded_on": "2017-01-13T19:36:17",
                    "location_description": "Beta"
                }],
                "context": "/LodestarNext"
            },

            isLocal: true,
            isDebug: false,
            isDebugDoc: true,
            recentCutoff: 30,
            recentStart: '2015-04-13',
            hidden: [23],
            logLevel: 0,
            logSend: 1,
            testUserFolders: false
            //,showLoop:true
        })
        .constant('Subscriptions', {})

        .constant('Sales', [])

    ;

})(angular);