<script setup>
import Header from "../components/Header.vue";
import { ref } from "vue";
import { useUserStore } from "../store/user";
import { mapActions, storeToRefs } from "pinia";

const filter = ref("");
const { selectUser, filterUsers, formatDate, getAllUsers } = useUserStore();
const user = useUserStore();
const { loading, usersFilter } = storeToRefs(user);

getAllUsers();
</script>

<template>
  <Header />
  <div class="container" style="max-width: 700px">
    <div>
      <div class="row">
        <input
          type="text"
          class="form-control"
          placeholder="pesquisar"
          @input="filterUsers(filter)"
          ref="filter"
        />
      </div>

      <ul class="list-group mt-3">
        <li
          class="list-group-item d-flex justify-content-center align-items-center gap-3"
          v-if="loading"
        >
          <span>carregando...</span>
        </li>
        <li
          class="d-flex justify-content-center align-items-center gap-3"
          v-if="usersFilter.length == 0"
        >
          <span>Usuário não encontrado.</span>
        </li>
        <li
          v-motion
          :initial="{ opacity: 0, y: 100 }"
          :enter="{ opacity: 1, y: 0, scale: 1 }"
          :delay="200"
          class="bg-dark text-white list-group-item d-flex justify-content-between align-items-center gap-3"
          v-for="user in usersFilter"
          @click="selectUser(user.login)"
        >
          <img
            :src="user.avatar_url"
            alt=""
            class="img-fluid rounded-circle"
            style="width: 60px"
          />
          <span class="flex-fill">
            <p class="mb-0">
              <router-link
                :to="'/user/' + user.login"
                style="
                  text-decoration: none;
                  color: inherit;
                  font-family: poppins;
                "
                >{{ user.login }}</router-link
              >
              <br />registrou-se em: {{ formatDate(user.created_at) }}
            </p>
          </span>
          <p>Repositórios:</p>
          <span class="mb-3">{{ user.public_repos }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>
