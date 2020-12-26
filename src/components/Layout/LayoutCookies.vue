<template>
  <div
    v-if="isOpen"
    class="cookies"
  >
    <h2>Cookies</h2>
    <p>
      Wir würden gerne ein paar Statistiken über unsere Nutzer erfassen, daher müsstest du uns erlauben Cookies zu benutzen.
      Wenn nicht ist das auch okay.
    </p>
    <div class="buttons">
      <button
        class="button"
        @click="accept()"
      >
        Erlauben
      </button>
      <button
        class="button"
        @click="deny()"
      >
        Ablehnen
      </button>
    </div>
  </div>
</template>

<script>
import { bootstrap } from 'vue-gtag'

export default {
  name: 'LayoutCookie',
  data () {
    return {
      isOpen: true
    }
  },
  created () {
    if (process.browser) {
      if (this.getGDPR() === 'true') {
        bootstrap().then((gtag) => {
          this.isOpen = false
        })
      } else if (this.getGDPR() === null) {
        this.isOpen = true
      }
    }
  },
  methods: {
    accept () {
      if (process.browser) {
        bootstrap().then((gtag) => {
          this.isOpen = false
          this.setGDPR(true)
        })
      }
    },
    deny () {
      if (process.browser) {
        this.isOpen = false
        this.setGDPR(false)
      }
    },
    getGDPR () {
      if (process.browser) {
        return localStorage.getItem('GDPR:accepted')
      }
    },
    setGDPR (value) {
      if (process.browser) {
        localStorage.setItem('GDPR:accepted', value.toString())
      }
    }
  }
}
</script>

<style lang="sass" scoped>
.cookies
  z-index: 2000
  position: fixed
  right: 2rem
  bottom: 2rem
  display: flex
  flex-direction: column
  flex-wrap: nowrap
  justify-content: flex-start
  align-content: stretch
  align-items: stretch
  max-width: 50%
  padding: 2rem
  background: $color-light
  transition: $animation
  border: 2px solid $color-accent
  @media screen and (max-width: $breakpoint-mobile)
    max-width: none
    left: 2rem
.buttons
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content: flex-end
  align-content: flex-start
  align-items: flex-start
  margin: 1rem 0 0 0
  .button
    color: $color-primary
    border: none
    background: none
    font-size: 1rem
    transition: $animation
    text-decoration: none
    line-height: 1
    margin: 0 1rem 0 0
    &:hover
      cursor: pointer
      text-decoration: underline
</style>
