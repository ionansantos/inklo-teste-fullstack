import { defineStore } from 'pinia';
import axios from 'axios';

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      baseURL: window.location.origin,
      selectedUser: "",
      user: {},
      users: [],
      usersFilter: [],
      usersName: ["diego3g", "wallysonn", "filipedeschamps", "rmanguinho"],
      loading: false,
      isSave: false
    }
  },

  actions: {
    async selectUser(login) {
      this.selectedUser = login;
      this.user = this.users.find(user => user.login === login);
      const repos = await axios.get(`https://api.github.com/users/${login}/repos`)
      this.user.repos = repos?.data;
    },

    async getAllUsers() {
      if (this.users.length > 0) return;
    
      try {
        this.loading = true;
        const promises = this.usersName.map((username) =>
          axios.get(`https://api.github.com/users/${username}`)
        );
        const users = await Promise.all(promises);
    
        this.users = users.map((user) => user.data);
        this.usersFilter = this.users;
      } catch (error) {
        console.error(error);
      } finally {
        this.loading = false;
      }
    },

    getUserCsv() {
      const user = this.user;
      let repoData = null;
      if (user.repos && Array.isArray(user.repos)) {
        const repos = user.repos;
        const repoNames = repos.map((repo) => repo.name);
        repoData = {
          name: repoNames.join(', '),
        };
      }

      return {
        login: user.login,
        bio: user.bio,
        location: user.location,
        following: user.following,
        followers: user.followers,
        name: user.name,
        company: user.company,
        email: user.email,
        blog: user.blog,
        twitter_username: user.twitter_username,
        ...repoData,
      };
    },

    filterUsers(filter) {
      const users = this.users.filter(user => {
        return user.login.indexOf(filter.value.toLowerCase()) != -1;
      })

      this.usersFilter = users;
    },

    async getUser(login) {
      try {
        const response = await api.get(`/users/${login}`);
        this.user = response.data;
      } catch (error) {
        console.error(error);
      }
    },    

    async saveLocal(login) {
      const save = await axios.post(`${this.baseURL}/salvar-local`, {
        login,
      }).then(response => {
        this.isSave = true;
      }).catch(err => {
        this.isSave = false;
      })
    },

    async verifySave(login) {
      const save = await axios.get(`${this.baseURL}/login?login=${login}`)
      .then(response => {
        this.isSave = true;
      }).catch(err => {
        this.isSave = false;
      })
    },  

    formatDate(date) {
      return date.split('T')[0]
    }
  },

})