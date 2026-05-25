<script setup lang="ts">
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "motion-v";
import { Badge } from "@/components/ui/badge";

useHead({
  title: "MyUangGwe — Kelola Keuangan, Hidup Lebih Tenang",
  link: [
    { rel: "preconnect", href: "https://fonts.googleapis.com" },
    { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap",
    },
  ],
});

const { scrollYProgress } = useScroll();
const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.92]);
const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

const features = [
  {
    icon: "💳",
    title: "Multi-Wallet",
    desc: "Kelola semua dompet, rekening bank, dan e-wallet dalam satu tempat.",
    color:
      "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    border: "border-emerald-100 dark:border-emerald-900/40",
  },
  {
    icon: "📊",
    title: "Anggaran Cerdas",
    desc: "Set batas pengeluaran per kategori dan pantau secara real-time.",
    color:
      "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    border: "border-blue-100 dark:border-blue-900/40",
  },
  {
    icon: "🔄",
    title: "Transaksi Rutin",
    desc: "Otomatisasi pencatatan tagihan dan langganan berulang.",
    color:
      "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
    border: "border-violet-100 dark:border-violet-900/40",
  },
  {
    icon: "🎯",
    title: "Target Menabung",
    desc: "Tetapkan tujuan finansial dan lacak progres menabung kamu.",
    color:
      "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    border: "border-amber-100 dark:border-amber-900/40",
  },
  {
    icon: "🏢",
    title: "Mode Organisasi",
    desc: "Kelola keuangan tim atau bisnis kecilmu bersama-sama.",
    color: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
    border: "border-rose-100 dark:border-rose-900/40",
  },
  {
    icon: "💱",
    title: "Multi Mata Uang",
    desc: "Dukungan berbagai mata uang dengan konversi kurs real-time.",
    color: "from-cyan-50 to-sky-50 dark:from-cyan-950/30 dark:to-sky-950/30",
    border: "border-cyan-100 dark:border-cyan-900/40",
  },
];

const stats = [
  { value: "100%", label: "Gratis" },
  { value: "6+", label: "Fitur Utama" },
  { value: "∞", label: "Transaksi" },
  { value: "🔒", label: "Aman & Privat" },
];

const faqs = [
  {
    q: "Apakah MyUangGwe gratis?",
    a: "Ya, sepenuhnya gratis. Tidak ada biaya tersembunyi atau langganan.",
  },
  {
    q: "Apakah data saya aman?",
    a: "Data tersimpan aman dengan enkripsi. Kami tidak pernah menjual data kamu.",
  },
  {
    q: "Bisakah saya pakai untuk bisnis?",
    a: "Bisa! Mode organisasi memungkinkan manajemen keuangan tim bersama.",
  },
  {
    q: "Apakah tersedia di mobile?",
    a: "Saat ini berbasis web responsif. Aplikasi mobile sedang dalam pengembangan.",
  },
];

const openFaq = ref<number | null>(null);

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: any = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
};
</script>

<template>
  <div
    class="min-h-screen bg-[#FAFAF8] dark:bg-[#0C0C0A] font-sans overflow-x-hidden"
    style="font-family: &quot;DM Sans&quot;, sans-serif"
  >
    <!-- HERO -->
    <section
      class="relative min-h-screen flex flex-col items-center justify-center pt-20 px-6 overflow-hidden"
    >
      <!-- Background blobs -->
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-emerald-200/30 dark:bg-emerald-900/20 blur-3xl"
        ></div>
        <div
          class="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-amber-200/30 dark:bg-amber-900/20 blur-3xl"
        ></div>
        <div
          class="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full bg-blue-200/20 dark:bg-blue-900/15 blur-3xl"
        ></div>
      </div>

      <!-- Grid texture -->
      <div
        class="absolute inset-0 pointer-events-none"
        style="
          background-image: radial-gradient(
            circle,
            #d6d3d1 1px,
            transparent 1px
          );
          background-size: 32px 32px;
          opacity: 0.3;
        "
      ></div>

      <motion.div
        :style="{ scale: heroScale, opacity: heroOpacity }"
        class="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.5, delay: 0.1 }"
        >
          <Badge
            class="mb-6 px-4 py-1.5 text-xs font-medium rounded-full bg-emerald-100 dark:bg-emerald-900/40 text-emerald-700 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800"
          >
            ✦ Selamat datang di era keuangan teratur
          </Badge>
        </motion.div>

        <motion.h1
          :initial="{ opacity: 0, y: 32 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }"
          class="text-5xl md:text-7xl lg:text-8xl font-light text-stone-900 dark:text-stone-100 leading-[1.05] tracking-tight mb-6"
          style="font-family: &quot;Instrument Serif&quot;, serif"
        >
          Uangmu,<br />
          <em
            class="not-italic text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-400"
          >
            Hidupmu
          </em>
        </motion.h1>

        <motion.p
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }"
          class="text-lg md:text-xl text-stone-500 dark:text-stone-400 max-w-xl leading-relaxed mb-10"
        >
          Catat pemasukan, kelola pengeluaran, dan wujudkan target finansialmu —
          semua dalam satu aplikasi yang sederhana dan bebas iklan.
        </motion.p>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.5 }"
          class="flex flex-col sm:flex-row items-center gap-4"
        >
          <NuxtLink to="/auth">
            <motion.button
              :whileHover="{ scale: 1.03 }"
              :whilePress="{ scale: 0.97 }"
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-stone-900 dark:bg-stone-100 text-stone-100 dark:text-stone-900 rounded-full font-medium text-sm hover:bg-stone-700 dark:hover:bg-stone-200 transition-colors shadow-lg shadow-stone-900/10"
            >
              Mulai Gratis Sekarang
              <span class="text-base">→</span>
            </motion.button>
          </NuxtLink>
          <NuxtLink to="/dashboard">
            <motion.button
              :whileHover="{ scale: 1.03 }"
              :whilePress="{ scale: 0.97 }"
              class="inline-flex items-center gap-2 px-8 py-3.5 bg-white dark:bg-stone-900 text-stone-700 dark:text-stone-300 rounded-full font-medium text-sm border border-stone-200 dark:border-stone-800 hover:border-stone-300 dark:hover:border-stone-700 transition-colors"
            >
              Lihat Demo
              <span>↗</span>
            </motion.button>
          </NuxtLink>
        </motion.div>

        <!-- Stats -->
        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.65 }"
          class="mt-16 grid grid-cols-4 gap-8 md:gap-16"
        >
          <div
            v-for="stat in stats"
            :key="stat.label"
            class="flex flex-col items-center gap-1"
          >
            <span
              class="text-2xl md:text-3xl font-semibold text-stone-900 dark:text-stone-100"
              style="font-family: &quot;Instrument Serif&quot;, serif"
            >
              {{ stat.value }}
            </span>
            <span
              class="text-xs text-stone-400 dark:text-stone-500 whitespace-nowrap"
              >{{ stat.label }}</span
            >
          </div>
        </motion.div>
      </motion.div>

      <!-- Scroll indicator -->
      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 1.2 }"
        class="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 dark:text-stone-600"
      >
        <span class="text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          :animate="{ y: [0, 6, 0] }"
          :transition="{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"
          class="w-0.5 h-6 bg-gradient-to-b from-stone-400 to-transparent dark:from-stone-600"
        />
      </motion.div>
    </section>

    <!-- DASHBOARD PREVIEW -->
    <section class="px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <motion.div
        :initial="{ opacity: 0, y: 48 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
        :viewport="{ once: true, margin: '-100px' }"
        class="relative rounded-3xl overflow-hidden border border-stone-200 dark:border-stone-800 shadow-2xl shadow-stone-200/50 dark:shadow-black/40 bg-white dark:bg-stone-950"
      >
        <!-- Fake browser chrome -->
        <div
          class="flex items-center gap-2 px-4 py-3 bg-stone-100/80 dark:bg-stone-900/80 border-b border-stone-200 dark:border-stone-800"
        >
          <div class="w-3 h-3 rounded-full bg-red-400"></div>
          <div class="w-3 h-3 rounded-full bg-amber-400"></div>
          <div class="w-3 h-3 rounded-full bg-green-400"></div>
          <div
            class="mx-auto flex items-center gap-2 text-xs text-stone-400 dark:text-stone-500 bg-stone-200/60 dark:bg-stone-800/60 rounded-full px-4 py-1"
          >
            <span>🔒</span>
            <span>myuanggwe.app/dashboard</span>
          </div>
        </div>

        <!-- Mock dashboard -->
        <div
          class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4 bg-gradient-to-br from-stone-50 to-stone-100/50 dark:from-stone-950 dark:to-stone-900/50"
        >
          <!-- Balance card -->
          <div
            class="md:col-span-1 rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-400 p-6 text-white"
          >
            <p class="text-emerald-100 text-sm mb-1">Total Saldo</p>
            <p
              class="text-3xl font-semibold mb-4"
              style="font-family: &quot;Instrument Serif&quot;, serif"
            >
              Rp 12.450.000
            </p>
            <div class="flex gap-4 text-xs">
              <div>
                <p class="text-emerald-200">Pemasukan</p>
                <p class="font-medium">+Rp 8.000.000</p>
              </div>
              <div>
                <p class="text-emerald-200">Pengeluaran</p>
                <p class="font-medium">-Rp 3.200.000</p>
              </div>
            </div>
          </div>

          <!-- Recent transactions -->
          <div
            class="md:col-span-2 rounded-2xl bg-white dark:bg-stone-900 p-5 border border-stone-100 dark:border-stone-800"
          >
            <p
              class="text-sm font-medium text-stone-700 dark:text-stone-300 mb-4"
            >
              Transaksi Terbaru
            </p>
            <div class="space-y-3">
              <div
                v-for="(tx, i) in [
                  {
                    icon: '🍜',
                    name: 'Makan Siang',
                    cat: 'Makanan',
                    amount: '-Rp 35.000',
                    color: 'text-red-500',
                  },
                  {
                    icon: '💼',
                    name: 'Gaji Bulanan',
                    cat: 'Pendapatan',
                    amount: '+Rp 8.000.000',
                    color: 'text-emerald-500',
                  },
                  {
                    icon: '⚡',
                    name: 'Bayar Listrik',
                    cat: 'Tagihan',
                    amount: '-Rp 250.000',
                    color: 'text-red-500',
                  },
                ]"
                :key="i"
                class="flex items-center justify-between py-2 border-b border-stone-50 dark:border-stone-800/50 last:border-0"
              >
                <div class="flex items-center gap-3">
                  <span class="text-xl">{{ tx.icon }}</span>
                  <div>
                    <p
                      class="text-sm font-medium text-stone-800 dark:text-stone-200"
                    >
                      {{ tx.name }}
                    </p>
                    <p class="text-xs text-stone-400">{{ tx.cat }}</p>
                  </div>
                </div>
                <span class="text-sm font-semibold" :class="tx.color">{{
                  tx.amount
                }}</span>
              </div>
            </div>
          </div>

          <!-- Budget bars -->
          <div
            class="md:col-span-3 rounded-2xl bg-white dark:bg-stone-900 p-5 border border-stone-100 dark:border-stone-800"
          >
            <p
              class="text-sm font-medium text-stone-700 dark:text-stone-300 mb-4"
            >
              Anggaran Bulan Ini
            </p>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div
                v-for="budget in [
                  { name: 'Makanan', used: 65, color: 'bg-emerald-400' },
                  { name: 'Transportasi', used: 40, color: 'bg-blue-400' },
                  { name: 'Hiburan', used: 85, color: 'bg-amber-400' },
                ]"
                :key="budget.name"
                class="space-y-2"
              >
                <div class="flex justify-between text-xs">
                  <span class="text-stone-600 dark:text-stone-400">{{
                    budget.name
                  }}</span>
                  <span class="text-stone-500">{{ budget.used }}%</span>
                </div>
                <div
                  class="h-2 rounded-full bg-stone-100 dark:bg-stone-800 overflow-hidden"
                >
                  <div
                    class="h-full rounded-full transition-all"
                    :class="budget.color"
                    :style="{ width: budget.used + '%' }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>

    <!-- FEATURES -->
    <section id="fitur" class="px-6 md:px-12 py-24 max-w-6xl mx-auto">
      <motion.div
        :initial="{ opacity: 0, y: 24 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
        class="text-center mb-16"
      >
        <Badge
          class="mb-4 px-4 py-1.5 text-xs rounded-full bg-stone-100 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border-stone-200 dark:border-stone-800"
        >
          Fitur Lengkap
        </Badge>
        <h2
          class="text-4xl md:text-5xl text-stone-900 dark:text-stone-100 font-light leading-tight"
          style="font-family: &quot;Instrument Serif&quot;, serif"
        >
          Semua yang kamu butuhkan,<br />
          <em class="not-italic text-stone-400 dark:text-stone-500"
            >tidak lebih, tidak kurang.</em
          >
        </h2>
      </motion.div>

      <motion.div
        :variants="containerVariants"
        initial="hidden"
        :whileInView="'visible'"
        :viewport="{ once: true, margin: '-80px' }"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        <motion.div
          v-for="feature in features"
          :key="feature.title"
          :variants="itemVariants"
          :whileHover="{ y: -4, transition: { duration: 0.2 } }"
          class="group rounded-2xl p-6 border transition-shadow hover:shadow-lg cursor-default"
          :class="[feature.color, feature.border]"
        >
          <span class="text-3xl mb-4 block">{{ feature.icon }}</span>
          <h3
            class="text-base font-semibold text-stone-900 dark:text-stone-100 mb-2"
          >
            {{ feature.title }}
          </h3>
          <p class="text-sm text-stone-500 dark:text-stone-400 leading-relaxed">
            {{ feature.desc }}
          </p>
        </motion.div>
      </motion.div>
    </section>

    <!-- HOW IT WORKS -->
    <section
      id="cara-kerja"
      class="px-6 md:px-12 py-24 bg-stone-900 dark:bg-stone-950"
    >
      <div class="max-w-4xl mx-auto">
        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          :viewport="{ once: true }"
          class="text-center mb-16"
        >
          <Badge
            class="mb-4 px-4 py-1.5 text-xs rounded-full bg-stone-800 text-stone-400 border-stone-700"
          >
            Cara Kerja
          </Badge>
          <h2
            class="text-4xl md:text-5xl text-stone-100 font-light leading-tight"
            style="font-family: &quot;Instrument Serif&quot;, serif"
          >
            Tiga langkah menuju<br />
            <em class="not-italic text-emerald-400">keuangan yang sehat</em>
          </h2>
        </motion.div>

        <div class="space-y-6">
          <motion.div
            v-for="(step, i) in [
              {
                num: '01',
                title: 'Buat Akun',
                desc: 'Daftar gratis dalam hitungan detik. Tidak perlu kartu kredit.',
              },
              {
                num: '02',
                title: 'Tambah Dompet & Kategori',
                desc: 'Sambungkan rekening, atur kategori sesuai gaya hidupmu.',
              },
              {
                num: '03',
                title: 'Catat & Analisis',
                desc: 'Mulai catat transaksi dan biarkan dashboard bekerja untukmu.',
              },
            ]"
            :key="step.num"
            :initial="{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{
              duration: 0.6,
              delay: i * 0.1,
              ease: [0.22, 1, 0.36, 1],
            }"
            :viewport="{ once: true }"
            :whileHover="{ x: 8, transition: { duration: 0.2 } }"
            class="flex items-start gap-6 p-6 rounded-2xl border border-stone-800 hover:border-stone-700 transition-colors cursor-default group"
          >
            <span
              class="text-4xl font-light text-stone-700 group-hover:text-emerald-500 transition-colors shrink-0"
              style="font-family: &quot;Instrument Serif&quot;, serif"
            >
              {{ step.num }}
            </span>
            <div>
              <h3 class="text-lg font-medium text-stone-100 mb-1">
                {{ step.title }}
              </h3>
              <p class="text-stone-400 text-sm leading-relaxed">
                {{ step.desc }}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- CTA BAND -->
    <section class="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
        :viewport="{ once: true }"
        class="relative rounded-3xl overflow-hidden bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 p-12 md:p-16"
      >
        <div
          class="absolute inset-0 pointer-events-none"
          style="
            background-image:
              radial-gradient(
                circle at 20% 50%,
                rgba(255, 255, 255, 0.1) 0%,
                transparent 60%
              ),
              radial-gradient(
                circle at 80% 20%,
                rgba(255, 255, 255, 0.08) 0%,
                transparent 50%
              );
          "
        ></div>
        <div class="relative z-10">
          <h2
            class="text-4xl md:text-5xl text-white font-light mb-4"
            style="font-family: &quot;Instrument Serif&quot;, serif"
          >
            Mulai hari ini.<br />
            <em class="not-italic opacity-80">Gratis selamanya.</em>
          </h2>
          <p class="text-emerald-100 mb-8 text-lg max-w-md mx-auto">
            Bergabung dan rasakan perbedaan mengelola keuangan dengan benar.
          </p>
          <NuxtLink to="/auth">
            <motion.button
              :whileHover="{ scale: 1.04, backgroundColor: '#f5f5f4' }"
              :whilePress="{ scale: 0.96 }"
              class="inline-flex items-center gap-2 px-10 py-4 bg-white text-emerald-700 rounded-full font-semibold text-sm shadow-xl transition-colors"
            >
              Buat Akun Gratis
              <span class="text-base">→</span>
            </motion.button>
          </NuxtLink>
        </div>
      </motion.div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="px-6 md:px-12 py-24 max-w-2xl mx-auto">
      <motion.div
        :initial="{ opacity: 0, y: 24 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
        class="text-center mb-12"
      >
        <h2
          class="text-4xl text-stone-900 dark:text-stone-100 font-light"
          style="font-family: &quot;Instrument Serif&quot;, serif"
        >
          Pertanyaan Umum
        </h2>
      </motion.div>

      <div class="space-y-3">
        <motion.div
          v-for="(faq, i) in faqs"
          :key="i"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: i * 0.08 }"
          :viewport="{ once: true }"
          class="rounded-xl border border-stone-200 dark:border-stone-800 overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between p-5 text-left bg-white dark:bg-stone-900 hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-colors"
            @click="openFaq = openFaq === i ? null : i"
          >
            <span
              class="font-medium text-stone-800 dark:text-stone-200 text-sm"
              >{{ faq.q }}</span
            >
            <motion.span
              :animate="{ rotate: openFaq === i ? 45 : 0 }"
              :transition="{ duration: 0.2 }"
              class="text-stone-400 text-lg shrink-0 ml-4"
              >+</motion.span
            >
          </button>
          <AnimatePresence>
            <motion.div
              v-if="openFaq === i"
              :key="'faq-' + i"
              :initial="{ height: 0, opacity: 0 }"
              :animate="{ height: 'auto', opacity: 1 }"
              :exit="{ height: 0, opacity: 0 }"
              :transition="{ duration: 0.25, ease: 'easeInOut' }"
              class="overflow-hidden"
            >
              <p
                class="px-5 pb-5 text-sm text-stone-500 dark:text-stone-400 leading-relaxed"
              >
                {{ faq.a }}
              </p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer
      class="border-t border-stone-200 dark:border-stone-800 px-6 md:px-12 py-10"
    >
      <div
        class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"
      >
        <div class="flex items-center gap-2">
          <span class="text-xl">💰</span>
          <span
            class="font-medium text-stone-700 dark:text-stone-300"
            style="font-family: &quot;Instrument Serif&quot;, serif"
          >
            MyUangGwe
          </span>
        </div>
        <p class="text-xs text-stone-400 dark:text-stone-600">
          Dibuat dengan ❤️ untuk keuangan yang lebih baik · ©
          {{ new Date().getFullYear() }}
        </p>
        <div class="flex gap-6 text-xs text-stone-400 dark:text-stone-600">
          <NuxtLink
            to="/privacy"
            class="hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
            >Privasi</NuxtLink
          >
          <NuxtLink
            to="/terms"
            class="hover:text-stone-600 dark:hover:text-stone-400 transition-colors"
            >Ketentuan</NuxtLink
          >
        </div>
      </div>
    </footer>
  </div>
</template>
