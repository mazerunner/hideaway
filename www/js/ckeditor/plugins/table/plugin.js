﻿/*
Copyright (c) 2003-2009, CKSource - Frederico Knabben. All rights reserved.
For licensing, see LICENSE.html or http://ckeditor.com/license
*/

CKEDITOR.plugins.add('table',{init:function(a){var b=CKEDITOR.plugins.table,c=a.lang.table;a.addCommand('table',new CKEDITOR.dialogCommand('table'));a.addCommand('tableProperties',new CKEDITOR.dialogCommand('tableProperties'));a.ui.addButton('Table',{label:c.toolbar,command:'table'});CKEDITOR.dialog.add('table',this.path+'dialogs/table.js');CKEDITOR.dialog.add('tableProperties',this.path+'dialogs/table.js');if(a.addMenuItems)a.addMenuItems({table:{label:c.menu,command:'tableProperties',group:'table',order:5},tablecell:{label:c.cell.menu,group:'tablecell',order:1,getItems:function(){return{tablecell_insertBefore:CKEDITOR.TRISTATE_OFF,tablecell_insertAfter:CKEDITOR.TRISTATE_OFF,tablecell_delete:CKEDITOR.TRISTATE_OFF};}},tablecell_insertBefore:{label:c.cell.insertBefore,group:'tablecell',order:5},tablecell_insertAfter:{label:c.cell.insertAfter,group:'tablecell',order:10},tablecell_delete:{label:c.cell.deleteCell,group:'tablecell',order:15},tablerow:{label:c.row.menu,group:'tablerow',order:1,getItems:function(){return{tablerow_insertBefore:CKEDITOR.TRISTATE_OFF,tablerow_insertAfter:CKEDITOR.TRISTATE_OFF,tablerow_delete:CKEDITOR.TRISTATE_OFF};}},tablerow_insertBefore:{label:c.row.insertBefore,group:'tablerow',order:5},tablerow_insertAfter:{label:c.row.insertAfter,group:'tablerow',order:10},tablerow_delete:{label:c.row.deleteRow,group:'tablerow',order:15},tablecolumn:{label:c.column.menu,group:'tablecolumn',order:1,getItems:function(){return{tablecolumn_insertBefore:CKEDITOR.TRISTATE_OFF,tablecolumn_insertAfter:CKEDITOR.TRISTATE_OFF,tablecolumn_delete:CKEDITOR.TRISTATE_OFF};}},tablecolumn_insertBefore:{label:c.column.insertBefore,group:'tablecolumn',order:5},tablecolumn_insertAfter:{label:c.column.insertAfter,group:'tablecolumn',order:10},tablecolumn_delete:{label:c.column.deleteColumn,group:'tablecolumn',order:15}});if(a.contextMenu)a.contextMenu.addListener(function(d,e){if(!d)return;var f=d.is('table'),g=!f&&d.hasAscendant('table');if(f||g){var h=g?{tablecell:CKEDITOR.TRISTATE_OFF,tablerow:CKEDITOR.TRISTATE_OFF,tablecolumn:CKEDITOR.TRISTATE_OFF}:{};h.tabledelete=CKEDITOR.TRISTATE_OFF;h.table=CKEDITOR.TRISTATE_OFF;return h;}return null;});}});
