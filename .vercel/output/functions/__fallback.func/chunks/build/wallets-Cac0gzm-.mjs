import { f as _sfc_main$9, _ as _sfc_main$4, e as _sfc_main$6, b as _sfc_main$3$1, a as _sfc_main$1$1 } from './DialogTrigger-Bsj6TWLg.mjs';
import { D as useNuxtApp, B as useHead, A as useAsyncData, c as _sfc_main$X, a as __nuxt_component_1$1, b as _sfc_main$H, d as _sfc_main$19, e as _sfc_main$10, f as _sfc_main$$, g as _sfc_main$18, h as _sfc_main$16, i as _sfc_main$Z, j as _sfc_main$V, k as _sfc_main$S, l as _sfc_main$R, m as _sfc_main$U, n as _sfc_main$1a, o as _sfc_main$i, p as _sfc_main$5$1, q as _sfc_main$g, r as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$5 } from './Label-DoBiuCH1.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, watch, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { useMutation } from '@vue/apollo-composable';
import { toast } from 'vue-sonner';
import { useForm } from '@tanstack/vue-form';
import { defineStore } from 'pinia';
import { type } from 'arktype';
import { o as GET_WALLETS, j as DELETE_WALLET, e as CREATE_WALLET, s as UPDATE_WALLET } from './useGqlSchema-B7rdXc-g.mjs';
import { e as _sfc_main$6$1, a as _sfc_main$1$2, d as _sfc_main$4$1, _ as _sfc_main$7 } from './CardTitle-GwIPrVhf.mjs';
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

const useWalletsCrudStore = defineStore("crud-wallets", () => {
  const createOpen = ref(false);
  const editOpen = ref(false);
  const editingItem = ref(null);
  function openCreate() {
    createOpen.value = true;
  }
  function closeCreate() {
    createOpen.value = false;
  }
  function openEdit(item) {
    editingItem.value = item;
    editOpen.value = true;
  }
  function closeEdit() {
    editOpen.value = false;
    editingItem.value = null;
  }
  return { createOpen, editOpen, editingItem, openCreate, closeCreate, openEdit, closeEdit };
});
const walletSchema = type({
  name: "string > 0",
  type: '"cash" | "bank" | "credit_card"',
  balance: "number >= 0",
  currency: '"IDR" | "USD" | "EUR" | "GBP" | "JPY"'
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  emits: ["created"],
  setup(__props, { emit: __emit }) {
    const store = useWalletsCrudStore();
    const emit = __emit;
    const { mutate: createMutate } = useMutation(CREATE_WALLET);
    const typeOptions = [
      { value: "cash", label: "Tunai (Cash)" },
      { value: "bank", label: "Bank / E-Wallet" },
      { value: "credit_card", label: "Kartu Kredit" }
    ];
    const currencyOptions = [
      { value: "IDR", label: "IDR - Rupiah" },
      { value: "USD", label: "USD - Dollar" },
      { value: "EUR", label: "EUR - Euro" },
      { value: "GBP", label: "GBP - Pound" },
      { value: "JPY", label: "JPY - Yen" }
    ];
    const createForm = useForm({
      validators: {
        onChange: walletSchema,
        onSubmit: walletSchema
      },
      defaultValues: {
        name: "",
        type: "cash",
        balance: 0,
        currency: "IDR"
      },
      onSubmit: async ({ value }) => {
        try {
          await createMutate({ input: value });
          toast.success("Dompet berhasil dibuat");
          store.closeCreate();
          createForm.reset();
          emit("created");
        } catch {
          toast.error("Gagal membuat dompet");
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogTrigger = _sfc_main$4;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1$1;
      const _component_UiDialogContent = _sfc_main$6;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$1;
      const _component_UiLabel = _sfc_main$5;
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
                        _push4(` Tambah Dompet `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "lucide:plus",
                            class: "h-4 w-4"
                          }),
                          createTextVNode(" Tambah Dompet ")
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
                        createTextVNode(" Tambah Dompet ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiDialogContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Buat Dompet Baru`);
                            } else {
                              return [
                                createTextVNode("Buat Dompet Baru")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Buat Dompet Baru")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4 pt-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "name" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, {
                          for: field.name
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Dompet`);
                            } else {
                              return [
                                createTextVNode("Nama Dompet")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: field.name,
                          type: "text",
                          value: field.state.value,
                          placeholder: "BCA, Dana, dll",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        if (!field.state.meta.isValid) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}><!--[-->`);
                          ssrRenderList(field.state.meta.errors, (err, i) => {
                            _push4(`<span class="block"${_scopeId3}> * ${ssrInterpolate(err.message)}</span>`);
                          });
                          _push4(`<!--]--></p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Dompet")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "text",
                              value: field.state.value,
                              placeholder: "BCA, Dana, dll",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "balance" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, {
                          for: field.name
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Saldo Awal`);
                            } else {
                              return [
                                createTextVNode("Saldo Awal")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: field.name,
                          type: "number",
                          value: field.state.value,
                          placeholder: "0",
                          min: "0",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(Number(e.target.value))
                        }, null, _parent4, _scopeId3));
                        if (!field.state.meta.isValid) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}><!--[-->`);
                          ssrRenderList(field.state.meta.errors, (err, i) => {
                            _push4(`<span class="block"${_scopeId3}> * ${ssrInterpolate(err.message)}</span>`);
                          });
                          _push4(`<!--]--></p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Saldo Awal")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(Number(e.target.value))
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}>`);
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
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "currency" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Mata Uang`);
                            } else {
                              return [
                                createTextVNode("Mata Uang")
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
                                          _push7(`${ssrInterpolate(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
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
                                    ssrRenderList(currencyOptions, (opt) => {
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
                                      (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                                        createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                                createTextVNode("Mata Uang")
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
                                        createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(createForm).Subscribe, null, {
                    default: withCtx(({ isSubmitting, canSubmit }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: isSubmitting || !canSubmit
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
                              _push5(` ${ssrInterpolate(isSubmitting ? "Menyimpan..." : "Simpan Dompet")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Dompet"), 1)
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
                            disabled: isSubmitting || !canSubmit
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Dompet"), 1)
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
                            createTextVNode("Buat Dompet Baru")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4 pt-4",
                      onSubmit: withModifiers(($event) => unref(createForm).handleSubmit(), ["prevent"])
                    }, [
                      createVNode(unref(createForm).Field, { name: "name" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Dompet")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "text",
                              value: field.state.value,
                              placeholder: "BCA, Dana, dll",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(createForm).Field, { name: "balance" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Saldo Awal")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(Number(e.target.value))
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
                        createVNode(unref(createForm).Field, { name: "currency" }, {
                          default: withCtx(({ field }) => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(_component_UiLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Mata Uang")
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
                                          createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                        })
                      ]),
                      createVNode(unref(createForm).Subscribe, null, {
                        default: withCtx(({ isSubmitting, canSubmit }) => [
                          createVNode(_component_UiButton, {
                            type: "submit",
                            class: "w-full",
                            disabled: isSubmitting || !canSubmit
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Dompet"), 1)
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
                      createTextVNode(" Tambah Dompet ")
                    ]),
                    _: 1
                  }, 8, ["onClick"])
                ]),
                _: 1
              }),
              createVNode(_component_UiDialogContent, null, {
                default: withCtx(() => [
                  createVNode(_component_UiDialogHeader, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiDialogTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Buat Dompet Baru")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4 pt-4",
                    onSubmit: withModifiers(($event) => unref(createForm).handleSubmit(), ["prevent"])
                  }, [
                    createVNode(unref(createForm).Field, { name: "name" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, {
                            for: field.name
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Nama Dompet")
                            ]),
                            _: 1
                          }, 8, ["for"]),
                          createVNode(_component_UiInput, {
                            id: field.name,
                            type: "text",
                            value: field.state.value,
                            placeholder: "BCA, Dana, dll",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["id", "value", "onBlur", "onInput"]),
                          !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                              return openBlock(), createBlock("span", {
                                key: i,
                                class: "block"
                              }, " * " + toDisplayString(err.message), 1);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(createForm).Field, { name: "balance" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, {
                            for: field.name
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Saldo Awal")
                            ]),
                            _: 1
                          }, 8, ["for"]),
                          createVNode(_component_UiInput, {
                            id: field.name,
                            type: "number",
                            value: field.state.value,
                            placeholder: "0",
                            min: "0",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(Number(e.target.value))
                          }, null, 8, ["id", "value", "onBlur", "onInput"]),
                          !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                              return openBlock(), createBlock("span", {
                                key: i,
                                class: "block"
                              }, " * " + toDisplayString(err.message), 1);
                            }), 128))
                          ])) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
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
                      createVNode(unref(createForm).Field, { name: "currency" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Mata Uang")
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
                                        createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                      })
                    ]),
                    createVNode(unref(createForm).Subscribe, null, {
                      default: withCtx(({ isSubmitting, canSubmit }) => [
                        createVNode(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: isSubmitting || !canSubmit
                        }, {
                          default: withCtx(() => [
                            isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Dompet"), 1)
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/wallets/create.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "FormsWalletsCreate" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const store = useWalletsCrudStore();
    const emit = __emit;
    const { mutate: updateMutate } = useMutation(UPDATE_WALLET);
    const typeOptions = [
      { value: "cash", label: "Tunai (Cash)" },
      { value: "bank", label: "Bank / E-Wallet" },
      { value: "credit_card", label: "Kartu Kredit" }
    ];
    const currencyOptions = [
      { value: "IDR", label: "IDR - Rupiah" },
      { value: "USD", label: "USD - Dollar" },
      { value: "EUR", label: "EUR - Euro" },
      { value: "GBP", label: "GBP - Pound" },
      { value: "JPY", label: "JPY - Yen" }
    ];
    const editForm = useForm({
      defaultValues: {
        name: "",
        type: "cash",
        balance: 0,
        currency: "IDR"
      },
      validators: {
        onSubmit: walletSchema,
        onChange: walletSchema
      },
      onSubmit: async ({ value }) => {
        if (!store.editingItem) return;
        try {
          await updateMutate({ id: store.editingItem.id, input: value });
          toast.success("Dompet berhasil diubah");
          store.closeEdit();
          emit("updated");
        } catch {
          toast.error("Gagal mengubah dompet");
        }
      }
    });
    watch(() => store.editingItem, (item) => {
      if (!item) return;
      editForm.setFieldValue("name", item.name);
      editForm.setFieldValue("type", item.type);
      editForm.setFieldValue("balance", item.balance);
      editForm.setFieldValue("currency", item.currency);
    }, { immediate: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSheet = _sfc_main$Z;
      const _component_UiSheetContent = _sfc_main$V;
      const _component_UiSheetHeader = _sfc_main$S;
      const _component_UiSheetTitle = _sfc_main$R;
      const _component_UiSheetDescription = _sfc_main$U;
      const _component_UiLabel = _sfc_main$5;
      const _component_UiInput = _sfc_main$H;
      const _component_UiSelect = _sfc_main$19;
      const _component_UiSelectTrigger = _sfc_main$10;
      const _component_UiSelectValue = _sfc_main$$;
      const _component_UiSelectContent = _sfc_main$18;
      const _component_UiSelectItem = _sfc_main$16;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1$1;
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
                              _push5(`Edit ${ssrInterpolate(unref(store).editingItem?.name)}`);
                            } else {
                              return [
                                createTextVNode("Edit " + toDisplayString(unref(store).editingItem?.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Ubah informasi dompet ${ssrInterpolate(unref(store).editingItem?.name)}`);
                            } else {
                              return [
                                createTextVNode("Ubah informasi dompet " + toDisplayString(unref(store).editingItem?.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit " + toDisplayString(unref(store).editingItem?.name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Ubah informasi dompet " + toDisplayString(unref(store).editingItem?.name), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4 p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(editForm).Field, { name: "name" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, {
                          for: field.name
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama Dompet`);
                            } else {
                              return [
                                createTextVNode("Nama Dompet")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: field.name,
                          type: "text",
                          value: field.state.value,
                          placeholder: "BCA, Dana, dll",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        if (!field.state.meta.isValid) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}><!--[-->`);
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
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Dompet")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "text",
                              value: field.state.value,
                              placeholder: "BCA, Dana, dll",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
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
                  _push3(ssrRenderComponent(unref(editForm).Field, { name: "balance" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, {
                          for: field.name
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Saldo`);
                            } else {
                              return [
                                createTextVNode("Saldo")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: field.name,
                          type: "number",
                          value: field.state.value,
                          placeholder: "0",
                          min: "0",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(Number(e.target.value))
                        }, null, _parent4, _scopeId3));
                        if (!field.state.meta.isValid) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}><!--[-->`);
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
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Saldo")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(Number(e.target.value))
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
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
                  _push3(`<div class="grid grid-cols-2 gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(editForm).Field, { name: "type" }, {
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
                  _push3(ssrRenderComponent(unref(editForm).Field, { name: "currency" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Mata Uang`);
                            } else {
                              return [
                                createTextVNode("Mata Uang")
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
                                          _push7(`${ssrInterpolate(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
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
                                    ssrRenderList(currencyOptions, (opt) => {
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
                                      (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                                        createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                                createTextVNode("Mata Uang")
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
                                        createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(unref(editForm).Subscribe, null, {
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
                            createTextVNode("Edit " + toDisplayString(unref(store).editingItem?.name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Ubah informasi dompet " + toDisplayString(unref(store).editingItem?.name), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode("form", {
                      class: "space-y-4 p-4",
                      onSubmit: withModifiers(($event) => unref(editForm).handleSubmit(), ["prevent"])
                    }, [
                      createVNode(unref(editForm).Field, { name: "name" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Dompet")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "text",
                              value: field.state.value,
                              placeholder: "BCA, Dana, dll",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
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
                      createVNode(unref(editForm).Field, { name: "balance" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Saldo")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              type: "number",
                              value: field.state.value,
                              placeholder: "0",
                              min: "0",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(Number(e.target.value))
                            }, null, 8, ["id", "value", "onBlur", "onInput"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
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
                      createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                        createVNode(unref(editForm).Field, { name: "type" }, {
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
                        createVNode(unref(editForm).Field, { name: "currency" }, {
                          default: withCtx(({ field }) => [
                            createVNode("div", { class: "space-y-2" }, [
                              createVNode(_component_UiLabel, null, {
                                default: withCtx(() => [
                                  createTextVNode("Mata Uang")
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
                                          createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiSelectContent, null, {
                                    default: withCtx(() => [
                                      (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                        })
                      ]),
                      createVNode(unref(editForm).Subscribe, null, {
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
                          createTextVNode("Edit " + toDisplayString(unref(store).editingItem?.name), 1)
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Ubah informasi dompet " + toDisplayString(unref(store).editingItem?.name), 1)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode("form", {
                    class: "space-y-4 p-4",
                    onSubmit: withModifiers(($event) => unref(editForm).handleSubmit(), ["prevent"])
                  }, [
                    createVNode(unref(editForm).Field, { name: "name" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, {
                            for: field.name
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Nama Dompet")
                            ]),
                            _: 1
                          }, 8, ["for"]),
                          createVNode(_component_UiInput, {
                            id: field.name,
                            type: "text",
                            value: field.state.value,
                            placeholder: "BCA, Dana, dll",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["id", "value", "onBlur", "onInput"]),
                          !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
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
                    createVNode(unref(editForm).Field, { name: "balance" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, {
                            for: field.name
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Saldo")
                            ]),
                            _: 1
                          }, 8, ["for"]),
                          createVNode(_component_UiInput, {
                            id: field.name,
                            type: "number",
                            value: field.state.value,
                            placeholder: "0",
                            min: "0",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(Number(e.target.value))
                          }, null, 8, ["id", "value", "onBlur", "onInput"]),
                          !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
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
                    createVNode("div", { class: "grid grid-cols-2 gap-4" }, [
                      createVNode(unref(editForm).Field, { name: "type" }, {
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
                      createVNode(unref(editForm).Field, { name: "currency" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Mata Uang")
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
                                        createTextVNode(toDisplayString(currencyOptions.find((c) => c.value === field.state.value)?.label ?? "Pilih Mata Uang"), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(currencyOptions, (opt) => {
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
                      })
                    ]),
                    createVNode(unref(editForm).Subscribe, null, {
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/wallets/edit.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "FormsWalletsEdit" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    wallets: {},
    pending: { type: Boolean }
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const store = useWalletsCrudStore();
    const { formatCurrency } = useCurrency();
    const icons = {
      bank: "lucide:landmark",
      credit_card: "lucide:credit-card",
      cash: "lucide:banknote"
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6$1;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiSkeleton = _sfc_main$1a;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiCardTitle = _sfc_main$7;
      const _component_Icon = __nuxt_component_1$1;
      const _component_UiDropdownMenu = _sfc_main$i;
      const _component_UiDropdownMenuTrigger = _sfc_main$5$1;
      const _component_UiButton = _sfc_main$X;
      const _component_UiDropdownMenuContent = _sfc_main$g;
      const _component_UiDropdownMenuItem = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "grid gap-4 md:grid-cols-3" }, _attrs))}>`);
      if (__props.pending) {
        _push(`<!--[-->`);
        ssrRenderList(6, (i) => {
          _push(ssrRenderComponent(_component_UiCard, { key: i }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-24" }, null, _parent3, _scopeId2));
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-9 w-9 rounded-md" }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-9 w-9 rounded-md" }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode(_component_UiSkeleton, { class: "h-4 w-24" }),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode(_component_UiSkeleton, { class: "h-9 w-9 rounded-md" }),
                          createVNode(_component_UiSkeleton, { class: "h-9 w-9 rounded-md" })
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "mb-2 h-8 w-32" }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-16" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiSkeleton, { class: "mb-2 h-8 w-32" }),
                        createVNode(_component_UiSkeleton, { class: "h-4 w-16" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiSkeleton, { class: "h-4 w-24" }),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode(_component_UiSkeleton, { class: "h-9 w-9 rounded-md" }),
                        createVNode(_component_UiSkeleton, { class: "h-9 w-9 rounded-md" })
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiSkeleton, { class: "mb-2 h-8 w-32" }),
                      createVNode(_component_UiSkeleton, { class: "h-4 w-16" })
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
      } else {
        _push(`<!--[--><!--[-->`);
        ssrRenderList(__props.wallets, (wallet) => {
          _push(ssrRenderComponent(_component_UiCard, {
            key: wallet.id
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`${ssrInterpolate(wallet.name)}`);
                          } else {
                            return [
                              createTextVNode(toDisplayString(wallet.name), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`<div class="flex items-center gap-2"${_scopeId2}><div class="rounded-md border-2 p-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_Icon, {
                        name: icons[wallet.type] ?? "lucide:banknote",
                        class: "h-4 w-4"
                      }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_UiDropdownMenu, null, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_UiButton, {
                                    variant: "outline",
                                    size: "icon"
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_Icon, {
                                          name: "lucide:more-vertical",
                                          class: "h-4 w-4"
                                        }, null, _parent6, _scopeId5));
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
                                  }, _parent5, _scopeId4));
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
                            }, _parent4, _scopeId3));
                            _push4(ssrRenderComponent(_component_UiDropdownMenuContent, { align: "end" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(ssrRenderComponent(_component_UiDropdownMenuItem, {
                                    onClick: ($event) => unref(store).openEdit(wallet)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_Icon, {
                                          name: "lucide:pencil",
                                          class: "mr-2 h-4 w-4"
                                        }, null, _parent6, _scopeId5));
                                        _push6(` Edit `);
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
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(_component_UiDropdownMenuItem, {
                                    class: "text-destructive focus:text-destructive",
                                    onClick: ($event) => emit("delete", wallet.id)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_Icon, {
                                          name: "lucide:trash-2",
                                          class: "mr-2 h-4 w-4"
                                        }, null, _parent6, _scopeId5));
                                        _push6(` Hapus `);
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
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode(_component_UiDropdownMenuItem, {
                                      onClick: ($event) => unref(store).openEdit(wallet)
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
                                      onClick: ($event) => emit("delete", wallet.id)
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
                            }, _parent4, _scopeId3));
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
                                    onClick: ($event) => unref(store).openEdit(wallet)
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
                                    onClick: ($event) => emit("delete", wallet.id)
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
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    } else {
                      return [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(wallet.name), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode("div", { class: "flex items-center gap-2" }, [
                          createVNode("div", { class: "rounded-md border-2 p-2" }, [
                            createVNode(_component_Icon, {
                              name: icons[wallet.type] ?? "lucide:banknote",
                              class: "h-4 w-4"
                            }, null, 8, ["name"])
                          ]),
                          createVNode(_component_UiDropdownMenu, null, {
                            default: withCtx(() => [
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
                                    onClick: ($event) => unref(store).openEdit(wallet)
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
                                    onClick: ($event) => emit("delete", wallet.id)
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
                            ]),
                            _: 2
                          }, 1024)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(wallet.balance, wallet.currency))}</div><p class="text-xs capitalize text-muted-foreground"${_scopeId2}>${ssrInterpolate(wallet.type.replace("_", " "))}</p>`);
                    } else {
                      return [
                        createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(wallet.balance, wallet.currency)), 1),
                        createVNode("p", { class: "text-xs capitalize text-muted-foreground" }, toDisplayString(wallet.type.replace("_", " ")), 1)
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                    default: withCtx(() => [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(wallet.name), 1)
                        ]),
                        _: 2
                      }, 1024),
                      createVNode("div", { class: "flex items-center gap-2" }, [
                        createVNode("div", { class: "rounded-md border-2 p-2" }, [
                          createVNode(_component_Icon, {
                            name: icons[wallet.type] ?? "lucide:banknote",
                            class: "h-4 w-4"
                          }, null, 8, ["name"])
                        ]),
                        createVNode(_component_UiDropdownMenu, null, {
                          default: withCtx(() => [
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
                                  onClick: ($event) => unref(store).openEdit(wallet)
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
                                  onClick: ($event) => emit("delete", wallet.id)
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
                          ]),
                          _: 2
                        }, 1024)
                      ])
                    ]),
                    _: 2
                  }, 1024),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(wallet.balance, wallet.currency)), 1),
                      createVNode("p", { class: "text-xs capitalize text-muted-foreground" }, toDisplayString(wallet.type.replace("_", " ")), 1)
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
        if (__props.wallets.length === 0) {
          _push(`<div class="col-span-3 py-10 text-center text-muted-foreground"> Belum ada dompet. Tambah dompet pertama kamu! </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tables/wallets/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "TablesWalletsList" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "wallets",
  __ssrInlineRender: true,
  setup(__props) {
    const { $apolloClient } = useNuxtApp();
    useHead({
      title: "Dompet - MyUangGwe | Kelola Rekening & Saldo Keuangan",
      meta: [
        {
          name: "description",
          content: "Kelola semua rekening dan dompet keuangan Anda - bank, kartu kredit, dan tunai - dalam satu tempat."
        },
        {
          name: "keywords",
          content: "dompet digital, rekening bank, manajemen saldo, pengelolaan keuangan, aplikasi keuangan"
        }
      ]
    });
    const {
      data: walletsData,
      pending,
      refresh: refreshWallets
    } = useAsyncData(
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
    const wallets = computed(() => walletsData.value ?? []);
    const { mutate: deleteMutate } = useMutation(DELETE_WALLET);
    async function handleDelete(id) {
      try {
        await deleteMutate({ id });
        toast.success("Dompet dihapus");
        await refreshWallets();
      } catch {
        toast.error("Gagal menghapus dompet");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormsWalletsCreate = __nuxt_component_0;
      const _component_FormsWalletsEdit = __nuxt_component_1;
      const _component_TablesWalletsList = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-2"><div><h1 class="text-3xl font-bold tracking-tight">Dompet Saya</h1><p class="text-sm text-muted-foreground"> Kelola rekening keuangan kamu. </p></div>`);
      _push(ssrRenderComponent(_component_FormsWalletsCreate, {
        onCreated: ($event) => unref(refreshWallets)()
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_FormsWalletsEdit, {
        onUpdated: ($event) => unref(refreshWallets)()
      }, null, _parent));
      _push(ssrRenderComponent(_component_TablesWalletsList, {
        wallets: unref(wallets),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/wallets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=wallets-Cac0gzm-.mjs.map
