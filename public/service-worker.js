if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return i[e]||(s=new Promise((async s=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=s}else importScripts(e),s()}))),s.then((()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]}))},s=(s,i)=>{Promise.all(s.map(e)).then((e=>i(1===e.length?e[0]:e)))},i={require:Promise.resolve(s)};self.define=(s,c,a)=>{i[s]||(i[s]=Promise.resolve().then((()=>{let i={};const r={uri:location.origin+s.slice(1)};return Promise.all(c.map((s=>{switch(s){case"exports":return i;case"module":return r;default:return e(s)}}))).then((e=>{const s=a(...e);return i.default||(i.default=s),i}))})))}}define("./service-worker.js",["./workbox-a8b10d99"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/Q5RM1VdzgcksydNNbpgUq/_buildManifest.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/Q5RM1VdzgcksydNNbpgUq/_ssgManifest.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/133-ed2771728277cbcc6e88.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/160-af39e0a5b637bbaee3bd.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/288-4ecf06e31b29dc78bcc0.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/2c796e83-2c91fb60f0cae8565ee5.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/302-4d8cae4798b71787407a.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/564-64fa8ef814a0f7ff704a.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/597-0bfa01ff1b1f17a2fff4.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/695-2f1e2783cb0dd6f77944.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/720-2558210d06c302311396.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/782-d51a4a9281b298cfc9bb.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/809-8d92abd05b6877db99c2.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/framework-bcff161801c5e0d1b5c5.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/main-7713a1ef2965e1d091b8.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/%5Bcategory%5D-71b51d1e9bab480e120d.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/%5Bcategory%5D/%5Bid%5D-980fc1bfb07d504774ee.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/_app-c8b580cf378dd42dceb9.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/_error-1e351666d6f616487cb4.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/aboutus-e699339dba86da1a6558.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/addyourorg-1a0ed8ea1a6b2094fccc.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/checklist-d318aaefab1dab116f74.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/index-b0089c9a2a7efc20b514.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/knowyourrights-c624d4c3df2fdf01c182.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/letushelp-e914dddb58dd92f2263b.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/letushelp/%5Bcategorypage%5D-32dc7c8bce4089301697.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/letushelp/diversion-ea65a55d4298a39df6f6.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/letushelp/diversion/apply-d6b1c6829984656b79ae.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/letushelp/diversion/areyouaclient-1df4f5b003c4afb7ef47.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/search-a8feb268baaab2654131.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/search/%5Bid%5D-f890c00b73a485729f41.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/pages/successstories-ca82a57950f0d769711b.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/polyfills-8683bd742a84c1edd48c.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/chunks/webpack-e77b9728fcfb9cb1f366.js",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/css/be248a74b46bd17daeac.css",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/_next/static/css/fe1ad75fa642d8594ca6.css",revision:"Q5RM1VdzgcksydNNbpgUq"},{url:"/icons/clearmyrecord.svg",revision:"9798547610949df408609c0cc76b908e"},{url:"/icons/clothing.svg",revision:"4419302a60a3810c7e8260c8fafabd50"},{url:"/icons/clothing_marker.svg",revision:"d2268457cb214f0c7de578ef22e6f89b"},{url:"/icons/communitysupport.svg",revision:"d7c3c11da3fdca9b87e5c3d8ceeea2e6"},{url:"/icons/communitysupport_marker.svg",revision:"b66b8deb51ff57badff1162995a43fce"},{url:"/icons/diversion.svg",revision:"8386b9abe5d85d70f662fe16305d62e0"},{url:"/icons/documents.svg",revision:"b85c56c5c14de0c48ce3f8c1b25e60a0"},{url:"/icons/documents_smaller.svg",revision:"7970c5236df257648a68045ba6a55899"},{url:"/icons/employment.svg",revision:"dfe1a2f24203f24ee928b3c8b4cbb8b5"},{url:"/icons/employment_marker.svg",revision:"398a2ee7f6bc0584268898c6ebc3f4b8"},{url:"/icons/familyresources.svg",revision:"89723a7be4cba21309789b6e710e3e85"},{url:"/icons/food.svg",revision:"870150320e82442c0086afe1a85f6178"},{url:"/icons/food_marker.svg",revision:"0d48e2b0181ead6e4ff2d97c03de7968"},{url:"/icons/housing.svg",revision:"19384cd3084c61e5f35891f6185bccb9"},{url:"/icons/housing_marker.svg",revision:"b3ae5b23b477da0cecd3b1c7c426f14f"},{url:"/icons/legalservices.svg",revision:"8d43313bd9e4a98c8b5a0627fd18f09e"},{url:"/icons/legalservices_marker.svg",revision:"ff37c906c205b0e30402ed1876ad04dc"},{url:"/icons/legalterms.svg",revision:"705e4ec2670abf98a6e6e36c22113279"},{url:"/icons/markericon.svg",revision:"29f38197a1f2259e79a088c4898ff07c"},{url:"/icons/medicalsupport.svg",revision:"f5116b9a34440c5be5d5d16296933596"},{url:"/icons/medicalsupport_marker.svg",revision:"f0cfa0efe0ba336c5f45ee96b2d4c573"},{url:"/icons/mentalhealth.svg",revision:"713733fc2e537ab6f277f6eed9a46c06"},{url:"/icons/mentalhealth_marker.svg",revision:"44a244bedffd47f2fb0e03bffd96bbc0"},{url:"/icons/phone.svg",revision:"6c91914c08bf01176796e958d3398803"},{url:"/icons/prearraignment.svg",revision:"2d44dac94a5e0df6de5584cfdc9d400a"},{url:"/icons/recommendedresources.svg",revision:"95fa18940cfbf2b40e39a08225279c86"},{url:"/icons/resourcedirectory.svg",revision:"806ba2c77da4150655e66a3da77e7ef1"},{url:"/icons/resourcedirectory_marker.svg",revision:"665f0f99453c4a635586f7ebdc8d3464"},{url:"/icons/resourcesforwomen.svg",revision:"0a5440836da1902fca2af6eb7731f890"},{url:"/icons/search_marker.svg",revision:"2b40e0c738582fa4d91c242c51402c0f"},{url:"/icons/socialservices.svg",revision:"a65be8fa438961bf741a59b87a70a431"},{url:"/icons/socialservices_marker.svg",revision:"31258b77d9a230542d44a55cfe760114"},{url:"/icons/substanceuse.svg",revision:"5d55735c0e700f17055770d489a3042b"},{url:"/icons/substanceuse_marker.svg",revision:"78a312475096be07a73b719609be855a"},{url:"/icons/transportation.svg",revision:"b75bb929bd72ba366d1dae8d91e6e463"},{url:"/icons/transportation_marker.svg",revision:"ee338d368b7d45b1e3c45370b5906e2e"},{url:"/icons/treatmentcourt.svg",revision:"94f8beb19de0332db92bce0a217a6d15"},{url:"/icons/treatmentheart.svg",revision:"4ff4ff55ad94d5a5bae1b5efd49edd6e"},{url:"/icons/user_marker.svg",revision:"a2581546016a331a4f883a3cb6c214ea"},{url:"/images/blackandbrownenglish-thumb.jpg",revision:"919be51b33145d29aa95546921b1d3bd"},{url:"/images/blackandbrownenglish.jpg",revision:"206547992a7bf0ffe70afa8fd835963a"},{url:"/images/blackandbrownspanish-thumb.jpg",revision:"9d8c08614ad40b05785d5f94079fedeb"},{url:"/images/blackandbrownspanish.jpg",revision:"16d49c61a774b1ffe96fc022ce2a22a2"},{url:"/images/cheech.jpg",revision:"3ad1f86ebe01cd250fa8094fc7e9df7a"},{url:"/images/favicon.ico",revision:"21b739d43fcb9bbb83d8541fe4fe88fa"},{url:"/images/heart.svg",revision:"6c2644343802b7f7649c53c4bc803ebc"},{url:"/images/ladders.png",revision:"289a35c4cc48d1ae0934378742e936bd"},{url:"/images/leaf.svg",revision:"2922feee76d55282620e68d2936a7f4e"},{url:"/images/lisarising.jpg",revision:"d6f98462edda34f239c655376d9e7afc"},{url:"/images/logo192.png",revision:"ef43e31a14c6f3117a0dc6c924157f4f"},{url:"/images/logo512.png",revision:"b83b814d0c00cec0928ab2af2ec49f5d"},{url:"/images/policeinteractionsenglish-thumb.jpg",revision:"b292c9c4c03a1a7cf5b3d576109618f4"},{url:"/images/policeinteractionsenglish.jpg",revision:"80d4517b9d3008a64d9efdd145cb4514"},{url:"/images/policeinteractionsspanish-thumb.jpg",revision:"659e587102aff4f9ea56a7879467a4f7"},{url:"/images/policeinteractionsspanish.jpg",revision:"4015398d257d1fdd81eee880e35b09d7"},{url:"/images/questionedenglish-thumb.jpg",revision:"e2ea39568d4b77d5215daee358edcb8c"},{url:"/images/questionedenglish.jpg",revision:"7c2bf897afd451612587928ccb9ca313"},{url:"/images/questionedspanish-thumb.jpg",revision:"6002a80e179792925911ba0afeb18f0d"},{url:"/images/questionedspanish.jpg",revision:"c14d00e8f22f70d0956d901d2b7b83eb"},{url:"/images/sb1421-thumb.jpg",revision:"9f2abc0ce920f39699d8b8eef5250a9d"},{url:"/images/sb1421.jpg",revision:"05869667f518823d76d9fee7f000332d"},{url:"/images/sb54-thumb.jpg",revision:"7d7e4f92685e7fc953dc017f166f649e"},{url:"/images/sb54.jpg",revision:"2820d448f0761125b809e7f18ace797e"},{url:"/images/trainsandbusesenglish-thumb.jpg",revision:"a2df76895d0cad482820d54582c3f448"},{url:"/images/trainsandbusesenglish.jpg",revision:"e4dff394e061f321d831f966b5b9b863"},{url:"/images/trainsandbusesimmigrationenglish-thumb.jpg",revision:"df8a56e6b9a57e582aef7c7eb35e57d9"},{url:"/images/trainsandbusesimmigrationenglish.jpg",revision:"112ab7527ddac1ec05d06a86495e0642"},{url:"/images/trainsandbusesimmigrationspanish-thumb.jpg",revision:"59ee991679b9c6c206bbe782b611b0df"},{url:"/images/trainsandbusesspanish-thumb.jpg",revision:"19ac479ac45b2f8e77f6cf5480bb5ba6"},{url:"/images/trainsandbusesspanish.jpg",revision:"24d795dac10c7bb3b25ae8e37811c4c3"},{url:"/images/trust-thumb.jpg",revision:"ad507d09c1cbed8461de712381b8fdad"},{url:"/images/trust.jpg",revision:"60b3bbb71d66f585dc3810bb96551a06"},{url:"/manifest.json",revision:"c75d047411a92248f590ef1028b0f043"},{url:"/robots.txt",revision:"5527fc5da99d42ccbb47415702e237ac"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[new e.ExpirationPlugin({maxEntries:1,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/\/api\/.*$/i,new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET"),e.registerRoute(/.*/i,new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400,purgeOnQuotaError:!0})]}),"GET")}));
