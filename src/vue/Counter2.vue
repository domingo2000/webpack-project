<template>
  <h1>Counter 2 Vue SCSS</h1>
  <div class="counter">
    <button @click="decrement">-</button>
    <span>{{ count }}</span>
    <button @click="increment">+</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

const count = ref(0);

function increment() {
  count.value++;
}

function decrement() {
  count.value--;
}
</script>

<style scoped lang="css">
.counter {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #dbb5b5;
}
</style>
