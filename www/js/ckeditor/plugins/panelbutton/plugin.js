﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('panelbutton',{requires:['button'],beforeInit:function(a){a.ui.addHandler(CKEDITOR.UI_PANELBUTTON,CKEDITOR.ui.panelButton.handler);}});CKEDITOR.UI_PANELBUTTON=4;CKEDITOR.ui.panelButton=CKEDITOR.tools.createClass({$:function(a){var c=this;CKEDITOR.tools.extend(c,a,{title:a.label,modes:{wysiwyg:1}});var b=c.panel;delete c.panel;c.document=b&&b.parent&&b.parent.getDocument()||CKEDITOR.document;c._={panelDefinition:b};},statics:{handler:{create:function(a){return new CKEDITOR.ui.panelButton(a);}}},proto:{render:function(a,b){var c=this._.id='cke_'+CKEDITOR.tools.getNextNumber(),d={id:c,focus:function(){var i=CKEDITOR.document.getById(c);i.focus();},execute:function(){this.button.click(a);}},e=CKEDITOR.tools.addFunction(function(i){var j=this._;if(j.state==CKEDITOR.TRISTATE_DISABLED)return;this.createPanel(a);if(j.on){j.panel.hide();return;}j.panel.showBlock(this._.id,new CKEDITOR.dom.element(i),4);},this),f=CKEDITOR.tools.addFunction(function(i,j){i=new CKEDITOR.dom.event(i);var k=i.getKeystroke();switch(k){case 13:case 32:case 40:CKEDITOR.tools.callFunction(e,j);break;default:d.onkey(d,k);}i.preventDefault();}),g=this.label||'',h='cke_off';if(this.className)h+=' '+this.className;a.on('mode',function(){this.setState(this.modes[a.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);},this);b.push('<span class="cke_button">','<a id="',c,'" class="',h,'" href="javascript:void(\'',(this.title||'').replace("'",''),'\')" title="',this.title,'" tabindex="-1" hidefocus="true"');if(CKEDITOR.env.opera||CKEDITOR.env.gecko&&CKEDITOR.env.mac)b.push(' onkeypress="return false;"');if(CKEDITOR.env.gecko)b.push(' onblur="this.style.cssText = this.style.cssText;"');b.push(' onkeydown="CKEDITOR.tools.callFunction( ',f,', event, this );" onclick="CKEDITOR.tools.callFunction(',e,', this);"><span class="cke_icon"></span><span class="cke_label">',this.label,'</span><span class="cke_buttonarrow"></span></a></span>');return d;},createPanel:function(a){var b=this._;if(b.panel)return;var c=this._.panelDefinition||{},d=c.parent||CKEDITOR.document.getBody(),e=this._.panel=new CKEDITOR.ui.floatPanel(a,d,c),f=this;e.onShow=function(){if(f.className)this.element.getFirst().addClass(f.className+'_panel');f.setState(CKEDITOR.TRISTATE_ON);b.on=1;if(f.onOpen)f.onOpen();};e.onHide=function(){if(f.className)this.element.getFirst().removeClass(f.className+'_panel');f.setState(CKEDITOR.TRISTATE_OFF);b.on=0;if(f.onClose)f.onClose();};e.onEscape=function(){e.hide();f.document.getById(b.id).focus();
};if(this.onBlock)this.onBlock(e,b.id);},setState:CKEDITOR.ui.button.prototype.setState}});
