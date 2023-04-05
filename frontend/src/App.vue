<template>
  <div class="container">
    <tree-item :data="getAddress()" :fullData="getAddress()" :tooltipData="citizens" :cities="cities" />
  </div>
</template>

<script>
import TreeItem from './components/TreeItem.vue';
export default {
  components: { TreeItem },
  data() {
    return {
      cities: [],
      citizens: [],
    }
  },

  methods: {
    async getAllCities() {
      try {
        const res = await fetch('http://localhost:3000/api/cities');
        const data = await res.json();
        this.cities = data;
      } catch (e) {
        console.error(e)
      }
    },

    async getAllCitizens() {
      try {
        const res = await fetch('http://localhost:3000/api/citizens');
        const data = await res.json();
        this.citizens = data;
      } catch (e) {
        console.error(e)
      }
    },

    getAddress() {
      const map = new Map();
      this.citizens.forEach(item => {
        const { name } = item;
        const { name: cityName } = this.cities.find(city => city.id === item.city_id);
        const { name: districtName } = item.groups.find(group => group.type === 'district');
        const { name: streetName } = item.groups.find(group => group.type === 'street');

        const cityMap = map.get(cityName) || new Map();
        const districtMap = cityMap.get(districtName) || new Map();
        const streetList = districtMap.get(streetName) || [];
        streetList.push([name]);

        map.set(cityName, cityMap);
        cityMap.set(districtName, districtMap);
        districtMap.set(streetName, streetList);
      });

      function printMap(map, level = 1) {
        const tab = "\t".repeat(level - 1);
        for (const [key, value] of map.entries()) {
          console.log(`${tab}-${key}`);
          if (value instanceof Map) {
            printMap(value, level + 1);
          } else {
            for (let item of value) {
              console.log(`${tab}\t-${item}`)
            }
          }
        }
      }
      printMap(map);
      return map;
    }
  },

  async mounted() {
    await this.getAllCities();
    await this.getAllCitizens();
  },
}
</script>
