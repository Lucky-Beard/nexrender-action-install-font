const {
  promises: fsPromises,
} = require('fs');
const fs = require('fs');
const { execSync } = require('child_process');
const FONT_REG =
  'HKLM\\SOFTWARE\\Microsoft\\Windows NT\\CurrentVersion\\Fonts';
const FONT_DIR = 'c:\\Windows\\Fonts\\';


module.exports = (job, settings, { fonts, workingDirectory }, type) => {
  const WORKING_DIR = `${workingDirectory}/${job.uid}`;

  if (!fonts.length) {
    return "Make sure to specify a font as a string array e.g. ['FontName.ttf']";
  }

  let promises = fonts.map(async (font) => {

    const extensionPos = font.indexOf('.');
    if (extensionPos < 0) {
      return 'Incorrect font name supplied, should be name plus extension e.g. Arial.ttf';
    }
    const fontName = font.substr(0, extensionPos);

    const registryExists = await registryEntryExists(fontName);

    if (registryExists) {
      return copyFile(WORKING_DIR + '\\' + font, FONT_DIR + font);
    } else {
      return installPromises = await Promise.all([addToRegistry(font, fontName), copyFile(WORKING_DIR + '\\' + font, FONT_DIR + font)])
    }

  });

  return Promise.all(promises).then(res => {
    console.log("SUCCESSFULLY INSTALLED FONT", res);
    return Promise.resolve(job);
  }).catch(err => {
    console.log("Failed to install font", err);
    return Promise.reject(err);
  })
};

fileExists = (path) => {
  return fs.existsSync(path)
}

addToRegistry = async (font, fontName) => {
  try {
    execSync(
      `REG ADD "${FONT_REG}" /v "${fontName} (TrueType)" /t REG_SZ /d "${font}" /f`
    );
    console.log("Font was successfully added to registry")
    return 'Font was successfully added to registry'
  } catch (error) {
    throw new Error(error)
  }
}

copyFile = async (source, destination) => {
  if (!fileExists(destination)) {
    return fsPromises
      .copyFile(source, destination).then(res => {
        console.log("Successfully copied font");
      }).catch((err) => {
        console.log("Copying error ocurred: ", err);
      });
  } else {
    console.log("Font already exists");
    return 'Font already exists'
  }

}

registryEntryExists = async (fontName) => {
  try {
    execSync(`REG QUERY "${FONT_REG}" /v "${fontName} (TrueType)"`);
    return true
  } catch (error) {
    return false
  }
}
