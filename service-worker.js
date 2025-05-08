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
    "revision": "be583e12884ce867b808e7396b1785e1"
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
    "url": "assets/js/12.c0561b72.js",
    "revision": "0c3651ebc1346559020bc518fa91d945"
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
    "url": "assets/js/30.7a7f43ec.js",
    "revision": "f967780ce4c0d3a1d6acbdc04d6ef2e6"
  },
  {
    "url": "assets/js/31.5121694c.js",
    "revision": "0250d07970f75e6cf7b99ac978aeea3e"
  },
  {
    "url": "assets/js/32.35f086ba.js",
    "revision": "df3d9061bf1276d8579ddca34d00d706"
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
    "url": "assets/js/35.d144e56c.js",
    "revision": "58f2c87d8e44b47e79a3c229f3855802"
  },
  {
    "url": "assets/js/36.6f6ebd42.js",
    "revision": "da6376a654abb5283fedac67992fa6d5"
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
    "url": "assets/js/41.8cb11e61.js",
    "revision": "3bb0a5b42ed31ed4e149ecdaee8abe84"
  },
  {
    "url": "assets/js/42.e5bfdc43.js",
    "revision": "a419c3e80a7a0e4b48f99e6bc79234b7"
  },
  {
    "url": "assets/js/43.a2ecda2c.js",
    "revision": "03fa30496d35a1478c772be7deee9cc5"
  },
  {
    "url": "assets/js/44.a379c0ba.js",
    "revision": "55725bb4c3d8a82f118ce49b0003cf45"
  },
  {
    "url": "assets/js/45.56fe9cb5.js",
    "revision": "b2237e2414e62fde178810f45b82ae0c"
  },
  {
    "url": "assets/js/46.62c8f4a4.js",
    "revision": "0c80e1d33eba844a35834ab9591db07b"
  },
  {
    "url": "assets/js/47.71cab7f7.js",
    "revision": "3a660a8f857236b247f387c61f1fbf22"
  },
  {
    "url": "assets/js/48.8da8b790.js",
    "revision": "ed72c7953a5487016d157270b8a7a2a9"
  },
  {
    "url": "assets/js/49.13b8ac71.js",
    "revision": "32cf9eae9304dd2913b5388ef3e00f69"
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
    "url": "assets/js/56.7b10a0da.js",
    "revision": "6e60a76c460838c17c28421758ff3aa7"
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
    "url": "assets/js/60.ada3fc98.js",
    "revision": "3ccb03f3df7d0a02acead3709725bb6a"
  },
  {
    "url": "assets/js/61.4d4d3cc4.js",
    "revision": "89b1bfe9c4386e8707ec158008e968bc"
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
    "url": "assets/js/app.3611b70c.js",
    "revision": "8932253da5c99e47ed064a719cbb1db2"
  },
  {
    "url": "assets/js/vendors~docsearch.b3d1c3df.js",
    "revision": "423190c60be3e657798c99e27755ca91"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "551b602df0eba277c748cac92cc97262"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "e7506128b3eaecdc0922312bfb07284b"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "e3c0acb2c43264e05a52e999bad22312"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "860c44be228092a9769fbdbb3b560797"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "834fda7bcf3f191a753dedcdfb3dc860"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "c45ffd98599113986fa6b3510fbc41a6"
  },
  {
    "url": "rules/index.html",
    "revision": "e941b2dcf44d11965583a57c5b03f5e2"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "77576f8e26b9e9613303764b15ebdc6a"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "c5a3cac7503e0791cd6117a341bf38c8"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "ccf6342dac6d031376dec7b16f115f46"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "a2bcf97f19b0716601c4257ab87f222b"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "06f81d3e84388f709c30a81fa3bd43fb"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "186eb22d2f8ba20879a56f8cb2957143"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "cff08a217f15b2f15789ac53bf1ba4df"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "4ab901cd61ef9696c519f590d3989459"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "f34357b5c23dc8da7a29200188b358a5"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "fc14652493d6d38403b7ae3dd030f3d9"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "bdffce38e55837b21ed10ac6b5f6bd48"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "6f72dff980900e1806aff1aac729862d"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "41326372c58bc8cf32bdfffea90f6c87"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "d743224488ed0485c95586b403017356"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "83d68b8f33d7b1c31d4afc79bd4e29ec"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "3ee7e2d2591fffd1277963a8f49d19fe"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "476e19380029979696114778b797b13a"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "4e069775ea626872a52348c358ffb398"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "ead324428079e47031e8b5c5d2ac436a"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "24e217af6a3b959a21d0c7cbd9ab756c"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "8557c8eeca9e1e69e078d362dea3ba7b"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "19e229f59f1f0bdcef46d6030e54fd46"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "7eee4ac3e606f2f92927c95154940275"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "30078fc59ed0b6730e76762d4c022a22"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "8c28c028945fe90d536eaf271852217a"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "b180a32634f8929f8d71216731137ed9"
  },
  {
    "url": "user-guide/index.html",
    "revision": "484344f593d28ad3b8887bbd688ee398"
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
