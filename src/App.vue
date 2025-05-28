<script setup lang="ts">
import Carousel from "primevue/carousel";
import { ref } from "vue";

interface Movie {
  imdb_id: string;
  title: string;
  release_date: string;
  rated: string;
  genres: string[];
  votes: number;
  rating: number;
  poster: string;
  watched: string;
}

const movies = ref<Movie[]>([]);

fetch("https://letterboxd-api.tgb.gg/api/tgb20")
  .then((response) => {
    return response.json();
  })
  .then((data: Movie[]) => {
    console.log(data);
    movies.value = data.movies
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
