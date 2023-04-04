<template name="tree-item">
    <div>
        <div v-for="item in data" :key="item">
            <template v-if="(typeof item === 'object')">
                <tree-item :data="item" :tabLevel="tabLevel + 1" />
            </template>
            <template v-else>
                <div :style="{ marginLeft: (tabLevel + 1) + 'em' }">
                    - {{ item }}
                </div>
            </template>
        </div>
    </div>
</template>
  
<script>
export default {
    name: "tree-item",
    props: {
        data: {
            type: Object,
            required: true
        },
        tabLevel: {
            type: Number,
            default: 0,
        }
    },
};
</script>
  