<script setup>
import {useI18n} from "vue-i18n";
import {useRouter} from "vue-router";
import {useConfirm} from "primevue";
import useGeoMineStore from "../../application/GeoMine.store.js";
import {onMounted, toRefs} from "vue";

const { t } = useI18n();
const router = useRouter();
const confirm = useConfirm();
const store = useGeoMineStore();
const { maquinarias, maquinariasLoaded, errors} = toRefs(store);
const { fetchmaquinarias, deletemaquinaria } = store;

onMounted(() => {
  if (!store.maquinariasLoaded) {
    fetchmaquinarias();
    maquinariasLoaded.value = store.maquinariasLoaded;
  }
});

/**
 * Navigate to the new maquinaria creation page.
 */
const navigateToNew = () => {
  router.push({ name: 'GeoMine-maquinaria-new' });
};

/**
 * Navigate to the maquinaria editing page.
 * @param {number} id - The ID of the maquinaria to edit.
 */
const navigateToEdit = (id) => {
  console.log(id);
  router.push({ name: 'GeoMine-maquinaria-edit', params: { id } });
};

/**
 * Confirm and delete a maquinaria.
 * @param {Object} maquinaria - The maquinaria to delete.
 */
const confirmDelete = (maquinaria) => {
  confirm.require({
    message: t('maquinarias.confirm-delete', { title: maquinaria.title }),
    header: t('maquinarias.delete-header'),
    icon: 'pi pi-exclamation-triangle',
    accept: () => { deletemaquinaria(maquinaria); },
  });
};
</script>

<template>
  <div class="p-4">
    <h1>{{ t('maquinarias.title') }}</h1>
    <pv-button :label="t('maquinarias.new')" icon="pi pi-plus" class="mb-3" @click="navigateToNew" />
    <pv-data-table
        :value="maquinarias"
        :loading="!maquinariasLoaded"
        striped-rows
        table-style="min-width: 50rem"
        paginator
        :rows="5"
        :rows-per-page-options="[5, 10, 20]"
    >
      <pv-column field="id" :header="t('maquinarias.id')" sortable />
      <pv-column field="title" :header="t('maquinarias.title')" sortable />
      <pv-column field="summary" :header="t('maquinarias.summary')" />
      <pv-column field="categoryId" :header="t('maquinarias.category-id')" />
      <pv-column :header="t('maquinarias.actions')">
        <template #body="slotProps">
          <pv-button icon="pi pi-pencil" text rounded @click="navigateToEdit(slotProps.data.id)" />
          <pv-button icon="pi pi-trash" text rounded severity="danger" @click="confirmDelete(slotProps.data)" />
        </template>
      </pv-column>
    </pv-data-table>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
    <pv-confirm-dialog />
  </div>
</template>

<style scoped>

</style>