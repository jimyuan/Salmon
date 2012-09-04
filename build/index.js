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
	var context ={};
	//set active page
	var key=name.replace(/\.mustache$/, '').split("-");
	context[key[0]]= ' class="active"';
	if(key.length==2) context[key[1]]= ' class="active"';

	//set homepage variable
	if(name.match(/^index/)) {
		context["items"]=[
			 {"img":"Marinated-Salmon-Portion", "name":"调味三文鱼块", "active": " active"}
			,{"img":"Salmon-Skewer", "name":"烧烤三文鱼串"}
			,{"img":"Light-Salted-Salmon", "name":"盐烧三文鱼"}
			,{"img":"Stuffed-Salmon", "name":"三文鱼芝士夹心"}
			,{"img":"Graved-Salmon", "name":"香草三文鱼"}
			,{"img":"Salmon-Sashimi", "name":"三文鱼刺身"}
			,{"img":"Salmon-Burger", "name":"三文鱼饼"}
			,{"img":"Salmon-Sausage", "name":"三文鱼香肠"}
		];
		context["jszone"]=true;
		context["script"]=key[0]
	}

	page = hogan.compile(page)
	page = layout.render(context, {
		body: page
		, header: header
		, footer: footer
	})

	fs.writeFileSync(__dirname + '/../' + name.replace(/mustache$/, 'html'), page, 'utf-8')
})