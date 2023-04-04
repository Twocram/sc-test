<template>
  <div class="container">
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
  },

  async mounted() {
    await this.getAllCities();
    await this.getAllCitizens();
  }
}
</script>
