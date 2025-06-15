/*exports.config = {
    framework: 'jasmine',
    capabilities:{
        browserName: 'firefox'
    },
    //กำหนดให้ Selenium Server ทำ Action
    seleniumAddress: 'http://localhost:4444/wd/hub',
    //กำหนดให้เรียก webdriver บน browser ทำ Action
    //directConnect: true,
    specs:['spec.js'] //Name of the file containing test cases
} ;*/

exports.config = {
    framework: 'jasmine',

    capabilities: {
        'browserName': 'firefox'
    },
    seleniumAddress: 'http://localhost:4444/wd/hub',
    
    //directConnect: true,
    
    specs: ['spec.js'],
    
    jasmineNodeOpts: {
        defaultTimeoutInterval: 50000
    }
};