**Setup**

Please note that to generate final image outputs, you need a Windows platform,
because each platform renders the fonts differently.

1. Clone this repo to a new local folder.  The easiest way is to click `Code` and then `Download ZIP`.
At the same time, the preferable way is to use Git.

    You can install the Git client from https://git-scm.com/downloads
    (default settings should be fine).  On GitHub UI click `Code`, then click `HTTPS` and copy the URL.
    Run `Git CMD`, navigate to the folder, and run the following command (don't forget the period in the end):

    ```
    git clone <copied URL> .
    ```

    For example:

    ```
    git clone https://github.com/seastan/lotr-lcg-se-plugin.git .
    ```

    Later, when you want to update the code, run `Git CMD`, navigate to the folder and run the following command:

    ```
    git pull
    ```

2. Download `Vafthrudnir` font from https://www.wfonts.com/font/vafthrudnir, extract the archive
and put `VAFTHRUD.TTF` into `TheLordOfTheRingsLCG-B/resources/TheLordOfTheRingsLCG/font/` folder.

3. Run `setup.bat` (Windows) or `setup.sh` (Mac/Linux) to generate the `.seext` files.

4. Make sure that `Times New Roman` font is installed.  If you have Mac or Linux, it may be not
installed by default.

5. Install Strange Eons, `Build 3970`.  Use the following links:

  - Windows (64-bit): https://drive.google.com/file/d/19vuP5QFKrjuilJbuFh10NPIn6i_FZZI9/view?usp=sharing
  - Windows (32-bit): https://drive.google.com/file/d/1lZ6h7OQBvZdh2hOlAiZMYivzeooTqWhW/view?usp=sharing
  - Mac: https://drive.google.com/file/d/1TkWEjB71fdxxq_gHzhI-WfRXaRrJcGZg/view?usp=sharing
  - Linux: https://drive.google.com/file/d/1ZC-uSOVKqU7XGZUip3I6OvUT7mPOLLoN/view?usp=sharing

    Please note that the latest Strange Eons version from the site
    (https://strangeeons.cgjennings.ca/download.html) may not work as expected.

6. Run Strange Eons and install `The Lord of the Rings LCG` plugin.  For debugging purposes
you may also install `Developer Tools` plugin.

7. Click `Edit` -> `Preferences` -> `Language`.  Make sure that "English-United States" is chosen
for both `Game Language` and `User Interface Language`.  Click `Drawing`.  Make sure that
`Text Fitting Methods` is set to `Reduce Line Spacing and Shrink Text`.  Don't change any other
preferences.

8. Go to plugins folder (run Strange Eons, then click `Toolbox` -> `Manage Plug-ins` -> `Open Plug-in Folder`),
close Strange Eons and delete or move all files, which names start with `TheLordOfTheRingsLCG`.  Instead of them,
copy all generated `.seext` files from the root folder of this repo.