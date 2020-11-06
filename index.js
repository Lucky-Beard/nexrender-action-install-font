const {
  promises: fsPromises,
  constants: { COPYFILE_EXCL },
} = require('fs');
const fs = require('fs');
const { exec, execSync } = require('child_process');

module.exports = (job, settings, { fonts, workingDirectory }, type) => {
  const WORKING_DIR = workingDirectory + job.uid;
  const FONT_REG =
    'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts';
  const FONT_DIR = 'c:\\Windows\\fonts\\';
  if (!fonts.length) {
    return "Make sure to specify a font as a string array e.g. ['FontName.ttf']";
  }

  let promises = fonts.map(async (font) => {
    const extensionPos = font.indexOf('.');

    if (extensionPos < 0) {
      return 'Incorrect font name supplied, should be name plus extension e.g. Arial.ttf';
    }
    const fontName = font.substr(0, extensionPos);

    try {
      execSync(`REG QUERY "${FONT_REG}" /v "${name}"`);
      console.log('Already Installed');
      return 'Already Installed';
    } catch (err) {
      // if it doesn't exist, copy it in
      if (!fs.existsSync(FONT_DIR + font)) {
        try {
          execSync(
            `REG ADD "${FONT_REG}" /v "${fontName}" /t REG_SZ /d ${font} /f`
          );
          return fsPromises
            .copyFile(WORKING_DIR + '\\' + font, FONT_DIR + font)
            .then(() => console.log(`${font} was copied and installed`))
            .catch((err) => console.log(err, 'The file could not be copied'));
        } catch (err) {
          throw new Error(err);
        }
      } else {
        console.log('Already Installed');
        return 'Already Installed';
      }
    }
  });

  return Promise.all(promises);
};
