(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[513],{3991:function(e,t){"use strict";var n,r;Object.defineProperty(t,"__esModule",{value:!0}),function(e,t){for(var n in t)Object.defineProperty(e,n,{enumerable:!0,get:t[n]})}(t,{PrefetchKind:function(){return n},ACTION_REFRESH:function(){return a},ACTION_NAVIGATE:function(){return l},ACTION_RESTORE:function(){return i},ACTION_SERVER_PATCH:function(){return o},ACTION_PREFETCH:function(){return u},ACTION_FAST_REFRESH:function(){return s},ACTION_SERVER_ACTION:function(){return c}});let a="refresh",l="navigate",i="restore",o="server-patch",u="prefetch",s="fast-refresh",c="server-action";(r=n||(n={})).AUTO="auto",r.FULL="full",r.TEMPORARY="temporary",("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},1516:function(e,t){"use strict";function n(e,t,n,r){return!1}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getDomainLocale",{enumerable:!0,get:function(){return n}}),("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5569:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return b}});let r=n(8754),a=r._(n(7294)),l=n(4532),i=n(3353),o=n(1410),u=n(9064),s=n(370),c=n(9955),f=n(4224),d=n(508),p=n(1516),m=n(4266),v=n(3991),h=new Set;function x(e,t,n,r,a,l){if(!l&&!(0,i.isLocalURL)(t))return;if(!r.bypassPrefetchedCheck){let a=void 0!==r.locale?r.locale:"locale"in e?e.locale:void 0,l=t+"%"+n+"%"+a;if(h.has(l))return;h.add(l)}let o=l?e.prefetch(t,a):e.prefetch(t,n,r);Promise.resolve(o).catch(e=>{})}function g(e){return"string"==typeof e?e:(0,o.formatUrl)(e)}let y=a.default.forwardRef(function(e,t){let n,r;let{href:o,as:h,children:y,prefetch:b=null,passHref:_,replace:j,shallow:C,scroll:N,locale:E,onClick:k,onMouseEnter:O,onTouchStart:A,legacyBehavior:I=!1,...L}=e;n=y,I&&("string"==typeof n||"number"==typeof n)&&(n=a.default.createElement("a",null,n));let M=!1!==b,S=null===b?v.PrefetchKind.AUTO:v.PrefetchKind.FULL,P=a.default.useContext(c.RouterContext),T=a.default.useContext(f.AppRouterContext),R=null!=P?P:T,w=!P,{href:B,as:G}=a.default.useMemo(()=>{if(!P){let e=g(o);return{href:e,as:h?g(h):e}}let[e,t]=(0,l.resolveHref)(P,o,!0);return{href:e,as:h?(0,l.resolveHref)(P,h):t||e}},[P,o,h]),q=a.default.useRef(B),z=a.default.useRef(G);I&&(r=a.default.Children.only(n));let F=I?r&&"object"==typeof r&&r.ref:t,[U,H,K]=(0,d.useIntersection)({rootMargin:"200px"}),D=a.default.useCallback(e=>{(z.current!==G||q.current!==B)&&(K(),z.current=G,q.current=B),U(e),F&&("function"==typeof F?F(e):"object"==typeof F&&(F.current=e))},[G,F,B,K,U]);a.default.useEffect(()=>{R&&H&&M&&x(R,B,G,{locale:E},{kind:S},w)},[G,B,H,E,M,null==P?void 0:P.locale,R,w,S]);let $={ref:D,onClick(e){I||"function"!=typeof k||k(e),I&&r.props&&"function"==typeof r.props.onClick&&r.props.onClick(e),R&&!e.defaultPrevented&&function(e,t,n,r,l,o,u,s,c,f){let{nodeName:d}=e.currentTarget,p="A"===d.toUpperCase();if(p&&(function(e){let t=e.currentTarget,n=t.getAttribute("target");return n&&"_self"!==n||e.metaKey||e.ctrlKey||e.shiftKey||e.altKey||e.nativeEvent&&2===e.nativeEvent.which}(e)||!c&&!(0,i.isLocalURL)(n)))return;e.preventDefault();let m=()=>{"beforePopState"in t?t[l?"replace":"push"](n,r,{shallow:o,locale:s,scroll:u}):t[l?"replace":"push"](r||n,{forceOptimisticNavigation:!f})};c?a.default.startTransition(m):m()}(e,R,B,G,j,C,N,E,w,M)},onMouseEnter(e){I||"function"!=typeof O||O(e),I&&r.props&&"function"==typeof r.props.onMouseEnter&&r.props.onMouseEnter(e),R&&(M||!w)&&x(R,B,G,{locale:E,priority:!0,bypassPrefetchedCheck:!0},{kind:S},w)},onTouchStart(e){I||"function"!=typeof A||A(e),I&&r.props&&"function"==typeof r.props.onTouchStart&&r.props.onTouchStart(e),R&&(M||!w)&&x(R,B,G,{locale:E,priority:!0,bypassPrefetchedCheck:!0},{kind:S},w)}};if((0,u.isAbsoluteUrl)(G))$.href=G;else if(!I||_||"a"===r.type&&!("href"in r.props)){let e=void 0!==E?E:null==P?void 0:P.locale,t=(null==P?void 0:P.isLocaleDomain)&&(0,p.getDomainLocale)(G,e,null==P?void 0:P.locales,null==P?void 0:P.domainLocales);$.href=t||(0,m.addBasePath)((0,s.addLocale)(G,e,null==P?void 0:P.defaultLocale))}return I?a.default.cloneElement(r,$):a.default.createElement("a",{...L,...$},n)}),b=y;("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},508:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useIntersection",{enumerable:!0,get:function(){return u}});let r=n(7294),a=n(29),l="function"==typeof IntersectionObserver,i=new Map,o=[];function u(e){let{rootRef:t,rootMargin:n,disabled:u}=e,s=u||!l,[c,f]=(0,r.useState)(!1),d=(0,r.useRef)(null),p=(0,r.useCallback)(e=>{d.current=e},[]);(0,r.useEffect)(()=>{if(l){if(s||c)return;let e=d.current;if(e&&e.tagName){let r=function(e,t,n){let{id:r,observer:a,elements:l}=function(e){let t;let n={root:e.root||null,margin:e.rootMargin||""},r=o.find(e=>e.root===n.root&&e.margin===n.margin);if(r&&(t=i.get(r)))return t;let a=new Map,l=new IntersectionObserver(e=>{e.forEach(e=>{let t=a.get(e.target),n=e.isIntersecting||e.intersectionRatio>0;t&&n&&t(n)})},e);return t={id:n,observer:l,elements:a},o.push(n),i.set(n,t),t}(n);return l.set(e,t),a.observe(e),function(){if(l.delete(e),a.unobserve(e),0===l.size){a.disconnect(),i.delete(r);let e=o.findIndex(e=>e.root===r.root&&e.margin===r.margin);e>-1&&o.splice(e,1)}}}(e,e=>e&&f(e),{root:null==t?void 0:t.current,rootMargin:n});return r}}else if(!c){let e=(0,a.requestIdleCallback)(()=>f(!0));return()=>(0,a.cancelIdleCallback)(e)}},[s,n,t,c,d.current]);let m=(0,r.useCallback)(()=>{f(!1)},[]);return[p,c,m]}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},9008:function(e,t,n){e.exports=n(2636)},1664:function(e,t,n){e.exports=n(5569)},9432:function(e,t,n){"use strict";n.d(t,{q:function(){return g}});var[r,a]=(0,n(5227).k)({name:"AvatarStylesContext",hookName:"useAvatarStyles",providerName:"<Avatar/>"}),l=n(2504),i=n(5893);function o(e){var t;let n=e.split(" "),r=null!=(t=n.at(0))?t:"",a=n.length>1?n.at(-1):"";return r&&a?`${r.charAt(0)}${a.charAt(0)}`:r.charAt(0)}function u(e){let{name:t,getInitials:n,...r}=e,o=a();return(0,i.jsx)(l.m.div,{role:"img","aria-label":t,...r,__css:o.label,children:t?null==n?void 0:n(t):null})}u.displayName="AvatarName";var s=e=>(0,i.jsxs)(l.m.svg,{viewBox:"0 0 128 128",color:"#fff",width:"100%",height:"100%",className:"chakra-avatar__svg",...e,children:[(0,i.jsx)("path",{fill:"currentColor",d:"M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"}),(0,i.jsx)("path",{fill:"currentColor",d:"M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"})]}),c=n(5721),f=n(7294);function d(e){let{src:t,srcSet:n,onError:r,onLoad:a,getInitials:o,name:d,borderRadius:p,loading:m,iconLabel:v,icon:h=(0,i.jsx)(s,{}),ignoreFallback:x,referrerPolicy:g,crossOrigin:y}=e,b=(0,c.d)({src:t,onError:r,crossOrigin:y,ignoreFallback:x});return t&&"loaded"===b?(0,i.jsx)(l.m.img,{src:t,srcSet:n,alt:d,onLoad:a,referrerPolicy:g,crossOrigin:null!=y?y:void 0,className:"chakra-avatar__img",loading:m,__css:{width:"100%",height:"100%",objectFit:"cover",borderRadius:p}}):d?(0,i.jsx)(u,{className:"chakra-avatar__initials",getInitials:o,name:d}):(0,f.cloneElement)(h,{role:"img","aria-label":v})}d.displayName="AvatarImage";var p=n(5059),m=n(1628),v=n(3179),h=n(5432),x={display:"inline-flex",alignItems:"center",justifyContent:"center",textAlign:"center",textTransform:"uppercase",fontWeight:"medium",position:"relative",flexShrink:0},g=(0,p.G)((e,t)=>{let n=(0,m.jC)("Avatar",e),[a,u]=(0,f.useState)(!1),{src:c,srcSet:p,name:g,showBorder:y,borderRadius:b="full",onError:_,onLoad:j,getInitials:C=o,icon:N=(0,i.jsx)(s,{}),iconLabel:E=" avatar",loading:k,children:O,borderColor:A,ignoreFallback:I,crossOrigin:L,...M}=(0,v.Lr)(e),S={borderRadius:b,borderWidth:y?"2px":void 0,...x,...n.container};return A&&(S.borderColor=A),(0,i.jsx)(l.m.span,{ref:t,...M,className:(0,h.cx)("chakra-avatar",e.className),"data-loaded":(0,h.PB)(a),__css:S,children:(0,i.jsxs)(r,{value:n,children:[(0,i.jsx)(d,{src:c,srcSet:p,loading:k,onLoad:(0,h.v0)(j,()=>{u(!0)}),onError:_,getInitials:C,name:g,borderRadius:b,icon:N,iconLabel:E,ignoreFallback:I,crossOrigin:L}),O]})})});g.displayName="Avatar"},9222:function(e,t,n){"use strict";n.d(t,{z:function(){return h}});var r=n(7294),[a,l]=(0,n(5227).k)({strict:!1,name:"ButtonGroupContext"}),i=n(2504),o=n(5432),u=n(5893);function s(e){let{children:t,className:n,...a}=e,l=(0,r.isValidElement)(t)?(0,r.cloneElement)(t,{"aria-hidden":!0,focusable:!1}):t,s=(0,o.cx)("chakra-button__icon",n);return(0,u.jsx)(i.m.span,{display:"inline-flex",alignSelf:"center",flexShrink:0,...a,className:s,children:l})}s.displayName="ButtonIcon";var c=n(295);function f(e){let{label:t,placement:n,spacing:a="0.5rem",children:l=(0,u.jsx)(c.$,{color:"currentColor",width:"1em",height:"1em"}),className:s,__css:f,...d}=e,p=(0,o.cx)("chakra-button__spinner",s),m="start"===n?"marginEnd":"marginStart",v=(0,r.useMemo)(()=>({display:"flex",alignItems:"center",position:t?"relative":"absolute",[m]:t?a:0,fontSize:"1em",lineHeight:"normal",...f}),[f,t,m,a]);return(0,u.jsx)(i.m.div,{className:p,...d,__css:v,children:l})}f.displayName="ButtonSpinner";var d=n(1103),p=n(5059),m=n(1628),v=n(3179),h=(0,p.G)((e,t)=>{let n=l(),a=(0,m.mq)("Button",{...n,...e}),{isDisabled:s=null==n?void 0:n.isDisabled,isLoading:c,isActive:p,children:h,leftIcon:g,rightIcon:y,loadingText:b,iconSpacing:_="0.5rem",type:j,spinner:C,spinnerPlacement:N="start",className:E,as:k,...O}=(0,v.Lr)(e),A=(0,r.useMemo)(()=>{let e={...null==a?void 0:a._focus,zIndex:1};return{display:"inline-flex",appearance:"none",alignItems:"center",justifyContent:"center",userSelect:"none",position:"relative",whiteSpace:"nowrap",verticalAlign:"middle",outline:"none",...a,...!!n&&{_focus:e}}},[a,n]),{ref:I,type:L}=function(e){let[t,n]=(0,r.useState)(!e),a=(0,r.useCallback)(e=>{e&&n("BUTTON"===e.tagName)},[]);return{ref:a,type:t?"button":void 0}}(k),M={rightIcon:y,leftIcon:g,iconSpacing:_,children:h};return(0,u.jsxs)(i.m.button,{ref:(0,d.qq)(t,I),as:k,type:null!=j?j:L,"data-active":(0,o.PB)(p),"data-loading":(0,o.PB)(c),__css:A,className:(0,o.cx)("chakra-button",E),...O,disabled:s||c,children:[c&&"start"===N&&(0,u.jsx)(f,{className:"chakra-button__spinner--start",label:b,placement:"start",spacing:_,children:C}),c?b||(0,u.jsx)(i.m.span,{opacity:0,children:(0,u.jsx)(x,{...M})}):(0,u.jsx)(x,{...M}),c&&"end"===N&&(0,u.jsx)(f,{className:"chakra-button__spinner--end",label:b,placement:"end",spacing:_,children:C})]})});function x(e){let{leftIcon:t,rightIcon:n,children:r,iconSpacing:a}=e;return(0,u.jsxs)(u.Fragment,{children:[t&&(0,u.jsx)(s,{marginEnd:a,children:t}),r,n&&(0,u.jsx)(s,{marginStart:a,children:n})]})}h.displayName="Button"},78:function(e,t,n){"use strict";n.d(t,{I:function(){return o}});var r=n(6877),a=n(5059),l=n(7294),i=n(5893);function o(e){let{viewBox:t="0 0 24 24",d:n,displayName:o,defaultProps:u={}}=e,s=l.Children.toArray(e.path),c=(0,a.G)((e,a)=>(0,i.jsx)(r.J,{ref:a,viewBox:t,...u,...e,children:s.length?s:(0,i.jsx)("path",{fill:"currentColor",d:n})}));return c.displayName=o,c}},4741:function(e,t,n){"use strict";n.d(t,{U:function(){return r}});var r=(0,n(78).I)({displayName:"HamburgerIcon",viewBox:"0 0 24 24",d:"M 3 5 A 1.0001 1.0001 0 1 0 3 7 L 21 7 A 1.0001 1.0001 0 1 0 21 5 L 3 5 z M 3 11 A 1.0001 1.0001 0 1 0 3 13 L 21 13 A 1.0001 1.0001 0 1 0 21 11 L 3 11 z M 3 17 A 1.0001 1.0001 0 1 0 3 19 L 21 19 A 1.0001 1.0001 0 1 0 21 17 L 3 17 z"})},5721:function(e,t,n){"use strict";n.d(t,{d:function(){return l},z:function(){return i}});var r=n(6245),a=n(7294);function l(e){let{loading:t,src:n,srcSet:l,onLoad:i,onError:o,crossOrigin:u,sizes:s,ignoreFallback:c}=e,[f,d]=(0,a.useState)("pending");(0,a.useEffect)(()=>{d(n?"loading":"pending")},[n]);let p=(0,a.useRef)(),m=(0,a.useCallback)(()=>{if(!n)return;v();let e=new Image;e.src=n,u&&(e.crossOrigin=u),l&&(e.srcset=l),s&&(e.sizes=s),t&&(e.loading=t),e.onload=e=>{v(),d("loaded"),null==i||i(e)},e.onerror=e=>{v(),d("failed"),null==o||o(e)},p.current=e},[n,u,l,s,i,o,t]),v=()=>{p.current&&(p.current.onload=null,p.current.onerror=null,p.current=null)};return(0,r.G)(()=>{if(!c)return"loading"===f&&m(),()=>{v()}},[f,m,c]),c?"loaded":f}var i=(e,t)=>"loaded"!==e&&"beforeLoadOrError"===t||"failed"===e&&"onError"===t},1941:function(e,t,n){"use strict";n.d(t,{E:function(){return u}});var r=n(5059),a=n(5893),l=(0,r.G)(function(e,t){let{htmlWidth:n,htmlHeight:r,alt:l,...i}=e;return(0,a.jsx)("img",{width:n,height:r,ref:t,alt:l,...i})});l.displayName="NativeImage";var i=n(5721),o=n(2504),u=(0,r.G)(function(e,t){let{fallbackSrc:n,fallback:r,src:u,srcSet:s,align:c,fit:f,loading:d,ignoreFallback:p,crossOrigin:m,fallbackStrategy:v="beforeLoadOrError",referrerPolicy:h,...x}=e,g=null!=d||p||!(void 0!==n||void 0!==r),y=(0,i.d)({...e,crossOrigin:m,ignoreFallback:g}),b=(0,i.z)(y,v),_={ref:t,objectFit:f,objectPosition:c,...g?x:function(e,t=[]){let n=Object.assign({},e);for(let e of t)e in n&&delete n[e];return n}(x,["onError","onLoad"])};return b?r||(0,a.jsx)(o.m.img,{as:l,className:"chakra-image__placeholder",src:n,..._}):(0,a.jsx)(o.m.img,{as:l,src:u,srcSet:s,crossOrigin:m,loading:d,referrerPolicy:h,className:"chakra-image",..._})});u.displayName="Image"},3100:function(e,t,n){"use strict";n.d(t,{xu:function(){return i}});var r=n(2504),a=n(5059),l=n(5893),i=(0,r.m)("div");i.displayName="Box";var o=(0,a.G)(function(e,t){let{size:n,centerContent:r=!0,...a}=e;return(0,l.jsx)(i,{ref:t,boxSize:n,__css:{...r?{display:"flex",alignItems:"center",justifyContent:"center"}:{},flexShrink:0,flexGrow:0},...a})});o.displayName="Square",(0,a.G)(function(e,t){let{size:n,...r}=e;return(0,l.jsx)(o,{size:n,ref:t,borderRadius:"9999px",...r})}).displayName="Circle"},4418:function(e,t,n){"use strict";n.d(t,{X:function(){return s}});var r=n(5059),a=n(1628),l=n(3179),i=n(2504),o=n(5432),u=n(5893),s=(0,r.G)(function(e,t){let n=(0,a.mq)("Heading",e),{className:r,...s}=(0,l.Lr)(e);return(0,u.jsx)(i.m.h2,{ref:t,className:(0,o.cx)("chakra-heading",e.className),...s,__css:n})});s.displayName="Heading"},9564:function(e,t,n){"use strict";n.d(t,{x:function(){return s}});var r=n(5059),a=n(1628),l=n(3179),i=n(2504),o=n(5432),u=n(5893),s=(0,r.G)(function(e,t){let n=(0,a.mq)("Text",e),{className:r,align:s,decoration:c,casing:f,...d}=(0,l.Lr)(e),p=function(e){let t=Object.assign({},e);for(let e in t)void 0===t[e]&&delete t[e];return t}({textAlign:e.align,textDecoration:e.decoration,textTransform:e.casing});return(0,u.jsx)(i.m.p,{ref:t,className:(0,o.cx)("chakra-text",e.className),...p,...d,__css:n})});s.displayName="Text"},1103:function(e,t,n){"use strict";n.d(t,{lq:function(){return a},qq:function(){return l}});var r=n(7294);function a(...e){return t=>{e.forEach(e=>{!function(e,t){if(null!=e){if("function"==typeof e){e(t);return}try{e.current=t}catch(n){throw Error(`Cannot assign value '${t}' to ref '${e}'`)}}}(e,t)})}}function l(...e){return(0,r.useMemo)(()=>a(...e),e)}},1307:function(e,t,n){"use strict";n.d(t,{p:function(){return d}});var r={ease:[.25,.1,.25,1],easeIn:[.4,0,1,1],easeOut:[0,0,.2,1],easeInOut:[.4,0,.2,1]},a={enter:{duration:.2,ease:r.easeOut},exit:{duration:.1,ease:r.easeIn}},l={enter:(e,t)=>({...e,delay:"number"==typeof t?t:null==t?void 0:t.enter}),exit:(e,t)=>({...e,delay:"number"==typeof t?t:null==t?void 0:t.exit})},i=n(5432),o=n(1526),u=n(8419),s=n(7294),c=n(5893),f={initial:"exit",animate:"enter",exit:"exit",variants:{enter:({transition:e,transitionEnd:t,delay:n}={})=>{var r;return{opacity:1,transition:null!=(r=null==e?void 0:e.enter)?r:l.enter(a.enter,n),transitionEnd:null==t?void 0:t.enter}},exit:({transition:e,transitionEnd:t,delay:n}={})=>{var r;return{opacity:0,transition:null!=(r=null==e?void 0:e.exit)?r:l.exit(a.exit,n),transitionEnd:null==t?void 0:t.exit}}}},d=(0,s.forwardRef)(function(e,t){let{unmountOnExit:n,in:r,className:a,transition:l,transitionEnd:s,delay:d,...p}=e,m={transition:l,transitionEnd:s,delay:d};return(0,c.jsx)(o.M,{custom:m,children:(!n||r&&n)&&(0,c.jsx)(u.E.div,{ref:t,className:(0,i.cx)("chakra-fade",a),custom:m,...f,animate:r||n?"enter":"exit",...p})})});d.displayName="Fade"}}]);