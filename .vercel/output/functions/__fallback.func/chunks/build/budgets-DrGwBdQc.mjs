import { f as _sfc_main$9, _ as _sfc_main$4, e as _sfc_main$6, b as _sfc_main$3$1, a as _sfc_main$1$1 } from './DialogTrigger-Bsj6TWLg.mjs';
import { D as useNuxtApp, B as useHead, A as useAsyncData, c as _sfc_main$X, a as __nuxt_component_1$1, b as _sfc_main$H, d as _sfc_main$19, e as _sfc_main$10, f as _sfc_main$$, g as _sfc_main$18, h as _sfc_main$16, i as _sfc_main$Z, j as _sfc_main$V, k as _sfc_main$S, l as _sfc_main$R, m as _sfc_main$U, n as _sfc_main$1a, o as _sfc_main$i, p as _sfc_main$5$1, q as _sfc_main$g, r as _sfc_main$e } from './server.mjs';
import { _ as _sfc_main$5 } from './Label-DoBiuCH1.mjs';
import { defineComponent, computed, mergeProps, unref, ref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, watch, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass, ssrRenderStyle } from 'vue/server-renderer';
import { useMutation } from '@vue/apollo-composable';
import { toast } from 'vue-sonner';
import { useForm } from '@tanstack/vue-form';
import { type } from 'arktype';
import { defineStore } from 'pinia';
import { G as GET_BUDGETS, k as GET_CATEGORIES, D as DELETE_BUDGET, C as CREATE_BUDGET, U as UPDATE_BUDGET } from './useGqlSchema-B7rdXc-g.mjs';
import { _ as _sfc_main$7 } from './index-dZMOOFG9.mjs';
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

const budgetSchema = type({
  amount: "number > 0",
  period: '"monthly" | "yearly"',
  categoryId: "string > 0"
});
const useBudgetsCrudStore = defineStore("crud-budgets", () => {
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
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  props: {
    expenseCategories: {}
  },
  emits: ["created"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const store = useBudgetsCrudStore();
    const emit = __emit;
    const { mutate: createMutate } = useMutation(CREATE_BUDGET);
    const periodOptions = [
      { value: "monthly", label: "Bulanan (Monthly)" },
      { value: "yearly", label: "Tahunan (Yearly)" }
    ];
    const createForm = useForm({
      defaultValues: {
        amount: 0,
        period: "monthly",
        categoryId: ""
      },
      validators: {
        onChange: budgetSchema,
        onSubmit: budgetSchema
      },
      onSubmit: async ({ value }) => {
        try {
          await createMutate({ input: value });
          toast.success("Anggaran berhasil dibuat");
          store.closeCreate();
          createForm.reset();
          emit("created");
        } catch {
          toast.error("Terjadi kesalahan");
        }
      }
    });
    const createFormValues = createForm.useStore((s) => s.values);
    const selectedCreateCategory = computed(
      () => props.expenseCategories.find((c) => c.id === createFormValues.value.categoryId)?.name ?? "Pilih Kategori"
    );
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
                        _push4(` Tambah Anggaran `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "lucide:plus",
                            class: "h-4 w-4"
                          }),
                          createTextVNode(" Tambah Anggaran ")
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
                        createTextVNode(" Tambah Anggaran ")
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
                              _push5(`Tambah Anggaran`);
                            } else {
                              return [
                                createTextVNode("Tambah Anggaran")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Anggaran")
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
                              _push5(`Jumlah Anggaran`);
                            } else {
                              return [
                                createTextVNode("Jumlah Anggaran")
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
                                createTextVNode("Jumlah Anggaran")
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
                                          _push7(`${ssrInterpolate(unref(selectedCreateCategory))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(selectedCreateCategory)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(selectedCreateCategory)), 1)
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
                                    ssrRenderList(__props.expenseCategories, (cat) => {
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                                        createTextVNode(toDisplayString(unref(selectedCreateCategory)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                                        createTextVNode(toDisplayString(unref(selectedCreateCategory)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                  _push3(ssrRenderComponent(unref(createForm).Field, { name: "period" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Periode`);
                            } else {
                              return [
                                createTextVNode("Periode")
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
                                          _push7(`${ssrInterpolate(periodOptions.find((p) => p.value === field.state.value)?.label)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
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
                                    ssrRenderList(periodOptions, (opt) => {
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
                                      (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                                        createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                                createTextVNode("Periode")
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
                                        createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                            }, 1032, ["model-value", "onUpdate:modelValue"]),
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
                              _push5(` ${ssrInterpolate(isSubmitting ? "Menyimpan..." : "Simpan Anggaran")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Anggaran"), 1)
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
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Anggaran"), 1)
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
                            createTextVNode("Tambah Anggaran")
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
                                createTextVNode("Jumlah Anggaran")
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
                      createVNode(unref(createForm).Field, { name: "categoryId" }, {
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
                                        createTextVNode(toDisplayString(unref(selectedCreateCategory)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                      createVNode(unref(createForm).Field, { name: "period" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Periode")
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
                                        createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                            }, 1032, ["model-value", "onUpdate:modelValue"]),
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
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Anggaran"), 1)
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
                      createTextVNode(" Tambah Anggaran ")
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
                          createTextVNode("Tambah Anggaran")
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
                              createTextVNode("Jumlah Anggaran")
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
                    createVNode(unref(createForm).Field, { name: "categoryId" }, {
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
                                      createTextVNode(toDisplayString(unref(selectedCreateCategory)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                    createVNode(unref(createForm).Field, { name: "period" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Periode")
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
                                      createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                          }, 1032, ["model-value", "onUpdate:modelValue"]),
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
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Simpan Anggaran"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/budgets/create.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_0 = Object.assign(_sfc_main$3, { __name: "FormsBudgetsCreate" });
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "edit",
  __ssrInlineRender: true,
  props: {
    expenseCategories: {}
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const store = useBudgetsCrudStore();
    const emit = __emit;
    const { mutate: updateMutate } = useMutation(UPDATE_BUDGET);
    const periodOptions = [
      { value: "monthly", label: "Bulanan (Monthly)" },
      { value: "yearly", label: "Tahunan (Yearly)" }
    ];
    const editForm = useForm({
      defaultValues: {
        amount: 0,
        period: "monthly",
        categoryId: ""
      },
      validators: {
        onChange: budgetSchema,
        onSubmit: budgetSchema
      },
      onSubmit: async ({ value }) => {
        if (!store.editingItem) return;
        try {
          await updateMutate({ id: store.editingItem.id, input: value });
          toast.success("Anggaran berhasil diubah");
          store.closeEdit();
          emit("updated");
        } catch {
          toast.error("Terjadi kesalahan");
        }
      }
    });
    const editFormValues = editForm.useStore((s) => s.values);
    const selectedEditCategory = computed(
      () => props.expenseCategories.find((c) => c.id === editFormValues.value.categoryId)?.name ?? "Pilih Kategori"
    );
    watch(() => store.editingItem, (item) => {
      if (!item) return;
      editForm.setFieldValue("amount", item.amount);
      editForm.setFieldValue("period", item.period);
      editForm.setFieldValue("categoryId", item.categoryId);
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
                              _push5(`Edit Anggaran`);
                            } else {
                              return [
                                createTextVNode("Edit Anggaran")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiSheetDescription, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Ubah anggaran untuk kategori ${ssrInterpolate(unref(store).editingItem?.category?.name)}`);
                            } else {
                              return [
                                createTextVNode("Ubah anggaran untuk kategori " + toDisplayString(unref(store).editingItem?.category?.name), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiSheetTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Anggaran")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSheetDescription, null, {
                            default: withCtx(() => [
                              createTextVNode("Ubah anggaran untuk kategori " + toDisplayString(unref(store).editingItem?.category?.name), 1)
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<form class="space-y-4 p-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(editForm).Field, { name: "amount" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "edit-amount" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Jumlah Anggaran`);
                            } else {
                              return [
                                createTextVNode("Jumlah Anggaran")
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
                            createVNode(_component_UiLabel, { for: "edit-amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah Anggaran")
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
                  _push3(ssrRenderComponent(unref(editForm).Field, { name: "categoryId" }, {
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
                                          _push7(`${ssrInterpolate(unref(selectedEditCategory))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(unref(selectedEditCategory)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(unref(selectedEditCategory)), 1)
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
                                    ssrRenderList(__props.expenseCategories, (cat) => {
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
                                      (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                                        createTextVNode(toDisplayString(unref(selectedEditCategory)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                                        createTextVNode(toDisplayString(unref(selectedEditCategory)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                  _push3(ssrRenderComponent(unref(editForm).Field, { name: "period" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="space-y-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Periode`);
                            } else {
                              return [
                                createTextVNode("Periode")
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
                                          _push7(`${ssrInterpolate(periodOptions.find((p) => p.value === field.state.value)?.label)}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
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
                                    ssrRenderList(periodOptions, (opt) => {
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
                                      (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                                        createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                                createTextVNode("Periode")
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
                                        createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                            }, 1032, ["model-value", "onUpdate:modelValue"]),
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
                            createTextVNode("Edit Anggaran")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiSheetDescription, null, {
                          default: withCtx(() => [
                            createTextVNode("Ubah anggaran untuk kategori " + toDisplayString(unref(store).editingItem?.category?.name), 1)
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
                      createVNode(unref(editForm).Field, { name: "amount" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, { for: "edit-amount" }, {
                              default: withCtx(() => [
                                createTextVNode("Jumlah Anggaran")
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
                      createVNode(unref(editForm).Field, { name: "categoryId" }, {
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
                                        createTextVNode(toDisplayString(unref(selectedEditCategory)), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                      createVNode(unref(editForm).Field, { name: "period" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "space-y-2" }, [
                            createVNode(_component_UiLabel, null, {
                              default: withCtx(() => [
                                createTextVNode("Periode")
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
                                        createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                            }, 1032, ["model-value", "onUpdate:modelValue"]),
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
                          createTextVNode("Edit Anggaran")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiSheetDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Ubah anggaran untuk kategori " + toDisplayString(unref(store).editingItem?.category?.name), 1)
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
                    createVNode(unref(editForm).Field, { name: "amount" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, { for: "edit-amount" }, {
                            default: withCtx(() => [
                              createTextVNode("Jumlah Anggaran")
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
                    createVNode(unref(editForm).Field, { name: "categoryId" }, {
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
                                      createTextVNode(toDisplayString(unref(selectedEditCategory)), 1)
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(true), createBlock(Fragment, null, renderList(__props.expenseCategories, (cat) => {
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
                    createVNode(unref(editForm).Field, { name: "period" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "space-y-2" }, [
                          createVNode(_component_UiLabel, null, {
                            default: withCtx(() => [
                              createTextVNode("Periode")
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
                                      createTextVNode(toDisplayString(periodOptions.find((p) => p.value === field.state.value)?.label), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  (openBlock(), createBlock(Fragment, null, renderList(periodOptions, (opt) => {
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
                          }, 1032, ["model-value", "onUpdate:modelValue"]),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/budgets/edit.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$2, { __name: "FormsBudgetsEdit" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "list",
  __ssrInlineRender: true,
  props: {
    budgets: {},
    pending: { type: Boolean }
  },
  emits: ["delete"],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const store = useBudgetsCrudStore();
    const { formatCurrency } = useCurrency();
    function getProgress(spending, amount) {
      return Math.min(spending / amount * 100, 100);
    }
    function getProgressClass(spending, amount) {
      const pct = spending / amount * 100;
      if (pct > 100) return "bg-destructive";
      if (pct > 80) return "bg-yellow-500";
      return "bg-primary";
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiSkeleton = _sfc_main$1a;
      const _component_UiBadge = _sfc_main$7;
      const _component_UiDropdownMenu = _sfc_main$i;
      const _component_UiDropdownMenuTrigger = _sfc_main$5$1;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1$1;
      const _component_UiDropdownMenuContent = _sfc_main$g;
      const _component_UiDropdownMenuItem = _sfc_main$e;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-4" }, _attrs))}>`);
      if (__props.pending) {
        _push(`<!--[-->`);
        ssrRenderList(3, (i) => {
          _push(`<div class="rounded-md border p-4"><div class="mb-2 flex items-center justify-between">`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-5 w-32" }, null, _parent));
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-5 w-24" }, null, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-2 w-full rounded-full" }, null, _parent));
          _push(`<div class="mt-2 flex justify-between">`);
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-20" }, null, _parent));
          _push(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-16" }, null, _parent));
          _push(`</div></div>`);
        });
        _push(`<!--]-->`);
      } else if (__props.budgets.length > 0) {
        _push(`<!--[-->`);
        ssrRenderList(__props.budgets, (budget) => {
          _push(`<div class="rounded-md border bg-card p-4"><div class="mb-3 flex items-center justify-between"><div class="flex items-center gap-2">`);
          if (budget.category?.icon) {
            _push(`<span>${ssrInterpolate(budget.category.icon)}</span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`<span class="font-semibold">${ssrInterpolate(budget.category?.name)}</span>`);
          _push(ssrRenderComponent(_component_UiBadge, {
            variant: "outline",
            class: "text-[10px] capitalize"
          }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`${ssrInterpolate(budget.period)}`);
              } else {
                return [
                  createTextVNode(toDisplayString(budget.period), 1)
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div>`);
          _push(ssrRenderComponent(_component_UiDropdownMenu, null, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiDropdownMenuTrigger, { "as-child": "" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiButton, {
                        variant: "ghost",
                        size: "icon",
                        class: "h-8 w-8"
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
                          variant: "ghost",
                          size: "icon",
                          class: "h-8 w-8"
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
                        onClick: ($event) => unref(store).openEdit(budget)
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
                        onClick: ($event) => emit("delete", budget.id)
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
                          onClick: ($event) => unref(store).openEdit(budget)
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
                          onClick: ($event) => emit("delete", budget.id)
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
                        variant: "ghost",
                        size: "icon",
                        class: "h-8 w-8"
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
                        onClick: ($event) => unref(store).openEdit(budget)
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
                        onClick: ($event) => emit("delete", budget.id)
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
          _push(`</div><div class="space-y-2"><div class="h-2 w-full overflow-hidden rounded-full bg-muted"><div class="${ssrRenderClass([getProgressClass(0, budget.amount), "h-full transition-all duration-500"])}" style="${ssrRenderStyle({ width: `${getProgress(0, budget.amount)}%` })}"></div></div><div class="flex justify-between text-xs"><span>${ssrInterpolate(unref(formatCurrency)(0))} / ${ssrInterpolate(unref(formatCurrency)(budget.amount))}</span><span class="text-muted-foreground">${ssrInterpolate(Math.round(0 / budget.amount * 100))}%</span></div></div></div>`);
        });
        _push(`<!--]-->`);
      } else {
        _push(`<div class="rounded-md border border-dashed p-8 text-center text-muted-foreground"> Belum ada anggaran. </div>`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/tables/budgets/list.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_2 = Object.assign(_sfc_main$1, { __name: "TablesBudgetsList" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "budgets",
  __ssrInlineRender: true,
  setup(__props) {
    useBudgetsCrudStore();
    const { $apolloClient } = useNuxtApp();
    useHead({
      title: "Anggaran - MyUangGwe | Atur Batas Pengeluaran",
      meta: [
        {
          name: "description",
          content: "Kelola anggaran bulanan dan tahunan Anda untuk setiap kategori pengeluaran agar keuangan tetap terkendali."
        }
      ]
    });
    const {
      data: budgetsData,
      pending,
      refresh: refreshBudgets
    } = useAsyncData(
      "budgets",
      async () => {
        const result = await $apolloClient.query({
          query: GET_BUDGETS,
          fetchPolicy: "network-only"
        });
        return result.data.budgets;
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
    const budgets = computed(() => budgetsData.value ?? []);
    const expenseCategories = computed(
      () => (categoriesData.value ?? []).filter((c) => c.type === "expense")
    );
    const { mutate: deleteMutate } = useMutation(DELETE_BUDGET);
    async function handleDelete(id) {
      try {
        await deleteMutate({ id });
        toast.success("Anggaran dihapus");
        await refreshBudgets();
      } catch {
        toast.error("Gagal menghapus anggaran");
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FormsBudgetsCreate = __nuxt_component_0;
      const _component_FormsBudgetsEdit = __nuxt_component_1;
      const _component_TablesBudgetsList = __nuxt_component_2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-2"><div><h1 class="text-3xl font-bold tracking-tight">Anggaran</h1><p class="text-sm text-muted-foreground">Atur batas pengeluaran untuk setiap kategori.</p></div>`);
      _push(ssrRenderComponent(_component_FormsBudgetsCreate, {
        "expense-categories": unref(expenseCategories),
        onCreated: ($event) => unref(refreshBudgets)()
      }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_FormsBudgetsEdit, {
        "expense-categories": unref(expenseCategories),
        onUpdated: ($event) => unref(refreshBudgets)()
      }, null, _parent));
      _push(ssrRenderComponent(_component_TablesBudgetsList, {
        budgets: unref(budgets),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/budgets.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=budgets-DrGwBdQc.mjs.map
