if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise((async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]}))},s=(s,c)=>{Promise.all(s.map(e)).then((e=>c(1===e.length?e[0]:e)))},c={require:Promise.resolve(s)};self.define=(s,i,a)=>{c[s]||(c[s]=Promise.resolve().then((()=>{let c={};const r={uri:location.origin+s.slice(1)};return Promise.all(i.map((s=>{switch(s){case"exports":return c;case"module":return r;default:return e(s)}}))).then((e=>{const s=a(...e);return c.default||(c.default=s),c}))})))}}define("./service-worker.js",["./workbox-a9b579d2"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/0PR3fT4YjcV3Oc250U92Y/_buildManifest.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/0PR3fT4YjcV3Oc250U92Y/_ssgManifest.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/106-fbb1e14af85d9a7a32d1.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/119-75d70cd101bee5478d6d.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/163-55ed2c64a8e49ea613c0.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/198-d557404c703b40b72886.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/297-2d59da3d90a91b034c8f.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/2c796e83-198c396a76e4a903247e.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/34-e3a4c0bdcee96a247b64.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/433-90a3c854a0c0106ed61b.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/547-d255c6c44ffcff105bf5.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/591-eb81e0723b635207a61c.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/629-f8d5c41e447953817cdd.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/720-7cbbb0d9c005b237a1ac.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/781-0e5e4c6c22c1736e6f12.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/794-e76bed40c5cadf1431e8.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/942.cf15e08cdb995e0e1c6a.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/99-c88dccbdfa0b9b9e4d73.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/framework-911a2cc3ae47cd303ece.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/main-023868d0f7b72936d8be.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/%5Bcategory%5D-e23c0dae53c22e2ab8f2.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/%5Bcategory%5D/%5Bid%5D-0abf67516baaac91499c.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/_app-29652b189c3f335db077.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/_error-0b1f0d4c4c4a28628871.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/aboutus-96a1339eed190a2b682e.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/addyourorg-1a0ed8ea1a6b2094fccc.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/checklist-fbb85ec8c560eb9c4f6b.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/documents/specialtycourtsrequirements-cf5b7c10aab2e6d9483b.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/index-cf9e6ef99fc83c83a440.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/knowyourrights-0d464362f174a09a5add.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp-76908f3fd6cdb10d8d31.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/%5Bwildcard%5D-fb9e5e2946fcbc4b8b6f.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/%5Bwildcard%5D/apply-116c3c982a0aafda0218.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/%5Bwildcard%5D/areyouaclient-13209331c7f5cf64d894.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/clearmyrecord-c6dea243ace05959ff39.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/diversion-a1b71e0e3c2589ec02fa.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/documents-611f2046aa7820fc3dca.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/familyresources-f94fd81565ea377184bd.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/legalterms-bd8f97de9a4c73a06dfa.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/prearraignment-722b83fccfcab42348e9.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/recommendedresources-13182b7ca912e059b7a1.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/resourcesforwomen-b227709acbf10692f62f.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/letushelp/specialtycourts-8e46ee3079565e7ed48b.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/privacypolicy-4b48509469d73344b065.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/search-1222543e15fe2d70e2a7.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/search/%5Bid%5D-7ab50e19285011a49363.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/pages/thrivestories-57c2e6b4aad77de291d1.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/polyfills-8683bd742a84c1edd48c.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/chunks/webpack-b2c01b3b98e3e89fe4ad.js",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/css/4c040c4cf84ef3b94582.css",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/css/5f70756a42a432f864ab.css",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/css/8e48917f792ce6c40009.css",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/_next/static/css/c7f8168a7eff661b8b4c.css",revision:"0PR3fT4YjcV3Oc250U92Y"},{url:"/icons/clearmyrecord.svg",revision:"9798547610949df408609c0cc76b908e"},{url:"/icons/clothing.svg",revision:"4419302a60a3810c7e8260c8fafabd50"},{url:"/icons/clothing_marker.svg",revision:"d2268457cb214f0c7de578ef22e6f89b"},{url:"/icons/communitysupport.svg",revision:"d7c3c11da3fdca9b87e5c3d8ceeea2e6"},{url:"/icons/communitysupport_marker.svg",revision:"b66b8deb51ff57badff1162995a43fce"},{url:"/icons/diversion.svg",revision:"8386b9abe5d85d70f662fe16305d62e0"},{url:"/icons/documents.svg",revision:"b85c56c5c14de0c48ce3f8c1b25e60a0"},{url:"/icons/documents_smaller.svg",revision:"7970c5236df257648a68045ba6a55899"},{url:"/icons/employment.svg",revision:"dfe1a2f24203f24ee928b3c8b4cbb8b5"},{url:"/icons/employment_marker.svg",revision:"398a2ee7f6bc0584268898c6ebc3f4b8"},{url:"/icons/familyresources.svg",revision:"89723a7be4cba21309789b6e710e3e85"},{url:"/icons/food.svg",revision:"870150320e82442c0086afe1a85f6178"},{url:"/icons/food_marker.svg",revision:"0d48e2b0181ead6e4ff2d97c03de7968"},{url:"/icons/housing.svg",revision:"19384cd3084c61e5f35891f6185bccb9"},{url:"/icons/housing_marker.svg",revision:"b3ae5b23b477da0cecd3b1c7c426f14f"},{url:"/icons/legalservices.svg",revision:"8d43313bd9e4a98c8b5a0627fd18f09e"},{url:"/icons/legalservices_marker.svg",revision:"ff37c906c205b0e30402ed1876ad04dc"},{url:"/icons/legalterms.svg",revision:"705e4ec2670abf98a6e6e36c22113279"},{url:"/icons/markericon.svg",revision:"29f38197a1f2259e79a088c4898ff07c"},{url:"/icons/medicalsupport.svg",revision:"f5116b9a34440c5be5d5d16296933596"},{url:"/icons/medicalsupport_marker.svg",revision:"f0cfa0efe0ba336c5f45ee96b2d4c573"},{url:"/icons/mentalhealth.svg",revision:"713733fc2e537ab6f277f6eed9a46c06"},{url:"/icons/mentalhealth_marker.svg",revision:"44a244bedffd47f2fb0e03bffd96bbc0"},{url:"/icons/phone.svg",revision:"6c91914c08bf01176796e958d3398803"},{url:"/icons/prearraignment.svg",revision:"2d44dac94a5e0df6de5584cfdc9d400a"},{url:"/icons/recommendedresources.svg",revision:"95fa18940cfbf2b40e39a08225279c86"},{url:"/icons/resourcedirectory.svg",revision:"806ba2c77da4150655e66a3da77e7ef1"},{url:"/icons/resourcedirectory_marker.svg",revision:"665f0f99453c4a635586f7ebdc8d3464"},{url:"/icons/resourcesforwomen.svg",revision:"0a5440836da1902fca2af6eb7731f890"},{url:"/icons/search_marker.svg",revision:"2b40e0c738582fa4d91c242c51402c0f"},{url:"/icons/socialservices.svg",revision:"a65be8fa438961bf741a59b87a70a431"},{url:"/icons/socialservices_marker.svg",revision:"31258b77d9a230542d44a55cfe760114"},{url:"/icons/specialtycourts.svg",revision:"94f8beb19de0332db92bce0a217a6d15"},{url:"/icons/substanceuse.svg",revision:"5d55735c0e700f17055770d489a3042b"},{url:"/icons/substanceuse_marker.svg",revision:"78a312475096be07a73b719609be855a"},{url:"/icons/thriveleaf.svg",revision:"7ae44ecbd3d6f2890930b864ffdfbbcf"},{url:"/icons/transportation.svg",revision:"b75bb929bd72ba366d1dae8d91e6e463"},{url:"/icons/transportation_marker.svg",revision:"ee338d368b7d45b1e3c45370b5906e2e"},{url:"/icons/treatmentheart.svg",revision:"4ff4ff55ad94d5a5bae1b5efd49edd6e"},{url:"/icons/user_marker.svg",revision:"a2581546016a331a4f883a3cb6c214ea"},{url:"/images/blackandbrownenglish-thumb.jpg",revision:"919be51b33145d29aa95546921b1d3bd"},{url:"/images/blackandbrownenglish.jpg",revision:"2bf278c605a25c022259b6caa771786d"},{url:"/images/blackandbrownspanish-thumb.jpg",revision:"9d8c08614ad40b05785d5f94079fedeb"},{url:"/images/blackandbrownspanish.jpg",revision:"e3977207dd8cd9b89556531e6d7d4951"},{url:"/images/cheech.jpg",revision:"3ad1f86ebe01cd250fa8094fc7e9df7a"},{url:"/images/documents_placeholder.png",revision:"4cc226b7c19b1147635207237e008619"},{url:"/images/familyresources_placeholder.png",revision:"c3cc0e271165cdd13f9643596b5a7745"},{url:"/images/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/images/heart.svg",revision:"6c2644343802b7f7649c53c4bc803ebc"},{url:"/images/homepage_placeholder.png",revision:"f42ff473fb577567db86773fb618feb7"},{url:"/images/ladders.png",revision:"289a35c4cc48d1ae0934378742e936bd"},{url:"/images/leaf.svg",revision:"2922feee76d55282620e68d2936a7f4e"},{url:"/images/lisarising.jpg",revision:"d6f98462edda34f239c655376d9e7afc"},{url:"/images/logo192.png",revision:"ef43e31a14c6f3117a0dc6c924157f4f"},{url:"/images/logo512.png",revision:"b83b814d0c00cec0928ab2af2ec49f5d"},{url:"/images/policeinteractionsenglish-thumb.jpg",revision:"b292c9c4c03a1a7cf5b3d576109618f4"},{url:"/images/policeinteractionsenglish.jpg",revision:"0db4b071317d97b02bd663e3aa160280"},{url:"/images/policeinteractionsspanish-thumb.jpg",revision:"659e587102aff4f9ea56a7879467a4f7"},{url:"/images/policeinteractionsspanish.jpg",revision:"1a3425919bf2dc79b2b5207cb795bab5"},{url:"/images/questionedenglish-thumb.jpg",revision:"e2ea39568d4b77d5215daee358edcb8c"},{url:"/images/questionedenglish.jpg",revision:"7818e2a4f585bd9861bdfa37ba40a019"},{url:"/images/questionedspanish-thumb.jpg",revision:"6002a80e179792925911ba0afeb18f0d"},{url:"/images/questionedspanish.jpg",revision:"f1bbe2ca7595bb916a0a2e9c82b84a53"},{url:"/images/recresources_placeholder.png",revision:"c31c3074cdb47c6f6ad43f035c7a2c75"},{url:"/images/resourcesforwomen_placeholder.png",revision:"7e79974bded9170caa85a8504d742ddc"},{url:"/images/sb1421-thumb.jpg",revision:"9f2abc0ce920f39699d8b8eef5250a9d"},{url:"/images/sb1421.jpg",revision:"ecaac9b012299e6d101cad8563c1a031"},{url:"/images/sb54-thumb.jpg",revision:"7d7e4f92685e7fc953dc017f166f649e"},{url:"/images/sb54.jpg",revision:"9636d6c4bbf29227a0a1ff62a443231e"},{url:"/images/thriveleaffavicon.svg",revision:"07ee855cbeb5b53f05242792c7c97919"},{url:"/images/trainsandbusesenglish-thumb.jpg",revision:"a2df76895d0cad482820d54582c3f448"},{url:"/images/trainsandbusesenglish.jpg",revision:"84b44c51e3f55409cced19eee071bd63"},{url:"/images/trainsandbusesimmigrationenglish-thumb.jpg",revision:"df8a56e6b9a57e582aef7c7eb35e57d9"},{url:"/images/trainsandbusesimmigrationenglish.jpg",revision:"1f8048b3ac372dd4f34d6aeed4a34bfc"},{url:"/images/trainsandbusesimmigrationspanish-thumb.jpg",revision:"59ee991679b9c6c206bbe782b611b0df"},{url:"/images/trainsandbusesspanish-thumb.jpg",revision:"19ac479ac45b2f8e77f6cf5480bb5ba6"},{url:"/images/trainsandbusesspanish.jpg",revision:"63097fb1f6833d85ed900aa920780003"},{url:"/images/trust-thumb.jpg",revision:"ad507d09c1cbed8461de712381b8fdad"},{url:"/images/trust.jpg",revision:"121205d8e0f07493abeea749bbbd3903"},{url:"/images/wheretostart_placeholder.png",revision:"079b3bb345705bc1a4638d9ab6f779a7"},{url:"/manifest.json",revision:"c75d047411a92248f590ef1028b0f043"},{url:"/robots.txt",revision:"5527fc5da99d42ccbb47415702e237ac"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
