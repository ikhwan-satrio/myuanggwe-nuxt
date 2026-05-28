<script setup lang="ts">
import { motion, AnimatePresence, useScroll, useTransform } from "motion-v";

useHead({
  title: "MyUangGwe — Kelola Keuangan dengan Tenang",
  meta: [
    {
      name: "description",
      content:
        "Catat pemasukan, kelola pengeluaran, dan wujudkan target finansialmu dalam satu aplikasi yang sederhana, gratis, dan bebas iklan.",
    },
    {
      name: "keywords",
      content: "aplikasi catat uang harian gratis Indonesia, personal finance tracker tanpa iklan, manajemen keuangan pribadi anak muda, budget planner中小学生, aplikasi amplop digital online, pencatatan pemasukan pengeluaran sederhana, nabung otomatis target menabung, multi-wallet e-wallet bank cash management, expense tracker bahasa Indonesia, free no-ad financial planning tool untuk pemula, dompet digital terintegrasi catatan transaksi, aplikasi ngatur duit anak kost, financial literacy app for Gen Z Indonesia",
    },
  ],
});

const { scrollYProgress } = useScroll();
const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

const features = [
  {
    icon: "wallet",
    title: "Multi-Wallet",
    desc: "Kelola semua dompet, rekening bank, dan e-wallet dalam satu tempat.",
  },
  {
    icon: "piggy-bank",
    title: "Anggaran Cerdas",
    desc: "Set batas pengeluaran per kategori dan pantau secara real-time.",
  },
  {
    icon: "repeat",
    title: "Transaksi Rutin",
    desc: "Otomatisasi pencatatan tagihan dan langganan berulang.",
  },
  {
    icon: "target",
    title: "Target Menabung",
    desc: "Tetapkan tujuan finansial dan lacak progres menabung kamu.",
  },
  {
    icon: "building-2",
    title: "Mode Organisasi",
    desc: "Kelola keuangan tim atau bisnis kecilmu bersama-sama.",
  },
  {
    icon: "globe",
    title: "Multi Mata Uang",
    desc: "Dukungan berbagai mata uang dengan konversi kurs real-time.",
  },
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
</script>

<template>
  <div class="min-h-screen bg-background font-sans overflow-x-hidden">
    <!-- HERO -->
    <section
      class="relative min-h-dvh flex flex-col items-center justify-center px-4 sm:px-6 overflow-hidden"
    >
      <div class="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          class="absolute -top-1/4 -left-1/4 w-[80vmin] h-[80vmin] rounded-full bg-primary/5 blur-3xl"
        />
        <div
          class="absolute top-1/3 -right-1/4 w-[70vmin] h-[70vmin] rounded-full bg-chart-2/10 blur-3xl"
        />
        <div
          class="absolute -bottom-1/4 left-1/3 w-[60vmin] h-[60vmin] rounded-full bg-chart-1/5 blur-3xl"
        />
      </div>

      <div
        class="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]"
        style="background-image: radial-gradient(circle, currentColor 1px, transparent 1px); background-size: 32px 32px;"
      />

      <motion.div
        :style="{ scale: heroScale, opacity: heroOpacity }"
        class="relative z-10 flex flex-col items-center text-center w-full max-w-4xl mx-auto px-2"
      >
        <motion.div
          :initial="{ opacity: 0, scale: 0.8 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ duration: 0.5, delay: 0.1 }"
        >
          <UiBadge
            class="mb-4 sm:mb-6 px-3 sm:px-4 py-1 text-xs font-medium rounded-full"
            variant="secondary"
          >
            <Icon name="lucide:sparkles" class="mr-1.5 h-3 w-3 sm:h-3.5 sm:w-3.5" />
            Selamat datang di era keuangan teratur
          </UiBadge>
        </motion.div>

        <motion.h1
          :initial="{ opacity: 0, y: 32 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }"
          class="text-[clamp(2rem,8vw,5rem)] sm:text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-4 sm:mb-6"
        >
          <span class="sm:hidden">Uangmu, Hidupmu</span>
          <span class="hidden sm:inline">Uangmu,<br /><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2">Hidupmu</span></span>
        </motion.h1>

        <motion.p
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] }"
          class="text-sm sm:text-base md:text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed mb-8 sm:mb-10 px-2"
        >
          Catat pemasukan, kelola pengeluaran, dan wujudkan target finansialmu —
          semua dalam satu aplikasi yang sederhana dan bebas iklan.
        </motion.p>

        <motion.div
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5, delay: 0.5 }"
          class="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 w-full sm:w-auto"
        >
          <UiButton size="lg" class="w-full sm:w-auto" as-child>
            <NuxtLink to="/auth">
              Mulai Gratis Sekarang
              <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
            </NuxtLink>
          </UiButton>
          <UiButton size="lg" variant="outline" class="w-full sm:w-auto" as-child>
            <NuxtLink to="/dashboard">
              Lihat Demo
              <Icon name="lucide:external-link" class="ml-2 h-4 w-4" />
            </NuxtLink>
          </UiButton>
        </motion.div>

        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6, delay: 0.65 }"
          class="mt-10 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-8 md:gap-16 w-full max-w-lg sm:max-w-none"
        >
          <div
            v-for="stat in [
              { value: '100%', label: 'Gratis' },
              { value: '6+', label: 'Fitur Utama' },
              { value: '∞', label: 'Transaksi' },
              { value: '🔒', label: 'Aman & Privat' },
            ]"
            :key="stat.label"
            class="flex flex-col items-center gap-1"
          >
            <span class="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">{{
              stat.value
            }}</span>
            <span class="text-xs text-muted-foreground whitespace-nowrap">{{
              stat.label
            }}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ duration: 1, delay: 1.2 }"
        class="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <span class="text-[10px] sm:text-xs tracking-widest uppercase">scroll</span>
        <motion.div
          :animate="{ y: [0, 6, 0] }"
          :transition="{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }"
          class="w-px h-4 sm:h-6 bg-gradient-to-b from-muted-foreground to-transparent"
        />
      </motion.div>
    </section>

    <!-- DASHBOARD PREVIEW -->
    <section class="px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
      <motion.div
        :initial="{ opacity: 0, y: 48 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }"
        :viewport="{ once: true, margin: '-100px' }"
        class="relative rounded-xl overflow-hidden border border-border shadow-2xl bg-card"
      >
        <div class="hidden sm:flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
          <div class="h-3 w-3 rounded-full bg-destructive/70" />
          <div class="h-3 w-3 rounded-full bg-chart-3/70" />
          <div class="h-3 w-3 rounded-full bg-chart-2/70" />
          <div class="mx-auto flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-full px-4 py-1">
            <Icon name="lucide:lock" class="h-3 w-3" />
            <span>myuanggwe.app/dashboard</span>
          </div>
        </div>

        <div class="p-3 sm:p-4 md:p-6 lg:p-8 grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
          <UiCard class="sm:col-span-1 bg-gradient-to-br from-primary to-chart-2 text-primary-foreground border-0">
            <UiCardHeader class="pb-2 px-3 sm:px-6 pt-3 sm:pt-6">
              <UiCardTitle class="text-xs sm:text-sm font-medium text-primary-foreground/80">Total Saldo</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="px-3 sm:px-6 pb-3 sm:pb-6">
              <p class="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Rp 12.450.000</p>
              <div class="flex flex-col xs:flex-row gap-2 sm:gap-4 text-xs">
                <div>
                  <p class="text-primary-foreground/70">Pemasukan</p>
                  <p class="font-semibold">+Rp 8.000.000</p>
                </div>
                <div>
                  <p class="text-primary-foreground/70">Pengeluaran</p>
                  <p class="font-semibold">-Rp 3.200.000</p>
                </div>
              </div>
            </UiCardContent>
          </UiCard>

          <UiCard class="sm:col-span-2">
            <UiCardHeader class="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
              <UiCardTitle class="text-xs sm:text-sm font-medium">Transaksi Terbaru</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="px-3 sm:px-6 pb-3 sm:pb-6 space-y-1 sm:space-y-3">
              <div
                v-for="tx in [
                  { icon: '🍜', name: 'Makan Siang', cat: 'Makanan', amount: '-Rp 35.000', income: false },
                  { icon: '💼', name: 'Gaji Bulanan', cat: 'Pendapatan', amount: '+Rp 8.000.000', income: true },
                  { icon: '⚡', name: 'Bayar Listrik', cat: 'Tagihan', amount: '-Rp 250.000', income: false },
                ]"
                :key="tx.name"
                class="flex items-center justify-between py-1.5 sm:py-2 border-b last:border-0 border-border"
              >
                <div class="flex items-center gap-2 sm:gap-3 min-w-0">
                  <span class="text-base sm:text-xl shrink-0">{{ tx.icon }}</span>
                  <div class="min-w-0">
                    <p class="text-xs sm:text-sm font-medium text-foreground truncate">{{ tx.name }}</p>
                    <p class="text-[10px] sm:text-xs text-muted-foreground truncate">{{ tx.cat }}</p>
                  </div>
                </div>
                <span
                  class="text-xs sm:text-sm font-semibold shrink-0 ml-2"
                  :class="tx.income ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'"
                >{{ tx.amount }}</span>
              </div>
            </UiCardContent>
          </UiCard>

          <UiCard class="sm:col-span-3">
            <UiCardHeader class="pb-2 sm:pb-3 px-3 sm:px-6 pt-3 sm:pt-6">
              <UiCardTitle class="text-xs sm:text-sm font-medium">Anggaran Bulan Ini</UiCardTitle>
            </UiCardHeader>
            <UiCardContent class="px-3 sm:px-6 pb-3 sm:pb-6 grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              <div v-for="budget in [{ name: 'Makanan', used: 65 }, { name: 'Transportasi', used: 40 }, { name: 'Hiburan', used: 85 }]" :key="budget.name" class="space-y-1.5 sm:space-y-2">
                <div class="flex justify-between text-[10px] sm:text-xs">
                  <span class="text-muted-foreground">{{ budget.name }}</span>
                  <span class="text-muted-foreground">{{ budget.used }}%</span>
                </div>
                <div class="h-1.5 sm:h-2 rounded-full bg-muted overflow-hidden">
                  <div class="h-full rounded-full bg-primary transition-all" :style="{ width: budget.used + '%' }" />
                </div>
              </div>
            </UiCardContent>
          </UiCard>
        </div>
      </motion.div>
    </section>

    <!-- FEATURES -->
    <section id="fitur" class="px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-6xl mx-auto">
      <motion.div
        :initial="{ opacity: 0, y: 24 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
        class="text-center mb-10 sm:mb-16"
      >
        <UiBadge class="mb-3 sm:mb-4 px-3 sm:px-4 py-1 text-xs rounded-full" variant="outline">Fitur Lengkap</UiBadge>
        <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight px-2">
          Semua yang kamu butuhkan,<br class="hidden xs:inline" />
          <span class="text-muted-foreground">tidak lebih, tidak kurang.</span>
        </h2>
      </motion.div>

      <div class="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
        <motion.div
          v-for="feature in features"
          :key="feature.title"
          :initial="{ opacity: 0, y: 24 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5 }"
          :viewport="{ once: true }"
          :whileHover="{ y: -4, transition: { duration: 0.2 } }"
          class="group rounded-xl border border-border bg-card p-4 sm:p-5 md:p-6 transition-shadow hover:shadow-lg cursor-default"
        >
          <div class="mb-3 sm:mb-4 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon :name="`lucide:${feature.icon}`" class="h-4 w-4 sm:h-5 sm:w-5" />
          </div>
          <h3 class="text-sm sm:text-base font-semibold text-foreground mb-1 sm:mb-2">{{ feature.title }}</h3>
          <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">{{ feature.desc }}</p>
        </motion.div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section id="cara-kerja" class="px-4 sm:px-6 md:px-12 py-16 sm:py-24 bg-muted/50">
      <div class="max-w-4xl mx-auto">
        <motion.div
          :initial="{ opacity: 0, y: 24 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.6 }"
          :viewport="{ once: true }"
          class="text-center mb-10 sm:mb-16"
        >
          <UiBadge class="mb-3 sm:mb-4 px-3 sm:px-4 py-1 text-xs rounded-full" variant="outline">Cara Kerja</UiBadge>
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight px-2">
            Tiga langkah menuju<br />
            <span class="text-primary">keuangan yang sehat</span>
          </h2>
        </motion.div>

        <div class="space-y-4 sm:space-y-6">
          <motion.div
            v-for="(step, i) in [
              { num: '01', title: 'Buat Akun', desc: 'Daftar gratis dalam hitungan detik. Tidak perlu kartu kredit.' },
              { num: '02', title: 'Tambah Dompet & Kategori', desc: 'Sambungkan rekening, atur kategori sesuai gaya hidupmu.' },
              { num: '03', title: 'Catat & Analisis', desc: 'Mulai catat transaksi dan biarkan dashboard bekerja untukmu.' },
            ]"
            :key="step.num"
            :initial="{ opacity: 0, x: i % 2 === 0 ? -32 : 32 }"
            :whileInView="{ opacity: 1, x: 0 }"
            :transition="{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }"
            :viewport="{ once: true }"
            :whileHover="{ x: 4, sm: { x: 8 }, transition: { duration: 0.2 } }"
            class="flex items-start gap-4 sm:gap-6 rounded-xl border border-border bg-card p-4 sm:p-5 md:p-6 hover:border-primary/30 transition-colors cursor-default group"
          >
            <span class="text-2xl sm:text-3xl md:text-4xl font-bold text-muted-foreground group-hover:text-primary transition-colors shrink-0 leading-none">
              {{ step.num }}
            </span>
            <div class="min-w-0">
              <h3 class="text-sm sm:text-base md:text-lg font-semibold text-foreground mb-0.5 sm:mb-1">{{ step.title }}</h3>
              <p class="text-xs sm:text-sm text-muted-foreground leading-relaxed">{{ step.desc }}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-4xl mx-auto text-center">
      <motion.div
        :initial="{ opacity: 0, scale: 0.95 }"
        :whileInView="{ opacity: 1, scale: 1 }"
        :transition="{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }"
        :viewport="{ once: true }"
        class="relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-chart-2 p-6 sm:p-8 md:p-12 lg:p-16"
      >
        <div
          class="absolute inset-0 pointer-events-none"
          style="background-image: radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%);"
        />
        <div class="relative z-10">
          <h2 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-3 sm:mb-4">
            Mulai hari ini.<br />
            <span class="opacity-80">Gratis selamanya.</span>
          </h2>
          <p class="text-sm sm:text-base md:text-lg text-primary-foreground/80 mb-6 sm:mb-8 max-w-md mx-auto px-2">
            Bergabung dan rasakan perbedaan mengelola keuangan dengan benar.
          </p>
          <UiButton size="lg" variant="secondary" class="w-full sm:w-auto" as-child>
            <NuxtLink to="/auth">
              Buat Akun Gratis
              <Icon name="lucide:arrow-right" class="ml-2 h-4 w-4" />
            </NuxtLink>
          </UiButton>
        </div>
      </motion.div>
    </section>

    <!-- FAQ -->
    <section id="faq" class="px-4 sm:px-6 md:px-12 py-16 sm:py-24 max-w-2xl mx-auto">
      <motion.div
        :initial="{ opacity: 0, y: 24 }"
        :whileInView="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6 }"
        :viewport="{ once: true }"
        class="text-center mb-8 sm:mb-12"
      >
        <h2 class="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground">Pertanyaan Umum</h2>
      </motion.div>

      <div class="space-y-2 sm:space-y-3">
        <motion.div
          v-for="(faq, i) in faqs"
          :key="i"
          :initial="{ opacity: 0, y: 16 }"
          :whileInView="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.4, delay: i * 0.08 }"
          :viewport="{ once: true }"
          class="rounded-xl border border-border overflow-hidden"
        >
          <button
            class="w-full flex items-center justify-between p-3 sm:p-4 md:p-5 text-left bg-card hover:bg-muted/50 transition-colors gap-2"
            @click="openFaq = openFaq === i ? null : i"
          >
            <span class="text-xs sm:text-sm font-medium text-foreground">{{ faq.q }}</span>
            <motion.span
              :animate="{ rotate: openFaq === i ? 45 : 0 }"
              :transition="{ duration: 0.2 }"
              class="text-muted-foreground text-base sm:text-lg shrink-0"
            >+</motion.span>
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
              <p class="px-3 sm:px-4 md:px-5 pb-3 sm:pb-4 md:pb-5 text-xs sm:text-sm text-muted-foreground leading-relaxed">{{ faq.a }}</p>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>

    <!-- FOOTER -->
    <footer class="border-t border-border px-4 sm:px-6 md:px-12 py-8 sm:py-10">
      <div class="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 text-center sm:text-left">
        <div class="flex items-center gap-2">
          <NuxtImg src="/favicon.png" width="20" class="w-5 sm:w-6" />
          <span class="text-sm sm:text-base font-bold text-foreground">MyUangGwe</span>
        </div>
        <p class="text-[10px] sm:text-xs text-muted-foreground order-last sm:order-none">
          Dibuat dengan ❤️ untuk keuangan yang lebih baik · &copy; {{ new Date().getFullYear() }}
        </p>
        <div class="flex gap-4 sm:gap-6 text-xs text-muted-foreground">
          <NuxtLink to="/privacy" class="hover:text-foreground transition-colors">Privasi</NuxtLink>
          <NuxtLink to="/terms" class="hover:text-foreground transition-colors">Ketentuan</NuxtLink>
        </div>
      </div>
    </footer>
  </div>
</template>
