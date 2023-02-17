<script setup>
import Header from '../components/Header.vue';
</script>
<template>
  <Header/>
  <div class="container" style="max-width: 700px;">
    <div class="row text-center justify-content-center">
      <h2>Ops, essa página não existe</h2>
      <router-link to="/" class="fs-6">voltar</router-link>
    </div>
  </div>
</template>