﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('newpage',{init:function(a){a.addCommand('newpage',{modes:{wysiwyg:1,source:1},exec:function(b){b.setData(b.config.newpage_html);b.focus();}});a.ui.addButton('NewPage',{label:a.lang.newPage,command:'newpage'});}});CKEDITOR.config.newpage_html='';
