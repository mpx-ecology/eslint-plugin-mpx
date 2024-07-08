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
    "revision": "f81f9be6b5023aa31c439ea1beca223f"
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
    "url": "assets/js/12.a1067855.js",
    "revision": "1365d1732cb4868a4984d106852f818f"
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
    "url": "assets/js/30.82077040.js",
    "revision": "92d1f4ab7c61d96947b424d8efaee889"
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
    "url": "assets/js/33.3ebc0d85.js",
    "revision": "e0f25b1dcd68f58a070b078319f45238"
  },
  {
    "url": "assets/js/34.e1272079.js",
    "revision": "ae9a25b4a8f37c21c0ad9e6b9f782ab8"
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
    "url": "assets/js/45.324a03f7.js",
    "revision": "6f6a96aee1cf67e3fb9039ef43691c65"
  },
  {
    "url": "assets/js/46.416165df.js",
    "revision": "7e341a92caa46584d49c69d2aa3ef5d3"
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
    "url": "assets/js/52.e10d8209.js",
    "revision": "a8d8d24b6f3bcf36ed2ccc895c0d517c"
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
    "url": "assets/js/55.43f077db.js",
    "revision": "5bf8f4fff5b58b62ab06c5a93e647cc1"
  },
  {
    "url": "assets/js/56.59cc68f7.js",
    "revision": "f6574f9f40d243e79d6e2b8ab1fc39c8"
  },
  {
    "url": "assets/js/57.00be24c0.js",
    "revision": "66c6b91a881c074b76240174325ce30f"
  },
  {
    "url": "assets/js/58.bd479c51.js",
    "revision": "22bea41693bc684d082bedee98ae6a00"
  },
  {
    "url": "assets/js/59.636c5d26.js",
    "revision": "285613a329644a8a77f408cc7e3aa81e"
  },
  {
    "url": "assets/js/6.fe03126b.js",
    "revision": "01fc45c9f7919a3d47e0b2b4306cf5b2"
  },
  {
    "url": "assets/js/60.ba33bd73.js",
    "revision": "a6dd63769d7161883fcb6c56e5fe5b27"
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
    "url": "assets/js/app.35af0d27.js",
    "revision": "18b1198e582fadbbcf39d47648fcd453"
  },
  {
    "url": "assets/js/vendors~docsearch.efd2ce5e.js",
    "revision": "8695fac742b09003073ea349ea23b24a"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "2878ba6311dd61630677348e08cd1632"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "cfac116f48107a2e7f00e95f08b33b12"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "d362481f1274627e8aeb8b0a1eaa7abe"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "afae4f57b9477816ccd592c669f198c9"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "7ac7525519efd4c6e5b027879d4e656b"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "1ea76813fe11e1d3d9e11872387ed653"
  },
  {
    "url": "rules/index.html",
    "revision": "7d6356585b23241ef4627ba94dae4f09"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "85420a6e311d6db375a2b1f41dcea293"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "35270efe774862c420ab24b5b66ef38d"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "7c08a0a1711ea3fd8a70ca159a97cbdb"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "f468000bc9b8460ba24a79b9e3a050d9"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "d6380c56f44e01c282bc35087a063f11"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "31672066fc803c9734d139d16445e0b1"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "d0fd8342bf251e1a7e055b69c33ed684"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "d149862e5d16355fa4f836ec56203a01"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "cfe08aeb72efa79b75355bcef2197bab"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "2752d519ef30fa750e4d7d4c245f3d8f"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "b45b367ef227abcd034d55d0bd524e5c"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "5006b31ac87f26623c176f4a08cdd1de"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "89f9e378874a1a5498164f6175a63e5a"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "22254d77f00bcc3d18d55b8c837b5943"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "c7471f85052f9445bae1dacb1b6db62b"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "f2c6f83c03b2ba1f9a4ceb521883e20e"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "9d097e97cc5c4322815cebe55496dd07"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "df59d081f80a441f7cf10f85124138e5"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "ebb0c73ac71534574a50effea2ab20fb"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "cf794f2554aadffeb6e82ff4442d6478"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "7f44f7c0208577985807b71875212799"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "aaa457804e3f5f0cffa14fc08e7f283c"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "1b3cea6ebb943fc7dff73c2e2eff7895"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "834f9f4bc0c032f764b38da3ac7123f6"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "7522649b8293287064b257b778f846eb"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "b3ddfb10ca350281fd69d5d48c618b1e"
  },
  {
    "url": "user-guide/index.html",
    "revision": "a56c66ca1e346a03124e2fd37ef9adf7"
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
