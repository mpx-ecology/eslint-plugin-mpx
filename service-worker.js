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
    "revision": "a2d15cebcdc3ab06b75b69edfce5b420"
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
    "url": "assets/js/29.0e02ef4f.js",
    "revision": "febeed90236357cf3f2e1943086be84e"
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
    "url": "assets/js/34.9fe8f05f.js",
    "revision": "052518e89b7729646eb6d9c6da217e24"
  },
  {
    "url": "assets/js/35.febb4902.js",
    "revision": "84b2f8509b781bc5a7733a29d861b8c8"
  },
  {
    "url": "assets/js/36.8815296c.js",
    "revision": "0c60d5b91461fdee823c682d47d74e16"
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
    "url": "assets/js/42.03a40db8.js",
    "revision": "5d613adfd0707d64824cb975b7558907"
  },
  {
    "url": "assets/js/43.b3701afb.js",
    "revision": "b0c82383171d910f420e04d41d20c609"
  },
  {
    "url": "assets/js/44.3703f34d.js",
    "revision": "d162ecb20b80aee2f79238c245e10264"
  },
  {
    "url": "assets/js/45.6687da8f.js",
    "revision": "2a72e6f62c82b746952354a6aba6dd7c"
  },
  {
    "url": "assets/js/46.c7d1731a.js",
    "revision": "6a689a4cd679750c99d997d84f73a25e"
  },
  {
    "url": "assets/js/47.26a5fda0.js",
    "revision": "8452530275db9b8a14381c38966fefc0"
  },
  {
    "url": "assets/js/48.3464959c.js",
    "revision": "57e4ba4a98c0d9ce613bf7f6a7ec6b9a"
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
    "url": "assets/js/54.ee5da3c5.js",
    "revision": "c06150ad48a7481e59c987669b733ab9"
  },
  {
    "url": "assets/js/55.52c32e3a.js",
    "revision": "b9b50890b7f34692b05688906c3fc5a4"
  },
  {
    "url": "assets/js/56.adca06f6.js",
    "revision": "e1c758f24f25f5f5f83b689277ad75e8"
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
    "url": "assets/js/app.d978364a.js",
    "revision": "705126fd609b24dec3699b6a0acb8c19"
  },
  {
    "url": "assets/js/vendors~docsearch.efd2ce5e.js",
    "revision": "8695fac742b09003073ea349ea23b24a"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "3dab04cdf8db8ae5a3784456ade05284"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "5bfa4f6387391f03ebb2b61a9e68cca6"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "4e004592a4d204848f9b2949653489dd"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "b40f20d0f8c63d3cc1b75f618cde773a"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "913394ecf5115022d03197cc4b661d1c"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "75f245d60a0d6cefb2754481eab38431"
  },
  {
    "url": "rules/index.html",
    "revision": "24f8a1b25697bdff5adf1d79aa0b118e"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "cab28a8be674a5be0c91a7fc490270b1"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "cfe3ac4c3c4c345647ed0f9ad6596f11"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "2b09dc0e415f01f54531264b1e3eeaaf"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "8c47d8c876a9850d3971d19eb4ff91f8"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "6e82cc5cd04d52bb336c2c41d42aeb24"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "5f09edac4bf52de61bb7ff8d7d5d739a"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "9fb5fba1ce6951d425f5c799e212653a"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "286e40c6c015090c51e8329150322517"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "731d02162e348047590d8ff58dae45ba"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "43b9743862b1f3833d854cf4efcac482"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "433c070ce307feea9bd683d320783cf6"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "c702b7e9344ae62ebb350ec18948aa68"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "5742e368140f9960915aa4a9dba2007c"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "e68aec26e76f774d1425d5c960124c2c"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "9e4d517061bf1d2272225b365527058b"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "ca07b4a66e9ec3f948b46c37ae5f1b6a"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "96fec9f88ae1a31b2dd78f98b6f19451"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "db6664e292ba7b2f6aa0f78160b5bb58"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "df3060e10bf01713dfa6a7b61aa25170"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "74cb8254ba44da188159065649c2f1c8"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "5f1b460451eef39a58ce286b136085a0"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "a35c99a4a48e695d503ff2e9cb03d209"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "057dede673e573fa5056737cef6cbfea"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "cdd7016620b612c80dc3189bc48dbbc9"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "71eb3661d45efd27580eaed007f65a80"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "7541560c9d8c16802863f8ad980c6d95"
  },
  {
    "url": "user-guide/index.html",
    "revision": "d56aad60f094d7c08d214dae15287f5f"
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
