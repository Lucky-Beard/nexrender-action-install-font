# nexrender-action-install-font

This library is for use as a font installer during the nexrender prerender phase for windows machines.
It will install a font that you supplied as a static asset and will work without a restart.

## Prerequisits
- Windows OS ( limited to windows for now )
- Font file name and font name should be the exact same e.g. name La Piratas.ttf can not be saved as LaPiratas.ttf ( case sensitive )
- Specify your working directory e.g. `'C:/renders'` - see usage for an example.
- Font needs to be added as a static asset so that it can be copied to the temporary working directory e.g. 
``` 
assets: [
  {
    type: 'static',
    src:
      's3://bucket-name.s3.region.amazonaws.com/La Pirata DEMO.otf'
  }
]
```

## Configuration
### Windows Fonts Folder Permissions
You need to provide permission to the fonts folder so that the fonts can be copied.
- Add the security tab to your `'C:/windows/fonts'` directory using `attrib –r –s c:\windows\fonts`.
- Right click the folder and select properties.
- Go to the security tab and click on Advanced.
- Click the owner user and click on edit.
- Change the current owner to yourself (your user).
- Check the “Replace owner on subcontainers and objects” box.
- Click OK, your user should now have access to write to that folder.


### Windows Fonts Registry Permissions
You need to supply access to the fonts registry so that new font keys can be added.
- Run `regedit`.
- Browse to : `HKEY_LOCAL_MACHINE\SOFTWARE\MICROSOFT\WINDOWS NT\CURRENT VERSION\FONTS`.
- Give read and write permission to Users or your User account.
- Restart windows.

## Usage
Install using npm or yarn
```
npm install nexrender-action-install-font / yarn add nexrender-action-install-font 
```
Usage from the api/client sdk.
```
assets: [
  {
    type: 'static',
    src:
      's3://bucket-name.s3.region.amazonaws.com/La Pirata DEMO.otf'
  }
],
actions: {
    prerender: [
        {
          module: 'nexrender-action-install-font',
          workingDirectory: 'C:/renders',
          fonts: ['La Pirata Demo.otf', 'Pixelfy.ttf']
        }
    ]
}
```

## How it works
The module will install the font from the working directory using the supplied name and extension e.g. workingdirectory/Pixelfy.ttf. It adds an entry to the windows registry(HKLM) and copies the font to your `'c:/windows/fonts'` directory.

## Other
Feel free to use as you wish, you're welcome to fork or add PR's to the exising project :) Enjoy.
