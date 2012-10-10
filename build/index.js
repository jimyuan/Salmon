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

about_nav = fs.readFileSync(__dirname + '/../templates/_about-nav.mustache', 'utf-8')
about_nav = hogan.compile(about_nav)

cook_nav = fs.readFileSync(__dirname + '/../templates/_cook-nav.mustache', 'utf-8')
cook_nav = hogan.compile(cook_nav)

know_nav = fs.readFileSync(__dirname + '/../templates/_know-nav.mustache', 'utf-8')
know_nav = hogan.compile(know_nav)

var seafood=[
 	{"img":"Marinated-Salmon-Portion", "name":"调味三文鱼块", "active": " active"}
	,{"img":"Salmon-Skewer", "name":"烧烤三文鱼串"}
	,{"img":"Light-Salted-Salmon", "name":"盐烧三文鱼"}
	,{"img":"Stuffed-Salmon", "name":"三文鱼芝士夹心"}
	,{"img":"Graved-Salmon", "name":"香草三文鱼"}
	,{"img":"Salmon-Sashimi", "name":"三文鱼刺身","taobao":"http://item.taobao.com/item.htm?spm=a1z10.1.11.2.ab4ce7&id=13570415477"}
	,{"img":"Salmon-Burger", "name":"三文鱼饼"}
	,{"img":"Salmon-Sausage", "name":"三文鱼香肠","taobao":"http://item.taobao.com/item.htm?spm=a1z10.1.4.11.ab4ce7&id=13556633010"}
	,{"img":"Teriyaki-Horse-Mackerel-Fillet", "name":"照烧挪威竹荚鱼","taobao":"http://item.taobao.com/item.htm?spm=a1z10.1.11.6.ab4ce7&id=13751111661"}
	,{"img":"Select-Cold-Smoked-Salmon-Loin", "name":"精选冷熏三文鱼柳"}
	,{"img":"Hot-Smoked-Salmon", "name":"热熏三文鱼"}
	,{"img":"Horse-Mackerel-Fillet", "name":"开片挪威竹荚鱼"}
	,{"img":"Cold-Smoked-Salmon", "name":"冷熏三文鱼"}
]


// iterate over pages
fs.readdirSync(__dirname + '/../templates/pages').forEach(function (name) {

	if (!name.match(/\.mustache$/)) return

	var page = fs.readFileSync(__dirname  + '/../templates/pages/' + name, 'utf-8');
	var context ={};
	var act= ' class="active"'
	//set active page
	var key=name.replace(/\.mustache$/, '').split("-");
	context[key[0]]=act;
	if(key.length==2) context[key[1]]=act;
	if(key.length==3) context[key[2]]=act;

	//set homepage variable
	if(name.match(/^index/)) {
		context["items"]=[seafood[0],seafood[1],seafood[2],seafood[3],];
		context["jszone"]=true;
		context["script"]=key[0]
	}

	//seafood page
	if(name.match(/^seafood/)){
		context["pros"]=seafood;
		context["jszone"]=true;
		context["script"]=key[0]
	}

	//about-contact page
	if(name.match(/^about-contact/)){
		context["add_script"]='<script src="http://api.map.baidu.com/api?key=&v=1.1&services=true"></script>';
		context["jszone"]=true;
		context["script"]=name.replace(/\.mustache$/, '');
	}

	//cook pages
	if(name.match(/^cook-/)){
		context["jszone"]=true;
		context["script"]="cook";
	}
	
	page = hogan.compile(page)
	page = layout.render(context, {
		body: page
		, about_nav: about_nav
		, cook_nav: cook_nav
		, know_nav: know_nav
		, header: header
		, footer: footer
	})

	fs.writeFileSync(__dirname + '/../' + name.replace(/mustache$/, 'html'), page, 'utf-8')
})