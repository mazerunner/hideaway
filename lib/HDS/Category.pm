#!/usr/local/perl/bin/perl
#======================================================================
#
# NAME:  HDS::Category.pm
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
# Copyright 2008 - Wilder Ski Vacations as an unpublished work
#======================================================================
package HDS::Category;


use strict;
use base 'HDS::DBI';


#----------------------------------------------------------------------
# Table definition
#----------------------------------------------------------------------
HDS::Category->table('category');
HDS::Category->columns(All => qw(id
                                 access
                                 is_active
                                 name
                                 description
                                 ));



#----------------------------------------------------------------------
# Relationships
#----------------------------------------------------------------------
HDS::Category->has_many(documents => 'HDS::Document');
HDS::Category->has_a(access => 'HDS::Access');

#======================================================================
# END OF HDS::Category.pm
#======================================================================
1;


