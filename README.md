<p align="center">
    <img src="./docs/img/logo.svg" alt="jura.education - Logo" width="200" height="200" />
</p>

<h2 align="center">jura.education</h2>

### Inhalt bearbeiten

Jeder kann [jura.education](https://jura.education) mit machen und nicht nur bei dem technischen Kram, auch beim Inhalt. Dafür kannst du Dateien direkt hier im Web bearbeiten, das nutzt man meistens für kleinere Änderungen. Falls du richtig loslegen willst musst du dir Git auf deinem Computer installieren und solltest am besten schon ein bisschen Ahnung haben wie man damit umgeht. So oder so musst du einen Pull Request erstellen, dieser enthält dann deine Vorgeschlagenen Änderungen und wenn diese für gut befunden werden übernehmen wir sie in die Website.

Die Ordner und Dateien, welche die Webseite bilden findest du unter `api/content`, ab hier solltest du dich dann zurecht finden falls du [jura.education](https://jura.education) schon einige male genutzt hast.

#### Direkt in GitHub bearbeiten

to be done

#### Auf deinem Computer richtig loslegen
 
 * Lade dir [GitHub Desktop](https://desktop.github.com/) runter 
 * Schau dir diese [Dokumentation](https://docs.github.com/en/free-pro-team@latest/desktop) an wie man mit GitHub arbeitet, vor allem die folgenden Punkte:
     * [Mitarbeiten](https://docs.github.com/en/free-pro-team@latest/desktop/contributing-and-collaborating-using-github-desktop/making-changes-in-a-branch)
     * [Updaten](https://docs.github.com/en/free-pro-team@latest/desktop/contributing-and-collaborating-using-github-desktop/keeping-your-local-repository-in-sync-with-github)
  
 
### Tech stuff

#### Architecture

* The app is written in [Vue.js](https://vuejs.org/)
* The server is just a serverless function in node which reads the content directory
* Everything is hosted on [Vercel](https://vercel.com/)

#### Local development

* Start vue with `npm run serve`
* Start serverless function `vercel dev`

#### Convert all `.docx` files to `.md`

* Install pandoc
* Go to `./api/content`
* Use `find ./ -iname "*.docx" -type f -exec sh -c 'pandoc "${0}" -o "./output/$(basename ${0%.docx}.md)"' {} \;`
    * Credits: https://stackoverflow.com/a/40347637
* Afterwards delete all `.docx` with `find . -name '*.docx' -delete`
    * Credits: https://stackoverflow.com/a/35958181
