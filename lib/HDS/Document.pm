#!/usr/local/perl/bin/perl
#======================================================================
#
# NAME:  HDS::Document.pm
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
package HDS::Document;


use strict;
use base 'HDS::DBI';


#----------------------------------------------------------------------
# Table definition
#----------------------------------------------------------------------
HDS::Document->table('document');
HDS::Document->columns(All => qw(id
                                 owner
                                 access
                                 category
                                 title
                                 description
                                 is_active
                                 create_date
                                 modify_date
                                 mime_type
                                 bytes
                                 file_name
                                 file_path
                                 download_count
                                 ));



#----------------------------------------------------------------------
# Relationships
#----------------------------------------------------------------------
HDS::Document->has_a(owner   => 'HDS::User');
HDS::Document->has_a(category   => 'HDS::Category');
HDS::Document->has_a(access   => 'HDS::Access');
HDS::Document->has_many(comments   => 'HDS::DocumentComment', {order_by => 'create_date DESC'});


sub display_size {
   my ($self) = @_;

   my $bytes = $self->bytes;
   
   my $kb = $bytes / 1024;
   if ($bytes < 1000) {
      return sprintf " %d",$bytes;
   }
   elsif ($bytes < 1024) {
      return sprintf "%0.2fKB", $kb;
   }
   elsif ($kb < 10) {
      return sprintf "%1.1fKB", $kb;
   }
   else {
      my $mb = $kb / 1024;
      if ($kb < 1000) {
         return sprintf "%3.0fKB", $kb;
      }
      elsif ($kb < 1024) {
         return sprintf "%0.2fMB", $mb;
      }
      elsif ($mb < 10) {
         return sprintf "%1.1fMB", $mb;
      }
      else {
         my $gb = $mb / 1024;
         if ($mb < 1000) {
            return sprintf "%3.0fMB", $mb;
         }
         elsif ($mb < 1024) {
            return sprintf "%0.2fGB", $gb;
         }
         elsif ($gb < 10) {
            return sprintf "%1.1fGB", $gb;
         }
         else {
            return sprintf "%3.0fGB", $gb;
         }
      }
   }
}



#======================================================================
# END OF HDS::Document.pm
#======================================================================
1;


