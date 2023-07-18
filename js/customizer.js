function zakekeDesigner(e){function t(e){return 100*e.toFixed(2)}function n(){return window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.zakekeAddToCartHandler||window.Android&&window.Android.zakekeAddToCart}function i(){if(window.zakekeShopLocales)return window.zakekeShopLocales.find((t=>t.iso_code===e.locale||t.iso_code.split("-")[0]===e.locale||t.iso_code.split("-")[0]===e.locale.split("-")[0]))}function a(t,n){const i=new URL(e.zakekeUrl+"integration/shopify/download");return i.searchParams.append("designDocID",t),i.searchParams.append("code",window.zakekeCustomerId||T()),n&&i.searchParams.append("modificationID",n),i.toString()}function o(e,t){return window.zakekePostprocessProperties?Promise.resolve(window.zakekePostprocessProperties(e,Object.assign({},t,{price:b}))):Promise.resolve(e)}function r(){return 0===b&&1===e.customizationStrategy}function d(e){return e.reduce(((t,n,i)=>t+n.url+"#"+n.sideName+(i+1===e.length?"":",")),"")}function s(){return window.zakekePricingData}function c(t){const n=e.product.variants.find((e=>e.id==t));if(null==n)throw new Error(`Unable to find variant: ${t}`);return n}function u(t){const n=c(e.variantId),i=[1,2,3].map((e=>{const i=t.find((t=>t.Id==e));return i?i.Value.Id:n[`option${e}`]}));return e.product.variants.find((e=>i.every(((t,n)=>e[`option${n+1}`]===t))))}function l(t){return u(t)||c(e.variantId)}function p(e,t){return null===e.inventory_management||"continue"===e.inventory_policy||e.inventory_quantity>=t}function k(e,t,n,i,a){let o=n;return t&&(o+=e*(t/100)),i&&(o+=i.reduce(((t,n)=>t+function(e,t){return 1===e.priceType?t*(e.priceToAdd/100)*e.multiplier:0}(n,e*a)),0)),o}function w(e,t,n){return 0===e?e:e/n}function m(e,t,n){return e*n+t}function g(){return fetch("/cart.json?t=${new Date().getTime()}").then((e=>e.json()))}function f(e){return fetch("/cart/add.json",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({items:e})})}function z(e){return fetch("/cart/change.json",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify({id:e.key,quantity:0})})}function h(e){return new Promise((t=>{fetch(`/products/${e.handle}.json?t=${(new Date).getTime()}`,{credentials:"same-origin"}).then((n=>{n.ok?t(e):setTimeout((()=>t(h(e))),300)}))}))}function y(t,n,i,a,o,r){return fetch(e.zakekeApiUrl+(window.zakekeUseDesignsV2?"shopify/designsv2":"shopify/designs"),{headers:{Accept:"application/json","Content-Type":"application/json",Authorization:"Bearer "+e.token},method:"POST",mode:"cors",body:JSON.stringify({docID:t,variantID:n,includeTags:i,excludeCustomizationPrice:a,uniqueSku:window.zakekeUniqueSku||!1,qty:o,modificationID:r})}).then((e=>e.json())).then((e=>({productID:e.productID,variantID:e.variantID,handle:e.handle,quantity:o,modificationID:r}))).then(h)}function v(i){var c=e.properties;c._bulkCustomization=i.designID,i.previews&&i.previews.length>0&&(c._previews=d(i.previews)),e.directDownload&&(c._zakekeZip=a(i.designID)),(e.productAdvancedProcessing||r())&&(c.customization=i.designID,C&&s()&&(c._configurationPrice=t(C)));const u=i.attributesSelection.reduce(((e,t)=>e+t.quantity),0);return Promise.all(i.attributesSelection.map((e=>({variantID:l(e.attributes).id,quantity:e.quantity}))).map((function(t){return!e.productAdvancedProcessing&&!r()||n()?y(i.designID,t.variantID,window.zakekeIncludeTags,e.priceHide,u):Promise.resolve(t)}))).then((function(t){if(n())return function(e){const t=JSON.stringify(e);window.Android?window.Android.zakekeMultipleAddToCart(t):window.webkit.messageHandlers.zakekeMultipleAddToCartHandler.postMessage(t)}(t.map(((e,t)=>({product_id:e.productID,variant_id:e.variantID,quantity:i.attributesSelection[t].quantity}))));if(e.showFileNames&&i.fileNames)for(const e of i.fileNames)c[`_zakekeFileForSide${e.sideName}`]=e.fileName;return o(Object.keys(c).length>0?c:void 0,{design:i.designID}).then((e=>f(t.map(((t,n)=>({id:t.variantID,handle:t.handle,quantity:i.attributesSelection[n].quantity,properties:e}))))))})).then((function(){n()||(window.zakekeAfterAddToCart?window.zakekeAfterAddToCart({design:i.designID}):window.location.href=D())}))}function P(n){let i=e.properties;(e.productAdvancedProcessing||r())&&(i.customization=n.designID,C&&s()&&(i._configurationPrice=t(C)));const c=n.attributes.reduce(((e,t)=>e+t.quantity),0);return Promise.all(n.attributes.map((e=>({...e,variantID:l(e.attributes).id}))).map((t=>e.productAdvancedProcessing||r()?Promise.resolve(t):y(n.designID,t.variantID,window.zakekeIncludeTags,e.priceHide,c,t.modificationID)))).then((t=>{if(e.showFileNames&&n.fileNames)for(const e of n.fileNames)i[`_zakekeFileForSide${e.sideName}`]=e.fileName;return o(Object.keys(i).length>0?i:void 0,{design:n.designID}).then((i=>{function o(t,i){let o={...i};(e.productAdvancedProcessing||r())&&(o._zakekeNameAndNumber=t.modificationID,o._zakekePreview=t.tempPreviewImageUrl),n.previews&&n.previews.length>0&&(o._previews=d(n.previews.filter((e=>e.modificationID===t.modificationID)))),e.directDownload&&(o._zakekeZip=a(n.designID,t.modificationID));const s=n.attributes.find((e=>e.modificationID===t.modificationID));return o[window.zakekeNameAndNumberLabel||"Roster"]=s.elementDescs.elements.map((e=>e.text.content)).join("， "),o}return f(t.map(((e,t)=>({id:e.variantID,handle:e.handle,quantity:n.attributes[t].quantity,properties:o(e,i||{})}))))}))})).then((()=>{window.zakekeAfterAddToCart?window.zakekeAfterAddToCart({design:n.designID}):window.location.href=D()}))}function I(n,r,d,c,u){const l=document.getElementById("zakeke-addtocart");!function(e){const t=i();!t||t.primary||e.action.startsWith("http")||(e.action=e.action.replace("/cart/add",t.root_url+"/cart/add"))}(l);l.querySelector('input[name="id"]').value=r;let p=l.querySelector('input[name="quantity"]');p||(p=document.createElement("input"),p.type="hidden",p.name="quantity",l.appendChild(p)),p.value=d;const k=document.createElement("INPUT");if(k.type="hidden",k.name="form_type",k.value="product",l.appendChild(k),e.directDownload&&(c._zakekeZip=a(n)),e.showFileNames&&u)for(const e of u)c[`_zakekeFileForSide${e.sideName}`]=e.fileName;o(c,{design:n}).then((i=>{null!=i&&(e.productAdvancedProcessing&&b&&s()&&(i._configurationPrice=t(b)),Object.keys(i).map((e=>{const t=document.createElement("INPUT");return t.type="hidden",t.name=`properties[${e}]`,t.value=i[e],t})).forEach((e=>l.appendChild(e)))),window.zakekeBeforeAddToCart?window.zakekeBeforeAddToCart(n,{quantity:d}).then((e=>l.submit())):window.zakekeUseDesignsV2?setTimeout((()=>{l.submit()}),1500):l.submit()}))}function D(){const e=i(),t="/cart";return e&&!e.primary?e.root_url+t:t}function A(e,t){return window.zakekeBeforeCartUpdate?window.zakekeBeforeCartUpdate(e,t):Promise.resolve(t)}function T(){const e=Math.random().toString(36).substring(7);return window.localStorage?localStorage.zakekeGuest=localStorage.zakekeGuest||e:window.zakekeVisitorCode?window.zakekeVisitorCode:(window.zakekeVisitorCode=e,e)}function S(e){const t=new URL(window.location.href);return t.searchParams.set("shared",e),t.toString()}var b=0,C=0,U=document.getElementById("zakeke-container"),_=function(){const e=document.createElement("IFRAME");return e.id="zakeke-frame",e.src="about:blank",e.allow="clipboard-read; clipboard-write; fullscreen; web-share",e.title="Product customization",e.setAttribute("data-hj-allow-iframe",""),e}(),q={};function N(e){return window.zakekePostProcessIframeUrl?window.zakekePostProcessIframeUrl(e):e}function M(t){(e.productAdvancedProcessing||window.zakekeForceClientPreviews)&&function(e){e.customizerLargeUrl=e.customizerLargeUrl+"&isClientPreviewsEnabled=1",e.customizerSmallUrl=e.customizerSmallUrl+"&isClientPreviewsEnabled=1"}(t),function(e){try{const t=Object.fromEntries(new URLSearchParams(window.location.hash.substring(1)));if(!t.startImageUrl)return;const n=new URLSearchParams(e.customizerLargeUrl),i=new URLSearchParams(e.customizerSmallUrl);n.set("startImageUrl",t.startImageUrl),i.set("startImageUrl",t.startImageUrl),e.customizerLargeUrl=e.customizerLargeUrl.split("?")[0]+"?"+n.toString(),e.customizerSmallUrl=e.customizerSmallUrl.split("?")[0]+"?"+i.toString()}catch(e){console.error(e)}}(t),window.zakekeAddToCartText&&(t.customizerLargeUrl=t.customizerLargeUrl+"&cartButtonText="+encodeURIComponent(window.zakekeAddToCartText),t.customizerSmallUrl=t.customizerSmallUrl+"&cartButtonText="+encodeURIComponent(window.zakekeAddToCartText));const n=window.location.href.split("?")[0];if(t.customizerLargeUrl=t.customizerLargeUrl+"&shareUrlPrefix="+encodeURIComponent(n),t.customizerSmallUrl=t.customizerSmallUrl+"&shareUrlPrefix="+encodeURIComponent(n),_.style.background="none",window.matchMedia("(min-width: 769px)").matches)_.src=N(t.customizerLargeUrl);else if(window.location.pathname.includes("/pages/")||document.body.appendChild(U),_.src=N(t.customizerSmallUrl),navigator.userAgent.match(/instagram/i)&&navigator.userAgent.match(/iPhone/i)){const e=window.screen.height-window.innerHeight;_.style.paddingBottom=e+"px"}}n()?e.productAdvancedProcessing=!1:e.productAdvancedProcessing=e.productAdvancedProcessing?e.productAdvancedProcessing:window.zakekeProductAdvancedProcessing,e.productAdvancedProcessing&&(window.zakekePricingData&&window.zakekePricingData.variantId||(e.priceHide=!0)),window.zakekePriceHide&&(e.priceHide=window.zakekePriceHide),U.appendChild(_),window.addEventListener("message",(function(i){var s,c,h,y,T;i.origin===e.zakekeUrl.slice(0,-1)&&("AddToCart"===i.data.zakekeMessageType?window.zakekeAddToCart?window.zakekeAddToCart(i.data.data.handle,i.data.data.productID,i.data.data.variantID,i.data.data.quantity,q):n()?(y=i.data.data.productID,T=i.data.data.variantID,window.Android?window.Android.zakekeAddToCart(y,T):window.webkit.messageHandlers.zakekeAddToCartHandler.postMessage('{"product_id":'+y+', "variant_id":'+T+"}")):I(i.data.data.designID,i.data.data.variantID,i.data.data.quantity,q,i.data.data.fileNames):"AddToCartContext"===i.data.zakekeMessageType?e.design?(c=e.design,h=i.data.data.previews,g().then((n=>{const i=t(b).toString(),r=n.items.filter((e=>e.properties&&(e.properties.customization===c||e.properties._customization===c)&&(e.properties._configurationPrice!==i||e.properties._previews!==d(h)||e.properties._zakekeZip&&e.properties._zakekeZip!==a(c)))),s={_configurationPrice:i,_previews:d(h)};return e.directDownload&&(s._zakekeZip=a(c)),Promise.all(r.map((e=>o(Object.assign({},e.properties,s),{design:c})))).then((e=>{const t=e.map(((e,t)=>{const n={id:r[t].id,properties:e,quantity:r[t].quantity};return r[t].selling_plan_allocation&&(n.selling_plan=r[t].selling_plan_allocation.selling_plan.id),n}));return window.zakekeRemoveBeforeAddOnUpdate?r.reduce(((e,t)=>e.then((()=>z(t)))),Promise.resolve()).then((()=>A(c,t))).then(f).then((()=>{window.location.href=D()})):A(c,t).then(f).then((()=>r.reduce(((e,t)=>e.then((()=>z(t)))),Promise.resolve()))).then((()=>{window.location.href=D()}))}))}))):(window.fbq&&window.fbq("track","AddToCart",{content_name:e.product.title,content_ids:[e.product.id.toString()],content_type:"product"}),function(t,n,i,a,o){const s=l(JSON.parse(t)).id;if(e.productAdvancedProcessing||r()){const e={customization:n};a&&(e._previews=d(a)),window.zakekeAddToCart?window.zakekeAddToCart(n,s,i,e):I(n,s,i,e,o)}else a&&(q._previews=d(a)),_.contentWindow.postMessage({data:{productID:e.product.id,variantID:s,includeTags:window.zakekeIncludeTags||!1,additionalTags:window.zakekeAdditionalTags||[],excludeCustomizationPrice:e.priceHide||!1,uniqueSku:window.zakekeUniqueSku||!1},zakekeUseDesignsV2:window.zakekeUseDesignsV2||!1,zakekeMessageType:"AddToCartContext"},"*")}(i.data.data.colorID,i.data.data.designID,i.data.data.quantity,i.data.data.previews,i.data.data.fileNames)):"AddToCartMultiple"===i.data.zakekeMessageType?v(i.data.data):"DesignChange"===i.data.zakekeMessageType?function(t,n){const i=window.zakekeNotExactMatchVariant?l(JSON.parse(t)):u(JSON.parse(t));if(!i)return void _.contentWindow.postMessage({data:{color:t,isOutOfStock:!0,finalPrice:0},zakekeMessageType:"DesignChange"},"*");const a=k(i.price,n["zakeke-percent-price"],n["zakeke-price"],n["zakeke-conditions"],e.quantity);b=w(a,n["zakeke-pricing-model"],e.quantity),_.contentWindow.postMessage({data:{color:t,isOutOfStock:!p(i,e.quantity),finalPrice:e.priceHide||window.zakekePriceHideOnlyFrontend?0:m(i.price,a,e.quantity)},zakekeMessageType:"DesignChange"},"*")}(i.data.design.color,{"zakeke-price":i.data.design.price||0,"zakeke-percent-price":i.data.design.percentPrice||0,"zakeke-conditions":i.data.design.conditions||[],"zakeke-pricing-model":i.data.design.pricingModel||"advanced"}):"ProductAttributes"===i.data.zakekeMessageType?function(t){const n=e.product.options.map((e=>({id:e.position.toString(),label:e.name,values:e.values.map((e=>({id:e,label:e})))}))),i=e.product.variants.map((e=>[1,2,3].filter((t=>e[`option${t}`])).map((t=>({Id:t.toString(),Value:{Id:e[`option${t}`]}})))));_.contentWindow.postMessage({data:Object.assign({},t,{attributes:n,variants:i}),zakekeMessageType:"ProductAttributes"},"*")}(i.data.data):"ProductPrice"===i.data.zakekeMessageType?function(e){const t=l(e.attributes),n=k(t.price,e.percentPrice,Number.isNaN(e.price)?0:e.price,e.conditions,e.quantity);e.includePricing&&(C=w(n,e.pricingModel,e.quantity)),_.contentWindow.postMessage({data:{promiseId:e.promiseId,isOutOfStock:!p(t,e.quantity),finalPrice:m(t.price,n,e.quantity)},zakekeMessageType:"ProductPrice"},"*")}(i.data.data):"SharedDesign"===i.data.zakekeMessageType?_.contentWindow.postMessage({zakekeMessageType:"SharedDesign",data:{promiseId:i.data.data.promiseId,url:S(i.data.data.designDocID)}},"*"):"AddToCartNameAndNumber"===i.data.zakekeMessageType&&(e.design?(s=i.data.data,g().then((e=>{const t=e.items.filter((e=>e.properties&&(e.properties.customization===s.designID||e.properties._customization===s.designID)));fetch("/cart/update.json",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t.reduce(((e,t)=>{e[t.key]=0}),{}))}).then((()=>P(s)))}))):P(i.data.data)))}),!1),function(){let t=Object.assign({},e);return window.zakekeCustomerId?t.c=window.zakekeCustomerId:t.v=T(),fetch(e.zakekeApiUrl+"shopify/customizer/iframe",{method:"POST",headers:{Accept:"application/json","Content-Type":"application/json"},body:JSON.stringify(t)}).then((e=>e.json()))}().then((t=>{return e.token=t.token,e.variantId=t.variantId,(n=t.product,window.zakekePostProcessShopifyProduct?window.zakekePostProcessShopifyProduct(n):Promise.resolve(n)).then((n=>{e.product=n,M(t)}));var n}))}