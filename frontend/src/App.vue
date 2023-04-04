<template>
  <div class="container">
    <button @click="getAddress">click</button>
  </div>
</template>

<script>
export default {
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
        const { name: cityName } = this.cities.find(city => city.id === item.city_id);
        const { name: districtName } = item.groups.find(group => group.type === 'district');
        const { name: streetName } = item.groups.find(group => group.type === 'street');
        const { name } = item;
        if (!map.has(cityName)) {
          map.set(cityName, new Map([[districtName, new Map([[streetName, [name]]])]]));
        } else {
          const cityMap = map.get(cityName);
          if (!cityMap.has(districtName)) {
            cityMap.set(districtName, new Map([[streetName, [name]]]));
          } else {
            const districtMap = cityMap.get(districtName);
            if (!districtMap.has(streetName)) {
              districtMap.set(streetName, [name]);
            } else {
              districtMap.get(streetName).push(name);
            }
          }
        }
      });

      map.forEach((district, city) => {
        console.log('-', city);
        district.forEach((street, d) => {
          console.log(' -', d);
          street.forEach((names, s) => {
            console.log('  -', s);
            names.forEach((n) => console.log('   -', n))
          })
        })
      })

      return map;
    }
  },

  async mounted() {
    await this.getAllCities();
    await this.getAllCitizens();
  },
}
</script>
