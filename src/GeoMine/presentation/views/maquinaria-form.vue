<script setup>
import {useI18n} from "vue-i18n";
import {useRoute, useRouter} from "vue-router";
import useGeoMineStore from "../../application/GeoMine.store.js";
import {computed, onMounted, ref} from "vue";
import {maquinaria} from "../../domain/model/maquinaria.entity.js";

const {t} = useI18n();
const route = useRoute();
const router = useRouter();
const store = useGeoMineStore();
const {errors, categories, addmaquinaria, updatemaquinaria, fetchCategories} = store;

const form = ref({title: '', summary: '', categoryId: null});
const isEdit = computed(() => !!route.params.id);

onMounted(() => {
  if (!categories.length) fetchCategories();
  if (isEdit.value) {
    const maquinaria = getmaquinariaById(route.params.id);
    if (maquinaria) {
      form.value.title = maquinaria.title;
      form.value.summary = maquinaria.summary;
      form.value.categoryId = maquinaria.categoryId;
    } else router.push({name: 'GeoMine-maquinarias'});
  }
});

/**
 * Retrieves a maquinaria by its ID.
 * @param {string} id - The ID of the maquinaria.
 * @returns {Object|null} - The maquinaria object if found, null otherwise.
 */
function getmaquinariaById(id) {
  return store.getmaquinariaById(id);
}

const savemaquinaria = () => {
  /**
   * Saves the maquinaria.
   * If editing an existing maquinaria, updates it; otherwise, adds a new maquinaria.
   */
  const maquinaria = new maquinaria({
    id: isEdit.value ? route.params.id : null,
    title: form.value.title,
    summary: form.value.summary,
    categoryId: form.value.categoryId,
  });
  if (isEdit.value) updatemaquinaria(maquinaria); else addmaquinaria(maquinaria);
  navigateBack();
};

/**
 * Navigates back to the maquinarias list.
 */
const navigateBack = () => {
  router.push({name: 'GeoMine-maquinarias'});
};
</script>

<template>
  <div class="p-4">
    <h1>{{ isEdit ? t('maquinaria.edit-title') : t('maquinaria.new-title') }}</h1>
    <form @submit.prevent="savemaquinaria">
      <div class="field mb-3">
        <label for="title">{{ t('maquinaria.title') }}</label>
        <pv-input-text id="title" v-model="form.title" required class="w-full" />
      </div>
      <div class="field mb-3">
        <label for="summary">{{ t('maquinaria.summary') }}</label>
        <pv-textarea id="summary" v-model="form.summary" rows="4" class="w-full" />
      </div>
      <div class="field mb-3">
        <label for="category">{{ t('maquinaria.category') }}</label>
        <pv-select
            id="category"
            v-model="form.categoryId"
            :options="categories"
            optionLabel="name"
            optionValue="id"
            placeholder="Select a category"
            class="w-full"
        />
      </div>
      <pv-button type="submit" :label="t('maquinaria.save')" icon="pi pi-save" />
      <pv-button :label="t('maquinaria.cancel')" severity="secondary" class="ml-2" @click="navigateBack" />
    </form>
    <div v-if="errors.length" class="text-red-500 mt-3">
      {{ t('errors.occurred') }}: {{ errors.map(e => e.message).join(', ') }}
    </div>
  </div>
</template>

<style scoped>

</style>