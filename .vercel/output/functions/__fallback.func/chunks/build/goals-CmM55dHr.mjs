import { D as useNuxtApp, B as useHead, A as useAsyncData, c as _sfc_main$X, a as __nuxt_component_1, i as _sfc_main$Z, j as _sfc_main$V, k as _sfc_main$S, l as _sfc_main$R, m as _sfc_main$U, b as _sfc_main$H, d as _sfc_main$19, e as _sfc_main$10, f as _sfc_main$$, g as _sfc_main$18, h as _sfc_main$16, n as _sfc_main$1a } from './server.mjs';
import { _ as _sfc_main$3 } from './Label-DoBiuCH1.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, ref, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, resolveComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useMutation } from '@vue/apollo-composable';
import { toast } from 'vue-sonner';
import { useForm } from '@tanstack/vue-form';
import { type } from 'arktype';
import { defineStore } from 'pinia';
import { l as GET_FINANCIAL_GOALS, o as GET_WALLETS, q as UPDATE_FINANCIAL_GOAL, g as DELETE_FINANCIAL_GOAL, b as CREATE_FINANCIAL_GOAL } from './useGqlSchema-B7rdXc-g.mjs';
import { e as _sfc_main$6, a as _sfc_main$1$1, d as _sfc_main$4, _ as _sfc_main$5, c as _sfc_main$3$1, b as _sfc_main$2$1 } from './CardTitle-GwIPrVhf.mjs';
import { u as useCurrency } from './useCurrency-CzQKYynb.mjs';
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
import 'reka-ui';
import '@lucide/vue';
import '@iconify/utils/lib/css/icon';
import 'class-variance-authority';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'graphql-tag';

const financialGoalSchema = type({
  name: "string > 0",
  targetAmount: "number > 0",
  walletId: "string > 0",
  "deadline?": "string | null"
});
const useGoalsCrudStore = defineStore("crud-goals", () => {
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
    wallets: {}
  },
  emits: ["created"],
  setup(__props, { emit: __emit }) {
    const store = useGoalsCrudStore();
    const emit = __emit;
    const { $apolloClient } = useNuxtApp();
    const { mutate: createMutate } = useMutation(CREATE_FINANCIAL_GOAL);
    const { data: wallets } = useAsyncData(
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
    const createForm = useForm({
      defaultValues: {
        name: "",
        targetAmount: 0,
        walletId: "",
        deadline: null
      },
      validators: {
        onChange: financialGoalSchema,
        onSubmit: financialGoalSchema
      },
      onSubmit: async ({ value }) => {
        try {
          await createMutate({
            input: {
              ...value,
              deadline: value.deadline ? new Date(value.deadline).toISOString() : null
            }
          });
          toast.success("Target berhasil dibuat");
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
      () => wallets.value?.find((w) => w.id === createFormValues.value.walletId)?.name ?? "Pilih Dompet Sumber"
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSheet = _sfc_main$Z;
      const _component_UiSheetContent = _sfc_main$V;
      const _component_UiSheetHeader = _sfc_main$S;
      const _component_UiSheetTitle = _sfc_main$R;
      const _component_UiSheetDescription = _sfc_main$U;
      const _component_UiLabel = _sfc_main$3;
      const _component_UiInput = _sfc_main$H;
      const _component_UiSelect = _sfc_main$19;
      const _component_UiSelectTrigger = _sfc_main$10;
      const _component_UiSelectValue = _sfc_main$$;
      const _component_UiSelectContent = _sfc_main$18;
      const _component_UiSelectItem = _sfc_main$16;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UiSheet, mergeProps({
        open: unref(store).createOpen,
        "onUpdate:open": ($event) => unref(store).closeCreate()
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
                              _push5(`Tambah Target Menabung`);
                            } else {
                              return [
                                createTextVNode("Tambah Target Menabung")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tentukan target tabungan Anda dan pilih dompet sumbernya.`);
                            } else {
                              return [
                                createTextVNode("Tentukan target tabungan Anda dan pilih dompet sumbernya.")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Target Menabung")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Tentukan target tabungan Anda dan pilih dompet sumbernya.")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4 p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "name" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "name" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Target`);
                            } else {
                              return [
                                createTextVNode("Nama Target")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "name",
                          value: field.state.value,
                          placeholder: "Tabungan Rumah, Liburan, dsb",
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
                            createVNode(_component_UiLabel, { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Target")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "name",
                              value: field.state.value,
                              placeholder: "Tabungan Rumah, Liburan, dsb",
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
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "targetAmount" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "targetAmount" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Target Jumlah`);
                            } else {
                              return [
                                createTextVNode("Target Jumlah")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "targetAmount",
                          type: "number",
                          value: field.state.value,
                          placeholder: "0",
                          min: "0",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(
                            Number(e.target.value)
                          )
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
                            createVNode(_component_UiLabel, { for: "targetAmount" }, {
                              default: withCtx(() => [
                                createTextVNode("Target Jumlah")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "targetAmount",
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(
                                Number(e.target.value)
                              )
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
                              _push5(`Dompet Sumber`);
                            } else {
                              return [
                                createTextVNode("Dompet Sumber")
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
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
                                    (openBlock(true), createBlock(Fragment, null, renderList(unref(wallets), (wallet) => {
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
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Dompet Sumber")
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
                            }, 8, ["model-value", "onUpdate:modelValue"]),
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
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "deadline" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "deadline" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tenggat Waktu (Opsional)`);
                            } else {
                              return [
                                createTextVNode("Tenggat Waktu (Opsional)")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "deadline",
                          type: "date",
                          value: field.state.value ?? "",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(
                            e.target.value || null
                          )
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "deadline" }, {
                              default: withCtx(() => [
                                createTextVNode("Tenggat Waktu (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "deadline",
                              type: "date",
                              value: field.state.value ?? "",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(
                                e.target.value || null
                              )
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
                              _push5(` ${ssrInterpolate(isSubmitting ? "Menyimpan..." : "Simpan Target")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Target"), 1)
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
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Target"), 1)
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
                            createTextVNode("Tambah Target Menabung")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Tentukan target tabungan Anda dan pilih dompet sumbernya.")
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
                      createVNode(unref(createForm).Field, { name: "name" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Target")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "name",
                              value: field.state.value,
                              placeholder: "Tabungan Rumah, Liburan, dsb",
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
                      createVNode(unref(createForm).Field, { name: "targetAmount" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "targetAmount" }, {
                              default: withCtx(() => [
                                createTextVNode("Target Jumlah")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "targetAmount",
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(
                                Number(e.target.value)
                              )
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
                                createTextVNode("Dompet Sumber")
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
                            }, 8, ["model-value", "onUpdate:modelValue"]),
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
                      createVNode(unref(createForm).Field, { name: "deadline" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "deadline" }, {
                              default: withCtx(() => [
                                createTextVNode("Tenggat Waktu (Opsional)")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "deadline",
                              type: "date",
                              value: field.state.value ?? "",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(
                                e.target.value || null
                              )
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
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Target"), 1)
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
                          createTextVNode("Tambah Target Menabung")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Tentukan target tabungan Anda dan pilih dompet sumbernya.")
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
                    createVNode(unref(createForm).Field, { name: "name" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Nama Target")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "name",
                            value: field.state.value,
                            placeholder: "Tabungan Rumah, Liburan, dsb",
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
                    createVNode(unref(createForm).Field, { name: "targetAmount" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "targetAmount" }, {
                            default: withCtx(() => [
                              createTextVNode("Target Jumlah")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "targetAmount",
                            type: "number",
                            value: field.state.value,
                            placeholder: "0",
                            min: "0",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(
                              Number(e.target.value)
                            )
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
                              createTextVNode("Dompet Sumber")
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
                          }, 8, ["model-value", "onUpdate:modelValue"]),
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
                    createVNode(unref(createForm).Field, { name: "deadline" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "deadline" }, {
                            default: withCtx(() => [
                              createTextVNode("Tenggat Waktu (Opsional)")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "deadline",
                            type: "date",
                            value: field.state.value ?? "",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(
                              e.target.value || null
                            )
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
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Target"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/goals/create.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$2, { __name: "FormsGoalsCreate" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    goals: {},
    pending: { type: Boolean }
  },
  emits: ["delete", "allocate"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const { formatCurrency } = useCurrency();
    function calculateProgress(current, target) {
      return Math.min(Math.round(current / target * 100), 100);
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiSkeleton = _sfc_main$1a;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_Icon = __nuxt_component_1;
      const _component_UiCardDescription = _sfc_main$3$1;
      const _component_UiProgress = resolveComponent("UiProgress");
      const _component_UiCardFooter = _sfc_main$2$1;
      const _component_UiButton = _sfc_main$X;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-2 lg:grid-cols-3" }, _attrs))}>`);
      if (__props.pending) {
        _push(`<!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_UiCard, {
            key: i,
            class: "animate-pulse"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "h-24 bg-muted/50" }, null, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, { class: "space-y-2 p-4" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-3/4" }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-8 w-full" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiSkeleton, { class: "h-4 w-3/4" }),
                        createVNode(_component_UiSkeleton, { class: "h-8 w-full" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardHeader, { class: "h-24 bg-muted/50" }),
                  createVNode(_component_UiCardContent, { class: "space-y-2 p-4" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiSkeleton, { class: "h-4 w-3/4" }),
                      createVNode(_component_UiSkeleton, { class: "h-8 w-full" })
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]-->`);
      } else if (__props.goals.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.goals, (goal) => {
          _push(ssrRenderComponent(_component_UiCard, {
            key: goal.id
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="flex items-center justify-between"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-lg font-bold" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(goal.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(goal.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="rounded-full bg-primary/10 p-2 text-primary"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "lucide:trending-up",
                        class: "h-4 w-4"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div></div>`);
                      _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`Target: ${ssrInterpolate(unref(formatCurrency)(goal.targetAmount))}`);
                          } else {
                            return [
                              createTextVNode("Target: " + toDisplayString(unref(formatCurrency)(goal.targetAmount)), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode("div", { class: "flex items-center justify-between" }, [
                          createVNode(_component_UiCardTitle, { class: "text-lg font-bold" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(goal.name), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode("div", { class: "rounded-full bg-primary/10 p-2 text-primary" }, [
                            createVNode(_component_Icon, {
                              name: "lucide:trending-up",
                              class: "h-4 w-4"
                            })
                          ])
                        ]),
                        createVNode(_component_UiCardDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Target: " + toDisplayString(unref(formatCurrency)(goal.targetAmount)), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="mt-2 space-y-3"${_scopeId2}><div class="flex items-center justify-between text-sm"${_scopeId2}><span class="text-muted-foreground"${_scopeId2}>Terkumpul</span><span class="font-medium"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(goal.currentAmount))}</span></div>`);
                      _push3(ssrRenderComponent(_component_UiProgress, {
                        "model-value": calculateProgress(goal.currentAmount, goal.targetAmount),
                        class: "h-2"
                      }, null, _parent3, _scopeId2));
                      _push3(`<div class="flex items-center justify-between text-xs text-muted-foreground"${_scopeId2}><span${_scopeId2}>${ssrInterpolate(calculateProgress(goal.currentAmount, goal.targetAmount))}% Selesai</span>`);
                      if (goal.deadline) {
                        _push3(`<span${_scopeId2}> Sisa waktu: ${ssrInterpolate(new Date(String(goal.deadline)).toLocaleDateString("id-ID"))}</span>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div><div class="mt-4 flex items-center gap-1 text-xs text-muted-foreground"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: "lucide:wallet",
                        class: "h-3 w-3"
                      }, null, _parent3, _scopeId2));
                      _push3(`<span${_scopeId2}>${ssrInterpolate(goal.wallet?.name ?? "Wallet tidak ditemukan")}</span></div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "mt-2 space-y-3" }, [
                          createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                            createVNode("span", { class: "text-muted-foreground" }, "Terkumpul"),
                            createVNode("span", { class: "font-medium" }, toDisplayString(unref(formatCurrency)(goal.currentAmount)), 1)
                          ]),
                          createVNode(_component_UiProgress, {
                            "model-value": calculateProgress(goal.currentAmount, goal.targetAmount),
                            class: "h-2"
                          }, null, 8, ["model-value"]),
                          createVNode("div", { class: "flex items-center justify-between text-xs text-muted-foreground" }, [
                            createVNode("span", null, toDisplayString(calculateProgress(goal.currentAmount, goal.targetAmount)) + "% Selesai", 1),
                            goal.deadline ? (openBlock(), createBlock("span", { key: 0 }, " Sisa waktu: " + toDisplayString(new Date(String(goal.deadline)).toLocaleDateString("id-ID")), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("div", { class: "mt-4 flex items-center gap-1 text-xs text-muted-foreground" }, [
                            createVNode(_component_Icon, {
                              name: "lucide:wallet",
                              class: "h-3 w-3"
                            }),
                            createVNode("span", null, toDisplayString(goal.wallet?.name ?? "Wallet tidak ditemukan"), 1)
                          ])
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardFooter, { class: "flex justify-between border-t bg-muted/50 p-3" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => emit("allocate", goal.id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(` Alokasi Dana `);
                          } else {
                            return [
                              createTextVNode(" Alokasi Dana ")
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "ghost",
                        size: "icon",
                        class: "text-destructive hover:text-destructive",
                        onClick: ($event) => emit("delete", goal.id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: "lucide:trash-2",
                              class: "h-4 w-4"
                            }, null, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(_component_Icon, {
                                name: "lucide:trash-2",
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
                          size: "sm",
                          onClick: ($event) => emit("allocate", goal.id)
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Alokasi Dana ")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          variant: "ghost",
                          size: "icon",
                          class: "text-destructive hover:text-destructive",
                          onClick: ($event) => emit("delete", goal.id)
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_Icon, {
                              name: "lucide:trash-2",
                              class: "h-4 w-4"
                            })
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
                  createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode(_component_UiCardTitle, { class: "text-lg font-bold" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(goal.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "rounded-full bg-primary/10 p-2 text-primary" }, [
                          createVNode(_component_Icon, {
                            name: "lucide:trending-up",
                            class: "h-4 w-4"
                          })
                        ])
                      ]),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Target: " + toDisplayString(unref(formatCurrency)(goal.targetAmount)), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "mt-2 space-y-3" }, [
                        createVNode("div", { class: "flex items-center justify-between text-sm" }, [
                          createVNode("span", { class: "text-muted-foreground" }, "Terkumpul"),
                          createVNode("span", { class: "font-medium" }, toDisplayString(unref(formatCurrency)(goal.currentAmount)), 1)
                        ]),
                        createVNode(_component_UiProgress, {
                          "model-value": calculateProgress(goal.currentAmount, goal.targetAmount),
                          class: "h-2"
                        }, null, 8, ["model-value"]),
                        createVNode("div", { class: "flex items-center justify-between text-xs text-muted-foreground" }, [
                          createVNode("span", null, toDisplayString(calculateProgress(goal.currentAmount, goal.targetAmount)) + "% Selesai", 1),
                          goal.deadline ? (openBlock(), createBlock("span", { key: 0 }, " Sisa waktu: " + toDisplayString(new Date(String(goal.deadline)).toLocaleDateString("id-ID")), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("div", { class: "mt-4 flex items-center gap-1 text-xs text-muted-foreground" }, [
                          createVNode(_component_Icon, {
                            name: "lucide:wallet",
                            class: "h-3 w-3"
                          }),
                          createVNode("span", null, toDisplayString(goal.wallet?.name ?? "Wallet tidak ditemukan"), 1)
                        ])
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_UiCardFooter, { class: "flex justify-between border-t bg-muted/50 p-3" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        size: "sm",
                        onClick: ($event) => emit("allocate", goal.id)
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Alokasi Dana ")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(_component_UiButton, {
                        variant: "ghost",
                        size: "icon",
                        class: "text-destructive hover:text-destructive",
                        onClick: ($event) => emit("delete", goal.id)
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_Icon, {
                            name: "lucide:trash-2",
                            class: "h-4 w-4"
                          })
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
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="col-span-3 flex h-50 flex-col items-center justify-center rounded-lg border border-dashed text-center"><p class="text-muted-foreground">Belum ada target menabung</p></div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tables/goals/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_3 = Object.assign(_sfc_main$1, { __name: "TablesGoalsList" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "goals",
  __ssrInlineRender: true,
  setup(__props) {
    const { $apolloClient } = useNuxtApp();
    useHead({
      title: "Target Menabung - MyUangGwe | Financial Goals",
      meta: [
        {
          name: "description",
          content: "Tetapkan tujuan finansial, pantau progres menabung, dan alokasikan dana secara otomatis untuk setiap target keuangan Anda."
        },
        {
          name: "keywords",
          content: "target menabung, financial goals, tujuan keuangan, nabung rutin, manajemen keuangan"
        }
      ]
    });
    const {
      data: goalsData,
      pending,
      refresh: refreshGoals
    } = useAsyncData(
      "goals",
      async () => {
        const result = await $apolloClient.query({
          query: GET_FINANCIAL_GOALS,
          fetchPolicy: "network-only"
        });
        return result.data.financialGoals;
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
    const goals = computed(() => goalsData.value ?? []);
    const wallets = computed(() => walletsData.value ?? []);
    const goalsCrudStore = useGoalsCrudStore();
    const { mutate: updateMutate } = useMutation(UPDATE_FINANCIAL_GOAL);
    const { mutate: deleteMutate } = useMutation(DELETE_FINANCIAL_GOAL);
    async function handleAllocate(id) {
      const goal = goals.value.find((g) => g.id === id);
      if (!goal) return;
      const input = prompt("Masukkan jumlah dana yang ingin dialokasikan:");
      if (!input || isNaN(Number(input))) return;
      try {
        await updateMutate({
          id: goal.id,
          input: { currentAmount: goal.currentAmount + Number(input) }
        });
        toast.success("Alokasi dana berhasil");
        await refreshGoals();
      } catch {
        toast.error("Gagal mengalokasikan dana");
      }
    }
    async function handleDelete(id) {
      try {
        await deleteMutate({ id });
        toast.success("Target berhasil dihapus");
        await refreshGoals();
      } catch {
        toast.error("Gagal menghapus target");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      const _component_FormsGoalsCreate = __nuxt_component_2;
      const _component_TablesGoalsList = __nuxt_component_3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-2"><div><h1 class="text-3xl font-bold tracking-tight">Target Menabung</h1><p class="text-muted-foreground">Atur dan pantau target keuangan Anda.</p></div>`);
      _push(ssrRenderComponent(_component_UiButton, {
        onClick: ($event) => unref(goalsCrudStore).openCreate()
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:plus",
              class: "mr-2 h-4 w-4"
            }, null, _parent2, _scopeId));
            _push2(` Tambah Target `);
          } else {
            return [
              createVNode(_component_Icon, {
                name: "lucide:plus",
                class: "mr-2 h-4 w-4"
              }),
              createTextVNode(" Tambah Target ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_FormsGoalsCreate, {
        wallets: unref(wallets),
        onCreated: ($event) => unref(refreshGoals)()
      }, null, _parent));
      _push(ssrRenderComponent(_component_TablesGoalsList, {
        goals: unref(goals),
        pending: unref(pending),
        onDelete: handleDelete,
        onAllocate: handleAllocate
      }, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/goals.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=goals-CmM55dHr.mjs.map
