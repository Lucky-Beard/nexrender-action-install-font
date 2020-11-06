const {
  promises: fsPromises,
  constants: { COPYFILE_EXCL },
} = require('fs');
const fs = require('fs');

module.exports = (job, settings, action, type) => {
  const WORKING_DIR = 'd:\\Lucky Render Worker\\temp\\' + job.uid;
  const FONT_DIR = 'c:\\Windows\\fonts\\';
  const { fonts } = action;
  if (!fonts.length) {
    return "Make sure to specify a font as a string array e.g. ['FontName.ttf']";
  }

  let promises = fonts.map(async (font) => {
    // if it doesn't exist, copy it in
    if (!fs.existsSync(FONT_DIR + font)) {
      return fsPromises
        .copyFile(WORKING_DIR + '\\' + font, FONT_DIR + font)
        .then(() => console.log(`${font} was copied and installed`))
        .catch((err) => console.log(err, 'The file could not be copied'));
    } else {
      return;
    }
  });

  return Promise.all(promises);
};
