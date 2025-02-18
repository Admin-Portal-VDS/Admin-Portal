<template>
  <div class="table-wrapper">
    <table class="table-container">
      <thead>
        <tr>
          <th
            v-for="(column, index) in columns"
            :key="index"
            @click="sortColumn(column.key)"
            :data-sort="sortKey === column.key ? sortOrder : ''"
            :data-id="column.key"
          >
            {{ column.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="(row, rowIndex) in sortedData"
          :key="rowIndex"
          class="table-data"
          @mouseover="hoveredRow = rowIndex"
          @mouseleave="hoveredRow = null"
        >
          <td
            v-for="(column, colIndex) in columns"
            :key="colIndex"
            :data-id="`${rowIndex}-${column.key}`"
            class="table-cell"
          >
            <div v-if="colIndex === columns.length - 1" class="last-column">
              <span class="cell-text">{{ row[column.key] }}</span>
              <span v-if="hoveredRow === rowIndex" class="icons">
                <i
                  class="fas fa-edit edit-icon"
                  @click="editUser(editType)"
                ></i>
                <i
                  class="fas fa-user-plus group-icon"
                  @click="addUserToGroup(editType)"
                ></i>
              </span>
            </div>
            <template v-else>
              {{ row[column.key] }}
            </template>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    columns: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
    editType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      sortKey: '',
      sortOrder: '',
      hoveredRow: null,
    };
  },
  // setup(){
  //   const router=useRouter();
  // },
  computed: {
    sortedData() {
      if (!this.sortKey) return this.data;
      return [...this.data].sort((a, b) => {
        const comparison = a[this.sortKey] > b[this.sortKey] ? 1 : -1;
        return this.sortOrder === 'asc' ? comparison : -comparison;
      });
    },
  },
  methods: {
    sortColumn(key) {
      if (this.sortKey === key) {
        this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
      } else {
        this.sortKey = key;
        this.sortOrder = 'asc';
      }
    },
    editUser() {
      this.$router.push(`/edit-${this.editType}-form`);
    },
    addUserToGroup() {
      this.$router.push(`/edit-${this.editType}-form`);
    },
  },
};
</script>

<style scoped>
.table-wrapper {
  background-color: white;
  height: 767px;
  border-radius: 5px;
}
.table-container {
  background-color: white;
  border-collapse: collapse;
  width: 100%;
  text-align: left;
  border-radius: 5px;
}

.table-container th {
  padding: 8px;
  cursor: pointer;
}
.table-container td {
  padding: 18px 18px 18px 22px;
  font-size: 15px;
  border-bottom: 1px solid #cccccc;
}

.table-container th {
  position: relative;
  border-bottom: 1px solid #000;
  cursor: pointer;
  font-size: 15px;
  font-weight: bold;
  user-select: none;
  text-align: left;
}

.table-container th:before {
  content: '';
  display: inline-block;
  background-image: url('/public/assets/both-arrows.svg');
  background-position: center center;
  background-repeat: no-repeat;
  background-size: contain;
  width: 10px;
  height: 10px;
  margin-right: 2px;
}

.table-container th[data-sort='asc']:before {
  background-image: url('/public/assets/up-arrow.svg');
}

.table-container th[data-sort='desc']:before {
  background-image: url('/public/assets/down-arrow.svg');
}

.last-column {
  position: relative;
  display: inline-block;
  width: 100%;
}

.icons {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  gap: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 4px;
  border-radius: 5px;
  z-index: 2;
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
}

.table-data:hover .icons {
  opacity: 1;
}

.edit-icon {
  cursor: pointer;
  color: #454446;
  font-size: 18px;
}

.edit-icon:hover {
  color: #050505;
}

.group-icon {
  cursor: pointer;
  color: #454446;
  font-size: 18px;
}

.group-icon:hover {
  color: #050505;
}
</style>
