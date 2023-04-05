<template name="tree-item">
  <div class="tab-container">
    <div v-for="(item, index) in data" :data-key="index" :key="index" class="tab-container__item">
      <template v-if="(typeof item === 'object')">
        <tree-item :data="item" :cities="cities" :fullData="fullData" :tooltipData="tooltipData" />
      </template>
      <template v-else>
        <div v-if="tooltipData.some(obj => obj?.name === item.substring(0, item.indexOf('_')))" class="tooltip"
          :data-tooltip="getCityName(item.substring(item.indexOf('_') + 1))">
          - {{ item.substring(0, item.indexOf('_')) }}
        </div>
        <div v-else>
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
    fullData: {
      type: Object,
      required: false,
    },
    data: {
      type: Object,
      required: true
    },
    tooltipData: {
      type: Array,
      required: false,
      default: [],
    },
    cities: {
      type: Array,
      required: false,
      default: [],
    }
  },

  methods: {
    getCityName(id) {
      let cityId = this.tooltipData.find((obj) => obj._id === id).city_id;
      let city = this.cities.find((obj) => obj.id === cityId);
      return `${city?.name}, ${city?.data} жителей`;
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin tab {
    padding-left: 20px;
} 

.tab {
    &-container {
        display: flex;
        flex-direction: column;

        &__item {
            width: max-content;
            @include tab;
        }
    }
}
</style>