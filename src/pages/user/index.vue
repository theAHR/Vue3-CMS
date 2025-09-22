<template>
  <div>
    <Title title="لیست کاربران" />

    <VDataTable
      :columns="tableColumns"
      :items="users"
      :loading="loading"
      :loading-more="loadingMore"
      :has-more-items="hasMoreItems"
      :show-load-more="true"
      :actions="tableActions"
      :show-add-button="false"
      @edit="handleEdit"
      @details="handleDetails"
      @changePassword="handleChangePasswordClick"
      @delete="handleDelete"
      @load-more="handleLoadMore"
      @search="handleSearch"
      @search-input="handleSearchInput"
    >
      <template #actions>
        <Button 
          text="افزودن کاربر"
          variant="success"
          iconSrc="/src/assets/img/icons/add.svg"
          @click="showAddDialog"
        />
      </template>
    </VDataTable>

    <UserDialog
      :show="showDialog"
      :user="editingUser"
      :loading="dialogLoading"
      @close="closeDialog"
      @submit="handleSubmit"
    />

    <ConfirmDialog
      v-model="showDeleteConfirm"
      title="حذف کاربر"
      :message="deleteConfirmMessage"
      confirm-text="حذف"
      cancel-text="انصراف"
      type="danger"
      :loading="deleteLoading"
      @confirm="confirmDelete"
      @cancel="showDeleteConfirm = false"
    />

    <UserDetailsDialog
      :show="showDetailsDialog"
      :user="selectedUser"
      @close="showDetailsDialog = false"
    />

    <ChangePasswordDialog
      :show="showChangePasswordDialog"
      :user="userToChangePassword"
      :loading="changePasswordLoading"
      @close="closeChangePasswordDialog"
      @submit="handleChangePassword"
    />
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import Title from '@/components/common/Title.vue';
import VDataTable from '@/components/common/VDataTable.vue';
import UserDialog from '@/components/common/UserDialog.vue';
import ConfirmDialog from '@/components/common/ConfirmDialog.vue';
import UserDetailsDialog from '@/components/common/UserDetailsDialog.vue';
import ChangePasswordDialog from '@/components/common/ChangePasswordDialog.vue';
import Button from '@/components/common/Button.vue';
import { useUserStore } from '@/stores';
import { useSnackbar } from '@/utils/snackbar';

const { success, error } = useSnackbar();
const userStore = useUserStore();

const {
  data: users,
  loading,
  loadingMore,
  hasMoreItems,
  showDialog,
  editingUser,
  dialogLoading,
  showDeleteConfirm,
  userToDelete,
  deleteLoading,
  showDetailsDialog,
  selectedUser,
  showChangePasswordDialog,
  userToChangePassword,
  changePasswordLoading
} = storeToRefs(userStore);


const deleteConfirmMessage = computed(() => {
  if (!userToDelete.value) return 'آیا از حذف این کاربر اطمینان دارید؟';
  return `آیا از حذف کاربر "${userToDelete.value.name} ${userToDelete.value.lastName}" اطمینان دارید؟`;
});

const tableColumns = [
  { key: 'rowNumber', label: 'ردیف', class: 'text-center' },
  { key: 'fullName', label: 'نام کامل', class: 'text-center' },
  { key: 'username', label: 'نام کاربری', class: 'text-center' },
  { key: 'role', label: 'نقش', class: 'text-center' },
  { key: 'createDate', label: 'تاریخ ایجاد', class: 'text-center' },
  { key: 'active', label: 'وضعیت', class: 'text-center' },
  { key: 'actions', label: 'عملیات', class: 'text-center' }
];

const tableActions = [
  { key: 'edit', label: 'ویرایش', icon: 'M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z' },
  { key: 'details', label: 'جزئیات', icon: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z' },
  { key: 'changePassword', label: 'تغییر رمز عبور', icon: 'M12 15c1.66 0 3-1.34 3-3V6c0-1.66-1.34-3-3-3S9 4.34 9 6v6c0 1.66 1.34 3 3 3zM17 8h-1V6c0-2.76-2.24-5-5-5S6 3.24 6 6v2H5c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2z' },
  { key: 'delete', label: 'حذف', icon: 'M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z' }
];

const handleLoadMore = async () => {
  try {
    await userStore.loadMoreUsers();
  } catch (err) {
    error('خطا در دریافت کاربران بیشتر');
  }
};

const showAddDialog = () => {
  userStore.openAddDialog();
};

const closeDialog = () => {
  userStore.closeDialog();
};

const handleEdit = (user) => {
  userStore.openEditDialog(user);
};

const handleDetails = (user) => {
  userStore.openDetailsDialog(user);
};

const handleChangePasswordClick = (user) => {
  userStore.openChangePasswordDialog(user);
};

const closeChangePasswordDialog = () => {
  userStore.closeChangePasswordDialog();
};

const handleChangePassword = async (formData) => {
  try {
    const response = await userStore.changePassword(formData);
    if (response.data.success) {
      userStore.closeChangePasswordDialog();
      success('رمز عبور با موفقیت تغییر کرد');
    } else {
      error('خطا در تغییر رمز عبور: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در تغییر رمز عبور');
  }
};

const handleDelete = (user) => {
  userStore.openDeleteConfirm(user);
};

const confirmDelete = async () => {
  try {
    await userStore.deleteUser(userToDelete.value.id);
    success('کاربر با موفقیت حذف شد');
    userStore.closeDeleteConfirm();
  } catch (err) {
    error('خطا در حذف کاربر');
  }
};

const handleSearch = async (query) => {
  userStore.setSearchQuery(query);
  userStore.setCurrentPage(1);
  try {
    await userStore.searchUsers();
  } catch (err) {
    error('خطا در جستجوی کاربران');
  }
};

const handleSearchInput = (query) => {
  userStore.setSearchQuery(query);
};

const handleSubmit = async (formData) => {
  try {
    let response;
    if (formData.id) {
      response = await userStore.updateUser(formData);
    } else {
      response = await userStore.createUser(formData);
    }
    
    if (response.data.success) {
      userStore.closeDialog();
      success(formData.id ? 'کاربر با موفقیت ویرایش شد' : 'کاربر با موفقیت ایجاد شد');
    } else {
      error('خطا در ذخیره کاربر: ' + (response.data.message || 'خطای نامشخص'));
    }
  } catch (err) {
    error('خطا در ذخیره کاربر');
  }
};

onMounted(async () => {
  try {
    await userStore.searchUsers();
  } catch (err) {
    error('خطا در دریافت کاربران');
  }
});
</script>

<style scoped>
</style> 