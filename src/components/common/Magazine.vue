<template>
  <div>
    <Title :title="title" />

    <VDataTable
      :columns="tableColumns"
      :items="magazines"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      @edit="handleEdit"
      @details="handleDetails"
      @delete="handleDelete"
      @load-more="handleLoadMore"
      @search="handleSearch"
      @search-input="handleSearchInput"
    >
      <template #actions>
        <Button 
          text="افزودن مجله"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <MagazineDialog
      :show="showDialog"
      :magazine="editingMagazine"
      :magazine-type="magazineType"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف مجله"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <MagazineDetailsDialog
      :show="showDetailsDialog"
      :magazine="selectedMagazine"
      :magazine-type="magazineType"
      @close="showDetailsDialog = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import MagazineDialog from '@/components/common/MagazineDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import MagazineDetailsDialog from '@/components/common/MagazineDetailsDialog.vue';
import Button from '@/components/common/Button.vue';
import { magazineService } from '@/services/api/magazine';
import { useSnackbar } from '@/utils/snackbar';

const props = defineProps({
  title: { type: String, required: true },
  magazineType: { type: Number, required: true }
});

const { success, error } = useSnackbar();


const deleteConfirmMessage = computed(() => {
  if (!magazineToDelete.value) return 'آیا از حذف این مجله اطمینان دارید؟';
  return `آیا از حذف مجله "${magazineToDelete.value.title}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'title', label: 'عنوان', class: 'text-right' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'active', label: 'وضعیت', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
];

const magazines = ref([]);
const loading = ref(false);
const loadingMore = ref(false);
const currentPage = ref(1);
const itemsPerPage = ref(25);
const totalCount = ref(0);
const hasMoreItems = ref(false);
const searchQuery = ref('');

const showDialog = ref(false);
const editingMagazine = ref(null);
const dialogLoading = ref(false);

const showDeleteConfirm = ref(false);
const magazineToDelete = ref(null);
const deleteLoading = ref(false);

const showDetailsDialog = ref(false);
const selectedMagazine = ref(null);

const fetchMagazines = async () => {
  loading.value = true;
  try {
    const params = {
      skip: (currentPage.value - 1) * itemsPerPage.value,
      take: itemsPerPage.value,
      magazineType: props.magazineType,
      sort: 'des|createDate'
    };
    
    if (searchQuery.value.trim()) {
      params.include = searchQuery.value.trim();
    }
    
    const response = await magazineService.search(params);
    
    if (response.data.success) {
      magazines.value = response.data.list || [];
      totalCount.value = response.data.totalCount || 0;
      hasMoreItems.value = (response.data.totalCount || 0) > (response.data.list || []).length;
    } else {
      console.error('Failed to fetch magazines:', response.data.message);
      error('خطا در دریافت مجله‌ها');
    }
  } catch (err) {
    console.error('Error fetching magazines:', err);
    error('خطا در دریافت مجله‌ها');
  } finally {
    loading.value = false;
  }
};

const handleLoadMore = async () => {
  if (loadingMore.value) return;
  
  loadingMore.value = true;
  try {
    currentPage.value += 1;
    const params = {
      skip: (currentPage.value - 1) * itemsPerPage.value,
      take: itemsPerPage.value,
      magazineType: props.magazineType,
      sort: 'des|createDate'
    };
    
    if (searchQuery.value.trim()) {
      params.include = searchQuery.value.trim();
    }
    
    const response = await magazineService.search(params);
    
    if (response.data.success) {
      magazines.value = [...magazines.value, ...(response.data.list || [])];
      hasMoreItems.value = magazines.value.length < response.data.totalCount;
    } else {
      console.error('Failed to load more magazines:', response.data.message);
      error('خطا در دریافت مجله‌های بیشتر');
      currentPage.value -= 1;
    }
  } catch (err) {
    console.error('Error loading more magazines:', err);
    error('خطا در دریافت مجله‌های بیشتر');
    currentPage.value -= 1;
  } finally {
    loadingMore.value = false;
  }
};

const showAddDialog = () => {
  editingMagazine.value = null;
  showDialog.value = true;
};

const closeDialog = () => {
  showDialog.value = false;
  editingMagazine.value = null;
};

const handleEdit = (magazine) => {
  editingMagazine.value = magazine;
  showDialog.value = true;
};

const handleDetails = (magazine) => {
  selectedMagazine.value = magazine;
  showDetailsDialog.value = true;
};

const handleDelete = (magazine) => {
  magazineToDelete.value = magazine;
  showDeleteConfirm.value = true;
};

const confirmDelete = async () => {
  if (!magazineToDelete.value) return;
  
  deleteLoading.value = true;
  try {
    const response = await magazineService.delete(magazineToDelete.value.id);
    if (response.data.success) {
      currentPage.value = 1;
      await fetchMagazines();
      success('مجله با موفقیت حذف شد');
      showDeleteConfirm.value = false;
      magazineToDelete.value = null;
    } else {
      error('خطا در حذف مجله: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error deleting magazine:', err);
    error('خطا در حذف مجله');
  } finally {
    deleteLoading.value = false;
  }
};




const handleSearch = (query) => {
  searchQuery.value = query;
  currentPage.value = 1;
  fetchMagazines();



};

const handleSearchInput = (query) => {
  searchQuery.value = query;
};

const handleSubmit = async (formData) => {
  dialogLoading.value = true;
  try {
    let response;
    if (formData.id) {
      response = await magazineService.update(formData);
    } else {
      response = await magazineService.create(formData);
    }
    
    if (response.data.success) {
      closeDialog();
      currentPage.value = 1;
      await fetchMagazines();
      success(formData.id ? 'مجله با موفقیت ویرایش شد' : 'مجله با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره مجله: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    console.error('Error saving magazine:', err);
    error('خطا در ذخیره مجله');
  } finally {
    dialogLoading.value = false;
  }
};

onMounted(() => {
  fetchMagazines();
});
</script>

<style scoped>
</style>