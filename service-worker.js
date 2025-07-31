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
    "revision": "25d29296cd2596da16fc8fceaf4e79e7"
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
    "url": "assets/js/12.d0a0e4a6.js",
    "revision": "324704590f39adaf5d6271222f550ca2"
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
    "url": "assets/js/32.9d095fa9.js",
    "revision": "34fb97f192aadc9ce634672982a41830"
  },
  {
    "url": "assets/js/33.a3e1571e.js",
    "revision": "c6b746514cd98c338df831c2bb2f25b7"
  },
  {
    "url": "assets/js/34.849c6ca7.js",
    "revision": "e9bb5a3708db401d9e239e7b3ca25e35"
  },
  {
    "url": "assets/js/35.eb1ca9c6.js",
    "revision": "27f751fdccc74861c9aae7e3d285c6d5"
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
    "url": "assets/js/39.be39fe35.js",
    "revision": "d8aac11fcf816d3b780b003528dcd51d"
  },
  {
    "url": "assets/js/4.b707e725.js",
    "revision": "d831f1839d911938c6176c077216f4f8"
  },
  {
    "url": "assets/js/40.5798a3ad.js",
    "revision": "3adb83582cae36c5b27c70b238376ce2"
  },
  {
    "url": "assets/js/41.a7c3f80b.js",
    "revision": "2ac57d9299981177033b61bcff4101e9"
  },
  {
    "url": "assets/js/42.a18c23ea.js",
    "revision": "49d08c5e731a557347cb9083d1858283"
  },
  {
    "url": "assets/js/43.9079e3b7.js",
    "revision": "80e4ccc8f79d914a74b82f08f3e9dda7"
  },
  {
    "url": "assets/js/44.a379c0ba.js",
    "revision": "55725bb4c3d8a82f118ce49b0003cf45"
  },
  {
    "url": "assets/js/45.e2d2099d.js",
    "revision": "ce26f27082fa6ee5a0883e1a97db525c"
  },
  {
    "url": "assets/js/46.dd66b96e.js",
    "revision": "a485c264f8af193461f43c4fc49a51d1"
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
    "url": "assets/js/app.f4e9bfc2.js",
    "revision": "a3c71e116318be638c57f1ea8ee112f7"
  },
  {
    "url": "assets/js/vendors~docsearch.b3d1c3df.js",
    "revision": "423190c60be3e657798c99e27755ca91"
  },
  {
    "url": "developer-guide/index.html",
    "revision": "84259dbcec0c33716bb3a2029341280a"
  },
  {
    "url": "favicon.png",
    "revision": "752f5b837d8d5733e1a727a4f0ac5df0"
  },
  {
    "url": "index.html",
    "revision": "ae534cbd4b8c2e2dc45e8047e96a4fbc"
  },
  {
    "url": "rules/comment-directive.html",
    "revision": "2c55806d2c581cfb2b55455a2f107416"
  },
  {
    "url": "rules/component-tags-order.html",
    "revision": "d5c257fcb2e860a2fbf097007dfb6664"
  },
  {
    "url": "rules/eqeqeq.html",
    "revision": "ff7b06db157fc1d488c0a6fe826b4239"
  },
  {
    "url": "rules/html-end-tags.html",
    "revision": "e4479abd5dffa57263f5449f34a8da19"
  },
  {
    "url": "rules/index.html",
    "revision": "5c73fe9846767abc0a7a26c31bb730f0"
  },
  {
    "url": "rules/no-arrow-functions-in-watch.html",
    "revision": "211e343eb9dd852d150f9309a6c596c4"
  },
  {
    "url": "rules/no-async-in-computed-properties.html",
    "revision": "ec6771254e8fce4862810826d0bcadd1"
  },
  {
    "url": "rules/no-deprecated-lifecycle.html",
    "revision": "7283d729de67cd1f41008db70bde2edb"
  },
  {
    "url": "rules/no-deprecated-mpx-createfunction.html",
    "revision": "68635456cab9bf124b29e3738c218eef"
  },
  {
    "url": "rules/no-deprecated-watch-second-param.html",
    "revision": "66957d5e93f43669f7487d9187059f9c"
  },
  {
    "url": "rules/no-dupe-keys.html",
    "revision": "ce766de72ae391dbefdd2d63054de565"
  },
  {
    "url": "rules/no-dupe-wx-elif.html",
    "revision": "7b3a678395bd90a120664c83ad5d0f07"
  },
  {
    "url": "rules/no-duplicate-attributes.html",
    "revision": "d103472994b4044ef2d1b9b06f06ed82"
  },
  {
    "url": "rules/no-parsing-error.html",
    "revision": "2e505c100ba6b67bad4a709dac76e05a"
  },
  {
    "url": "rules/no-reserved-keys.html",
    "revision": "c98d6d4125ec2149996cee7777458ac1"
  },
  {
    "url": "rules/no-side-effects-in-computed-properties.html",
    "revision": "1b4ee674e3d0e65075252bc30b6599ae"
  },
  {
    "url": "rules/return-in-computed-property.html",
    "revision": "c172416c7880931d66e0f1591365b329"
  },
  {
    "url": "rules/script-indent.html",
    "revision": "e2866a9188b71af362daeb2a5cfea082"
  },
  {
    "url": "rules/script-setup-uses-vars.html",
    "revision": "f6f471162d7d472cfd3d1bcbb8e0a6c1"
  },
  {
    "url": "rules/valid-attribute-value.html",
    "revision": "05f1c0b5e340bb528d2e262743543723"
  },
  {
    "url": "rules/valid-component-range.html",
    "revision": "a06a14f96120385e69200da12a873b61"
  },
  {
    "url": "rules/valid-initdata.html",
    "revision": "de95b535687eebafeaaa2e8b004f6534"
  },
  {
    "url": "rules/valid-properties.html",
    "revision": "4755a0aa2f8bc2177674928df4d33549"
  },
  {
    "url": "rules/valid-setup-define-expose.html",
    "revision": "448b158bbd556179cc71ab8f0e7846a4"
  },
  {
    "url": "rules/valid-swiper-item-style.html",
    "revision": "eda1d2e63060fa882de325c1346f054f"
  },
  {
    "url": "rules/valid-template-quote.html",
    "revision": "5a1bc5fefe070620bb00d52bebe37dd0"
  },
  {
    "url": "rules/valid-wx-elif.html",
    "revision": "3288a6581b05abf5e964dbc0b4b9a33a"
  },
  {
    "url": "rules/valid-wx-else.html",
    "revision": "9371504e1d18fa4fbc278e0cc395e642"
  },
  {
    "url": "rules/valid-wx-if.html",
    "revision": "ca91e288fd2e4268c9c49dccd192a917"
  },
  {
    "url": "rules/valid-wx-key.html",
    "revision": "682ba69141d40f1d505e27578d2ee8e4"
  },
  {
    "url": "rules/valid-wx-model.html",
    "revision": "d21a20a6899c84c0bd10db759e6a858f"
  },
  {
    "url": "user-guide/index.html",
    "revision": "c59ceb97c9a25dca5d4a8623f5d12c86"
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
