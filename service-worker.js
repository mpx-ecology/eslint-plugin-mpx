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
    "revision": "ed419e6f30734551d8b4eb33f5f4237b"
  },
  {
    "url": "assets/css/0.styles.9abde31e.css",
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
    "url": "assets/js/1.2a6cc3b8.js",
    "revision": "bd3638c5ab0c0c2b6518e210c7e812fe"
  },
  {
    "url": "assets/js/11.045e82c8.js",
    "revision": "159c54cf61aa58391b66d7a68697bc9a"
  },
  {
    "url": "assets/js/12.1d4a292a.js",
    "revision": "e58f35eb1f44bfe997f87c2c1c41086f"
  },
  {
    "url": "assets/js/13.cbec346c.js",
    "revision": "807b1382c49e90f697949a2c6f181a9b"
  },
  {
    "url": "assets/js/14.9e7e51c1.js",
    "revision": "8083dfabd9a89d7662253c21cc6faa31"
  },
  {
    "url": "assets/js/15.158b9bb5.js",
    "revision": "df4a99fe41ca526726d30c62b712dfc8"
  },
  {
    "url": "assets/js/16.8830e73a.js",
    "revision": "61ee74bab9010ac6f4beeaeba1e54c9b"
  },
  {
    "url": "assets/js/17.ce8da5ca.js",
    "revision": "a5db49dce5f44f5650d70c4b73332962"
  },
  {
    "url": "assets/js/18.f7fa4888.js",
    "revision": "c4f82762d3d13632d8835e9e36d141cd"
  },
  {
    "url": "assets/js/19.fc28e1a3.js",
    "revision": "fc7467963d47c633c87a07e6d12c4908"
  },
  {
    "url": "assets/js/2.5fbb3ed0.js",
    "revision": "7c8583b741d8e208ba359d11531c86c5"
  },
  {
    "url": "assets/js/20.f79e8089.js",
    "revision": "f0162e0e50054740c4832520e38d512e"
  },
  {
    "url": "assets/js/21.840b1623.js",
    "revision": "8c4ebe79fd2d8041446b531517d558d3"
  },
  {
    "url": "assets/js/22.0f70b794.js",
    "revision": "743fd9608b9c6b2307987e4e4f3bbfa2"
  },
  {
    "url": "assets/js/23.54707976.js",
    "revision": "d1a1e1f29c01139a27265f0f0db1dc20"
  },
  {
    "url": "assets/js/24.60fa6ed7.js",
    "revision": "e81998b01bccb2b2e4aeb0e69f4ed190"
  },
  {
    "url": "assets/js/26.ea41cc2e.js",
    "revision": "cf6d36a99bce5728efa89562ade9136e"
  },
  {
    "url": "assets/js/27.9d4bf7d0.js",
    "revision": "57bffaf1666feac7e6944f60d552be92"
  },
  {
    "url": "assets/js/28.494cb3f9.js",
    "revision": "24ab26e6265c25ff90a716c9ca4477fa"
  },
  {
    "url": "assets/js/29.b48a3b2d.js",
    "revision": "681ce696897fa36bd69f58876fcd01c7"
  },
  {
    "url": "assets/js/3.034a95db.js",
    "revision": "755900e2ff5644b90e7e2035817cbbd1"
  },
  {
    "url": "assets/js/30.427b686d.js",
    "revision": "4f87a58711bc9891a717e57a7dd60f2e"
  },
  {
    "url": "assets/js/31.291e24f4.js",
    "revision": "fb5834a6d37e58fb4543d8c85ded56ed"
  },
  {
    "url": "assets/js/32.a2f5809a.js",
    "revision": "f26fdcc72e42ffcd545a1a3c56ff1699"
  },
  {
    "url": "assets/js/33.a8c6147f.js",
    "revision": "51c9a59dd0e697aac4e68c20e6c6fc7c"
  },
  {
    "url": "assets/js/34.85963ce9.js",
    "revision": "c363755215a4081f91e898b8074ddab3"
  },
  {
    "url": "assets/js/35.8fe4284d.js",
    "revision": "6f5fa6fe45bf133f087f8995b67934ac"
  },
  {
    "url": "assets/js/36.c69ba5d6.js",
    "revision": "647a2b77d93c7db5045c7a61284aeed2"
  },
  {
    "url": "assets/js/37.160b28dc.js",
    "revision": "ee4690c86e9afae9d770525f8a536490"
  },
  {
    "url": "assets/js/38.1f2e8d0c.js",
    "revision": "f91edcb06fa4a4c531e327884c74d291"
  },
  {
    "url": "assets/js/39.81264d26.js",
    "revision": "38dd799faa64e51de40488b3c4e376ff"
  },
  {
    "url": "assets/js/4.b707e725.js",
    "revision": "d831f1839d911938c6176c077216f4f8"
  },
  {
    "url": "assets/js/40.29f70a3a.js",
    "revision": "f5271d25302029afcedb1962a615c81d"
  },
  {
    "url": "assets/js/41.6335d2db.js",
    "revision": "29021731f6280d164df9ac908570854e"
  },
  {
    "url": "assets/js/42.a18c23ea.js",
    "revision": "49d08c5e731a557347cb9083d1858283"
  },
  {
    "url": "assets/js/43.df2180d3.js",
    "revision": "5f3e1ae3899012cf12679b25f3a14fcd"
  },
  {
    "url": "assets/js/44.73e5081a.js",
    "revision": "432198977a046b39b553b29b8be84aaa"
  },
  {
    "url": "assets/js/45.56fe9cb5.js",
    "revision": "b2237e2414e62fde178810f45b82ae0c"
  },
  {
    "url": "assets/js/46.7ddacf03.js",
    "revision": "92c38f12c9854e059b9f55715dbcf052"
  },
  {
    "url": "assets/js/47.8f4667b6.js",
    "revision": "2c5c75435dc11094842c6155659e3f43"
  },
  {
    "url": "assets/js/48.3582f53c.js",
    "revision": "cf3a5c051ecfa369e029ed9225dabc2d"
  },
  {
    "url": "assets/js/49.26f6b3bb.js",
    "revision": "b1cedfdbc62e3fad046c5088421394a0"
  },
  {
    "url": "assets/js/5.23c4b5e8.js",
    "revision": "982333f4a2cee390138f1fccdebb627a"
  },
  {
    "url": "assets/js/50.7915501e.js",
    "revision": "b27d4729910ba9f7432853ac44d10951"
  },
  {
    "url": "assets/js/51.691d4884.js",
    "revision": "bb03f3f98337bcce18774a1e72f75ba8"
  },
  {
    "url": "assets/js/52.8de9c8dc.js",
    "revision": "059435a9aaebd5e73534dbe2e4eb4874"
  },
  {
    "url": "assets/js/53.07385f29.js",
    "revision": "b3f614e9a9b3a7ebb0afb0e2a781c94e"
  },
  {
    "url": "assets/js/54.d9d3c4e5.js",
    "revision": "283059d74a290ef766b5334df9976c49"
  },
  {
    "url": "assets/js/55.c935066c.js",
    "revision": "58179b8b052ca2f650c8d9eb7cdf5055"
  },
  {
    "url": "assets/js/56.7ebc29c7.js",
    "revision": "ad03912703ef0eba9dcfad080b3cea1f"
  },
  {
    "url": "assets/js/57.8349e343.js",
    "revision": "45d79fbb4a06596b21da396aa24a17ab"
  },
  {
    "url": "assets/js/58.29deb023.js",
    "revision": "7ba154a692241406fc56ba6b8ed3dead"
  },
  {
    "url": "assets/js/59.d3f3db34.js",
    "revision": "6dbba56699994ce230375c1c8e8c6a1d"
  },
  {
    "url": "assets/js/6.d4bdabae.js",
    "revision": "53f189ad9a728434665f7c2001cfbbc5"
  },
  {
    "url": "assets/js/60.102fd309.js",
    "revision": "fdb1d9af98664d975cfedd7ae50abf5e"
  },
  {
    "url": "assets/js/61.b8b54c07.js",
    "revision": "a8e426022593585649d9d3867af289bb"
  },
  {
    "url": "assets/js/62.b6567a84.js",
    "revision": "2400cda0cbacf95ed73978002791284f"
  },
  {
    "url": "assets/js/63.ad20d61f.js",
    "revision": "88c7bbbc2f1da7fba04262a205c4f49a"
  },
  {
    "url": "assets/js/64.8f9fdc95.js",
    "revision": "e4ca4c99fddfd51f1b9c4b2d811b0480"
  },
  {
    "url": "assets/js/65.7b652b22.js",
    "revision": "9d25d32fb78277ae4ddd7809974f0aa9"
  },
  {
    "url": "assets/js/66.427b70a1.js",
    "revision": "f6a90f103be59e222d341ca940c2a02c"
  },
  {
    "url": "assets/js/67.a3c9b0cb.js",
    "revision": "f7ef97e44727d3f177619f3de1281ec4"
  },
  {
    "url": "assets/js/68.3563ac84.js",
    "revision": "114407e871145d0e597d21c2a964ec22"
  },
  {
    "url": "assets/js/69.4ab86529.js",
    "revision": "9f86c4f081edd90dc59a90a157a945fd"
  },
  {
    "url": "assets/js/7.cfcb6783.js",
    "revision": "af403cd12af669b8a9fe81d712b1b746"
  },
  {
    "url": "assets/js/70.f1fec1c4.js",
    "revision": "7e375cdd7adea16bb6d3af5bbfe120ff"
  },
  {
    "url": "assets/js/72.cdcd15a6.js",
    "revision": "70d550adc82f6f0f57a3552d20234ae9"
  },
  {
    "url": "assets/js/73.d9cdd1da.js",
    "revision": "a4a105e9d6459e93127f274560d47ae2"
  },
  {
    "url": "assets/js/8.8403ee8a.js",
    "revision": "aa964fe5d651b57d3585c22e38aadaf8"
  },
  {
    "url": "assets/js/app.b0ce0443.js",
    "revision": "d9aa10f195cc17ad59b06e761de7db75"
  },
  {
    "url": "assets/js/vendors~docsearch.b3d1c3df.js",
    "revision": "423190c60be3e657798c99e27755ca91"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "ad0f4dfcf6e1e6b41214f5d80439e831"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "1e50cea359e2db68f2fe6bb8ef981163"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "e2320a1ad9ea9835401c22d36526fb8b"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "9cf93ec4415d957f8d2421b603646cad"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "e58c467d5f2192bafd7ad810f7b8662d"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "70304b1beae8d9caf2d5791f6b21315b"
  },
  {
    "url": "rules/index.html",
    "revision": "8b352d766e0a59f6c27ae2ac608f6127"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "76445f5da7c64704ad610cd937694c77"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "5bf1b5b7ff33225578a3def1333eb323"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "f64bf1ed8e87e500e685da8b1f4ef328"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "926d16cbed7baa5b4151fe9cfb743d90"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "e1561b7cdf68698a567a398cd9e79d46"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "147dfb625f9a7492e6c0a09f050ee31a"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "70c81e94eccd53949103d8fc47ab87e8"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "9c86fac8cfb79e59e59b534fa69cf272"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "2bdbd0ca679e2f0c929cac5357d33538"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "a7031c48c72cb7610a711b9e1ab45496"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "8ad0ffee05ae83ef74f9e41863fda6a2"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "aa7bd64bb720983c3919a68ce4708571"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "d83a99bb32c92b9f3593d4f4f79fbfdd"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "29dbd9ddaae2c86853104797161a200b"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "edbc835b3e67ed242069b28baad42bdf"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "6cc2c68c3925bf814cdef84c34f04d0b"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "9bceca709cd7477b101c122b59e44d60"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "04a4b313b924f9f1fc03e55bbc6eab0f"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "46b4192bbf564b3d162d256ff21ffb0c"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "9d8b21b03bd8453d41a411c745beeb47"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "cca401b6813cfa146b8d03ffc5f97de2"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "80dfa6f6601fc50d7e81b93fa5e0a803"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "455e59285343bd87829faffc03c20fe0"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "4c2e88a6e117ac12ff9a5793457112d2"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "dddf8827a6217e7ff9f5a2092d93c5a3"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "436113dac2c27830f73f8e9e6b5af583"
  },
  {
    "url": "user-guide/index.html",
    "revision": "5642a7da21548bc9606eff279ae9f3ee"
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
