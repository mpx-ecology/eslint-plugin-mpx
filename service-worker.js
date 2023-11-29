/**
 * Welcome to your Workbox-powered service worker!
 *
 * You'll need to register this file in your web app and you should
 * disable HTTP caching for this file too.
 * See https://goo.gl/nhQhGp
 *
 * The rest of the code is auto-generated. Please don't update this file
 * directly; instead, make changes to your Workbox build configuration
 * and re-run your build process.
 * See https://goo.gl/2aRDsh
 */

importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * The workboxSW.precacheAndRoute() method efficiently caches and responds to
 * requests for URLs in the manifest.
 * See https://goo.gl/S9QRab
 */
self.__precacheManifest = [
  {
    "url": "404.html",
    "revision": "65a5c9a2100f7bc8f6f29aa37bf330e2"
  },
  {
    "url": "assets/css/0.styles.2357fc93.css",
    "revision": "950be5ec2db7dd339276be4defb82031"
  },
  {
    "url": "assets/fonts/codicon.a609dc0f.ttf",
    "revision": "a609dc0f334a7d4e64205247c4e8b97c"
  },
  {
    "url": "assets/img/search.83621669.svg",
    "revision": "83621669651b9a3d4bf64d1a670ad856"
  },
  {
    "url": "assets/js/1.b8afc1e0.js",
    "revision": "793a2c26b4b3e2f0d3aeae67f4432f3b"
  },
  {
    "url": "assets/js/11.8e754e3f.js",
    "revision": "c28c703712d4ad587c44c448cb6bf38b"
  },
  {
    "url": "assets/js/12.de215621.js",
    "revision": "6a7e9075f42c631435e812ee8630fe8b"
  },
  {
    "url": "assets/js/13.7de661c0.js",
    "revision": "f75c1db6f99f5a615daaed90488fa42c"
  },
  {
    "url": "assets/js/14.badd04d3.js",
    "revision": "828c05997a528e7daf256f4be68df74a"
  },
  {
    "url": "assets/js/15.6f34221b.js",
    "revision": "f8a10253233a0cea5bf0b5f257822c44"
  },
  {
    "url": "assets/js/16.025fc5c9.js",
    "revision": "93dc93b21ca8b7e4ad69041252a05376"
  },
  {
    "url": "assets/js/17.94dd737c.js",
    "revision": "91c4e0f9b85b847bbb9db0c125cdafd5"
  },
  {
    "url": "assets/js/18.1c3e6913.js",
    "revision": "1968fe8d21fa5cf083c9ab6b82ce3ef9"
  },
  {
    "url": "assets/js/19.02be5367.js",
    "revision": "db15ea0a8e518ccaad4058f4935db999"
  },
  {
    "url": "assets/js/2.c0388138.js",
    "revision": "fafa4924bd048378146eaa206c153f79"
  },
  {
    "url": "assets/js/20.d68e3b0e.js",
    "revision": "81745cb9a88a6f6c6ab3a52957e7034a"
  },
  {
    "url": "assets/js/21.7c7d5f7d.js",
    "revision": "47a10bea5601e434d307d78e96bf124b"
  },
  {
    "url": "assets/js/22.086b5324.js",
    "revision": "b84ef728acea79bc3f674cdf147f1193"
  },
  {
    "url": "assets/js/23.a77e4647.js",
    "revision": "d1a1e1f29c01139a27265f0f0db1dc20"
  },
  {
    "url": "assets/js/24.dea030fa.js",
    "revision": "a209226afcf2583e6a216d72b4dd4396"
  },
  {
    "url": "assets/js/26.a286d9e6.js",
    "revision": "cf6d36a99bce5728efa89562ade9136e"
  },
  {
    "url": "assets/js/27.f4878ef9.js",
    "revision": "bdd982b1a55bd2bd8344252a4347033f"
  },
  {
    "url": "assets/js/28.d8fe3330.js",
    "revision": "226f750034913ffd0be0e559a7380bac"
  },
  {
    "url": "assets/js/29.ad0c96b3.js",
    "revision": "83625a37a2b6653729018fd5f9db5962"
  },
  {
    "url": "assets/js/3.63cb8557.js",
    "revision": "67337699c1013f821beb4e3a57526af3"
  },
  {
    "url": "assets/js/30.d477553c.js",
    "revision": "cfa1ea531d4958649eb92c1b233037d0"
  },
  {
    "url": "assets/js/31.6e40fe72.js",
    "revision": "7311b67d3670a552bb1992d735a15c14"
  },
  {
    "url": "assets/js/32.eaf654c3.js",
    "revision": "16a24de1bf3fc60a714ce80bc11721dc"
  },
  {
    "url": "assets/js/33.7ad8c066.js",
    "revision": "8fa6a5ecde901590feb8388ff273b49f"
  },
  {
    "url": "assets/js/34.bcbfc99b.js",
    "revision": "cdd2316eb1db5f85efe0b145c33880de"
  },
  {
    "url": "assets/js/35.febb4902.js",
    "revision": "84b2f8509b781bc5a7733a29d861b8c8"
  },
  {
    "url": "assets/js/36.9249a163.js",
    "revision": "0a3089b95ae916c1b8e43743e5b6f853"
  },
  {
    "url": "assets/js/37.675f505d.js",
    "revision": "7c42e66899e9f9566c95d05b66f843b8"
  },
  {
    "url": "assets/js/38.d0f07ef7.js",
    "revision": "8def74ac72affce1c42661524663df59"
  },
  {
    "url": "assets/js/39.35a8a78d.js",
    "revision": "710160ce150c6d19cc39d322acde4967"
  },
  {
    "url": "assets/js/4.c1d34916.js",
    "revision": "d1e09f790f1dd84ced9ebe353e4d46d0"
  },
  {
    "url": "assets/js/40.d9238514.js",
    "revision": "0be0691010412120435f0df4521b8764"
  },
  {
    "url": "assets/js/41.6c581cff.js",
    "revision": "fc38e145dede98f39045170a87f71ac2"
  },
  {
    "url": "assets/js/42.9043a5ac.js",
    "revision": "9cce9f0c97e9e005d3f61ee177123f9e"
  },
  {
    "url": "assets/js/43.317d0d7a.js",
    "revision": "9a7513a3ab877fd5a91e13d14c4ab0e6"
  },
  {
    "url": "assets/js/44.2703dc24.js",
    "revision": "7ca771f623208cdf657d2f315c663dc1"
  },
  {
    "url": "assets/js/45.133dbb2b.js",
    "revision": "fd3d809cdbab59f1d8f22c1d657180cb"
  },
  {
    "url": "assets/js/46.c7d1731a.js",
    "revision": "6a689a4cd679750c99d997d84f73a25e"
  },
  {
    "url": "assets/js/47.721c6d36.js",
    "revision": "b1adc13d8e0c2a3f1afb740dc906a001"
  },
  {
    "url": "assets/js/48.c5952fde.js",
    "revision": "e5d1fc426b80e4706610678f8ac0ba80"
  },
  {
    "url": "assets/js/49.b9d8ee65.js",
    "revision": "518bbe99f6da24e90652cfcff682b184"
  },
  {
    "url": "assets/js/5.39732ee3.js",
    "revision": "bce019c9e88f55b239c27a493c9c3db9"
  },
  {
    "url": "assets/js/50.02633450.js",
    "revision": "3a90ff30b0ccc398ba70e0eecd39a4b0"
  },
  {
    "url": "assets/js/51.30891937.js",
    "revision": "d58eab293bd1a9655ecf32f79de67421"
  },
  {
    "url": "assets/js/52.522a740f.js",
    "revision": "6a5b311dcbb8dde66a4948049675aa97"
  },
  {
    "url": "assets/js/53.5c46ffc7.js",
    "revision": "7a333cb7a1e1e16790b1297e185ec18b"
  },
  {
    "url": "assets/js/54.78736025.js",
    "revision": "3f8f8a788f3eb8b40de528378ab800ae"
  },
  {
    "url": "assets/js/55.58b27f06.js",
    "revision": "7d8f2d7bd06d8a153c8522e259f4188c"
  },
  {
    "url": "assets/js/56.adca06f6.js",
    "revision": "e1c758f24f25f5f5f83b689277ad75e8"
  },
  {
    "url": "assets/js/57.00be24c0.js",
    "revision": "66c6b91a881c074b76240174325ce30f"
  },
  {
    "url": "assets/js/58.3ebb7da6.js",
    "revision": "bfa4022d9f053727f48ced9880923538"
  },
  {
    "url": "assets/js/59.7f2d8525.js",
    "revision": "83e0c4292a68dd34dd06e8c73d6095fb"
  },
  {
    "url": "assets/js/6.fe03126b.js",
    "revision": "01fc45c9f7919a3d47e0b2b4306cf5b2"
  },
  {
    "url": "assets/js/60.a3598c6e.js",
    "revision": "a33de3a38b6a79f4c79ee142810f84ea"
  },
  {
    "url": "assets/js/61.e7d98de8.js",
    "revision": "86b2a9ac916c11d3490e5903da0c4e9a"
  },
  {
    "url": "assets/js/62.5744fe2f.js",
    "revision": "e42e54df23ebc113110d475ae8f6058d"
  },
  {
    "url": "assets/js/63.957f5624.js",
    "revision": "51f03a679f85a0c2cfc2d0d03ba4e699"
  },
  {
    "url": "assets/js/64.f63199c5.js",
    "revision": "6af0b1cab3ecad56235edad1222a97a2"
  },
  {
    "url": "assets/js/65.e6201efd.js",
    "revision": "b0b0af6339e23d38b68af9aa1b37c117"
  },
  {
    "url": "assets/js/66.b2e6d781.js",
    "revision": "4f114ec50271260b5e643475bc557b65"
  },
  {
    "url": "assets/js/67.d9700bda.js",
    "revision": "2eee52d63bff35150e0426f086c48675"
  },
  {
    "url": "assets/js/68.97e280f6.js",
    "revision": "df92a01b06be1e0019b1186555514c26"
  },
  {
    "url": "assets/js/69.0518c6d2.js",
    "revision": "b1b184cb49fdb0a908e297018116512a"
  },
  {
    "url": "assets/js/7.ba3ddea2.js",
    "revision": "41db7b44c9237e6f9d91835aaa7aace8"
  },
  {
    "url": "assets/js/70.b4be0785.js",
    "revision": "0b9b46c836ce9b4efc51806075fcca1d"
  },
  {
    "url": "assets/js/72.47c58ddd.js",
    "revision": "b6a9e770835f02933727146f6f47088c"
  },
  {
    "url": "assets/js/73.40fcfe76.js",
    "revision": "a67abace7f33468174993f519305ce49"
  },
  {
    "url": "assets/js/8.3d40e5c9.js",
    "revision": "06f516fa36799058faf8c18baadd5c65"
  },
  {
    "url": "assets/js/app.7ea59a4e.js",
    "revision": "ffcd1f6483753926ea689e12f83779f2"
  },
  {
    "url": "assets/js/vendors~docsearch.efd2ce5e.js",
    "revision": "8695fac742b09003073ea349ea23b24a"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "ea28bbda6c547a6de459e2f6d7aa3e25"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "ec24246dd0862bb649579b94ec557c6b"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "c88584a5b0d1e6e3eb18876d5c70a1c9"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "24383aa2742244c0010b6ae808932300"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "deef4a5032988c9d03f23f472383fc1e"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "d32bf68f79596df0f765b63e8f763b56"
  },
  {
    "url": "rules/index.html",
    "revision": "8d7ddedcfd5a6a0476bbda0ea75bf267"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "a3956695749f024c581011b2377cfd89"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "726af74ae51e8042ed81b71e2f59a677"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "d2f54fc1e274cbf5f6447d1d9dceb073"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "43d201e3af79e15a7e324682fb5b6da8"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "fb302603ba212fd36a71db436753638f"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "e5bc0d2e62fd0ead061aba9c2077ff54"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "1708d2690e7b0d661052f7322a563fd5"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "9ed27a2608ed5973b7798a5402c7e202"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "d5002307ebd192628fb4f049c7658026"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "9e6c47306da1c15aab825059c908ce60"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "86d804648a48239dbd18c995d5c2076d"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "47be4add9f7e87ed6ef6a0d0dde0ff10"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "418c5232cc6933fd56341ba34cca2e43"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "d6f6fdbe9e63cb7c03d2ae83a0d29016"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "a2ef5d52c22269535273762a9e1ad55d"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "f3c42b2188fe9424afb764b97e3ab2ce"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "e5aa17a1b778a0ed36a781dc98473883"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "6497f4b9fc96843682c9d5b861470696"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "d3cd78812a70cc6cc2c8e895d56f202b"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "36e9861e1334e193927a182e847a6587"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "b43585ae4a001ff86d201d0b86008e24"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "cbff976da81852ccd3d7682bd3f504c3"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "b0a80592c8bc11b1c13b175c92c63312"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "00805c4ab8c71c2bbe43424ff36421d9"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "38b0948beda56e921770c240208c6634"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "f4488088243061013243c72c9ab90168"
  },
  {
    "url": "user-guide/index.html",
    "revision": "0257099e78a74eb8a5bc4d88880866cc"
  }
].concat(self.__precacheManifest || []);
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});
addEventListener('message', event => {
  const replyPort = event.ports[0]
  const message = event.data
  if (replyPort && message && message.type === 'skip-waiting') {
    event.waitUntil(
      self.skipWaiting().then(
        () => replyPort.postMessage({ error: null }),
        error => replyPort.postMessage({ error })
      )
    )
  }
})
