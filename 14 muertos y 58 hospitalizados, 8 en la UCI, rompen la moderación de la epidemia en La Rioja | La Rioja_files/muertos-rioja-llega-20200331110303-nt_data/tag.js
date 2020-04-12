(function(w, d) {
  try {
    d = w.top.document || d; w = w.top.document ? w.top : w;
  } catch (e) {}
  var ttag = function() {
    var slot = '.voc-detail > p, .voc-detail .voc-detail-header > p';

if (w.teads && w.teads.instances && w.teads.instances.inread) {
  for (var i = 0; i < teads.instances.inread.length; i++) {
    if (teads.instances.inread[i].placement && teads.instances.inread[i].placement.pid === 20799) {
      slot = 'teadsNoSlotIntended';
      break;
    }
  }
}
    w.teads.page(11067).placement(20799, {slider: {allow_corner_position: false, allow_top_position: false}, "css":"margin: 0px auto 20px; max-width: 550px;","format":"inread","slot":{"insertInside":true,"selector":slot,"minimum":2}}).passback(function passback() {var js = [],
	s = window.top.document.getElementsByTagName("script")[0];
js.push(window.top.document.createElement("script"));
js[0].async = true;
js[0].setAttribute("src","https://mona.admanmedia.com/go?id=da784f24");
s.parentNode.insertBefore(js[0],s);}).serve();
  };
  if (w.teads && w.teads.page) { ttag(); }
  else if (!w.teadsscript) {
    var s = document.createElement('script');
    var protocol = 'https:';
    s.src = protocol + '//a.teads.tv/media/format/v3/teads-format.min.js';
    s.async = true; s.onload = ttag; w.teadsscript = d.getElementsByTagName('head')[0].appendChild(s);
  } else {
    w.teadsscript.addEventListener('load', ttag);
  }
})(window, document);