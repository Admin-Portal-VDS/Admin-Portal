<template>
  <div>
    <div class="navbar">
      <div
        :class="['navbar-item', { active: selected === 'user' }]"
        @click="selectTab('user')"
      >
        Users
      </div>
      <div
        :class="['navbar-item', { active: selected === 'auditLog' }]"
        @click="selectTab('auditLog')"
      >
        Audit Log
      </div>
    </div>
    <hr class="underline" />
    <SearchFilterBar />
  </div>
</template>

<script>
import SearchFilterBar from './SearchFilterBar.vue';

export default {
  name: 'SectionTabs',
  components: { SearchFilterBar },
  data() {
    return {
      selected: 'user',
    };
  },
  methods: {
    selectTab(tab) {
      this.selected = tab;
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: flex-start;
  gap: 20px;
}
.navbar-item {
  cursor: pointer;
  padding: 5px 2px;
  font-size: 1.1rem;
  text-align: center;
  position: relative;
  display: inline-block;
}

.navbar-item.active {
  font-weight: 600;
}

.navbar-item::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 3px;
  background-color: transparent;
  transition: background-color 0.3s ease;
}

.navbar-item.active::after {
  background-color: black; /* Underline color when active */
}
.underline {
  margin-top: 4px;
}
</style>
