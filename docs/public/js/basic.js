(function () {
  window.CHH = {
    // 接口公共地址
    BASE_URL: 'http://192.168.8.218:8101/api',
    // 图片上传接口地址
    BASE_IMG_URL: 'http://192.168.8.90:8009',
    // 图片公共地址
    IMG_URL: 'http://192.168.8.90/upload',
    //文件地址
    FILE_URL: 'https://timg.chehaha.net',
    // 微信接口公共地址
    WX_AUTH_URL: 'http://dk.chehaha.net'
  }
  
  //设置渠道编码
  ;(function(doc,win){
    //  const code = /(?:tm|devm|devlm|m)(\w+)\./.exec(win.location.hostname)[1] || '' ;
    const code = 'cicp' ;
    const insurerCode = code.toUpperCase();
    sessionStorage.setItem('insurerCode', insurerCode)

    var winScale = function(){
      var nScale = win.innerWidth/750;
      doc.documentElement.style.cssText = 'font-size:'+ 60 * nScale+'px;';
    }
    winScale();
    win.onresize = winScale;
  })(document, window);

  //加载腾讯地图
  ;(function(){
    if (!HTMLCanvasElement.prototype.toBlob) {
      Object.defineProperty(HTMLCanvasElement.prototype, 'toBlob', {
        value: function (callback, type, quality) {
          var binStr = atob( this.toDataURL(type, quality).split(',')[1] ),
              len = binStr.length,
              arr = new Uint8Array(len);
          for (var i=0; i<len; i++ ) {
            arr[i] = binStr.charCodeAt(i);
          }
          callback(new Blob([arr], {type: type || 'image/png'}));
        }
      });
    }
    //加载腾讯地图
    window.qq = window.qq || {};
    qq.maps = qq.maps || {};
    window.soso || (window.soso = qq);
    soso.maps || (soso.maps = qq.maps);
    function getScript(src) {
        var protocol = (window.location.protocol == "https:") ? "https://" : "http://";
        src = src && (src.indexOf("http://") === 0 || src.indexOf("https://") === 0) ? src : protocol + src;
        document.write('<' + 'script src="' + src + '"' +' type="text/javascript"><' + '/script>');
    }
    qq.maps.__load = function (apiLoad) {
        delete qq.maps.__load;
        apiLoad([["2.4.122","V43BZ-TYULJ-4PXFM-KPEDR-IBRLZ-4YBMD",0],["https://3gimg.qq.com/","lightmap/api_v2/2/4/122/mods/","https://3gimg.qq.com/lightmap/api_v2/2/4/122/theme/",true],[1,18,34.519469,104.461761,4],[1563420587232,"https://pr.map.qq.com/pingd","https://pr.map.qq.com/pingd"],["https://apis.map.qq.com/jsapi","https://apikey.map.qq.com/mkey/index.php/mkey/check","https://sv.map.qq.com/xf","https://sv.map.qq.com/boundinfo","https://sv.map.qq.com/rarp","https://apis.map.qq.com/api/proxy/search","https://apis.map.qq.com/api/proxy/routes/","https://confinfo.map.qq.com/confinfo","https://overseactrl.map.qq.com"],[[null,["https://rt0.map.gtimg.com/tile","https://rt1.map.gtimg.com/tile","https://rt2.map.gtimg.com/tile","https://rt3.map.gtimg.com/tile"],"png",[256,256],3,19,"114",true,false],[null,["https://m0.map.gtimg.com/hwap","https://m1.map.gtimg.com/hwap","https://m2.map.gtimg.com/hwap","https://m3.map.gtimg.com/hwap"],"png",[128,128],3,18,"110",false,false],[null,["https://p0.map.gtimg.com/sateTiles","https://p1.map.gtimg.com/sateTiles","https://p2.map.gtimg.com/sateTiles","https://p3.map.gtimg.com/sateTiles"],"jpg",[256,256],1,19,"101",false,false],[null,["https://rt0.map.gtimg.com/tile","https://rt1.map.gtimg.com/tile","https://rt2.map.gtimg.com/tile","https://rt3.map.gtimg.com/tile"],"png",[256,256],1,19,"",false,false],[null,["https://sv0.map.qq.com/hlrender/","https://sv1.map.qq.com/hlrender/","https://sv2.map.qq.com/hlrender/","https://sv3.map.qq.com/hlrender/"],"png",[256,256],1,19,"",false,false],[null,["https://rtt2.map.qq.com/rtt/","https://rtt2a.map.qq.com/rtt/","https://rtt2b.map.qq.com/rtt/","https://rtt2c.map.qq.com/rtt/"],"png",[256,256],1,19,"",false,false],null,[["https://rt0.map.gtimg.com/vector/","https://rt1.map.gtimg.com/vector/","https://rt2.map.gtimg.com/vector/","https://rt3.map.gtimg.com/vector/"],[256,256],3,18,"114",["https://rt0.map.gtimg.com/icons/","https://rt1.map.gtimg.com/icons/","https://rt2.map.gtimg.com/icons/","https://rt3.map.gtimg.com/icons/"]],null],["https://s.map.qq.com/TPano/v1.1.2/TPano.js","map.qq.com/",""]],loadScriptTime);
    };
    var loadScriptTime = (new Date).getTime();
    getScript( CHH.FILE_URL + "/js/qqMap.js");
  })();
})();