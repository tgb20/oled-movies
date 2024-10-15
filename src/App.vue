<script setup lang="ts">
import Carousel from "primevue/carousel";
import { ref } from "vue";

interface Movie {
  genres: string;
  id: string;
  poster: string;
  rated: string;
  rating: number;
  title: string;
  votes: string;
  watched: string;
  year: number;
}

const movies = ref<Movie[]>([]);

fetch("https://flowers.tgb.gg/movies")
  .then((response) => {
    return response.json();
  })
  .then((data: Movie[]) => {
    console.log(data);
    movies.value = data
      .sort((a, b) => {
        return Date.parse(b.watched) - Date.parse(a.watched);
      })
      .slice(0, 10);
  })
  .catch((err) => {
    console.error(err);
  });

setInterval(() => {
  location.reload();
}, 60 * 60 * 1000);
</script>

<template>
  <div class="flex items-center h-screen">
    <Carousel
      :value="movies"
      :numVisible="3"
      :numScroll="1"
      circular
      :autoplayInterval="3000"
    >
      <template #item="slotProps">
        <div class="rounded m-2">
          <div class="mb-4">
            <div class="relative mx-auto">
              <img
                :src="slotProps.data.poster"
                :alt="slotProps.data.title"
                class="w-full rounded"
              />
            </div>
          </div>
        </div>
      </template>
    </Carousel>
  </div>
</template>

<style scoped></style>
