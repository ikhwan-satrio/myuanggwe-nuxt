import { _ as _sfc_main$1 } from './index-dZMOOFG9.mjs';
import { D as useNuxtApp, A as useAsyncData, y as refreshNuxtData, w as navigateTo, B as useHead, a as __nuxt_component_1, c as _sfc_main$X } from './server.mjs';
import { e as _sfc_main$6, d as _sfc_main$4, a as _sfc_main$1$1, _ as _sfc_main$2, c as _sfc_main$3 } from './CardTitle-GwIPrVhf.mjs';
import { e as _sfc_main$8, _ as _sfc_main$5, b as _sfc_main$4$1, a as _sfc_main$1$2, d as _sfc_main$7, c as _sfc_main$5$1 } from './TableHeader-CtjPTqbx.mjs';
import { f as _sfc_main$9, e as _sfc_main$6$1, b as _sfc_main$3$1, a as _sfc_main$1$3, d as _sfc_main$5$2, c as _sfc_main$4$2 } from './DialogTrigger-Bsj6TWLg.mjs';
import { defineComponent, computed, mergeProps, unref, withCtx, createTextVNode, toDisplayString, createVNode, openBlock, createBlock, Fragment, renderList, createCommentVNode, ref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { useMutation } from '@tanstack/vue-query';
import { toast } from 'vue-sonner';
import { defineStore } from 'pinia';
import 'class-variance-authority';
import 'reka-ui';
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
import 'perfect-debounce';
import '@vue/shared';
import '@iconify/vue';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import 'clsx';
import 'tailwind-merge';
import '@lucide/vue';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const useOrgsManageStore = defineStore("orgs-manage", () => {
  const memberToRemove = ref(null);
  const isRemoveDialogOpen = ref(false);
  const isDeleteDialogOpen = ref(false);
  function openRemoveMember(member) {
    memberToRemove.value = member;
    isRemoveDialogOpen.value = true;
  }
  function closeRemoveMember() {
    isRemoveDialogOpen.value = false;
    memberToRemove.value = null;
  }
  function openDeleteOrg() {
    isDeleteDialogOpen.value = true;
  }
  function closeDeleteOrg() {
    isDeleteDialogOpen.value = false;
  }
  return {
    memberToRemove,
    isRemoveDialogOpen,
    isDeleteDialogOpen,
    openRemoveMember,
    closeRemoveMember,
    openDeleteOrg,
    closeDeleteOrg
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "manage",
  __ssrInlineRender: true,
  setup(__props) {
    const authClient = useNuxtApp().$authClient;
    const store = useOrgsManageStore();
    const orgs = authClient.useActiveOrganization();
    const user = authClient.useSession();
    const manageQuery = useAsyncData(
      "manage-orgs",
      async () => {
        const { data, error } = await authClient.organization.getFullOrganization({
          query: {
            organizationId: orgs.value.data?.id
          }
        });
        if (error) throw error;
        return data;
      },
      { server: false, lazy: true, immediate: !!orgs.value.data?.id }
    );
    const isOwner = computed(() => {
      return orgs.value.data?.members.find((o) => o.user.id == user.value.data?.user.id)?.role === "owner";
    });
    const removeMemberMutation = useMutation({
      mutationFn: async (id) => {
        const { data, error } = await authClient.organization.removeMember({
          memberIdOrEmail: id,
          organizationId: orgs.value.data?.id
        });
        if (error) throw error;
        return data;
      },
      onSuccess: async () => {
        await refreshNuxtData();
        toast.success("Member removed");
        store.closeRemoveMember();
      },
      onError: (err) => {
        toast.error(err.message || "Failed to remove member");
      }
    });
    const updateRoleMutation = useMutation({
      mutationFn: async ({ id, role }) => {
        const { data, error } = await authClient.organization.updateMemberRole({
          role,
          memberId: id,
          organizationId: orgs.value.data?.id
        });
        if (error) throw error;
        return data;
      },
      onSuccess: async () => {
        await refreshNuxtData();
        toast.success("Role updated");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to update role");
      }
    });
    const deleteOrgMutation = useMutation({
      mutationFn: async () => {
        const { data, error } = await authClient.organization.delete({
          organizationId: orgs.value.data?.id
        });
        if (error) throw new Error(error.message || "Cannot delete orgs!");
        return data;
      },
      onSuccess: async () => {
        await refreshNuxtData();
        toast.success("Organization deleted successfully");
        navigateTo("/dashboard");
      },
      onError: (err) => {
        toast.error(err.message || "Failed to delete organization");
      }
    });
    const handleUpdateRole = (id, currentRole) => {
      const newRole = currentRole === "admin" ? "member" : "admin";
      updateRoleMutation.mutate({ id, role: newRole });
    };
    const handleRemoveMember = () => {
      if (store.memberToRemove) {
        removeMemberMutation.mutate(store.memberToRemove.id);
      }
    };
    const handleDeleteOrg = () => {
      deleteOrgMutation.mutate();
    };
    useHead({
      title: "Kelola Organisasi - MyUangGwe | Manajemen Tim",
      meta: [
        {
          name: "description",
          content: "Kelola anggota tim, atur peran, dan monitoring keuangan organisasi atau bisnis kecil Anda bersama-sama."
        },
        {
          name: "keywords",
          content: "organisasi keuangan, manajemen tim, bisnis kecil, kolaborasi keuangan, kelola anggota"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiBadge = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardContent = _sfc_main$4;
      const _component_UiButton = _sfc_main$X;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardDescription = _sfc_main$3;
      const _component_UiTable = _sfc_main$8;
      const _component_UiTableHeader = _sfc_main$5;
      const _component_UiTableRow = _sfc_main$4$1;
      const _component_UiTableHead = _sfc_main$1$2;
      const _component_UiTableBody = _sfc_main$7;
      const _component_UiTableCell = _sfc_main$5$1;
      const _component_UiDialog = _sfc_main$9;
      const _component_UiDialogContent = _sfc_main$6$1;
      const _component_UiDialogHeader = _sfc_main$3$1;
      const _component_UiDialogTitle = _sfc_main$1$3;
      const _component_UiDialogDescription = _sfc_main$5$2;
      const _component_UiDialogFooter = _sfc_main$4$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "container mx-auto max-w-4xl space-y-6 p-6" }, _attrs))}><div class="flex items-center justify-between"><h1 class="text-3xl font-bold tracking-tight">Organization Management</h1>`);
      if (unref(manageQuery).data?.value?.name) {
        _push(ssrRenderComponent(_component_UiBadge, {
          variant: "outline",
          class: "px-3 py-1 text-sm"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Active: ${ssrInterpolate(unref(manageQuery).data.value.name)}`);
            } else {
              return [
                createTextVNode(" Active: " + toDisplayString(unref(manageQuery).data.value.name), 1)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(manageQuery).pending.value) {
        _push(`<div class="flex h-64 items-center justify-center">`);
        _push(ssrRenderComponent(_component_Icon, {
          name: "lucide:loader-2",
          class: "h-8 w-8 animate-spin text-muted-foreground"
        }, null, _parent));
        _push(`</div>`);
      } else if (!unref(manageQuery).data?.value) {
        _push(ssrRenderComponent(_component_UiCard, { class: "border-dashed bg-muted/50" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex flex-col items-center justify-center space-y-4 py-12 text-center" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:building-2",
                      class: "h-12 w-12 text-muted-foreground/50"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="space-y-2"${_scopeId2}><h2 class="text-xl font-semibold"${_scopeId2}>No Organization Active</h2><p class="max-w-sm text-muted-foreground"${_scopeId2}> Please switch to an organization context to manage its members and settings. </p></div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/organizations")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Go to Organizations`);
                        } else {
                          return [
                            createTextVNode("Go to Organizations")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "lucide:building-2",
                        class: "h-12 w-12 text-muted-foreground/50"
                      }),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "No Organization Active"),
                        createVNode("p", { class: "max-w-sm text-muted-foreground" }, " Please switch to an organization context to manage its members and settings. ")
                      ]),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/organizations")
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Go to Organizations")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "flex flex-col items-center justify-center space-y-4 py-12 text-center" }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "lucide:building-2",
                      class: "h-12 w-12 text-muted-foreground/50"
                    }),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h2", { class: "text-xl font-semibold" }, "No Organization Active"),
                      createVNode("p", { class: "max-w-sm text-muted-foreground" }, " Please switch to an organization context to manage its members and settings. ")
                    ]),
                    createVNode(_component_UiButton, {
                      variant: "outline",
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/organizations")
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Go to Organizations")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else if (!unref(isOwner)) {
        _push(ssrRenderComponent(_component_UiCard, { class: "border-destructive/20 bg-destructive/5" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardContent, { class: "flex flex-col items-center justify-center space-y-4 py-12 text-center text-destructive" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_Icon, {
                      name: "lucide:shield-alert",
                      class: "h-12 w-12"
                    }, null, _parent3, _scopeId2));
                    _push3(`<div class="space-y-2"${_scopeId2}><h2 class="text-xl font-semibold"${_scopeId2}>Access Restricted</h2><p class="max-w-sm text-destructive/80"${_scopeId2}> You must be an <strong${_scopeId2}>Owner</strong> of this organization to manage members and settings. </p></div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "outline",
                      class: "border-destructive/20 hover:bg-destructive/10",
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/dashboard")
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Back to Dashboard `);
                        } else {
                          return [
                            createTextVNode(" Back to Dashboard ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_Icon, {
                        name: "lucide:shield-alert",
                        class: "h-12 w-12"
                      }),
                      createVNode("div", { class: "space-y-2" }, [
                        createVNode("h2", { class: "text-xl font-semibold" }, "Access Restricted"),
                        createVNode("p", { class: "max-w-sm text-destructive/80" }, [
                          createTextVNode(" You must be an "),
                          createVNode("strong", null, "Owner"),
                          createTextVNode(" of this organization to manage members and settings. ")
                        ])
                      ]),
                      createVNode(_component_UiButton, {
                        variant: "outline",
                        class: "border-destructive/20 hover:bg-destructive/10",
                        onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/dashboard")
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Back to Dashboard ")
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardContent, { class: "flex flex-col items-center justify-center space-y-4 py-12 text-center text-destructive" }, {
                  default: withCtx(() => [
                    createVNode(_component_Icon, {
                      name: "lucide:shield-alert",
                      class: "h-12 w-12"
                    }),
                    createVNode("div", { class: "space-y-2" }, [
                      createVNode("h2", { class: "text-xl font-semibold" }, "Access Restricted"),
                      createVNode("p", { class: "max-w-sm text-destructive/80" }, [
                        createTextVNode(" You must be an "),
                        createVNode("strong", null, "Owner"),
                        createTextVNode(" of this organization to manage members and settings. ")
                      ])
                    ]),
                    createVNode(_component_UiButton, {
                      variant: "outline",
                      class: "border-destructive/20 hover:bg-destructive/10",
                      onClick: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/dashboard")
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Back to Dashboard ")
                      ]),
                      _: 1
                    }, 8, ["onClick"])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_UiCard, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Members`);
                        } else {
                          return [
                            createTextVNode("Members")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Manage who has access to this organization.`);
                        } else {
                          return [
                            createTextVNode("Manage who has access to this organization.")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Members")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Manage who has access to this organization.")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
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
                                            _push7(`Name`);
                                          } else {
                                            return [
                                              createTextVNode("Name")
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
                                      _push6(ssrRenderComponent(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`Actions`);
                                          } else {
                                            return [
                                              createTextVNode("Actions")
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(_component_UiTableHead, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Name")
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
                                        createVNode(_component_UiTableHead, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            createTextVNode("Actions")
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
                                          createTextVNode("Name")
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
                                      createVNode(_component_UiTableHead, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          createTextVNode("Actions")
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
                                ssrRenderList(unref(manageQuery).data?.value?.members, (member) => {
                                  _push5(ssrRenderComponent(_component_UiTableRow, {
                                    key: member.id
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "font-medium" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(member.user.name)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(member.user.name), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`${ssrInterpolate(member.user.email)}`);
                                            } else {
                                              return [
                                                createTextVNode(toDisplayString(member.user.email), 1)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(_component_UiBadge, {
                                                variant: member.role === "owner" ? "default" : "secondary"
                                              }, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`${ssrInterpolate(member.role)}`);
                                                  } else {
                                                    return [
                                                      createTextVNode(toDisplayString(member.role), 1)
                                                    ];
                                                  }
                                                }),
                                                _: 2
                                              }, _parent7, _scopeId6));
                                            } else {
                                              return [
                                                createVNode(_component_UiBadge, {
                                                  variant: member.role === "owner" ? "default" : "secondary"
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(toDisplayString(member.role), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["variant"])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              if (member.role !== "owner") {
                                                _push7(`<div class="flex justify-end gap-2"${_scopeId6}>`);
                                                _push7(ssrRenderComponent(_component_UiButton, {
                                                  variant: "ghost",
                                                  size: "sm",
                                                  onClick: ($event) => handleUpdateRole(member.id, member.role),
                                                  disabled: unref(updateRoleMutation).isPending.value
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_Icon, {
                                                        name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                                        class: "mr-2 h-4 w-4"
                                                      }, null, _parent8, _scopeId7));
                                                      _push8(` ${ssrInterpolate(member.role === "admin" ? "Demote" : "Promote")}`);
                                                    } else {
                                                      return [
                                                        createVNode(_component_Icon, {
                                                          name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                                          class: "mr-2 h-4 w-4"
                                                        }, null, 8, ["name"]),
                                                        createTextVNode(" " + toDisplayString(member.role === "admin" ? "Demote" : "Promote"), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                                _push7(ssrRenderComponent(_component_UiButton, {
                                                  variant: "ghost",
                                                  size: "sm",
                                                  class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                                  onClick: ($event) => unref(store).openRemoveMember({ id: member.id, name: member.user.name }),
                                                  disabled: unref(removeMemberMutation).isPending.value
                                                }, {
                                                  default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                    if (_push8) {
                                                      _push8(ssrRenderComponent(_component_Icon, {
                                                        name: "lucide:user-minus",
                                                        class: "h-4 w-4"
                                                      }, null, _parent8, _scopeId7));
                                                    } else {
                                                      return [
                                                        createVNode(_component_Icon, {
                                                          name: "lucide:user-minus",
                                                          class: "h-4 w-4"
                                                        })
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent7, _scopeId6));
                                                _push7(`</div>`);
                                              } else {
                                                _push7(`<span class="text-xs text-muted-foreground italic"${_scopeId6}>Owner</span>`);
                                              }
                                            } else {
                                              return [
                                                member.role !== "owner" ? (openBlock(), createBlock("div", {
                                                  key: 0,
                                                  class: "flex justify-end gap-2"
                                                }, [
                                                  createVNode(_component_UiButton, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    onClick: ($event) => handleUpdateRole(member.id, member.role),
                                                    disabled: unref(updateRoleMutation).isPending.value
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_Icon, {
                                                        name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                                        class: "mr-2 h-4 w-4"
                                                      }, null, 8, ["name"]),
                                                      createTextVNode(" " + toDisplayString(member.role === "admin" ? "Demote" : "Promote"), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1032, ["onClick", "disabled"]),
                                                  createVNode(_component_UiButton, {
                                                    variant: "ghost",
                                                    size: "sm",
                                                    class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                                    onClick: ($event) => unref(store).openRemoveMember({ id: member.id, name: member.user.name }),
                                                    disabled: unref(removeMemberMutation).isPending.value
                                                  }, {
                                                    default: withCtx(() => [
                                                      createVNode(_component_Icon, {
                                                        name: "lucide:user-minus",
                                                        class: "h-4 w-4"
                                                      })
                                                    ]),
                                                    _: 1
                                                  }, 8, ["onClick", "disabled"])
                                                ])) : (openBlock(), createBlock("span", {
                                                  key: 1,
                                                  class: "text-xs text-muted-foreground italic"
                                                }, "Owner"))
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(_component_UiTableCell, { class: "font-medium" }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(member.user.name), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(member.user.email), 1)
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, null, {
                                            default: withCtx(() => [
                                              createVNode(_component_UiBadge, {
                                                variant: member.role === "owner" ? "default" : "secondary"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(member.role), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["variant"])
                                            ]),
                                            _: 2
                                          }, 1024),
                                          createVNode(_component_UiTableCell, { class: "text-right" }, {
                                            default: withCtx(() => [
                                              member.role !== "owner" ? (openBlock(), createBlock("div", {
                                                key: 0,
                                                class: "flex justify-end gap-2"
                                              }, [
                                                createVNode(_component_UiButton, {
                                                  variant: "ghost",
                                                  size: "sm",
                                                  onClick: ($event) => handleUpdateRole(member.id, member.role),
                                                  disabled: unref(updateRoleMutation).isPending.value
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_Icon, {
                                                      name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                                      class: "mr-2 h-4 w-4"
                                                    }, null, 8, ["name"]),
                                                    createTextVNode(" " + toDisplayString(member.role === "admin" ? "Demote" : "Promote"), 1)
                                                  ]),
                                                  _: 2
                                                }, 1032, ["onClick", "disabled"]),
                                                createVNode(_component_UiButton, {
                                                  variant: "ghost",
                                                  size: "sm",
                                                  class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                                  onClick: ($event) => unref(store).openRemoveMember({ id: member.id, name: member.user.name }),
                                                  disabled: unref(removeMemberMutation).isPending.value
                                                }, {
                                                  default: withCtx(() => [
                                                    createVNode(_component_Icon, {
                                                      name: "lucide:user-minus",
                                                      class: "h-4 w-4"
                                                    })
                                                  ]),
                                                  _: 1
                                                }, 8, ["onClick", "disabled"])
                                              ])) : (openBlock(), createBlock("span", {
                                                key: 1,
                                                class: "text-xs text-muted-foreground italic"
                                              }, "Owner"))
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
                                  (openBlock(true), createBlock(Fragment, null, renderList(unref(manageQuery).data?.value?.members, (member) => {
                                    return openBlock(), createBlock(_component_UiTableRow, {
                                      key: member.id
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiTableCell, { class: "font-medium" }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(member.user.name), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(member.user.email), 1)
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, null, {
                                          default: withCtx(() => [
                                            createVNode(_component_UiBadge, {
                                              variant: member.role === "owner" ? "default" : "secondary"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(member.role), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["variant"])
                                          ]),
                                          _: 2
                                        }, 1024),
                                        createVNode(_component_UiTableCell, { class: "text-right" }, {
                                          default: withCtx(() => [
                                            member.role !== "owner" ? (openBlock(), createBlock("div", {
                                              key: 0,
                                              class: "flex justify-end gap-2"
                                            }, [
                                              createVNode(_component_UiButton, {
                                                variant: "ghost",
                                                size: "sm",
                                                onClick: ($event) => handleUpdateRole(member.id, member.role),
                                                disabled: unref(updateRoleMutation).isPending.value
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_Icon, {
                                                    name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                                    class: "mr-2 h-4 w-4"
                                                  }, null, 8, ["name"]),
                                                  createTextVNode(" " + toDisplayString(member.role === "admin" ? "Demote" : "Promote"), 1)
                                                ]),
                                                _: 2
                                              }, 1032, ["onClick", "disabled"]),
                                              createVNode(_component_UiButton, {
                                                variant: "ghost",
                                                size: "sm",
                                                class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                                onClick: ($event) => unref(store).openRemoveMember({ id: member.id, name: member.user.name }),
                                                disabled: unref(removeMemberMutation).isPending.value
                                              }, {
                                                default: withCtx(() => [
                                                  createVNode(_component_Icon, {
                                                    name: "lucide:user-minus",
                                                    class: "h-4 w-4"
                                                  })
                                                ]),
                                                _: 1
                                              }, 8, ["onClick", "disabled"])
                                            ])) : (openBlock(), createBlock("span", {
                                              key: 1,
                                              class: "text-xs text-muted-foreground italic"
                                            }, "Owner"))
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
                                        createTextVNode("Name")
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
                                    createVNode(_component_UiTableHead, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        createTextVNode("Actions")
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
                                (openBlock(true), createBlock(Fragment, null, renderList(unref(manageQuery).data?.value?.members, (member) => {
                                  return openBlock(), createBlock(_component_UiTableRow, {
                                    key: member.id
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiTableCell, { class: "font-medium" }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(member.user.name), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(member.user.email), 1)
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, null, {
                                        default: withCtx(() => [
                                          createVNode(_component_UiBadge, {
                                            variant: member.role === "owner" ? "default" : "secondary"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(member.role), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["variant"])
                                        ]),
                                        _: 2
                                      }, 1024),
                                      createVNode(_component_UiTableCell, { class: "text-right" }, {
                                        default: withCtx(() => [
                                          member.role !== "owner" ? (openBlock(), createBlock("div", {
                                            key: 0,
                                            class: "flex justify-end gap-2"
                                          }, [
                                            createVNode(_component_UiButton, {
                                              variant: "ghost",
                                              size: "sm",
                                              onClick: ($event) => handleUpdateRole(member.id, member.role),
                                              disabled: unref(updateRoleMutation).isPending.value
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_Icon, {
                                                  name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                                  class: "mr-2 h-4 w-4"
                                                }, null, 8, ["name"]),
                                                createTextVNode(" " + toDisplayString(member.role === "admin" ? "Demote" : "Promote"), 1)
                                              ]),
                                              _: 2
                                            }, 1032, ["onClick", "disabled"]),
                                            createVNode(_component_UiButton, {
                                              variant: "ghost",
                                              size: "sm",
                                              class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                              onClick: ($event) => unref(store).openRemoveMember({ id: member.id, name: member.user.name }),
                                              disabled: unref(removeMemberMutation).isPending.value
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(_component_Icon, {
                                                  name: "lucide:user-minus",
                                                  class: "h-4 w-4"
                                                })
                                              ]),
                                              _: 1
                                            }, 8, ["onClick", "disabled"])
                                          ])) : (openBlock(), createBlock("span", {
                                            key: 1,
                                            class: "text-xs text-muted-foreground italic"
                                          }, "Owner"))
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
                  } else {
                    return [
                      createVNode(_component_UiTable, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiTableHeader, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiTableRow, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableHead, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Name")
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
                                  createVNode(_component_UiTableHead, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      createTextVNode("Actions")
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
                              (openBlock(true), createBlock(Fragment, null, renderList(unref(manageQuery).data?.value?.members, (member) => {
                                return openBlock(), createBlock(_component_UiTableRow, {
                                  key: member.id
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiTableCell, { class: "font-medium" }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(member.user.name), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(member.user.email), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, null, {
                                      default: withCtx(() => [
                                        createVNode(_component_UiBadge, {
                                          variant: member.role === "owner" ? "default" : "secondary"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(member.role), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["variant"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(_component_UiTableCell, { class: "text-right" }, {
                                      default: withCtx(() => [
                                        member.role !== "owner" ? (openBlock(), createBlock("div", {
                                          key: 0,
                                          class: "flex justify-end gap-2"
                                        }, [
                                          createVNode(_component_UiButton, {
                                            variant: "ghost",
                                            size: "sm",
                                            onClick: ($event) => handleUpdateRole(member.id, member.role),
                                            disabled: unref(updateRoleMutation).isPending.value
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_Icon, {
                                                name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                                class: "mr-2 h-4 w-4"
                                              }, null, 8, ["name"]),
                                              createTextVNode(" " + toDisplayString(member.role === "admin" ? "Demote" : "Promote"), 1)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick", "disabled"]),
                                          createVNode(_component_UiButton, {
                                            variant: "ghost",
                                            size: "sm",
                                            class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                            onClick: ($event) => unref(store).openRemoveMember({ id: member.id, name: member.user.name }),
                                            disabled: unref(removeMemberMutation).isPending.value
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(_component_Icon, {
                                                name: "lucide:user-minus",
                                                class: "h-4 w-4"
                                              })
                                            ]),
                                            _: 1
                                          }, 8, ["onClick", "disabled"])
                                        ])) : (openBlock(), createBlock("span", {
                                          key: 1,
                                          class: "text-xs text-muted-foreground italic"
                                        }, "Owner"))
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
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Members")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Manage who has access to this organization.")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiTable, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiTableHeader, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiTableRow, null, {
                              default: withCtx(() => [
                                createVNode(_component_UiTableHead, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Name")
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
                                createVNode(_component_UiTableHead, { class: "text-right" }, {
                                  default: withCtx(() => [
                                    createTextVNode("Actions")
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
                            (openBlock(true), createBlock(Fragment, null, renderList(unref(manageQuery).data?.value?.members, (member) => {
                              return openBlock(), createBlock(_component_UiTableRow, {
                                key: member.id
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiTableCell, { class: "font-medium" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(member.user.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(member.user.email), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, null, {
                                    default: withCtx(() => [
                                      createVNode(_component_UiBadge, {
                                        variant: member.role === "owner" ? "default" : "secondary"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(member.role), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["variant"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(_component_UiTableCell, { class: "text-right" }, {
                                    default: withCtx(() => [
                                      member.role !== "owner" ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "flex justify-end gap-2"
                                      }, [
                                        createVNode(_component_UiButton, {
                                          variant: "ghost",
                                          size: "sm",
                                          onClick: ($event) => handleUpdateRole(member.id, member.role),
                                          disabled: unref(updateRoleMutation).isPending.value
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_Icon, {
                                              name: member.role === "admin" ? "lucide:arrow-down" : "lucide:arrow-up",
                                              class: "mr-2 h-4 w-4"
                                            }, null, 8, ["name"]),
                                            createTextVNode(" " + toDisplayString(member.role === "admin" ? "Demote" : "Promote"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick", "disabled"]),
                                        createVNode(_component_UiButton, {
                                          variant: "ghost",
                                          size: "sm",
                                          class: "text-destructive hover:bg-destructive/10 hover:text-destructive",
                                          onClick: ($event) => unref(store).openRemoveMember({ id: member.id, name: member.user.name }),
                                          disabled: unref(removeMemberMutation).isPending.value
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(_component_Icon, {
                                              name: "lucide:user-minus",
                                              class: "h-4 w-4"
                                            })
                                          ]),
                                          _: 1
                                        }, 8, ["onClick", "disabled"])
                                      ])) : (openBlock(), createBlock("span", {
                                        key: 1,
                                        class: "text-xs text-muted-foreground italic"
                                      }, "Owner"))
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
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiCard, { class: "border-destructive/50 bg-destructive/5" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiCardHeader, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-destructive" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Danger Zone`);
                        } else {
                          return [
                            createTextVNode("Danger Zone")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`Irreversible actions for your organization.`);
                        } else {
                          return [
                            createTextVNode("Irreversible actions for your organization.")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiCardTitle, { class: "text-destructive" }, {
                        default: withCtx(() => [
                          createTextVNode("Danger Zone")
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiCardDescription, null, {
                        default: withCtx(() => [
                          createTextVNode("Irreversible actions for your organization.")
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(_component_UiCardContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="flex items-center justify-between"${_scopeId2}><div class="space-y-1"${_scopeId2}><h4 class="font-medium"${_scopeId2}>Delete Organization</h4><p class="text-sm text-muted-foreground"${_scopeId2}> This will permanently delete the organization and all its data. </p></div>`);
                    _push3(ssrRenderComponent(_component_UiButton, {
                      variant: "destructive",
                      onClick: ($event) => unref(store).openDeleteOrg(),
                      disabled: unref(deleteOrgMutation).isPending.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          if (unref(deleteOrgMutation).isPending.value) {
                            _push4(ssrRenderComponent(_component_Icon, {
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            }, null, _parent4, _scopeId3));
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(` ${ssrInterpolate(unref(deleteOrgMutation).isPending.value ? "Deleting..." : "Delete Organization")}`);
                        } else {
                          return [
                            unref(deleteOrgMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(deleteOrgMutation).isPending.value ? "Deleting..." : "Delete Organization"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    return [
                      createVNode("div", { class: "flex items-center justify-between" }, [
                        createVNode("div", { class: "space-y-1" }, [
                          createVNode("h4", { class: "font-medium" }, "Delete Organization"),
                          createVNode("p", { class: "text-sm text-muted-foreground" }, " This will permanently delete the organization and all its data. ")
                        ]),
                        createVNode(_component_UiButton, {
                          variant: "destructive",
                          onClick: ($event) => unref(store).openDeleteOrg(),
                          disabled: unref(deleteOrgMutation).isPending.value
                        }, {
                          default: withCtx(() => [
                            unref(deleteOrgMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(unref(deleteOrgMutation).isPending.value ? "Deleting..." : "Delete Organization"), 1)
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"])
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiCardHeader, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardTitle, { class: "text-destructive" }, {
                      default: withCtx(() => [
                        createTextVNode("Danger Zone")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Irreversible actions for your organization.")
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCardContent, null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "flex items-center justify-between" }, [
                      createVNode("div", { class: "space-y-1" }, [
                        createVNode("h4", { class: "font-medium" }, "Delete Organization"),
                        createVNode("p", { class: "text-sm text-muted-foreground" }, " This will permanently delete the organization and all its data. ")
                      ]),
                      createVNode(_component_UiButton, {
                        variant: "destructive",
                        onClick: ($event) => unref(store).openDeleteOrg(),
                        disabled: unref(deleteOrgMutation).isPending.value
                      }, {
                        default: withCtx(() => [
                          unref(deleteOrgMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                            key: 0,
                            name: "lucide:loader-2",
                            class: "mr-2 h-4 w-4 animate-spin"
                          })) : createCommentVNode("", true),
                          createTextVNode(" " + toDisplayString(unref(deleteOrgMutation).isPending.value ? "Deleting..." : "Delete Organization"), 1)
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"])
                    ])
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_UiDialog, {
          open: unref(store).isRemoveDialogOpen,
          "onUpdate:open": ($event) => unref(store).closeRemoveMember()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiDialogContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiDialogTitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Remove Member`);
                              } else {
                                return [
                                  createTextVNode("Remove Member")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(` Are you sure you want to remove <strong${_scopeId4}>${ssrInterpolate(unref(store).memberToRemove?.name)}</strong> from this organization? `);
                              } else {
                                return [
                                  createTextVNode(" Are you sure you want to remove "),
                                  createVNode("strong", null, toDisplayString(unref(store).memberToRemove?.name), 1),
                                  createTextVNode(" from this organization? ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiDialogTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Remove Member")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiDialogDescription, null, {
                              default: withCtx(() => [
                                createTextVNode(" Are you sure you want to remove "),
                                createVNode("strong", null, toDisplayString(unref(store).memberToRemove?.name), 1),
                                createTextVNode(" from this organization? ")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiButton, {
                            variant: "outline",
                            onClick: ($event) => unref(store).closeRemoveMember()
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Cancel`);
                              } else {
                                return [
                                  createTextVNode("Cancel")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiButton, {
                            variant: "destructive",
                            onClick: handleRemoveMember,
                            disabled: unref(removeMemberMutation).isPending.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (unref(removeMemberMutation).isPending.value) {
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "lucide:loader-2",
                                    class: "mr-2 h-4 w-4 animate-spin"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(` Remove Member `);
                              } else {
                                return [
                                  unref(removeMemberMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                                    key: 0,
                                    name: "lucide:loader-2",
                                    class: "mr-2 h-4 w-4 animate-spin"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" Remove Member ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiButton, {
                              variant: "outline",
                              onClick: ($event) => unref(store).closeRemoveMember()
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancel")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_UiButton, {
                              variant: "destructive",
                              onClick: handleRemoveMember,
                              disabled: unref(removeMemberMutation).isPending.value
                            }, {
                              default: withCtx(() => [
                                unref(removeMemberMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" Remove Member ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiDialogHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiDialogTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Remove Member")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createTextVNode(" Are you sure you want to remove "),
                              createVNode("strong", null, toDisplayString(unref(store).memberToRemove?.name), 1),
                              createTextVNode(" from this organization? ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            variant: "outline",
                            onClick: ($event) => unref(store).closeRemoveMember()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            variant: "destructive",
                            onClick: handleRemoveMember,
                            disabled: unref(removeMemberMutation).isPending.value
                          }, {
                            default: withCtx(() => [
                              unref(removeMemberMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" Remove Member ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiDialogContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Remove Member")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createTextVNode(" Are you sure you want to remove "),
                            createVNode("strong", null, toDisplayString(unref(store).memberToRemove?.name), 1),
                            createTextVNode(" from this organization? ")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          onClick: ($event) => unref(store).closeRemoveMember()
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          variant: "destructive",
                          onClick: handleRemoveMember,
                          disabled: unref(removeMemberMutation).isPending.value
                        }, {
                          default: withCtx(() => [
                            unref(removeMemberMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" Remove Member ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
        }, _parent));
        _push(ssrRenderComponent(_component_UiDialog, {
          open: unref(store).isDeleteDialogOpen,
          "onUpdate:open": ($event) => unref(store).closeDeleteOrg()
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_UiDialogContent, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(_component_UiDialogHeader, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiDialogTitle, { class: "text-destructive" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Delete Organization`);
                              } else {
                                return [
                                  createTextVNode("Delete Organization")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiDialogDescription, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="space-y-3"${_scopeId4}><p${_scopeId4}>CRITICAL ACTION: Are you absolutely sure you want to delete this organization?</p><div class="rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive"${_scopeId4}> Warning: All wallets, transactions, and categories associated with this organization will be PERMANENTLY lost. </div></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "space-y-3" }, [
                                    createVNode("p", null, "CRITICAL ACTION: Are you absolutely sure you want to delete this organization?"),
                                    createVNode("div", { class: "rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive" }, " Warning: All wallets, transactions, and categories associated with this organization will be PERMANENTLY lost. ")
                                  ])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiDialogTitle, { class: "text-destructive" }, {
                              default: withCtx(() => [
                                createTextVNode("Delete Organization")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiDialogDescription, null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "space-y-3" }, [
                                  createVNode("p", null, "CRITICAL ACTION: Are you absolutely sure you want to delete this organization?"),
                                  createVNode("div", { class: "rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive" }, " Warning: All wallets, transactions, and categories associated with this organization will be PERMANENTLY lost. ")
                                ])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(_component_UiDialogFooter, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(_component_UiButton, {
                            variant: "outline",
                            onClick: ($event) => unref(store).closeDeleteOrg()
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`Cancel`);
                              } else {
                                return [
                                  createTextVNode("Cancel")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(_component_UiButton, {
                            variant: "destructive",
                            onClick: handleDeleteOrg,
                            disabled: unref(deleteOrgMutation).isPending.value
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                if (unref(deleteOrgMutation).isPending.value) {
                                  _push5(ssrRenderComponent(_component_Icon, {
                                    name: "lucide:loader-2",
                                    class: "mr-2 h-4 w-4 animate-spin"
                                  }, null, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                                _push5(` Permanently Delete `);
                              } else {
                                return [
                                  unref(deleteOrgMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                                    key: 0,
                                    name: "lucide:loader-2",
                                    class: "mr-2 h-4 w-4 animate-spin"
                                  })) : createCommentVNode("", true),
                                  createTextVNode(" Permanently Delete ")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(_component_UiButton, {
                              variant: "outline",
                              onClick: ($event) => unref(store).closeDeleteOrg()
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Cancel")
                              ]),
                              _: 1
                            }, 8, ["onClick"]),
                            createVNode(_component_UiButton, {
                              variant: "destructive",
                              onClick: handleDeleteOrg,
                              disabled: unref(deleteOrgMutation).isPending.value
                            }, {
                              default: withCtx(() => [
                                unref(deleteOrgMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" Permanently Delete ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(_component_UiDialogHeader, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiDialogTitle, { class: "text-destructive" }, {
                            default: withCtx(() => [
                              createTextVNode("Delete Organization")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiDialogDescription, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "space-y-3" }, [
                                createVNode("p", null, "CRITICAL ACTION: Are you absolutely sure you want to delete this organization?"),
                                createVNode("div", { class: "rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive" }, " Warning: All wallets, transactions, and categories associated with this organization will be PERMANENTLY lost. ")
                              ])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(_component_UiDialogFooter, null, {
                        default: withCtx(() => [
                          createVNode(_component_UiButton, {
                            variant: "outline",
                            onClick: ($event) => unref(store).closeDeleteOrg()
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Cancel")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(_component_UiButton, {
                            variant: "destructive",
                            onClick: handleDeleteOrg,
                            disabled: unref(deleteOrgMutation).isPending.value
                          }, {
                            default: withCtx(() => [
                              unref(deleteOrgMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" Permanently Delete ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(_component_UiDialogContent, null, {
                  default: withCtx(() => [
                    createVNode(_component_UiDialogHeader, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiDialogTitle, { class: "text-destructive" }, {
                          default: withCtx(() => [
                            createTextVNode("Delete Organization")
                          ]),
                          _: 1
                        }),
                        createVNode(_component_UiDialogDescription, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "space-y-3" }, [
                              createVNode("p", null, "CRITICAL ACTION: Are you absolutely sure you want to delete this organization?"),
                              createVNode("div", { class: "rounded-md bg-destructive/10 p-3 text-sm font-medium text-destructive" }, " Warning: All wallets, transactions, and categories associated with this organization will be PERMANENTLY lost. ")
                            ])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiDialogFooter, null, {
                      default: withCtx(() => [
                        createVNode(_component_UiButton, {
                          variant: "outline",
                          onClick: ($event) => unref(store).closeDeleteOrg()
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Cancel")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(_component_UiButton, {
                          variant: "destructive",
                          onClick: handleDeleteOrg,
                          disabled: unref(deleteOrgMutation).isPending.value
                        }, {
                          default: withCtx(() => [
                            unref(deleteOrgMutation).isPending.value ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" Permanently Delete ")
                          ]),
                          _: 1
                        }, 8, ["disabled"])
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
        }, _parent));
        _push(`<!--]-->`);
      }
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/orgs/manage.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=manage-D0vyUMyz.mjs.map
