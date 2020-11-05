## nexrender-action-install-font

### This library is for use as a font installer during the nexrender prerender phase

#### Use as follows

`prerender: [ { module: 'nexrender-action-install-font', font: 'Pixelfy.ttf' } ]`

#### The module will install the font from the working directory using the supplied name and extension e.g. workingdirectory/Pixelfy.ttf

#### Note that fonts need to be added as static assets so that they can be copied to the working directory
