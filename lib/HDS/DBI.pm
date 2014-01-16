#!/usr/local/perl/bin/perl
#======================================================================
#
# NAME:  HDS::DBI.pm
#
# DESC:  Top level class from which to inherit all other Class::DBI
#        objects
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
package HDS::DBI;

use Time::Local;
#use Data::Dumper;

use base 'Class::DBI::Sweet';
use Class::DBI::AbstractSearch;
use Time::Local;
use Data::Dumper;

#======================================================================
# Global variables
#======================================================================

$config_file = "$ENV{SVR_HOME}/config/hideaway_$ENV{SVR_NAME}_config";

open (CFG, $config_file);

@in_cfg = <CFG>;
chomp @in_cfg;
close CFG;

my $config = {};
foreach (@in_cfg) {
   my ($name, $value) = split/:/;
   $config->{$name} = $value;
}

HDS::DBI->connection("dbi:mysql:$config->{db_name}:$config->{db_host}:$config->{db_port}", 
                    $config->{db_user}, $config->{db_pass});

my @months = (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);
my %month_names = (1  => "Jan",
                   2  => "Feb",
                   3  => "Mar",
                   4  => "Apr",
                   5  => "May",
                   6  => "Jun",
                   7  => "Jul",
                   8  => "Aug",
                   9  => "Sep",
                   10 => "Oct",
                   11 => "Nov",
                   12 => "Dec"
                   );

my %month_by_name = ( "Jan" => 1 ,
                      "Feb" => 2 ,
                      "Mar" => 3 ,
                      "Apr" => 4 ,
                      "May" => 5 ,
                      "Jun" => 6 ,
                      "Jul" => 7 ,
                      "Aug" => 8 ,
                      "Sep" => 9 ,
                      "Oct" => 10,
                      "Nov" => 11,
                      "Dec" => 12,
                     );


my %month_longs = (1  => "January",
                   2  => "February",
                   3  => "March",
                   4  => "April",
                   5  => "May",
                   6  => "June",
                   7  => "July",
                   8  => "August",
                   9  => "September",
                   10 => "October",
                   11 => "November",
                   12 => "December"
                   );

my %days_by_name = ("Sun" => "Sunday",
                    "Mon" => "Monday",
                    "Tue" => "Tuesday",
                    "Wed" => "Wednesday",
                    "Thu" => "Thursday",
                    "Fri" => "Friday",
                    "Sat" => "Saturday",
                     );

my %days_by_num = (0 => "Sunday",
                   1 => "Monday",
                   2 => "Tuesday",
                   3 => "Wednesday",
                   4 => "Thursday",
                   5 => "Friday",
                   6 => "Saturday",
                   7 => "Sunday"
                    );

sub display_date {
   my ($date, $with_time) = @_;
   
   my ($yr, $mon, $day, $time) = $date =~ /^(\d\d\d\d)\-(\d\d)\-(\d\d)\s?(.*)?$/;
   
   if ($with_time) {
      return qq($month_names{int($mon)} $day, $yr $time);
   }
   else {
      return qq($month_names{int($mon)} $day, $yr);
   }
}


sub db_now {
   my ($sec,$min,$hour,$day,$mon,$year) = (localtime);
   $mon++;
   $year += 1900;

   return sprintf("%04d-%02d-%02d %02d:%02d:%02d",
		  $year, $mon, $day, $hour, $min, $sec);
}

sub db_date_pretty {
   my ($adate) = @_;
   my $pretty = '';

   if ($adate eq "") {
      $pretty = scalar localtime();
      $pretty =~ 
       s/^(\w+)\s+(\w+)\s+(\d+)\s+(\d+)\:(\d+)\:(\d+)\s+(\d+)/$days_by_name{$1} $month_longs{$month_by_name{$2}} $3, $7/;
   }
   else {
      return $pretty if $adate =~ /^0/;
      
      my ($lyear, $lmon, $lday, $lhour, $lmin, $lsec) = 
          $adate =~ /(\d+)\-(\d+)\-(\d+)\s*(\d+)?\:?(\d+)?\:?(\d+)?$/;

      $lmon--;
      my $ltime = timelocal($lsec,$lmin,$lhour,$lday,$lmon,$lyear);
      @ltime = localtime($ltime);
      
      #($sec,$min,$hour,$mday,$mon,$year,$wday,$yday,$isdst) = localtime($ltime);
      $pretty = scalar localtime($ltime);
      
      $pretty =~ 
          s/^(\w+)\s+(\w+)\s+(\d+)\s+(\d+)\:(\d+)\:(\d+)\s+(\d+)/$days_by_name{$1} $month_longs{$month_by_name{$2}} $3, $7/;
      
      #$pretty =~ 
      #    s/^(\w+)\s+(\w+)\s+(\d+)\s+(\d+)\:(\d+)\:(\d+)\s+(\d+)/$1 $month_longs{$month_by_name{$2}} $3, $7/;
      
   }

   return $pretty;
}

sub date_plus_days {
   my ($adate, $days) = @_;
   my $aday = 3600 * 24;

   return $adate if $adate =~ /^0000-00-00/;
   my ($date, $time) = split /\s+/, $adate;

   my ($lyear, $lmon, $lday) = split /-/, $date;
   $lmon--;
   my $lhour = 0;
   my $lmin  = 0;
   my $lsec  = 0;

   if ($time) {
      ($lhour, $lmin, $lsec) = split /:/, $time;
   }

   my $ltime = timelocal($lsec,$lmin,$lhour,$lday,$lmon,$lyear);
   
   $ltime += ($aday * $days);
   @ltime = localtime($ltime);

   my $ldate = ($ltime[5] + 1900) . "-" . sprintf("%02d", ($ltime[4] + 1)) . "-" . sprintf("%02d", $ltime[3]);
   
   if ($time) {
      $ldate .= " " . sprintf("%02d", $ltime[2]) . ":" . sprintf("%02d", $ltime[1]) . ":" . sprintf("%02d", $ltime[0]);
   }
   
   return $ldate;
}

sub date_plus_weeks {
   return date_plus_days($_[0], $_[1] * 7);
}

sub date_diff {
   # Format is YYYY-MM-DD
   my ($date1, $date2) = @_;
   my ($years, $months, $days) = 0;

   return ($years, $months, $days)
       if $date1 !~ /^\d\d\d\d\-\d\d\-\d\d/ ||
       $date2 !~ /^\d\d\d\d\-\d\d\-\d\d/;

   $date1 =~ s/^(\d\d\d\d\-\d\d\-\d\d).*$/$1/;
   $date2 =~ s/^(\d\d\d\d\-\d\d\-\d\d).*$/$1/;
   
   my ($year1, $mon1, $day1) = $date1 =~ /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
   my ($year2, $mon2, $day2) = $date2 =~ /^(\d\d\d\d)-(\d\d)-(\d\d)$/;

   $mon1--;
   $mon2--;
   
   my $time1 = timelocal(0,0,0, $day1, $mon1, $year1);
   my $time2 = timelocal(0,0,0, $day2, $mon2, $year2);

   my $time  = abs ($time1 - $time2);

   $years = int($time / 31556926);
   $time = $time % 31556926;

   $months = int($time / 2629744);
   $time = $time % 2629744;

   $days = int($time / 86400);

   return ($years, $months, $days);
}



#======================================================================
# END OF HDS::DBI
#======================================================================
1;
