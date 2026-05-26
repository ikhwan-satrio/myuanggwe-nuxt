import { _ as _sfc_main$1 } from './index-dZMOOFG9.mjs';
import { B as useHead, a as __nuxt_component_1, c as _sfc_main$X, _ as __nuxt_component_0$1, v as isDef } from './server.mjs';
import { e as _sfc_main$6, a as _sfc_main$1$1, _ as _sfc_main$2, d as _sfc_main$4 } from './CardTitle-GwIPrVhf.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, createTextVNode, openBlock, createBlock, Fragment, renderList, toDisplayString, createCommentVNode, toValue, watchEffect, isRef, watch, computed, resolveDynamicComponent, Transition, TransitionGroup, renderSlot, getCurrentInstance, h, useAttrs, Comment, cloneVNode, inject, provide, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { motionValue, transform, collectMotionValues, cancelFrame, frame as frame$1, isVariantLabel, buildSVGAttrs, isSVGTag, camelCaseAttributes, buildHTMLStyles, correctBorderRadius, isAnimationControls, press, hover, addScaleCorrector, correctBoxShadow, HTMLProjectionNode, globalProjectionState, SVGVisualElement, HTMLVisualElement, createBox, eachAxis, measurePageBox, convertBoxToBoundingBox, convertBoundingBoxToBox, addValueToWillChange, animateMotionValue, mixNumber, resolveVariant as resolveVariant$1, calcChildStagger, percent, calcLength, animateVisualElement } from 'motion-dom';
import { invariant } from 'hey-listen';
import { frame, isMotionValue, inView, distance2D, frameData, cancelFrame as cancelFrame$1 } from 'framer-motion/dom';
import { pipe, noop, progress, clamp, secondsToMilliseconds, millisecondsToSeconds } from 'motion-utils';
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
import 'pinia';
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
import 'vue-sonner';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

function createContext(providerComponentName, contextName) {
  const symbolDescription = typeof providerComponentName === "string" && !contextName ? `${providerComponentName}Context` : contextName;
  const injectionKey = Symbol(symbolDescription);
  const injectContext = (fallback) => {
    const context = inject(injectionKey, fallback);
    if (context === void 0) throw new Error(`Injection \`${injectionKey.toString()}\` not found. Component must be used within ${Array.isArray(providerComponentName) ? `one of the following components: ${providerComponentName.join(", ")}` : `\`${providerComponentName}\``}`);
    return context;
  };
  const provideContext = (contextValue) => {
    provide(injectionKey, contextValue);
    return contextValue;
  };
  return [
    injectContext,
    provideContext,
    injectionKey
  ];
}
function resolveMotionProps(props, context) {
  const { layoutGroup, presenceContext, config } = context;
  const layoutId = layoutGroup.id && props.layoutId ? `${layoutGroup.id}-${props.layoutId}` : props.layoutId || void 0;
  return {
    ...props,
    layoutId,
    transition: props.transition ?? config.transition,
    layoutGroup,
    motionConfig: config,
    inViewOptions: props.inViewOptions ?? config.inViewOptions,
    presenceContext,
    initial: presenceContext.initial === false ? presenceContext.initial : props.initial === true ? void 0 : props.initial
  };
}
function getContextWindow({ current }) {
  return current ? current.ownerDocument.defaultView : null;
}
const [injectMotion, provideMotion] = createContext("Motion");
const [injectLayoutGroup] = createContext("LayoutGroup");
const defaultConfig = {
  reducedMotion: "never",
  transition: void 0,
  nonce: void 0
};
const [injectMotionConfig] = createContext("MotionConfig");
function useMotionConfig() {
  return injectMotionConfig(computed(() => defaultConfig));
}
const motionGlobalConfig = { motionAttribute: "data-ap" };
const lazyFeatures = [];
function updateLazyFeatures(features) {
  for (const feature of features) if (feature && !lazyFeatures.includes(feature)) lazyFeatures.push(feature);
}
function resolveVariantValue(definition, variants, custom) {
  if (Array.isArray(definition)) return definition.reduce((acc, item) => {
    const resolvedVariant = resolveVariantValue(item, variants, custom);
    return resolvedVariant ? {
      ...acc,
      ...resolvedVariant
    } : acc;
  }, {});
  else if (typeof definition === "object") return definition;
  else if (definition && variants) {
    const variant = variants[definition];
    return typeof variant === "function" ? variant(custom) : variant;
  }
}
function resolveVariant(definition, variants, custom) {
  const resolved = resolveVariantValue(definition, variants, custom);
  if (!resolved) return void 0;
  const { transition, transitionEnd, ...target } = resolved;
  return {
    ...target,
    ...transitionEnd
  };
}
function resolveInitialValues(options, context) {
  const sources = (options.initial === void 0 && options.variants ? context?.initial : options.initial) === false ? ["initial", "animate"] : ["initial"];
  const custom = options.custom ?? options.presenceContext?.custom;
  return sources.reduce((acc, variant) => {
    return {
      ...acc,
      ...resolveVariant(options[variant] || context?.[variant], options.variants, custom)
    };
  }, {});
}
function shallowCompare(next, prev) {
  const prevLength = prev?.length;
  if (prevLength !== next.length) return false;
  for (let i = 0; i < prevLength; i++) if (prev[i] !== next[i]) return false;
  return true;
}
var svgElementSet = /* @__PURE__ */ new Set([
  "animate",
  "circle",
  "defs",
  "desc",
  "ellipse",
  "g",
  "image",
  "line",
  "filter",
  "marker",
  "mask",
  "metadata",
  "path",
  "pattern",
  "polygon",
  "polyline",
  "rect",
  "stop",
  "svg",
  "switch",
  "symbol",
  "text",
  "tspan",
  "use",
  "view",
  "clipPath",
  "feBlend",
  "feColorMatrix",
  "feComponentTransfer",
  "feComposite",
  "feConvolveMatrix",
  "feDiffuseLighting",
  "feDisplacementMap",
  "feDistantLight",
  "feDropShadow",
  "feFlood",
  "feFuncA",
  "feFuncB",
  "feFuncG",
  "feFuncR",
  "feGaussianBlur",
  "feImage",
  "feMerge",
  "feMergeNode",
  "feMorphology",
  "feOffset",
  "fePointLight",
  "feSpecularLighting",
  "feSpotLight",
  "feTile",
  "feTurbulence",
  "foreignObject",
  "linearGradient",
  "radialGradient",
  "textPath"
]);
function isSVGElement(as) {
  return svgElementSet.has(as);
}
const mountedStates = /* @__PURE__ */ new WeakMap();
var MotionState = class {
  constructor(options, parent) {
    this.element = null;
    this.isExiting = false;
    this.presenceContainer = null;
    this.children = /* @__PURE__ */ new Set();
    this.features = /* @__PURE__ */ new Map();
    this._context = null;
    this.options = options;
    this.parent = parent;
    parent?.children?.add(this);
    this.latestValues = resolveInitialValues(options, this.context);
    this.type = isSVGElement(this.options.as) ? "svg" : "html";
  }
  get context() {
    if (!this._context) this._context = new Proxy({}, { get: (target, prop) => {
      const value = this.options[prop];
      if (isVariantLabel(value) || prop === "initial" && value === false) return value;
      return this.parent?.context[prop];
    } });
    return this._context;
  }
  updateFeatures() {
    if (!this.visualElement) return;
    for (const FeatureCtor of lazyFeatures) {
      if (!this.features.has(FeatureCtor.key)) this.features.set(FeatureCtor.key, new FeatureCtor(this));
      const feature = this.features.get(FeatureCtor.key);
      if (this.isMounted()) if (!feature.isMount) {
        feature.mount();
        feature.isMount = true;
      } else feature.update();
    }
  }
  updateOptions(options) {
    this.options = options;
    this.visualElement?.update({
      ...this.options,
      whileTap: this.options.whilePress
    }, this.options.presenceContext ?? null);
  }
  mount(element) {
    invariant(Boolean(element), "Animation state must be mounted with valid Element");
    mountedStates.set(element, this);
    this.element = element;
    const presenceId = this.options.presenceContext?.presenceId;
    if (presenceId !== void 0) element.setAttribute(motionGlobalConfig.motionAttribute, presenceId);
    this.visualElement?.mount(element);
    this.updateFeatures();
  }
  beforeUnmount() {
    this.getSnapshot(this.options, false);
  }
  unmount() {
    this.parent?.children?.delete(this);
    mountedStates.delete(this.element);
    this.features.forEach((f) => f.unmount?.());
    this.visualElement?.unmount();
  }
  beforeUpdate() {
    this.getSnapshot(this.options, void 0);
  }
  update() {
    this.updateFeatures();
    this.didUpdate();
  }
  tryExitComplete() {
    if (this.isExiting) return;
    if (this.options?.layoutId && this.visualElement.projection?.currentAnimation?.state === "running") return;
    this.options.presenceContext?.onMotionExitComplete?.(this.presenceContainer, this);
  }
  setActive(name, isActive) {
    if (name === "exit" && isActive) this.isExiting = true;
    this.visualElement?.animationState?.setActive(name, isActive).then(() => {
      if (name === "exit" && isActive) {
        this.isExiting = false;
        this.options?.layoutId ? frame$1.postRender(() => this.tryExitComplete()) : this.tryExitComplete();
      }
    });
  }
  isMounted() {
    return Boolean(this.element);
  }
  initVisualElement(renderer) {
    if (this.visualElement) return;
    this.visualElement = renderer(this.options.as, {
      presenceContext: this.options.presenceContext ?? null,
      parent: this.parent?.visualElement,
      props: {
        ...this.options,
        whileTap: this.options.whilePress
      },
      visualState: {
        renderState: {
          transform: {},
          transformOrigin: {},
          style: {},
          vars: {},
          attrs: {}
        },
        latestValues: { ...this.latestValues }
      },
      reducedMotionConfig: this.options.motionConfig?.reducedMotion
    });
    this.visualElement.parent?.addChild(this.visualElement);
    if (this.isMounted()) this.visualElement.mount(this.element);
  }
  getSnapshot(options, isPresent) {
  }
  didUpdate() {
  }
};
var Feature = class {
  constructor(state) {
    this.state = state;
  }
  mount() {
  }
  unmount() {
  }
  update() {
  }
};
const variantProps = [
  "initial",
  "animate",
  "exit",
  "whileHover",
  "whileDrag",
  "whileFocus",
  "whilePress"
];
var numVariantProps = variantProps.length;
function getVariantContext(visualElement) {
  if (!visualElement) return void 0;
  if (!visualElement.isControllingVariants) {
    const context$1 = visualElement.parent ? getVariantContext(visualElement.parent) || {} : {};
    if (visualElement.props.initial !== void 0) context$1.initial = visualElement.props.initial;
    return context$1;
  }
  const context = {};
  for (let i = 0; i < numVariantProps; i++) {
    const name = variantProps[i];
    const prop = visualElement.props[name];
    if (isVariantLabel(prop) || prop === false) context[name] = prop;
  }
  return context;
}
var variantPriorityOrder = [
  "animate",
  "whileInView",
  "whileFocus",
  "whileHover",
  "whilePress",
  "whileDrag",
  "exit"
];
var reversePriorityOrder = [...variantPriorityOrder].reverse();
var numAnimationTypes = variantPriorityOrder.length;
function createTypeState(isActive = false) {
  return {
    isActive,
    protectedKeys: {},
    needsAnimating: {},
    prevResolvedValues: {}
  };
}
function createState() {
  return {
    animate: createTypeState(true),
    whileInView: createTypeState(),
    whileHover: createTypeState(),
    whilePress: createTypeState(),
    whileDrag: createTypeState(),
    whileFocus: createTypeState(),
    exit: createTypeState()
  };
}
function checkVariantsDidChange(prev, next) {
  if (typeof next === "string") return next !== prev;
  else if (Array.isArray(next)) return !shallowCompare(next, prev);
  return false;
}
function isKeyframesTarget(v) {
  return Array.isArray(v);
}
function createAnimateFunction(visualElement) {
  return (animations) => {
    return Promise.all(animations.map(({ animation, options }) => animateVisualElement(visualElement, animation, options)));
  };
}
function createAnimationState(visualElement) {
  let animate = createAnimateFunction(visualElement);
  let state = createState();
  let isInitialRender = true;
  const buildResolvedTypeValues = (type) => (acc, definition) => {
    const resolved = resolveVariant$1(visualElement, definition, type === "exit" ? visualElement.presenceContext?.custom : void 0);
    if (resolved) {
      const { transition, transitionEnd, ...target } = resolved;
      acc = {
        ...acc,
        ...target,
        ...transitionEnd
      };
    }
    return acc;
  };
  function setAnimateFunction(makeAnimator) {
    animate = makeAnimator(visualElement);
  }
  function animateChanges(changedActiveType) {
    const { props } = visualElement;
    const context = getVariantContext(visualElement.parent) || {};
    const animations = [];
    const removedKeys = /* @__PURE__ */ new Set();
    let encounteredKeys = {};
    let removedVariantIndex = Infinity;
    for (let i = 0; i < numAnimationTypes; i++) {
      const type = reversePriorityOrder[i];
      const typeState = state[type];
      const prop = props[type] !== void 0 ? props[type] : context[type];
      const propIsVariant = isVariantLabel(prop);
      const activeDelta = type === changedActiveType ? typeState.isActive : null;
      if (activeDelta === false) removedVariantIndex = i;
      let isInherited = prop === context[type] && prop !== props[type] && propIsVariant;
      if (isInherited && isInitialRender && visualElement.manuallyAnimateOnMount) isInherited = false;
      typeState.protectedKeys = { ...encounteredKeys };
      if (!typeState.isActive && activeDelta === null || !prop && !typeState.prevProp || isAnimationControls(prop) || typeof prop === "boolean") continue;
      const variantDidChange = checkVariantsDidChange(typeState.prevProp, prop);
      let shouldAnimateType = variantDidChange || type === changedActiveType && typeState.isActive && !isInherited && propIsVariant || i > removedVariantIndex && propIsVariant;
      let handledRemovedValues = false;
      const definitionList = Array.isArray(prop) ? prop : [prop];
      let resolvedValues = definitionList.reduce(buildResolvedTypeValues(type), {});
      if (activeDelta === false) resolvedValues = {};
      const { prevResolvedValues = {} } = typeState;
      const allKeys = {
        ...prevResolvedValues,
        ...resolvedValues
      };
      const markToAnimate = (key) => {
        shouldAnimateType = true;
        if (removedKeys.has(key)) {
          handledRemovedValues = true;
          removedKeys.delete(key);
        }
        typeState.needsAnimating[key] = true;
        const motionValue$1 = visualElement.getValue(key);
        if (motionValue$1) motionValue$1.liveStyle = false;
      };
      for (const key in allKeys) {
        const next = resolvedValues[key];
        const prev = prevResolvedValues[key];
        if (Object.hasOwnProperty.call(encounteredKeys, key)) continue;
        let valueHasChanged = false;
        if (isKeyframesTarget(next) && isKeyframesTarget(prev)) valueHasChanged = !shallowCompare(next, prev);
        else valueHasChanged = next !== prev;
        if (valueHasChanged) if (next !== void 0 && next !== null) markToAnimate(key);
        else removedKeys.add(key);
        else if (next !== void 0 && removedKeys.has(key)) markToAnimate(key);
        else typeState.protectedKeys[key] = true;
      }
      typeState.prevProp = prop;
      typeState.prevResolvedValues = resolvedValues;
      if (typeState.isActive) encounteredKeys = {
        ...encounteredKeys,
        ...resolvedValues
      };
      if (isInitialRender && visualElement.blockInitialAnimation) shouldAnimateType = false;
      const willAnimateViaParent = isInherited && variantDidChange;
      if (shouldAnimateType && (!willAnimateViaParent || handledRemovedValues)) animations.push(...definitionList.map((animation) => {
        const options = { type };
        if (typeof animation === "string" && isInitialRender && !willAnimateViaParent && visualElement.manuallyAnimateOnMount && visualElement.parent) {
          const { parent } = visualElement;
          const parentVariant = resolveVariant$1(parent, animation);
          if (parent.enteringChildren && parentVariant) {
            const { delayChildren } = parentVariant.transition || {};
            options.delay = calcChildStagger(parent.enteringChildren, visualElement, delayChildren);
          }
        }
        return {
          animation,
          options
        };
      }));
    }
    if (removedKeys.size) {
      const fallbackAnimation = {};
      if (typeof props.initial !== "boolean") {
        const initialTransition = resolveVariant$1(visualElement, Array.isArray(props.initial) ? props.initial[0] : props.initial);
        if (initialTransition && initialTransition.transition) fallbackAnimation.transition = initialTransition.transition;
      }
      removedKeys.forEach((key) => {
        const fallbackTarget = visualElement.getBaseTarget(key);
        const motionValue$1 = visualElement.getValue(key);
        if (motionValue$1) motionValue$1.liveStyle = true;
        fallbackAnimation[key] = fallbackTarget ?? null;
      });
      animations.push({ animation: fallbackAnimation });
    }
    let shouldAnimate = Boolean(animations.length);
    if (isInitialRender && (props.initial === false || props.initial === props.animate) && !visualElement.manuallyAnimateOnMount) shouldAnimate = false;
    isInitialRender = false;
    return shouldAnimate ? animate(animations) : Promise.resolve();
  }
  function setActive(type, isActive) {
    if (state[type].isActive === isActive) return Promise.resolve();
    visualElement.variantChildren?.forEach((child) => {
      child.animationState?.setActive(type, isActive);
    });
    state[type].isActive = isActive;
    const animations = animateChanges(type);
    for (const key in state) state[key].protectedKeys = {};
    return animations;
  }
  return {
    animateChanges,
    setActive,
    setAnimateFunction,
    getState: () => state,
    reset: () => {
      state = createState();
      isInitialRender = true;
    }
  };
}
function isHidden(element) {
  return element.style.display === "none" || element.offsetParent === null && (void 0).getComputedStyle(element).position !== "fixed";
}
var AnimationFeature = class extends Feature {
  static #_ = this.key = "animation";
  constructor(state) {
    super(state);
    const ve = state.visualElement;
    ve.animationState ||= createAnimationState(ve);
  }
  updateAnimationControlsSubscription() {
    const { animate } = this.state.options;
    if (isAnimationControls(animate)) this.unmountControls = animate.subscribe(this.state.visualElement);
  }
  mount() {
    if (!!isHidden(this.state.element)) this.state.setActive("exit", true);
    else this.state.visualElement.animationState?.animateChanges();
    this.updateAnimationControlsSubscription();
  }
  update() {
    this.state.visualElement.animationState?.animateChanges();
    const { animate } = this.state.visualElement.getProps();
    const { animate: prevAnimate } = this.state.visualElement.prevProps || {};
    if (animate !== prevAnimate) this.updateAnimationControlsSubscription();
  }
  unmount() {
    this.state.visualElement.animationState.reset();
    this.unmountControls?.();
  }
};
function createVisualElement(Component, options) {
  return isSVGElement(Component) ? new SVGVisualElement(options) : new HTMLVisualElement(options);
}
function extractEventInfo$1(event) {
  return { point: {
    x: event.pageX,
    y: event.pageY
  } };
}
var PressGesture = class extends Feature {
  static #_ = this.key = "press";
  constructor(state) {
    super(state);
  }
  isActive() {
    const { whilePress, onPress, onPressCancel, onPressStart } = this.state.options;
    return Boolean(whilePress || onPress || onPressCancel || onPressStart);
  }
  register() {
    const element = this.state.element;
    if (!element || !this.isActive()) return;
    this.removePress?.();
    this.removePress = press(element, (_el, startEvent) => {
      const props = this.state.options;
      this.state.setActive("whilePress", true);
      if (props.onPressStart) frame$1.postRender(() => props.onPressStart(startEvent, extractEventInfo$1(startEvent)));
      return (endEvent, { success }) => {
        this.state.setActive("whilePress", false);
        const callbackName = success ? "onPress" : "onPressCancel";
        const callback = this.state.options[callbackName];
        if (callback) frame$1.postRender(() => callback(endEvent, extractEventInfo$1(endEvent)));
      };
    }, { useGlobalTarget: this.state.options.globalPressTarget });
  }
  mount() {
    this.register();
  }
  update() {
    const prev = this.state.visualElement.prevProps;
    if (!Boolean(prev?.whilePress || prev?.whileTap || prev?.onPress || prev?.onPressCancel || prev?.onPressStart) && this.isActive()) this.register();
  }
  unmount() {
    this.removePress?.();
    this.removePress = void 0;
  }
};
function isPrimaryPointer(event) {
  if (event.pointerType === "mouse") return typeof event.button !== "number" || event.button <= 0;
  else return event.isPrimary !== false;
}
function extractEventInfo(event, pointType = "page") {
  return { point: {
    x: event[`${pointType}X`],
    y: event[`${pointType}Y`]
  } };
}
function addPointerInfo(handler) {
  return (event) => isPrimaryPointer(event) && handler(event, extractEventInfo(event));
}
var HoverGesture = class extends Feature {
  static #_ = this.key = "hover";
  constructor(state) {
    super(state);
  }
  isActive() {
    const { whileHover, onHoverStart, onHoverEnd } = this.state.options;
    return Boolean(whileHover || onHoverStart || onHoverEnd);
  }
  register() {
    const element = this.state.element;
    if (!element || !this.isActive()) return;
    this.removeHover?.();
    this.removeHover = hover(element, (_el, startEvent) => {
      const props = this.state.options;
      this.state.setActive("whileHover", true);
      if (props.onHoverStart) frame$1.postRender(() => props.onHoverStart(startEvent, extractEventInfo(startEvent)));
      return (endEvent) => {
        this.state.setActive("whileHover", false);
        const callback = this.state.options.onHoverEnd;
        if (callback) frame$1.postRender(() => callback(endEvent, extractEventInfo(endEvent)));
      };
    });
  }
  mount() {
    this.register();
  }
  update() {
    const prev = this.state.visualElement.prevProps;
    if (!Boolean(prev?.whileHover || prev?.onHoverStart || prev?.onHoverEnd) && this.isActive()) this.register();
  }
  unmount() {
    this.removeHover?.();
    this.removeHover = void 0;
  }
};
var InViewGesture = class extends Feature {
  static #_ = this.key = "inView";
  constructor(state) {
    super(state);
  }
  isActive() {
    const { whileInView, onViewportEnter, onViewportLeave } = this.state.options;
    return Boolean(whileInView || onViewportEnter || onViewportLeave);
  }
  startObserver() {
    const element = this.state.element;
    if (!element || !this.isActive()) return;
    this.removeObserver?.();
    const { once, ...viewOptions } = this.state.options.inViewOptions || {};
    this.removeObserver = inView(element, (_, entry) => {
      const props = this.state.options;
      this.state.setActive("whileInView", true);
      if (props.onViewportEnter) frame$1.postRender(() => props.onViewportEnter(entry));
      if (!once) return () => {
        this.state.setActive("whileInView", false);
        const leaveCallback = this.state.options.onViewportLeave;
        if (leaveCallback) frame$1.postRender(() => leaveCallback(entry));
      };
    }, viewOptions);
  }
  mount() {
    this.startObserver();
  }
  update() {
    const { props, prevProps } = this.state.visualElement;
    if ([
      "amount",
      "margin",
      "root"
    ].some((name) => {
      return props.inViewOptions?.[name] !== prevProps?.inViewOptions?.[name];
    })) this.startObserver();
  }
  unmount() {
    this.removeObserver?.();
    this.removeObserver = void 0;
  }
};
function addDomEvent(target, eventName, handler, options = { passive: true }) {
  target.addEventListener(eventName, handler, options);
  return () => target.removeEventListener(eventName, handler);
}
var FocusGesture = class extends Feature {
  static #_ = this.key = "focus";
  constructor(state) {
    super(state);
    this.isFocused = false;
  }
  onFocus() {
    let isFocusVisible = false;
    try {
      isFocusVisible = this.state.element.matches(":focus-visible");
    } catch {
      isFocusVisible = true;
    }
    if (!isFocusVisible) return;
    this.state.setActive("whileFocus", true);
    this.isFocused = true;
  }
  onBlur() {
    if (!this.isFocused) return;
    this.state.setActive("whileFocus", false);
    this.isFocused = false;
  }
  mount() {
    const element = this.state.element;
    this.removeFocus = pipe(addDomEvent(element, "focus", () => this.onFocus()), addDomEvent(element, "blur", () => this.onBlur()));
  }
  unmount() {
    this.removeFocus?.();
    this.removeFocus = void 0;
  }
};
function getClosestProjectingNode(visualElement) {
  if (!visualElement) return void 0;
  return visualElement.options.allowProjection !== false ? visualElement.projection : getClosestProjectingNode(visualElement.parent);
}
const defaultScaleCorrector = {
  borderRadius: {
    ...correctBorderRadius,
    applyTo: [
      "borderTopLeftRadius",
      "borderTopRightRadius",
      "borderBottomLeftRadius",
      "borderBottomRightRadius"
    ]
  },
  borderTopLeftRadius: correctBorderRadius,
  borderTopRightRadius: correctBorderRadius,
  borderBottomLeftRadius: correctBorderRadius,
  borderBottomRightRadius: correctBorderRadius,
  boxShadow: correctBoxShadow
};
function isHTMLElement(value) {
  return typeof value === "object" && value !== null && "nodeType" in value;
}
var ProjectionFeature = class extends Feature {
  static #_ = this.key = "projection";
  constructor(state) {
    super(state);
    addScaleCorrector(defaultScaleCorrector);
  }
  initProjection() {
    const options = this.state.options;
    this.state.visualElement.projection = new HTMLProjectionNode(this.state.visualElement.latestValues, options["data-framer-portal-id"] ? void 0 : getClosestProjectingNode(this.state.visualElement.parent));
    this.projection = this.state.visualElement.projection;
    this.projection.isPresent = true;
    this.setOptions();
  }
  setOptions() {
    const options = this.state.options;
    const { layoutId, layout, drag = false, dragConstraints = false } = options;
    this.projection?.setOptions({
      layout,
      layoutId,
      alwaysMeasureLayout: Boolean(layoutId) || Boolean(drag) || dragConstraints && isHTMLElement(dragConstraints),
      visualElement: this.state.visualElement,
      animationType: typeof options.layout === "string" ? options.layout : "both",
      layoutRoot: options.layoutRoot,
      layoutScroll: options.layoutScroll,
      crossfade: options.crossfade,
      onExitComplete: () => {
        if (!this.projection?.isPresent && this.state.options.layoutId && !this.state.isExiting) queueMicrotask(() => {
          this.state.options.presenceContext?.onMotionExitComplete?.(this.state.presenceContainer, this.state);
        });
      }
    });
  }
  update() {
    this.setOptions();
  }
  mount() {
    this.projection?.mount(this.state.element);
  }
};
function addPointerEvent(target, eventName, handler, options) {
  return addDomEvent(target, eventName, addPointerInfo(handler), options);
}
var overflowStyles = /* @__PURE__ */ new Set(["auto", "scroll"]);
var PanSession = class {
  constructor(event, handlers, { transformPagePoint, contextWindow, dragSnapToOrigin = false, element } = {}) {
    this.startEvent = null;
    this.lastMoveEvent = null;
    this.lastMoveEventInfo = null;
    this.handlers = {};
    this.contextWindow = void 0;
    this.scrollPositions = /* @__PURE__ */ new Map();
    this.onElementScroll = (event$1) => {
      this.handleScroll(event$1.target);
    };
    this.onWindowScroll = () => {
      this.handleScroll(void 0);
    };
    this.updatePoint = () => {
      if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
      const info = getPanInfo(this.lastMoveEventInfo, this.history);
      const isPanStarted = this.startEvent !== null;
      const isDistancePastThreshold = distance2D(info.offset, {
        x: 0,
        y: 0
      }) >= 3;
      if (!isPanStarted && !isDistancePastThreshold) return;
      const { point: point$1 } = info;
      const { timestamp: timestamp$1 } = frameData;
      this.history.push({
        ...point$1,
        timestamp: timestamp$1
      });
      const { onStart, onMove } = this.handlers;
      if (!isPanStarted) {
        onStart && onStart(this.lastMoveEvent, info);
        this.startEvent = this.lastMoveEvent;
      }
      onMove && onMove(this.lastMoveEvent, info);
    };
    this.handlePointerMove = (event$1, info) => {
      this.lastMoveEvent = event$1;
      this.lastMoveEventInfo = transformPoint(info, this.transformPagePoint);
      frame.update(this.updatePoint, true);
    };
    this.handlePointerUp = (event$1, info) => {
      this.end();
      const { onEnd, onSessionEnd, resumeAnimation } = this.handlers;
      if (this.dragSnapToOrigin || !this.startEvent) resumeAnimation && resumeAnimation();
      if (!(this.lastMoveEvent && this.lastMoveEventInfo)) return;
      const panInfo = getPanInfo(event$1.type === "pointercancel" ? this.lastMoveEventInfo : transformPoint(info, this.transformPagePoint), this.history);
      if (this.startEvent && onEnd) onEnd(event$1, panInfo);
      onSessionEnd && onSessionEnd(event$1, panInfo);
    };
    if (!isPrimaryPointer(event)) return;
    this.dragSnapToOrigin = dragSnapToOrigin;
    this.handlers = handlers;
    this.transformPagePoint = transformPagePoint;
    this.contextWindow = contextWindow || void 0;
    const initialInfo = transformPoint(extractEventInfo(event), this.transformPagePoint);
    const { point } = initialInfo;
    const { timestamp } = frameData;
    this.history = [{
      ...point,
      timestamp
    }];
    const { onSessionStart } = handlers;
    onSessionStart && onSessionStart(event, getPanInfo(initialInfo, this.history));
    this.removeListeners = pipe(addPointerEvent(this.contextWindow, "pointermove", this.handlePointerMove), addPointerEvent(this.contextWindow, "pointerup", this.handlePointerUp), addPointerEvent(this.contextWindow, "pointercancel", this.handlePointerUp));
    if (element) this.startScrollTracking(element);
  }
  isScrollable(node) {
    const style = (void 0).getComputedStyle(node);
    return style.overflow === "auto" || style.overflow === "scroll" || style.overflowX === "auto" || style.overflowX === "scroll" || style.overflowY === "auto" || style.overflowY === "scroll";
  }
  startScrollTracking(element) {
    let current = element.parentElement;
    while (current) {
      const style = getComputedStyle(current);
      if (overflowStyles.has(style.overflowX) || overflowStyles.has(style.overflowY)) this.scrollPositions.set(current, {
        x: current.scrollLeft,
        y: current.scrollTop
      });
      current = current.parentElement;
    }
    this.scrollPositions.set(void 0, {
      x: (void 0).scrollX,
      y: (void 0).scrollY
    });
    (void 0).addEventListener("scroll", this.onElementScroll, {
      capture: true,
      passive: true
    });
    (void 0).addEventListener("scroll", this.onWindowScroll, { passive: true });
    this.removeScrollListeners = () => {
      (void 0).removeEventListener("scroll", this.onElementScroll, { capture: true });
      (void 0).removeEventListener("scroll", this.onWindowScroll);
    };
  }
  handleScroll(target) {
    const initial = this.scrollPositions.get(target);
    if (!initial) return;
    const isWindow = target === void 0;
    const current = isWindow ? {
      x: (void 0).scrollX,
      y: (void 0).scrollY
    } : {
      x: target.scrollLeft,
      y: target.scrollTop
    };
    const delta = {
      x: current.x - initial.x,
      y: current.y - initial.y
    };
    if (delta.x === 0 && delta.y === 0) return;
    if (isWindow) {
      if (this.lastMoveEventInfo) {
        this.lastMoveEventInfo.point.x += delta.x;
        this.lastMoveEventInfo.point.y += delta.y;
      }
    } else if (this.history.length > 0) {
      this.history[0].x -= delta.x;
      this.history[0].y -= delta.y;
    }
    this.scrollPositions.set(target, current);
    frame.update(this.updatePoint, true);
  }
  updateHandlers(handlers) {
    this.handlers = handlers;
  }
  end() {
    this.removeListeners && this.removeListeners();
    this.removeScrollListeners?.();
    this.scrollPositions.clear();
    cancelFrame$1(this.updatePoint);
  }
};
function transformPoint(info, transformPagePoint) {
  return transformPagePoint ? { point: transformPagePoint(info.point) } : info;
}
function subtractPoint(a, b) {
  return {
    x: a.x - b.x,
    y: a.y - b.y
  };
}
function getPanInfo({ point }, history) {
  return {
    point,
    delta: subtractPoint(point, lastDevicePoint(history)),
    offset: subtractPoint(point, startDevicePoint(history)),
    velocity: getVelocity(history, 0.1)
  };
}
function startDevicePoint(history) {
  return history[0];
}
function lastDevicePoint(history) {
  return history[history.length - 1];
}
function getVelocity(history, timeDelta) {
  if (history.length < 2) return {
    x: 0,
    y: 0
  };
  let i = history.length - 1;
  let timestampedPoint = null;
  const lastPoint = lastDevicePoint(history);
  while (i >= 0) {
    timestampedPoint = history[i];
    if (lastPoint.timestamp - timestampedPoint.timestamp > secondsToMilliseconds(timeDelta)) break;
    i--;
  }
  if (!timestampedPoint) return {
    x: 0,
    y: 0
  };
  const time = millisecondsToSeconds(lastPoint.timestamp - timestampedPoint.timestamp);
  if (time === 0) return {
    x: 0,
    y: 0
  };
  const currentVelocity = {
    x: (lastPoint.x - timestampedPoint.x) / time,
    y: (lastPoint.y - timestampedPoint.y) / time
  };
  if (currentVelocity.x === Infinity) currentVelocity.x = 0;
  if (currentVelocity.y === Infinity) currentVelocity.y = 0;
  return currentVelocity;
}
function asyncHandler(handler) {
  return (event, info) => {
    if (handler) frame$1.postRender(() => handler(event, info));
  };
}
var PanGesture = class extends Feature {
  constructor(..._args) {
    super(..._args);
    this.removePointerDownListener = noop;
  }
  static #_ = this.key = "pan";
  onPointerDown(pointerDownEvent) {
    this.session = new PanSession(pointerDownEvent, this.createPanHandlers(), {
      transformPagePoint: this.state.visualElement.getTransformPagePoint(),
      contextWindow: getContextWindow(this.state.visualElement)
    });
  }
  createPanHandlers() {
    return {
      onSessionStart: asyncHandler((_, info) => {
        const { onPanSessionStart } = this.state.options;
        onPanSessionStart && onPanSessionStart(_, info);
      }),
      onStart: asyncHandler((_, info) => {
        const { onPanStart } = this.state.options;
        onPanStart && onPanStart(_, info);
      }),
      onMove: (event, info) => {
        const { onPan } = this.state.options;
        onPan && onPan(event, info);
      },
      onEnd: (event, info) => {
        const { onPanEnd } = this.state.options;
        delete this.session;
        if (onPanEnd) frame$1.postRender(() => onPanEnd(event, info));
      }
    };
  }
  mount() {
    this.removePointerDownListener = addPointerEvent(this.state.element, "pointerdown", this.onPointerDown.bind(this));
  }
  update() {
  }
  unmount() {
    this.removePointerDownListener();
    this.session && this.session.end();
  }
};
function createLock(name) {
  let lock = null;
  return () => {
    const openLock = () => {
      lock = null;
    };
    if (lock === null) {
      lock = name;
      return openLock;
    }
    return false;
  };
}
var globalHorizontalLock = createLock("dragHorizontal");
var globalVerticalLock = createLock("dragVertical");
function getGlobalLock(drag) {
  let lock = false;
  if (drag === "y") lock = globalVerticalLock();
  else if (drag === "x") lock = globalHorizontalLock();
  else {
    const openHorizontal = globalHorizontalLock();
    const openVertical = globalVerticalLock();
    if (openHorizontal && openVertical) lock = () => {
      openHorizontal();
      openVertical();
    };
    else {
      if (openHorizontal) openHorizontal();
      if (openVertical) openVertical();
    }
  }
  return lock;
}
function applyConstraints(point, { min, max }, elastic) {
  if (min !== void 0 && point < min) point = elastic ? mixNumber(min, point, elastic.min) : Math.max(point, min);
  else if (max !== void 0 && point > max) point = elastic ? mixNumber(max, point, elastic.max) : Math.min(point, max);
  return point;
}
const defaultElastic = 0.35;
function calcRelativeConstraints(layoutBox, { top, left, bottom, right }) {
  return {
    x: calcRelativeAxisConstraints(layoutBox.x, left, right),
    y: calcRelativeAxisConstraints(layoutBox.y, top, bottom)
  };
}
function calcRelativeAxisConstraints(axis, min, max) {
  return {
    min: min !== void 0 ? axis.min + min : void 0,
    max: max !== void 0 ? axis.max + max - (axis.max - axis.min) : void 0
  };
}
function resolveDragElastic(dragElastic = defaultElastic) {
  if (dragElastic === false) dragElastic = 0;
  else if (dragElastic === true) dragElastic = defaultElastic;
  return {
    x: resolveAxisElastic(dragElastic, "left", "right"),
    y: resolveAxisElastic(dragElastic, "top", "bottom")
  };
}
function resolveAxisElastic(dragElastic, minLabel, maxLabel) {
  return {
    min: resolvePointElastic(dragElastic, minLabel),
    max: resolvePointElastic(dragElastic, maxLabel)
  };
}
function resolvePointElastic(dragElastic, label) {
  return typeof dragElastic === "number" ? dragElastic : dragElastic[label] || 0;
}
function rebaseAxisConstraints(layout, constraints) {
  const relativeConstraints = {};
  if (constraints.min !== void 0) relativeConstraints.min = constraints.min - layout.min;
  if (constraints.max !== void 0) relativeConstraints.max = constraints.max - layout.min;
  return relativeConstraints;
}
function calcViewportConstraints(layoutBox, constraintsBox) {
  return {
    x: calcViewportAxisConstraints(layoutBox.x, constraintsBox.x),
    y: calcViewportAxisConstraints(layoutBox.y, constraintsBox.y)
  };
}
function calcViewportAxisConstraints(layoutAxis, constraintsAxis) {
  let min = constraintsAxis.min - layoutAxis.min;
  let max = constraintsAxis.max - layoutAxis.max;
  if (constraintsAxis.max - constraintsAxis.min < layoutAxis.max - layoutAxis.min) [min, max] = [max, min];
  return {
    min,
    max
  };
}
function calcOrigin(source, target) {
  let origin = 0.5;
  const sourceLength = calcLength(source);
  const targetLength = calcLength(target);
  if (targetLength > sourceLength) origin = progress(target.min, target.max - sourceLength, source.min);
  else if (sourceLength > targetLength) origin = progress(source.min, source.max - targetLength, target.min);
  return clamp(0, 1, origin);
}
const elementDragControls = /* @__PURE__ */ new WeakMap();
var VisualElementDragControls = class {
  constructor(state) {
    this.openGlobalLock = null;
    this.isDragging = false;
    this.currentDirection = null;
    this.originPoint = {
      x: 0,
      y: 0
    };
    this.constraints = false;
    this.hasMutatedConstraints = false;
    this.elastic = createBox();
    this.state = state;
  }
  get visualElement() {
    return this.state.visualElement;
  }
  start(originEvent, { snapToCursor = false } = {}) {
    const onSessionStart = (event) => {
      if (snapToCursor) this.stopAnimation();
      else this.pauseAnimation();
      if (snapToCursor) this.snapToCursor(extractEventInfo(event, "page").point);
    };
    const onStart = (event, info) => {
      this.stopAnimation();
      const { drag, dragPropagation, onDragStart } = this.getProps();
      if (drag && !dragPropagation) {
        if (this.openGlobalLock) this.openGlobalLock();
        this.openGlobalLock = getGlobalLock(drag);
        if (!this.openGlobalLock) return;
      }
      this.isDragging = true;
      this.currentDirection = null;
      this.resolveConstraints();
      if (this.visualElement.projection) {
        this.visualElement.projection.isAnimationBlocked = true;
        this.visualElement.projection.target = void 0;
      }
      eachAxis((axis) => {
        let current = this.getAxisMotionValue(axis).get() || 0;
        if (percent.test(current)) {
          const { projection } = this.visualElement;
          if (projection && projection.layout) {
            const measuredAxis = projection.layout.layoutBox[axis];
            if (measuredAxis) current = calcLength(measuredAxis) * (parseFloat(current) / 100);
          }
        }
        this.originPoint[axis] = current;
      });
      if (onDragStart) frame$1.postRender(() => onDragStart(event, info));
      addValueToWillChange(this.visualElement, "transform");
      this.state.setActive("whileDrag", true);
    };
    const onMove = (event, info) => {
      const { dragPropagation, dragDirectionLock, onDirectionLock, onDrag } = this.getProps();
      if (!dragPropagation && !this.openGlobalLock) return;
      const { offset } = info;
      if (dragDirectionLock && this.currentDirection === null) {
        this.currentDirection = getCurrentDirection(offset);
        if (this.currentDirection !== null) onDirectionLock && onDirectionLock(this.currentDirection);
        return;
      }
      this.updateAxis("x", info.point, offset);
      this.updateAxis("y", info.point, offset);
      this.visualElement.render();
      onDrag && onDrag(event, info);
    };
    const onSessionEnd = (event, info) => this.stop(event, info);
    const resumeAnimation = () => eachAxis((axis) => this.getAnimationState(axis) === "paused" && this.getAxisMotionValue(axis).animation?.play());
    const { dragSnapToOrigin } = this.getProps();
    this.panSession = new PanSession(originEvent, {
      onSessionStart,
      onStart,
      onMove,
      onSessionEnd,
      resumeAnimation
    }, {
      transformPagePoint: this.visualElement.getTransformPagePoint(),
      dragSnapToOrigin,
      contextWindow: getContextWindow(this.visualElement),
      element: this.state.element
    });
  }
  stop(event, info) {
    const isDragging = this.isDragging;
    this.cancel();
    if (!isDragging) return;
    const { velocity } = info;
    this.startAnimation(velocity);
    const { onDragEnd } = this.getProps();
    if (onDragEnd) frame$1.postRender(() => onDragEnd(event, info));
  }
  cancel() {
    this.isDragging = false;
    const { projection } = this.visualElement;
    if (projection) projection.isAnimationBlocked = false;
    this.panSession && this.panSession.end();
    this.panSession = void 0;
    const { dragPropagation } = this.getProps();
    if (!dragPropagation && this.openGlobalLock) {
      this.openGlobalLock();
      this.openGlobalLock = null;
    }
    this.state.setActive("whileDrag", false);
  }
  updateAxis(axis, _point, offset) {
    const { drag } = this.getProps();
    if (!offset || !shouldDrag(axis, drag, this.currentDirection)) return;
    const axisValue = this.getAxisMotionValue(axis);
    let next = this.originPoint[axis] + offset[axis];
    if (this.constraints && this.constraints[axis]) next = applyConstraints(next, this.constraints[axis], this.elastic[axis]);
    axisValue.set(next);
  }
  resolveConstraints() {
    const { dragConstraints, dragElastic } = this.getProps();
    const layout = this.visualElement.projection && !this.visualElement.projection.layout ? this.visualElement.projection.measure(false) : this.visualElement.projection?.layout;
    const prevConstraints = this.constraints;
    if (dragConstraints && isHTMLElement(dragConstraints)) {
      if (!this.constraints) this.constraints = this.resolveRefConstraints();
    } else if (dragConstraints && layout) this.constraints = calcRelativeConstraints(layout.layoutBox, dragConstraints);
    else this.constraints = false;
    this.elastic = resolveDragElastic(dragElastic);
    if (prevConstraints !== this.constraints && layout && this.constraints && !this.hasMutatedConstraints) eachAxis((axis) => {
      if (this.constraints !== false && this.getAxisMotionValue(axis)) this.constraints[axis] = rebaseAxisConstraints(layout.layoutBox[axis], this.constraints[axis]);
    });
  }
  resolveRefConstraints() {
    const { dragConstraints: constraints, onMeasureDragConstraints } = this.getProps();
    if (!constraints || !isHTMLElement(constraints)) return false;
    const constraintsElement = constraints;
    invariant(constraintsElement !== null, "If `dragConstraints` is set as a React ref, that ref must be passed to another component's `ref` prop.");
    const { projection } = this.visualElement;
    if (!projection || !projection.layout) return false;
    const constraintsBox = measurePageBox(constraintsElement, projection.root, this.visualElement.getTransformPagePoint());
    let measuredConstraints = calcViewportConstraints(projection.layout.layoutBox, constraintsBox);
    if (onMeasureDragConstraints) {
      const userConstraints = onMeasureDragConstraints(convertBoxToBoundingBox(measuredConstraints));
      this.hasMutatedConstraints = !!userConstraints;
      if (userConstraints) measuredConstraints = convertBoundingBoxToBox(userConstraints);
    }
    return measuredConstraints;
  }
  startAnimation(velocity) {
    const { drag, dragMomentum, dragElastic, dragTransition, dragSnapToOrigin, onDragTransitionEnd } = this.getProps();
    const constraints = this.constraints || {};
    const momentumAnimations = eachAxis((axis) => {
      if (!shouldDrag(axis, drag, this.currentDirection)) return;
      let transition = constraints && constraints[axis] || {};
      if (dragSnapToOrigin) transition = {
        min: 0,
        max: 0
      };
      const bounceStiffness = dragElastic ? 200 : 1e6;
      const bounceDamping = dragElastic ? 40 : 1e7;
      const inertia = {
        type: "inertia",
        velocity: dragMomentum ? velocity[axis] : 0,
        bounceStiffness,
        bounceDamping,
        timeConstant: 750,
        restDelta: 1,
        restSpeed: 10,
        ...dragTransition,
        ...transition
      };
      return this.startAxisValueAnimation(axis, inertia);
    });
    return Promise.all(momentumAnimations).then(onDragTransitionEnd);
  }
  startAxisValueAnimation(axis, transition) {
    const axisValue = this.getAxisMotionValue(axis);
    addValueToWillChange(this.visualElement, axis);
    return axisValue.start(animateMotionValue(axis, axisValue, 0, transition, this.visualElement, false));
  }
  stopAnimation() {
    if (!this.visualElement.projection?.isPresent) return;
    eachAxis((axis) => this.getAxisMotionValue(axis).stop());
  }
  pauseAnimation() {
    eachAxis((axis) => this.getAxisMotionValue(axis).animation?.pause());
  }
  getAnimationState(axis) {
    return this.getAxisMotionValue(axis).animation?.state;
  }
  getAxisMotionValue(axis) {
    const dragKey = `_drag${axis.toUpperCase()}`;
    const props = this.visualElement.getProps();
    return props[dragKey] || this.visualElement.getValue(axis, (props.initial ? props.initial[axis] : void 0) || 0);
  }
  snapToCursor(point) {
    eachAxis((axis) => {
      const { drag } = this.getProps();
      if (!shouldDrag(axis, drag, this.currentDirection)) return;
      const { projection } = this.visualElement;
      const axisValue = this.getAxisMotionValue(axis);
      if (projection && projection.layout) {
        const { min, max } = projection.layout.layoutBox[axis];
        axisValue.set(point[axis] - mixNumber(min, max, 0.5));
      }
    });
  }
  scalePositionWithinConstraints() {
    if (!this.visualElement.current) return;
    const { drag, dragConstraints } = this.getProps();
    const { projection } = this.visualElement;
    if (!isHTMLElement(dragConstraints) || !projection || !this.constraints) return;
    this.stopAnimation();
    const boxProgress = {
      x: 0,
      y: 0
    };
    eachAxis((axis) => {
      const axisValue = this.getAxisMotionValue(axis);
      if (axisValue && this.constraints !== false) {
        const latest = axisValue.get();
        boxProgress[axis] = calcOrigin({
          min: latest,
          max: latest
        }, this.constraints[axis]);
      }
    });
    const { transformTemplate } = this.visualElement.getProps();
    this.state.element.style.transform = transformTemplate ? transformTemplate({}, "") : "none";
    projection.root && projection.root.updateScroll();
    projection.updateLayout();
    this.resolveConstraints();
    eachAxis((axis) => {
      if (!shouldDrag(axis, drag, null)) return;
      const axisValue = this.getAxisMotionValue(axis);
      const { min, max } = this.constraints[axis];
      axisValue.set(mixNumber(min, max, boxProgress[axis]));
    });
  }
  addListeners() {
    if (!this.state.element) return;
    elementDragControls.set(this.visualElement, this);
    const element = this.state.element;
    const stopPointerListener = addPointerEvent(element, "pointerdown", (event) => {
      const { drag, dragListener = true } = this.getProps();
      drag && dragListener && this.start(event);
    });
    const measureDragConstraints = () => {
      const { dragConstraints } = this.getProps();
      if (isHTMLElement(dragConstraints)) this.constraints = this.resolveRefConstraints();
    };
    const { projection } = this.visualElement;
    const stopMeasureLayoutListener = projection.addEventListener("measure", measureDragConstraints);
    if (projection && !projection.layout) {
      projection.root && projection.root.updateScroll();
      projection.updateLayout();
    }
    frame$1.read(measureDragConstraints);
    const stopResizeListener = addDomEvent(void 0, "resize", () => this.scalePositionWithinConstraints());
    const stopLayoutUpdateListener = projection.addEventListener("didUpdate", (({ delta, hasLayoutChanged }) => {
      if (this.isDragging && hasLayoutChanged) {
        eachAxis((axis) => {
          const motionValue$1 = this.getAxisMotionValue(axis);
          if (!motionValue$1) return;
          this.originPoint[axis] += delta[axis].translate;
          motionValue$1.set(motionValue$1.get() + delta[axis].translate);
        });
        this.visualElement.render();
      }
    }));
    return () => {
      stopResizeListener();
      stopPointerListener();
      stopMeasureLayoutListener();
      stopLayoutUpdateListener && stopLayoutUpdateListener();
    };
  }
  getProps() {
    const props = this.visualElement.getProps();
    const { drag = false, dragDirectionLock = false, dragPropagation = false, dragConstraints = false, dragElastic = defaultElastic, dragMomentum = true } = props;
    return {
      ...props,
      drag,
      dragDirectionLock,
      dragPropagation,
      dragConstraints,
      dragElastic,
      dragMomentum
    };
  }
};
function shouldDrag(direction, drag, currentDirection) {
  return (drag === true || drag === direction) && (currentDirection === null || currentDirection === direction);
}
function getCurrentDirection(offset, lockThreshold = 10) {
  let direction = null;
  if (Math.abs(offset.y) > lockThreshold) direction = "y";
  else if (Math.abs(offset.x) > lockThreshold) direction = "x";
  return direction;
}
var DragGesture = class extends Feature {
  static #_ = this.key = "drag";
  constructor(state) {
    super(state);
    this.removeGroupControls = noop;
    this.removeListeners = noop;
    this.controls = new VisualElementDragControls(state);
  }
  mount() {
    const { dragControls } = this.state.options;
    if (dragControls) this.removeGroupControls = dragControls.subscribe(this.controls);
    this.removeListeners = this.controls.addListeners() || noop;
  }
  unmount() {
    this.removeGroupControls();
    this.removeListeners();
  }
};
var hasLayoutUpdate = false;
var LayoutFeature = class extends Feature {
  static #_ = this.key = "layout";
  constructor(state) {
    super(state);
    this.hasMountSettled = false;
    addScaleCorrector(defaultScaleCorrector);
    state.getSnapshot = this.getSnapshot.bind(this);
    state.didUpdate = this.didUpdate.bind(this);
  }
  updatePrevLead(projection) {
    const stack = projection.getStack();
    if (stack?.prevLead && !stack.prevLead.snapshot) {
      stack.prevLead.willUpdate();
      hasLayoutUpdate = true;
    }
  }
  didUpdate() {
    if (!hasLayoutUpdate) return;
    if (this.state.options.layout || this.state.options.layoutId || this.state.options.drag) {
      hasLayoutUpdate = false;
      this.state.visualElement.projection?.root?.didUpdate();
    }
  }
  mount() {
    const options = this.state.options;
    const layoutGroup = this.state.options.layoutGroup;
    if (options.layout || options.layoutId) {
      const projection = this.state.visualElement.projection;
      if (options.layoutId) {
        const isPresent = !isHidden(this.state.element);
        projection.isPresent = isPresent;
        isPresent ? projection.promote() : projection.relegate();
        this.updatePrevLead(projection);
      }
      layoutGroup?.group?.add(projection);
      globalProjectionState.hasEverUpdated = true;
    }
    this.didUpdate();
    frame$1.postRender(() => {
      this.hasMountSettled = true;
    });
  }
  unmount() {
    const layoutGroup = this.state.options.layoutGroup;
    const projection = this.state.visualElement.projection;
    if (projection) {
      if (layoutGroup?.group && (this.state.options.layout || this.state.options.layoutId)) layoutGroup.group.remove(projection);
      if (this.state.options.layoutId) hasLayoutUpdate = true;
      this.didUpdate();
    }
  }
  getSnapshot(newOptions, isPresent) {
    const projection = this.state.visualElement.projection;
    const { drag, layoutDependency, layout, layoutId } = newOptions;
    if (!projection || !layout && !layoutId && !drag) return;
    if (!this.hasMountSettled) return;
    hasLayoutUpdate = true;
    const prevProps = this.state.options;
    if (drag || prevProps.layoutDependency !== layoutDependency || layoutDependency === void 0 || isDef(isPresent) && projection.isPresent !== isPresent) projection.willUpdate();
    if (isDef(isPresent) && isPresent !== projection.isPresent) {
      projection.isPresent = isPresent;
      if (isPresent) {
        projection.promote();
        this.updatePrevLead(projection);
      } else projection.relegate();
    }
  }
};
const domMax = {
  renderer: createVisualElement,
  features: [
    AnimationFeature,
    PressGesture,
    HoverGesture,
    InViewGesture,
    FocusGesture,
    ProjectionFeature,
    PanGesture,
    DragGesture,
    LayoutFeature
  ]
};
const [useLazyMotionContext] = createContext("LazyMotionContext");
const [injectAnimatePresence, provideAnimatePresence] = createContext("AnimatePresenceContext");
function camelToDash(str) {
  return str.replace(/([A-Z])/g, (match) => `-${match.toLowerCase()}`);
}
function createHTMLRenderState() {
  return {
    transform: {},
    transformOrigin: {},
    style: {},
    vars: {}
  };
}
function createSVGRenderState() {
  return {
    ...createHTMLRenderState(),
    attrs: {}
  };
}
function createStyles(latestValues) {
  const state = createHTMLRenderState();
  buildHTMLStyles(state, latestValues);
  const result = { ...state.style };
  for (const key in state.vars) result[key] = state.vars[key];
  if (Object.keys(result).length === 0) return null;
  return result;
}
function createSVGStyles(latestValues, tag, styleProp) {
  const state = createSVGRenderState();
  buildSVGAttrs(state, latestValues, isSVGTag(tag), void 0, styleProp);
  const attrs = {};
  for (const key in state.attrs) {
    const attrKey = camelCaseAttributes.has(key) ? key : camelToDash(key);
    attrs[attrKey] = state.attrs[key];
  }
  return {
    attrs,
    style: {
      ...state.style,
      ...state.vars
    }
  };
}
function useMotionState(props, renderer) {
  const parentState = injectMotion(null);
  const layoutGroup = injectLayoutGroup({});
  const config = useMotionConfig();
  const presenceContext = injectAnimatePresence({});
  const lazyMotionContext = useLazyMotionContext({
    features: ref({}),
    strict: false
  });
  const attrs = useAttrs();
  function getProps() {
    return resolveMotionProps(props, {
      layoutGroup,
      presenceContext,
      config: config.value
    });
  }
  function getMotionProps() {
    return {
      ...attrs,
      ...getProps()
    };
  }
  const state = new MotionState(getMotionProps(), parentState);
  provideMotion(state);
  if (renderer) state.initVisualElement(renderer);
  watch(lazyMotionContext.features, (bundle) => {
    if (bundle.features?.length) updateLazyFeatures(bundle.features);
    if (bundle.renderer) state.initVisualElement(bundle.renderer);
    state.updateFeatures();
  }, {
    immediate: true,
    flush: "pre"
  });
  function getAttrs() {
    const isSVG = state.type === "svg";
    const attrsProps = { ...attrs };
    Object.keys(attrs).forEach((key) => {
      if (isMotionValue(attrs[key])) attrsProps[key] = attrs[key].get();
    });
    const currentValues = state.visualElement?.latestValues || state.latestValues;
    let styleProps = {
      ...props.style,
      ...isSVG ? {} : currentValues
    };
    for (const key in styleProps) if (isMotionValue(styleProps[key])) styleProps[key] = styleProps[key].get();
    if (isSVG) {
      const { attrs: svgAttrs, style: svgStyle } = createSVGStyles({
        ...currentValues,
        ...styleProps
      }, state.options.as, props.style);
      Object.assign(attrsProps, svgAttrs);
      styleProps = svgStyle;
    }
    if (props.drag && props.dragListener !== false) Object.assign(styleProps, {
      userSelect: "none",
      WebkitUserSelect: "none",
      WebkitTouchCallout: "none",
      touchAction: props.drag === true ? "none" : `pan-${props.drag === "x" ? "y" : "x"}`
    });
    const style = createStyles(styleProps);
    if (style) attrsProps.style = style;
    return attrsProps;
  }
  getCurrentInstance().proxy;
  return {
    getProps,
    getAttrs,
    layoutGroup,
    state
  };
}
const MotionComponentProps = {
  "ignoreStrict": { type: Boolean },
  "forwardMotionProps": {
    type: Boolean,
    default: false
  },
  "asChild": {
    type: Boolean,
    default: false
  },
  "whileDrag": { type: [
    String,
    Array,
    Object
  ] },
  "whileHover": { type: [
    String,
    Array,
    Object
  ] },
  "whilePress": { type: [
    String,
    Array,
    Object
  ] },
  "whileInView": { type: [
    String,
    Array,
    Object
  ] },
  "whileFocus": { type: [
    String,
    Array,
    Object
  ] },
  "custom": { type: [
    String,
    Number,
    Object,
    Array
  ] },
  "initial": {
    type: [
      String,
      Array,
      Object,
      Boolean
    ],
    default: void 0
  },
  "animate": {
    type: [
      String,
      Array,
      Object
    ],
    default: void 0
  },
  "exit": { type: [
    String,
    Array,
    Object
  ] },
  "variants": { type: Object },
  "inherit": { type: Boolean },
  "style": { type: Object },
  "transformTemplate": { type: Function },
  "transition": { type: Object },
  "onAnimationComplete": { type: Function },
  "onUpdate": { type: Function },
  "layout": {
    type: [Boolean, String],
    default: false
  },
  "layoutId": {
    type: String,
    default: void 0
  },
  "layoutScroll": {
    type: Boolean,
    default: false
  },
  "layoutRoot": {
    type: Boolean,
    default: false
  },
  "data-framer-portal-id": { type: String },
  "crossfade": {
    type: Boolean,
    default: true
  },
  "layoutDependency": {
    type: null,
    default: void 0
  },
  "onBeforeLayoutMeasure": { type: Function },
  "onLayoutMeasure": { type: Function },
  "onLayoutAnimationStart": { type: Function },
  "onLayoutAnimationComplete": { type: Function },
  "globalPressTarget": { type: Boolean },
  "onPressStart": { type: Function },
  "onPress": { type: Function },
  "onPressCancel": { type: Function },
  "onHoverStart": { type: Function },
  "onHoverEnd": { type: Function },
  "inViewOptions": { type: Object },
  "onViewportEnter": { type: Function },
  "onViewportLeave": { type: Function },
  "drag": { type: [Boolean, String] },
  "dragSnapToOrigin": { type: Boolean },
  "dragDirectionLock": { type: Boolean },
  "dragPropagation": { type: Boolean },
  "dragConstraints": { type: [Boolean, Object] },
  "dragElastic": {
    type: [
      Boolean,
      Number,
      Object
    ],
    default: 0.5
  },
  "dragMomentum": {
    type: Boolean,
    default: true
  },
  "dragTransition": { type: Object },
  "dragListener": {
    type: Boolean,
    default: true
  },
  "dragControls": { type: Object },
  "onDragStart": { type: Function },
  "onDragEnd": { type: Function },
  "onDrag": { type: Function },
  "onDirectionLock": { type: Function },
  "onDragTransitionEnd": { type: Function },
  "onMeasureDragConstraints": { type: Function },
  "onPanSessionStart": { type: Function },
  "onPanStart": { type: Function },
  "onPan": { type: Function },
  "onPanEnd": { type: Function }
};
var componentMaxCache = /* @__PURE__ */ new Map();
var componentMiniCache = /* @__PURE__ */ new Map();
function renderSlotFragments(fragments) {
  if (!Array.isArray(fragments)) return [fragments];
  const result = [];
  for (const item of fragments) if (Array.isArray(item)) result.push(...item);
  else result.push(item);
  return result;
}
var SELF_CLOSING_TAGS = [
  "area",
  "img",
  "input"
];
function handlePrimitiveAndSlot(asTag, allAttrs, slots) {
  if (typeof asTag === "string" && SELF_CLOSING_TAGS.includes(asTag)) return h(asTag, allAttrs);
  if (asTag === "template") {
    if (!slots.default) return null;
    const childrens = renderSlotFragments(slots.default());
    const firstNonCommentChildrenIndex = childrens.findIndex((child) => child.type !== Comment);
    if (firstNonCommentChildrenIndex === -1) return childrens;
    const firstNonCommentChildren = childrens[firstNonCommentChildrenIndex];
    delete firstNonCommentChildren.props?.ref;
    const mergedProps = firstNonCommentChildren.props ? mergeProps(allAttrs, firstNonCommentChildren.props) : allAttrs;
    if (allAttrs.class && firstNonCommentChildren.props?.class) delete firstNonCommentChildren.props.class;
    const cloned = cloneVNode(firstNonCommentChildren, mergedProps);
    for (const prop in mergedProps) if (prop.startsWith("on")) {
      cloned.props ||= {};
      cloned.props[prop] = mergedProps[prop];
    }
    if (childrens.length === 1) return cloned;
    childrens[firstNonCommentChildrenIndex] = cloned;
    return childrens;
  }
  return null;
}
function createMotionComponent(component, options = {}) {
  const isString = typeof component === "string";
  const name = isString ? component : component.name || "";
  const componentCache = options.renderer ? componentMaxCache : componentMiniCache;
  if (isString && componentCache?.has(component)) return componentCache.get(component);
  const motionComponent = defineComponent({
    inheritAttrs: false,
    props: {
      ...MotionComponentProps,
      as: {
        type: [String, Object],
        default: component || "div"
      }
    },
    name: name ? `motion.${name}` : "Motion",
    setup(props, { slots }) {
      const { getProps, getAttrs, state } = useMotionState(props, options.renderer);
      function onVnodeUpdated() {
        const el = state.element;
        if ((!(typeof props.as === "object") || props.asChild) && el) {
          const { style } = getAttrs();
          if (style) for (const [key, val] of Object.entries(style)) el.style[key] = val;
        }
      }
      return () => {
        const motionProps = getProps();
        const motionAttrs = getAttrs();
        const asTag = props.asChild ? "template" : props.as;
        const allAttrs = {
          ...props.forwardMotionProps ? motionProps : {},
          ...motionAttrs,
          onVnodeUpdated
        };
        const primitiveOrSlotResult = handlePrimitiveAndSlot(asTag, allAttrs, slots);
        if (primitiveOrSlotResult !== null) return primitiveOrSlotResult;
        return h(asTag, { ...allAttrs }, slots);
      };
    }
  });
  if (isString) componentCache?.set(component, motionComponent);
  return motionComponent;
}
function createMotionComponentWithFeatures(featureBundle) {
  const renderer = featureBundle?.renderer;
  updateLazyFeatures(featureBundle?.features || []);
  return new Proxy({}, { get(_, prop) {
    if (prop === "create") return (component, options) => createMotionComponent(component, {
      ...options,
      renderer
    });
    return createMotionComponent(prop, { renderer });
  } });
}
const motion = createMotionComponentWithFeatures(domMax);
motion.create("div");
var popId = 0;
function usePopLayout(props) {
  const styles = /* @__PURE__ */ new WeakMap();
  const config = useMotionConfig();
  function addPopStyle(element) {
    if (props.mode !== "popLayout") return;
    const parent = element.offsetParent;
    const parentWidth = parent instanceof HTMLElement ? parent.offsetWidth || 0 : 0;
    const size = {
      height: element.offsetHeight || 0,
      width: element.offsetWidth || 0,
      top: element.offsetTop,
      left: element.offsetLeft,
      right: 0
    };
    size.right = parentWidth - size.width - size.left;
    const x = props.anchorX === "left" ? `left: ${size.left}px` : `right: ${size.right}px`;
    const elementPopId = `pop-${popId++}`;
    element.dataset.motionPopId = elementPopId;
    const style = (void 0).createElement("style");
    if (config.value.nonce) style.nonce = config.value.nonce;
    styles.set(element, style);
    (void 0).head.appendChild(style);
    if (style.sheet) style.sheet.insertRule(`
    [data-motion-pop-id="${elementPopId}"] {
      position: absolute !important;
      width: ${size.width}px !important;
      height: ${size.height}px !important;
      top: ${size.top}px !important;
      ${x} !important;
      }
      `);
  }
  function removePopStyle(element) {
    const style = styles.get(element);
    if (!style) return;
    styles.delete(element);
    frame.render(() => {
      (void 0).head.removeChild(style);
    });
  }
  return {
    addPopStyle,
    removePopStyle
  };
}
var apId = 0;
function usePresenceContainer(props) {
  const presenceId = String(apId++);
  const exitSessions = /* @__PURE__ */ new Map();
  const { addPopStyle, removePopStyle } = usePopLayout(props);
  function findMotionStates(container) {
    const states = [];
    const selfState = mountedStates.get(container);
    if (selfState && container.getAttribute(motionGlobalConfig.motionAttribute) === presenceId) states.push(selfState);
    const elements = Array.from(container.querySelectorAll(`[${motionGlobalConfig.motionAttribute}="${presenceId}"]`));
    for (const el of elements) {
      const s = mountedStates.get(el);
      if (s) states.push(s);
    }
    return states;
  }
  function onMotionExitComplete(container, state) {
    const session = exitSessions.get(container);
    if (!session) return;
    session.remaining.delete(state);
    if (session.remaining.size === 0) finalizeExit(session);
  }
  const presenceContext = {
    initial: props.initial,
    custom: props.custom,
    presenceId,
    onMotionExitComplete
  };
  provideAnimatePresence(presenceContext);
  function finalizeExit(session) {
    removePopStyle(session.el);
    session.states.forEach((state) => {
      state.getSnapshot(state.options, false);
    });
    session.done();
    exitSessions.delete(session.el);
    if (!session.el?.isConnected) session.states.forEach((state) => {
      state.unmount();
    });
    else session.states[0]?.didUpdate();
    props.onExitComplete?.();
  }
  function enter(el, done) {
    findMotionStates(el).forEach((state) => {
      state.setActive("exit", false);
      state.getSnapshot(state.options, true);
    });
    done();
  }
  function exit(el, done) {
    presenceContext.custom = props.custom;
    const container = el;
    const states = findMotionStates(container);
    if (states.length === 0) {
      done();
      props.onExitComplete?.();
      return;
    }
    const session = {
      remaining: new Set(states),
      states,
      done,
      el: container
    };
    exitSessions.set(container, session);
    addPopStyle(container);
    states.forEach((state) => {
      state.presenceContainer = container;
      state.setActive("exit", true);
      state.getSnapshot(state.options, false);
    });
    states[0]?.didUpdate();
  }
  return {
    enter,
    exit
  };
}
var AnimatePresence_vue_vue_type_script_setup_true_lang_default = /* @__PURE__ */ defineComponent({
  name: "AnimatePresence",
  inheritAttrs: true,
  __name: "AnimatePresence",
  props: {
    mode: { default: "sync" },
    initial: {
      type: Boolean,
      default: true
    },
    as: {},
    custom: {},
    onExitComplete: {},
    anchorX: { default: "left" }
  },
  setup(__props) {
    const props = __props;
    const { enter, exit } = usePresenceContainer(props);
    const transitionProps = computed(() => {
      if (props.mode !== "wait") return { tag: props.as };
      return { mode: props.mode === "wait" ? "out-in" : void 0 };
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(resolveDynamicComponent(_ctx.mode === "wait" ? Transition : TransitionGroup), mergeProps(transitionProps.value, {
        appear: "",
        css: false,
        onLeave: unref(exit),
        onEnter: unref(enter)
      }), {
        default: withCtx(() => [renderSlot(_ctx.$slots, "default")]),
        _: 3
      }, 16, ["onLeave", "onEnter"]);
    };
  }
});
var AnimatePresence_default = AnimatePresence_vue_vue_type_script_setup_true_lang_default;
function useCombineMotionValues(combineValues) {
  const value = motionValue(combineValues());
  const updateValue = () => value.set(combineValues());
  const scheduleUpdate = () => frame$1.preRender(updateValue, false, true);
  let subscriptions;
  const subscribe = (values) => {
    subscriptions = values.map((v) => v.on("change", scheduleUpdate));
  };
  const unsubscribe = () => {
    subscriptions.forEach((unsubscribe$1) => unsubscribe$1());
    cancelFrame(updateValue);
  };
  if (getCurrentInstance()) ;
  return {
    subscribe,
    unsubscribe,
    value,
    updateValue
  };
}
function useComputed(computed$1) {
  collectMotionValues.current = [];
  const { value, subscribe, unsubscribe, updateValue } = useCombineMotionValues(computed$1);
  subscribe(collectMotionValues.current);
  collectMotionValues.current = void 0;
  watchEffect(() => {
    unsubscribe();
    collectMotionValues.current = [];
    updateValue();
    subscribe(collectMotionValues.current);
    collectMotionValues.current = void 0;
  });
  return value;
}
function useTransform(input, inputRangeOrTransformer, outputRange, options) {
  if (typeof input === "function") return useComputed(input);
  if (outputRange && !Array.isArray(outputRange) && typeof outputRange === "object") {
    const result$1 = {};
    for (const key in outputRange) if (Object.prototype.hasOwnProperty.call(outputRange, key)) {
      const keyOutputRange = outputRange[key];
      result$1[key] = useTransform(input, inputRangeOrTransformer, keyOutputRange, options);
    }
    return result$1;
  }
  let inputValues;
  let transformer;
  if (typeof inputRangeOrTransformer === "function") {
    transformer = inputRangeOrTransformer;
    inputValues = Array.isArray(input) ? input : [input];
  } else if (isRef(inputRangeOrTransformer)) {
    const bridgeMV = motionValue(0);
    let currentTransformer = transform(inputRangeOrTransformer.value, outputRange, options);
    watch(inputRangeOrTransformer, (newRange) => {
      currentTransformer = transform(newRange, outputRange, options);
      bridgeMV.set(bridgeMV.get() + 1);
    }, { flush: "sync" });
    transformer = (values) => {
      return Array.isArray(values) ? currentTransformer(values[0]) : currentTransformer(values);
    };
    inputValues = Array.isArray(input) ? [...input, bridgeMV] : [input, bridgeMV];
  } else {
    transformer = transform(inputRangeOrTransformer, outputRange, options);
    inputValues = Array.isArray(input) ? input : [input];
  }
  const result = Array.isArray(input) ? useListTransform(inputValues, transformer) : useListTransform(inputValues, (values) => {
    return transformer(values[0]);
  });
  if (!Array.isArray(input)) {
    const inputAccelerate = input.accelerate;
    if (inputAccelerate && !inputAccelerate.isTransformed && typeof inputRangeOrTransformer !== "function" && Array.isArray(outputRange) && options?.clamp !== false) {
      const resolvedInputRange = isRef(inputRangeOrTransformer) ? inputRangeOrTransformer.value : inputRangeOrTransformer;
      result.accelerate = {
        ...inputAccelerate,
        times: resolvedInputRange,
        keyframes: outputRange,
        isTransformed: true,
        ...{}
      };
    }
  }
  return result;
}
function useListTransform(values, transformer) {
  const latest = [];
  const combineValues = () => {
    latest.length = 0;
    const numValues = values.length;
    for (let i = 0; i < numValues; i++) latest[i] = values[i].get();
    return transformer(latest);
  };
  const { value, subscribe } = useCombineMotionValues(combineValues);
  subscribe(values);
  return value;
}
function createScrollMotionValues() {
  return {
    scrollX: motionValue(0),
    scrollY: motionValue(0),
    scrollXProgress: motionValue(0),
    scrollYProgress: motionValue(0)
  };
}
function useScroll(options = {}) {
  const values = createScrollMotionValues();
  const { target, offset } = toValue(options);
  watchEffect((onCleanup) => {
    return;
  }, { flush: "post" });
  return values;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "MyUangGwe — Kelola Keuangan dengan Tenang",
      meta: [
        {
          name: "description",
          content: "Catat pemasukan, kelola pengeluaran, dan wujudkan target finansialmu dalam satu aplikasi yang sederhana, gratis, dan bebas iklan."
        }
      ]
    });
    const { scrollYProgress } = useScroll();
    const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);
    const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
    const features = [
      {
        icon: "wallet",
        title: "Multi-Wallet",
        desc: "Kelola semua dompet, rekening bank, dan e-wallet dalam satu tempat."
      },
      {
        icon: "piggy-bank",
        title: "Anggaran Cerdas",
        desc: "Set batas pengeluaran per kategori dan pantau secara real-time."
      },
      {
        icon: "repeat",
        title: "Transaksi Rutin",
        desc: "Otomatisasi pencatatan tagihan dan langganan berulang."
      },
      {
        icon: "target",
        title: "Target Menabung",
        desc: "Tetapkan tujuan finansial dan lacak progres menabung kamu."
      },
      {
        icon: "building-2",
        title: "Mode Organisasi",
        desc: "Kelola keuangan tim atau bisnis kecilmu bersama-sama."
      },
      {
        icon: "globe",
        title: "Multi Mata Uang",
        desc: "Dukungan berbagai mata uang dengan konversi kurs real-time."
      }
    ];
    const faqs = [
      {
        q: "Apakah MyUangGwe gratis?",
        a: "Ya, sepenuhnya gratis. Tidak ada biaya tersembunyi atau langganan."
      },
      {
        q: "Apakah data saya aman?",
        a: "Data tersimpan aman dengan enkripsi. Kami tidak pernah menjual data kamu."
      },
      {
        q: "Bisakah saya pakai untuk bisnis?",
        a: "Bisa! Mode organisasi memungkinkan manajemen keuangan tim bersama."
      },
      {
        q: "Apakah tersedia di mobile?",
        a: "Saat ini berbasis web responsif. Aplikasi mobile sedang dalam pengembangan."
      }
    ];
    const openFaq = ref(null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UiBadge = _sfc_main$1;
      const _component_Icon = __nuxt_component_1;
      const _component_UiButton = _sfc_main$X;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_UiCard = _sfc_main$6;
      const _component_UiCardHeader = _sfc_main$1$1;
      const _component_UiCardTitle = _sfc_main$2;
      const _component_UiCardContent = _sfc_main$4;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "min-h-screen bg-background font-sans overflow-x-hidden" }, _attrs))}><section class="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden"><div class="absolute inset-0 pointer-events-none overflow-hidden"><div class="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/5 blur-3xl"></div><div class="absolute top-1/3 right-1/4 w-80 h-80 rounded-full bg-chart-2/10 blur-3xl"></div><div class="absolute bottom-1/4 left-1/2 w-72 h-72 rounded-full bg-chart-1/5 blur-3xl"></div></div><div class="absolute inset-0 pointer-events-none opacity-[0.015] dark:opacity-[0.03]" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle, currentColor 1px, transparent 1px)", "background-size": "32px 32px" })}"></div>`);
      _push(ssrRenderComponent(unref(motion).div, {
        style: { scale: unref(heroScale), opacity: unref(heroOpacity) },
        class: "relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(motion).div, {
              initial: { opacity: 0, scale: 0.8 },
              animate: { opacity: 1, scale: 1 },
              transition: { duration: 0.5, delay: 0.1 }
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiBadge, {
                    class: "mb-6 px-4 py-1.5 text-xs font-medium rounded-full",
                    variant: "secondary"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "lucide:sparkles",
                          class: "mr-1.5 h-3.5 w-3.5"
                        }, null, _parent4, _scopeId3));
                        _push4(` Selamat datang di era keuangan teratur `);
                      } else {
                        return [
                          createVNode(_component_Icon, {
                            name: "lucide:sparkles",
                            class: "mr-1.5 h-3.5 w-3.5"
                          }),
                          createTextVNode(" Selamat datang di era keuangan teratur ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiBadge, {
                      class: "mb-6 px-4 py-1.5 text-xs font-medium rounded-full",
                      variant: "secondary"
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_Icon, {
                          name: "lucide:sparkles",
                          class: "mr-1.5 h-3.5 w-3.5"
                        }),
                        createTextVNode(" Selamat datang di era keuangan teratur ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).h1, {
              initial: { opacity: 0, y: 32 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
              class: "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Uangmu,<br${_scopeId2}><span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2"${_scopeId2}> Hidupmu </span>`);
                } else {
                  return [
                    createTextVNode(" Uangmu,"),
                    createVNode("br"),
                    createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2" }, " Hidupmu ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).p, {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
              class: "text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Catat pemasukan, kelola pengeluaran, dan wujudkan target finansialmu — semua dalam satu aplikasi yang sederhana dan bebas iklan. `);
                } else {
                  return [
                    createTextVNode(" Catat pemasukan, kelola pengeluaran, dan wujudkan target finansialmu — semua dalam satu aplikasi yang sederhana dan bebas iklan. ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              initial: { opacity: 0, y: 20 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.5, delay: 0.5 },
              class: "flex flex-col sm:flex-row items-center gap-4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiButton, {
                    size: "lg",
                    "as-child": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLink, { to: "/auth" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Mulai Gratis Sekarang `);
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: "lucide:arrow-right",
                                class: "ml-2 h-4 w-4"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Mulai Gratis Sekarang "),
                                createVNode(_component_Icon, {
                                  name: "lucide:arrow-right",
                                  class: "ml-2 h-4 w-4"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtLink, { to: "/auth" }, {
                            default: withCtx(() => [
                              createTextVNode(" Mulai Gratis Sekarang "),
                              createVNode(_component_Icon, {
                                name: "lucide:arrow-right",
                                class: "ml-2 h-4 w-4"
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiButton, {
                    size: "lg",
                    variant: "outline",
                    "as-child": ""
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_NuxtLink, { to: "/dashboard" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Lihat Demo `);
                              _push5(ssrRenderComponent(_component_Icon, {
                                name: "lucide:external-link",
                                class: "ml-2 h-4 w-4"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createTextVNode(" Lihat Demo "),
                                createVNode(_component_Icon, {
                                  name: "lucide:external-link",
                                  class: "ml-2 h-4 w-4"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_NuxtLink, { to: "/dashboard" }, {
                            default: withCtx(() => [
                              createTextVNode(" Lihat Demo "),
                              createVNode(_component_Icon, {
                                name: "lucide:external-link",
                                class: "ml-2 h-4 w-4"
                              })
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
                      size: "lg",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, { to: "/auth" }, {
                          default: withCtx(() => [
                            createTextVNode(" Mulai Gratis Sekarang "),
                            createVNode(_component_Icon, {
                              name: "lucide:arrow-right",
                              class: "ml-2 h-4 w-4"
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiButton, {
                      size: "lg",
                      variant: "outline",
                      "as-child": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(_component_NuxtLink, { to: "/dashboard" }, {
                          default: withCtx(() => [
                            createTextVNode(" Lihat Demo "),
                            createVNode(_component_Icon, {
                              name: "lucide:external-link",
                              class: "ml-2 h-4 w-4"
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(unref(motion).div, {
              initial: { opacity: 0, y: 24 },
              animate: { opacity: 1, y: 0 },
              transition: { duration: 0.6, delay: 0.65 },
              class: "mt-16 grid grid-cols-4 gap-8 md:gap-16"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList([{ value: "100%", label: "Gratis" }, { value: "6+", label: "Fitur Utama" }, { value: "∞", label: "Transaksi" }, { value: "🔒", label: "Aman & Privat" }], (stat) => {
                    _push3(`<div class="flex flex-col items-center gap-1"${_scopeId2}><span class="text-2xl md:text-3xl font-bold text-foreground"${_scopeId2}>${ssrInterpolate(stat.value)}</span><span class="text-xs text-muted-foreground whitespace-nowrap"${_scopeId2}>${ssrInterpolate(stat.label)}</span></div>`);
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(), createBlock(Fragment, null, renderList([{ value: "100%", label: "Gratis" }, { value: "6+", label: "Fitur Utama" }, { value: "∞", label: "Transaksi" }, { value: "🔒", label: "Aman & Privat" }], (stat) => {
                      return createVNode("div", {
                        key: stat.label,
                        class: "flex flex-col items-center gap-1"
                      }, [
                        createVNode("span", { class: "text-2xl md:text-3xl font-bold text-foreground" }, toDisplayString(stat.value), 1),
                        createVNode("span", { class: "text-xs text-muted-foreground whitespace-nowrap" }, toDisplayString(stat.label), 1)
                      ]);
                    }), 64))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(motion).div, {
                initial: { opacity: 0, scale: 0.8 },
                animate: { opacity: 1, scale: 1 },
                transition: { duration: 0.5, delay: 0.1 }
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiBadge, {
                    class: "mb-6 px-4 py-1.5 text-xs font-medium rounded-full",
                    variant: "secondary"
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_Icon, {
                        name: "lucide:sparkles",
                        class: "mr-1.5 h-3.5 w-3.5"
                      }),
                      createTextVNode(" Selamat datang di era keuangan teratur ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(motion).h1, {
                initial: { opacity: 0, y: 32 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] },
                class: "text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-foreground leading-[1.05] mb-6"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Uangmu,"),
                  createVNode("br"),
                  createVNode("span", { class: "text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-2" }, " Hidupmu ")
                ]),
                _: 1
              }),
              createVNode(unref(motion).p, {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.35, ease: [0.22, 1, 0.36, 1] },
                class: "text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed mb-10"
              }, {
                default: withCtx(() => [
                  createTextVNode(" Catat pemasukan, kelola pengeluaran, dan wujudkan target finansialmu — semua dalam satu aplikasi yang sederhana dan bebas iklan. ")
                ]),
                _: 1
              }),
              createVNode(unref(motion).div, {
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.5, delay: 0.5 },
                class: "flex flex-col sm:flex-row items-center gap-4"
              }, {
                default: withCtx(() => [
                  createVNode(_component_UiButton, {
                    size: "lg",
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, { to: "/auth" }, {
                        default: withCtx(() => [
                          createTextVNode(" Mulai Gratis Sekarang "),
                          createVNode(_component_Icon, {
                            name: "lucide:arrow-right",
                            class: "ml-2 h-4 w-4"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(_component_UiButton, {
                    size: "lg",
                    variant: "outline",
                    "as-child": ""
                  }, {
                    default: withCtx(() => [
                      createVNode(_component_NuxtLink, { to: "/dashboard" }, {
                        default: withCtx(() => [
                          createTextVNode(" Lihat Demo "),
                          createVNode(_component_Icon, {
                            name: "lucide:external-link",
                            class: "ml-2 h-4 w-4"
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(unref(motion).div, {
                initial: { opacity: 0, y: 24 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.6, delay: 0.65 },
                class: "mt-16 grid grid-cols-4 gap-8 md:gap-16"
              }, {
                default: withCtx(() => [
                  (openBlock(), createBlock(Fragment, null, renderList([{ value: "100%", label: "Gratis" }, { value: "6+", label: "Fitur Utama" }, { value: "∞", label: "Transaksi" }, { value: "🔒", label: "Aman & Privat" }], (stat) => {
                    return createVNode("div", {
                      key: stat.label,
                      class: "flex flex-col items-center gap-1"
                    }, [
                      createVNode("span", { class: "text-2xl md:text-3xl font-bold text-foreground" }, toDisplayString(stat.value), 1),
                      createVNode("span", { class: "text-xs text-muted-foreground whitespace-nowrap" }, toDisplayString(stat.label), 1)
                    ]);
                  }), 64))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(motion).div, {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        transition: { duration: 1, delay: 1.2 },
        class: "absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<span class="text-xs tracking-widest uppercase"${_scopeId}>scroll</span>`);
            _push2(ssrRenderComponent(unref(motion).div, {
              animate: { y: [0, 6, 0] },
              transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
              class: "w-px h-6 bg-gradient-to-b from-muted-foreground to-transparent"
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode("span", { class: "text-xs tracking-widest uppercase" }, "scroll"),
              createVNode(unref(motion).div, {
                animate: { y: [0, 6, 0] },
                transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" },
                class: "w-px h-6 bg-gradient-to-b from-muted-foreground to-transparent"
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section class="px-6 md:px-12 py-24 max-w-6xl mx-auto">`);
      _push(ssrRenderComponent(unref(motion).div, {
        initial: { opacity: 0, y: 48 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
        viewport: { once: true, margin: "-100px" },
        class: "relative rounded-xl overflow-hidden border border-border shadow-2xl bg-card"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border"${_scopeId}><div class="h-3 w-3 rounded-full bg-destructive/70"${_scopeId}></div><div class="h-3 w-3 rounded-full bg-chart-3/70"${_scopeId}></div><div class="h-3 w-3 rounded-full bg-chart-2/70"${_scopeId}></div><div class="mx-auto flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-full px-4 py-1"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_Icon, {
              name: "lucide:lock",
              class: "h-3 w-3"
            }, null, _parent2, _scopeId));
            _push2(`<span${_scopeId}>myuanggwe.app/dashboard</span></div></div><div class="p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4"${_scopeId}>`);
            _push2(ssrRenderComponent(_component_UiCard, { class: "md:col-span-1 bg-gradient-to-br from-primary to-chart-2 text-primary-foreground border-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardHeader, { class: "pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium text-primary-foreground/80" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Total Saldo`);
                            } else {
                              return [
                                createTextVNode("Total Saldo")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-primary-foreground/80" }, {
                            default: withCtx(() => [
                              createTextVNode("Total Saldo")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardContent, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="text-3xl font-bold mb-4"${_scopeId3}>Rp 12.450.000</p><div class="flex gap-4 text-xs"${_scopeId3}><div${_scopeId3}><p class="text-primary-foreground/70"${_scopeId3}>Pemasukan</p><p class="font-semibold"${_scopeId3}>+Rp 8.000.000</p></div><div${_scopeId3}><p class="text-primary-foreground/70"${_scopeId3}>Pengeluaran</p><p class="font-semibold"${_scopeId3}>-Rp 3.200.000</p></div></div>`);
                      } else {
                        return [
                          createVNode("p", { class: "text-3xl font-bold mb-4" }, "Rp 12.450.000"),
                          createVNode("div", { class: "flex gap-4 text-xs" }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-primary-foreground/70" }, "Pemasukan"),
                              createVNode("p", { class: "font-semibold" }, "+Rp 8.000.000")
                            ]),
                            createVNode("div", null, [
                              createVNode("p", { class: "text-primary-foreground/70" }, "Pengeluaran"),
                              createVNode("p", { class: "font-semibold" }, "-Rp 3.200.000")
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-primary-foreground/80" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Saldo")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, null, {
                      default: withCtx(() => [
                        createVNode("p", { class: "text-3xl font-bold mb-4" }, "Rp 12.450.000"),
                        createVNode("div", { class: "flex gap-4 text-xs" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-primary-foreground/70" }, "Pemasukan"),
                            createVNode("p", { class: "font-semibold" }, "+Rp 8.000.000")
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-primary-foreground/70" }, "Pengeluaran"),
                            createVNode("p", { class: "font-semibold" }, "-Rp 3.200.000")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCard, { class: "md:col-span-2" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Transaksi Terbaru`);
                            } else {
                              return [
                                createTextVNode("Transaksi Terbaru")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Transaksi Terbaru")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardContent, { class: "space-y-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList([{ icon: "🍜", name: "Makan Siang", cat: "Makanan", amount: "-Rp 35.000", income: false }, { icon: "💼", name: "Gaji Bulanan", cat: "Pendapatan", amount: "+Rp 8.000.000", income: true }, { icon: "⚡", name: "Bayar Listrik", cat: "Tagihan", amount: "-Rp 250.000", income: false }], (tx) => {
                          _push4(`<div class="flex items-center justify-between py-2 border-b last:border-0 border-border"${_scopeId3}><div class="flex items-center gap-3"${_scopeId3}><span class="text-xl"${_scopeId3}>${ssrInterpolate(tx.icon)}</span><div${_scopeId3}><p class="text-sm font-medium text-foreground"${_scopeId3}>${ssrInterpolate(tx.name)}</p><p class="text-xs text-muted-foreground"${_scopeId3}>${ssrInterpolate(tx.cat)}</p></div></div><span class="${ssrRenderClass([tx.income ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400", "text-sm font-semibold"])}"${_scopeId3}>${ssrInterpolate(tx.amount)}</span></div>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList([{ icon: "🍜", name: "Makan Siang", cat: "Makanan", amount: "-Rp 35.000", income: false }, { icon: "💼", name: "Gaji Bulanan", cat: "Pendapatan", amount: "+Rp 8.000.000", income: true }, { icon: "⚡", name: "Bayar Listrik", cat: "Tagihan", amount: "-Rp 250.000", income: false }], (tx) => {
                            return createVNode("div", {
                              key: tx.name,
                              class: "flex items-center justify-between py-2 border-b last:border-0 border-border"
                            }, [
                              createVNode("div", { class: "flex items-center gap-3" }, [
                                createVNode("span", { class: "text-xl" }, toDisplayString(tx.icon), 1),
                                createVNode("div", null, [
                                  createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(tx.name), 1),
                                  createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(tx.cat), 1)
                                ])
                              ]),
                              createVNode("span", {
                                class: ["text-sm font-semibold", tx.income ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"]
                              }, toDisplayString(tx.amount), 3)
                            ]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Transaksi Terbaru")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList([{ icon: "🍜", name: "Makan Siang", cat: "Makanan", amount: "-Rp 35.000", income: false }, { icon: "💼", name: "Gaji Bulanan", cat: "Pendapatan", amount: "+Rp 8.000.000", income: true }, { icon: "⚡", name: "Bayar Listrik", cat: "Tagihan", amount: "-Rp 250.000", income: false }], (tx) => {
                          return createVNode("div", {
                            key: tx.name,
                            class: "flex items-center justify-between py-2 border-b last:border-0 border-border"
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("span", { class: "text-xl" }, toDisplayString(tx.icon), 1),
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(tx.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(tx.cat), 1)
                              ])
                            ]),
                            createVNode("span", {
                              class: ["text-sm font-semibold", tx.income ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"]
                            }, toDisplayString(tx.amount), 3)
                          ]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_UiCard, { class: "md:col-span-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_UiCardHeader, { class: "pb-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Anggaran Bulan Ini`);
                            } else {
                              return [
                                createTextVNode("Anggaran Bulan Ini")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                            default: withCtx(() => [
                              createTextVNode("Anggaran Bulan Ini")
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(_component_UiCardContent, { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<!--[-->`);
                        ssrRenderList([{ name: "Makanan", used: 65 }, { name: "Transportasi", used: 40 }, { name: "Hiburan", used: 85 }], (budget) => {
                          _push4(`<div class="space-y-2"${_scopeId3}><div class="flex justify-between text-xs"${_scopeId3}><span class="text-muted-foreground"${_scopeId3}>${ssrInterpolate(budget.name)}</span><span class="text-muted-foreground"${_scopeId3}>${ssrInterpolate(budget.used)}%</span></div><div class="h-2 rounded-full bg-muted overflow-hidden"${_scopeId3}><div class="h-full rounded-full bg-primary transition-all" style="${ssrRenderStyle({ width: budget.used + "%" })}"${_scopeId3}></div></div></div>`);
                        });
                        _push4(`<!--]-->`);
                      } else {
                        return [
                          (openBlock(), createBlock(Fragment, null, renderList([{ name: "Makanan", used: 65 }, { name: "Transportasi", used: 40 }, { name: "Hiburan", used: 85 }], (budget) => {
                            return createVNode("div", {
                              key: budget.name,
                              class: "space-y-2"
                            }, [
                              createVNode("div", { class: "flex justify-between text-xs" }, [
                                createVNode("span", { class: "text-muted-foreground" }, toDisplayString(budget.name), 1),
                                createVNode("span", { class: "text-muted-foreground" }, toDisplayString(budget.used) + "%", 1)
                              ]),
                              createVNode("div", { class: "h-2 rounded-full bg-muted overflow-hidden" }, [
                                createVNode("div", {
                                  class: "h-full rounded-full bg-primary transition-all",
                                  style: { width: budget.used + "%" }
                                }, null, 4)
                              ])
                            ]);
                          }), 64))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Anggaran Bulan Ini")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList([{ name: "Makanan", used: 65 }, { name: "Transportasi", used: 40 }, { name: "Hiburan", used: 85 }], (budget) => {
                          return createVNode("div", {
                            key: budget.name,
                            class: "space-y-2"
                          }, [
                            createVNode("div", { class: "flex justify-between text-xs" }, [
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(budget.name), 1),
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(budget.used) + "%", 1)
                            ]),
                            createVNode("div", { class: "h-2 rounded-full bg-muted overflow-hidden" }, [
                              createVNode("div", {
                                class: "h-full rounded-full bg-primary transition-all",
                                style: { width: budget.used + "%" }
                              }, null, 4)
                            ])
                          ]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border" }, [
                createVNode("div", { class: "h-3 w-3 rounded-full bg-destructive/70" }),
                createVNode("div", { class: "h-3 w-3 rounded-full bg-chart-3/70" }),
                createVNode("div", { class: "h-3 w-3 rounded-full bg-chart-2/70" }),
                createVNode("div", { class: "mx-auto flex items-center gap-2 text-xs text-muted-foreground bg-muted rounded-full px-4 py-1" }, [
                  createVNode(_component_Icon, {
                    name: "lucide:lock",
                    class: "h-3 w-3"
                  }),
                  createVNode("span", null, "myuanggwe.app/dashboard")
                ])
              ]),
              createVNode("div", { class: "p-6 md:p-8 grid grid-cols-1 md:grid-cols-3 gap-4" }, [
                createVNode(_component_UiCard, { class: "md:col-span-1 bg-gradient-to-br from-primary to-chart-2 text-primary-foreground border-0" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardHeader, { class: "pb-2" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium text-primary-foreground/80" }, {
                          default: withCtx(() => [
                            createTextVNode("Total Saldo")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, null, {
                      default: withCtx(() => [
                        createVNode("p", { class: "text-3xl font-bold mb-4" }, "Rp 12.450.000"),
                        createVNode("div", { class: "flex gap-4 text-xs" }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-primary-foreground/70" }, "Pemasukan"),
                            createVNode("p", { class: "font-semibold" }, "+Rp 8.000.000")
                          ]),
                          createVNode("div", null, [
                            createVNode("p", { class: "text-primary-foreground/70" }, "Pengeluaran"),
                            createVNode("p", { class: "font-semibold" }, "-Rp 3.200.000")
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCard, { class: "md:col-span-2" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Transaksi Terbaru")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, { class: "space-y-3" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList([{ icon: "🍜", name: "Makan Siang", cat: "Makanan", amount: "-Rp 35.000", income: false }, { icon: "💼", name: "Gaji Bulanan", cat: "Pendapatan", amount: "+Rp 8.000.000", income: true }, { icon: "⚡", name: "Bayar Listrik", cat: "Tagihan", amount: "-Rp 250.000", income: false }], (tx) => {
                          return createVNode("div", {
                            key: tx.name,
                            class: "flex items-center justify-between py-2 border-b last:border-0 border-border"
                          }, [
                            createVNode("div", { class: "flex items-center gap-3" }, [
                              createVNode("span", { class: "text-xl" }, toDisplayString(tx.icon), 1),
                              createVNode("div", null, [
                                createVNode("p", { class: "text-sm font-medium text-foreground" }, toDisplayString(tx.name), 1),
                                createVNode("p", { class: "text-xs text-muted-foreground" }, toDisplayString(tx.cat), 1)
                              ])
                            ]),
                            createVNode("span", {
                              class: ["text-sm font-semibold", tx.income ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"]
                            }, toDisplayString(tx.amount), 3)
                          ]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(_component_UiCard, { class: "md:col-span-3" }, {
                  default: withCtx(() => [
                    createVNode(_component_UiCardHeader, { class: "pb-3" }, {
                      default: withCtx(() => [
                        createVNode(_component_UiCardTitle, { class: "text-sm font-medium" }, {
                          default: withCtx(() => [
                            createTextVNode("Anggaran Bulan Ini")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(_component_UiCardContent, { class: "grid grid-cols-1 md:grid-cols-3 gap-4" }, {
                      default: withCtx(() => [
                        (openBlock(), createBlock(Fragment, null, renderList([{ name: "Makanan", used: 65 }, { name: "Transportasi", used: 40 }, { name: "Hiburan", used: 85 }], (budget) => {
                          return createVNode("div", {
                            key: budget.name,
                            class: "space-y-2"
                          }, [
                            createVNode("div", { class: "flex justify-between text-xs" }, [
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(budget.name), 1),
                              createVNode("span", { class: "text-muted-foreground" }, toDisplayString(budget.used) + "%", 1)
                            ]),
                            createVNode("div", { class: "h-2 rounded-full bg-muted overflow-hidden" }, [
                              createVNode("div", {
                                class: "h-full rounded-full bg-primary transition-all",
                                style: { width: budget.used + "%" }
                              }, null, 4)
                            ])
                          ]);
                        }), 64))
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="fitur" class="px-6 md:px-12 py-24 max-w-6xl mx-auto">`);
      _push(ssrRenderComponent(unref(motion).div, {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true },
        class: "text-center mb-16"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiBadge, {
              class: "mb-4 px-4 py-1.5 text-xs rounded-full",
              variant: "outline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Fitur Lengkap`);
                } else {
                  return [
                    createTextVNode("Fitur Lengkap")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h2 class="text-4xl md:text-5xl font-bold text-foreground leading-tight"${_scopeId}> Semua yang kamu butuhkan,<br${_scopeId}><span class="text-muted-foreground"${_scopeId}>tidak lebih, tidak kurang.</span></h2>`);
          } else {
            return [
              createVNode(_component_UiBadge, {
                class: "mb-4 px-4 py-1.5 text-xs rounded-full",
                variant: "outline"
              }, {
                default: withCtx(() => [
                  createTextVNode("Fitur Lengkap")
                ]),
                _: 1
              }),
              createVNode("h2", { class: "text-4xl md:text-5xl font-bold text-foreground leading-tight" }, [
                createTextVNode(" Semua yang kamu butuhkan,"),
                createVNode("br"),
                createVNode("span", { class: "text-muted-foreground" }, "tidak lebih, tidak kurang.")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"><!--[-->`);
      ssrRenderList(features, (feature) => {
        _push(ssrRenderComponent(unref(motion).div, {
          key: feature.title,
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.5 },
          viewport: { once: true },
          whileHover: { y: -4, transition: { duration: 0.2 } },
          class: "group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg cursor-default"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<div class="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary"${_scopeId}>`);
              _push2(ssrRenderComponent(_component_Icon, {
                name: `lucide:${feature.icon}`,
                class: "h-5 w-5"
              }, null, _parent2, _scopeId));
              _push2(`</div><h3 class="text-base font-semibold text-foreground mb-2"${_scopeId}>${ssrInterpolate(feature.title)}</h3><p class="text-sm text-muted-foreground leading-relaxed"${_scopeId}>${ssrInterpolate(feature.desc)}</p>`);
            } else {
              return [
                createVNode("div", { class: "mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary" }, [
                  createVNode(_component_Icon, {
                    name: `lucide:${feature.icon}`,
                    class: "h-5 w-5"
                  }, null, 8, ["name"])
                ]),
                createVNode("h3", { class: "text-base font-semibold text-foreground mb-2" }, toDisplayString(feature.title), 1),
                createVNode("p", { class: "text-sm text-muted-foreground leading-relaxed" }, toDisplayString(feature.desc), 1)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><section id="cara-kerja" class="px-6 md:px-12 py-24 bg-muted/50"><div class="max-w-4xl mx-auto">`);
      _push(ssrRenderComponent(unref(motion).div, {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true },
        class: "text-center mb-16"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_UiBadge, {
              class: "mb-4 px-4 py-1.5 text-xs rounded-full",
              variant: "outline"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Cara Kerja`);
                } else {
                  return [
                    createTextVNode("Cara Kerja")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<h2 class="text-4xl md:text-5xl font-bold text-foreground leading-tight"${_scopeId}> Tiga langkah menuju<br${_scopeId}><span class="text-primary"${_scopeId}>keuangan yang sehat</span></h2>`);
          } else {
            return [
              createVNode(_component_UiBadge, {
                class: "mb-4 px-4 py-1.5 text-xs rounded-full",
                variant: "outline"
              }, {
                default: withCtx(() => [
                  createTextVNode("Cara Kerja")
                ]),
                _: 1
              }),
              createVNode("h2", { class: "text-4xl md:text-5xl font-bold text-foreground leading-tight" }, [
                createTextVNode(" Tiga langkah menuju"),
                createVNode("br"),
                createVNode("span", { class: "text-primary" }, "keuangan yang sehat")
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="space-y-6"><!--[-->`);
      ssrRenderList([{ num: "01", title: "Buat Akun", desc: "Daftar gratis dalam hitungan detik. Tidak perlu kartu kredit." }, { num: "02", title: "Tambah Dompet & Kategori", desc: "Sambungkan rekening, atur kategori sesuai gaya hidupmu." }, { num: "03", title: "Catat & Analisis", desc: "Mulai catat transaksi dan biarkan dashboard bekerja untukmu." }], (step, i) => {
        _push(ssrRenderComponent(unref(motion).div, {
          key: step.num,
          initial: { opacity: 0, x: i % 2 === 0 ? -32 : 32 },
          whileInView: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] },
          viewport: { once: true },
          whileHover: { x: 8, transition: { duration: 0.2 } },
          class: "flex items-start gap-6 rounded-xl border border-border bg-card p-6 hover:border-primary/30 transition-colors cursor-default group"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<span class="text-4xl font-bold text-muted-foreground group-hover:text-primary transition-colors shrink-0"${_scopeId}>${ssrInterpolate(step.num)}</span><div${_scopeId}><h3 class="text-lg font-semibold text-foreground mb-1"${_scopeId}>${ssrInterpolate(step.title)}</h3><p class="text-muted-foreground text-sm leading-relaxed"${_scopeId}>${ssrInterpolate(step.desc)}</p></div>`);
            } else {
              return [
                createVNode("span", { class: "text-4xl font-bold text-muted-foreground group-hover:text-primary transition-colors shrink-0" }, toDisplayString(step.num), 1),
                createVNode("div", null, [
                  createVNode("h3", { class: "text-lg font-semibold text-foreground mb-1" }, toDisplayString(step.title), 1),
                  createVNode("p", { class: "text-muted-foreground text-sm leading-relaxed" }, toDisplayString(step.desc), 1)
                ])
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></div></section><section class="px-6 md:px-12 py-24 max-w-4xl mx-auto text-center">`);
      _push(ssrRenderComponent(unref(motion).div, {
        initial: { opacity: 0, scale: 0.95 },
        whileInView: { opacity: 1, scale: 1 },
        transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
        viewport: { once: true },
        class: "relative rounded-xl overflow-hidden bg-gradient-to-br from-primary to-chart-2 p-12 md:p-16"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="absolute inset-0 pointer-events-none" style="${ssrRenderStyle({ "background-image": "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)" })}"${_scopeId}></div><div class="relative z-10"${_scopeId}><h2 class="text-4xl md:text-5xl font-bold text-primary-foreground mb-4"${_scopeId}> Mulai hari ini.<br${_scopeId}><span class="opacity-80"${_scopeId}>Gratis selamanya.</span></h2><p class="text-primary-foreground/80 mb-8 text-lg max-w-md mx-auto"${_scopeId}> Bergabung dan rasakan perbedaan mengelola keuangan dengan benar. </p>`);
            _push2(ssrRenderComponent(_component_UiButton, {
              size: "lg",
              variant: "secondary",
              "as-child": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, { to: "/auth" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Buat Akun Gratis `);
                        _push4(ssrRenderComponent(_component_Icon, {
                          name: "lucide:arrow-right",
                          class: "ml-2 h-4 w-4"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createTextVNode(" Buat Akun Gratis "),
                          createVNode(_component_Icon, {
                            name: "lucide:arrow-right",
                            class: "ml-2 h-4 w-4"
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, { to: "/auth" }, {
                      default: withCtx(() => [
                        createTextVNode(" Buat Akun Gratis "),
                        createVNode(_component_Icon, {
                          name: "lucide:arrow-right",
                          class: "ml-2 h-4 w-4"
                        })
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", {
                class: "absolute inset-0 pointer-events-none",
                style: { "background-image": "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.1) 0%, transparent 60%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.08) 0%, transparent 50%)" }
              }),
              createVNode("div", { class: "relative z-10" }, [
                createVNode("h2", { class: "text-4xl md:text-5xl font-bold text-primary-foreground mb-4" }, [
                  createTextVNode(" Mulai hari ini."),
                  createVNode("br"),
                  createVNode("span", { class: "opacity-80" }, "Gratis selamanya.")
                ]),
                createVNode("p", { class: "text-primary-foreground/80 mb-8 text-lg max-w-md mx-auto" }, " Bergabung dan rasakan perbedaan mengelola keuangan dengan benar. "),
                createVNode(_component_UiButton, {
                  size: "lg",
                  variant: "secondary",
                  "as-child": ""
                }, {
                  default: withCtx(() => [
                    createVNode(_component_NuxtLink, { to: "/auth" }, {
                      default: withCtx(() => [
                        createTextVNode(" Buat Akun Gratis "),
                        createVNode(_component_Icon, {
                          name: "lucide:arrow-right",
                          class: "ml-2 h-4 w-4"
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section><section id="faq" class="px-6 md:px-12 py-24 max-w-2xl mx-auto">`);
      _push(ssrRenderComponent(unref(motion).div, {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        transition: { duration: 0.6 },
        viewport: { once: true },
        class: "text-center mb-12"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<h2 class="text-4xl font-bold text-foreground"${_scopeId}>Pertanyaan Umum</h2>`);
          } else {
            return [
              createVNode("h2", { class: "text-4xl font-bold text-foreground" }, "Pertanyaan Umum")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<div class="space-y-3"><!--[-->`);
      ssrRenderList(faqs, (faq, i) => {
        _push(ssrRenderComponent(unref(motion).div, {
          key: i,
          initial: { opacity: 0, y: 16 },
          whileInView: { opacity: 1, y: 0 },
          transition: { duration: 0.4, delay: i * 0.08 },
          viewport: { once: true },
          class: "rounded-xl border border-border overflow-hidden"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<button class="w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors"${_scopeId}><span class="font-medium text-foreground text-sm"${_scopeId}>${ssrInterpolate(faq.q)}</span>`);
              _push2(ssrRenderComponent(unref(motion).span, {
                animate: { rotate: unref(openFaq) === i ? 45 : 0 },
                transition: { duration: 0.2 },
                class: "text-muted-foreground text-lg shrink-0 ml-4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`+`);
                  } else {
                    return [
                      createTextVNode("+")
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(`</button>`);
              _push2(ssrRenderComponent(unref(AnimatePresence_default), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    if (unref(openFaq) === i) {
                      _push3(ssrRenderComponent(unref(motion).div, {
                        key: "faq-" + i,
                        initial: { height: 0, opacity: 0 },
                        animate: { height: "auto", opacity: 1 },
                        exit: { height: 0, opacity: 0 },
                        transition: { duration: 0.25, ease: "easeInOut" },
                        class: "overflow-hidden"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`<p class="px-5 pb-5 text-sm text-muted-foreground leading-relaxed"${_scopeId3}>${ssrInterpolate(faq.a)}</p>`);
                          } else {
                            return [
                              createVNode("p", { class: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed" }, toDisplayString(faq.a), 1)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                  } else {
                    return [
                      unref(openFaq) === i ? (openBlock(), createBlock(unref(motion).div, {
                        key: "faq-" + i,
                        initial: { height: 0, opacity: 0 },
                        animate: { height: "auto", opacity: 1 },
                        exit: { height: 0, opacity: 0 },
                        transition: { duration: 0.25, ease: "easeInOut" },
                        class: "overflow-hidden"
                      }, {
                        default: withCtx(() => [
                          createVNode("p", { class: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed" }, toDisplayString(faq.a), 1)
                        ]),
                        _: 2
                      }, 1024)) : createCommentVNode("", true)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode("button", {
                  class: "w-full flex items-center justify-between p-5 text-left bg-card hover:bg-muted/50 transition-colors",
                  onClick: ($event) => openFaq.value = unref(openFaq) === i ? null : i
                }, [
                  createVNode("span", { class: "font-medium text-foreground text-sm" }, toDisplayString(faq.q), 1),
                  createVNode(unref(motion).span, {
                    animate: { rotate: unref(openFaq) === i ? 45 : 0 },
                    transition: { duration: 0.2 },
                    class: "text-muted-foreground text-lg shrink-0 ml-4"
                  }, {
                    default: withCtx(() => [
                      createTextVNode("+")
                    ]),
                    _: 1
                  }, 8, ["animate"])
                ], 8, ["onClick"]),
                createVNode(unref(AnimatePresence_default), null, {
                  default: withCtx(() => [
                    unref(openFaq) === i ? (openBlock(), createBlock(unref(motion).div, {
                      key: "faq-" + i,
                      initial: { height: 0, opacity: 0 },
                      animate: { height: "auto", opacity: 1 },
                      exit: { height: 0, opacity: 0 },
                      transition: { duration: 0.25, ease: "easeInOut" },
                      class: "overflow-hidden"
                    }, {
                      default: withCtx(() => [
                        createVNode("p", { class: "px-5 pb-5 text-sm text-muted-foreground leading-relaxed" }, toDisplayString(faq.a), 1)
                      ]),
                      _: 2
                    }, 1024)) : createCommentVNode("", true)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div></section><footer class="border-t border-border px-6 md:px-12 py-10"><div class="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4"><div class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_Icon, {
        name: "lucide:wallet",
        class: "h-5 w-5 text-primary"
      }, null, _parent));
      _push(`<span class="font-bold text-foreground">MyUangGwe</span></div><p class="text-xs text-muted-foreground"> Dibuat dengan ❤️ untuk keuangan yang lebih baik · © ${ssrInterpolate((/* @__PURE__ */ new Date()).getFullYear())}</p><div class="flex gap-6 text-xs text-muted-foreground">`);
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/privacy",
        class: "hover:text-foreground transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Privasi`);
          } else {
            return [
              createTextVNode("Privasi")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_component_NuxtLink, {
        to: "/terms",
        class: "hover:text-foreground transition-colors"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Ketentuan`);
          } else {
            return [
              createTextVNode("Ketentuan")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div></footer></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index--WOmRKVT.mjs.map
