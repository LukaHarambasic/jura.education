# Jura learn

# So geht GitHub

* Lade dir [GitHub Desktop](https://desktop.github.com/) runter 
* Schau dir diese [Dokumentation](https://docs.github.com/en/free-pro-team@latest/desktop) wie man mit GitHub arbeitet, vor allem diese Punkte:
    * [Mitarbeiten](https://docs.github.com/en/free-pro-team@latest/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch)
    * [Updaten](https://docs.github.com/en/free-pro-team@latest/desktop/contributing-and-collaborating-using-github-desktop/keeping-your-local-repository-in-sync-with-github)
 
# Tech Stuff

## Architecture

* The app is written in Vue
* The server is just a serverless function in node which reads the content directory
* Everything is hosted on Vercel

## Local development

* Start vue with `npm run serve`
* Start serverless function `vercel dev`

## Convert all `.docx` files to `.md`

* Install pandoc
* Go to `./api/content`
* Use `find ./ -iname "*.docx" -type f -exec sh -c 'pandoc "${0}" -o "./output/$(basename ${0%.docx}.md)"' {} \;`
    * Credits: https://stackoverflow.com/a/40347637
* Afterwards delete all `.docx` with `find . -name '*.docx' -delete`
    * Credits: https://stackoverflow.com/a/35958181
