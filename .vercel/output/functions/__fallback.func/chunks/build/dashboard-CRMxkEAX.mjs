import { B as useHead, D as useNuxtApp, A as useAsyncData, c as _sfc_main$X, _ as __nuxt_component_0$1, a as __nuxt_component_1, n as _sfc_main$1a } from './server.mjs';
import { e as _sfc_main$6, a as _sfc_main$1, d as _sfc_main$4, _ as _sfc_main$2, c as _sfc_main$3, b as _sfc_main$2$1 } from './CardTitle-GwIPrVhf.mjs';
import { u as useCurrency, g as getTransactionDisplay } from './useCurrency-CzQKYynb.mjs';
import { defineComponent, withAsyncContext, computed, mergeProps, withCtx, createVNode, createTextVNode, unref, toDisplayString, openBlock, createBlock, Fragment, renderList, createCommentVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { o as GET_WALLETS, n as GET_TRANSACTIONS } from './useGqlSchema-B7rdXc-g.mjs';
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
import 'pinia';
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
import 'vue-sonner';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'graphql-tag';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    useHead({
      title: "Dasbor - MyUangGwe | Ringkasan Keuangan",
      meta: [
        {
          name: "description",
          content: "Pantau ringkasan keuangan Anda - saldo total, pemasukan, pengeluaran, dan anggaran bulanan dalam satu tampilan."
        },
        {
          name: "keywords",
          content: "dasbor keuangan, ringkasan keuangan, saldo total, pemasukan pengeluaran, aplikasi keuangan"
        }
      ]
    });
    const { $apolloClient } = useNuxtApp();
    const { formatCurrency } = useCurrency();
    const now = /* @__PURE__ */ new Date();
    const startOfMonth = new Date(
      now.getFullYear(),
      now.getMonth(),
      1
    ).toISOString();
    const { data: walletsData, pending: walletsLoading } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "dashboard-wallets",
      async () => {
        const result = await $apolloClient.query({
          query: GET_WALLETS,
          fetchPolicy: "network-only"
        });
        return result.data.wallets;
      },
      { server: false }
    )), __temp = await __temp, __restore(), __temp);
    const { data: recentData, pending: recentLoading } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "dashboard-recent",
      async () => {
        const result = await $apolloClient.query({
          query: GET_TRANSACTIONS,
          variables: { limit: 5 },
          fetchPolicy: "network-only"
        });
        return result.data.transactions;
      },
      { server: false }
    )), __temp = await __temp, __restore(), __temp);
    const { data: monthlyData } = ([__temp, __restore] = withAsyncContext(async () => useAsyncData(
      "dashboard-monthly",
      async () => {
        const result = await $apolloClient.query({
          query: GET_TRANSACTIONS,
          variables: { from: startOfMonth },
          fetchPolicy: "network-only"
        });
        return result.data.transactions;
      },
      { server: false }
    )), __temp = await __temp, __restore(), __temp);
    const isLoading = computed(() => walletsLoading.value || recentLoading.value);
    const wallets = computed(() => walletsData.value ?? []);
    const recentTransactions = computed(() => recentData.value ?? []);
    const monthlyTransactions = computed(() => monthlyData.value ?? []);
    const totalBalance = computed(
      () => wallets.value.reduce((sum, w) => sum + w.balance, 0)
    );
    const walletCount = computed(() => wallets.value.length);
    const monthlyIncome = computed(
      () => monthlyTransactions.value.filter((t) => t.type === "income").reduce((sum, t) => sum + t.amount, 0)
    );
    const monthlyExpense = computed(
      () => monthlyTransactions.value.filter((t) => t.type === "expense").reduce((sum, t) => sum + t.amount, 0)
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiButton = _sfc_main$X;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_Icon = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1;
      const _component_UiSkeleton = _sfc_main$1a;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiCardFooter = _sfc_main$2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "space-y-6" }, _attrs))}><div class="flex flex-wrap items-center justify-between gap-2"><div><h1 class="text-3xl font-bold tracking-tight">Dashboard</h1><p class="text-sm text-muted-foreground">Financial overview</p></div>`);
      _push(ssrRenderComponent(_component_UiButton, { "as-child": "" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/transactions",
              class: "gap-2"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:plus",
                    class: "h-4 w-4"
                  }, null, _parent3, _scopeId2));
                  _push3(` New Transaction `);
                } else {
                  return [
                    createVNode(_component_Icon, {
                      name: "lucide:plus",
                      class: "h-4 w-4"
                    }),
                    createTextVNode(" New Transaction ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/transactions",
                class: "gap-2"
              }, {
                default: withCtx(() => [
                  createVNode(_component_Icon, {
                    name: "lucide:plus",
                    class: "h-4 w-4"
                  }),
                  createTextVNode(" New Transaction ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (unref(isLoading)) {
        _push(`<div class="grid gap-4 md:grid-cols-3"><!--[-->`);
        ssrRenderList(3, (i) => {
          _push(ssrRenderComponent(_component_UiCard, { key: i }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-24" }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-4 rounded-full" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiSkeleton, { class: "h-4 w-24" }),
                        createVNode(_component_UiSkeleton, { class: "h-4 w-4 rounded-full" })
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
                _push2(ssrRenderComponent(_component_UiCardContent, null, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "mb-2 h-8 w-32" }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-3 w-20" }, null, _parent3, _scopeId2));
                    } else {
                      return [
                        createVNode(_component_UiSkeleton, { class: "mb-2 h-8 w-32" }),
                        createVNode(_component_UiSkeleton, { class: "h-3 w-20" })
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
                      createVNode(_component_UiSkeleton, { class: "h-4 w-4 rounded-full" })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardContent, null, {
                    default: withCtx(() => [
                      createVNode(_component_UiSkeleton, { class: "mb-2 h-8 w-32" }),
                      createVNode(_component_UiSkeleton, { class: "h-3 w-20" })
                    ]),
                    _: 1
                  })
                ];
              }
            }),
            _: 2
          }, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="grid gap-4 md:grid-cols-3">`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Total Balance`);
                        } else {
                          return [
                            createTextVNode("Total Balance")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:wallet",
                      class: "h-4 w-4 text-muted-foreground"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                        default: withCtx(() => [
                          createTextVNode("Total Balance")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Icon, {
                        name: "lucide:wallet",
                        class: "h-4 w-4 text-muted-foreground"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(unref(totalBalance)))}</div><p class="text-xs text-muted-foreground"${_scopeId2}> From ${ssrInterpolate(unref(walletCount))} wallet${ssrInterpolate(unref(walletCount) !== 1 ? "s" : "")}</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(unref(totalBalance))), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, " From " + toDisplayString(unref(walletCount)) + " wallet" + toDisplayString(unref(walletCount) !== 1 ? "s" : ""), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Total Balance")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Icon, {
                      name: "lucide:wallet",
                      class: "h-4 w-4 text-muted-foreground"
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(unref(totalBalance))), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, " From " + toDisplayString(unref(walletCount)) + " wallet" + toDisplayString(unref(walletCount) !== 1 ? "s" : ""), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Income`);
                        } else {
                          return [
                            createTextVNode("Income")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:arrow-down-left",
                      class: "h-4 w-4 text-green-500"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                        default: withCtx(() => [
                          createTextVNode("Income")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Icon, {
                        name: "lucide:arrow-down-left",
                        class: "h-4 w-4 text-green-500"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-2xl font-bold text-green-600"${_scopeId2}> +${ssrInterpolate(unref(formatCurrency)(unref(monthlyIncome)))}</div><p class="text-xs text-muted-foreground"${_scopeId2}>This month</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold text-green-600" }, " +" + toDisplayString(unref(formatCurrency)(unref(monthlyIncome))), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "This month")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Income")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Icon, {
                      name: "lucide:arrow-down-left",
                      class: "h-4 w-4 text-green-500"
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-2xl font-bold text-green-600" }, " +" + toDisplayString(unref(formatCurrency)(unref(monthlyIncome))), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "This month")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Expenses`);
                        } else {
                          return [
                            createTextVNode("Expenses")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:arrow-up-right",
                      class: "h-4 w-4 text-red-500"
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                        default: withCtx(() => [
                          createTextVNode("Expenses")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_Icon, {
                        name: "lucide:arrow-up-right",
                        class: "h-4 w-4 text-red-500"
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-2xl font-bold text-red-600"${_scopeId2}> -${ssrInterpolate(unref(formatCurrency)(unref(monthlyExpense)))}</div><p class="text-xs text-muted-foreground"${_scopeId2}>This month</p>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-2xl font-bold text-red-600" }, " -" + toDisplayString(unref(formatCurrency)(unref(monthlyExpense))), 1),
                      createVNode("p", { class: "text-xs text-muted-foreground" }, "This month")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                      default: withCtx(() => [
                        createTextVNode("Expenses")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_Icon, {
                      name: "lucide:arrow-up-right",
                      class: "h-4 w-4 text-red-500"
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-2xl font-bold text-red-600" }, " -" + toDisplayString(unref(formatCurrency)(unref(monthlyExpense))), 1),
                    createVNode("p", { class: "text-xs text-muted-foreground" }, "This month")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Quick Insights`);
                      } else {
                        return [
                          createTextVNode("Quick Insights")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Analysis based on your current data`);
                      } else {
                        return [
                          createTextVNode("Analysis based on your current data")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:zap",
                    class: "h-4 w-4 text-primary"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Quick Insights")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Analysis based on your current data")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_Icon, {
                      name: "lucide:zap",
                      class: "h-4 w-4 text-primary"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="grid gap-4 md:grid-cols-2"${_scopeId2}><div class="flex items-center gap-4 rounded-lg border bg-muted/30 p-4"${_scopeId2}><div class="rounded-full bg-primary/10 p-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:trending-up",
                    class: "h-5 w-5 text-primary"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>Monthly Savings</p><p class="text-2xl font-bold"${_scopeId2}>${ssrInterpolate(unref(formatCurrency)(unref(monthlyIncome) - unref(monthlyExpense)))}</p></div></div><div class="flex items-center gap-4 rounded-lg border bg-muted/30 p-4"${_scopeId2}><div class="rounded-full bg-muted p-3"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:shield",
                    class: "h-5 w-5 text-muted-foreground"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div><div${_scopeId2}><p class="text-sm font-medium"${_scopeId2}>Financial Status</p><p class="text-sm text-muted-foreground"${_scopeId2}>`);
                  if (unref(monthlyIncome) > unref(monthlyExpense)) {
                    _push3(`<!--[--> Healthy! You are saving ${ssrInterpolate(((1 - unref(monthlyExpense) / (unref(monthlyIncome) || 1)) * 100).toFixed(
                      0
                    ))}% of your income. <!--]-->`);
                  } else if (unref(monthlyIncome) === 0 && unref(monthlyExpense) === 0) {
                    _push3(`<!--[--> No activity yet this month. <!--]-->`);
                  } else {
                    _push3(`<!--[--> Attention! You are spending more than you earn this month. <!--]-->`);
                  }
                  _push3(`</p></div></div></div>`);
                } else {
                  return [
                    createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                      createVNode("div", { class: "flex items-center gap-4 rounded-lg border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "rounded-full bg-primary/10 p-3" }, [
                          createVNode(_component_Icon, {
                            name: "lucide:trending-up",
                            class: "h-5 w-5 text-primary"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium" }, "Monthly Savings"),
                          createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(unref(monthlyIncome) - unref(monthlyExpense))), 1)
                        ])
                      ]),
                      createVNode("div", { class: "flex items-center gap-4 rounded-lg border bg-muted/30 p-4" }, [
                        createVNode("div", { class: "rounded-full bg-muted p-3" }, [
                          createVNode(_component_Icon, {
                            name: "lucide:shield",
                            class: "h-5 w-5 text-muted-foreground"
                          })
                        ]),
                        createVNode("div", null, [
                          createVNode("p", { class: "text-sm font-medium" }, "Financial Status"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, [
                            unref(monthlyIncome) > unref(monthlyExpense) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                              createTextVNode(" Healthy! You are saving " + toDisplayString(((1 - unref(monthlyExpense) / (unref(monthlyIncome) || 1)) * 100).toFixed(
                                0
                              )) + "% of your income. ", 1)
                            ], 64)) : unref(monthlyIncome) === 0 && unref(monthlyExpense) === 0 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                              createTextVNode(" No activity yet this month. ")
                            ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                              createTextVNode(" Attention! You are spending more than you earn this month. ")
                            ], 64))
                          ])
                        ])
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between pb-2" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Quick Insights")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Analysis based on your current data")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_Icon, {
                    name: "lucide:zap",
                    class: "h-4 w-4 text-primary"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("div", { class: "grid gap-4 md:grid-cols-2" }, [
                    createVNode("div", { class: "flex items-center gap-4 rounded-lg border bg-muted/30 p-4" }, [
                      createVNode("div", { class: "rounded-full bg-primary/10 p-3" }, [
                        createVNode(_component_Icon, {
                          name: "lucide:trending-up",
                          class: "h-5 w-5 text-primary"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium" }, "Monthly Savings"),
                        createVNode("p", { class: "text-2xl font-bold" }, toDisplayString(unref(formatCurrency)(unref(monthlyIncome) - unref(monthlyExpense))), 1)
                      ])
                    ]),
                    createVNode("div", { class: "flex items-center gap-4 rounded-lg border bg-muted/30 p-4" }, [
                      createVNode("div", { class: "rounded-full bg-muted p-3" }, [
                        createVNode(_component_Icon, {
                          name: "lucide:shield",
                          class: "h-5 w-5 text-muted-foreground"
                        })
                      ]),
                      createVNode("div", null, [
                        createVNode("p", { class: "text-sm font-medium" }, "Financial Status"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, [
                          unref(monthlyIncome) > unref(monthlyExpense) ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createTextVNode(" Healthy! You are saving " + toDisplayString(((1 - unref(monthlyExpense) / (unref(monthlyIncome) || 1)) * 100).toFixed(
                              0
                            )) + "% of your income. ", 1)
                          ], 64)) : unref(monthlyIncome) === 0 && unref(monthlyExpense) === 0 ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createTextVNode(" No activity yet this month. ")
                          ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                            createTextVNode(" Attention! You are spending more than you earn this month. ")
                          ], 64))
                        ])
                      ])
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_UiCard, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Recent Transactions`);
                      } else {
                        return [
                          createTextVNode("Recent Transactions")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Latest activity from this account.`);
                      } else {
                        return [
                          createTextVNode("Latest activity from this account.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:history",
                    class: "h-4 w-4 text-muted-foreground"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode("div", null, [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Recent Transactions")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Latest activity from this account.")
                        ]),
                        _: 1
                      })
                    ]),
                    createVNode(_component_Icon, {
                      name: "lucide:history",
                      class: "h-4 w-4 text-muted-foreground"
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCardContent, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(isLoading)) {
                    _push3(`<div class="space-y-6"${_scopeId2}><!--[-->`);
                    ssrRenderList(5, (i) => {
                      _push3(`<div class="flex items-center gap-4"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-10 w-10 rounded-full" }, null, _parent3, _scopeId2));
                      _push3(`<div class="flex-1 space-y-2"${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-4 w-32" }, null, _parent3, _scopeId2));
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-3 w-24" }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                      _push3(ssrRenderComponent(_component_UiSkeleton, { class: "h-5 w-20" }, null, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div>`);
                  } else {
                    _push3(`<div class="space-y-6"${_scopeId2}>`);
                    if (unref(recentTransactions).length > 0) {
                      _push3(`<!--[-->`);
                      ssrRenderList(unref(recentTransactions), (tx) => {
                        _push3(`<div class="flex items-center gap-4"${_scopeId2}><div class="${ssrRenderClass([{
                          "bg-green-100 text-green-600 dark:bg-green-900/30": tx.type === "income",
                          "bg-red-100 text-red-600 dark:bg-red-900/30": tx.type === "expense",
                          "bg-blue-100 text-blue-600 dark:bg-blue-900/30": tx.type === "transfer"
                        }, "flex h-10 w-10 items-center justify-center rounded-full"])}"${_scopeId2}>`);
                        if (tx.type === "income") {
                          _push3(ssrRenderComponent(_component_Icon, {
                            name: "lucide:arrow-down-left",
                            class: "h-4 w-4"
                          }, null, _parent3, _scopeId2));
                        } else if (tx.type === "expense") {
                          _push3(ssrRenderComponent(_component_Icon, {
                            name: "lucide:arrow-up-right",
                            class: "h-4 w-4"
                          }, null, _parent3, _scopeId2));
                        } else {
                          _push3(`<span class="text-sm"${_scopeId2}>💰</span>`);
                        }
                        _push3(`</div><div class="flex-1 space-y-1"${_scopeId2}><p class="text-sm font-medium leading-none"${_scopeId2}>${ssrInterpolate(tx.category?.icon)} ${ssrInterpolate(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).label)}</p><p class="text-xs text-muted-foreground"${_scopeId2}>${ssrInterpolate(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).subtitle)}</p></div><div class="${ssrRenderClass([
                          ("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).isExpense ? "text-red-600" : "text-green-600",
                          "text-sm font-bold"
                        ])}"${_scopeId2}>${ssrInterpolate(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).isExpense ? "-" : "+")} ${ssrInterpolate(unref(formatCurrency)(tx.amount))}</div></div>`);
                      });
                      _push3(`<!--]-->`);
                    } else {
                      _push3(`<div class="py-10 text-center text-muted-foreground"${_scopeId2}> No transactions yet. </div>`);
                    }
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    unref(isLoading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "space-y-6"
                    }, [
                      (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                        return createVNode("div", {
                          key: i,
                          class: "flex items-center gap-4"
                        }, [
                          createVNode(_component_UiSkeleton, { class: "h-10 w-10 rounded-full" }),
                          createVNode("div", { class: "flex-1 space-y-2" }, [
                            createVNode(_component_UiSkeleton, { class: "h-4 w-32" }),
                            createVNode(_component_UiSkeleton, { class: "h-3 w-24" })
                          ]),
                          createVNode(_component_UiSkeleton, { class: "h-5 w-20" })
                        ]);
                      }), 64))
                    ])) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "space-y-6"
                    }, [
                      unref(recentTransactions).length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(recentTransactions), (tx) => {
                        return openBlock(), createBlock("div", {
                          key: tx.id,
                          class: "flex items-center gap-4"
                        }, [
                          createVNode("div", {
                            class: ["flex h-10 w-10 items-center justify-center rounded-full", {
                              "bg-green-100 text-green-600 dark:bg-green-900/30": tx.type === "income",
                              "bg-red-100 text-red-600 dark:bg-red-900/30": tx.type === "expense",
                              "bg-blue-100 text-blue-600 dark:bg-blue-900/30": tx.type === "transfer"
                            }]
                          }, [
                            tx.type === "income" ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:arrow-down-left",
                              class: "h-4 w-4"
                            })) : tx.type === "expense" ? (openBlock(), createBlock(_component_Icon, {
                              key: 1,
                              name: "lucide:arrow-up-right",
                              class: "h-4 w-4"
                            })) : (openBlock(), createBlock("span", {
                              key: 2,
                              class: "text-sm"
                            }, "💰"))
                          ], 2),
                          createVNode("div", { class: "flex-1 space-y-1" }, [
                            createVNode("p", { class: "text-sm font-medium leading-none" }, toDisplayString(tx.category?.icon) + " " + toDisplayString(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).label), 1),
                            createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).subtitle), 1)
                          ]),
                          createVNode("div", {
                            class: [
                              "text-sm font-bold",
                              ("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).isExpense ? "text-red-600" : "text-green-600"
                            ]
                          }, toDisplayString(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).isExpense ? "-" : "+") + " " + toDisplayString(unref(formatCurrency)(tx.amount)), 3)
                        ]);
                      }), 128)) : (openBlock(), createBlock("div", {
                        key: 1,
                        class: "py-10 text-center text-muted-foreground"
                      }, " No transactions yet. "))
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (!unref(isLoading) && unref(recentTransactions).length > 0) {
              _push2(ssrRenderComponent(_component_UiCardFooter, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "ghost",
                      class: "w-full text-muted-foreground",
                      "as-child": ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_NuxtLink, { to: "/transactions" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`View all transactions`);
                              } else {
                                return [
                                  createTextVNode("View all transactions")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_NuxtLink, { to: "/transactions" }, {
                              default: withCtx(() => [
                                createTextVNode("View all transactions")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiButton, {
                        variant: "ghost",
                        class: "w-full text-muted-foreground",
                        "as-child": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_NuxtLink, { to: "/transactions" }, {
                            default: withCtx(() => [
                              createTextVNode("View all transactions")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "flex flex-row items-center justify-between" }, {
                default: withCtx(() => [
                  createVNode("div", null, [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Recent Transactions")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Latest activity from this account.")
                      ]),
                      _: 1
                    })
                  ]),
                  createVNode(_component_Icon, {
                    name: "lucide:history",
                    class: "h-4 w-4 text-muted-foreground"
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  unref(isLoading) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "space-y-6"
                  }, [
                    (openBlock(), createBlock(Fragment, null, renderList(5, (i) => {
                      return createVNode("div", {
                        key: i,
                        class: "flex items-center gap-4"
                      }, [
                        createVNode(_component_UiSkeleton, { class: "h-10 w-10 rounded-full" }),
                        createVNode("div", { class: "flex-1 space-y-2" }, [
                          createVNode(_component_UiSkeleton, { class: "h-4 w-32" }),
                          createVNode(_component_UiSkeleton, { class: "h-3 w-24" })
                        ]),
                        createVNode(_component_UiSkeleton, { class: "h-5 w-20" })
                      ]);
                    }), 64))
                  ])) : (openBlock(), createBlock("div", {
                    key: 1,
                    class: "space-y-6"
                  }, [
                    unref(recentTransactions).length > 0 ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(unref(recentTransactions), (tx) => {
                      return openBlock(), createBlock("div", {
                        key: tx.id,
                        class: "flex items-center gap-4"
                      }, [
                        createVNode("div", {
                          class: ["flex h-10 w-10 items-center justify-center rounded-full", {
                            "bg-green-100 text-green-600 dark:bg-green-900/30": tx.type === "income",
                            "bg-red-100 text-red-600 dark:bg-red-900/30": tx.type === "expense",
                            "bg-blue-100 text-blue-600 dark:bg-blue-900/30": tx.type === "transfer"
                          }]
                        }, [
                          tx.type === "income" ? (openBlock(), createBlock(_component_Icon, {
                            key: 0,
                            name: "lucide:arrow-down-left",
                            class: "h-4 w-4"
                          })) : tx.type === "expense" ? (openBlock(), createBlock(_component_Icon, {
                            key: 1,
                            name: "lucide:arrow-up-right",
                            class: "h-4 w-4"
                          })) : (openBlock(), createBlock("span", {
                            key: 2,
                            class: "text-sm"
                          }, "💰"))
                        ], 2),
                        createVNode("div", { class: "flex-1 space-y-1" }, [
                          createVNode("p", { class: "text-sm font-medium leading-none" }, toDisplayString(tx.category?.icon) + " " + toDisplayString(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).label), 1),
                          createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).subtitle), 1)
                        ]),
                        createVNode("div", {
                          class: [
                            "text-sm font-bold",
                            ("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).isExpense ? "text-red-600" : "text-green-600"
                          ]
                        }, toDisplayString(("getTransactionDisplay" in _ctx ? _ctx.getTransactionDisplay : unref(getTransactionDisplay))(tx).isExpense ? "-" : "+") + " " + toDisplayString(unref(formatCurrency)(tx.amount)), 3)
                      ]);
                    }), 128)) : (openBlock(), createBlock("div", {
                      key: 1,
                      class: "py-10 text-center text-muted-foreground"
                    }, " No transactions yet. "))
                  ]))
                ]),
                _: 1
              }),
              !unref(isLoading) && unref(recentTransactions).length > 0 ? (openBlock(), createBlock(_component_UiCardFooter, { key: 0 }, {
                default: withCtx(() => [
                  createVNode(_component_UiButton, {
                    variant: "ghost",
                    class: "w-full text-muted-foreground",
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, { to: "/transactions" }, {
                        default: withCtx(() => [
                          createTextVNode("View all transactions")
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=dashboard-CRMxkEAX.mjs.map
