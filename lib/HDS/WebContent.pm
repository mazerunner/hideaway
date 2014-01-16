#!/usr/local/perl/bin/perl
#======================================================================
#
# NAME:  HDS::WebContent.pm
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
package HDS::WebContent;


use strict;
use base 'HDS::DBI';


#----------------------------------------------------------------------
# Table definition
#----------------------------------------------------------------------
HDS::WebContent->table('web_content');
HDS::WebContent->columns(All => qw(id
                                   access
                                   page
                                   section
                                   content_order
                                   content
                                 ));



#----------------------------------------------------------------------
# Relationships
#----------------------------------------------------------------------
#HDS::WebContent->has_a(owner   => 'HDS::User');
#HDS::WebContent->has_a(category   => 'HDS::Category');
HDS::WebContent->has_a(access   => 'HDS::Access');


#======================================================================
# END OF HDS::WebContent.pm
#======================================================================
1;


