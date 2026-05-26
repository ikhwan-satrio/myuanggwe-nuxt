import { c as _sfc_main$3$1, a as _sfc_main$1$1, _ as _sfc_main$4, b as _sfc_main$2$1 } from './index-CVUXp8wK.mjs';
import { e as _sfc_main$6, a as _sfc_main$1$2, _ as _sfc_main$5, c as _sfc_main$3$2, d as _sfc_main$4$1, b as _sfc_main$2$2 } from './CardTitle-GwIPrVhf.mjs';
import { _ as _sfc_main$7 } from './Label-DoBiuCH1.mjs';
import { D as useNuxtApp, B as useHead, y as refreshNuxtData, w as navigateTo, b as _sfc_main$H, c as _sfc_main$X, a as __nuxt_component_1, s as _sfc_main$o, d as _sfc_main$19, e as _sfc_main$10, f as _sfc_main$$, g as _sfc_main$18, h as _sfc_main$16 } from './server.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, ref, openBlock, createBlock, toDisplayString, createCommentVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useForm } from '@tanstack/vue-form';
import { toast } from 'vue-sonner';
import { type } from 'arktype';
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
import '@tanstack/vue-query';
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

const createOrgsSchema = type({
  name: "string > 0",
  slug: "string > 0"
});
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "create",
  __ssrInlineRender: true,
  setup(__props) {
    const { $authClient } = useNuxtApp();
    const session = $authClient.useSession();
    const orgForm = useForm({
      defaultValues: { name: "", slug: "" },
      validators: {
        onChange: createOrgsSchema,
        onSubmit: createOrgsSchema
      },
      onSubmit: async ({ value }) => {
        const { error } = await $authClient.organization.create(value);
        if (!error) {
          toast.success("Organisasi berhasil dibuat");
          await refreshNuxtData();
          await navigateTo("/dashboard");
        } else {
          toast.error("Gagal membuat organisasi");
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_UiCardDescription = _sfc_main$3$2;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiInput = _sfc_main$H;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      _push(ssrRenderComponent(_component_UiCard, mergeProps({ class: "w-full max-w-sm" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-2xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Buat Organisasi`);
                      } else {
                        return [
                          createTextVNode("Buat Organisasi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Masukkan nama dan slug untuk membuat organisasi baru.`);
                      } else {
                        return [
                          createTextVNode("Masukkan nama dan slug untuk membuat organisasi baru.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-2xl" }, {
                      default: withCtx(() => [
                        createTextVNode("Buat Organisasi")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Masukkan nama dan slug untuk membuat organisasi baru.")
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
                  _push3(`<form class="grid gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(orgForm).Field, { name: "name" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "name" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Nama`);
                            } else {
                              return [
                                createTextVNode("Nama")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "name",
                          type: "text",
                          placeholder: "Nama Organisasi",
                          value: field.state.value,
                          required: "",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        if (field.state.meta.errors.length > 0) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "name",
                              type: "text",
                              placeholder: "Nama Organisasi",
                              value: field.state.value,
                              required: "",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(orgForm).Field, { name: "slug" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "slug" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Slug`);
                            } else {
                              return [
                                createTextVNode("Slug")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "slug",
                          type: "text",
                          placeholder: "nama-organisasi",
                          value: field.state.value,
                          required: "",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        if (field.state.meta.errors.length > 0) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "slug",
                              type: "text",
                              placeholder: "nama-organisasi",
                              value: field.state.value,
                              required: "",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(orgForm).Subscribe, null, {
                    default: withCtx(({ isSubmitting }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: !unref(session).data || isSubmitting
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
                              _push5(` ${ssrInterpolate(isSubmitting ? "Menyimpan..." : "Buat Organisasi")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Buat Organisasi"), 1)
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
                            disabled: !unref(session).data || isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Buat Organisasi"), 1)
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
                    createVNode("form", {
                      class: "grid gap-4",
                      onSubmit: withModifiers(($event) => unref(orgForm).handleSubmit(), ["prevent"])
                    }, [
                      createVNode(unref(orgForm).Field, { name: "name" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "name" }, {
                              default: withCtx(() => [
                                createTextVNode("Nama")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "name",
                              type: "text",
                              placeholder: "Nama Organisasi",
                              value: field.state.value,
                              required: "",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(orgForm).Field, { name: "slug" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "slug" }, {
                              default: withCtx(() => [
                                createTextVNode("Slug")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "slug",
                              type: "text",
                              placeholder: "nama-organisasi",
                              value: field.state.value,
                              required: "",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(orgForm).Subscribe, null, {
                        default: withCtx(({ isSubmitting }) => [
                          createVNode(_component_UiButton, {
                            type: "submit",
                            class: "w-full",
                            disabled: !unref(session).data || isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                class: "mr-2 h-4 w-4 animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Buat Organisasi"), 1)
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
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-2xl" }, {
                    default: withCtx(() => [
                      createTextVNode("Buat Organisasi")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Masukkan nama dan slug untuk membuat organisasi baru.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    class: "grid gap-4",
                    onSubmit: withModifiers(($event) => unref(orgForm).handleSubmit(), ["prevent"])
                  }, [
                    createVNode(unref(orgForm).Field, { name: "name" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_component_UiLabel, { for: "name" }, {
                            default: withCtx(() => [
                              createTextVNode("Nama")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "name",
                            type: "text",
                            placeholder: "Nama Organisasi",
                            value: field.state.value,
                            required: "",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["value", "onBlur", "onInput"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(orgForm).Field, { name: "slug" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_component_UiLabel, { for: "slug" }, {
                            default: withCtx(() => [
                              createTextVNode("Slug")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "slug",
                            type: "text",
                            placeholder: "nama-organisasi",
                            value: field.state.value,
                            required: "",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["value", "onBlur", "onInput"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(orgForm).Subscribe, null, {
                      default: withCtx(({ isSubmitting }) => [
                        createVNode(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: !unref(session).data || isSubmitting
                        }, {
                          default: withCtx(() => [
                            isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              class: "mr-2 h-4 w-4 animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Menyimpan..." : "Buat Organisasi"), 1)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/orgs/create.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$3, { __name: "FormsOrgsCreate" });
const enterOrgsSchema = type({
  invitationId: "string > 0"
});
const useOrgsTabsStore = defineStore("orgs-tabs", () => {
  const activeTab = ref("create");
  function setActiveTab(tab) {
    activeTab.value = tab;
  }
  return { activeTab, setActiveTab };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "enter",
  __ssrInlineRender: true,
  setup(__props) {
    const orgsTabStore = useOrgsTabsStore();
    const { $authClient } = useNuxtApp();
    const joinOrgForm = useForm({
      defaultValues: { invitationId: "" },
      validators: {
        onChange: enterOrgsSchema,
        onSubmit: enterOrgsSchema
      },
      onSubmit: async ({ value }) => {
        const { error } = await $authClient.organization.acceptInvitation({
          invitationId: value.invitationId
        });
        if (!error) {
          toast.success("Berhasil bergabung dengan organisasi");
          await refreshNuxtData();
          await navigateTo("/dashboard");
        } else {
          toast.error("Gagal bergabung dengan organisasi");
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_UiCardDescription = _sfc_main$3$2;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiInput = _sfc_main$H;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      const _component_UiCardFooter = _sfc_main$2$2;
      const _component_UiSeparator = _sfc_main$o;
      _push(ssrRenderComponent(_component_UiCard, mergeProps({ class: "w-full max-w-md" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-2xl" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Gabung Organisasi`);
                      } else {
                        return [
                          createTextVNode("Gabung Organisasi")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Masukkan ID undangan untuk bergabung.`);
                      } else {
                        return [
                          createTextVNode("Masukkan ID undangan untuk bergabung.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-2xl" }, {
                      default: withCtx(() => [
                        createTextVNode("Gabung Organisasi")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Masukkan ID undangan untuk bergabung.")
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
                  _push3(`<form class="grid gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(joinOrgForm).Field, { name: "invitationId" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "invitationId" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`ID Undangan`);
                            } else {
                              return [
                                createTextVNode("ID Undangan")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "invitationId",
                          type: "text",
                          placeholder: "Masukkan ID undangan",
                          value: field.state.value,
                          required: "",
                          class: "text-center",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        if (field.state.meta.errors.length > 0) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "invitationId" }, {
                              default: withCtx(() => [
                                createTextVNode("ID Undangan")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "invitationId",
                              type: "text",
                              placeholder: "Masukkan ID undangan",
                              value: field.state.value,
                              required: "",
                              class: "text-center",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(joinOrgForm).Subscribe, null, {
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
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: "lucide:users",
                                  class: "mr-2 h-4 w-4"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(isSubmitting ? "Bergabung..." : "Gabung Organisasi")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : (openBlock(), createBlock(_component_Icon, {
                                  key: 1,
                                  name: "lucide:users",
                                  class: "mr-2 h-4 w-4"
                                })),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Bergabung..." : "Gabung Organisasi"), 1)
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
                              })) : (openBlock(), createBlock(_component_Icon, {
                                key: 1,
                                name: "lucide:users",
                                class: "mr-2 h-4 w-4"
                              })),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Bergabung..." : "Gabung Organisasi"), 1)
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
                    createVNode("form", {
                      class: "grid gap-4",
                      onSubmit: withModifiers(($event) => unref(joinOrgForm).handleSubmit(), ["prevent"])
                    }, [
                      createVNode(unref(joinOrgForm).Field, { name: "invitationId" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "invitationId" }, {
                              default: withCtx(() => [
                                createTextVNode("ID Undangan")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "invitationId",
                              type: "text",
                              placeholder: "Masukkan ID undangan",
                              value: field.state.value,
                              required: "",
                              class: "text-center",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(joinOrgForm).Subscribe, null, {
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
                              })) : (openBlock(), createBlock(_component_Icon, {
                                key: 1,
                                name: "lucide:users",
                                class: "mr-2 h-4 w-4"
                              })),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Bergabung..." : "Gabung Organisasi"), 1)
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
            _push2(ssrRenderComponent(_component_UiCardFooter, { class: "flex flex-col gap-4" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiSeparator, null, null, _parent3, _scopeId2));
                  _push3(`<div class="text-center"${_scopeId2}><p class="text-sm text-muted-foreground"${_scopeId2}>Tidak punya ID undangan?</p><button class="text-sm font-medium text-primary underline hover:no-underline cursor-pointer"${_scopeId2}> Buat organisasi sendiri </button></div>`);
                } else {
                  return [
                    createVNode(_component_UiSeparator),
                    createVNode("div", { class: "text-center" }, [
                      createVNode("p", { class: "text-sm text-muted-foreground" }, "Tidak punya ID undangan?"),
                      createVNode("button", {
                        class: "text-sm font-medium text-primary underline hover:no-underline cursor-pointer",
                        onClick: ($event) => unref(orgsTabStore).setActiveTab("create")
                      }, " Buat organisasi sendiri ", 8, ["onClick"])
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
                  createVNode(_component_UiCardTitle, { class: "text-2xl" }, {
                    default: withCtx(() => [
                      createTextVNode("Gabung Organisasi")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Masukkan ID undangan untuk bergabung.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    class: "grid gap-4",
                    onSubmit: withModifiers(($event) => unref(joinOrgForm).handleSubmit(), ["prevent"])
                  }, [
                    createVNode(unref(joinOrgForm).Field, { name: "invitationId" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_component_UiLabel, { for: "invitationId" }, {
                            default: withCtx(() => [
                              createTextVNode("ID Undangan")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "invitationId",
                            type: "text",
                            placeholder: "Masukkan ID undangan",
                            value: field.state.value,
                            required: "",
                            class: "text-center",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["value", "onBlur", "onInput"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(joinOrgForm).Subscribe, null, {
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
                            })) : (openBlock(), createBlock(_component_Icon, {
                              key: 1,
                              name: "lucide:users",
                              class: "mr-2 h-4 w-4"
                            })),
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Bergabung..." : "Gabung Organisasi"), 1)
                          ]),
                          _: 2
                        }, 1032, ["disabled"])
                      ]),
                      _: 1
                    })
                  ], 40, ["onSubmit"])
                ]),
                _: 1
              }),
              createVNode(_component_UiCardFooter, { class: "flex flex-col gap-4" }, {
                default: withCtx(() => [
                  createVNode(_component_UiSeparator),
                  createVNode("div", { class: "text-center" }, [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, "Tidak punya ID undangan?"),
                    createVNode("button", {
                      class: "text-sm font-medium text-primary underline hover:no-underline cursor-pointer",
                      onClick: ($event) => unref(orgsTabStore).setActiveTab("create")
                    }, " Buat organisasi sendiri ", 8, ["onClick"])
                  ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/orgs/enter.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$2, { __name: "FormsOrgsEnter" });
const inviteOrgsSchema = type({
  email: "string.email",
  role: "'member'|'admin'"
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "invite",
  __ssrInlineRender: true,
  setup(__props) {
    const { $authClient } = useNuxtApp();
    const inviteForm = useForm({
      defaultValues: { email: "", role: "member" },
      validators: {
        onChange: inviteOrgsSchema,
        onSubmit: inviteOrgsSchema
      },
      onSubmit: async ({ value }) => {
        const { error } = await $authClient.organization.inviteMember({
          email: value.email,
          role: value.role
        });
        if (!error) {
          toast.success("Invitation sent successfully");
          await refreshNuxtData();
          inviteForm.reset();
        } else {
          toast.error("Gagal mengirim undangan");
        }
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$5;
      const _component_UiCardDescription = _sfc_main$3$2;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiLabel = _sfc_main$7;
      const _component_UiInput = _sfc_main$H;
      const _component_UiSelect = _sfc_main$19;
      const _component_UiSelectTrigger = _sfc_main$10;
      const _component_UiSelectValue = _sfc_main$$;
      const _component_UiSelectContent = _sfc_main$18;
      const _component_UiSelectItem = _sfc_main$16;
      const _component_Icon = __nuxt_component_1;
      const _component_UiButton = _sfc_main$X;
      _push(ssrRenderComponent(_component_UiCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Undang Anggota`);
                      } else {
                        return [
                          createTextVNode("Undang Anggota")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Kirim undangan untuk bergabung ke organisasi Anda.`);
                      } else {
                        return [
                          createTextVNode("Kirim undangan untuk bergabung ke organisasi Anda.")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Undang Anggota")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode("Kirim undangan untuk bergabung ke organisasi Anda.")
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
                  _push3(`<form class="grid gap-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(inviteForm).Field, { name: "email" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "email" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Alamat Email`);
                            } else {
                              return [
                                createTextVNode("Alamat Email")
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(_component_UiInput, {
                          id: "email",
                          type: "email",
                          placeholder: "anggota@contoh.com",
                          value: field.state.value,
                          required: "",
                          autocomplete: "email",
                          onBlur: ($event) => field.handleBlur(),
                          onInput: (e) => field.handleChange(e.target.value)
                        }, null, _parent4, _scopeId3));
                        if (field.state.meta.errors.length > 0) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Alamat Email")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "email",
                              type: "email",
                              placeholder: "anggota@contoh.com",
                              value: field.state.value,
                              required: "",
                              autocomplete: "email",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(inviteForm).Field, { name: "role" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="grid gap-2"${_scopeId3}>`);
                        _push4(ssrRenderComponent(_component_UiLabel, { for: "role" }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Role`);
                            } else {
                              return [
                                createTextVNode("Role")
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
                              _push5(ssrRenderComponent(_component_UiSelectTrigger, {
                                id: "role",
                                class: "w-full"
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_component_UiSelectValue, null, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(field.state.value.charAt(0).toUpperCase() + field.state.value.slice(1))}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(field.state.value.charAt(0).toUpperCase() + field.state.value.slice(1)), 1)
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectValue, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(field.state.value.charAt(0).toUpperCase() + field.state.value.slice(1)), 1)
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
                                    _push6(ssrRenderComponent(_component_UiSelectItem, { value: "member" }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="flex items-center gap-2"${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "lucide:user",
                                            class: "h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<div${_scopeId6}><p class="font-medium"${_scopeId6}>Member</p><p class="text-xs text-muted-foreground"${_scopeId6}> Can view and edit data </p></div></div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode(_component_Icon, {
                                                name: "lucide:user",
                                                class: "h-4 w-4"
                                              }),
                                              createVNode("div", null, [
                                                createVNode("p", { class: "font-medium" }, "Member"),
                                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Can view and edit data ")
                                              ])
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(_component_UiSelectItem, { value: "admin" }, {
                                      default: withCtx((_5, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="flex items-center gap-2"${_scopeId6}>`);
                                          _push7(ssrRenderComponent(_component_Icon, {
                                            name: "lucide:shield",
                                            class: "h-4 w-4"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<div${_scopeId6}><p class="font-medium"${_scopeId6}>Admin</p><p class="text-xs text-muted-foreground"${_scopeId6}> Full access and can manage members </p></div></div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "flex items-center gap-2" }, [
                                              createVNode(_component_Icon, {
                                                name: "lucide:shield",
                                                class: "h-4 w-4"
                                              }),
                                              createVNode("div", null, [
                                                createVNode("p", { class: "font-medium" }, "Admin"),
                                                createVNode("p", { class: "text-xs text-muted-foreground" }, " Full access and can manage members ")
                                              ])
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_component_UiSelectItem, { value: "member" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(_component_Icon, {
                                              name: "lucide:user",
                                              class: "h-4 w-4"
                                            }),
                                            createVNode("div", null, [
                                              createVNode("p", { class: "font-medium" }, "Member"),
                                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Can view and edit data ")
                                            ])
                                          ])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(_component_UiSelectItem, { value: "admin" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "flex items-center gap-2" }, [
                                            createVNode(_component_Icon, {
                                              name: "lucide:shield",
                                              class: "h-4 w-4"
                                            }),
                                            createVNode("div", null, [
                                              createVNode("p", { class: "font-medium" }, "Admin"),
                                              createVNode("p", { class: "text-xs text-muted-foreground" }, " Full access and can manage members ")
                                            ])
                                          ])
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
                                createVNode(_component_UiSelectTrigger, {
                                  id: "role",
                                  class: "w-full"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(field.state.value.charAt(0).toUpperCase() + field.state.value.slice(1)), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectItem, { value: "member" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_Icon, {
                                            name: "lucide:user",
                                            class: "h-4 w-4"
                                          }),
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, "Member"),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Can view and edit data ")
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiSelectItem, { value: "admin" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_Icon, {
                                            name: "lucide:shield",
                                            class: "h-4 w-4"
                                          }),
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, "Admin"),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Full access and can manage members ")
                                          ])
                                        ])
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
                        if (field.state.meta.errors.length > 0) {
                          _push4(`<p class="text-sm text-destructive"${_scopeId3}>${ssrInterpolate(field.state.meta.errors[0]?.message)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "role" }, {
                              default: withCtx(() => [
                                createTextVNode("Role")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, {
                                  id: "role",
                                  class: "w-full"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(field.state.value.charAt(0).toUpperCase() + field.state.value.slice(1)), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectItem, { value: "member" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_Icon, {
                                            name: "lucide:user",
                                            class: "h-4 w-4"
                                          }),
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, "Member"),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Can view and edit data ")
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiSelectItem, { value: "admin" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_Icon, {
                                            name: "lucide:shield",
                                            class: "h-4 w-4"
                                          }),
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, "Admin"),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Full access and can manage members ")
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(inviteForm).Subscribe, null, {
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
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: "lucide:send",
                                  class: "mr-2 h-4 w-4"
                                }, null, _parent5, _scopeId4));
                              }
                              _push5(` ${ssrInterpolate(isSubmitting ? "Mengirim..." : "Kirim Undangan")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  class: "mr-2 h-4 w-4 animate-spin"
                                })) : (openBlock(), createBlock(_component_Icon, {
                                  key: 1,
                                  name: "lucide:send",
                                  class: "mr-2 h-4 w-4"
                                })),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Mengirim..." : "Kirim Undangan"), 1)
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
                              })) : (openBlock(), createBlock(_component_Icon, {
                                key: 1,
                                name: "lucide:send",
                                class: "mr-2 h-4 w-4"
                              })),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Mengirim..." : "Kirim Undangan"), 1)
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
                    createVNode("form", {
                      class: "grid gap-4",
                      onSubmit: withModifiers(($event) => unref(inviteForm).handleSubmit(), ["prevent"])
                    }, [
                      createVNode(unref(inviteForm).Field, { name: "email" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "email" }, {
                              default: withCtx(() => [
                                createTextVNode("Alamat Email")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiInput, {
                              id: "email",
                              type: "email",
                              placeholder: "anggota@contoh.com",
                              value: field.state.value,
                              required: "",
                              autocomplete: "email",
                              onBlur: ($event) => field.handleBlur(),
                              onInput: (e) => field.handleChange(e.target.value)
                            }, null, 8, ["value", "onBlur", "onInput"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(inviteForm).Field, { name: "role" }, {
                        default: withCtx(({ field }) => [
                          createVNode("div", { class: "grid gap-2" }, [
                            createVNode(_component_UiLabel, { for: "role" }, {
                              default: withCtx(() => [
                                createTextVNode("Role")
                              ]),
                              _: 1
                            }),
                            createVNode(_component_UiSelect, {
                              "model-value": field.state.value,
                              "onUpdate:modelValue": (v) => field.handleChange(v)
                            }, {
                              default: withCtx(() => [
                                createVNode(_component_UiSelectTrigger, {
                                  id: "role",
                                  class: "w-full"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectValue, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(field.state.value.charAt(0).toUpperCase() + field.state.value.slice(1)), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(_component_UiSelectContent, null, {
                                  default: withCtx(() => [
                                    createVNode(_component_UiSelectItem, { value: "member" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_Icon, {
                                            name: "lucide:user",
                                            class: "h-4 w-4"
                                          }),
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, "Member"),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Can view and edit data ")
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(_component_UiSelectItem, { value: "admin" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "flex items-center gap-2" }, [
                                          createVNode(_component_Icon, {
                                            name: "lucide:shield",
                                            class: "h-4 w-4"
                                          }),
                                          createVNode("div", null, [
                                            createVNode("p", { class: "font-medium" }, "Admin"),
                                            createVNode("p", { class: "text-xs text-muted-foreground" }, " Full access and can manage members ")
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["model-value", "onUpdate:modelValue"]),
                            field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(inviteForm).Subscribe, null, {
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
                              })) : (openBlock(), createBlock(_component_Icon, {
                                key: 1,
                                name: "lucide:send",
                                class: "mr-2 h-4 w-4"
                              })),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Mengirim..." : "Kirim Undangan"), 1)
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
              createVNode(_component_UiCardHeader, null, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Undang Anggota")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode("Kirim undangan untuk bergabung ke organisasi Anda.")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    class: "grid gap-4",
                    onSubmit: withModifiers(($event) => unref(inviteForm).handleSubmit(), ["prevent"])
                  }, [
                    createVNode(unref(inviteForm).Field, { name: "email" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_component_UiLabel, { for: "email" }, {
                            default: withCtx(() => [
                              createTextVNode("Alamat Email")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiInput, {
                            id: "email",
                            type: "email",
                            placeholder: "anggota@contoh.com",
                            value: field.state.value,
                            required: "",
                            autocomplete: "email",
                            onBlur: ($event) => field.handleBlur(),
                            onInput: (e) => field.handleChange(e.target.value)
                          }, null, 8, ["value", "onBlur", "onInput"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(inviteForm).Field, { name: "role" }, {
                      default: withCtx(({ field }) => [
                        createVNode("div", { class: "grid gap-2" }, [
                          createVNode(_component_UiLabel, { for: "role" }, {
                            default: withCtx(() => [
                              createTextVNode("Role")
                            ]),
                            _: 1
                          }),
                          createVNode(_component_UiSelect, {
                            "model-value": field.state.value,
                            "onUpdate:modelValue": (v) => field.handleChange(v)
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_UiSelectTrigger, {
                                id: "role",
                                class: "w-full"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectValue, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(field.state.value.charAt(0).toUpperCase() + field.state.value.slice(1)), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(_component_UiSelectContent, null, {
                                default: withCtx(() => [
                                  createVNode(_component_UiSelectItem, { value: "member" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(_component_Icon, {
                                          name: "lucide:user",
                                          class: "h-4 w-4"
                                        }),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "font-medium" }, "Member"),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Can view and edit data ")
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(_component_UiSelectItem, { value: "admin" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "flex items-center gap-2" }, [
                                        createVNode(_component_Icon, {
                                          name: "lucide:shield",
                                          class: "h-4 w-4"
                                        }),
                                        createVNode("div", null, [
                                          createVNode("p", { class: "font-medium" }, "Admin"),
                                          createVNode("p", { class: "text-xs text-muted-foreground" }, " Full access and can manage members ")
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["model-value", "onUpdate:modelValue"]),
                          field.state.meta.errors.length > 0 ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive"
                          }, toDisplayString(field.state.meta.errors[0]?.message), 1)) : createCommentVNode("", true)
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(unref(inviteForm).Subscribe, null, {
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
                            })) : (openBlock(), createBlock(_component_Icon, {
                              key: 1,
                              name: "lucide:send",
                              class: "mr-2 h-4 w-4"
                            })),
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Mengirim..." : "Kirim Undangan"), 1)
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/orgs/invite.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_6 = Object.assign(_sfc_main$1, { __name: "FormsOrgsInvite" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { $authClient } = useNuxtApp();
    const orgsTabStore = useOrgsTabsStore();
    const orgs = $authClient.useListOrganizations();
    useHead({
      title: "Organisasi - MyUangGwe | Kelola Keuangan Tim",
      meta: [
        {
          name: "description",
          content: "Buat atau kelola organisasi untuk kolaborasi keuangan tim, bisnis kecil, atau kelompok."
        },
        {
          name: "keywords",
          content: "buat organisasi, kolaborasi keuangan, keuangan tim, bisnis kecil, kelompok keuangan"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiTabs = _sfc_main$3$1;
      const _component_UiTabsList = _sfc_main$1$1;
      const _component_UiTabsTrigger = _sfc_main$4;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_FormsOrgsCreate = __nuxt_component_4;
      const _component_FormsOrgsEnter = __nuxt_component_5;
      const _component_FormsOrgsInvite = __nuxt_component_6;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UiTabs, {
        modelValue: unref(orgsTabStore).activeTab,
        "onUpdate:modelValue": ($event) => unref(orgsTabStore).activeTab = $event,
        "default-value": "create"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTabsList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "create" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Buat`);
                      } else {
                        return [
                          createTextVNode("Buat")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "enter" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Gabung`);
                      } else {
                        return [
                          createTextVNode("Gabung")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, {
                    value: "invite",
                    disabled: !unref(orgs)?.data
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Undang`);
                      } else {
                        return [
                          createTextVNode("Undang")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "create" }, {
                      default: withCtx(() => [
                        createTextVNode("Buat")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "enter" }, {
                      default: withCtx(() => [
                        createTextVNode("Gabung")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, {
                      value: "invite",
                      disabled: !unref(orgs)?.data
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Undang")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "create" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormsOrgsCreate, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormsOrgsCreate)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "enter" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormsOrgsEnter, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormsOrgsEnter)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "invite" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormsOrgsInvite, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormsOrgsInvite)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "create" }, {
                    default: withCtx(() => [
                      createTextVNode("Buat")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "enter" }, {
                    default: withCtx(() => [
                      createTextVNode("Gabung")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, {
                    value: "invite",
                    disabled: !unref(orgs)?.data
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Undang")
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "create" }, {
                default: withCtx(() => [
                  createVNode(_component_FormsOrgsCreate)
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "enter" }, {
                default: withCtx(() => [
                  createVNode(_component_FormsOrgsEnter)
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "invite" }, {
                default: withCtx(() => [
                  createVNode(_component_FormsOrgsInvite)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/(auth-onnly)/orgs/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dk3embUe.mjs.map
