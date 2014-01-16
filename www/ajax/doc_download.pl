#!/usr/local/bin/perl

use CGI;
use ModPerl::Registry;
use CGI::Cookie;
use HDS::DBI;
use HDS::User;
use HDS::Access;
use HDS::Document;

#$r = Apache2::RequestUtil->request;

$cgi = new CGI();
$file_name = "download";
$user = undef;
$user_access_level = 0;
%cookie_jar = CGI::Cookie->fetch($r);

if (exists $cookie_jar{'user_id'} && $cookie_jar{'user_id'}->value ne "") {
   $user = HDS::User->retrieve($cookie_jar{'user_id'}->value);
}

if ($user) {
   $user_access_level = $user->access->level;
}

$doc = HDS::Document->retrieve($cgi->param('doc_id'));
   
if ($doc) {
   if ($user_access_level >= $doc->access->level) {
      $doc_dir = "$ENV{SVR_HOME}/files/hideaway/$ENV{SVR_NAME}";
      
      if (-e "$doc_dir/" . $doc->file_path) {
         $doc->download_count($doc->download_count + 1);
         $doc->update();
         #$r->content_type($doc->mime_type);
         #$r->send_http_header;         
         
         print "Content-type: " . $doc->mime_type . "\n";
         print "Content-Disposition: attachment; filename= \"" . $doc->file_name . "\"\n\n";
         
         open FILE, "$doc_dir/" . $doc->file_path;
         binmode FILE;
         while (<FILE>) {
            print $_;
         }
         close FILE;
      }
      else {
         print "Content-type: text/html\n\n";
         print "<script type=\"text/javascript\">\n";
         print "alert('FILE NOT FOUND');\n";
         print "history.go(-1);\n";
         print "</script>\n";
      }
   }
   else {
      print "Content-type: text/javascript\n\n";
      print "alert('Access Denied');\n";
      print "history.go(-1);\n";
   }
}
else {
   print "Content-type: text/javascript\n\n";
   print "alert('FILE NOT FOUND');\n";
   print "history.go(-1);\n";      
}


