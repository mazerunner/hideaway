﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('colorbutton',{requires:['panelbutton','floatpanel','styles'],init:function(a){var b=a.config,c=a.lang.colorButton,d,e;f('TextColor','fore',c.textColorTitle);f('BGColor','back',c.bgColorTitle);function f(h,i,j){a.ui.add(h,CKEDITOR.UI_PANELBUTTON,{label:c.label,title:j,className:'cke_button_'+h.toLowerCase(),panel:{css:[CKEDITOR.getUrl(a.skinPath+'editor.css')]},onBlock:function(k,l){var m=k.addBlock(l);m.autoSize=true;m.element.addClass('cke_colorblock');m.element.setHtml(g(k,i));var n=m.keys;n[39]='next';n[9]='next';n[37]='prev';n[CKEDITOR.SHIFT+9]='prev';n[32]='click';},onOpen:function(){if(CKEDITOR.env.ie){a.focus();d=a.getSelection().getRanges();}},onClose:function(){d=null;}});};function g(h,i){var j=[],k=CKEDITOR.config.colorButton_colors.split(',');if(!e)e=CKEDITOR.tools.addFunction(function(n,o){if(n=='?')return;a.focus();if(d){a.getSelection().selectRanges(d);d=false;}h.hide();var p=new CKEDITOR.style(b['colorButton_'+o+'Style'],{color:n||'#000'});if(n)p.apply(a.document);else p.remove(a.document);});j.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="',c.auto,'" onclick="CKEDITOR.tools.callFunction(',e,",null,'",i,"');\" href=\"javascript:void('",c.auto,'\')"><table cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" style="background-color:#000"></span></td><td colspan=7 align=center>',c.auto,'</td></tr></table></a><table cellspacing=0 cellpadding=0 width="100%">');for(var l=0;l<k.length;l++){if(l%8==0)j.push('</tr><tr>');var m=k[l];j.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="',m,'" onclick="CKEDITOR.tools.callFunction(',e,",'#",m,"','",i,"');\" href=\"javascript:void('",m,'\')"><span class="cke_colorbox" style="background-color:#',m,'"></span></a></td>');}if(b.colorButton_enableMore)j.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="',c.more,'" onclick="CKEDITOR.tools.callFunction(',e,",'?','",i,"');\" href=\"javascript:void('",c.more,"')\">",c.more,'</a></td>');j.push('</tr></table>');return j.join('');};}});CKEDITOR.config.colorButton_enableMore=false;CKEDITOR.config.colorButton_colors='000,930,330,030,036,000080,339,333,800000,F60,808000,808080,008080,00F,669,808080,F00,F90,9C0,396,3CC,36F,800080,999,F0F,FC0,FF0,0F0,0FF,0CF,936,C0C0C0,F9C,FC9,FF9,CFC,CFF,9CF,C9F,FFF';CKEDITOR.config.colorButton_foreStyle={element:'span',styles:{color:'#(color)'},overrides:[{element:'font',attributes:{color:null}}]};CKEDITOR.config.colorButton_backStyle={element:'span',styles:{'background-color':'#(color)'}};
