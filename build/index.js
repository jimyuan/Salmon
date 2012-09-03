#!/usr/bin/env node
var hogan = require('hogan.js')
	, fs    = require('fs')


var layout, pages

// compile layout template
layout = fs.readFileSync(__dirname + '/../templates/layout.mustache', 'utf-8')
layout = hogan.compile(layout)

header = fs.readFileSync(__dirname + '/../templates/_header.mustache', 'utf-8')
header = hogan.compile(header)

footer = fs.readFileSync(__dirname + '/../templates/_footer.mustache', 'utf-8')
footer = hogan.compile(footer)


// iterate over pages
fs.readdirSync(__dirname + '/../templates/pages').forEach(function (name) {

	if (!name.match(/\.mustache$/)) return

	var page = fs.readFileSync(__dirname  + '/../templates/pages/' + name, 'utf-8');
	var context ={page : true}
	//context[name.replace(/\.mustache$/, '')] = ' class="active"';
	var key=name.replace(/\.mustache$/, '').split("-");
	context[key[0]]= ' class="active"';
	if(key.length==2) context[key[1]]= ' class="active"';
	page = hogan.compile(page)
	page = layout.render(context, {
		body: page
		, header: header
		, footer: footer
	})

	fs.writeFileSync(__dirname + '/../' + name.replace(/mustache$/, 'html'), page, 'utf-8')
})