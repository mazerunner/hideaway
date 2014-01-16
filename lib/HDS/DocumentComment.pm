#!/usr/local/perl/bin/perl
#======================================================================
#
# NAME:  HDS::DocumentComment.pm
#
# DESC:  
#        
#
# ARGS:  Nothing
#
# RET:   Nothing
#
# HIST:  
#
#======================================================================
# Copyright 2009 - WilderSolutions as an unpublished work
#======================================================================
package HDS::DocumentComment;


use strict;
use base 'HDS::DBI';


#----------------------------------------------------------------------
# Table definition
#----------------------------------------------------------------------
HDS::DocumentComment->table('document_comment');
HDS::DocumentComment->columns(All => qw(id
                                        user
                                        document
                                        is_active
                                        comment
                                        create_date
                                        ));



#----------------------------------------------------------------------
# Relationships
#----------------------------------------------------------------------
HDS::DocumentComment->has_a(user => 'HDS::User');
HDS::DocumentComment->has_a(document => 'HDS::Document');

#======================================================================
# END OF HDS::DocumentComment.pm
#======================================================================
1;


