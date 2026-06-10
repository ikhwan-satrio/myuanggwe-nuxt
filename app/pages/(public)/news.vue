<script setup lang="ts">
useHead({
  title: "News",
  meta: [
    {
      name: "description",
      content: "Latest financial and economic news from CNBC Indonesia",
    },
  ],
});

interface Article {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image: string | null;
}

const { data, pending, error, refresh } = useFetch<Article[]>("/api/news", {
  server: false,
  lazy: true,
});

const articles = computed(() => data.value ?? []);
const featured = computed(() => articles.value[0]);
const rest = computed(() => articles.value.slice(1));

function formatDate(dateStr: string) {
  const d = new Date(dateStr);
  const now = Date.now();
  const diff = now - d.getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (mins < 1) return "Baru saja";
  if (mins < 60) return `${mins} menit yang lalu`;
  if (hours < 24) return `${hours} jam yang lalu`;
  if (days < 3) return `${days} hari yang lalu`;
  return d.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function extractCategory(url: string) {
  const match = url.match(/https:\/\/www\.cnbcindonesia\.com\/([^/]+)/);
  return match?.[1] ?? null;
}

const categoryLabels: Record<string, string> = {
  market: "Pasar",
  news: "News",
  entrepreneur: "Wirausaha",
  syariah: "Syariah",
  tech: "Teknologi",
  lifestyle: "Gaya Hidup",
  "entre-leadership": "Kepemimpinan",
  entertainment: "Hiburan",
};

function categoryLabel(url: string) {
  const cat = extractCategory(url);
  return cat ? (categoryLabels[cat] ?? cat) : null;
}
</script>

<template>
  <div class="mx-auto max-w-6xl space-y-8 px-4 py-6 sm:py-10">
    <div class="flex flex-wrap items-center justify-between gap-3">
      <div>
        <div class="flex items-center gap-2">
          <div
            class="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10"
          >
            <Icon name="lucide:newspaper" class="h-4 w-4 text-primary" />
          </div>
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
            Berita Terkini
          </h1>
        </div>
        <p class="mt-1 text-sm text-muted-foreground">
          Latest financial news from CNBC Indonesia
        </p>
      </div>
      <UiButton
        variant="outline"
        size="sm"
        class="gap-2"
        :disabled="pending"
        @click="refresh()"
      >
        <Icon
          name="lucide:refresh-cw"
          class="h-4 w-4"
          :class="{ 'animate-spin': pending }"
        />
        Refresh
      </UiButton>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="space-y-8">
      <UiSkeleton class="h-56 w-full rounded-xl sm:h-72" />
      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div v-for="i in 5" :key="i" class="space-y-3">
          <UiSkeleton class="h-36 w-full rounded-lg" />
          <UiSkeleton class="h-4 w-3/4" />
          <UiSkeleton class="h-3 w-full" />
          <UiSkeleton class="h-3 w-1/3" />
        </div>
      </div>
    </div>

    <!-- Error State -->
    <div
      v-else-if="error"
      class="flex flex-col items-center gap-4 rounded-xl border border-destructive/30 bg-destructive/5 p-12 text-center"
    >
      <div class="rounded-full bg-destructive/10 p-4">
        <Icon name="lucide:alert-triangle" class="h-8 w-8 text-destructive" />
      </div>
      <div>
        <p class="text-lg font-semibold">Gagal memuat berita</p>
        <p class="text-sm text-muted-foreground">
          Could not load news. Please check your connection and try again.
        </p>
      </div>
      <UiButton variant="outline" size="sm" @click="refresh()"
        >Coba Lagi</UiButton
      >
    </div>

    <template v-else>
      <!-- Featured Article -->
      <a
        v-if="featured"
        :href="featured.link"
        target="_blank"
        rel="noopener noreferrer"
        class="group relative flex min-h-[200px] overflow-hidden rounded-xl border bg-card sm:min-h-[300px]"
      >
        <div v-if="featured.image" class="w-full sm:w-3/5">
          <NuxtImg
            :src="featured.image"
            :alt="featured.title"
            class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            loading="eager"
          />
        </div>
        <div
          class="flex flex-1 flex-col justify-end p-5 sm:p-8"
          :class="!featured.image && 'w-full'"
        >
          <div class="flex items-center gap-2">
            <span
              v-if="categoryLabel(featured.link)"
              class="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
            >
              {{ categoryLabel(featured.link) }}
            </span>
            <span class="text-[10px] text-muted-foreground"
              >CNBC Indonesia</span
            >
          </div>
          <h2
            class="mt-2 text-lg font-bold leading-snug group-hover:text-primary sm:text-2xl"
          >
            {{ featured.title }}
          </h2>
          <p
            v-if="featured.description"
            class="mt-1 line-clamp-2 text-xs text-muted-foreground sm:text-sm"
          >
            {{ featured.description }}
          </p>
          <span class="mt-3 text-[10px] text-muted-foreground/70">{{
            formatDate(featured.pubDate)
          }}</span>
        </div>
      </a>

      <!-- Article Grid -->
      <div
        v-if="rest.length > 0"
        class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
      >
        <a
          v-for="article in rest"
          :key="article.link"
          :href="article.link"
          target="_blank"
          rel="noopener noreferrer"
          class="group overflow-hidden rounded-xl border bg-card transition-all hover:shadow-md"
        >
          <div v-if="article.image" class="overflow-hidden">
            <NuxtImg
              :src="article.image"
              :alt="article.title"
              class="h-36 w-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
          </div>
          <div class="flex flex-col gap-2 p-4">
            <div class="flex items-center gap-2">
              <span
                v-if="categoryLabel(article.link)"
                class="rounded-md bg-primary/10 px-2 py-0.5 text-[10px] font-medium text-primary"
              >
                {{ categoryLabel(article.link) }}
              </span>
            </div>
            <h2
              class="line-clamp-2 text-sm font-semibold leading-snug group-hover:text-primary"
            >
              {{ article.title }}
            </h2>
            <p
              v-if="article.description"
              class="line-clamp-2 text-xs text-muted-foreground"
            >
              {{ article.description }}
            </p>
            <div
              class="flex items-center gap-2 text-[10px] text-muted-foreground/70"
            >
              <Icon name="lucide:clock" class="h-3 w-3" />
              <span>{{ formatDate(article.pubDate) }}</span>
            </div>
          </div>
        </a>
      </div>

      <div v-else class="py-16 text-center text-sm text-muted-foreground">
        No articles available at this time.
      </div>
    </template>
  </div>
</template>
