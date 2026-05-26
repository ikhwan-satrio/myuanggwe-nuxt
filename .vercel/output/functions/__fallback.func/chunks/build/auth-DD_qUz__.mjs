import { c as _sfc_main$3$1, a as _sfc_main$1$1, _ as _sfc_main$8, b as _sfc_main$2$1 } from './index-CVUXp8wK.mjs';
import { e as _sfc_main$6$1, a as _sfc_main$1$2, _ as _sfc_main$9, c as _sfc_main$3$2, d as _sfc_main$4$1, b as _sfc_main$2$2 } from './CardTitle-GwIPrVhf.mjs';
import { defineComponent, mergeProps, unref, withCtx, createTextVNode, createVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, withModifiers, provide, useSSRContext, renderSlot, toValue, inject, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderSlot } from 'vue/server-renderer';
import { useId, Slot } from 'reka-ui';
import { ErrorMessage, FieldContextKey } from 'vee-validate';
import { B as useHead, D as useNuxtApp, y as refreshNuxtData, w as navigateTo, b as _sfc_main$H, c as _sfc_main$X, a as __nuxt_component_1, t as cn } from './server.mjs';
import { _ as _sfc_main$a } from './Label-DoBiuCH1.mjs';
import { useForm } from '@tanstack/vue-form';
import { toast } from 'vue-sonner';
import { type } from 'arktype';
import { defineStore } from 'pinia';
import 'class-variance-authority';
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

const FORM_ITEM_INJECTION_KEY = /* @__PURE__ */ Symbol();
function useFormField() {
  const fieldContext = inject(FieldContextKey);
  const fieldItemContext = inject(FORM_ITEM_INJECTION_KEY);
  if (!fieldContext)
    throw new Error("useFormField should be used within <FormField>");
  const { name, errorMessage: error, meta } = fieldContext;
  const id = fieldItemContext;
  const fieldState = {
    valid: computed(() => meta.valid),
    isDirty: computed(() => meta.dirty),
    isTouched: computed(() => meta.touched),
    error
  };
  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState
  };
}
const _sfc_main$7 = /* @__PURE__ */ defineComponent({
  __name: "FormControl",
  __ssrInlineRender: true,
  setup(__props) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(Slot), mergeProps({
        id: unref(formItemId),
        "data-slot": "form-control",
        "aria-describedby": !unref(error) ? `${unref(formDescriptionId)}` : `${unref(formDescriptionId)} ${unref(formMessageId)}`,
        "aria-invalid": !!unref(error)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormControl.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const _sfc_main$6 = /* @__PURE__ */ defineComponent({
  __name: "FormDescription",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { formDescriptionId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<p${ssrRenderAttrs(mergeProps({
        id: unref(formDescriptionId),
        "data-slot": "form-description",
        class: unref(cn)("text-muted-foreground text-sm", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</p>`);
    };
  }
});
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormDescription.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "FormItem",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const id = useId();
    provide(FORM_ITEM_INJECTION_KEY, id);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        "data-slot": "form-item",
        class: unref(cn)("grid gap-2", props.class)
      }, _attrs))}>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</div>`);
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormItem.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "FormLabel",
  __ssrInlineRender: true,
  props: {
    for: {},
    asChild: { type: Boolean },
    as: {},
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { error, formItemId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(_sfc_main$a), mergeProps({
        "data-slot": "form-label",
        "data-error": !!unref(error),
        class: unref(cn)(
          "data-[error=true]:text-destructive",
          props.class
        ),
        for: unref(formItemId)
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormLabel.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "FormMessage",
  __ssrInlineRender: true,
  props: {
    class: { type: [Boolean, null, String, Object, Array] }
  },
  setup(__props) {
    const props = __props;
    const { name, formMessageId } = useFormField();
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(unref(ErrorMessage), mergeProps({
        id: unref(formMessageId),
        "data-slot": "form-message",
        as: "p",
        name: toValue(unref(name)),
        class: unref(cn)("text-destructive text-sm", props.class)
      }, _attrs), null, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/ui/form/FormMessage.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const loginSchema = type({
  email: "string.email",
  password: "string > 8"
});
const registerSchema = loginSchema.merge({
  name: "string >= 5",
  confirmPassword: "string >= 8"
}).narrow((data, c) => {
  if (data.password !== data.confirmPassword) {
    return c.reject({
      expected: "identical to password",
      actual: "",
      path: ["confirmPassword"]
    });
  }
  return true;
});
const useAuthTabsStore = defineStore("auth-tabs", {
  state: () => ({
    activeTab: "register"
  }),
  actions: {
    setActiveTab(tab) {
      this.activeTab = tab;
    }
  }
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const { $authClient } = useNuxtApp();
    const authTabsStore = useAuthTabsStore();
    const form = useForm({
      defaultValues: {
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
      },
      validators: {
        onChange: registerSchema,
        onSubmit: registerSchema
      },
      onSubmit: async ({ value }) => {
        if (value.password !== value.confirmPassword) {
          toast.error("password doesnt match");
          return;
        }
        const { error } = await $authClient.signUp.email({
          name: value.name,
          email: value.email,
          password: value.password
        });
        if (error) {
          toast.error(error.message || "failed to register");
          return;
        }
        await refreshNuxtData();
        navigateTo("/dashboard");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6$1;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$9;
      const _component_UiCardDescription = _sfc_main$3$2;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiFormItem = _sfc_main$5;
      const _component_UiLabel = _sfc_main$a;
      const _component_UiInput = _sfc_main$H;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      const _component_UiCardFooter = _sfc_main$2$2;
      _push(ssrRenderComponent(_component_UiCard, mergeProps({ class: "w-87.5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "space-y-1 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-2xl font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Buat Akun`);
                      } else {
                        return [
                          createTextVNode("Buat Akun")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Daftar untuk mulai mengelola keuangan kamu `);
                      } else {
                        return [
                          createTextVNode(" Daftar untuk mulai mengelola keuangan kamu ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-2xl font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("Buat Akun")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Daftar untuk mulai mengelola keuangan kamu ")
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
                  _push3(`<form class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(form).Field, { name: "name" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiFormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Nama Lengkap`);
                                  } else {
                                    return [
                                      createTextVNode("Nama Lengkap")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                value: field.state.value,
                                placeholder: "John Doe",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, _parent5, _scopeId4));
                              if (!field.state.meta.isValid) {
                                _push5(`<p class="text-sm text-destructive"${_scopeId4}><!--[-->`);
                                ssrRenderList(field.state.meta.errors, (err, i) => {
                                  _push5(`<span class="block"${_scopeId4}> * ${ssrInterpolate(err?.message)}</span>`);
                                });
                                _push5(`<!--]--></p>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_UiLabel, {
                                  for: field.name
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Nama Lengkap")
                                  ]),
                                  _: 1
                                }, 8, ["for"]),
                                createVNode(_component_UiInput, {
                                  id: field.name,
                                  name: field.name,
                                  value: field.state.value,
                                  placeholder: "John Doe",
                                  onInput: ($event) => field.handleChange($event.target.value),
                                  onBlur: field.handleBlur
                                }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                                !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                    return openBlock(), createBlock("span", {
                                      key: i,
                                      class: "block"
                                    }, " * " + toDisplayString(err?.message), 1);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                value: field.state.value,
                                placeholder: "John Doe",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Field, { name: "email" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiFormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Email`);
                                  } else {
                                    return [
                                      createTextVNode("Email")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "email",
                                value: field.state.value,
                                placeholder: "john@example.com",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, _parent5, _scopeId4));
                              if (!field.state.meta.isValid) {
                                _push5(`<p class="text-sm text-destructive"${_scopeId4}><!--[-->`);
                                ssrRenderList(field.state.meta.errors, (err, i) => {
                                  _push5(`<span class="block"${_scopeId4}> * ${ssrInterpolate(err?.message)}</span>`);
                                });
                                _push5(`<!--]--></p>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_UiLabel, {
                                  for: field.name
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Email")
                                  ]),
                                  _: 1
                                }, 8, ["for"]),
                                createVNode(_component_UiInput, {
                                  id: field.name,
                                  name: field.name,
                                  type: "email",
                                  value: field.state.value,
                                  placeholder: "john@example.com",
                                  onInput: ($event) => field.handleChange($event.target.value),
                                  onBlur: field.handleBlur
                                }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                                !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                    return openBlock(), createBlock("span", {
                                      key: i,
                                      class: "block"
                                    }, " * " + toDisplayString(err?.message), 1);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "email",
                                value: field.state.value,
                                placeholder: "john@example.com",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Field, { name: "password" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiFormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Password`);
                                  } else {
                                    return [
                                      createTextVNode("Password")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, _parent5, _scopeId4));
                              if (!field.state.meta.isValid) {
                                _push5(`<p class="text-sm text-destructive"${_scopeId4}><!--[-->`);
                                ssrRenderList(field.state.meta.errors, (err, i) => {
                                  _push5(`<span class="block"${_scopeId4}> * ${ssrInterpolate(err?.message)}</span>`);
                                });
                                _push5(`<!--]--></p>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_UiLabel, {
                                  for: field.name
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Password")
                                  ]),
                                  _: 1
                                }, 8, ["for"]),
                                createVNode(_component_UiInput, {
                                  id: field.name,
                                  name: field.name,
                                  type: "password",
                                  value: field.state.value,
                                  placeholder: "••••••••",
                                  onInput: ($event) => field.handleChange($event.target.value),
                                  onBlur: field.handleBlur
                                }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                                !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                    return openBlock(), createBlock("span", {
                                      key: i,
                                      class: "block"
                                    }, " * " + toDisplayString(err?.message), 1);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Password")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Field, { name: "confirmPassword" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiFormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Konfirmasi Password`);
                                  } else {
                                    return [
                                      createTextVNode("Konfirmasi Password")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, _parent5, _scopeId4));
                              if (!field.state.meta.isValid) {
                                _push5(`<p class="text-sm text-destructive"${_scopeId4}><!--[-->`);
                                ssrRenderList(field.state.meta.errors, (err, i) => {
                                  _push5(`<span class="block"${_scopeId4}> * ${ssrInterpolate(err?.message)}</span>`);
                                });
                                _push5(`<!--]--></p>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_UiLabel, {
                                  for: field.name
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Konfirmasi Password")
                                  ]),
                                  _: 1
                                }, 8, ["for"]),
                                createVNode(_component_UiInput, {
                                  id: field.name,
                                  name: field.name,
                                  type: "password",
                                  value: field.state.value,
                                  placeholder: "••••••••",
                                  onInput: ($event) => field.handleChange($event.target.value),
                                  onBlur: field.handleBlur
                                }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                                !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                    return openBlock(), createBlock("span", {
                                      key: i,
                                      class: "block"
                                    }, " * " + toDisplayString(err?.message), 1);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Subscribe, null, {
                    default: withCtx(({ errorMap }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (errorMap.onSubmit) {
                          _push4(`<p class="text-sm text-destructive text-center"${_scopeId3}>${ssrInterpolate(errorMap.onSubmit)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          errorMap.onSubmit ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive text-center"
                          }, toDisplayString(errorMap.onSubmit), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Subscribe, null, {
                    default: withCtx(({ canSubmit, isSubmitting }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: !canSubmit || isSubmitting
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (isSubmitting) {
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: "lucide:loader-2",
                                  size: "16",
                                  class: "animate-spin"
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(isSubmitting ? "Mendaftar..." : "Daftar")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  size: "16",
                                  class: "animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Mendaftar..." : "Daftar"), 1)
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
                            disabled: !canSubmit || isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                size: "16",
                                class: "animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Mendaftar..." : "Daftar"), 1)
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
                      onSubmit: withModifiers(unref(form).handleSubmit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode(unref(form).Field, { name: "name" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Nama Lengkap")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                value: field.state.value,
                                placeholder: "John Doe",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Field, { name: "email" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "email",
                                value: field.state.value,
                                placeholder: "john@example.com",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Field, { name: "password" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Password")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Field, { name: "confirmPassword" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Konfirmasi Password")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Subscribe, null, {
                        default: withCtx(({ errorMap }) => [
                          errorMap.onSubmit ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive text-center"
                          }, toDisplayString(errorMap.onSubmit), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Subscribe, null, {
                        default: withCtx(({ canSubmit, isSubmitting }) => [
                          createVNode(_component_UiButton, {
                            type: "submit",
                            class: "w-full",
                            disabled: !canSubmit || isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                size: "16",
                                class: "animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Mendaftar..." : "Daftar"), 1)
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
            _push2(ssrRenderComponent(_component_UiCardFooter, { class: "justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Sudah punya akun? <button class="text-foreground underline"${_scopeId2}> Login </button></p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, [
                      createTextVNode(" Sudah punya akun? "),
                      createVNode("button", {
                        class: "text-foreground underline",
                        onClick: ($event) => unref(authTabsStore).setActiveTab("login")
                      }, " Login ", 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "space-y-1 text-center" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-2xl font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("Buat Akun")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Daftar untuk mulai mengelola keuangan kamu ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(unref(form).handleSubmit, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode(unref(form).Field, { name: "name" }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_UiFormItem, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Nama Lengkap")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              name: field.name,
                              value: field.state.value,
                              placeholder: "John Doe",
                              onInput: ($event) => field.handleChange($event.target.value),
                              onBlur: field.handleBlur
                            }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Field, { name: "email" }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_UiFormItem, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Email")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              name: field.name,
                              type: "email",
                              value: field.state.value,
                              placeholder: "john@example.com",
                              onInput: ($event) => field.handleChange($event.target.value),
                              onBlur: field.handleBlur
                            }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Field, { name: "password" }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_UiFormItem, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Password")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              name: field.name,
                              type: "password",
                              value: field.state.value,
                              placeholder: "••••••••",
                              onInput: ($event) => field.handleChange($event.target.value),
                              onBlur: field.handleBlur
                            }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Field, { name: "confirmPassword" }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_UiFormItem, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Konfirmasi Password")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              name: field.name,
                              type: "password",
                              value: field.state.value,
                              placeholder: "••••••••",
                              onInput: ($event) => field.handleChange($event.target.value),
                              onBlur: field.handleBlur
                            }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Subscribe, null, {
                      default: withCtx(({ errorMap }) => [
                        errorMap.onSubmit ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive text-center"
                        }, toDisplayString(errorMap.onSubmit), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Subscribe, null, {
                      default: withCtx(({ canSubmit, isSubmitting }) => [
                        createVNode(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: !canSubmit || isSubmitting
                        }, {
                          default: withCtx(() => [
                            isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              size: "16",
                              class: "animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Mendaftar..." : "Daftar"), 1)
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
              createVNode(_component_UiCardFooter, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-sm text-muted-foreground" }, [
                    createTextVNode(" Sudah punya akun? "),
                    createVNode("button", {
                      class: "text-foreground underline",
                      onClick: ($event) => unref(authTabsStore).setActiveTab("login")
                    }, " Login ", 8, ["onClick"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/register.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_4 = Object.assign(_sfc_main$2, { __name: "FormsRegister" });
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const { $authClient } = useNuxtApp();
    const authTabsStore = useAuthTabsStore();
    const form = useForm({
      defaultValues: {
        email: "",
        password: ""
      },
      validators: {
        onChange: loginSchema,
        onSubmit: loginSchema
      },
      onSubmit: async ({ value }) => {
        const { error } = await $authClient.signIn.email({
          email: value.email,
          password: value.password,
          fetchOptions: {
            onError: ({ error: error2 }) => {
              toast.error(error2.message || "failed to login");
            }
          }
        });
        if (error) {
          toast.error(error.message || "failed to login");
          return;
        }
        await refreshNuxtData();
        navigateTo("/dashboard");
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiCard = _sfc_main$6$1;
      const _component_UiCardHeader = _sfc_main$1$2;
      const _component_UiCardTitle = _sfc_main$9;
      const _component_UiCardDescription = _sfc_main$3$2;
      const _component_UiCardContent = _sfc_main$4$1;
      const _component_UiFormItem = _sfc_main$5;
      const _component_UiLabel = _sfc_main$a;
      const _component_UiInput = _sfc_main$H;
      const _component_UiButton = _sfc_main$X;
      const _component_Icon = __nuxt_component_1;
      const _component_UiCardFooter = _sfc_main$2$2;
      _push(ssrRenderComponent(_component_UiCard, mergeProps({ class: "w-87.5" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiCardHeader, { class: "space-y-1 text-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardTitle, { class: "text-2xl font-bold" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Login`);
                      } else {
                        return [
                          createTextVNode("Login")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardDescription, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Selamat datang kembali! Masuk untuk mengelola keuangan kamu `);
                      } else {
                        return [
                          createTextVNode(" Selamat datang kembali! Masuk untuk mengelola keuangan kamu ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardTitle, { class: "text-2xl font-bold" }, {
                      default: withCtx(() => [
                        createTextVNode("Login")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardDescription, null, {
                      default: withCtx(() => [
                        createTextVNode(" Selamat datang kembali! Masuk untuk mengelola keuangan kamu ")
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
                  _push3(`<form class="space-y-4"${_scopeId2}>`);
                  _push3(ssrRenderComponent(unref(form).Field, { name: "email" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiFormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Email`);
                                  } else {
                                    return [
                                      createTextVNode("Email")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "email",
                                value: field.state.value,
                                placeholder: "john@example.com",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, _parent5, _scopeId4));
                              if (!field.state.meta.isValid) {
                                _push5(`<p class="text-sm text-destructive"${_scopeId4}><!--[-->`);
                                ssrRenderList(field.state.meta.errors, (err, i) => {
                                  _push5(`<span class="block"${_scopeId4}> * ${ssrInterpolate(err?.message)}</span>`);
                                });
                                _push5(`<!--]--></p>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_UiLabel, {
                                  for: field.name
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Email")
                                  ]),
                                  _: 1
                                }, 8, ["for"]),
                                createVNode(_component_UiInput, {
                                  id: field.name,
                                  name: field.name,
                                  type: "email",
                                  value: field.state.value,
                                  placeholder: "john@example.com",
                                  onInput: ($event) => field.handleChange($event.target.value),
                                  onBlur: field.handleBlur
                                }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                                !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                    return openBlock(), createBlock("span", {
                                      key: i,
                                      class: "block"
                                    }, " * " + toDisplayString(err?.message), 1);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "email",
                                value: field.state.value,
                                placeholder: "john@example.com",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Field, { name: "password" }, {
                    default: withCtx(({ field }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiFormItem, null, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx((_4, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Password`);
                                  } else {
                                    return [
                                      createTextVNode("Password")
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, _parent5, _scopeId4));
                              if (!field.state.meta.isValid) {
                                _push5(`<p class="text-sm text-destructive"${_scopeId4}><!--[-->`);
                                ssrRenderList(field.state.meta.errors, (err, i) => {
                                  _push5(`<span class="block"${_scopeId4}> * ${ssrInterpolate(err?.message)}</span>`);
                                });
                                _push5(`<!--]--></p>`);
                              } else {
                                _push5(`<!---->`);
                              }
                            } else {
                              return [
                                createVNode(_component_UiLabel, {
                                  for: field.name
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Password")
                                  ]),
                                  _: 1
                                }, 8, ["for"]),
                                createVNode(_component_UiInput, {
                                  id: field.name,
                                  name: field.name,
                                  type: "password",
                                  value: field.state.value,
                                  placeholder: "••••••••",
                                  onInput: ($event) => field.handleChange($event.target.value),
                                  onBlur: field.handleBlur
                                }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                                !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                  key: 0,
                                  class: "text-sm text-destructive"
                                }, [
                                  (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                    return openBlock(), createBlock("span", {
                                      key: i,
                                      class: "block"
                                    }, " * " + toDisplayString(err?.message), 1);
                                  }), 128))
                                ])) : createCommentVNode("", true)
                              ];
                            }
                          }),
                          _: 2
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Password")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Subscribe, null, {
                    default: withCtx(({ errorMap }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (errorMap.onSubmit) {
                          _push4(`<p class="text-sm text-destructive text-center"${_scopeId3}>${ssrInterpolate(errorMap.onSubmit)}</p>`);
                        } else {
                          _push4(`<!---->`);
                        }
                      } else {
                        return [
                          errorMap.onSubmit ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive text-center"
                          }, toDisplayString(errorMap.onSubmit), 1)) : createCommentVNode("", true)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(unref(form).Subscribe, null, {
                    default: withCtx(({ canSubmit, isSubmitting }, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: !canSubmit || isSubmitting
                        }, {
                          default: withCtx((_3, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              if (isSubmitting) {
                                _push5(ssrRenderComponent(_component_Icon, {
                                  name: "lucide:loader-2",
                                  size: "16",
                                  class: "animate-spin"
                                }, null, _parent5, _scopeId4));
                              } else {
                                _push5(`<!---->`);
                              }
                              _push5(` ${ssrInterpolate(isSubmitting ? "Login..." : "Login")}`);
                            } else {
                              return [
                                isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                  key: 0,
                                  name: "lucide:loader-2",
                                  size: "16",
                                  class: "animate-spin"
                                })) : createCommentVNode("", true),
                                createTextVNode(" " + toDisplayString(isSubmitting ? "Login..." : "Login"), 1)
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
                            disabled: !canSubmit || isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                size: "16",
                                class: "animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Login..." : "Login"), 1)
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
                      onSubmit: withModifiers(unref(form).handleSubmit, ["prevent"]),
                      class: "space-y-4"
                    }, [
                      createVNode(unref(form).Field, { name: "email" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Email")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "email",
                                value: field.state.value,
                                placeholder: "john@example.com",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Field, { name: "password" }, {
                        default: withCtx(({ field }) => [
                          createVNode(_component_UiFormItem, null, {
                            default: withCtx(() => [
                              createVNode(_component_UiLabel, {
                                for: field.name
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Password")
                                ]),
                                _: 1
                              }, 8, ["for"]),
                              createVNode(_component_UiInput, {
                                id: field.name,
                                name: field.name,
                                type: "password",
                                value: field.state.value,
                                placeholder: "••••••••",
                                onInput: ($event) => field.handleChange($event.target.value),
                                onBlur: field.handleBlur
                              }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                              !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                                key: 0,
                                class: "text-sm text-destructive"
                              }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                  return openBlock(), createBlock("span", {
                                    key: i,
                                    class: "block"
                                  }, " * " + toDisplayString(err?.message), 1);
                                }), 128))
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Subscribe, null, {
                        default: withCtx(({ errorMap }) => [
                          errorMap.onSubmit ? (openBlock(), createBlock("p", {
                            key: 0,
                            class: "text-sm text-destructive text-center"
                          }, toDisplayString(errorMap.onSubmit), 1)) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(unref(form).Subscribe, null, {
                        default: withCtx(({ canSubmit, isSubmitting }) => [
                          createVNode(_component_UiButton, {
                            type: "submit",
                            class: "w-full",
                            disabled: !canSubmit || isSubmitting
                          }, {
                            default: withCtx(() => [
                              isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                                key: 0,
                                name: "lucide:loader-2",
                                size: "16",
                                class: "animate-spin"
                              })) : createCommentVNode("", true),
                              createTextVNode(" " + toDisplayString(isSubmitting ? "Login..." : "Login"), 1)
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
            _push2(ssrRenderComponent(_component_UiCardFooter, { class: "justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<p class="text-sm text-muted-foreground"${_scopeId2}> Sudah punya akun? <button class="text-foreground underline"${_scopeId2}> Register </button></p>`);
                } else {
                  return [
                    createVNode("p", { class: "text-sm text-muted-foreground" }, [
                      createTextVNode(" Sudah punya akun? "),
                      createVNode("button", {
                        class: "text-foreground underline",
                        onClick: ($event) => unref(authTabsStore).setActiveTab("register")
                      }, " Register ", 8, ["onClick"])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiCardHeader, { class: "space-y-1 text-center" }, {
                default: withCtx(() => [
                  createVNode(_component_UiCardTitle, { class: "text-2xl font-bold" }, {
                    default: withCtx(() => [
                      createTextVNode("Login")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiCardDescription, null, {
                    default: withCtx(() => [
                      createTextVNode(" Selamat datang kembali! Masuk untuk mengelola keuangan kamu ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiCardContent, null, {
                default: withCtx(() => [
                  createVNode("form", {
                    onSubmit: withModifiers(unref(form).handleSubmit, ["prevent"]),
                    class: "space-y-4"
                  }, [
                    createVNode(unref(form).Field, { name: "email" }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_UiFormItem, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Email")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              name: field.name,
                              type: "email",
                              value: field.state.value,
                              placeholder: "john@example.com",
                              onInput: ($event) => field.handleChange($event.target.value),
                              onBlur: field.handleBlur
                            }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Field, { name: "password" }, {
                      default: withCtx(({ field }) => [
                        createVNode(_component_UiFormItem, null, {
                          default: withCtx(() => [
                            createVNode(_component_UiLabel, {
                              for: field.name
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Password")
                              ]),
                              _: 1
                            }, 8, ["for"]),
                            createVNode(_component_UiInput, {
                              id: field.name,
                              name: field.name,
                              type: "password",
                              value: field.state.value,
                              placeholder: "••••••••",
                              onInput: ($event) => field.handleChange($event.target.value),
                              onBlur: field.handleBlur
                            }, null, 8, ["id", "name", "value", "onInput", "onBlur"]),
                            !field.state.meta.isValid ? (openBlock(), createBlock("p", {
                              key: 0,
                              class: "text-sm text-destructive"
                            }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(field.state.meta.errors, (err, i) => {
                                return openBlock(), createBlock("span", {
                                  key: i,
                                  class: "block"
                                }, " * " + toDisplayString(err?.message), 1);
                              }), 128))
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Subscribe, null, {
                      default: withCtx(({ errorMap }) => [
                        errorMap.onSubmit ? (openBlock(), createBlock("p", {
                          key: 0,
                          class: "text-sm text-destructive text-center"
                        }, toDisplayString(errorMap.onSubmit), 1)) : createCommentVNode("", true)
                      ]),
                      _: 1
                    }),
                    createVNode(unref(form).Subscribe, null, {
                      default: withCtx(({ canSubmit, isSubmitting }) => [
                        createVNode(_component_UiButton, {
                          type: "submit",
                          class: "w-full",
                          disabled: !canSubmit || isSubmitting
                        }, {
                          default: withCtx(() => [
                            isSubmitting ? (openBlock(), createBlock(_component_Icon, {
                              key: 0,
                              name: "lucide:loader-2",
                              size: "16",
                              class: "animate-spin"
                            })) : createCommentVNode("", true),
                            createTextVNode(" " + toDisplayString(isSubmitting ? "Login..." : "Login"), 1)
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
              createVNode(_component_UiCardFooter, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode("p", { class: "text-sm text-muted-foreground" }, [
                    createTextVNode(" Sudah punya akun? "),
                    createVNode("button", {
                      class: "text-foreground underline",
                      onClick: ($event) => unref(authTabsStore).setActiveTab("register")
                    }, " Register ", 8, ["onClick"])
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/forms/login.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_5 = Object.assign(_sfc_main$1, { __name: "FormsLogin" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "auth",
  __ssrInlineRender: true,
  setup(__props) {
    const authTabsStore = useAuthTabsStore();
    useHead({
      title: "Masuk / Daftar - MyUangGwe | Kelola Keuangan dengan Tenang",
      meta: [
        {
          name: "description",
          content: "Daftar atau masuk ke akun MyUangGwe untuk mulai mencatat pemasukan, mengelola pengeluaran, dan mewujudkan target finansial."
        },
        {
          name: "keywords",
          content: "daftar akun, login keuangan, registrasi aplikasi keuangan, manajemen keuangan pribadi"
        }
      ]
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiTabs = _sfc_main$3$1;
      const _component_UiTabsList = _sfc_main$1$1;
      const _component_UiTabsTrigger = _sfc_main$8;
      const _component_UiTabsContent = _sfc_main$2$1;
      const _component_FormsRegister = __nuxt_component_4;
      const _component_FormsLogin = __nuxt_component_5;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "flex min-h-screen items-center justify-center p-4" }, _attrs))}>`);
      _push(ssrRenderComponent(_component_UiTabs, {
        defaultValue: "register",
        modelValue: unref(authTabsStore).activeTab,
        "onUpdate:modelValue": ($event) => unref(authTabsStore).activeTab = $event
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiTabsList, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "register" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Register`);
                      } else {
                        return [
                          createTextVNode("Register")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiTabsTrigger, { value: "login" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Login`);
                      } else {
                        return [
                          createTextVNode("Login")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiTabsTrigger, { value: "register" }, {
                      default: withCtx(() => [
                        createTextVNode("Register")
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiTabsTrigger, { value: "login" }, {
                      default: withCtx(() => [
                        createTextVNode("Login")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "register" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormsRegister, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormsRegister)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiTabsContent, { value: "login" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_FormsLogin, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_FormsLogin)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_UiTabsList, null, {
                default: withCtx(() => [
                  createVNode(_component_UiTabsTrigger, { value: "register" }, {
                    default: withCtx(() => [
                      createTextVNode("Register")
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiTabsTrigger, { value: "login" }, {
                    default: withCtx(() => [
                      createTextVNode("Login")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "register" }, {
                default: withCtx(() => [
                  createVNode(_component_FormsRegister)
                ]),
                _: 1
              }),
              createVNode(_component_UiTabsContent, { value: "login" }, {
                default: withCtx(() => [
                  createVNode(_component_FormsLogin)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/auth.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=auth-DD_qUz__.mjs.map
