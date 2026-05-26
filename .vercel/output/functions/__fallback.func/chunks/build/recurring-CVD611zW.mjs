import { f as _sfc_main$9, _ as _sfc_main$3, e as _sfc_main$6, b as _sfc_main$3$1, a as _sfc_main$1$1 } from './DialogTrigger-Bsj6TWLg.mjs';
import { D as useNuxtApp, B as useHead, A as useAsyncData, c as _sfc_main$X, a as __nuxt_component_1$1, b as _sfc_main$H, d as _sfc_main$19, e as _sfc_main$10, f as _sfc_main$$, g as _sfc_main$18, h as _sfc_main$16, n as _sfc_main$1a, o as _sfc_main$i, p as _sfc_main$5$1, q as _sfc_main$g, r as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$4 } from './Label-DoBiuCH1.mjs';
import { defineComponent, computed, mergeProps, unref, ref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { useMutation } from '@vue/apollo-composable';
import { toast } from 'vue-sonner';
import { useForm } from '@tanstack/vue-form';
import { type } from 'arktype';
import { defineStore } from 'pinia';
import { m as GET_RECURRING_TRANSACTIONS, o as GET_WALLETS, k as GET_CATEGORIES, h as DELETE_RECURRING_TRANSACTION, c as CREATE_RECURRING_TRANSACTION } from './useGqlSchema-B7rdXc-g.mjs';
import { _ as _sfc_main$5 } from './index-dZMOOFG9.mjs';
import { f as formatDate } from './useTimeStamps-Cdn7G1h2.mjs';
import { u as useCurrency } from './useCurrency-CzQKYynb.mjs';
import 'reka-ui';
import '@lucide/vue';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'lru-cache';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'vue-router';
import '@iconify/utils';
import 'consola';
import 'xss';
import '@tanstack/vue-query';
import 'perfect-debounce';
import '@vue/shared';
import '@iconify/vue';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'clsx';
import 'tailwind-merge';
import '@iconify/utils/lib/css/icon';
import 'class-variance-authority';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'graphql-tag';

const recurringTransactionSchema = type({
  amount: "number > 0",
  type: '"income" | "expense" | "transfer"',
  frequency: '"daily" | "weekly" | "monthly" | "yearly"',
  startDate: "string > 0",
  walletId: "string > 0",
  "toWalletId?": "string | null",
  "categoryId?": "string | null",
  "description?": "string | null"
});
const useRecurringCrudStore = defineStore("crud-recurring", () => {
  const createOpen = ref(false);
  function openCreate() {
    createOpen.value = true;
  }
  function closeCreate() {
    createOpen.value = false;
  }
  return { createOpen, openCreate, closeCreate };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  props: {
    wallets: {},
    categories: {}
  },
  emits: ["created"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const store = useRecurringCrudStore();
    const emit = __emit;
    const { mutate: createMutate } = useMutation(CREATE_RECURRING_TRANSACTION);
    const frequencyOptions = [
      { value: "daily", label: "Harian" },
      { value: "weekly", label: "Mingguan" },
      { value: "monthly", label: "Bulanan" },
      { value: "yearly", label: "Tahunan" }
    ];
    const typeOptions = [
      { value: "income", label: "Pemasukan" },
      { value: "expense", label: "Pengeluaran" },
      { value: "transfer", label: "Transfer" }
    ];
    const createForm = useForm({
      defaultValues: {
        amount: 0,
        type: "expense",
        frequency: "monthly",
        startDate: "",
        walletId: "",
        toWalletId: null,
        categoryId: null,
        description: null
      },
      validators: {
        onChange: recurringTransactionSchema,
        onSubmit: recurringTransactionSchema
      },
      onSubmit: async ({ value }) => {
        try {
          await createMutate({
            input: { ...value, startDate: new Date(value.startDate).toISOString() }
          });
          toast.success("Transaksi rutin berhasil dibuat");
          store.closeCreate();
          createForm.reset();
          emit("created");
        } catch {
          toast.error("Terjadi kesalahan");
        }
      }
    });
    const createFormValues = createForm.useStore((s) => s.values);
    const selectedWallet = computed(
      () => props.wallets.find((w) => w.id === createFormValues.value.walletId)?.name ?? "Pilih Dompet"
    );
    const selectedToWallet = computed(
      () => props.wallets.find((w) => w.id === createFormValues.value.toWalletId)?.name ?? "Pilih Dompet Tujuan"
    );
    const selectedCategory = computed(
      () => props.categories.find((c) => c.id === createFormValues.value.categoryId)?.name ?? "Pilih Kategori"
    );
    const filteredCategories = computed(
      () => props.categories.filter((c) => c.type === createFormValues.value.type)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogTrigger = _sfc_main$3;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1$1;
      const _component_UiDialogContent = _sfc_main$6;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$1;
      const _component_UiLabel = _sfc_main$4;
      const _component_UiInput = _sfc_main$H;
      const _component_UiSelect = _sfc_main$19;
      const _component_UiSelectTrigger = _sfc_main$10;
      const _component_UiSelectValue = _sfc_main$$;
      const _component_UiSelectContent = _sfc_main$18;
      const _component_UiSelectItem = _sfc_main$16;
      _push(ssrRenderComponent(_component_UiDialog, mergeProps({
        open: unref(store).createOpen,
        "onUpdate:open": ($event) => unref(store).closeCreate()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogTrigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiButton, {
                    class: "gap-2",
                    onClick: ($event) => unref(store).openCreate()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "lucide:plus",
                          class: "h-4 w-4"
                        }, null, _parent4, _scopeId3));
                        _push4(` Tambah Transaksi Rutin `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "lucide:plus",
                            class: "h-4 w-4"
                          }),
                          createTextVNode(" Tambah Transaksi Rutin ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiButton, {
                      class: "gap-2",
                      onClick: ($event) => unref(store).openCreate()
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "lucide:plus",
                          class: "h-4 w-4"
                        }),
                        createTextVNode(" Tambah Transaksi Rutin ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "max-h-[90vh] overflow-y-auto" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tambah Transaksi Rutin`);
                            } else {
                              return [
                                createTextVNode("Tambah Transaksi Rutin")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Transaksi Rutin")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4 p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "amount" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "amount" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jumlah`);
                            } else {
                              return [
                                createTextVNode("Jumlah")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "amount",
                          type: "number",
                          value: field.state.value,
                          placeholder: "0",
                          min: "0",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(Number(e.target.value))
                        }, null, _parent4, _scopeId3));
                        if (!field.state.meta.isValid) {
                          _push4(`<p class="text-xs text-destructive"${_scopeId3}><!--[-->`);
                          ssrRenderList(field.state.meta.errors, (err, i) => {
                            _push4(`<span class="block"${_scopeId3}>* ${ssrInterpolate(err?.message)}</span>`);
                          });
                          _push4(`<!--]--></p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "amount",
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(Number(e.target.value))
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, "* " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "type" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tipe`);
                            } else {
                              return [
                                createTextVNode("Tipe")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelect, {
                          "model-value": field.state.value,
                          "onUpdate:modelValue": (v) => field.handleChange(v)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiSelectValue, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(typeOptions.find((t) => t.value === field.state.value)?.label)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(typeOptions.find((t) => t.value === field.state.value)?.label), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(typeOptions.find((t) => t.value === field.state.value)?.label), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectContent, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(typeOptions, (opt) => {
                                      _push6(ssrRenderComponent(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(opt.label)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(opt.label), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(), createBlock(Fragment, null, renderList(typeOptions, (opt) => {
                                        return createVNode(_component_UiSelectItem, {
                                          key: opt.value,
                                          value: opt.value
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(opt.label), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 64))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(typeOptions.find((t) => t.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(typeOptions, (opt) => {
                                      return createVNode(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(opt.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Tipe")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(typeOptions.find((t) => t.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(typeOptions, (opt) => {
                                      return createVNode(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(opt.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "frequency" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Frekuensi`);
                            } else {
                              return [
                                createTextVNode("Frekuensi")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelect, {
                          "model-value": field.state.value,
                          "onUpdate:modelValue": (v) => field.handleChange(v)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiSelectValue, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(frequencyOptions.find((f) => f.value === field.state.value)?.label)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(frequencyOptions.find((f) => f.value === field.state.value)?.label), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(frequencyOptions.find((f) => f.value === field.state.value)?.label), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectContent, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(frequencyOptions, (opt) => {
                                      _push6(ssrRenderComponent(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(opt.label)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(opt.label), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(), createBlock(Fragment, null, renderList(frequencyOptions, (opt) => {
                                        return createVNode(_component_UiSelectItem, {
                                          key: opt.value,
                                          value: opt.value
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(opt.label), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 64))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(frequencyOptions.find((f) => f.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(frequencyOptions, (opt) => {
                                      return createVNode(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(opt.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Frekuensi")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(frequencyOptions.find((f) => f.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(frequencyOptions, (opt) => {
                                      return createVNode(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(opt.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "startDate" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "startDate" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tanggal Mulai`);
                            } else {
                              return [
                                createTextVNode("Tanggal Mulai")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "startDate",
                          type: "date",
                          value: field.state.value,
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        if (!field.state.meta.isValid) {
                          _push4(`<p class="text-xs text-destructive"${_scopeId3}><!--[-->`);
                          ssrRenderList(field.state.meta.errors, (err, i) => {
                            _push4(`<span class="block"${_scopeId3}>* ${ssrInterpolate(err?.message)}</span>`);
                          });
                          _push4(`<!--]--></p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "startDate" }, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal Mulai")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "startDate",
                              type: "date",
                              value: field.state.value,
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, "* " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "walletId" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(createFormValues).type === "transfer" ? "Dari Dompet" : "Dompet")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(createFormValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSelect, {
                          "model-value": field.state.value,
                          "onUpdate:modelValue": (v) => field.handleChange(v)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiSelectValue, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(unref(selectedWallet))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(selectedWallet)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(selectedWallet)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiSelectContent, null, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<!--[-->`);
                                    ssrRenderList(__props.wallets, (wallet) => {
                                      _push6(ssrRenderComponent(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(wallet.name)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(wallet.name), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets, (wallet) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(wallet.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(selectedWallet)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets, (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(createFormValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(selectedWallet)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets, (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(createFormValues).type === "transfer") {
                    _push3(ssrRenderComponent(unref(createForm).Field, { name: "toWalletId" }, {
                      default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UiLabel, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Ke Dompet`);
                              } else {
                                return [
                                  createTextVNode("Ke Dompet")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiSelect, {
                            "model-value": field.state.value ?? "",
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full border-dashed border-primary" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiSelectValue, null, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(unref(selectedToWallet))}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(unref(selectedToWallet)), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiSelectValue, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(selectedToWallet)), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_UiSelectContent, null, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(__props.wallets.filter((w) => w.id !== unref(createFormValues).walletId), (wallet) => {
                                        _push6(ssrRenderComponent(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(wallet.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(wallet.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets.filter((w) => w.id !== unref(createFormValues).walletId), (wallet) => {
                                          return openBlock(), createBlock(_component_UiSelectItem, {
                                            key: wallet.id,
                                            value: wallet.id
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(wallet.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectTrigger, { class: "w-full border-dashed border-primary" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(selectedToWallet)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets.filter((w) => w.id !== unref(createFormValues).walletId), (wallet) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(wallet.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(_component_UiLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Ke Dompet")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelect, {
                                "model-value": field.state.value ?? "",
                                "onUpdate:modelValue": (v) => field.handleChange(v)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectTrigger, { class: "w-full border-dashed border-primary" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(selectedToWallet)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets.filter((w) => w.id !== unref(createFormValues).walletId), (wallet) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(wallet.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(createForm).Field, { name: "categoryId" }, {
                      default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="space-y-2"${_scopeId3}>`);
                          _push4(ssrRenderComponent(_component_UiLabel, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Kategori`);
                              } else {
                                return [
                                  createTextVNode("Kategori")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiSelect, {
                            "model-value": field.state.value ?? "",
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiSelectValue, null, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(unref(selectedCategory))}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(unref(selectedCategory)), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiSelectValue, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unref(selectedCategory)), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(_component_UiSelectContent, null, {
                                  default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<!--[-->`);
                                      ssrRenderList(unref(filteredCategories), (cat) => {
                                        _push6(ssrRenderComponent(_component_UiSelectItem, {
                                          key: cat.id,
                                          value: cat.id
                                        }, {
                                          default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(cat.icon ?? "")} ${ssrInterpolate(cat.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(cat.icon ?? "") + " " + toDisplayString(cat.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCategories), (cat) => {
                                          return openBlock(), createBlock(_component_UiSelectItem, {
                                            key: cat.id,
                                            value: cat.id
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(cat.icon ?? "") + " " + toDisplayString(cat.name), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["value"]);
                                        }), 128))
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(selectedCategory)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCategories), (cat) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: cat.id,
                                          value: cat.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(cat.icon ?? "") + " " + toDisplayString(cat.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          return [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(_component_UiLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Kategori")
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelect, {
                                "model-value": field.state.value ?? "",
                                "onUpdate:modelValue": (v) => field.handleChange(v)
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(selectedCategory)), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCategories), (cat) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: cat.id,
                                          value: cat.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(cat.icon ?? "") + " " + toDisplayString(cat.name), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"])
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "description" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "description" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Keterangan (Opsional)`);
                            } else {
                              return [
                                createTextVNode("Keterangan (Opsional)")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "description",
                          value: field.state.value ?? "",
                          placeholder: "Misal: Bayar Listrik, Langganan Netflix",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value || null)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "description",
                              value: field.state.value ?? "",
                              placeholder: "Misal: Bayar Listrik, Langganan Netflix",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value || null)
                            }, null, 8, ["value", "onBlur", "onInput"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(createForm).Subscribe, null, {
                    default: withCtx(({ isSubmitting }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: isSubmitting
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (isSubmitting) {
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(isSubmitting ? "Menyimpan..." : "Simpan Transaksi Rutin")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Transaksi Rutin"), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiButton, {
                            type: "submit",
                            class: "w-full",
                            disabled: isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Transaksi Rutin"), 1)
                            ]),
                            _: 2
                          }, 1032, ["disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</form>`);
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Tambah Transaksi Rutin")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4 p-4",
                      onSubmit: withModifiers(($event) => unref(createForm).handleSubmit(), ["prevent"])
                    }, [
                      createVNode(unref(createForm).Field, { name: "amount" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "amount",
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(Number(e.target.value))
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, "* " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(createForm).Field, { name: "type" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Tipe")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(typeOptions.find((t) => t.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(typeOptions, (opt) => {
                                      return createVNode(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(opt.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(createForm).Field, { name: "frequency" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Frekuensi")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(frequencyOptions.find((f) => f.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(frequencyOptions, (opt) => {
                                      return createVNode(_component_UiSelectItem, {
                                        key: opt.value,
                                        value: opt.value
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(opt.label), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 64))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(createForm).Field, { name: "startDate" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "startDate" }, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal Mulai")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "startDate",
                              type: "date",
                              value: field.state.value,
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, "* " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(createForm).Field, { name: "walletId" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(createFormValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(selectedWallet)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets, (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      }),
                      unref(createFormValues).type === "transfer" ? (openBlock(), createBlock(unref(createForm).Field, {
                        key: 0,
                        name: "toWalletId"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Ke Dompet")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value ?? "",
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full border-dashed border-primary" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(selectedToWallet)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets.filter((w) => w.id !== unref(createFormValues).walletId), (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(unref(createForm).Field, {
                        key: 1,
                        name: "categoryId"
                      }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Kategori")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value ?? "",
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unref(selectedCategory)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCategories), (cat) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: cat.id,
                                        value: cat.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(cat.icon ?? "") + " " + toDisplayString(cat.name), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"])
                          ])
                        ]),
                        _: 1
                      })),
                      createVNode(unref(createForm).Field, { name: "description" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "description",
                              value: field.state.value ?? "",
                              placeholder: "Misal: Bayar Listrik, Langganan Netflix",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value || null)
                            }, null, 8, ["value", "onBlur", "onInput"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(createForm).Subscribe, null, {
                        default: withCtx(({ isSubmitting }) => [
                          createVNode(_component_UiButton, {
                            type: "submit",
                            class: "w-full",
                            disabled: isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Transaksi Rutin"), 1)
                            ]),
                            _: 2
                          }, 1032, ["disabled"])
                        ]),
                        _: 1
                      })
                    ], 40, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiDialogTrigger, { "as-child": "" }, {
                default: withCtx(() => [
                  createVNode(_component_UiButton, {
                    class: "gap-2",
                    onClick: ($event) => unref(store).openCreate()
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "lucide:plus",
                        class: "h-4 w-4"
                      }),
                      createTextVNode(" Tambah Transaksi Rutin ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_UiDialogContent, { class: "max-h-[90vh] overflow-y-auto" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Tambah Transaksi Rutin")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4 p-4",
                    onSubmit: withModifiers(($event) => unref(createForm).handleSubmit(), ["prevent"])
                  }, [
                    createVNode(unref(createForm).Field, { name: "amount" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "amount",
                            type: "number",
                            value: field.state.value,
                            placeholder: "0",
                            min: "0",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(Number(e.target.value))
                          }, null, 8, ["value", "onBlur", "onInput"]),
                          !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                              return openBlock(), createBlock("span", {
                                key: i,
                                class: "block"
                              }, "* " + toDisplayString(err?.message), 1);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(createForm).Field, { name: "type" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Tipe")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            "model-value": field.state.value,
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(typeOptions.find((t) => t.value === field.state.value)?.label), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(typeOptions, (opt) => {
                                    return createVNode(_component_UiSelectItem, {
                                      key: opt.value,
                                      value: opt.value
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(opt.label), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(createForm).Field, { name: "frequency" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Frekuensi")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            "model-value": field.state.value,
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(frequencyOptions.find((f) => f.value === field.state.value)?.label), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(frequencyOptions, (opt) => {
                                    return createVNode(_component_UiSelectItem, {
                                      key: opt.value,
                                      value: opt.value
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(opt.label), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 64))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(createForm).Field, { name: "startDate" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "startDate" }, {
                            default: withCtx(() => [
                              createTextVNode("Tanggal Mulai")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "startDate",
                            type: "date",
                            value: field.state.value,
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["value", "onBlur", "onInput"]),
                          !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                              return openBlock(), createBlock("span", {
                                key: i,
                                class: "block"
                              }, "* " + toDisplayString(err?.message), 1);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(createForm).Field, { name: "walletId" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(createFormValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            "model-value": field.state.value,
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(selectedWallet)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets, (wallet) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: wallet.id,
                                      value: wallet.id
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(wallet.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    unref(createFormValues).type === "transfer" ? (openBlock(), createBlock(unref(createForm).Field, {
                      key: 0,
                      name: "toWalletId"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Ke Dompet")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            "model-value": field.state.value ?? "",
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { class: "w-full border-dashed border-primary" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(selectedToWallet)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.wallets.filter((w) => w.id !== unref(createFormValues).walletId), (wallet) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: wallet.id,
                                      value: wallet.id
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(wallet.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(unref(createForm).Field, {
                      key: 1,
                      name: "categoryId"
                    }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Kategori")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            "model-value": field.state.value ?? "",
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, { class: "w-full" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(selectedCategory)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredCategories), (cat) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: cat.id,
                                      value: cat.id
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(cat.icon ?? "") + " " + toDisplayString(cat.name), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    })),
                    createVNode(unref(createForm).Field, { name: "description" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "description",
                            value: field.state.value ?? "",
                            placeholder: "Misal: Bayar Listrik, Langganan Netflix",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value || null)
                          }, null, 8, ["value", "onBlur", "onInput"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(createForm).Subscribe, null, {
                      default: withCtx(({ isSubmitting }) => [
                        createVNode(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: isSubmitting
                        }, {
                          default: withCtx(() => [
                            isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Transaksi Rutin"), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled"])
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/recurring/create.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "FormsRecurringCreate" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    items: {},
    pending: { type: Boolean }
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { formatCurrency } = useCurrency();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSkeleton = _sfc_main$1a;
      const _component_Icon = __nuxt_component_1$1;
      const _component_UiBadge = _sfc_main$5;
      const _component_UiDropdownMenu = _sfc_main$i;
      const _component_UiDropdownMenuTrigger = _sfc_main$5$1;
      const _component_UiButton = _sfc_main$X;
      const _component_UiDropdownMenuContent = _sfc_main$g;
      const _component_UiDropdownMenuItem = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "rounded-md border bg-card" }, _attrs))}>`);
      if (__props.pending) {
        _push(`<!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="flex items-center justify-between border-b p-4 last:border-0"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-10 w-10 rounded-full" }, null, _parent));
          _push(`<div class="space-y-2">`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-32" }, null, _parent));
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-3 w-24" }, null, _parent));
          _push(`</div></div>`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-9 w-24" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else if (__props.items.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.items, (item) => {
          _push(`<div class="flex items-center justify-between border-b p-4 transition-colors last:border-0 hover:bg-muted/50"><div class="flex items-center gap-3"><div class="${ssrRenderClass([{
            "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400": item.type === "income",
            "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400": item.type === "expense",
            "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400": item.type === "transfer"
          }, "rounded-full p-2"])}">`);
          _push(ssrRenderComponent(_component_Icon, {
            name: "lucide:repeat",
            class: "h-4 w-4"
          }, null, _parent));
          _push(`</div><div><p class="font-medium">${ssrInterpolate(item.description || item.category?.name || "Transfer")} `);
          _push(ssrRenderComponent(_component_UiBadge, {
            variant: "secondary",
            class: "ml-2 text-[10px] capitalize"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(item.frequency)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(item.frequency), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</p><p class="text-xs text-muted-foreground">${ssrInterpolate(item.wallet.name)} `);
          if (item.toWallet) {
            _push(`<!--[-->→ ${ssrInterpolate(item.toWallet.name)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(` • Berikutnya: ${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(String(item.nextRunDate)))}</p></div></div><div class="flex items-center gap-4 text-right"><div><p class="font-bold">${ssrInterpolate(unref(formatCurrency)(item.amount))}</p><p class="${ssrRenderClass([item.isActive ? "text-green-500" : "text-muted-foreground", "text-[10px]"])}">${ssrInterpolate(item.isActive ? "Aktif" : "Nonaktif")}</p></div>`);
          _push(ssrRenderComponent(_component_UiDropdownMenu, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "outline",
                        size: "icon"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: "lucide:more-vertical",
                              class: "h-4 w-4"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: "lucide:more-vertical",
                                class: "h-4 w-4"
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          size: "icon"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "lucide:more-vertical",
                              class: "h-4 w-4"
                            })
                          ]),
                          _: 1
                        })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiDropdownMenuContent, { align: "end" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiDropdownMenuItem, {
                        class: "text-destructive focus:text-destructive",
                        onClick: ($event) => emit("delete", item.id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: "lucide:trash-2",
                              class: "mr-2 h-4 w-4"
                            }, null, _parent4, _scopeId3));
                            _push4(` Hapus `);
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: "lucide:trash-2",
                                class: "mr-2 h-4 w-4"
                              }),
                              createTextVNode(" Hapus ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiDropdownMenuItem, {
                          class: "text-destructive focus:text-destructive",
                          onClick: ($event) => emit("delete", item.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "lucide:trash-2",
                              class: "mr-2 h-4 w-4"
                            }),
                            createTextVNode(" Hapus ")
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "icon"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "lucide:more-vertical",
                            class: "h-4 w-4"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiDropdownMenuContent, { align: "end" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiDropdownMenuItem, {
                        class: "text-destructive focus:text-destructive",
                        onClick: ($event) => emit("delete", item.id)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "lucide:trash-2",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(" Hapus ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 2
                  }, 1024)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="p-8 text-center text-muted-foreground"> Belum ada transaksi rutin. </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tables/recurring/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "TablesRecurringList" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "recurring",
  __ssrInlineRender: true,
  setup(__props) {
    useRecurringCrudStore();
    const { $apolloClient } = useNuxtApp();
    useHead({
      title: "Transaksi Rutin - MyUangGwe | Otomatisasi Pencatatan Keuangan",
      meta: [
        {
          name: "description",
          content: "Kelola transaksi berulang Anda seperti tagihan, langganan, atau gaji agar pencatatan keuangan menjadi otomatis dan tidak terlewat."
        }
      ]
    });
    const {
      data: recurringData,
      pending,
      refresh: refreshRecurring
    } = useAsyncData(
      "recurring-transactions",
      async () => {
        const result = await $apolloClient.query({
          query: GET_RECURRING_TRANSACTIONS,
          fetchPolicy: "network-only"
        });
        return result.data.recurringTransactions;
      },
      { server: false, lazy: true }
    );
    const { data: walletsData } = useAsyncData(
      "wallets",
      async () => {
        const result = await $apolloClient.query({
          query: GET_WALLETS,
          fetchPolicy: "network-only"
        });
        return result.data.wallets;
      },
      { server: false, lazy: true }
    );
    const { data: categoriesData } = useAsyncData(
      "categories",
      async () => {
        const result = await $apolloClient.query({
          query: GET_CATEGORIES,
          fetchPolicy: "network-only"
        });
        return result.data.categories;
      },
      { server: false, lazy: true }
    );
    const recurringItems = computed(() => recurringData.value ?? []);
    const wallets = computed(() => walletsData.value ?? []);
    const categories = computed(() => categoriesData.value ?? []);
    const { mutate: deleteMutate } = useMutation(DELETE_RECURRING_TRANSACTION);
    async function handleDelete(id) {
      try {
        await deleteMutate({ id });
        toast.success("Transaksi rutin dihapus");
        await refreshRecurring();
      } catch {
        toast.error("Gagal menghapus transaksi rutin");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormsRecurringCreate = __nuxt_component_0;
      const _component_TablesRecurringList = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-2"><div><h1 class="text-3xl font-bold tracking-tight">Transaksi Rutin</h1><p class="text-sm text-muted-foreground">Otomatisasi transaksi yang terjadi berulang kali.</p></div>`);
      _push(ssrRenderComponent(_component_FormsRecurringCreate, {
        wallets: unref(wallets),
        categories: unref(categories),
        onCreated: ($event) => unref(refreshRecurring)()
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_TablesRecurringList, {
        items: unref(recurringItems),
        pending: unref(pending),
        onDelete: handleDelete
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/recurring.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=recurring-CVD611zW.mjs.map
