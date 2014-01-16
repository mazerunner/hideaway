﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('dialog',{requires:['dialogui']});CKEDITOR.DIALOG_RESIZE_NONE=0;CKEDITOR.DIALOG_RESIZE_WIDTH=1;CKEDITOR.DIALOG_RESIZE_HEIGHT=2;CKEDITOR.DIALOG_RESIZE_BOTH=3;(function(){function a(v){return!!this._.tabs[v][0].$.offsetHeight;};function b(){var z=this;var v=z._.currentTabId,w=z._.tabIdList.length,x=CKEDITOR.tools.indexOf(z._.tabIdList,v)+w;for(var y=x-1;y>x-w;y--)if(a.call(z,z._.tabIdList[y%w]))return z._.tabIdList[y%w];return null;};function c(){var z=this;var v=z._.currentTabId,w=z._.tabIdList.length,x=CKEDITOR.tools.indexOf(z._.tabIdList,v);for(var y=x+1;y<x+w;y++)if(a.call(z,z._.tabIdList[y%w]))return z._.tabIdList[y%w];return null;};CKEDITOR.dialog=function(v,w){var x=CKEDITOR.dialog._.dialogDefinitions[w];if(!x){console.log('Error: The dialog "'+w+'" is not defined.');return;}x=CKEDITOR.tools.extend(x(v),d);x=new h(this,x);this.definition=x=CKEDITOR.fire('dialogDefinition',{name:w,definition:x},v).definition;var y=v.theme.buildDialog(v);this._={editor:v,element:y.element,name:w,size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:false,focusList:[],currentFocusIndex:0,hasFocus:false};this.parts={tl:[0,0],tl_resize:[0,0,0],t:[0,1],t_resize:[0,1,0],tr:[0,2],tr_resize:[0,2,0],l:[1,0],l_resize:[1,0,0],c:[1,1],r:[1,2],r_resize:[1,2,0],bl:[2,0],bl_resize:[2,0,0],b:[2,1],b_resize:[2,1,0],br:[2,2],br_resize:[2,2,0],title:[1,1,0],close:[1,1,0,0],tabs:[1,1,1,0,0],tabs_table:[1,1,1],contents:[1,1,2],footer:[1,1,3]};var z=this._.element.getFirst();for(var A in this.parts)this.parts[A]=z.getChild(this.parts[A]);CKEDITOR.event.call(this);if(x.onLoad)this.on('load',x.onLoad);if(x.onShow)this.on('show',x.onShow);if(x.onHide)this.on('hide',x.onHide);if(x.onOk)this.on('ok',function(J){if(x.onOk.call(this,J)===false)J.data.hide=false;});if(x.onCancel)this.on('cancel',function(J){if(x.onCancel.call(this,J)===false)J.data.hide=false;});var B=this,C=function(J){var K=B._.contents,L=false;for(var M in K)for(var N in K[M]){L=J.call(this,K[M][N]);if(L)return;}};this.on('ok',function(J){C(function(K){if(K.validate){var L=K.validate(this);if(typeof L=='string'){alert(L);L=false;}if(L===false){if(K.select)K.select();else K.focus();J.data.hide=false;J.stop();return true;}}});},this,null,0);this.on('cancel',function(J){C(function(K){if(K.isChanged()){if(!confirm(v.lang.common.confirmCancel))J.data.hide=false;return true;}});},this,null,0);this.parts.close.on('click',function(J){if(this.fire('cancel',{hide:true}).hide!==false)this.hide();
},this);function D(J){var K=B._.focusList,L=J?1:-1;if(K.length<1)return;var M=(B._.currentFocusIndex+L+K.length)%(K.length);while(!K[M].isFocusable()){M=(M+L+K.length)%(K.length);if(M==B._.currentFocusIndex)break;}K[M].focus();};function E(J){if(B!=CKEDITOR.dialog._.currentTop)return;var K=J.data.getKeystroke(),L=false;if(K==9||K==CKEDITOR.SHIFT+9){var M=K==CKEDITOR.SHIFT+9;if(B._.tabBarMode){var N=M?b.call(B):c.call(B);B.selectPage(N);B._.tabs[N][0].getFirst().focus();}else D(!M);L=true;}else if(K==CKEDITOR.ALT+121&&!B._.tabBarMode){B._.tabBarMode=true;B._.tabs[B._.currentTabId][0].getFirst().focus();L=true;}else if((K==37||K==39)&&(B._.tabBarMode)){var N=K==37?b.call(B):c.call(B);B.selectPage(N);B._.tabs[N][0].getFirst().focus();L=true;}if(L){J.stop();J.data.preventDefault();}};this.on('show',function(){CKEDITOR.document.on('keydown',E,this,null,0);if(CKEDITOR.env.ie6Compat){var J=new CKEDITOR.dom.document(frames('cke_dialog_background_iframe').document);J.on('keydown',E,this,null,0);}});this.on('hide',function(){CKEDITOR.document.removeListener('keydown',E);});this.on('show',function(){if(!this._.hasFocus){this._.currentFocusIndex=-1;D(true);}},this,null,4294967295);if(CKEDITOR.env.ie6Compat)this.on('load',function(J){var K=this.getElement(),L=K.getFirst();L.remove();L.appendTo(K);},this);j(this);k(this);new CKEDITOR.dom.text(x.title,CKEDITOR.document).appendTo(this.parts.title);for(A=0;A<x.contents.length;A++)this.addPage(x.contents[A]);var F=/cke_dialog_tab(\s|$|_)/,G=/cke_dialog_tab(\s|$)/;this.parts.tabs.on('click',function(J){var O=this;var K=J.data.getTarget(),L=K,M,N;if(!(F.test(K.$.className)||K.getName()=='a'))return;while(K.getName()!='td'||!G.test(K.$.className))K=K.getParent();M=K.$.id.substr(0,K.$.id.lastIndexOf('_'));O.selectPage(M);if(O._.tabBarMode){O._.tabBarMode=false;O._.currentFocusIndex=-1;D(true);}},this);var H=[],I=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:'hbox',className:'cke_dialog_footer_buttons',widths:[],children:x.buttons},H).getChild();this.parts.footer.setHtml(H.join(''));for(A=0;A<I.length;A++)this._.buttons[I[A].id]=I[A];this._.dummyText=CKEDITOR.dom.element.createFromHtml('<input type="text" style="position: absolute; left: -100000px; top: -100000px" />');this._.dummyText.appendTo(z);CKEDITOR.skins.load(v.config.skin,'dialog');};CKEDITOR.dialog.prototype={resize:(function(){return function(v,w){var x=this;if(x._.size&&x._.size.width==v&&x._.size.height==w)return;CKEDITOR.dialog.fire('resize',{dialog:x,skin:x._.editor.config.skin,width:v,height:w},x._.editor);
x._.size={width:v,height:w};};})(),getSize:function(){return CKEDITOR.tools.extend({},this._.size);},move:(function(){var v;return function(w,x){var z=this;if(v===undefined)v=z._.element.getFirst().getComputedStyle('position')=='fixed';if(v&&z._.position&&z._.position.x==w&&z._.position.y==x)return;z._.position={x:w,y:x};if(!v){var y=CKEDITOR.document.getWindow().getScrollPosition();w+=y.x;x+=y.y;}z._.element.getFirst().setStyles({left:w+'px',top:x+'px'});};})(),getPosition:function(){return CKEDITOR.tools.extend({},this._.position);},show:function(){var v=this._.element,w=this.definition;if(!(v.getParent()&&v.getParent().equals(CKEDITOR.document.getBody())))v.appendTo(CKEDITOR.document.getBody());else return;this.resize(w.minWidth,w.minHeight);var x=CKEDITOR.document.getWindow().getViewPaneSize();this.move((x.width-this._.size.width)/(2),(x.height-this._.size.height)/(2));this.selectPage(this.definition.contents[0].id);this.reset();if(CKEDITOR.dialog._.currentZIndex===null)CKEDITOR.dialog._.currentZIndex=this._.editor.config.baseFloatZIndex;this._.element.getFirst().setStyle('z-index',CKEDITOR.dialog._.currentZIndex+=10);if(CKEDITOR.dialog._.currentTop===null){CKEDITOR.dialog._.currentTop=this;this._.parentDialog=null;m(this._.editor);CKEDITOR.document.on('keydown',p);CKEDITOR.document.on('keyup',q);}else{this._.parentDialog=CKEDITOR.dialog._.currentTop;var y=this._.parentDialog.getElement().getFirst();y.$.style.zIndex-=Math.floor(this._.editor.config.baseFloatZIndex/2);CKEDITOR.dialog._.currentTop=this;}r(this,this,'\x1b',null,function(){this.getButton('cancel')&&this.getButton('cancel').click();});if(!this._.parentDialog)this.saveSelection();this._.dummyText.focus();this._.dummyText.$.select();this._.hasFocus=false;this.fireOnce('load',{});this.fire('show',{});this.foreach(function(z){z.setInitValue&&z.setInitValue();});},foreach:function(v){var y=this;for(var w in y._.contents)for(var x in y._.contents[w])v(y._.contents[w][x]);return y;},reset:(function(){var v=function(w){if(w.reset)w.reset();};return function(){this.foreach(v);return this;};})(),setupContent:function(){var v=arguments;this.foreach(function(w){if(w.setup)w.setup.apply(w,v);});},commitContent:function(){var v=arguments;this.foreach(function(w){if(w.commit)w.commit.apply(w,v);});},hide:function(){var v=this._.element;if(!v.getParent())return;v.remove();s(this);if(!this._.parentDialog)n();else{var w=this._.parentDialog.getElement().getFirst();w.setStyle('z-index',parseInt(w.$.style.zIndex,10)+Math.floor(this._.editor.config.baseFloatZIndex/2));
}CKEDITOR.dialog._.currentTop=this._.parentDialog;if(!this._.parentDialog){CKEDITOR.dialog._.currentZIndex=null;CKEDITOR.document.removeListener('keydown',p);CKEDITOR.document.removeListener('keyup',q);this.restoreSelection();this._.editor.focus();}else CKEDITOR.dialog._.currentZIndex-=10;this.fire('hide',{});this.foreach(function(x){x.resetInitValue&&x.resetInitValue();});},addPage:function(v){var F=this;var w=[],x=v.label?' title="'+CKEDITOR.tools.htmlEncode(v.label)+'"':'',y=v.elements,z=CKEDITOR.dialog._.uiElementBuilders.vbox.build(F,{type:'vbox',className:'cke_dialog_page_contents',children:v.elements,expand:!!v.expand},w),A=CKEDITOR.dom.element.createFromHtml(w.join('')),B=CKEDITOR.dom.element.createFromHtml(['<table><tbody><tr><td class="cke_dialog_tab">','<a href="javascript: void(0)"',x,' style="display: block; outline: none;" hidefocus="true">','<table border="0" cellspacing="0" cellpadding="0"><tbody><tr>','<td class="cke_dialog_tab_left"></td>','<td class="cke_dialog_tab_center">',CKEDITOR.tools.htmlEncode(v.label.replace(/ /g,'\xa0')),'</td>','<td class="cke_dialog_tab_right"></td>','</tr></tbody></table></a></td></tr></tbody></table>'].join(''));B=B.getChild([0,0,0]);if(F._.lastTab)F._.lastTab.removeClass('last');B.addClass(F._.pageCount>0?'last':'first');if(F._.pageCount===0)F.parts.c.addClass('single_page');else F.parts.c.removeClass('single_page');F._.tabs[v.id]=[B,A];F._.tabIdList.push(v.id);F._.pageCount++;F._.lastTab=B;var C=F._.contents[v.id]={},D,E=z.getChild();while(D=E.shift()){C[D.id]=D;if(typeof D.getChild=='function')E.push.apply(E,D.getChild());}B.unselectable();A.appendTo(F.parts.contents);B.insertBefore(F.parts.tabs.getChild(F.parts.tabs.getChildCount()-1));B.setAttribute('id',v.id+'_'+CKEDITOR.tools.getNextNumber());A.setAttribute('name',v.id);if(v.accessKey){r(F,F,'CTRL+'+v.accessKey,u,t);F._.accessKeyMap['CTRL+'+v.accessKey]=v.id;}},selectPage:function(v){var A=this;for(var w in A._.tabs){var x=A._.tabs[w][0],y=A._.tabs[w][1];if(w!=v){x.removeClass('cke_dialog_tab_selected');y.hide();}}var z=A._.tabs[v];z[0].addClass('cke_dialog_tab_selected');z[1].show();A._.currentTabId=v;A._.currentTabIndex=CKEDITOR.tools.indexOf(A._.tabIdList,v);},hidePage:function(v){var w=this._.tabs[v]&&this._.tabs[v][0];if(!w)return;w.hide();},showPage:function(v){var w=this._.tabs[v]&&this._.tabs[v][0];if(!w)return;w.show();},getElement:function(){return this._.element;},getContentElement:function(v,w){return this._.contents[v][w];},getValueOf:function(v,w){return this.getContentElement(v,w).getValue();
},setValueOf:function(v,w,x){return this.getContentElement(v,w).setValue(x);},getButton:function(v){return this._.buttons[v];},click:function(v){return this._.buttons[v].click();},disableButton:function(v){return this._.buttons[v].disable();},enableButton:function(v){return this._.buttons[v].enable();},getPageCount:function(){return this._.pageCount;},getParentEditor:function(){return this._.editor;},saveSelection:function(){var w=this;if(w._.editor.mode){w._.editor.focus();var v=new CKEDITOR.dom.selection(w._.editor.document);w._.selectedRanges=v.getRanges();w._.selectedElement=v.getSelectedElement();}},clearSavedSelection:function(){delete this._.selectedRanges;delete this._.selectedElement;},getSelectedElement:function(){return this._.selectedElement;},restoreSelection:function(){var v=this;if(v._.editor.mode&&v._.selectedRanges)new CKEDITOR.dom.selection(v._.editor.document).selectRanges(v._.selectedRanges);}};CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(v,w){if(!this._.dialogDefinitions[v]||typeof w=='function')this._.dialogDefinitions[v]=w;},exists:function(v){return!!this._.dialogDefinitions[v];},getCurrent:function(){return CKEDITOR.dialog._.currentTop;},okButton:(function(){var v=function(w,x){x=x||{};return CKEDITOR.tools.extend({id:'ok',type:'button',label:w.lang.common.ok,style:'width: 60px',onClick:function(y){var z=y.data.dialog;if(z.fire('ok',{hide:true}).hide!==false)z.hide();}},x,true);};v.type='button';v.override=function(w){return CKEDITOR.tools.extend(function(x){return v(x,w);},{type:'button'},true);};return v;})(),cancelButton:(function(){var v=function(w,x){x=x||{};return CKEDITOR.tools.extend({id:'cancel',type:'button',label:w.lang.common.cancel,style:'width: 60px',onClick:function(y){var z=y.data.dialog;if(z.fire('cancel',{hide:true}).hide!==false)z.hide();}},x,true);};v.type='button';v.override=function(w){return CKEDITOR.tools.extend(function(x){return v(x,w);},{type:'button'},true);};return v;})(),addUIElement:function(v,w){this._.uiElementBuilders[v]=w;},setMargins:function(v,w,x,y){this._.margins=[v,w,x,y];}});CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null,margins:[0,0,0,0]};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype,true);var d={resizable:CKEDITOR.DIALOG_RESIZE_NONE,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]},e=function(v,w,x){for(var y=0,z;z=v[y];y++){if(z.id==w)return z;
if(x&&z[x]){var A=e(z[x],w,x);if(A)return A;}}return null;},f=function(v,w,x,y,z){if(x){for(var A=0,B;B=v[A];A++){if(B.id==x){v.splice(A,0,w);return w;}if(y&&B[y]){var C=f(B[y],w,x,y,true);if(C)return C;}}if(z)return null;}v.push(w);return w;},g=function(v,w,x){for(var y=0,z;z=v[y];y++){if(z.id==w)return v.splice(y,1);if(x&&z[x]){var A=g(z[x],w,x);if(A)return A;}}return null;},h=function(v,w){this.dialog=v;var x=w.contents;for(var y=0,z;z=x[y];y++)x[y]=new i(v,z);CKEDITOR.tools.extend(this,w);};h.prototype={getContents:function(v){return e(this.contents,v);},getButton:function(v){return e(this.buttons,v);},addContents:function(v,w){return f(this.contents,v,w);},addButton:function(v,w){return f(this.buttons,v,w);},removeContents:function(v){g(this.contents,v);},removeButton:function(v){g(this.buttons,v);}};var i=function(v,w){this._={dialog:v};CKEDITOR.tools.extend(this,w);};i.prototype={get:function(v){return e(this.elements,v,'children');},add:function(v,w){return f(this.elements,v,w,'children');},remove:function(v){g(this.elements,v,'children');}};var j=function(v){var w=null,x=null,y=v.getElement().getFirst(),z=v._.editor.config.dialog_magnetDistance,A=function(C){var D=v.getSize(),E=CKEDITOR.document.getWindow().getViewPaneSize(),F=C.data.$.screenX,G=C.data.$.screenY,H=F-w.x,I=G-w.y,J,K;w={x:F,y:G};x.x+=H;x.y+=I;if(x.x+CKEDITOR.dialog._.margins[3]<z)J=-CKEDITOR.dialog._.margins[3];else if(x.x-CKEDITOR.dialog._.margins[1]>E.width-D.width-z)J=E.width-D.width+CKEDITOR.dialog._.margins[1];else J=x.x;if(x.y+CKEDITOR.dialog._.margins[0]<z)K=-CKEDITOR.dialog._.margins[0];else if(x.y-CKEDITOR.dialog._.margins[2]>E.height-D.height-z)K=E.height-D.height+CKEDITOR.dialog._.margins[2];else K=x.y;v.move(J,K);C.data.preventDefault();},B=function(C){CKEDITOR.document.removeListener('mousemove',A);CKEDITOR.document.removeListener('mouseup',B);if(CKEDITOR.env.ie6Compat){var D=new CKEDITOR.dom.document(frames('cke_dialog_background_iframe').document);D.removeListener('mousemove',A);D.removeListener('mouseup',B);}};v.parts.title.on('mousedown',function(C){w={x:C.data.$.screenX,y:C.data.$.screenY};CKEDITOR.document.on('mousemove',A);CKEDITOR.document.on('mouseup',B);x=v.getPosition();if(CKEDITOR.env.ie6Compat){var D=new CKEDITOR.dom.document(frames('cke_dialog_background_iframe').document);D.on('mousemove',A);D.on('mouseup',B);}C.data.preventDefault();},v);},k=function(v){var w=v.definition,x=w.minWidth||0,y=w.minHeight||0,z=w.resizable,A=function(P,Q){P.y+=Q;},B=function(P,Q){P.x2+=Q;
},C=function(P,Q){P.y2+=Q;},D=function(P,Q){P.x+=Q;},E=null,F=null,G=v._.editor.config.magnetDistance,H=['tl','t','tr','l','r','bl','b','br'],I=function(P){var Q=P.listenerData.part,R=v.getSize();F=v.getPosition();CKEDITOR.tools.extend(F,{x2:F.x+R.width,y2:F.y+R.height});E={x:P.data.$.screenX,y:P.data.$.screenY};CKEDITOR.document.on('mousemove',J,v,{part:Q});CKEDITOR.document.on('mouseup',K,v,{part:Q});if(CKEDITOR.env.ie6Compat){var S=new CKEDITOR.dom.document(frames('cke_dialog_background_iframe').document);S.on('mousemove',J,v,{part:Q});S.on('mouseup',K,v,{part:Q});}P.data.preventDefault();},J=function(P){var Q=P.data.$.screenX,R=P.data.$.screenY,S=Q-E.x,T=R-E.y,U=CKEDITOR.document.getWindow().getViewPaneSize(),V=P.listenerData.part;if(V.search('t')!=-1)A(F,T);if(V.search('l')!=-1)D(F,S);if(V.search('b')!=-1)C(F,T);if(V.search('r')!=-1)B(F,S);E={x:Q,y:R};var W,X,Y,Z;if(F.x+CKEDITOR.dialog._.margins[3]<G)W=-CKEDITOR.dialog._.margins[3];else if(V.search('l')!=-1&&F.x2-F.x<x+G)W=F.x2-x;else W=F.x;if(F.y+CKEDITOR.dialog._.margins[0]<G)X=-CKEDITOR.dialog._.margins[0];else if(V.search('t')!=-1&&F.y2-F.y<y+G)X=F.y2-y;else X=F.y;if(F.x2-CKEDITOR.dialog._.margins[1]>U.width-G)Y=U.width+CKEDITOR.dialog._.margins[1];else if(V.search('r')!=-1&&F.x2-F.x<x+G)Y=F.x+x;else Y=F.x2;if(F.y2-CKEDITOR.dialog._.margins[2]>U.height-G)Z=U.height+CKEDITOR.dialog._.margins[2];else if(V.search('b')!=-1&&F.y2-F.y<y+G)Z=F.y+y;else Z=F.y2;v.move(W,X);v.resize(Y-W,Z-X);P.data.preventDefault();},K=function(P){CKEDITOR.document.removeListener('mouseup',K);CKEDITOR.document.removeListener('mousemove',J);if(CKEDITOR.env.ie6Compat){var Q=new CKEDITOR.dom.document(frames('cke_dialog_background_iframe').document);Q.removeListener('mouseup',K);Q.removeListener('mousemove',J);}},L=/[lr]/,M=/[tb]/;for(var N=0;N<H.length;N++){var O=v.parts[H[N]+'_resize'];if(z==CKEDITOR.DIALOG_RESIZE_NONE||z==CKEDITOR.DIALOG_RESIZE_HEIGHT&&L.test(H[N])||z==CKEDITOR.DIALOG_RESIZE_WIDTH&&M.test(H[N])){O.hide();continue;}O.on('mousedown',I,v,{part:H[N]});}},l,m=function(v){var w=CKEDITOR.document.getWindow(),x=['<div style="position: ',CKEDITOR.env.ie6Compat?'absolute':'fixed','; z-index: ',v.config.baseFloatZIndex,'; top: 0px; left: 0px; ','background-color: ',v.config.dialog_backgroundCoverColor,'" id="cke_dialog_background_cover">'];if(CKEDITOR.env.ie6Compat)x.push('<iframe hidefocus="true" frameborder="0" name="cke_dialog_background_iframe" src="javascript: \'\'" ','style="position: absolute; left: 0px; top: 0px; width: 100%; height: 100%; ','progid:DXImageTransform.Microsoft.Alpha(opacity=0)" ></iframe>');
x.push('</div>');var y=CKEDITOR.dom.element.createFromHtml(x.join('')),z=function(){var C=w.getViewPaneSize();y.setStyles({width:C.width+'px',height:C.height+'px'});},A=function(){var C=w.getScrollPosition(),D=CKEDITOR.dialog._.currentTop;y.setStyles({left:C.x+'px',top:C.y+'px'});do{var E=D.getPosition();D.move(E.x,E.y);}while(D=D._.parentDialog)};l=z;w.on('resize',z);z();if(CKEDITOR.env.ie6Compat){var B=function(){A();arguments.callee.prevScrollHandler.apply(this,arguments);};w.$.setTimeout(function(){B.prevScrollHandler=window.onscroll||(function(){});window.onscroll=B;},0);A();}y.setOpacity(v.config.dialog_backgroundCoverOpacity);y.appendTo(CKEDITOR.document.getBody());},n=function(){var v=CKEDITOR.document.getById('cke_dialog_background_cover'),w=CKEDITOR.document.getWindow();if(v){v.remove();w.removeListener('resize',l);if(CKEDITOR.env.ie6Compat)w.$.setTimeout(function(){var x=window.onscroll&&window.onscroll.prevScrollHandler;window.onscroll=x||null;},0);l=null;}},o={},p=function(v){var w=v.data.$.ctrlKey||v.data.$.metaKey,x=v.data.$.altKey,y=v.data.$.shiftKey,z=String.fromCharCode(v.data.$.keyCode),A=o[(w?'CTRL+':'')+(x?'ALT+':'')+(y?'SHIFT+':'')+z];if(!A||!A.length)return;A=A[A.length-1];A.keydown&&A.keydown.call(A.uiElement,A.dialog,A.key);v.data.preventDefault();},q=function(v){var w=v.data.$.ctrlKey||v.data.$.metaKey,x=v.data.$.altKey,y=v.data.$.shiftKey,z=String.fromCharCode(v.data.$.keyCode),A=o[(w?'CTRL+':'')+(x?'ALT+':'')+(y?'SHIFT+':'')+z];if(!A||!A.length)return;A=A[A.length-1];A.keyup&&A.keyup.call(A.uiElement,A.dialog,A.key);v.data.preventDefault();},r=function(v,w,x,y,z){var A=o[x]||(o[x]=[]);A.push({uiElement:v,dialog:w,key:x,keyup:z||v.accessKeyUp,keydown:y||v.accessKeyDown});},s=function(v){for(var w in o){var x=o[w];for(var y=x.length-1;y>=0;y--)if(x[y].dialog==v||x[y].uiElement==v)x.splice(y,1);if(x.length===0)delete o[w];}},t=function(v,w){if(v._.accessKeyMap[w])v.selectPage(v._.accessKeyMap[w]);},u=function(v,w){};(function(){CKEDITOR.ui.dialog={uiElement:function(v,w,x,y,z,A,B){if(arguments.length<4)return;var C=(y.call?y(w):y)||('div'),D=['<',C,' '],E=(z&&z.call?z(w):z)||({}),F=(A&&A.call?A(w):A)||({}),G=(B&&B.call?B(v,w):B)||(''),H=this.domId=F.id||CKEDITOR.tools.getNextNumber()+'_uiElement',I=this.id=w.id,J;F.id=H;var K={};if(w.type)K['cke_dialog_ui_'+w.type]=1;if(w.className)K[w.className]=1;var L=F['class']&&F['class'].split?F['class'].split(' '):[];for(J=0;J<L.length;J++)if(L[J])K[L[J]]=1;var M=[];for(J in K)M.push(J);F['class']=M.join(' ');
if(w.title)F.title=w.title;var N=(w.style||'').split(';');for(J in E)N.push(J+':'+E[J]);for(J=N.length-1;J>=0;J--)if(N[J]==='')N.splice(J,1);if(N.length>0)F.style=(F.style||'')+(N.join('; '));for(J in F)D.push(J+'="'+CKEDITOR.tools.htmlEncode(F[J])+'" ');D.push('>',G,'</',C,'>');x.push(D.join(''));(this._||(this._={})).dialog=v;if(typeof w.isChanged=='boolean')this.isChanged=function(){return w.isChanged;};if(typeof w.isChanged=='function')this.isChanged=w.isChanged;CKEDITOR.event.implementOn(this);this.registerEvents(w);if(this.accessKeyUp&&this.accessKeyDown&&w.accessKey)r(this,v,'CTRL+'+w.accessKey);var O=this;v.on('load',function(){if(O.getInputElement())O.getInputElement().on('focus',function(){v._.tabBarMode=false;v._.hasFocus=true;O.fire('focus');},O);});if(this.keyboardFocusable){this.focusIndex=v._.focusList.push(this)-1;this.on('focus',function(){v._.currentFocusIndex=O.focusIndex;});}CKEDITOR.tools.extend(this,w);},hbox:function(v,w,x,y,z){if(arguments.length<4)return;this._||(this._={});var A=this._.children=w,B=z&&z.widths||null,C=z&&z.height||null,D={},E,F=function(){var G=['<tbody><tr class="cke_dialog_ui_hbox">'];for(E=0;E<x.length;E++){var H='cke_dialog_ui_hbox_child',I=[];if(E===0)H='cke_dialog_ui_hbox_first';if(E==x.length-1)H='cke_dialog_ui_hbox_last';G.push('<td class="',H,'" ');if(B)if(B[E])I.push('width:'+CKEDITOR.tools.cssLength(B[E]));else I.push('width:'+Math.floor(100/x.length)+'%');if(C)I.push('height:'+CKEDITOR.tools.cssLength(C));if(z&&z.padding!=undefined)I.push('padding:'+CKEDITOR.tools.cssLength(z.padding));if(I.length>0)G.push('style="'+I.join('; ')+'" ');G.push('>',x[E],'</td>');}G.push('</tr></tbody>');return G.join('');};CKEDITOR.ui.dialog.uiElement.call(this,v,z||{type:'hbox'},y,'table',D,{align:z&&z.align||(v.getParentEditor().lang.dir=='ltr'?'left':'right')},F);},vbox:function(v,w,x,y,z){if(arguments.length<3)return;this._||(this._={});var A=this._.children=w,B=z&&z.width||null,C=z&&z.heights||null,D=function(){var E=['<table cellspacing="0" border="0" '];E.push('style="');if(z&&z.expand)E.push('height:100%;');E.push('width:'+CKEDITOR.tools.cssLength(B||'100%'),';');E.push('"');E.push('align="',CKEDITOR.tools.htmlEncode(z&&z.align||(v.getParentEditor().lang.dir=='ltr'?'left':'right')),'" ');E.push('><tbody>');for(var F=0;F<x.length;F++){var G=[];E.push('<tr><td ');if(B)G.push('width:'+CKEDITOR.tools.cssLength(B||'100%'));if(C)G.push('height:'+CKEDITOR.tools.cssLength(C[F]));else if(z&&z.expand)G.push('height:'+Math.floor(100/x.length)+'%');
if(z&&z.padding!=undefined)G.push('padding:'+CKEDITOR.tools.cssLength(z.padding));if(G.length>0)E.push('style="',G.join('; '),'" ');E.push(' class="cke_dialog_ui_vbox_child">',x[F],'</td></tr>');}E.push('</tbody></table>');return E.join('');};CKEDITOR.ui.dialog.uiElement.call(this,v,z||{type:'vbox'},y,'div',null,null,D);}};})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){return CKEDITOR.document.getById(this.domId);},getInputElement:function(){return this.getElement();},getDialog:function(){return this._.dialog;},setValue:function(v){this.getInputElement().setValue(v);this.fire('change',{value:v});return this;},getValue:function(){return this.getInputElement().getValue();},isChanged:function(){return false;},selectParentTab:function(){var y=this;var v=y.getInputElement(),w=v,x;while((w=w.getParent())&&(w.$.className.search('cke_dialog_page_contents')==-1)){}if(!w)return y;x=w.getAttribute('name');y._.dialog.selectPage(x);return y;},focus:function(){this.selectParentTab().getInputElement().focus();return this;},registerEvents:function(v){var w=/^on([A-Z]\w+)/,x,y=function(A,B,C,D){B.on('load',function(){A.getInputElement().on(C,D,A);});};for(var z in v){if(!(x=z.match(w)))continue;if(this.eventProcessors[z])this.eventProcessors[z].call(this,this._.dialog,v[z]);else y(this,this._.dialog,x[1].toLowerCase(),v[z]);}return this;},eventProcessors:{onLoad:function(v,w){v.on('load',w,this);},onShow:function(v,w){v.on('show',w,this);},onHide:function(v,w){v.on('hide',w,this);}},accessKeyDown:function(v,w){this.focus();},accessKeyUp:function(v,w){},disable:function(){var v=this.getInputElement();v.setAttribute('disabled','true');v.addClass('cke_disabled');},enable:function(){var v=this.getInputElement();v.removeAttribute('disabled');v.removeClass('cke_disabled');},isEnabled:function(){return!this.getInputElement().getAttribute('disabled');},isVisible:function(){return!!this.getInputElement().$.offsetHeight;},isFocusable:function(){if(!this.isEnabled()||!this.isVisible())return false;return true;}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(),{getChild:function(v){var w=this;if(arguments.length<1)return w._.children.concat();if(!v.splice)v=[v];if(v.length<2)return w._.children[v[0]];else return w._.children[v[0]]&&w._.children[v[0]].getChild?w._.children[v[0]].getChild(v.slice(1,v.length)):null;}},true);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox();(function(){var v={build:function(w,x,y){var z=x.children,A,B=[],C=[];
for(var D=0;D<z.length&&(A=z[D]);D++){var E=[];B.push(E);C.push(CKEDITOR.dialog._.uiElementBuilders[A.type].build(w,A,E));}return new CKEDITOR.ui.dialog[x.type](w,C,B,y,x);}};CKEDITOR.dialog.addUIElement('hbox',v);CKEDITOR.dialog.addUIElement('vbox',v);})();CKEDITOR.dialogCommand=function(v){this.dialogName=v;};CKEDITOR.dialogCommand.prototype={exec:function(v){v.openDialog(this.dialogName);}};(function(){var v=/^([a]|[^a])+$/,w=/^\d*$/,x=/^\d*(?:\.\d+)?$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){return function(){var E=this;var y=E&&E.getValue?E.getValue():arguments[0],z=undefined,A=CKEDITOR.VALIDATE_AND,B=[],C;for(C=0;C<arguments.length;C++)if(typeof arguments[C]=='function')B.push(arguments[C]);else break;if(C<arguments.length&&typeof arguments[C]=='string'){z=arguments[C];C++;}if(C<arguments.length&&typeof arguments[C]=='number')A=arguments[C];var D=A==CKEDITOR.VALIDATE_AND?true:false;for(C=0;C<B.length;C++)if(A==CKEDITOR.VALIDATE_AND)D=D&&B[C](y);else D=D||B[C](y);if(!D){if(z!==undefined)alert(z);if(E&&(E.select||E.focus))E.select||E.focus();return false;}return true;};},regex:function(y,z){return function(){var B=this;var A=B&&B.getValue?B.getValue():arguments[0];if(!y.test(A)){if(z!==undefined)alert(z);if(B&&(B.select||B.focus))if(B.select)B.select();else B.focus();return false;}return true;};},notEmpty:function(y){return this.regex(v,y);},integer:function(y){return this.regex(w,y);},number:function(y){return this.regex(x,y);},equals:function(y,z){return this.functions(function(A){return A==y;},z);},notEqual:function(y,z){return this.functions(function(A){return A!=y;},z);}};})();})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(a){var b=CKEDITOR.dialog._.dialogDefinitions[a];if(typeof b=='function'){var c=this._.storedDialogs||(this._.storedDialogs={}),d=c[a]||(c[a]=new CKEDITOR.dialog(this,a));d.show();return d;}var e=CKEDITOR.document.getBody(),f=e.$.style.cursor,g=this;e.setStyle('cursor','wait');CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(b),function(){g.openDialog(a);e.setStyle('cursor',f);});return null;}});CKEDITOR.config.dialog_backgroundCoverColor='white';CKEDITOR.config.dialog_backgroundCoverOpacity=0.5;CKEDITOR.config.dialog_magnetDistance=20;
