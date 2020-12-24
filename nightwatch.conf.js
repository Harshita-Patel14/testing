const baseNightwatchConfig={
    src_folders : ["tests"],
  
    webdriver : {
      start_process: true,
      server_path: "node_modules/.bin/chromedriver",
      port: 4444
    },
  
    test_settings : {
      default : {
        desiredCapabilities: {
          browserName: "chrome",
           "chromeOptions": {
                    'args': ['headless']
                }
        }
      }
    }
};
module.exports = baseNightwatchConfig;
  