#!/usr/local/perl/bin/perl
#======================================================================
#
# NAME:  HDS::Access.pm
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
package HDS::Access;


use strict;
use base 'HDS::DBI';


#----------------------------------------------------------------------
# Table definition
#----------------------------------------------------------------------
HDS::Access->table('access');
HDS::Access->columns(All => qw(id
                               name
                               description
                               level
                               ));



#----------------------------------------------------------------------
# Relationships
#----------------------------------------------------------------------
HDS::Access->has_many(users => [ 'HDS::User' => 'user_id' ]);
HDS::Access->has_many(categories => [ 'HDS::Category' => 'access' ]);
#HDS::Access->has_many(categories => [ 'HDS::Category' => 'access' ]);
#HDS::Access->has_many(web_content => [ 'HDS::User' => 'user_id' ]);
#HDS::Access->has_many(documents => [ 'HDS::User' => 'user_id' ]);

#======================================================================
# END OF HDS::Access.pm
#======================================================================
1;


