/*
 * datawrapper / chart 
 * generated on 2020-04-23T15:02:16+00:00
 */
(function(){var chart,reloadTimer;function renderChart(){if(__dw.vis&&!__dw.vis.supportsSmartRendering()){__dw.vis.reset();}
var $chart=$('#chart');var belowChartHeight=$('.footer-left').height()+$('.footer-right').height()+$('.dw-chart-notes').height();if(belowChartHeight>0){$('.dw-chart-body').addClass('content-below-chart');}else{$('.dw-chart-body').removeClass('content-below-chart');}
var w=$chart.width();var h=dw.utils.getMaxChartHeight($('#chart'));if(!$.support.leadingWhitespace)w-=10;var vis;if(__dw.vis&&__dw.vis.supportsSmartRendering()){vis=__dw.vis;}else{vis=__dw.vis=getVis();chart.vis(vis);}
vis.size(w,h);initResizeHandler(vis,$chart);var csv=chart.dataset().toCSV&&chart.dataset().toCSV();if(!csv||(csv&&csv.trim&&csv.trim()==='X.1')){$('.chart-action-data').addClass('hidden');}else{if(!window['__ltie9']){if(window.navigator.msSaveOrOpenBlob){var blobObject=new Blob([csv]);$('a.dw-data-link').click(function(){window.navigator.msSaveOrOpenBlob(blobObject,'data-'+chart.get('id')+'.csv');return false;});}else{$('a.dw-data-link').attr('download','data-'+chart.get('id')+'.csv').attr('href','data:application/octet-stream;charset=utf-8,'+encodeURIComponent(csv));}}}
chart.render($chart);}
function chartLoaded(){chart=dw.chart(__dw.params.chartJSON).locale(__dw.params.chartLocale).metricPrefix(__dw.params.metricPrefix).theme(dw.theme(__dw.params.themeId));return chart.load(__dw.params.data,__dw.params.preview?undefined:__dw.params.chartJSON.externalData);}
function getVis(){var vis=dw.visualization(__dw.params.visId);vis.meta=__dw.params.visJSON;vis.lang=__dw.params.lang;return vis;}
function renderLater(){clearTimeout(reloadTimer);reloadTimer=setTimeout(function(){renderChart();},300);}
function initResizeHandler(vis,container){var height=vis.meta.height||'fit';var curWidth=container.width();var resize=height==='fixed'?resizeFixed:renderLater;if(navigator.userAgent.match(/msie/i)===null){$(window).off('resize',resize).on('resize',resize);}
function resizeFixed(){var w=container.width();if(curWidth!==w){curWidth=w;renderLater();}}}
window.__dw={init:function(params){__dw.params=params;__dw.old_attrs=params.chartJSON;if(!getVis().checkBrowserCompatibility()){window.location.href='static.html';return;}
$(function(){chartLoaded().done(renderChart);});},render:renderLater,renderNow:renderChart};})();