import { D as useNuxtApp, A as useAsyncData, B as useHead, a as __nuxt_component_1, b as _sfc_main$H } from './server.mjs';
import { e as _sfc_main$6, d as _sfc_main$4 } from './CardTitle-GwIPrVhf.mjs';
import { e as _sfc_main$8, _ as _sfc_main$1, b as _sfc_main$4$1, a as _sfc_main$1$1, d as _sfc_main$7, c as _sfc_main$5 } from './TableHeader-CtjPTqbx.mjs';
import { _ as _sfc_main$2 } from './index-dZMOOFG9.mjs';
import { defineComponent, reactive, ref, computed, mergeProps, unref, withCtx, isRef, createVNode, createTextVNode, toDisplayString, openBlock, createBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "invitations",
  __ssrInlineRender: true,
  setup(__props) {
    const authClient = useNuxtApp().$authClient;
    const activeOrg = authClient.useActiveOrganization();
    const data = reactive({ activeOrg: activeOrg.value.data });
    const searchQuery = ref("");
    const {
      data: invitationsData,
      error,
      pending
    } = useAsyncData(
      "my-invitations" + data.activeOrg?.id,
      async () => {
        const { data: res, error: error2 } = await authClient.organization.listInvitations({
          query: {
            organizationId: data.activeOrg?.id
          }
        });
        if (error2) {
          throw error2;
        }
        return res;
      },
      { server: false, lazy: true, immediate: !!data.activeOrg?.id }
    );
    const filteredInvitations = computed(() => {
      if (!invitationsData.value) return [];
      return invitationsData.value.filter((inv) => {
        if (!searchQuery.value) return true;
        return inv.organizationId.toLowerCase().includes(searchQuery.value.toLowerCase());
      });
    });
    useHead({
      title: "Undangan - MyUangGwe | Gabung Organisasi",
      meta: [
        {
          name: "description",
          content: "Lihat dan kelola undangan bergabung ke organisasi atau tim kolaborasi keuangan."
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Icon = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiInput = _sfc_main$H;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$1;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$1;
      const _component_UiTableBody = _sfc_main$7;
      const _component_UiTableCell = _sfc_main$5;
      const _component_UiBadge = _sfc_main$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto max-w-6xl py-8" }, _attrs))}><div class="mb-6"><div class="flex items-center gap-3"><div class="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:mail",
        class: "text-primary"
      }, null, _parent));
      _push(`</div><div><h1 class="text-3xl font-bold">My Invitations</h1><p class="text-muted-foreground">${ssrInterpolate(unref(filteredInvitations).length)} pending invitation(s) </p></div></div></div>`);
      _push(ssrRenderComponent(_component_UiCard, { class: "mb-6" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "pt-6" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="relative"${_scopeId2}>`);
                  _push3(ssrRenderComponent(_component_Icon, {
                    name: "lucide:search",
                    class: "absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiInput, {
                    type: "text",
                    placeholder: "Search by Organization ID...",
                    modelValue: unref(searchQuery),
                    "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                    class: "pl-10 font-mono"
                  }, null, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "relative" }, [
                      createVNode(_component_Icon, {
                        name: "lucide:search",
                        class: "absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                      }),
                      createVNode(_component_UiInput, {
                        type: "text",
                        placeholder: "Search by Organization ID...",
                        modelValue: unref(searchQuery),
                        "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                        class: "pl-10 font-mono"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "pt-6" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "relative" }, [
                    createVNode(_component_Icon, {
                      name: "lucide:search",
                      class: "absolute top-1/2 left-3 -translate-y-1/2 text-muted-foreground"
                    }),
                    createVNode(_component_UiInput, {
                      type: "text",
                      placeholder: "Search by Organization ID...",
                      modelValue: unref(searchQuery),
                      "onUpdate:modelValue": ($event) => isRef(searchQuery) ? searchQuery.value = $event : null,
                      class: "pl-10 font-mono"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(_component_UiCardContent, { class: "p-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(pending)) {
                    _push3(`<div${_scopeId2}><div class="flex items-center justify-center py-12"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:loader-2",
                      class: "animate-spin text-muted-foreground"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  } else if (unref(error)) {
                    _push3(`<div${_scopeId2}><div class="flex flex-col items-center justify-center py-12"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:alert-circle",
                      class: "mb-4 text-destructive"
                    }, null, _parent3, _scopeId2));
                    _push3(`<p class="text-lg font-semibold"${_scopeId2}>Failed to load invitations</p><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(error)?.message || "Please try again")}</p></div></div>`);
                  } else if (unref(filteredInvitations).length === 0) {
                    _push3(`<div${_scopeId2}><div class="flex flex-col items-center justify-center py-12"${_scopeId2}><div class="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:inbox",
                      class: "text-muted-foreground"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><h3 class="mb-2 text-lg font-semibold"${_scopeId2}>No invitations found</h3><p class="text-sm text-muted-foreground"${_scopeId2}>${ssrInterpolate(unref(searchQuery) ? "Try a different search term" : "You have no pending invitations")}</p></div></div>`);
                  } else {
                    _push3(`<div class="rounded-md border"${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_UiTable, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiTableHeader, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(_component_UiTableRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Invitation ID`);
                                          } else {
                                            return [
                                              createTextVNode("Invitation ID")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Email`);
                                          } else {
                                            return [
                                              createTextVNode("Email")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Role`);
                                          } else {
                                            return [
                                              createTextVNode("Role")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Date`);
                                          } else {
                                            return [
                                              createTextVNode("Date")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Expires`);
                                          } else {
                                            return [
                                              createTextVNode("Expires")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(_component_UiTableHead, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Status`);
                                          } else {
                                            return [
                                              createTextVNode("Status")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Invitation ID")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Email")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Role")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Date")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Expires")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(_component_UiTableRow, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Invitation ID")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Email")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Role")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Date")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Expires")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiTableHead, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Status")
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
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiTableBody, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<!--[-->`);
                                ssrRenderList(unref(filteredInvitations), (invitation) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, {
                                    key: invitation.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="flex items-center gap-2"${_scopeId6}><div class="flex h-8 w-8 items-center justify-center rounded-md bg-primary/10"${_scopeId6}>`);
                                              _push7(ssrRenderComponent(_component_Icon, {
                                                name: "lucide:building-2",
                                                class: "text-primary"
                                              }, null, _parent7, _scopeId6));
                                              _push7(`</div><span class="max-w-[200px]"${_scopeId6}>${ssrInterpolate(invitation.id)}</span></div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" }, [
                                                    createVNode(_component_Icon, {
                                                      name: "lucide:building-2",
                                                      class: "text-primary"
                                                    })
                                                  ]),
                                                  createVNode("span", { class: "max-w-[200px]" }, toDisplayString(invitation.id), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="flex items-center gap-2"${_scopeId6}><span class="max-w-[200px] truncate"${_scopeId6}>${ssrInterpolate(invitation.email)}</span></div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "flex items-center gap-2" }, [
                                                  createVNode("span", { class: "max-w-[200px] truncate" }, toDisplayString(invitation.email), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiBadge, {
                                                variant: "outline",
                                                class: "capitalize"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    if (invitation.role === "admin") {
                                                      _push8(ssrRenderComponent(_component_Icon, {
                                                        name: "lucide:shield",
                                                        class: "mr-1"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      _push8(ssrRenderComponent(_component_Icon, {
                                                        name: "lucide:user",
                                                        class: "mr-1"
                                                      }, null, _parent8, _scopeId7));
                                                    }
                                                    _push8(` ${ssrInterpolate(invitation.role)}`);
                                                  } else {
                                                    return [
                                                      invitation.role === "admin" ? (openBlock(), createBlock(_component_Icon, {
                                                        key: 0,
                                                        name: "lucide:shield",
                                                        class: "mr-1"
                                                      })) : (openBlock(), createBlock(_component_Icon, {
                                                        key: 1,
                                                        name: "lucide:user",
                                                        class: "mr-1"
                                                      })),
                                                      createTextVNode(" " + toDisplayString(invitation.role), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiBadge, {
                                                  variant: "outline",
                                                  class: "capitalize"
                                                }, {
                                                  default: withCtx(() => [
                                                    invitation.role === "admin" ? (openBlock(), createBlock(_component_Icon, {
                                                      key: 0,
                                                      name: "lucide:shield",
                                                      class: "mr-1"
                                                    })) : (openBlock(), createBlock(_component_Icon, {
                                                      key: 1,
                                                      name: "lucide:user",
                                                      class: "mr-1"
                                                    })),
                                                    createTextVNode(" " + toDisplayString(invitation.role), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(new Date(invitation.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                              }))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(new Date(invitation.createdAt).toLocaleDateString("en-US", {
                                                  month: "short",
                                                  day: "numeric",
                                                  year: "numeric"
                                                })), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric"
                                              }))}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                                                  month: "short",
                                                  day: "numeric"
                                                })), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiBadge, {
                                                variant: "secondary",
                                                class: "capitalize"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(ssrRenderComponent(_component_Icon, {
                                                      name: "lucide:clock",
                                                      class: "mr-1"
                                                    }, null, _parent8, _scopeId7));
                                                    _push8(` ${ssrInterpolate(invitation.status)}`);
                                                  } else {
                                                    return [
                                                      createVNode(_component_Icon, {
                                                        name: "lucide:clock",
                                                        class: "mr-1"
                                                      }),
                                                      createTextVNode(" " + toDisplayString(invitation.status), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiBadge, {
                                                  variant: "secondary",
                                                  class: "capitalize"
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_Icon, {
                                                      name: "lucide:clock",
                                                      class: "mr-1"
                                                    }),
                                                    createTextVNode(" " + toDisplayString(invitation.status), 1)
                                                  ]),
                                                  _: 2
                                                }, 1024)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" }, [
                                                  createVNode(_component_Icon, {
                                                    name: "lucide:building-2",
                                                    class: "text-primary"
                                                  })
                                                ]),
                                                createVNode("span", { class: "max-w-[200px]" }, toDisplayString(invitation.id), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "flex items-center gap-2" }, [
                                                createVNode("span", { class: "max-w-[200px] truncate" }, toDisplayString(invitation.email), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: "outline",
                                                class: "capitalize"
                                              }, {
                                                default: withCtx(() => [
                                                  invitation.role === "admin" ? (openBlock(), createBlock(_component_Icon, {
                                                    key: 0,
                                                    name: "lucide:shield",
                                                    class: "mr-1"
                                                  })) : (openBlock(), createBlock(_component_Icon, {
                                                    key: 1,
                                                    name: "lucide:user",
                                                    class: "mr-1"
                                                  })),
                                                  createTextVNode(" " + toDisplayString(invitation.role), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(invitation.createdAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric",
                                                year: "numeric"
                                              })), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                                                month: "short",
                                                day: "numeric"
                                              })), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: "secondary",
                                                class: "capitalize"
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_Icon, {
                                                    name: "lucide:clock",
                                                    class: "mr-1"
                                                  }),
                                                  createTextVNode(" " + toDisplayString(invitation.status), 1)
                                                ]),
                                                _: 2
                                              }, 1024)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                });
                                _push5(`<!--]-->`);
                              } else {
                                return [
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredInvitations), (invitation) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: invitation.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" }, [
                                                createVNode(_component_Icon, {
                                                  name: "lucide:building-2",
                                                  class: "text-primary"
                                                })
                                              ]),
                                              createVNode("span", { class: "max-w-[200px]" }, toDisplayString(invitation.id), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode("span", { class: "max-w-[200px] truncate" }, toDisplayString(invitation.email), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: "outline",
                                              class: "capitalize"
                                            }, {
                                              default: withCtx(() => [
                                                invitation.role === "admin" ? (openBlock(), createBlock(_component_Icon, {
                                                  key: 0,
                                                  name: "lucide:shield",
                                                  class: "mr-1"
                                                })) : (openBlock(), createBlock(_component_Icon, {
                                                  key: 1,
                                                  name: "lucide:user",
                                                  class: "mr-1"
                                                })),
                                                createTextVNode(" " + toDisplayString(invitation.role), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(invitation.createdAt).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric",
                                              year: "numeric"
                                            })), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                                              month: "short",
                                              day: "numeric"
                                            })), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: "secondary",
                                              class: "capitalize"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_Icon, {
                                                  name: "lucide:clock",
                                                  class: "mr-1"
                                                }),
                                                createTextVNode(" " + toDisplayString(invitation.status), 1)
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024);
                                  }), 128))
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiTableHeader, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableRow, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Invitation ID")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Email")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Role")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Date")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Expires")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiTableHead, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiTableBody, null, {
                              default: withCtx(() => [
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredInvitations), (invitation) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: invitation.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" }, [
                                              createVNode(_component_Icon, {
                                                name: "lucide:building-2",
                                                class: "text-primary"
                                              })
                                            ]),
                                            createVNode("span", { class: "max-w-[200px]" }, toDisplayString(invitation.id), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode("span", { class: "max-w-[200px] truncate" }, toDisplayString(invitation.email), 1)
                                          ])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiBadge, {
                                            variant: "outline",
                                            class: "capitalize"
                                          }, {
                                            default: withCtx(() => [
                                              invitation.role === "admin" ? (openBlock(), createBlock(_component_Icon, {
                                                key: 0,
                                                name: "lucide:shield",
                                                class: "mr-1"
                                              })) : (openBlock(), createBlock(_component_Icon, {
                                                key: 1,
                                                name: "lucide:user",
                                                class: "mr-1"
                                              })),
                                              createTextVNode(" " + toDisplayString(invitation.role), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(invitation.createdAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric",
                                            year: "numeric"
                                          })), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                                            month: "short",
                                            day: "numeric"
                                          })), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiBadge, {
                                            variant: "secondary",
                                            class: "capitalize"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_Icon, {
                                                name: "lucide:clock",
                                                class: "mr-1"
                                              }),
                                              createTextVNode(" " + toDisplayString(invitation.status), 1)
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024);
                                }), 128))
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  }
                } else {
                  return [
                    unref(pending) ? (openBlock(), createBlock("div", { key: 0 }, [
                      createVNode("div", { class: "flex items-center justify-center py-12" }, [
                        createVNode(_component_Icon, {
                          name: "lucide:loader-2",
                          class: "animate-spin text-muted-foreground"
                        })
                      ])
                    ])) : unref(error) ? (openBlock(), createBlock("div", { key: 1 }, [
                      createVNode("div", { class: "flex flex-col items-center justify-center py-12" }, [
                        createVNode(_component_Icon, {
                          name: "lucide:alert-circle",
                          class: "mb-4 text-destructive"
                        }),
                        createVNode("p", { class: "text-lg font-semibold" }, "Failed to load invitations"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(error)?.message || "Please try again"), 1)
                      ])
                    ])) : unref(filteredInvitations).length === 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                      createVNode("div", { class: "flex flex-col items-center justify-center py-12" }, [
                        createVNode("div", { class: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted" }, [
                          createVNode(_component_Icon, {
                            name: "lucide:inbox",
                            class: "text-muted-foreground"
                          })
                        ]),
                        createVNode("h3", { class: "mb-2 text-lg font-semibold" }, "No invitations found"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(searchQuery) ? "Try a different search term" : "You have no pending invitations"), 1)
                      ])
                    ])) : (openBlock(), createBlock("div", {
                      key: 3,
                      class: "rounded-md border"
                    }, [
                      createVNode(_component_UiTable, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Invitation ID")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Email")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Role")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Date")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Expires")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiTableBody, null, {
                            default: withCtx(() => [
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredInvitations), (invitation) => {
                                return openBlock(), createBlock(_component_UiTableRow, {
                                  key: invitation.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" }, [
                                            createVNode(_component_Icon, {
                                              name: "lucide:building-2",
                                              class: "text-primary"
                                            })
                                          ]),
                                          createVNode("span", { class: "max-w-[200px]" }, toDisplayString(invitation.id), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode("span", { class: "max-w-[200px] truncate" }, toDisplayString(invitation.email), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiBadge, {
                                          variant: "outline",
                                          class: "capitalize"
                                        }, {
                                          default: withCtx(() => [
                                            invitation.role === "admin" ? (openBlock(), createBlock(_component_Icon, {
                                              key: 0,
                                              name: "lucide:shield",
                                              class: "mr-1"
                                            })) : (openBlock(), createBlock(_component_Icon, {
                                              key: 1,
                                              name: "lucide:user",
                                              class: "mr-1"
                                            })),
                                            createTextVNode(" " + toDisplayString(invitation.role), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(new Date(invitation.createdAt).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric",
                                          year: "numeric"
                                        })), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                                          month: "short",
                                          day: "numeric"
                                        })), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiBadge, {
                                          variant: "secondary",
                                          class: "capitalize"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_Icon, {
                                              name: "lucide:clock",
                                              class: "mr-1"
                                            }),
                                            createTextVNode(" " + toDisplayString(invitation.status), 1)
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024);
                              }), 128))
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardContent, { class: "p-0" }, {
                default: withCtx(() => [
                  unref(pending) ? (openBlock(), createBlock("div", { key: 0 }, [
                    createVNode("div", { class: "flex items-center justify-center py-12" }, [
                      createVNode(_component_Icon, {
                        name: "lucide:loader-2",
                        class: "animate-spin text-muted-foreground"
                      })
                    ])
                  ])) : unref(error) ? (openBlock(), createBlock("div", { key: 1 }, [
                    createVNode("div", { class: "flex flex-col items-center justify-center py-12" }, [
                      createVNode(_component_Icon, {
                        name: "lucide:alert-circle",
                        class: "mb-4 text-destructive"
                      }),
                      createVNode("p", { class: "text-lg font-semibold" }, "Failed to load invitations"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(error)?.message || "Please try again"), 1)
                    ])
                  ])) : unref(filteredInvitations).length === 0 ? (openBlock(), createBlock("div", { key: 2 }, [
                    createVNode("div", { class: "flex flex-col items-center justify-center py-12" }, [
                      createVNode("div", { class: "mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted" }, [
                        createVNode(_component_Icon, {
                          name: "lucide:inbox",
                          class: "text-muted-foreground"
                        })
                      ]),
                      createVNode("h3", { class: "mb-2 text-lg font-semibold" }, "No invitations found"),
                      createVNode("p", { class: "text-sm text-muted-foreground" }, toDisplayString(unref(searchQuery) ? "Try a different search term" : "You have no pending invitations"), 1)
                    ])
                  ])) : (openBlock(), createBlock("div", {
                    key: 3,
                    class: "rounded-md border"
                  }, [
                    createVNode(_component_UiTable, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Invitation ID")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Email")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Role")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Date")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Expires")
                                  ]),
                                  _: 1
                                }),
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Status")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiTableBody, null, {
                          default: withCtx(() => [
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(filteredInvitations), (invitation) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: invitation.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("div", { class: "flex h-8 w-8 items-center justify-center rounded-md bg-primary/10" }, [
                                          createVNode(_component_Icon, {
                                            name: "lucide:building-2",
                                            class: "text-primary"
                                          })
                                        ]),
                                        createVNode("span", { class: "max-w-[200px]" }, toDisplayString(invitation.id), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "font-mono text-sm" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode("span", { class: "max-w-[200px] truncate" }, toDisplayString(invitation.email), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiBadge, {
                                        variant: "outline",
                                        class: "capitalize"
                                      }, {
                                        default: withCtx(() => [
                                          invitation.role === "admin" ? (openBlock(), createBlock(_component_Icon, {
                                            key: 0,
                                            name: "lucide:shield",
                                            class: "mr-1"
                                          })) : (openBlock(), createBlock(_component_Icon, {
                                            key: 1,
                                            name: "lucide:user",
                                            class: "mr-1"
                                          })),
                                          createTextVNode(" " + toDisplayString(invitation.role), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(new Date(invitation.createdAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric",
                                        year: "numeric"
                                      })), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-muted-foreground" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(new Date(invitation.expiresAt).toLocaleDateString("en-US", {
                                        month: "short",
                                        day: "numeric"
                                      })), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiBadge, {
                                        variant: "secondary",
                                        class: "capitalize"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(_component_Icon, {
                                            name: "lucide:clock",
                                            class: "mr-1"
                                          }),
                                          createTextVNode(" " + toDisplayString(invitation.status), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024);
                            }), 128))
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]))
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/orgs/invitations.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=invitations-B8v7gDgC.mjs.map
