<template name="tree-item">
    <div class="tab-container">
        <div v-for="(item, index) in data" :key="index" class="tab-container__item">
            <template v-if="(typeof item === 'object')">
                <tree-item :data="item" :tabLevel="tabLevel + 1" :cities="cities" :tooltipData="tooltipData" />
            </template>
            <template v-else>
                <div v-if="tooltipData.some(obj => obj.name === item)" class=" tooltip" :data-tooltip="getCityName(item)">
                    - {{ item }}
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
        data: {
            type: Object,
            required: true
        },
        tabLevel: {
            type: Number,
            required: false,
            default: 0,
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
        getCityName(userName) {
            let userCityId = this.tooltipData.find((obj) => obj.name === userName).city_id;
            let city = this.cities.find((obj) => obj.id === userCityId);
            return `${city.name}, ${city.data} жителей`;
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

.tooltip {
    position: relative;
    cursor: pointer;
  
    //* Base styles for the entire tooltip */
    &:before, &:after {
      position: absolute;
      visibility: hidden;
      filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=0);
      opacity: 0;
      transition: opacity 0.2s ease-in-out,
      visibility 0.2s ease-in-out,
      transform 0.2s cubic-bezier(0.71, 1.7, 0.77, 1.24);
      transform: translate3d(0, 0, 0);
      pointer-events: none;
    }
  
    //* Show the entire tooltip on hover and focus */
    &:hover, &:focus {
      &:before, &:after {
        visibility: visible;
        filter: progid:DXImageTransform.Microsoft.Alpha(Opacity=100);
        opacity: 1;
      }
    }
  
    //* Base styles for the tooltip's directional arrow */
    &:before {
      z-index: 1001;
      border: 6px solid transparent;
      background: transparent;
      content: "";
    }
  
    //* Base styles for the tooltip's content area */
    &:after {
      z-index: 1000;
      padding: 8px;
      width: 160px;
      background-color: #000;
      background-color: hsla(0, 0%, 20%, 0.9);
      color: #fff;
      content: attr(data-tooltip);
      font-size: 14px;
      line-height: 1.2;
    }
  
    //*** Directions ***/
    //* Top (default) */
    &, &.tooltip-top {
      &:before, &:after {
        bottom: 100%;
        left: 50%;
      }
  
      &:before {
        margin-left: -6px;
        margin-bottom: -12px;
        border-top-color: #000;
        border-top-color: hsla(0, 0%, 20%, 0.9);
      }
  
      &:focus, &:hover {
        &:before, &:after {
          transform: translateY(-12px);
        }
      }
    }
  
    //* Bottom */
    &.tooltip-bottom {
      &:before, &:after {
        top: 100%;
        bottom: auto;
        left: 50%;
      }
  
      &:before {
        margin-top: -12px;
        margin-bottom: 0;
        border-top-color: transparent;
        border-bottom-color: #000;
        border-bottom-color: hsla(0, 0%, 20%, 0.9);
      }
  
      &:focus, &:hover {
        &:before, &:after {
          transform: translateY(12px);
        }
      }
    }
  
    //* Top bottom tweaking */
    &, &.tooltip-top, &.tooltip-bottom {
      // Horizontally align top/bottom tooltips
      &:after {
        margin-left: -80px;
      }
    }
  
    //* Left */
    &.tooltip-left {
      &:before, &:after {
        right: 100%;
        bottom: 50%;
        left: auto;
      }
  
      &:before {
        margin-left: 0;
        margin-right: -12px;
        margin-bottom: 0;
        border-top-color: transparent;
        border-left-color: #000;
        border-left-color: hsla(0, 0%, 20%, 0.9);
      }
  
      &:focus, &:hover {
        &:before, &:after {
          transform: translateX(-12px);
        }
      }
    }
  
    //* Right */
    &.tooltip-right {
      &:before, &:after {
        bottom: 50%;
        left: 100%;
      }
  
      &:before {
        margin-bottom: 0;
        margin-left: -12px;
        border-top-color: transparent;
        border-right-color: #000;
        border-right-color: hsla(0, 0%, 20%, 0.9);
      }
  
      &:focus, &:hover {
        &:before, &:after {
          transform: translateX(12px);
        }
      }
    }
  
    //* Left/right tweaking */
    &.tooltip-left, &.tooltip-right {
      // Move directional arrows down a bit
      &:before {
        top: 3px;
      }
  
      // Vertically center tooltip content
      &:after {
        margin-left: 0;
        margin-bottom: -16px;
      }
    }
  }
</style>