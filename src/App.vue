<template>
  <div id="app">
    <div
      class="modal"
      v-if="!isOnboarded"
    >
      <button
        class="button"
        @click="close"
      >
        Schließen
      </button>
      <div class="content">
        <h2>Willkommen</h2>
        <p>Herzlich Willkommen auf jura.education. Du bist einer der ersten Nutzer dieser neuen Lernplattform für Jurastudierende. Herzlichen Glückwunsch! Frag dich selbst, ob dich jemand als Streber sieht, der die Wirksamkeit dieser neuen Lernmethode einschätzen kann, oder ob du als hoffnungsloser Fall giltst, dem man auf diesem Wege zumindest ein bisschen Juraverständnis in den Kopf prügeln kann.</p>
        <p>Genug der netten Worte. Auf der folgenden Seite findest du eine Übersicht, die für sich beansprucht, möglichst viele Schemata zu allen examensrelevanten Rechtsgebieten in einem übersichtlichen Prüfungsaufbau zu kombinieren. Per Maus oder per Pfeiltasten kannst du dich durch die verschiedenen Prüfungsschemata klicken. Das Ganze ist recht intuitiv und sollte durch ‚learning by doing‘ schnell verinnerlicht sein.</p>
        <p>Zum weiteren Verständnis: Das große Ziel dieser Seite ist es nicht nur, die vielen Schemata übersichtlich darzustellen, sondern vor allem, examensrelevante Problemfelder an den Stellen der Prüfung einzuordnen, wo sie hingehören. Wir befinden uns noch ganz am Anfang, entsprechend dürftig sind derzeit noch die Inhalte.</p>
        <p>Die Seite soll im Sinne einer Open-Source-Plattform beständig wachsen. Um dorthin zu kommen, ist allerdings zunächst erforderlich, das ganze System auf Herz und Nieren zu überprüfen. Sollten dir also Schwachstellen oder Verbesserungsmöglichkeiten auffallen, schreibe gerne eine Nachricht <a href="mailto:hallo@jura.education">hierhin</a>. Vielen Dank für deine Mithilfe!</p>
      </div>
    </div>
    <div class="container">
      <button
        class="button"
        @click="open"
      >
        BETA
      </button>
      <main>
        <router-view />
      </main>
      <layout-footer class="footer" />
    </div>
  </div>
</template>

<script>
import LayoutFooter from '@/components/Layout/LayoutFooter'

export default {
  components: { LayoutFooter },
  data () {
    return {
      isOnboarded: false
    }
  },
  created () {
    this.setIsOnboarded()
    console.log('isOnboarded', this.isOnboarded)
  },
  methods: {
    close () {
      window.localStorage.setItem('isOnboarded', true.toString())
      this.setIsOnboarded()
    },
    open () {
      window.localStorage.setItem('isOnboarded', false.toString())
      this.setIsOnboarded()
    },
    setIsOnboarded () {
      const localStorageIsOnboarded = window.localStorage.getItem('isOnboarded')
      this.isOnboarded = localStorageIsOnboarded === null ? false : localStorageIsOnboarded === 'true'
    }
  }
}
</script>

<style lang="sass">
.container
  margin: 2rem
  width: calc(100% - ( 2 * 2rem))
  height: calc(100vh - (2 * 2rem))
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: stretch
  align-items: stretch
  > main
    flex: 1 1 auto
  > .footer
.button
  position: absolute
  top: 1rem
  right: 4rem
  padding: 1rem 1rem
  background: $color-primary
  color: $color-light
  font-size: 1rem
  letter-spacing: 2px
  transition: $animation
  border: 1px solid $color-primary
  &:hover
    cursor: pointer
    background: $color-light
    color: $color-primary
.modal
  z-index: 500
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  background: rgba($color-surface, 0.9)
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-items: center
  .content
    width: 64rem
    margin: 4rem
    h2
      font-size: 2.5rem
    p
      font-size: 1.2rem
      line-height: 1.7
      margin: 2rem 0 0 0
    a
      color: $color-primary
      font-weight: bold
      transition: $animation
      &:hover
        text-decoration: none
</style>
