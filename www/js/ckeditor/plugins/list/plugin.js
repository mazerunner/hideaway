﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

(function(){var a={ol:1,ul:1},b=/^[\n\r\t ]*$/;CKEDITOR.plugins.list={listToArray:function(i,j,k,l,m){if(!a[i.getName()])return[];if(!l)l=0;if(!k)k=[];for(var n=0,o=i.getChildCount();n<o;n++){var p=i.getChild(n);if(p.$.nodeName.toLowerCase()!='li')continue;var q={parent:i,indent:l,contents:[]};if(!m){q.grandparent=i.getParent();if(q.grandparent&&q.grandparent.$.nodeName.toLowerCase()=='li')q.grandparent=q.grandparent.getParent();}else q.grandparent=m;if(j)CKEDITOR.dom.element.setMarker(j,p,'listarray_index',k.length);k.push(q);for(var r=0,s=p.getChildCount();r<s;r++){var t=p.getChild(r);if(t.type==CKEDITOR.NODE_ELEMENT&&a[t.getName()])CKEDITOR.plugins.list.listToArray(t,j,k,l+1,q.grandparent);else q.contents.push(t);}}return k;},arrayToList:function(i,j,k,l){if(!k)k=0;if(!i||i.length<k+1)return null;var m=i[k].parent.getDocument(),n=new CKEDITOR.dom.documentFragment(m),o=null,p=k,q=Math.max(i[k].indent,0),r=null,s=l==CKEDITOR.ENTER_P?'p':'div';for(;;){var t=i[p];if(t.indent==q){if(!o||i[p].parent.getName()!=o.getName()){o=i[p].parent.clone(false,true);n.append(o);}r=o.append(m.createElement('li'));for(var u=0;u<t.contents.length;u++)r.append(t.contents[u].clone(true,true));p++;}else if(t.indent==Math.max(q,0)+1){var v=CKEDITOR.plugins.list.arrayToList(i,null,p,l);r.append(v.listNode);p=v.nextIndex;}else if(t.indent==-1&&k==0&&t.grandparent){var r;if(a[t.grandparent.getName()])r=m.createElement('li');else if(l!=CKEDITOR.ENTER_BR&&t.grandparent.getName()!='td')r=m.createElement(s);else r=new CKEDITOR.dom.documentFragment(m);for(var u=0;u<t.contents.length;u++)r.append(t.contents[u].clone(true,true));if(r.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT){if(r.getLast()&&r.getLast().type==CKEDITOR.NODE_ELEMENT&&r.getLast().getAttribute('type')=='_moz')r.getLast().remove();r.appendBogus();}if(r.getName()==s&&r.$.firstChild){r.trim();var w=r.getFirst();if(w.type==CKEDITOR.NODE_ELEMENT&&w.isBlockBoundary()){var x=new CKEDITOR.dom.documentFragment(m);r.moveChildren(x);r=x;}}var y=r.$.nodeName.toLowerCase();if(!CKEDITOR.env.ie&&(y=='div'||y=='p'))r.appendBogus();n.append(r);o=null;p++;}else return null;if(i.length<=p||Math.max(i[p].indent,0)<q)break;}if(j){var z=n.getFirst();while(z){if(z.type==CKEDITOR.NODE_ELEMENT)CKEDITOR.dom.element.clearMarkers(j,z);z=z.getNextSourceNode();}}return{listNode:n,nextIndex:p};}};function c(i,j){i.getCommand(this.name).setState(j);};function d(i){var j=i.data.path.elements;for(var k=0;k<j.length;k++)if(a[j[k].getName()])return c.call(this,i.editor,this.type==j[k].getName()?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);
c.call(this,i.editor,CKEDITOR.TRISTATE_OFF);};function e(i,j,k,l){var m=CKEDITOR.plugins.list.listToArray(j.root,k),n=[];for(var o=0;o<j.contents.length;o++){var p=j.contents[o];p=p.getAscendant('li',true);if(!p||p.getCustomData('list_item_processed'))continue;n.push(p);CKEDITOR.dom.element.setMarker(k,p,'list_item_processed',true);}var q=j.root.getDocument().createElement(this.type);for(var o=0;o<n.length;o++){var r=n[o].getCustomData('listarray_index');m[r].parent=q;}var s=CKEDITOR.plugins.list.arrayToList(m,k,null,i.config.enterMode);for(var o=0,t=s.listNode.getChildCount(),u;o<t&&(u=s.listNode.getChild(o));o++)if(u.getName()==this.type)l.push(u);s.listNode.replace(j.root);};function f(i,j,k){var l=j.contents,m=j.root.getDocument(),n=[];if(l.length==1&&l[0].equals(j.root)){var o=m.createElement('div');l[0].moveChildren&&l[0].moveChildren(o);l[0].append(o);l[0]=o;}var p=j.contents[0].getParent();for(var q=0;q<l.length;q++)p=p.getCommonAncestor(l[q].getParent());for(var q=0;q<l.length;q++){var r=l[q],s;while(s=r.getParent()){if(s.equals(p)){n.push(r);break;}r=s;}}if(n.length<1)return;var t=n[n.length-1].getNext(),u=m.createElement(this.type);k.push(u);while(n.length){var v=n.shift(),w=m.createElement('li');v.moveChildren(w);v.remove();w.appendTo(u);}if(t)u.insertBefore(t);else u.appendTo(p);};function g(i,j,k){var l=CKEDITOR.plugins.list.listToArray(j.root,k),m=[];for(var n=0;n<j.contents.length;n++){var o=j.contents[n];o=o.getAscendant('li',true);if(!o||o.getCustomData('list_item_processed'))continue;m.push(o);CKEDITOR.dom.element.setMarker(k,o,'list_item_processed',true);}var p=null;for(var n=0;n<m.length;n++){var q=m[n].getCustomData('listarray_index');l[q].indent=-1;p=q;}for(var n=p+1;n<l.length;n++)if(l[n].indent>l[n-1].indent+1){var r=l[n-1].indent+1-l[n].indent,s=l[n].indent;while(l[n]&&l[n].indent>=s){l[n].indent+=r;n++;}n--;}var t=CKEDITOR.plugins.list.arrayToList(l,k,null,i.config.enterMode);if(j.root.getNext()==null||j.root.getNext().$.nodeName.toLowerCase()=='br')if(t.listNode.getLast().$.nodeName.toLowerCase()=='br')t.listNode.getLast().remove();t.listNode.replace(j.root);};function h(i,j){this.name=i;this.type=j;};h.prototype={exec:function(i){var I=this;i.focus();var j=i.document,k=i.getSelection(),l=k&&k.getRanges();if(!l||l.length<1)return;if(I.state==CKEDITOR.TRISTATE_OFF){var m=j.getBody();m.trim();if(!m.getFirst()){var n=j.createElement(i.config.enterMode==CKEDITOR.ENTER_P?'p':i.config.enterMode==CKEDITOR.ENTER_DIV?'div':'br');n.appendTo(m);
l=[new CKEDITOR.dom.range(j)];l[0].selectNodeContents(n);k.selectRanges(l);}}var o=k.createBookmarks(true),p=[],q={};while(l.length>0){var r=l.shift(),s=r.getBoundaryNodes(),t=s.startNode,u=s.endNode;if(t.type==CKEDITOR.NODE_ELEMENT&&t.getName()=='td')r.setStartAt(s.startNode,CKEDITOR.POSITION_AFTER_START);if(u.type==CKEDITOR.NODE_ELEMENT&&u.getName()=='td')r.setEndAt(s.endNode,CKEDITOR.POSITION_BEFORE_END);var v=r.createIterator(),w;v.forceBrBreak=I.state==CKEDITOR.TRISTATE_OFF;while(w=v.getNextParagraph()){var x=new CKEDITOR.dom.elementPath(w),y=null,z=false,A=x.blockLimit;for(var B=0;B<x.elements.length;B++){var C=x.elements[B];if(a[C.getName()]){A.removeCustomData('list_group_object');var D=C.getCustomData('list_group_object');if(D)D.contents.push(w);else{D={root:C,contents:[w]};p.push(D);CKEDITOR.dom.element.setMarker(q,C,'list_group_object',D);}z=true;break;}}if(z)continue;var E=A;if(E.getCustomData('list_group_object'))E.getCustomData('list_group_object').contents.push(w);else{var D={root:E,contents:[w]};CKEDITOR.dom.element.setMarker(q,E,'list_group_object',D);p.push(D);}}}var F=[];while(p.length>0){var D=p.shift();if(I.state==CKEDITOR.TRISTATE_OFF)if(a[D.root.getName()])e.call(I,i,D,q,F);else f.call(I,i,D,F);else if(I.state==CKEDITOR.TRISTATE_ON&&a[D.root.getName()])g.call(I,i,D,q);}for(var B=0;B<F.length;B++){var y=F[B],G=false,H=y;while(!G){H=H.getNext();if(H&&H.type==CKEDITOR.NODE_TEXT&&b.test(H.getText()))continue;G=true;}if(H&&H.getName()==I.type){H.remove();H.moveChildren(y);}G=false;H=y;while(!G){H=H.getNext();if(H&&H.type==CKEDITOR.NODE_TEXT&&b.test(H.getText()))continue;G=true;}if(H&&H.getName()==I.type){H.remove();H.moveChildren(y,true);}}CKEDITOR.dom.element.clearAllMarkers(q);k.selectBookmarks(o);i.focus();}};CKEDITOR.plugins.add('list',{init:function(i){var j=new h('numberedlist','ol'),k=new h('bulletedlist','ul');i.addCommand('numberedlist',j);i.addCommand('bulletedlist',k);i.ui.addButton('NumberedList',{label:i.lang.numberedlist,command:'numberedlist'});i.ui.addButton('BulletedList',{label:i.lang.bulletedlist,command:'bulletedlist'});i.on('selectionChange',CKEDITOR.tools.bind(d,j));i.on('selectionChange',CKEDITOR.tools.bind(d,k));},requires:['domiterator']});})();
