Object.defineProperty(exports,"__esModule",{value:!0});var n=require("path"),e=require("fs");exports.default=function(o,t){o.onBuildStart((function(){if("production"!==process.env.NODE_ENV){console.log("Loading ⏳ : generate config global declare...");var t,r=o.initialConfig.defineConstants;if(r)(0,e.writeFile)((0,n.resolve)("./defineConstants.d.ts"),(t=r,Object.keys(t).reduce((function(n,e){var o=typeof t[e];if("string"===o)try{o=typeof JSON.parse(t[e])}catch(n){o="unknown",n.toString().includes("SyntaxError")?console.warn("[33m%s","\n(!!!)Taro-plugin-auto-declare-define-constants: \nConfig: defineConstants中有一个未识别成字符串：「".concat(e,"」（如果就是要变量/表达式请忽略）\n")):console.error("[91m","\n(!!!)Taro-plugin-auto-declare-define-constants: \n插件异常：".concat(n,"\n"))}return n+"declare const ".concat(e,": ").concat(o,";\n")}),"")),{flag:"w"},(function(n){n?console.error("\nError ❌ : ".concat(n)):console.log("\nSuccessful ✅ : generate config global declare")}))}}))};
