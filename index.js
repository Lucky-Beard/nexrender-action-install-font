const {
  promises: fsPromises,
  constants: { COPYFILE_EXCL },
} = require('fs');
const fs = require('fs');

module.exports = (job, settings, action, type) => {
  const WORKING_DIR = settings.workpath + '/' + job.uid;
  const FONT_DIR = '~/Documents/fakeFontDir/';
  // const FONT_DIR = 'C:\\windows\\fonts\\';
  const { fonts } = action;
  if (!fonts.length) {
    return "Make sure to specify a font as a string array e.g. ['FontName.ttf']";
  }

  let promises = fonts.map(async (font) => {
    // check if font already exists in location

    // return fs.existsSync(WORKING_DIR + '/' + font);

    console.log(' FILE EXISTS< LET?S COPY');
    return fsPromises
      .copyFile(WORKING_DIR + '/' + font, '~/Documents/fakeFontDir/test.ttf')
      .then(() => console.log(`${font} was copied and installed`))
      .catch((err) => console.log(err, 'The file could not be copied'));
    // if (!fs.existsSync(FONT_DIR + font)) {
    //   return fsPromises
    //     .copyFile(WORKING_DIR + '/' + font, '~/Documents/fakeFontDir/test.ttf')
    //     .then(() => console.log(`${font} was copied and installed`))
    //     .catch((err) => console.log(err, 'The file could not be copied'));
    // } else {
    //   return 'Font already exists';
    // }
  });

  return Promise.all(promises);
};
