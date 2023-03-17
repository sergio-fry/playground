<script setup>
import { computed, onActivated } from 'vue'
import languages from '../languages/'

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'onLoadLanguage'])

const langName = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    emit('onLoadLanguage', languages[value])
  }
})

if (!props.modelValue) {
    langName.value = 'ruby'
} else {
    emit('onLoadLanguage', languages[langName.value])
}

</script>

<template>
    <div class="languages">
        <select name="" id="" class="form-select" v-model="langName">
          <option :value="option" :key="option" v-for="option in Object.keys(languages)">
            {{ option }}
          </option>
        </select>
      </div>
</template>
