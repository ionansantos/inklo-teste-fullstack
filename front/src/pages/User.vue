<script setup>
import { useUserStore } from "../store/user";
import { storeToRefs } from "pinia";
import Header from "../components/Header.vue";
import { useRouter, useRoute } from "vue-router";
import { ref } from "vue";
import JsonCsv from "vue-json-csv";

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
const { user, users, isSave } = storeToRefs(userStore);
const { getUserCsv, saveLocal, verifySave } = useUserStore();
const totalRepos = ref(7);

if (users.value.length == 0) {
  router.push("/");
}
verifySave(route.params.login);
</script>

<template>
  <Header />
  <div class="container" style="max-width: 700px">
    <div>
      <router-link to="/" class="fs-3"
        ><i class="bi bi-arrow-left-circle-fill"></i
      ></router-link>
    </div>

    <div
      v-motion
      :initial="{ opacity: 0, y: 100 }"
      :enter="{ opacity: 1, y: 0, scale: 1 }"
      class="row mt-3"
    >
      <img
        :src="user.avatar_url"
        alt=""
        class="col-2 p-0 rounded-2 img-fluid"
        style="width: 200px; height: 200px"
      />
      <div class="col-8 mr-5 flex-column">
        <h1 class="fs-2 title-user">
          {{ user.login }} <span class="location">{{ user.location }}</span>
        </h1>
        <p>{{ user.bio }}</p>
        <ul class="d-flex p-0 mb-2">
          <li class="list-group-item me-2 info">
            seguindo: {{ user.following }}
          </li>
          <li class="list-group-item me-2 info">
            seguidores: {{ user.followers }}
          </li>
          <li class="list-group-item info">
            repositórios públicos: {{ user.public_repos }}
          </li>
        </ul>
        <button
          class="btn btn-sm m-2"
          @click="saveLocal(user.login)"
          :class="[isSave ? 'btn-secondary disabled' : 'btn-primary']"
        >
          {{ isSave ? "Salvo" : "salvar" }}
        </button>
        <JsonCsv
          :data="[getUserCsv()]"
          :fields="[
            'login',
            'biografia',
            'localização',
            'seguindo',
            'seguidores',
            'empresa',
            'email',
            'blog',
            'twitter',
            'repositorios',
            { label: 'repositorios', value: 'repoData' },
          ]"
          name="usuario.csv"
          class="btn btn-success btn-sm m-2"
        >
          Exportar CSV
        </JsonCsv>
      </div>
    </div>

    <ul class="list-group justify-content-center my-3 mb-5">
      <li class="fw-bold d-flex justify-content-center">
        <h3 class="title">PROJETOS</h3>
      </li>

      <li
        class="list-group-item justify-content-center d-flex"
        v-if="!user.repos"
      >
        <span>carregando...</span>
      </li>

      <span v-if="user.repos" class="card-group justify-content-center">
        <a
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :variants="{ custom: { scale: 2 } }"
          :hovered="{ scale: 1.2 }"
          :delay="200"
          :href="repo.html_url"
          target="_blank"
          class="bg-dark text-white list-group-item justify-content-between m-2 p-2"
          style="cursor: pointer"
          v-for="repo in user.repos.slice(0, 120)"
          v-bind:key="repo"
        >
          {{ repo.name }}
          -
          <i class="bi bi-star-fill mx-1"></i>
          {{ repo.stargazers_count }}
        </a>
      </span>
    </ul>
  </div>
</template>

<style scoped>
h1,
ul,
li {
  font-family: Arial, Helvetica, sans-serif, poppins;
}
.title {
  font-family: Arial, Helvetica, sans-serif, poppins;
  font-weight: bolder;
}
.title-user {
  font-family: Arial, Helvetica, sans-serif, poppins;
  font-weight: bolder;
}
.location {
  top: 10px;
  font-size: 10px;
}
.info {
  font-size: 14px;
  font-weight: bold;
}
</style>
