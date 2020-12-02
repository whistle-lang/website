(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{151:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return a})),n.d(t,"metadata",(function(){return l})),n.d(t,"rightToc",(function(){return c})),n.d(t,"default",(function(){return s}));var i=n(2),o=n(9),r=(n(0),n(162)),a={id:"hello-world",title:"Hello, World!"},l={id:"getting-started/hello-world",isDocsHomePage:!1,title:"Hello, World!",description:"Now that you have installe Whistle on to writing your first program! The program",source:"@site/docs/getting-started/hello-world.md",permalink:"/docs/getting-started/hello-world",editUrl:"https://github.com/whistle-lang/website/edit/master/website/docs/getting-started/hello-world.md",sidebar:"someSidebar",previous:{title:"Installation",permalink:"/docs/getting-started/installation"},next:{title:"playground",permalink:"/docs/getting-started/playground"}},c=[{value:"Writing and Running your first Whistle Program",id:"writing-and-running-your-first-whistle-program",children:[]},{value:"Explanation",id:"explanation",children:[]}],p={rightToc:c};function s(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)("wrapper",Object(i.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,"Now that you have installe ",Object(r.b)("em",{parentName:"p"},"Whistle")," on to writing your first program! The program\nwill print ",Object(r.b)("inlineCode",{parentName:"p"},"Hello, World!")," to the console as per tradition when writing your first\nprogram in a new programming language."),Object(r.b)("h2",{id:"writing-and-running-your-first-whistle-program"},"Writing and Running your first Whistle Program"),Object(r.b)("p",null,"The first step in creating a ",Object(r.b)("em",{parentName:"p"},"Whistle")," program is creating a new file with the\nextension ",Object(r.b)("inlineCode",{parentName:"p"},".whi")," to signify that it is a ",Object(r.b)("em",{parentName:"p"},"Whistle")," source file. This file will\nbe tokenized, parsed and finally compiled by the ",Object(r.b)("em",{parentName:"p"},"Whistle")," compiler."),Object(r.b)("p",null,"In this case a new file called ",Object(r.b)("inlineCode",{parentName:"p"},"HelloWorld.whi")," will be created with the following\ncontent:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'fun log(text: string): none {\n  #(js) console.log(text);\n}\n\nlog("Hello, World!")\n')),Object(r.b)("p",null,"All we need to do now to run the program is to run the following in your terminal:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{className:"language-bash"}),"$ whistle run HelloWorld.whi\n")),Object(r.b)("p",null,"And the following output should appear in your terminal:"),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),"Hello, World!\n")),Object(r.b)("p",null,"If ",Object(r.b)("inlineCode",{parentName:"p"},"Hello, World!")," did print, congratulations! You\u2019ve officially written a\n",Object(r.b)("em",{parentName:"p"},"Whistle")," program. If it however did not print your installation most likely\ndid not succeed or your ",Object(r.b)("inlineCode",{parentName:"p"},"PATH")," does not include the ",Object(r.b)("inlineCode",{parentName:"p"},"~\\.deno\\bin")," directory."),Object(r.b)("h2",{id:"explanation"},"Explanation"),Object(r.b)("p",null,"The ",Object(r.b)("inlineCode",{parentName:"p"},"Hello, World!")," program shows quite a few of ",Object(r.b)("em",{parentName:"p"},"Whistle"),"s design choices and\nhow to use some of the basic features of ",Object(r.b)("em",{parentName:"p"},"Whistle"),"."),Object(r.b)("p",null,"The first important piece of the program is the function declaration declared\nusing the fun keyword. This tells the ",Object(r.b)("a",Object(i.a)({parentName:"p"},{href:"internals/parser.md"}),"parser")," to\nexpect the name or so called ",Object(r.b)("inlineCode",{parentName:"p"},"identifier")," of the function. After this an optional\nparenthesis enclosed part comes which specifies all of the parameter names and\ntheir respective types. Before the last part which is the actual function body\nstatement the return type of the function is specified."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),"fun log(text: string): none {\n\n}\n")),Object(r.b)("p",null,"When the function declared is supposed to be accessable from other files than\nthe one it is specified in the ",Object(r.b)("inlineCode",{parentName:"p"},"export")," keyword can be used to prefix the function\ndeclaration like this: ",Object(r.b)("inlineCode",{parentName:"p"},"export function example: none { ... }"),"."),Object(r.b)("p",null,'"Tips" in ',Object(r.b)("em",{parentName:"p"},"Whistle")," are specified by using the ",Object(r.b)("inlineCode",{parentName:"p"},"#( ) ...")," syntax (or ",Object(r.b)("inlineCode",{parentName:"p"},"#( ) { ... }#"),'\nfor inline or multiline "tips"). They are a way of telling the compiler things\nabout your code such as telling it to insert the raw javascript code directly into\na program compiled to javascript.'),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),"#(js) console.log(text);\n")),Object(r.b)("p",null,"In our case this tells the compiler to call the javascript method ",Object(r.b)("inlineCode",{parentName:"p"},"console.log"),"\ndirectly to print our text parameter to console."),Object(r.b)("p",null,"Finally we come to the last part of the ",Object(r.b)("inlineCode",{parentName:"p"},"Hello, World!")," example, a function call statement which calls the\nfunction previously declared. It does this by first specifying the identifier of\nthe function to call (in this case ",Object(r.b)("inlineCode",{parentName:"p"},"log"),") and then enclosing all of the parameters\nto pass to the function in parethesis separated by commas."),Object(r.b)("pre",null,Object(r.b)("code",Object(i.a)({parentName:"pre"},{}),'log("Hello, World!")\n')))}s.isMDXComponent=!0}}]);