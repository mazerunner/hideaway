﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function(){CKEDITOR.plugins.add('enterkey',{requires:['keystrokes'],init:function(h){var i=h.specialKeys;i[13]=d;i[CKEDITOR.SHIFT+13]=c;}});var a,b=/^h[1-6]$/;function c(h){a=1;return d(h,h.config.shiftEnterMode);};function d(h,i){if(h.mode!='wysiwyg')return;if(!i)i=h.config.enterMode;setTimeout(function(){if(i==CKEDITOR.ENTER_BR||h.getSelection().getStartElement().hasAscendant('pre',true))f(h,i);else e(h,i);a=0;},0);return true;};function e(h,i,j){j=j||g(h);var k=j.document,l=i==CKEDITOR.ENTER_DIV?'div':'p',m=j.splitBlock(l);if(!m)return;var n=m.previousBlock,o=m.nextBlock,p=m.wasStartOfBlock,q=m.wasEndOfBlock,r;if(o){r=o.getParent();if(r.is('li')){o.breakParent(r);o.move(o.getNext(),true);}}else if(n&&(r=n.getParent())&&(r.is('li'))){n.breakParent(r);j.moveToElementEditStart(n.getNext());n.move(n.getPrevious());}if(!p&&!q){if(o.is('li')&&(r=o.getFirst())&&(r.is&&r.is('ul','ol')))o.insertBefore(k.createText('\xa0'),r);if(o)j.moveToElementEditStart(o);}else{var s;if(n)if(!a&&!b.test(n.getName()))s=n.clone();else if(o)s=o.clone();if(!s)s=k.createElement(l);var t=m.elementPath;if(t)for(var u=0,v=t.elements.length;u<v;u++){var w=t.elements[u];if(w.equals(t.block)||w.equals(t.blockLimit))break;if(CKEDITOR.dtd.$removeEmpty[w.getName()]){w=w.clone();s.moveChildren(w);s.append(w);}}if(!CKEDITOR.env.ie)s.appendBogus();j.insertNode(s);if(CKEDITOR.env.ie&&p&&(!q||!n.getChildCount())){j.moveToElementEditStart(q?n:s);j.select();}j.moveToElementEditStart(p&&!q?o:s);}if(!CKEDITOR.env.ie)if(o){var x=k.createElement('span');x.setHtml('&nbsp;');j.insertNode(x);x.scrollIntoView();j.deleteContents();}else s.scrollIntoView();j.select();};function f(h,i){var j=g(h),k=j.document,l=i==CKEDITOR.ENTER_DIV?'div':'p',m=j.checkEndOfBlock(),n=new CKEDITOR.dom.elementPath(j.getBoundaryNodes().startNode),o=n.block,p=o&&n.block.getName(),q=false;if(!a&&p=='li')return e(h,i,j);if(!a&&m&&b.test(p)){k.createElement('br').insertAfter(o);if(CKEDITOR.env.gecko)k.createText('').insertAfter(o);j.setStartAt(o.getNext(),CKEDITOR.env.ie?CKEDITOR.POSITION_BEFORE_START:CKEDITOR.POSITION_AFTER_START);}else{var r;q=p=='pre';if(q)r=k.createText(CKEDITOR.env.ie?'\r':'\n');else r=k.createElement('br');j.insertNode(r);if(CKEDITOR.env.gecko)k.createText('').insertAfter(r);if(m&&!CKEDITOR.env.ie)r.getParent().appendBogus();if(CKEDITOR.env.ie)j.setStartAt(r,CKEDITOR.POSITION_AFTER_END);else j.setStartAt(r.getNext(),CKEDITOR.POSITION_AFTER_START);if(!CKEDITOR.env.ie){var s=null;if(CKEDITOR.env.opera)s=k.createElement('span');
else s=k.createElement('br');s.insertBefore(r.getNext());s.scrollIntoView();s.remove();}}j.collapse(true);j.select(q);};function g(h){var i=h.getSelection().getRanges();for(var j=i.length-1;j>0;j--)i[j].deleteContents();return i[0];};})();
