﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('contextmenu',{requires:['menu'],beforeInit:function(a){a.contextMenu=new CKEDITOR.plugins.contextMenu(a);a.addCommand('contextMenu',{exec:function(){a.contextMenu.show();}});}});CKEDITOR.plugins.contextMenu=CKEDITOR.tools.createClass({$:function(a){this.id='cke_'+CKEDITOR.tools.getNextNumber();this.editor=a;this._.listeners=[];this._.functionId=CKEDITOR.tools.addFunction(function(b){this._.panel.hide();a.focus();a.execCommand(b);},this);},_:{onMenu:function(a,b,c){var d=this._.menu,e=this.editor;if(d){d.hide();d.removeAll();}else{d=this._.menu=new CKEDITOR.menu(e);d.onClick=CKEDITOR.tools.bind(function(n){d.hide();e.focus();if(n.onClick)n.onClick();else if(n.command){if(CKEDITOR.env.ie)this.restoreSelection();e.execCommand(n.command);}},this);d.onEscape=function(){e.focus();};}var f=this._.listeners,g=[],h=this.editor.getSelection(),i=h&&h.getStartElement();for(var j=0;j<f.length;j++){var k=f[j](i,h);if(k)for(var l in k){var m=this.editor.getMenuItem(l);if(m){m.state=k[l];d.add(m);}}}if(CKEDITOR.env.ie)this.saveSelection();d.show(a,1,b,c);}},proto:{addTarget:function(a){a.on('contextmenu',function(b){var c=b.data;c.preventDefault();var d=c.getTarget().getDocument().getDocumentElement();offsetX=c.$.clientX,offsetY=c.$.clientY;CKEDITOR.tools.setTimeout(function(){this._.onMenu(d,offsetX,offsetY);},0,this);},this);},addListener:function(a){this._.listeners.push(a);},show:function(){this.editor.focus();this._.onMenu(CKEDITOR.document.getDocumentElement(),0,0);},saveSelection:function(){var b=this;if(b.editor.mode=='wysiwyg'){b.editor.focus();var a=new CKEDITOR.dom.selection(b.editor.document);b._.selectedRanges=a.getRanges();}else delete b._.selectedRanges;},restoreSelection:function(){var a=this;if(a.editor.mode=='wysiwyg'&&a._.selectedRanges){a.editor.focus();new CKEDITOR.dom.selection(a.editor.document).selectRanges(a._.selectedRanges);}}}});
