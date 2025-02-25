<script setup lang="ts">
import { useIntervalFn } from '@vueuse/core'
const {data, refresh } = await useFetch('/api/leases', {
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
  sortable: true,
  sort: (a: string, b: string , direction: string) => {
    const aParts = a.split('.').map(Number)
    const bParts = b.split('.').map(Number)
    for (let i = 0; i < 4; i++) {
      if (aParts[i] !== bParts[i]) {
        return direction === 'asc' ? aParts[i] - bParts[i] : bParts[i] - aParts[i]
      }
    }
    return 0
  }
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
        <template #header v-if="router?.data?.value">
            <h1 class="text-3xl font-bold text-center">{{router.data.value.name}} DHCP Leases</h1>
        </template>

        <UTable v-model:sort="sort" :columns="columns" :rows="filteredData" />
        </UCard>
    </div>

</template>