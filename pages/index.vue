<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
const { pending, data, error, refresh } = await useFetch('/api/leases', {
  method: 'GET',
  headers: {
    'Cache-Control': 'no-cache',
  }})

const router = await useFetch('/api/router')

useIntervalFn(() => {
  refresh()
}, 3000)

const filteredData = computed(() => {
  if (!data.value) return []
  return data.value.map((lease: any) => {
    return {
      'ip': lease['active-address'],
      'expires': lease['expires-after'],
      'host': lease['host-name'],
      'mac': lease['mac-address']
    }
  }).filter((lease: any) => !!lease['ip']);
})

const sort = ref({
  column: 'ip',
  direction: 'asc'
})

const columns = [{
  key: 'ip',
  label: 'IP Address',
  sortable: true
},{
  key: 'host',
  label: 'Hostname',
  sortable: true
},{
  key: 'expires',
  label: 'Expires after',
  sortable: true
},{
  key: 'mac',
  label: 'Mac Address',
  sortable: true,
}]

</script>

<template>
    <div class="flex flex-col pt-6">
        <UCard class="m-auto" >
        <template #header>
            <h1 class="text-3xl font-bold text-center">{{router.data.value.name}} DHCP Leases</h1>
        </template>

        <UTable v-model:sort="sort" :columns="columns" :rows="filteredData" />
        </UCard>
    </div>

</template>