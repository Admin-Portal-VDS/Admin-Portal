<template>
  <main id="admin-body" class="main">
    <PageHeader :heading="useSelectedOptionStore.selectedOptionLabel" />
    <SectionTabs />
    <DataTable :columns="filteredColumns" :data="filteredData" />
  </main>
</template>

<script>
import PageHeader from '@/components/common/PageHeader.vue';
import SectionTabs from '@/components/common/SectionTabs.vue';
import { useSelectedOptionStore } from '@/stores/selectedOption';
import DataTable from '@/components/common/DataTable.vue';
import tableData from '@/json/tableData.json';

export default {
  name: 'AdminBody',
  components: {
    SectionTabs,
    PageHeader,
    DataTable,
  },
  data() {
    return {
      ...tableData,
    };
  },
  computed: {
    useSelectedOptionStore() {
      return useSelectedOptionStore();
    },
    filteredColumns() {
      return tableData.permissionColumn;
    },
    filteredData() {
      return tableData.permissionData;
    },
  },
};
</script>

<style scoped>
#admin-body {
  background: #f2f2f2;
  flex: 1;
  height: 100vh;
}
.main {
  height: 100vh;
  padding: 24px 32px;
}
</style>
