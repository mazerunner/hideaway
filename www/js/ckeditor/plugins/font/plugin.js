﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function(){function a(b,c,d,e,f,g,h){var i=b.config,j,k=f.split(';'),l=[],m={};for(var n=0;n<k.length;n++){var o={},p=k[n].split('/'),q=k[n]=p[0];o[d]=l[n]=p[1]||q;m[q]=new CKEDITOR.style(h,o);}b.ui.addRichCombo(c,{label:e.label,title:e.panelTitle,className:'cke_'+(d=='size'?'fontSize':'font'),multiSelect:false,panel:{css:[i.contentsCss,CKEDITOR.getUrl(b.skinPath+'editor.css')]},init:function(){this.startGroup(e.panelTitle);for(var r=0;r<k.length;r++){var s=k[r];this.add(s,'<span style="font-'+d+':'+l[r]+'">'+s+'</span>',s);}},onClick:function(r){b.focus();if(j){b.getSelection().selectRanges(j);j=false;}var s=m[r];if(this.getValue()==r)s.remove(b.document);else s.apply(b.document);},onRender:function(){b.on('selectionChange',function(r){var s=this.getValue(),t=r.data.path,u=t.elements;for(var v=0,w;v<u.length;v++){w=u[v];for(var x in m)if(m[x].checkElementRemovable(w,true)){if(x!=s)this.setValue(x);return;}}this.setValue('',g);},this);},onOpen:function(){if(CKEDITOR.env.ie){b.focus();j=b.getSelection().getRanges();}},onClose:function(){j=null;}});};CKEDITOR.plugins.add('font',{requires:['richcombo','styles'],init:function(b){var c=b.config;a(b,'Font','family',b.lang.font,c.font_names,c.font_defaultLabel,c.font_style);a(b,'FontSize','size',b.lang.fontSize,c.fontSize_sizes,c.fontSize_defaultLabel,c.fontSize_style);}});})();CKEDITOR.config.font_names='Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif';CKEDITOR.config.font_defaultLabel='';CKEDITOR.config.font_style={element:'span',styles:{'font-family':'#(family)'},overrides:[{element:'font',attributes:{face:null}}]};CKEDITOR.config.fontSize_sizes='8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';CKEDITOR.config.fontSize_defaultLabel='';CKEDITOR.config.fontSize_style={element:'span',styles:{'font-size':'#(size)'},overrides:[{element:'font',attributes:{face:null}}]};
