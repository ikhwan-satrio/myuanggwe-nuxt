<script setup lang="ts">
import type { DateRange } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { useMediaQuery } from "@vueuse/core";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RangeCalendar } from "@/components/ui/range-calendar";
import { cn } from "@/lib/utils";

interface Props {
  class?: HTMLAttributes["class"];
  modelValue?: { start: Date | null; end: Date | null };
}

const props = defineProps<Props>();
const emit = defineEmits<{
  "update:modelValue": [{ start: Date | null; end: Date | null }];
}>();
const isUpdatingFromParent = ref(false);

const isDesktop = useMediaQuery("(min-width: 640px)");
const numberOfMonths = computed(() => (isDesktop.value ? 2 : 1));

const nowDate = today(getLocalTimeZone());

const defaultRange: DateRange = {
  start: nowDate.subtract({ months: 1 }),
  end: nowDate,
};

const dateRange = ref<DateRange>({ ...defaultRange });

function toCalendarDate(d: Date | null): CalendarDate | undefined {
  if (!d) return undefined;
  return new CalendarDate(
    d.getFullYear(),
    d.getMonth() + 1,
    d.getDate(),
  ) as unknown as CalendarDate; // ✅ bypass private field mismatch
}

function toJSDate(cd: CalendarDate | undefined): Date | null {
  if (!cd) return null;
  return cd.toDate(getLocalTimeZone());
}

watch(
  dateRange,
  (range) => {
    if (isUpdatingFromParent.value) return; // ✅ skip kalau update dari parent
    emit("update:modelValue", {
      start: toJSDate(range.start),
      end: toJSDate(range.end),
    });
  },
  { deep: true },
);

watch(
  () => props.modelValue,
  (val) => {
    isUpdatingFromParent.value = true;
    if (!val?.start && !val?.end) {
      nextTick(() => {
        isUpdatingFromParent.value = false;
      });
      return;
    }
    dateRange.value = {
      start: toCalendarDate(val.start) ?? undefined,
      end: toCalendarDate(val.end) ?? undefined,
    };
    nextTick(() => {
      isUpdatingFromParent.value = false;
    });
  },
  { deep: true, immediate: true },
);

const displayText = computed(() => {
  const s = dateRange.value?.start;
  const e = dateRange.value?.end;
  if (!s || !e) return "Pilih tanggal";
  const fmt = (d: CalendarDate) => {
    const js = d.toDate(getLocalTimeZone());
    return js.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  return `${fmt(s)} — ${fmt(e)}`;
});
</script>

<template>
  <Popover>
    <PopoverTrigger as-child>
      <UiButton
        variant="outline"
        :class="
          cn(
            'w-full justify-start text-left font-normal truncate',
            !modelValue?.start && 'text-muted-foreground',
            props.class,
          )
        "
      >
        <Icon name="lucide:calendar" class="mr-2 h-4 w-4 shrink-0" />
        <span class="truncate">{{ displayText }}</span>
      </UiButton>
    </PopoverTrigger>
    <PopoverContent class="w-auto min-w-0 p-0" align="start">
      <RangeCalendar v-model="dateRange" :number-of-months="numberOfMonths" />
    </PopoverContent>
  </Popover>
</template>
