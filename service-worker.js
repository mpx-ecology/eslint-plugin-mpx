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
    "revision": "85380dc3801f21bb58207c0a8564ef72"
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
    "url": "assets/js/12.cb8320ff.js",
    "revision": "6ae629783506509ac74d4c59bb1a7b3c"
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
    "url": "assets/js/29.9e6e7cb4.js",
    "revision": "f572233b192ba6b8b52eea60db00f462"
  },
  {
    "url": "assets/js/3.034a95db.js",
    "revision": "755900e2ff5644b90e7e2035817cbbd1"
  },
  {
    "url": "assets/js/30.cd2d44ee.js",
    "revision": "cbbf8a64ed7f502d623d97fe91023442"
  },
  {
    "url": "assets/js/31.5a9504d7.js",
    "revision": "fa02356460a88250b7b0abe89825e08a"
  },
  {
    "url": "assets/js/32.02aacb46.js",
    "revision": "907ae41e148b8c99b6c5b711c41107b1"
  },
  {
    "url": "assets/js/33.a8c6147f.js",
    "revision": "51c9a59dd0e697aac4e68c20e6c6fc7c"
  },
  {
    "url": "assets/js/34.849c6ca7.js",
    "revision": "e9bb5a3708db401d9e239e7b3ca25e35"
  },
  {
    "url": "assets/js/35.8fe4284d.js",
    "revision": "6f5fa6fe45bf133f087f8995b67934ac"
  },
  {
    "url": "assets/js/36.40a58e3f.js",
    "revision": "cff407a863ef5a9aaed9b23bd243cb6f"
  },
  {
    "url": "assets/js/37.ae8f61cd.js",
    "revision": "20f8ec27725309ec86424cc42af86aac"
  },
  {
    "url": "assets/js/38.5dfa641b.js",
    "revision": "1d9a2e9f2d20dc63db22ffefc48a4f70"
  },
  {
    "url": "assets/js/39.ee62b6ae.js",
    "revision": "a4b28d62036021b10ef79cb7e095bfd0"
  },
  {
    "url": "assets/js/4.b707e725.js",
    "revision": "d831f1839d911938c6176c077216f4f8"
  },
  {
    "url": "assets/js/40.a27cae0c.js",
    "revision": "d7aedee7a24e86ed78f7834b1f11905c"
  },
  {
    "url": "assets/js/41.a7c3f80b.js",
    "revision": "2ac57d9299981177033b61bcff4101e9"
  },
  {
    "url": "assets/js/42.8e92af67.js",
    "revision": "9d5e9550d195f20aa6f65be618605b34"
  },
  {
    "url": "assets/js/43.df2180d3.js",
    "revision": "5f3e1ae3899012cf12679b25f3a14fcd"
  },
  {
    "url": "assets/js/44.02ec97bf.js",
    "revision": "407d406819e4740f7f7dec58a9a74239"
  },
  {
    "url": "assets/js/45.9174650d.js",
    "revision": "e7bd30377994488d6f6377f2d5f63110"
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
    "url": "assets/js/50.8fae4683.js",
    "revision": "90cccfabe2eb78d81d9946963f204bf3"
  },
  {
    "url": "assets/js/51.5d39b5cb.js",
    "revision": "be900563baed866f9e1b1c20a3b68549"
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
    "url": "assets/js/54.e857dd1e.js",
    "revision": "2e196886fa885f158a9d23373b877a03"
  },
  {
    "url": "assets/js/55.e473109f.js",
    "revision": "19c3c1412ff0c3e2ab0b07083109709f"
  },
  {
    "url": "assets/js/56.65b03dfb.js",
    "revision": "8ab36dd6ecba891cb61da3c4e535e8e7"
  },
  {
    "url": "assets/js/57.d09849bc.js",
    "revision": "41c9d83e2bb466910229b9e9635639a8"
  },
  {
    "url": "assets/js/58.29deb023.js",
    "revision": "7ba154a692241406fc56ba6b8ed3dead"
  },
  {
    "url": "assets/js/59.7b9fd004.js",
    "revision": "957eb8a620e643da4b806ea92d4fb7ca"
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
    "url": "assets/js/61.2f6e6842.js",
    "revision": "47ca7580332d4fc8e8e6dd10e9bf63e3"
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
    "url": "assets/js/app.a3e24e15.js",
    "revision": "5a3d1570dc2080f9137143ef740e3fa0"
  },
  {
    "url": "assets/js/vendors~docsearch.b3d1c3df.js",
    "revision": "423190c60be3e657798c99e27755ca91"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "9cabb64dbbf317aa96970fa8f95a86ba"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "c8ec89943a22eeb703e6edb2454883d0"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "7cc96333440812e1ad3b6ac325db2cf7"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "166e11a4f04a29bf07ded3504aa92c0a"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "2fee63f9cad56b3bf77e440f631d715b"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "18be551e5f7146b691ad4213e03ff545"
  },
  {
    "url": "rules/index.html",
    "revision": "84b3e8f59c17fd39d5a4f921e1c9059a"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "19a80349a4687ca986c6b0436898b103"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "d90868c9e4cb55fa9eb52727f572f4c6"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "87ceece6479a768f29522ef8c8c97ea5"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "ad522b29fc441401cfdc612424223fe1"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "09176e8433562f22e061f364ede1aa57"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "598d18e9a19632ce37656e4fa0e88174"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "5bf25e9c72c4e5009d5bbfdc9f33e596"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "fbf6f5ea1fea7d4326b15ed093fd129f"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "2c0285f0e7d03153e12e4723ce190fe2"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "0dafb51ab8b95e902325fa309fcdae6b"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "440d4fe0d41b9b0f235ea72c19ebfddc"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "36f38fc83e1959367a9d412dc8927385"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "2cd378700d2c0ee756ad907556b3c46d"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "7eeb28099e0f684069587e5feb8439cd"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "0a2423e6d4f0e37128aed4b0b50b690f"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "319b5c607798a000544cf6316b38dd9b"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "4a4902e612f8ce12f30c38fa63ebec7c"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "9cdbbefb8115b4f2858311fbb3c8800d"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "9a058eff7cee90c9faab0b8e6662e9ee"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "fa7c6a52aa45a4bfd5b6814136de1663"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "908029f4a3da08d022f955c2fd95202b"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "b74acc21d7e0b5ad2dba79bf7284d1f7"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "da006dd51862233b1dd9c72e71f4b413"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "e416573eaf5cd36c399c488bb8108314"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "e03975ef8c79cfb810c42111d5a1fdae"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "88cf365aee5ce398b12795a092607a96"
  },
  {
    "url": "user-guide/index.html",
    "revision": "3a7dad9ca15c1b342a31e2ed820e320b"
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
