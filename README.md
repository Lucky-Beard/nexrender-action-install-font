## nexrender-action-install-font

### This library is for use as a font installer during the nexrender prerender phase

#### Use as follows

`prerender: [ { module: 'nexrender-action-install-font', fonts: ['Pixelfy.ttf]' } ]`

#### The module will install the font from the working directory using the supplied name and extension e.g. workingdirectory/Pixelfy.ttf

#### Note that fonts need to be added as static assets so that they can be copied to the working directory


#### MORE INSTRUCTIONS TO FOLLOW, permissions for windows folder and registry need to be set before worker can perform actions