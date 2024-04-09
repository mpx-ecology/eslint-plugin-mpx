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
    "revision": "a4c51911bd7b39f803cc89c055df74e8"
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
    "url": "assets/js/12.e3c69e11.js",
    "revision": "efde0b50775f429783b6076505b2da41"
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
    "url": "assets/js/29.8b41cf37.js",
    "revision": "26c6dfcb521749d3d2af66d52b0e7131"
  },
  {
    "url": "assets/js/3.63cb8557.js",
    "revision": "67337699c1013f821beb4e3a57526af3"
  },
  {
    "url": "assets/js/30.be72f977.js",
    "revision": "f4153f91391737c93b0436d611ebbe0d"
  },
  {
    "url": "assets/js/31.31218dcf.js",
    "revision": "8476f04901f27564cebe151b611b7cad"
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
    "url": "assets/js/38.f11e3ec4.js",
    "revision": "e18a6ca32a6e46cf14e438ea0def315e"
  },
  {
    "url": "assets/js/39.55def506.js",
    "revision": "a5478234cd61d12f987e77934cbf3de1"
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
    "url": "assets/js/53.45166a9b.js",
    "revision": "6222b9658b08f72b95362e00e2fd5164"
  },
  {
    "url": "assets/js/54.2654d52e.js",
    "revision": "5439bf1bf2a5784cf9afa0e671b3830b"
  },
  {
    "url": "assets/js/55.cb5f7cc6.js",
    "revision": "a31d90992e36241ac1ddbcda270f895f"
  },
  {
    "url": "assets/js/56.59cc68f7.js",
    "revision": "f6574f9f40d243e79d6e2b8ab1fc39c8"
  },
  {
    "url": "assets/js/57.85291995.js",
    "revision": "cf78acd52b5391bdc7073b01a77abb14"
  },
  {
    "url": "assets/js/58.759108a6.js",
    "revision": "9b0c086d6e6a8bb4aff19ea6306d5f5f"
  },
  {
    "url": "assets/js/59.4e3699bd.js",
    "revision": "1fa90c4e6702ca683ec9862581cfe6cb"
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
    "url": "assets/js/app.fb4c0e4e.js",
    "revision": "58c79d8c8e7c92e5f272ca3b9c3e4b85"
  },
  {
    "url": "assets/js/vendors~docsearch.efd2ce5e.js",
    "revision": "8695fac742b09003073ea349ea23b24a"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "a28ae0be80eee186858bee4faef7c88e"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "d442f0076df45d3057fd30cba79492c3"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "a1a3a80d9565d0b025252a216b4e140e"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "1db33c024d5b6e7ec882f6041bdd7a9c"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "f5c0bfb3c10c637344e05477a34782d3"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "933a7f9063ca280c73cd98d85ef8db62"
  },
  {
    "url": "rules/index.html",
    "revision": "9b45c8ff06b184970c4d58b7425e7081"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "b8be2130fadff5993c454f64adbc868c"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "4613f035ecbac41c89372381389357ca"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "6c174a1362318ad162d675633ccf9c80"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "2d9bfa6ad2e478b83e167b893df93684"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "aa27964d65e35f2b24a1c6a33a24a69b"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "01725565739766fa12a09125667eef59"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "fd817dab509e112a6c821cf76f0e2a3b"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "cde6ca13e42909333826242a6f9b1227"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "48f45fa0cfbf9d6e8a7ef379b857237a"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "7735b4a7c72da8f44ea9e467da22eb31"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "b9572c9cd570d0e19ab88b27b5ec3836"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "ce52b9f8818d82a87c59530cc539a8a1"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "5fa03e97625f7cfadb30e9adb8ba9caf"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "c7b244acacab3cd6883085e1864373c5"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "4b5ae53e76b937a4060dd1a64517d35b"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "dddc14c2cd54d2e47a181530e60305cb"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "06af65cc738f8135d3319d58a13de4a1"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "c1e2c383605f80a796d146d556721434"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "e973f6e11543b0468a2c0013dfd2e547"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "cf251a4b651914f45bb66e56b9cfc23b"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "2e39104bd5a17b51c8f760ac6ed953e0"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "f4bcd85eb536c52ad777627fd6d3b01e"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "4ce29e55105d586c39b743840b87ba57"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "7eeb93da6c1f5f3b23bd4623dfb2b1b4"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "89d6714752c78de7be8fef5e4dc3e5c7"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "a26cbbc3402f1a7df2c2d9f89942ec3b"
  },
  {
    "url": "user-guide/index.html",
    "revision": "69bbccd3f6716550bc835901e2fef7eb"
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
