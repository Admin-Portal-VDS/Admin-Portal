<template>
  <div>
    <DashboardHeader />
    <div id="admin-dashboard">
      <LeftNavigation />
      <Users v-if="useSelectedOptionStore.selectedOption === 'USERS'" />
      <GroupManagement
        v-else-if="useSelectedOptionStore.selectedOption === 'GROUP_MANAGEMENT'"
      />
      <UserPermissions
        v-else-if="useSelectedOptionStore.selectedOption === 'USER_PERMISSIONS'"
      />
      <ExtensionComponent
        v-else-if="useSelectedOptionStore.selectedOption === 'EXTENSIONS'"
      />
    </div>
  </div>
</template>

<script>
import LeftNavigation from '@/components/dashboard/left-navigation/LeftNavigation.vue';
import DashboardHeader from '@/components/dashboard/header/DashboardHeader.vue';
import Users from '@/pages/Users.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';
import GroupManagement from '@/pages/GroupManagement.vue';
import UserPermissions from '@/pages/UserPermissions.vue';
import ExtensionComponent from '@/pages/Extensions.vue';

export default {
  name: 'AdminDashboard',
  components: {
    DashboardHeader,
    LeftNavigation,
    Users,
    GroupManagement,
    UserPermissions,
    ExtensionComponent,
  },
  computed: {
    useSelectedOptionStore() {
      return useSelectedOptionStore();
    },
  },
};
</script>

<style scoped>
#admin-dashboard {
  display: flex;
  flex-direction: row;
}
</style>
