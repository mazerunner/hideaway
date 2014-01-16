#!/usr/local/perl/bin/perl
#======================================================================
#
# NAME:  HDS::User.pm
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
package HDS::User;


use strict;
use base 'HDS::DBI';


#----------------------------------------------------------------------
# Table definition
#----------------------------------------------------------------------
HDS::User->table('user');
HDS::User->columns(All => qw(id
                             username
                             password
                             full_name
                             is_active
                             access
                             email
                             phone1
                             phone2
                             change_passwd
                             delete_flag
                            ));



#----------------------------------------------------------------------
# Relationships
#----------------------------------------------------------------------
#HDS::User->has_a(organization_id => 'HDS::Organization');
#HDS::User->has_many(roles => [ 'HDS::UserRole' => 'role_id' ]);
#HDS::User->has_many(bookings => [ 'HDS::Booking' => 'user_id' ]);
HDS::User->has_a(access => 'HDS::Access');
HDS::User->has_many(comments   => 'HDS::DocumentComment');

#======================================================================
# END OF HDS::User.pm
#======================================================================
1;


