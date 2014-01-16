<h1>HOA Document management server</h1>

<hr/>

<h3>Server side</h3>
<i>Under lib/ directory</i>
<dl>
<dd>Apache with Embperl (mod-perl based module installed
<dd>Perl with Class::DBI installed
<dd>MySQL database
</dl>

<h3>Client-side</h3>
<i>Web document root: www/</i>
<dl>
<dd>jQuery
<dd>Javascript/DHTML/Ajax
</dl>


<h3>Why its cool</h3>
<dl>
<dd>Web 2.0/Ajax/DHTML make the interface responsive
<dd>Easy File upload using Ajax and IFrames
<dd>Perl Class DBI with Embperl means I can write code like this, right in the HTML document, without writing any SQL
<block>
```foreach my $cat (HDS::Category->retrieve_all()) {
	if ($user->access->level >= $cat->access->level) {
		push @categories, $cat;
	}
}

[$ foreach $cat (@categories) $]
	[- 
	@docs = ();
	foreach $doc ($cat->documents()) {
		if ($user_access >= $doc->access->level) {
			push @docs, $doc;
			push @all_docs, $doc;
		}
	}
	-]
	<div class="category_header">[+ $cat->name +] &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<i>(Requires [+ $cat->access->name +] access to see)</i></div>
	<div class="category_body">[+ $cat->description +]
	<table class="document_management" id="document_list_[+ $cat->id +]">
...ETC...
```
</block>
A User may have access to the Category of Files, or individual document.
    The --&gt; means the data is retrieved from more than one table in the database
</dd>
</dl>
