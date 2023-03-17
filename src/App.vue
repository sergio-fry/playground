<script setup>
import { ref, watch, computed, reactive } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { oneDark } from '@codemirror/theme-one-dark'
import { useBrowserLocation } from '@vueuse/core'
import debounce from './helpers/debounce'
import moment from 'moment'
import LangList from './components/LangList.vue'

const location = useBrowserLocation()

const state = reactive(
  {
    code: '',
    lang: '',
    timestamp: null
  }
)

const extensions = ref([oneDark])

const updatedAt = computed(() => {
  var date = moment(state.timestamp);
  if ( !date.isValid() ) return ''
  return date.format("Do MMM YYYY, HH:mm:ss")
})

const onChange = debounce((val) => {
  state.timestamp = new Date();
  window.location.hash = btoa(JSON.stringify(state))
}, 500)

const restoreState = () => {
  var restored_state = {}

  try {
    restored_state = JSON.parse(atob(location.value.hash.substring(1)));
  } catch (e) {}

  Object.keys(state).forEach((key) => {
    state[key] = restored_state[key] || state[key]
  })
}

const setExtensions = (language) => {
  extensions.value = [oneDark, language]
}

watch(location, () => {
  restoreState()
})

restoreState()

</script>

<template>

  <header>
    <div class="container h-100 d-flex align-items-center">
      <LangList v-model="state.lang" @onLoadLanguage="setExtensions" />
      <div class="ms-auto" v-if="updatedAt">
        updated at {{updatedAt}}
      </div>
    </div>
  </header>
<div class="flex-grow-1 position-relative overflow-auto">

  <codemirror
    v-model="state.code"
    :style="{ height: '100%' }"
    :autofocus="true"
    :indent-with-tab="true"
    :tab-size="2"
    :extensions="extensions"
    @change="onChange"
  />
</div>
  
</template>
