import { f as _sfc_main$9, _ as _sfc_main$4, e as _sfc_main$6, b as _sfc_main$3$1, a as _sfc_main$1$1, d as _sfc_main$5 } from './DialogTrigger-Bsj6TWLg.mjs';
import { D as useNuxtApp, B as useHead, A as useAsyncData, c as _sfc_main$X, a as __nuxt_component_1, y as refreshNuxtData, b as _sfc_main$H, d as _sfc_main$19, e as _sfc_main$10, f as _sfc_main$$, g as _sfc_main$18, h as _sfc_main$16, n as _sfc_main$1a, o as _sfc_main$i, p as _sfc_main$5$1, q as _sfc_main$g, r as _sfc_main$e, i as _sfc_main$Z, j as _sfc_main$V, k as _sfc_main$S, l as _sfc_main$R, m as _sfc_main$U } from './server.mjs';
import { c as _sfc_main$3$2, a as _sfc_main$1$2, _ as _sfc_main$7 } from './index-CVUXp8wK.mjs';
import { _ as _sfc_main$8 } from './Label-DoBiuCH1.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, ref, openBlock, createBlock, toDisplayString, createCommentVNode, Fragment, renderList, watch, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass } from 'vue/server-renderer';
import { useForm } from '@tanstack/vue-form';
import { toast } from 'vue-sonner';
import { useMutation } from '@vue/apollo-composable';
import { defineStore } from 'pinia';
import { type } from 'arktype';
import { u as useCurrency } from './useCurrency-CzQKYynb.mjs';
import { n as GET_TRANSACTIONS, i as DELETE_TRANSACTION, o as GET_WALLETS, k as GET_CATEGORIES, d as CREATE_TRANSACTION, r as UPDATE_TRANSACTION } from './useGqlSchema-B7rdXc-g.mjs';
import { f as formatDate } from './useTimeStamps-Cdn7G1h2.mjs';
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

const useTransactionsCrudStore = defineStore("crud-transactions", () => {
  const createOpen = ref(false);
  const editOpen = ref(false);
  const editingTransaction = ref(null);
  function openCreate() {
    createOpen.value = true;
  }
  function closeCreate() {
    createOpen.value = false;
  }
  function openEdit(tx) {
    editingTransaction.value = tx;
    editOpen.value = true;
  }
  function closeEdit() {
    editOpen.value = false;
    editingTransaction.value = null;
  }
  return { createOpen, editOpen, editingTransaction, openCreate, closeCreate, openEdit, closeEdit };
});
const transactionSchema = type({
  type: '"income" | "expense" | "transfer"',
  amount: "number > 0",
  walletId: "string > 0",
  "toWalletId?": "string | null",
  "categoryId?": "string | null",
  "description?": "string | null",
  date: "string > 0"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  emits: ["created"],
  setup(__props, { emit: __emit }) {
    const store = useTransactionsCrudStore();
    const emit = __emit;
    const { formatCurrency } = useCurrency();
    const { $apolloClient } = useNuxtApp();
    const { data: walletsData } = useAsyncData(
      "wallets",
      async () => {
        const result = await $apolloClient.query({
          query: GET_WALLETS,
          fetchPolicy: "network-only"
        });
        return result.data.wallets;
      },
      { lazy: true }
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
      { lazy: true }
    );
    const wallets = computed(() => walletsData.value ?? []);
    const categories = computed(() => categoriesData.value ?? []);
    const { mutate } = useMutation(CREATE_TRANSACTION);
    const transactionForm = useForm({
      validators: {
        onChange: transactionSchema,
        onSubmit: transactionSchema
      },
      defaultValues: {
        type: "expense",
        amount: 0,
        walletId: "",
        toWalletId: "",
        categoryId: "",
        description: "",
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      },
      onSubmit: async ({ value }) => {
        try {
          const input = {
            type: value.type,
            amount: value.amount,
            walletId: value.walletId,
            description: value.description || null,
            date: new Date(value.date).toISOString()
          };
          if (value.type === "transfer") {
            input.toWalletId = value.toWalletId;
          } else {
            input.categoryId = value.categoryId;
          }
          await mutate({ input });
          toast.success("Transaksi berhasil dicatat");
          store.closeCreate();
          transactionForm.reset();
          emit("created");
        } catch {
          toast.error("Terjadi kesalahan");
        }
      }
    });
    const formValues = transactionForm.useStore((s) => s.values);
    const selectedWallet = computed(
      () => wallets.value.find((w) => w.id === formValues.value.walletId)?.name ?? "Pilih Dompet"
    );
    const selectedToWallet = computed(
      () => wallets.value.find((w) => w.id === formValues.value.toWalletId)?.name ?? "Pilih Dompet Tujuan"
    );
    const selectedCategory = computed(
      () => categories.value.find((c) => c.id === formValues.value.categoryId)?.name ?? "Pilih Kategori"
    );
    const filteredCategories = computed(
      () => categories.value.filter((c) => c.type === formValues.value.type)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiTabs = _sfc_main$3$2;
      const _component_UiTabsList = _sfc_main$1$2;
      const _component_UiTabsTrigger = _sfc_main$7;
      const _component_UiLabel = _sfc_main$8;
      const _component_UiInput = _sfc_main$H;
      const _component_UiSelect = _sfc_main$19;
      const _component_UiSelectTrigger = _sfc_main$10;
      const _component_UiSelectValue = _sfc_main$$;
      const _component_UiSelectContent = _sfc_main$18;
      const _component_UiSelectItem = _sfc_main$16;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      _push(`<form${ssrRenderAttrs(mergeProps({ class: "space-y-4 p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(unref(transactionForm).Field, { name: "type" }, {
        default: withCtx(({ field }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTabs, {
              "model-value": field.state.value,
              "onUpdate:modelValue": (v) => field.handleChange(v)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiTabsTrigger, { value: "expense" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Keluar`);
                            } else {
                              return [
                                createTextVNode("Keluar")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiTabsTrigger, { value: "income" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Masuk`);
                            } else {
                              return [
                                createTextVNode("Masuk")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiTabsTrigger, { value: "transfer" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Transfer`);
                            } else {
                              return [
                                createTextVNode("Transfer")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                            default: withCtx(() => [
                              createTextVNode("Keluar")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiTabsTrigger, { value: "income" }, {
                            default: withCtx(() => [
                              createTextVNode("Masuk")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                            default: withCtx(() => [
                              createTextVNode("Transfer")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                          default: withCtx(() => [
                            createTextVNode("Keluar")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTabsTrigger, { value: "income" }, {
                          default: withCtx(() => [
                            createTextVNode("Masuk")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                          default: withCtx(() => [
                            createTextVNode("Transfer")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiTabs, {
                "model-value": field.state.value,
                "onUpdate:modelValue": (v) => field.handleChange(v)
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                        default: withCtx(() => [
                          createTextVNode("Keluar")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTabsTrigger, { value: "income" }, {
                        default: withCtx(() => [
                          createTextVNode("Masuk")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                        default: withCtx(() => [
                          createTextVNode("Transfer")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["model-value", "onUpdate:modelValue"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(transactionForm).Field, { name: "amount" }, {
        default: withCtx(({ field }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UiLabel, { for: "amount" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Jumlah (Rp)`);
                } else {
                  return [
                    createTextVNode("Jumlah (Rp)")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiInput, {
              id: "amount",
              type: "number",
              value: field.state.value,
              placeholder: "0",
              min: "0",
              onBlur: ($event) => field.handleBlur(),
              onInput: (e) => field.handleChange(Number(e.target.value))
            }, null, _parent2, _scopeId));
            if (field.state.meta.errors.length > 0) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                createVNode(_component_UiLabel, { for: "amount" }, {
                  default: withCtx(() => [
                    createTextVNode("Jumlah (Rp)")
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
                field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "text-xs text-destructive"
                }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(transactionForm).Field, { name: "walletId" }, {
        default: withCtx(({ field }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UiLabel, null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiSelect, {
              "model-value": field.state.value,
              "onUpdate:modelValue": (v) => field.handleChange(v)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full" }, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSelectValue, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(selectedWallet))}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(selectedWallet)), 1)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiSelectContent, null, {
                    default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList(unref(wallets), (wallet) => {
                          _push4(ssrRenderComponent(_component_UiSelectItem, {
                            key: wallet.id,
                            value: wallet.id
                          }, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(wallet.name)} (${ssrInterpolate(unref(formatCurrency)(wallet.balance))}) `);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                            return openBlock(), createBlock(_component_UiSelectItem, {
                              key: wallet.id,
                              value: wallet.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ];
                      }
                    }),
                    _: 2
                  }, _parent3, _scopeId2));
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
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                          return openBlock(), createBlock(_component_UiSelectItem, {
                            key: wallet.id,
                            value: wallet.id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
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
            }, _parent2, _scopeId));
            if (field.state.meta.errors.length > 0) {
              _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                createVNode(_component_UiLabel, null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
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
                        (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                          return openBlock(), createBlock(_component_UiSelectItem, {
                            key: wallet.id,
                            value: wallet.id
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                            ]),
                            _: 2
                          }, 1032, ["value"]);
                        }), 128))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }, 8, ["model-value", "onUpdate:modelValue"]),
                field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "text-xs text-destructive"
                }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      if (unref(formValues).type === "transfer") {
        _push(ssrRenderComponent(unref(transactionForm).Field, { name: "toWalletId" }, {
          default: withCtx(({ field }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UiLabel, null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Ke Dompet`);
                  } else {
                    return [
                      createTextVNode("Ke Dompet")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiSelect, {
                "model-value": field.state.value,
                "onUpdate:modelValue": (v) => field.handleChange(v)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full border-dashed border-primary" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiSelectValue, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(selectedToWallet))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(selectedToWallet)), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiSelectContent, null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(wallets).filter(
                            (w) => w.id !== unref(formValues).walletId
                          ), (wallet) => {
                            _push4(ssrRenderComponent(_component_UiSelectItem, {
                              key: wallet.id,
                              value: wallet.id
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(wallet.name)} (${ssrInterpolate(unref(formatCurrency)(wallet.balance))}) `);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
                        } else {
                          return [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                              (w) => w.id !== unref(formValues).walletId
                            ), (wallet) => {
                              return openBlock(), createBlock(_component_UiSelectItem, {
                                key: wallet.id,
                                value: wallet.id
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 128))
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                            (w) => w.id !== unref(formValues).walletId
                          ), (wallet) => {
                            return openBlock(), createBlock(_component_UiSelectItem, {
                              key: wallet.id,
                              value: wallet.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
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
              }, _parent2, _scopeId));
              if (field.state.meta.errors.length > 0) {
                _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
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
                    "model-value": field.state.value,
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
                          (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                            (w) => w.id !== unref(formValues).walletId
                          ), (wallet) => {
                            return openBlock(), createBlock(_component_UiSelectItem, {
                              key: wallet.id,
                              value: wallet.id
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 128))
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["model-value", "onUpdate:modelValue"]),
                  field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-destructive"
                  }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(ssrRenderComponent(unref(transactionForm).Field, { name: "categoryId" }, {
          default: withCtx(({ field }, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="space-y-2"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_UiLabel, null, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Kategori`);
                  } else {
                    return [
                      createTextVNode("Kategori")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiSelect, {
                "model-value": field.state.value,
                "onUpdate:modelValue": (v) => field.handleChange(v)
              }, {
                default: withCtx((_, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiSelectTrigger, { class: "w-full" }, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiSelectValue, null, {
                            default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(selectedCategory))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(selectedCategory)), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
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
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiSelectContent, null, {
                      default: withCtx((_2, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<!--[-->`);
                          ssrRenderList(unref(filteredCategories), (cat) => {
                            _push4(ssrRenderComponent(_component_UiSelectItem, {
                              key: cat.id,
                              value: cat.id
                            }, {
                              default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`${ssrInterpolate(cat.icon ?? "")} ${ssrInterpolate(cat.name)}`);
                                } else {
                                  return [
                                    createTextVNode(toDisplayString(cat.icon ?? "") + " " + toDisplayString(cat.name), 1)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          });
                          _push4(`<!--]-->`);
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
                    }, _parent3, _scopeId2));
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
              }, _parent2, _scopeId));
              if (field.state.meta.errors.length > 0) {
                _push2(`<p class="text-xs text-destructive"${_scopeId}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
              } else {
                _push2(`<!---->`);
              }
              _push2(`</div>`);
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
                    "model-value": field.state.value,
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
                  }, 8, ["model-value", "onUpdate:modelValue"]),
                  field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                    key: 0,
                    class: "text-xs text-destructive"
                  }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                ])
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(ssrRenderComponent(unref(transactionForm).Field, { name: "description" }, {
        default: withCtx(({ field }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UiLabel, { for: "description" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Keterangan (Opsional)`);
                } else {
                  return [
                    createTextVNode("Keterangan (Opsional)")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiInput, {
              id: "description",
              value: field.state.value,
              placeholder: "Makan siang, dsb",
              onBlur: ($event) => field.handleBlur(),
              onInput: (e) => field.handleChange(e.target.value)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
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
                  value: field.state.value,
                  placeholder: "Makan siang, dsb",
                  onBlur: ($event) => field.handleBlur(),
                  onInput: (e) => field.handleChange(e.target.value)
                }, null, 8, ["value", "onBlur", "onInput"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(transactionForm).Field, { name: "date" }, {
        default: withCtx(({ field }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="space-y-2"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UiLabel, { for: "date" }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Tanggal`);
                } else {
                  return [
                    createTextVNode("Tanggal")
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiInput, {
              id: "date",
              type: "date",
              value: field.state.value,
              onBlur: ($event) => field.handleBlur(),
              onInput: (e) => field.handleChange(e.target.value)
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "space-y-2" }, [
                createVNode(_component_UiLabel, { for: "date" }, {
                  default: withCtx(() => [
                    createTextVNode("Tanggal")
                  ]),
                  _: 1
                }),
                createVNode(_component_UiInput, {
                  id: "date",
                  type: "date",
                  value: field.state.value,
                  onBlur: ($event) => field.handleBlur(),
                  onInput: (e) => field.handleChange(e.target.value)
                }, null, 8, ["value", "onBlur", "onInput"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(transactionForm).Subscribe, null, {
        default: withCtx(({ isSubmitting }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiButton, {
              type: "submit",
              class: "w-full",
              disabled: isSubmitting
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isSubmitting) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:loader-2",
                      class: "mr-2 h-4 w-4 animate-spin"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(` ${ssrInterpolate(isSubmitting ? "Menyimpan..." : "Simpan Transaksi")}`);
                } else {
                  return [
                    isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                      key: 0,
                      name: "lucide:loader-2",
                      class: "mr-2 h-4 w-4 animate-spin"
                    })) : createCommentVNode("", true),
                    createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Transaksi"), 1)
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
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
                  createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Transaksi"), 1)
                ]),
                _: 2
              }, 1032, ["disabled"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</form>`);
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/transactions/create.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_8 = Object.assign(_sfc_main$3, { __name: "FormsTransactionsCreate" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const store = useTransactionsCrudStore();
    const emit = __emit;
    const { formatCurrency } = useCurrency();
    const { $apolloClient } = useNuxtApp();
    const { data: walletsData } = useAsyncData(
      "wallets",
      async () => {
        const result = await $apolloClient.query({
          query: GET_WALLETS,
          fetchPolicy: "network-only"
        });
        return result.data.wallets;
      },
      { lazy: true }
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
      { lazy: true }
    );
    const wallets = computed(() => walletsData.value ?? []);
    const categories = computed(() => categoriesData.value ?? []);
    const { mutate } = useMutation(UPDATE_TRANSACTION);
    const transactionForm = useForm({
      validators: {
        onChange: transactionSchema,
        onSubmit: transactionSchema
      },
      defaultValues: {
        type: "expense",
        amount: 0,
        walletId: "",
        toWalletId: "",
        categoryId: "",
        description: "",
        date: (/* @__PURE__ */ new Date()).toISOString().split("T")[0]
      },
      onSubmit: async ({ value }) => {
        if (!store.editingTransaction) return;
        try {
          const input = {
            type: value.type,
            amount: value.amount,
            walletId: value.walletId,
            description: value.description || null,
            date: new Date(value.date).toISOString()
          };
          if (value.type === "transfer") {
            input.toWalletId = value.toWalletId;
          } else {
            input.categoryId = value.categoryId;
          }
          await mutate({ id: store.editingTransaction.id, input });
          toast.success("Transaksi berhasil diubah");
          store.closeEdit();
          emit("updated");
        } catch {
          toast.error("Terjadi kesalahan");
        }
      }
    });
    watch(
      () => store.editingTransaction,
      (tx) => {
        if (!tx) return;
        transactionForm.setFieldValue("type", tx.type);
        transactionForm.setFieldValue("amount", tx.amount);
        transactionForm.setFieldValue("walletId", tx.wallet.id);
        transactionForm.setFieldValue("toWalletId", tx.toWallet?.id ?? "");
        transactionForm.setFieldValue("categoryId", tx.category?.id ?? "");
        transactionForm.setFieldValue("description", tx.description ?? "");
        transactionForm.setFieldValue(
          "date",
          new Date(tx.date).toISOString().split("T")[0]
        );
      },
      { immediate: true }
    );
    const formValues = transactionForm.useStore((s) => s.values);
    const selectedWallet = computed(
      () => wallets.value.find((w) => w.id === formValues.value.walletId)?.name ?? "Pilih Dompet"
    );
    const selectedToWallet = computed(
      () => wallets.value.find((w) => w.id === formValues.value.toWalletId)?.name ?? "Pilih Dompet Tujuan"
    );
    const selectedCategory = computed(
      () => categories.value.find((c) => c.id === formValues.value.categoryId)?.name ?? "Pilih Kategori"
    );
    const filteredCategories = computed(
      () => categories.value.filter((c) => c.type === formValues.value.type)
    );
    function formatDate2(date) {
      return new Date(date).toLocaleDateString("id-ID");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSheet = _sfc_main$Z;
      const _component_UiSheetContent = _sfc_main$V;
      const _component_UiSheetHeader = _sfc_main$S;
      const _component_UiSheetTitle = _sfc_main$R;
      const _component_UiSheetDescription = _sfc_main$U;
      const _component_UiTabs = _sfc_main$3$2;
      const _component_UiTabsList = _sfc_main$1$2;
      const _component_UiTabsTrigger = _sfc_main$7;
      const _component_UiLabel = _sfc_main$8;
      const _component_UiInput = _sfc_main$H;
      const _component_UiSelect = _sfc_main$19;
      const _component_UiSelectTrigger = _sfc_main$10;
      const _component_UiSelectValue = _sfc_main$$;
      const _component_UiSelectContent = _sfc_main$18;
      const _component_UiSelectItem = _sfc_main$16;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UiSheet, mergeProps({
        open: unref(store).editOpen,
        "onUpdate:open": ($event) => unref(store).closeEdit()
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiSheetContent, {
              side: "right",
              class: "overflow-y-auto"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSheetHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiSheetTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Transaksi ${ssrInterpolate(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : "")}`);
                            } else {
                              return [
                                createTextVNode("Edit Transaksi " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Ubah informasi transaksi tanggal ${ssrInterpolate(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : "")}`);
                            } else {
                              return [
                                createTextVNode("Ubah informasi transaksi tanggal " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Transaksi " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Ubah informasi transaksi tanggal " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4 p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(transactionForm).Field, { name: "type" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiTabs, {
                          "model-value": field.state.value,
                          "onUpdate:modelValue": (v) => field.handleChange(v)
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiTabsTrigger, { value: "expense" }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Keluar`);
                                        } else {
                                          return [
                                            createTextVNode("Keluar")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiTabsTrigger, { value: "income" }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Masuk`);
                                        } else {
                                          return [
                                            createTextVNode("Masuk")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiTabsTrigger, { value: "transfer" }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Transfer`);
                                        } else {
                                          return [
                                            createTextVNode("Transfer")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Keluar")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTabsTrigger, { value: "income" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Masuk")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Transfer")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Keluar")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTabsTrigger, { value: "income" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Masuk")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Transfer")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiTabs, {
                            "model-value": field.state.value,
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Keluar")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTabsTrigger, { value: "income" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Masuk")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Transfer")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(transactionForm).Field, { name: "amount" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "edit-amount" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jumlah (Rp)`);
                            } else {
                              return [
                                createTextVNode("Jumlah (Rp)")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "edit-amount",
                          type: "number",
                          value: field.state.value,
                          placeholder: "0",
                          min: "0",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(
                            Number(e.target.value)
                          )
                        }, null, _parent4, _scopeId3));
                        if (field.state.meta.errors.length > 0) {
                          _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "edit-amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "edit-amount",
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(
                                Number(e.target.value)
                              )
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(transactionForm).Field, { name: "walletId" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
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
                                    ssrRenderList(unref(wallets), (wallet) => {
                                      _push6(ssrRenderComponent(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(wallet.name)} (${ssrInterpolate(unref(formatCurrency)(wallet.balance))}) `);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    });
                                    _push6(`<!--]-->`);
                                  } else {
                                    return [
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
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
                        if (field.state.meta.errors.length > 0) {
                          _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  if (unref(formValues).type === "transfer") {
                    _push3(ssrRenderComponent(unref(transactionForm).Field, { name: "toWalletId" }, {
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
                            "model-value": field.state.value,
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
                                      ssrRenderList(unref(wallets).filter(
                                        (w) => w.id !== unref(formValues).walletId
                                      ), (wallet) => {
                                        _push6(ssrRenderComponent(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(wallet.name)} (${ssrInterpolate(unref(formatCurrency)(wallet.balance))}) `);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      });
                                      _push6(`<!--]-->`);
                                    } else {
                                      return [
                                        (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                                          (w) => w.id !== unref(formValues).walletId
                                        ), (wallet) => {
                                          return openBlock(), createBlock(_component_UiSelectItem, {
                                            key: wallet.id,
                                            value: wallet.id
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                                        (w) => w.id !== unref(formValues).walletId
                                      ), (wallet) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
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
                          if (field.state.meta.errors.length > 0) {
                            _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
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
                                "model-value": field.state.value,
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                                        (w) => w.id !== unref(formValues).walletId
                                      ), (wallet) => {
                                        return openBlock(), createBlock(_component_UiSelectItem, {
                                          key: wallet.id,
                                          value: wallet.id
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["value"]);
                                      }), 128))
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }, 8, ["model-value", "onUpdate:modelValue"]),
                              field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive"
                              }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(ssrRenderComponent(unref(transactionForm).Field, { name: "categoryId" }, {
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
                          if (field.state.meta.errors.length > 0) {
                            _push4(`<p class="text-xs text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                          } else {
                            _push4(`<!---->`);
                          }
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
                                "model-value": field.state.value,
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
                              }, 8, ["model-value", "onUpdate:modelValue"]),
                              field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-xs text-destructive"
                              }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  }
                  _push3(ssrRenderComponent(unref(transactionForm).Field, { name: "description" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "edit-description" }, {
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
                          id: "edit-description",
                          value: field.state.value,
                          placeholder: "Makan siang, dsb",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "edit-description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "edit-description",
                              value: field.state.value,
                              placeholder: "Makan siang, dsb",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(transactionForm).Field, { name: "date" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "edit-date" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tanggal`);
                            } else {
                              return [
                                createTextVNode("Tanggal")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "edit-date",
                          type: "date",
                          value: field.state.value,
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "edit-date" }, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "edit-date",
                              type: "date",
                              value: field.state.value,
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(transactionForm).Subscribe, null, {
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
                              _push5(` ${ssrInterpolate(isSubmitting ? "Menyimpan..." : "Simpan Perubahan")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Perubahan"), 1)
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
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Perubahan"), 1)
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
                    createVNode(_component_UiSheetHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiSheetTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Edit Transaksi " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Ubah informasi transaksi tanggal " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4 p-4",
                      onSubmit: withModifiers(($event) => unref(transactionForm).handleSubmit(), ["prevent"])
                    }, [
                      createVNode(unref(transactionForm).Field, { name: "type" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_UiTabs, {
                            "model-value": field.state.value,
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Keluar")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTabsTrigger, { value: "income" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Masuk")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Transfer")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(transactionForm).Field, { name: "amount" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "edit-amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah (Rp)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "edit-amount",
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(
                                Number(e.target.value)
                              )
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(transactionForm).Field, { name: "walletId" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      unref(formValues).type === "transfer" ? (openBlock(), createBlock(unref(transactionForm).Field, {
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
                              "model-value": field.state.value,
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                                      (w) => w.id !== unref(formValues).walletId
                                    ), (wallet) => {
                                      return openBlock(), createBlock(_component_UiSelectItem, {
                                        key: wallet.id,
                                        value: wallet.id
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["value"]);
                                    }), 128))
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["model-value", "onUpdate:modelValue"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(unref(transactionForm).Field, {
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
                              "model-value": field.state.value,
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
                            }, 8, ["model-value", "onUpdate:modelValue"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-xs text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      })),
                      createVNode(unref(transactionForm).Field, { name: "description" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "edit-description" }, {
                              default: withCtx(() => [
                                createTextVNode("Keterangan (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "edit-description",
                              value: field.state.value,
                              placeholder: "Makan siang, dsb",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(transactionForm).Field, { name: "date" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "edit-date" }, {
                              default: withCtx(() => [
                                createTextVNode("Tanggal")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "edit-date",
                              type: "date",
                              value: field.state.value,
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"])
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(transactionForm).Subscribe, null, {
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
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Perubahan"), 1)
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
              createVNode(_component_UiSheetContent, {
                side: "right",
                class: "overflow-y-auto"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiSheetHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiSheetTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Transaksi " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Ubah informasi transaksi tanggal " + toDisplayString(unref(store).editingTransaction ? formatDate2(String(unref(store).editingTransaction.date)) : ""), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4 p-4",
                    onSubmit: withModifiers(($event) => unref(transactionForm).handleSubmit(), ["prevent"])
                  }, [
                    createVNode(unref(transactionForm).Field, { name: "type" }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_UiTabs, {
                          "model-value": field.state.value,
                          "onUpdate:modelValue": (v) => field.handleChange(v)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_UiTabsList, { class: "grid w-full grid-cols-3" }, {
                              default: withCtx(() => [
                                createVNode(_component_UiTabsTrigger, { value: "expense" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Keluar")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTabsTrigger, { value: "income" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Masuk")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTabsTrigger, { value: "transfer" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Transfer")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["model-value", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(transactionForm).Field, { name: "amount" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah (Rp)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-amount",
                            type: "number",
                            value: field.state.value,
                            placeholder: "0",
                            min: "0",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(
                              Number(e.target.value)
                            )
                          }, null, 8, ["value", "onBlur", "onInput"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(transactionForm).Field, { name: "walletId" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(formValues).type === "transfer" ? "Dari Dompet" : "Dompet"), 1)
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: wallet.id,
                                      value: wallet.id
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    unref(formValues).type === "transfer" ? (openBlock(), createBlock(unref(transactionForm).Field, {
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
                            "model-value": field.state.value,
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets).filter(
                                    (w) => w.id !== unref(formValues).walletId
                                  ), (wallet) => {
                                    return openBlock(), createBlock(_component_UiSelectItem, {
                                      key: wallet.id,
                                      value: wallet.id
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(wallet.name) + " (" + toDisplayString(unref(formatCurrency)(wallet.balance)) + ") ", 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["value"]);
                                  }), 128))
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["model-value", "onUpdate:modelValue"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })) : (openBlock(), createBlock(unref(transactionForm).Field, {
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
                            "model-value": field.state.value,
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
                          }, 8, ["model-value", "onUpdate:modelValue"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-xs text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    })),
                    createVNode(unref(transactionForm).Field, { name: "description" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-description" }, {
                            default: withCtx(() => [
                              createTextVNode("Keterangan (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-description",
                            value: field.state.value,
                            placeholder: "Makan siang, dsb",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["value", "onBlur", "onInput"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(transactionForm).Field, { name: "date" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-date" }, {
                            default: withCtx(() => [
                              createTextVNode("Tanggal")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "edit-date",
                            type: "date",
                            value: field.state.value,
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["value", "onBlur", "onInput"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(transactionForm).Subscribe, null, {
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
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Perubahan"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/transactions/edit.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$2, { __name: "FormsTransactionsEdit" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    transactions: {},
    pending: { type: Boolean }
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const store = useTransactionsCrudStore();
    const { formatCurrency } = useCurrency();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormsTransactionsEdit = __nuxt_component_0;
      const _component_UiSkeleton = _sfc_main$1a;
      const _component_Icon = __nuxt_component_1;
      const _component_UiDropdownMenu = _sfc_main$i;
      const _component_UiDropdownMenuTrigger = _sfc_main$5$1;
      const _component_UiButton = _sfc_main$X;
      const _component_UiDropdownMenuContent = _sfc_main$g;
      const _component_UiDropdownMenuItem = _sfc_main$e;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_FormsTransactionsEdit, {
        onUpdated: ($event) => ("refreshNuxtData" in _ctx ? _ctx.refreshNuxtData : unref(refreshNuxtData))("transactions")
      }, null, _parent));
      _push(`<div class="rounded-md border bg-card">`);
      if (__props.pending) {
        _push(`<!--[-->`);
        ssrRenderList(5, (i) => {
          _push(`<div class="flex items-center justify-between border-b p-4 last:border-0"><div class="flex items-center gap-3">`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-10 w-10 rounded-full" }, null, _parent));
          _push(`<div class="space-y-2">`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-32" }, null, _parent));
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-3 w-24" }, null, _parent));
          _push(`</div></div>`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-5 w-24" }, null, _parent));
          _push(`</div>`);
        });
        _push(`<!--]-->`);
      } else if (__props.transactions.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.transactions, (tx) => {
          _push(`<div class="flex items-center justify-between border-b p-4 transition-colors last:border-0 hover:bg-muted/50"><div class="flex items-center gap-3"><div class="${ssrRenderClass([{
            "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400": tx.type === "income",
            "bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400": tx.type === "expense",
            "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400": tx.type === "transfer"
          }, "rounded-full p-2"])}">`);
          if (tx.type === "income") {
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-down-left",
              class: "h-4 w-4"
            }, null, _parent));
          } else if (tx.type === "expense") {
            _push(ssrRenderComponent(_component_Icon, {
              name: "lucide:arrow-up-right",
              class: "h-4 w-4"
            }, null, _parent));
          } else {
            _push(`<span>💰</span>`);
          }
          _push(`</div><div><p class="font-medium">${ssrInterpolate(tx.category?.icon)} ${ssrInterpolate(tx.description || tx.category?.name || "Transfer")}</p><p class="text-xs text-muted-foreground">${ssrInterpolate(tx.wallet.name)} `);
          if (tx.type === "transfer" && tx.toWallet) {
            _push(`<!--[-->→ ${ssrInterpolate(tx.toWallet.name)}<!--]-->`);
          } else {
            _push(`<!---->`);
          }
          _push(`</p></div></div><div class="flex items-center gap-4 text-right"><div><p class="${ssrRenderClass([{
            "text-green-600 dark:text-green-400": tx.type === "income",
            "text-red-600 dark:text-red-400": tx.type === "expense"
          }, "font-bold"])}">${ssrInterpolate(tx.type === "income" ? "+" : "-")} ${ssrInterpolate(unref(formatCurrency)(tx.amount))}</p><p class="text-[10px] text-muted-foreground">${ssrInterpolate(("formatDate" in _ctx ? _ctx.formatDate : unref(formatDate))(String(tx.date)))}</p></div>`);
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
                        onClick: ($event) => unref(store).openEdit(tx)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: "lucide:pencil",
                              class: "mr-2 h-4 w-4"
                            }, null, _parent4, _scopeId3));
                            _push4(` Edit `);
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: "lucide:pencil",
                                class: "mr-2 h-4 w-4"
                              }),
                              createTextVNode(" Edit ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiDropdownMenuItem, {
                        class: "text-destructive focus:text-destructive",
                        onClick: ($event) => emit("delete", tx.id)
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
                          onClick: ($event) => unref(store).openEdit(tx)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "lucide:pencil",
                              class: "mr-2 h-4 w-4"
                            }),
                            createTextVNode(" Edit ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiDropdownMenuItem, {
                          class: "text-destructive focus:text-destructive",
                          onClick: ($event) => emit("delete", tx.id)
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
                        onClick: ($event) => unref(store).openEdit(tx)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "lucide:pencil",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(" Edit ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiDropdownMenuItem, {
                        class: "text-destructive focus:text-destructive",
                        onClick: ($event) => emit("delete", tx.id)
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
        _push(`<div class="p-8 text-center text-muted-foreground"> Belum ada transaksi. </div>`);
      }
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tables/transactions/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_9 = Object.assign(_sfc_main$1, { __name: "TablesTransactionsList" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transactions",
  __ssrInlineRender: true,
  setup(__props) {
    const { $apolloClient } = useNuxtApp();
    const store = useTransactionsCrudStore();
    useHead({
      title: "Transaksi - MyUangGwe | Catat Pemasukan & Pengeluaran",
      meta: [
        {
          name: "description",
          content: "Catat dan kelola semua transaksi keuangan Anda - pemasukan, pengeluaran, dan transfer antar dompet di satu tempat."
        },
        {
          name: "keywords",
          content: "transaksi keuangan, pencatatan keuangan, pemasukan pengeluaran, manajemen keuangan, aplikasi keuangan"
        }
      ]
    });
    const {
      data: transactionsData,
      pending,
      refresh: refreshTransactions
    } = useAsyncData(
      "transactions",
      async () => {
        const result = await $apolloClient.query({
          query: GET_TRANSACTIONS,
          variables: {},
          fetchPolicy: "network-only"
        });
        return result.data.transactions;
      },
      { server: false, lazy: true }
    );
    const transactions = computed(() => transactionsData.value ?? []);
    const { mutate: deleteMutation } = useMutation(DELETE_TRANSACTION);
    async function handleDelete(id) {
      try {
        await deleteMutation({ id });
        toast.success("Transaksi dihapus");
        await refreshTransactions();
        await refreshNuxtData("wallets");
      } catch {
        toast.error("Gagal menghapus transaksi");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogTrigger = _sfc_main$4;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      const _component_UiDialogContent = _sfc_main$6;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$1;
      const _component_UiDialogDescription = _sfc_main$5;
      const _component_FormsTransactionsCreate = __nuxt_component_8;
      const _component_TablesTransactionsList = __nuxt_component_9;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6 p-6" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-2"><div><h1 class="text-3xl font-bold tracking-tight">Transaksi</h1><p class="text-sm text-muted-foreground">Kelola transaksi.</p></div>`);
      _push(ssrRenderComponent(_component_UiDialog, {
        open: unref(store).createOpen,
        "onUpdate:open": ($event) => unref(store).closeCreate()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiDialogTrigger, { "as-child": "" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiButton, {
                    onClick: ($event) => unref(store).openCreate()
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "lucide:plus",
                          class: "mr-2 h-4 w-4"
                        }, null, _parent4, _scopeId3));
                        _push4(` Catat Transaksi `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "lucide:plus",
                            class: "mr-2 h-4 w-4"
                          }),
                          createTextVNode(" Catat Transaksi ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiButton, {
                      onClick: ($event) => unref(store).openCreate()
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "lucide:plus",
                          class: "mr-2 h-4 w-4"
                        }),
                        createTextVNode(" Catat Transaksi ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiDialogContent, { class: "sm:max-w-md" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tambah Transaksi`);
                            } else {
                              return [
                                createTextVNode("Tambah Transaksi")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Catat pemasukan, pengeluaran, atau transfer antar dompet.`);
                            } else {
                              return [
                                createTextVNode("Catat pemasukan, pengeluaran, atau transfer antar dompet.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Transaksi")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Catat pemasukan, pengeluaran, atau transfer antar dompet.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_FormsTransactionsCreate, {
                    onCreated: ($event) => unref(refreshTransactions)()
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Tambah Transaksi")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Catat pemasukan, pengeluaran, atau transfer antar dompet.")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_FormsTransactionsCreate, {
                      onCreated: ($event) => unref(refreshTransactions)()
                    }, null, 8, ["onCreated"])
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
                    onClick: ($event) => unref(store).openCreate()
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "lucide:plus",
                        class: "mr-2 h-4 w-4"
                      }),
                      createTextVNode(" Catat Transaksi ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_UiDialogContent, { class: "sm:max-w-md" }, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Tambah Transaksi")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Catat pemasukan, pengeluaran, atau transfer antar dompet.")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_FormsTransactionsCreate, {
                    onCreated: ($event) => unref(refreshTransactions)()
                  }, null, 8, ["onCreated"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_TablesTransactionsList, {
        transactions: unref(transactions),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=transactions-B8FOhe04.mjs.map
