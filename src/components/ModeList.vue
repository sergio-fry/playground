<script setup>
import { computed, onActivated } from 'vue'

const modes = { "normal": "normal", "vim": "vim" }

const props = defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue', 'onLoadMode'])

const modeName = computed({
  get() {
    return props.modelValue
  },
  set(value) {
    emit('update:modelValue', value)
    emit('onLoadMode', value)
  }
})

if (!props.modelValue) {
    modeName.value = 'ruby'
} else {
    emit('onLoadMode', mode[modeName.value])
}

</script>

<template>
    <div class="modes">
        <select name="" id="" class="form-select" v-model="modeName">
          <option :value="option" :key="option" v-for="option in Object.keys(modes)">
            {{ option }}
          </option>
        </select>
      </div>
</template>
