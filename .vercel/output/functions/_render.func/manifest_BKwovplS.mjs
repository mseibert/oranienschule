import { l as decodeKey } from './chunks/astro/server_C9ygxXcZ.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CSyDu4C2.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///Users/martinseibert/Documents/code/oranienschule-website/","cacheDir":"file:///Users/martinseibert/Documents/code/oranienschule-website/node_modules/.astro/","outDir":"file:///Users/martinseibert/Documents/code/oranienschule-website/dist/","srcDir":"file:///Users/martinseibert/Documents/code/oranienschule-website/src/","publicDir":"file:///Users/martinseibert/Documents/code/oranienschule-website/public/","buildClientDir":"file:///Users/martinseibert/Documents/code/oranienschule-website/dist/client/","buildServerDir":"file:///Users/martinseibert/Documents/code/oranienschule-website/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"about/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"blog/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/blog","isIndex":true,"type":"page","pattern":"^\\/blog\\/?$","segments":[[{"content":"blog","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/blog/index.astro","pathname":"/blog","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"ContactForm/index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/contactform","isIndex":false,"type":"page","pattern":"^\\/ContactForm\\/?$","segments":[[{"content":"ContactForm","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/ContactForm.astro","pathname":"/ContactForm","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"rss.xml","links":[],"scripts":[],"styles":[],"routeData":{"route":"/rss.xml","isIndex":false,"type":"endpoint","pattern":"^\\/rss\\.xml\\/?$","segments":[[{"content":"rss.xml","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/rss.xml.js","pathname":"/rss.xml","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"index.html","links":[],"scripts":[],"styles":[],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":true,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@5.9.3_@types+node@24.0.3_rollup@4.43.0_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/form-submit","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/form-submit\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"form-submit","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/form-submit.ts","pathname":"/api/form-submit","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/test","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/test\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"test","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/test.ts","pathname":"/api/test","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"site":"https://example.com","base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["/Users/martinseibert/Documents/code/oranienschule-website/src/pages/blog/index.astro",{"propagation":"in-tree","containsHead":true}],["/Users/martinseibert/Documents/code/oranienschule-website/src/pages/index.astro",{"propagation":"none","containsHead":true}],["/Users/martinseibert/Documents/code/oranienschule-website/src/pages/about.astro",{"propagation":"none","containsHead":true}],["/Users/martinseibert/Documents/code/oranienschule-website/src/pages/blog/[...slug].astro",{"propagation":"in-tree","containsHead":true}],["\u0000astro:content",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/[...slug]@_@astro",{"propagation":"in-tree","containsHead":false}],["\u0000@astrojs-ssr-virtual-entry",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/blog/index@_@astro",{"propagation":"in-tree","containsHead":false}],["/Users/martinseibert/Documents/code/oranienschule-website/src/pages/rss.xml.js",{"propagation":"in-tree","containsHead":false}],["\u0000@astro-page:src/pages/rss.xml@_@js",{"propagation":"in-tree","containsHead":false}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/form-submit@_@ts":"pages/api/form-submit.astro.mjs","\u0000@astro-page:src/pages/api/test@_@ts":"pages/api/test.astro.mjs","\u0000@astro-page:src/pages/blog/index@_@astro":"pages/blog.astro.mjs","\u0000@astro-page:src/pages/blog/[...slug]@_@astro":"pages/blog/_---slug_.astro.mjs","\u0000@astro-page:src/pages/ContactForm@_@astro":"pages/contactform.astro.mjs","\u0000@astro-page:src/pages/rss.xml@_@js":"pages/rss.xml.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/.pnpm/astro@5.9.3_@types+node@24.0.3_rollup@4.43.0_typescript@5.8.3/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","/Users/martinseibert/Documents/code/oranienschule-website/node_modules/.pnpm/astro@5.9.3_@types+node@24.0.3_rollup@4.43.0_typescript@5.8.3/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_CWDnBT1M.mjs","/Users/martinseibert/Documents/code/oranienschule-website/.astro/content-assets.mjs":"chunks/content-assets_DleWbedO.mjs","/Users/martinseibert/Documents/code/oranienschule-website/.astro/content-modules.mjs":"chunks/content-modules_ChW_FU8I.mjs","\u0000astro:data-layer-content":"chunks/_astro_data-layer-content_BGMkdsT3.mjs","/Users/martinseibert/Documents/code/oranienschule-website/src/content/blog/using-mdx.mdx?astroPropagatedAssets":"chunks/using-mdx_Bc3Wcajo.mjs","/Users/martinseibert/Documents/code/oranienschule-website/src/content/blog/using-mdx.mdx":"chunks/using-mdx_C6QsW2uk.mjs","\u0000@astrojs-manifest":"manifest_BKwovplS.mjs","/Users/martinseibert/Documents/code/oranienschule-website/src/pages/ContactForm.astro?astro&type=script&index=0&lang.ts":"_astro/ContactForm.astro_astro_type_script_index_0_lang.CVMEi6I4.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[["/Users/martinseibert/Documents/code/oranienschule-website/src/pages/ContactForm.astro?astro&type=script&index=0&lang.ts","const s=document.getElementById(\"registerForm\"),t=document.getElementById(\"submitButton\"),e=document.getElementById(\"errorMessage\"),r=document.querySelector(\"input[name=email]\"),i=document.querySelector(\"textarea[name=message]\");s?.addEventListener(\"submit\",async o=>{if(o.preventDefault(),!(!r||!t||!e))try{t.disabled=!0,t.textContent=\"Absenden...\",e.classList.add(\"hidden\");const n=await fetch(\"/api/test\",{method:\"POST\",body:new FormData(s)}),a=await n.json();n.ok?(alert(\"Absenden erfolgreich!\"),r.value=\"\",i.value=\"\"):(e.textContent=a.error||\"Absenden fehlgeschlagen. Bitte versuche es erneut.\",e.classList.remove(\"hidden\"))}catch(n){console.error(\"Error submitting form:\",n),e.textContent=\"Ein Fehler ist aufgetreten. Bitte versuche es erneut.\",e.classList.remove(\"hidden\")}finally{t.disabled=!1,t.textContent=\"Absenden\"}});"]],"assets":["/blog-placeholder-1.jpg","/blog-placeholder-2.jpg","/blog-placeholder-3.jpg","/blog-placeholder-4.jpg","/blog-placeholder-5.jpg","/blog-placeholder-about.jpg","/favicon.svg","/oranienschule-logo.png","/pull-out-tage-oranienschule.jpeg","/fonts/atkinson-bold.woff","/fonts/atkinson-regular.woff","/about/index.html","/blog/index.html","/ContactForm/index.html","/rss.xml","/index.html"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"uQdukNHLccOU/x24MCOo25LBPvRp0PkUmACRWNvJjto="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
