﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('format',{requires:['richcombo','styles'],init:function(a){var b=a.config,c=a.lang.format,d,e=b.format_tags.split(';'),f={};for(var g=0;g<e.length;g++){var h=e[g];f[h]=new CKEDITOR.style(b['format_'+h]);}a.ui.addRichCombo('Format',{label:c.label,title:c.panelTitle,className:'cke_format',multiSelect:false,panel:{css:[b.contentsCss,CKEDITOR.getUrl(a.skinPath+'editor.css')]},init:function(){this.startGroup(c.panelTitle);for(var i in f){var j=c['tag_'+i];this.add(i,'<'+i+'>'+j+'</'+i+'>',j);}},onClick:function(i){a.focus();if(d){a.getSelection().selectRanges(d);d=false;}f[i].apply(a.document);},onRender:function(){a.on('selectionChange',function(i){var j=this.getValue(),k=i.data.path;for(var l in f)if(f[l].checkActive(k)){if(l!=j)this.setValue(l,a.lang.format['tag_'+l]);return;}this.setValue('');},this);},onOpen:function(){if(CKEDITOR.env.ie){a.focus();d=a.getSelection().getRanges();}},onClose:function(){d=null;}});}});CKEDITOR.config.format_tags='p;h1;h2;h3;h4;h5;h6;pre;address;div';CKEDITOR.config.format_p={element:'p'};CKEDITOR.config.format_div={element:'div'};CKEDITOR.config.format_pre={element:'pre'};CKEDITOR.config.format_address={element:'address'};CKEDITOR.config.format_h1={element:'h1'};CKEDITOR.config.format_h2={element:'h2'};CKEDITOR.config.format_h3={element:'h3'};CKEDITOR.config.format_h4={element:'h4'};CKEDITOR.config.format_h5={element:'h5'};CKEDITOR.config.format_h6={element:'h6'};
