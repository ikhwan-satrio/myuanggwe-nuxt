import{T as M,ad as O,af as V,Y as X,ae as H,ab as q,a1 as b,K as o,O as _,L as Z,_ as U}from"./Ch4wSnJ3.js";function ee(n){return typeof n=="object"&&n!==null}function te(n,e){if(!!!n)throw new Error("Unexpected invariant triggered.")}const ne=/\r\n|[\n\r]/g;function S(n,e){let t=0,s=1;for(const i of n.body.matchAll(ne)){if(typeof i.index=="number"||te(!1),i.index>=e)break;t=i.index+i[0].length,s+=1}return{line:s,column:e+1-t}}function ie(n){return j(n.source,S(n.source,n.start))}function j(n,e){const t=n.locationOffset.column-1,s="".padStart(t)+n.body,i=e.line-1,r=n.locationOffset.line-1,c=e.line+r,d=e.line===1?t:0,f=e.column+d,E=`${n.name}:${c}:${f}
`,l=s.split(/\r\n|[\n\r]/g),A=l[i];if(A.length>120){const T=Math.floor(f/80),R=f%80,m=[];for(let I=0;I<A.length;I+=80)m.push(A.slice(I,I+80));return E+P([[`${c} |`,m[0]],...m.slice(1,T+1).map(I=>["|",I]),["|","^".padStart(R)],["|",m[T+1]]])}return E+P([[`${c-1} |`,l[i-1]],[`${c} |`,A],["|","^".padStart(f)],[`${c+1} |`,l[i+1]]])}function P(n){const e=n.filter(([s,i])=>i!==void 0),t=Math.max(...e.map(([s])=>s.length));return e.map(([s,i])=>s.padStart(t)+(i?" "+i:"")).join(`
`)}function se(n){const e=n[0];return e==null||"kind"in e||"length"in e?{nodes:e,source:n[1],positions:n[2],path:n[3],originalError:n[4],extensions:n[5]}:e}class $ extends Error{constructor(e,...t){var s,i,r;const{nodes:c,source:d,positions:f,path:E,originalError:l,extensions:A}=se(t);super(e),this.name="GraphQLError",this.path=E??void 0,this.originalError=l??void 0,this.nodes=B(Array.isArray(c)?c:c?[c]:void 0);const T=B((s=this.nodes)===null||s===void 0?void 0:s.map(m=>m.loc).filter(m=>m!=null));this.source=d??(T==null||(i=T[0])===null||i===void 0?void 0:i.source),this.positions=f??T?.map(m=>m.start),this.locations=f&&d?f.map(m=>S(d,m)):T?.map(m=>S(m.source,m.start));const R=ee(l?.extensions)?l?.extensions:void 0;this.extensions=(r=A??R)!==null&&r!==void 0?r:Object.create(null),Object.defineProperties(this,{message:{writable:!0,enumerable:!0},name:{enumerable:!1},nodes:{enumerable:!1},source:{enumerable:!1},positions:{enumerable:!1},originalError:{enumerable:!1}}),l!=null&&l.stack?Object.defineProperty(this,"stack",{value:l.stack,writable:!0,configurable:!0}):Error.captureStackTrace?Error.captureStackTrace(this,$):Object.defineProperty(this,"stack",{value:Error().stack,writable:!0,configurable:!0})}get[Symbol.toStringTag](){return"GraphQLError"}toString(){let e=this.message;if(this.nodes)for(const t of this.nodes)t.loc&&(e+=`

`+ie(t.loc));else if(this.source&&this.locations)for(const t of this.locations)e+=`

`+j(this.source,t);return e}toJSON(){const e={message:this.message};return this.locations!=null&&(e.locations=this.locations),this.path!=null&&(e.path=this.path),this.extensions!=null&&Object.keys(this.extensions).length>0&&(e.extensions=this.extensions),e}}function B(n){return n===void 0||n.length===0?void 0:n}function h(n,e,t){return new $(`Syntax Error: ${t}`,{source:n,positions:[e]})}var w;(function(n){n.QUERY="QUERY",n.MUTATION="MUTATION",n.SUBSCRIPTION="SUBSCRIPTION",n.FIELD="FIELD",n.FRAGMENT_DEFINITION="FRAGMENT_DEFINITION",n.FRAGMENT_SPREAD="FRAGMENT_SPREAD",n.INLINE_FRAGMENT="INLINE_FRAGMENT",n.VARIABLE_DEFINITION="VARIABLE_DEFINITION",n.SCHEMA="SCHEMA",n.SCALAR="SCALAR",n.OBJECT="OBJECT",n.FIELD_DEFINITION="FIELD_DEFINITION",n.ARGUMENT_DEFINITION="ARGUMENT_DEFINITION",n.INTERFACE="INTERFACE",n.UNION="UNION",n.ENUM="ENUM",n.ENUM_VALUE="ENUM_VALUE",n.INPUT_OBJECT="INPUT_OBJECT",n.INPUT_FIELD_DEFINITION="INPUT_FIELD_DEFINITION",n.DIRECTIVE_DEFINITION="DIRECTIVE_DEFINITION"})(w||(w={}));var a;(function(n){n.SOF="<SOF>",n.EOF="<EOF>",n.BANG="!",n.DOLLAR="$",n.AMP="&",n.PAREN_L="(",n.PAREN_R=")",n.DOT=".",n.SPREAD="...",n.COLON=":",n.EQUALS="=",n.AT="@",n.BRACKET_L="[",n.BRACKET_R="]",n.BRACE_L="{",n.PIPE="|",n.BRACE_R="}",n.NAME="Name",n.INT="Int",n.FLOAT="Float",n.STRING="String",n.BLOCK_STRING="BlockString",n.COMMENT="Comment"})(a||(a={}));class re{constructor(e){const t=new M(a.SOF,0,0,0,0);this.source=e,this.lastToken=t,this.token=t,this.line=1,this.lineStart=0}get[Symbol.toStringTag](){return"Lexer"}advance(){return this.lastToken=this.token,this.token=this.lookahead()}lookahead(){let e=this.token;if(e.kind!==a.EOF)do if(e.next)e=e.next;else{const t=oe(this,e.end);e.next=t,t.prev=e,e=t}while(e.kind===a.COMMENT);return e}}function ae(n){return n===a.BANG||n===a.DOLLAR||n===a.AMP||n===a.PAREN_L||n===a.PAREN_R||n===a.DOT||n===a.SPREAD||n===a.COLON||n===a.EQUALS||n===a.AT||n===a.BRACKET_L||n===a.BRACKET_R||n===a.BRACE_L||n===a.PIPE||n===a.BRACE_R}function x(n){return n>=0&&n<=55295||n>=57344&&n<=1114111}function v(n,e){return K(n.charCodeAt(e))&&Y(n.charCodeAt(e+1))}function K(n){return n>=55296&&n<=56319}function Y(n){return n>=56320&&n<=57343}function N(n,e){const t=n.source.body.codePointAt(e);if(t===void 0)return a.EOF;if(t>=32&&t<=126){const s=String.fromCodePoint(t);return s==='"'?`'"'`:`"${s}"`}return"U+"+t.toString(16).toUpperCase().padStart(4,"0")}function p(n,e,t,s,i){const r=n.line,c=1+t-n.lineStart;return new M(e,t,s,r,c,i)}function oe(n,e){const t=n.source.body,s=t.length;let i=e;for(;i<s;){const r=t.charCodeAt(i);switch(r){case 65279:case 9:case 32:case 44:++i;continue;case 10:++i,++n.line,n.lineStart=i;continue;case 13:t.charCodeAt(i+1)===10?i+=2:++i,++n.line,n.lineStart=i;continue;case 35:return ce(n,i);case 33:return p(n,a.BANG,i,i+1);case 36:return p(n,a.DOLLAR,i,i+1);case 38:return p(n,a.AMP,i,i+1);case 40:return p(n,a.PAREN_L,i,i+1);case 41:return p(n,a.PAREN_R,i,i+1);case 46:if(t.charCodeAt(i+1)===46&&t.charCodeAt(i+2)===46)return p(n,a.SPREAD,i,i+3);break;case 58:return p(n,a.COLON,i,i+1);case 61:return p(n,a.EQUALS,i,i+1);case 64:return p(n,a.AT,i,i+1);case 91:return p(n,a.BRACKET_L,i,i+1);case 93:return p(n,a.BRACKET_R,i,i+1);case 123:return p(n,a.BRACE_L,i,i+1);case 124:return p(n,a.PIPE,i,i+1);case 125:return p(n,a.BRACE_R,i,i+1);case 34:return t.charCodeAt(i+1)===34&&t.charCodeAt(i+2)===34?fe(n,i):de(n,i)}if(O(r)||r===45)return ue(n,i,r);if(V(r))return me(n,i);throw h(n.source,i,r===39?`Unexpected single quote character ('), did you mean to use a double quote (")?`:x(r)||v(t,i)?`Unexpected character: ${N(n,i)}.`:`Invalid character: ${N(n,i)}.`)}return p(n,a.EOF,s,s)}function ce(n,e){const t=n.source.body,s=t.length;let i=e+1;for(;i<s;){const r=t.charCodeAt(i);if(r===10||r===13)break;if(x(r))++i;else if(v(t,i))i+=2;else break}return p(n,a.COMMENT,e,i,t.slice(e+1,i))}function ue(n,e,t){const s=n.source.body;let i=e,r=t,c=!1;if(r===45&&(r=s.charCodeAt(++i)),r===48){if(r=s.charCodeAt(++i),O(r))throw h(n.source,i,`Invalid number, unexpected digit after 0: ${N(n,i)}.`)}else i=L(n,i,r),r=s.charCodeAt(i);if(r===46&&(c=!0,r=s.charCodeAt(++i),i=L(n,i,r),r=s.charCodeAt(i)),(r===69||r===101)&&(c=!0,r=s.charCodeAt(++i),(r===43||r===45)&&(r=s.charCodeAt(++i)),i=L(n,i,r),r=s.charCodeAt(i)),r===46||V(r))throw h(n.source,i,`Invalid number, expected digit but got: ${N(n,i)}.`);return p(n,c?a.FLOAT:a.INT,e,i,s.slice(e,i))}function L(n,e,t){if(!O(t))throw h(n.source,e,`Invalid number, expected digit but got: ${N(n,e)}.`);const s=n.source.body;let i=e+1;for(;O(s.charCodeAt(i));)++i;return i}function de(n,e){const t=n.source.body,s=t.length;let i=e+1,r=i,c="";for(;i<s;){const d=t.charCodeAt(i);if(d===34)return c+=t.slice(r,i),p(n,a.STRING,e,i+1,c);if(d===92){c+=t.slice(r,i);const f=t.charCodeAt(i+1)===117?t.charCodeAt(i+2)===123?pe(n,i):le(n,i):he(n,i);c+=f.value,i+=f.size,r=i;continue}if(d===10||d===13)break;if(x(d))++i;else if(v(t,i))i+=2;else throw h(n.source,i,`Invalid character within String: ${N(n,i)}.`)}throw h(n.source,i,"Unterminated string.")}function pe(n,e){const t=n.source.body;let s=0,i=3;for(;i<12;){const r=t.charCodeAt(e+i++);if(r===125){if(i<5||!x(s))break;return{value:String.fromCodePoint(s),size:i}}if(s=s<<4|g(r),s<0)break}throw h(n.source,e,`Invalid Unicode escape sequence: "${t.slice(e,e+i)}".`)}function le(n,e){const t=n.source.body,s=G(t,e+2);if(x(s))return{value:String.fromCodePoint(s),size:6};if(K(s)&&t.charCodeAt(e+6)===92&&t.charCodeAt(e+7)===117){const i=G(t,e+8);if(Y(i))return{value:String.fromCodePoint(s,i),size:12}}throw h(n.source,e,`Invalid Unicode escape sequence: "${t.slice(e,e+6)}".`)}function G(n,e){return g(n.charCodeAt(e))<<12|g(n.charCodeAt(e+1))<<8|g(n.charCodeAt(e+2))<<4|g(n.charCodeAt(e+3))}function g(n){return n>=48&&n<=57?n-48:n>=65&&n<=70?n-55:n>=97&&n<=102?n-87:-1}function he(n,e){const t=n.source.body;switch(t.charCodeAt(e+1)){case 34:return{value:'"',size:2};case 92:return{value:"\\",size:2};case 47:return{value:"/",size:2};case 98:return{value:"\b",size:2};case 102:return{value:"\f",size:2};case 110:return{value:`
`,size:2};case 114:return{value:"\r",size:2};case 116:return{value:"	",size:2}}throw h(n.source,e,`Invalid character escape sequence: "${t.slice(e,e+2)}".`)}function fe(n,e){const t=n.source.body,s=t.length;let i=n.lineStart,r=e+3,c=r,d="";const f=[];for(;r<s;){const E=t.charCodeAt(r);if(E===34&&t.charCodeAt(r+1)===34&&t.charCodeAt(r+2)===34){d+=t.slice(c,r),f.push(d);const l=p(n,a.BLOCK_STRING,e,r+3,X(f).join(`
`));return n.line+=f.length-1,n.lineStart=i,l}if(E===92&&t.charCodeAt(r+1)===34&&t.charCodeAt(r+2)===34&&t.charCodeAt(r+3)===34){d+=t.slice(c,r),c=r+1,r+=4;continue}if(E===10||E===13){d+=t.slice(c,r),f.push(d),E===13&&t.charCodeAt(r+1)===10?r+=2:++r,d="",c=r,i=r;continue}if(x(E))++r;else if(v(t,r))r+=2;else throw h(n.source,r,`Invalid character within String: ${N(n,r)}.`)}throw h(n.source,r,"Unterminated string.")}function me(n,e){const t=n.source.body,s=t.length;let i=e+1;for(;i<s;){const r=t.charCodeAt(i);if(H(r))++i;else break}return p(n,a.NAME,e,i,t.slice(e,i))}const Ee=globalThis.process&&!0,Te=Ee?function(e,t){return e instanceof t}:function(e,t){if(e instanceof t)return!0;if(typeof e=="object"&&e!==null){var s;const i=t.prototype[Symbol.toStringTag],r=Symbol.toStringTag in e?e[Symbol.toStringTag]:(s=e.constructor)===null||s===void 0?void 0:s.name;if(i===r){const c=q(e);throw new Error(`Cannot use ${i} "${c}" from another module or realm.

Ensure that there is only one instance of "graphql" in the node_modules
directory. If different versions of "graphql" are the dependencies of other
relied on modules, use "resolutions" to ensure only one version is installed.

https://yarnpkg.com/en/docs/selective-version-resolutions

Duplicate "graphql" modules cannot be used at the same time since different
versions may have different capabilities and behavior. The data from one
version used in the function from another could produce confusing and
spurious results.`)}}return!1};class z{constructor(e,t="GraphQL request",s={line:1,column:1}){typeof e=="string"||b(!1,`Body must be a string. Received: ${q(e)}.`),this.body=e,this.name=t,this.locationOffset=s,this.locationOffset.line>0||b(!1,"line in locationOffset is 1-indexed and must be positive."),this.locationOffset.column>0||b(!1,"column in locationOffset is 1-indexed and must be positive.")}get[Symbol.toStringTag](){return"Source"}}function Ae(n){return Te(n,z)}function Ne(n,e){const t=new Ie(n,e),s=t.parseDocument();return Object.defineProperty(s,"tokenCount",{enumerable:!1,value:t.tokenCount}),s}class Ie{constructor(e,t={}){const{lexer:s,...i}=t;if(s)this._lexer=s;else{const r=Ae(e)?e:new z(e);this._lexer=new re(r)}this._options=i,this._tokenCounter=0}get tokenCount(){return this._tokenCounter}parseName(){const e=this.expectToken(a.NAME);return this.node(e,{kind:o.NAME,value:e.value})}parseDocument(){return this.node(this._lexer.token,{kind:o.DOCUMENT,definitions:this.many(a.SOF,this.parseDefinition,a.EOF)})}parseDefinition(){if(this.peek(a.BRACE_L))return this.parseOperationDefinition();const e=this.peekDescription(),t=e?this._lexer.lookahead():this._lexer.token;if(e&&t.kind===a.BRACE_L)throw h(this._lexer.source,this._lexer.token.start,"Unexpected description, descriptions are not supported on shorthand queries.");if(t.kind===a.NAME){switch(t.value){case"schema":return this.parseSchemaDefinition();case"scalar":return this.parseScalarTypeDefinition();case"type":return this.parseObjectTypeDefinition();case"interface":return this.parseInterfaceTypeDefinition();case"union":return this.parseUnionTypeDefinition();case"enum":return this.parseEnumTypeDefinition();case"input":return this.parseInputObjectTypeDefinition();case"directive":return this.parseDirectiveDefinition()}switch(t.value){case"query":case"mutation":case"subscription":return this.parseOperationDefinition();case"fragment":return this.parseFragmentDefinition()}if(e)throw h(this._lexer.source,this._lexer.token.start,"Unexpected description, only GraphQL definitions support descriptions.");if(t.value==="extend")return this.parseTypeSystemExtension()}throw this.unexpected(t)}parseOperationDefinition(){const e=this._lexer.token;if(this.peek(a.BRACE_L))return this.node(e,{kind:o.OPERATION_DEFINITION,operation:_.QUERY,description:void 0,name:void 0,variableDefinitions:[],directives:[],selectionSet:this.parseSelectionSet()});const t=this.parseDescription(),s=this.parseOperationType();let i;return this.peek(a.NAME)&&(i=this.parseName()),this.node(e,{kind:o.OPERATION_DEFINITION,operation:s,description:t,name:i,variableDefinitions:this.parseVariableDefinitions(),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseOperationType(){const e=this.expectToken(a.NAME);switch(e.value){case"query":return _.QUERY;case"mutation":return _.MUTATION;case"subscription":return _.SUBSCRIPTION}throw this.unexpected(e)}parseVariableDefinitions(){return this.optionalMany(a.PAREN_L,this.parseVariableDefinition,a.PAREN_R)}parseVariableDefinition(){return this.node(this._lexer.token,{kind:o.VARIABLE_DEFINITION,description:this.parseDescription(),variable:this.parseVariable(),type:(this.expectToken(a.COLON),this.parseTypeReference()),defaultValue:this.expectOptionalToken(a.EQUALS)?this.parseConstValueLiteral():void 0,directives:this.parseConstDirectives()})}parseVariable(){const e=this._lexer.token;return this.expectToken(a.DOLLAR),this.node(e,{kind:o.VARIABLE,name:this.parseName()})}parseSelectionSet(){return this.node(this._lexer.token,{kind:o.SELECTION_SET,selections:this.many(a.BRACE_L,this.parseSelection,a.BRACE_R)})}parseSelection(){return this.peek(a.SPREAD)?this.parseFragment():this.parseField()}parseField(){const e=this._lexer.token,t=this.parseName();let s,i;return this.expectOptionalToken(a.COLON)?(s=t,i=this.parseName()):i=t,this.node(e,{kind:o.FIELD,alias:s,name:i,arguments:this.parseArguments(!1),directives:this.parseDirectives(!1),selectionSet:this.peek(a.BRACE_L)?this.parseSelectionSet():void 0})}parseArguments(e){const t=e?this.parseConstArgument:this.parseArgument;return this.optionalMany(a.PAREN_L,t,a.PAREN_R)}parseArgument(e=!1){const t=this._lexer.token,s=this.parseName();return this.expectToken(a.COLON),this.node(t,{kind:o.ARGUMENT,name:s,value:this.parseValueLiteral(e)})}parseConstArgument(){return this.parseArgument(!0)}parseFragment(){const e=this._lexer.token;this.expectToken(a.SPREAD);const t=this.expectOptionalKeyword("on");return!t&&this.peek(a.NAME)?this.node(e,{kind:o.FRAGMENT_SPREAD,name:this.parseFragmentName(),directives:this.parseDirectives(!1)}):this.node(e,{kind:o.INLINE_FRAGMENT,typeCondition:t?this.parseNamedType():void 0,directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseFragmentDefinition(){const e=this._lexer.token,t=this.parseDescription();return this.expectKeyword("fragment"),this._options.allowLegacyFragmentVariables===!0?this.node(e,{kind:o.FRAGMENT_DEFINITION,description:t,name:this.parseFragmentName(),variableDefinitions:this.parseVariableDefinitions(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()}):this.node(e,{kind:o.FRAGMENT_DEFINITION,description:t,name:this.parseFragmentName(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet()})}parseFragmentName(){if(this._lexer.token.value==="on")throw this.unexpected();return this.parseName()}parseValueLiteral(e){const t=this._lexer.token;switch(t.kind){case a.BRACKET_L:return this.parseList(e);case a.BRACE_L:return this.parseObject(e);case a.INT:return this.advanceLexer(),this.node(t,{kind:o.INT,value:t.value});case a.FLOAT:return this.advanceLexer(),this.node(t,{kind:o.FLOAT,value:t.value});case a.STRING:case a.BLOCK_STRING:return this.parseStringLiteral();case a.NAME:switch(this.advanceLexer(),t.value){case"true":return this.node(t,{kind:o.BOOLEAN,value:!0});case"false":return this.node(t,{kind:o.BOOLEAN,value:!1});case"null":return this.node(t,{kind:o.NULL});default:return this.node(t,{kind:o.ENUM,value:t.value})}case a.DOLLAR:if(e)if(this.expectToken(a.DOLLAR),this._lexer.token.kind===a.NAME){const s=this._lexer.token.value;throw h(this._lexer.source,t.start,`Unexpected variable "$${s}" in constant value.`)}else throw this.unexpected(t);return this.parseVariable();default:throw this.unexpected()}}parseConstValueLiteral(){return this.parseValueLiteral(!0)}parseStringLiteral(){const e=this._lexer.token;return this.advanceLexer(),this.node(e,{kind:o.STRING,value:e.value,block:e.kind===a.BLOCK_STRING})}parseList(e){const t=()=>this.parseValueLiteral(e);return this.node(this._lexer.token,{kind:o.LIST,values:this.any(a.BRACKET_L,t,a.BRACKET_R)})}parseObject(e){const t=()=>this.parseObjectField(e);return this.node(this._lexer.token,{kind:o.OBJECT,fields:this.any(a.BRACE_L,t,a.BRACE_R)})}parseObjectField(e){const t=this._lexer.token,s=this.parseName();return this.expectToken(a.COLON),this.node(t,{kind:o.OBJECT_FIELD,name:s,value:this.parseValueLiteral(e)})}parseDirectives(e){const t=[];for(;this.peek(a.AT);)t.push(this.parseDirective(e));return t}parseConstDirectives(){return this.parseDirectives(!0)}parseDirective(e){const t=this._lexer.token;return this.expectToken(a.AT),this.node(t,{kind:o.DIRECTIVE,name:this.parseName(),arguments:this.parseArguments(e)})}parseTypeReference(){const e=this._lexer.token;let t;if(this.expectOptionalToken(a.BRACKET_L)){const s=this.parseTypeReference();this.expectToken(a.BRACKET_R),t=this.node(e,{kind:o.LIST_TYPE,type:s})}else t=this.parseNamedType();return this.expectOptionalToken(a.BANG)?this.node(e,{kind:o.NON_NULL_TYPE,type:t}):t}parseNamedType(){return this.node(this._lexer.token,{kind:o.NAMED_TYPE,name:this.parseName()})}peekDescription(){return this.peek(a.STRING)||this.peek(a.BLOCK_STRING)}parseDescription(){if(this.peekDescription())return this.parseStringLiteral()}parseSchemaDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("schema");const s=this.parseConstDirectives(),i=this.many(a.BRACE_L,this.parseOperationTypeDefinition,a.BRACE_R);return this.node(e,{kind:o.SCHEMA_DEFINITION,description:t,directives:s,operationTypes:i})}parseOperationTypeDefinition(){const e=this._lexer.token,t=this.parseOperationType();this.expectToken(a.COLON);const s=this.parseNamedType();return this.node(e,{kind:o.OPERATION_TYPE_DEFINITION,operation:t,type:s})}parseScalarTypeDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("scalar");const s=this.parseName(),i=this.parseConstDirectives();return this.node(e,{kind:o.SCALAR_TYPE_DEFINITION,description:t,name:s,directives:i})}parseObjectTypeDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("type");const s=this.parseName(),i=this.parseImplementsInterfaces(),r=this.parseConstDirectives(),c=this.parseFieldsDefinition();return this.node(e,{kind:o.OBJECT_TYPE_DEFINITION,description:t,name:s,interfaces:i,directives:r,fields:c})}parseImplementsInterfaces(){return this.expectOptionalKeyword("implements")?this.delimitedMany(a.AMP,this.parseNamedType):[]}parseFieldsDefinition(){return this.optionalMany(a.BRACE_L,this.parseFieldDefinition,a.BRACE_R)}parseFieldDefinition(){const e=this._lexer.token,t=this.parseDescription(),s=this.parseName(),i=this.parseArgumentDefs();this.expectToken(a.COLON);const r=this.parseTypeReference(),c=this.parseConstDirectives();return this.node(e,{kind:o.FIELD_DEFINITION,description:t,name:s,arguments:i,type:r,directives:c})}parseArgumentDefs(){return this.optionalMany(a.PAREN_L,this.parseInputValueDef,a.PAREN_R)}parseInputValueDef(){const e=this._lexer.token,t=this.parseDescription(),s=this.parseName();this.expectToken(a.COLON);const i=this.parseTypeReference();let r;this.expectOptionalToken(a.EQUALS)&&(r=this.parseConstValueLiteral());const c=this.parseConstDirectives();return this.node(e,{kind:o.INPUT_VALUE_DEFINITION,description:t,name:s,type:i,defaultValue:r,directives:c})}parseInterfaceTypeDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("interface");const s=this.parseName(),i=this.parseImplementsInterfaces(),r=this.parseConstDirectives(),c=this.parseFieldsDefinition();return this.node(e,{kind:o.INTERFACE_TYPE_DEFINITION,description:t,name:s,interfaces:i,directives:r,fields:c})}parseUnionTypeDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("union");const s=this.parseName(),i=this.parseConstDirectives(),r=this.parseUnionMemberTypes();return this.node(e,{kind:o.UNION_TYPE_DEFINITION,description:t,name:s,directives:i,types:r})}parseUnionMemberTypes(){return this.expectOptionalToken(a.EQUALS)?this.delimitedMany(a.PIPE,this.parseNamedType):[]}parseEnumTypeDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("enum");const s=this.parseName(),i=this.parseConstDirectives(),r=this.parseEnumValuesDefinition();return this.node(e,{kind:o.ENUM_TYPE_DEFINITION,description:t,name:s,directives:i,values:r})}parseEnumValuesDefinition(){return this.optionalMany(a.BRACE_L,this.parseEnumValueDefinition,a.BRACE_R)}parseEnumValueDefinition(){const e=this._lexer.token,t=this.parseDescription(),s=this.parseEnumValueName(),i=this.parseConstDirectives();return this.node(e,{kind:o.ENUM_VALUE_DEFINITION,description:t,name:s,directives:i})}parseEnumValueName(){if(this._lexer.token.value==="true"||this._lexer.token.value==="false"||this._lexer.token.value==="null")throw h(this._lexer.source,this._lexer.token.start,`${C(this._lexer.token)} is reserved and cannot be used for an enum value.`);return this.parseName()}parseInputObjectTypeDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("input");const s=this.parseName(),i=this.parseConstDirectives(),r=this.parseInputFieldsDefinition();return this.node(e,{kind:o.INPUT_OBJECT_TYPE_DEFINITION,description:t,name:s,directives:i,fields:r})}parseInputFieldsDefinition(){return this.optionalMany(a.BRACE_L,this.parseInputValueDef,a.BRACE_R)}parseTypeSystemExtension(){const e=this._lexer.lookahead();if(e.kind===a.NAME)switch(e.value){case"schema":return this.parseSchemaExtension();case"scalar":return this.parseScalarTypeExtension();case"type":return this.parseObjectTypeExtension();case"interface":return this.parseInterfaceTypeExtension();case"union":return this.parseUnionTypeExtension();case"enum":return this.parseEnumTypeExtension();case"input":return this.parseInputObjectTypeExtension();case"directive":if(this._options.experimentalDirectivesOnDirectiveDefinitions)return this.parseDirectiveDefinitionExtension();break}throw this.unexpected(e)}parseSchemaExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("schema");const t=this.parseConstDirectives(),s=this.optionalMany(a.BRACE_L,this.parseOperationTypeDefinition,a.BRACE_R);if(t.length===0&&s.length===0)throw this.unexpected();return this.node(e,{kind:o.SCHEMA_EXTENSION,directives:t,operationTypes:s})}parseScalarTypeExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("scalar");const t=this.parseName(),s=this.parseConstDirectives();if(s.length===0)throw this.unexpected();return this.node(e,{kind:o.SCALAR_TYPE_EXTENSION,name:t,directives:s})}parseObjectTypeExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("type");const t=this.parseName(),s=this.parseImplementsInterfaces(),i=this.parseConstDirectives(),r=this.parseFieldsDefinition();if(s.length===0&&i.length===0&&r.length===0)throw this.unexpected();return this.node(e,{kind:o.OBJECT_TYPE_EXTENSION,name:t,interfaces:s,directives:i,fields:r})}parseInterfaceTypeExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("interface");const t=this.parseName(),s=this.parseImplementsInterfaces(),i=this.parseConstDirectives(),r=this.parseFieldsDefinition();if(s.length===0&&i.length===0&&r.length===0)throw this.unexpected();return this.node(e,{kind:o.INTERFACE_TYPE_EXTENSION,name:t,interfaces:s,directives:i,fields:r})}parseUnionTypeExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("union");const t=this.parseName(),s=this.parseConstDirectives(),i=this.parseUnionMemberTypes();if(s.length===0&&i.length===0)throw this.unexpected();return this.node(e,{kind:o.UNION_TYPE_EXTENSION,name:t,directives:s,types:i})}parseEnumTypeExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("enum");const t=this.parseName(),s=this.parseConstDirectives(),i=this.parseEnumValuesDefinition();if(s.length===0&&i.length===0)throw this.unexpected();return this.node(e,{kind:o.ENUM_TYPE_EXTENSION,name:t,directives:s,values:i})}parseInputObjectTypeExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("input");const t=this.parseName(),s=this.parseConstDirectives(),i=this.parseInputFieldsDefinition();if(s.length===0&&i.length===0)throw this.unexpected();return this.node(e,{kind:o.INPUT_OBJECT_TYPE_EXTENSION,name:t,directives:s,fields:i})}parseDirectiveDefinitionExtension(){const e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("directive"),this.expectToken(a.AT);const t=this.parseName(),s=this.parseConstDirectives();if(s.length===0)throw this.unexpected();return this.node(e,{kind:o.DIRECTIVE_EXTENSION,name:t,directives:s})}parseDirectiveDefinition(){const e=this._lexer.token,t=this.parseDescription();this.expectKeyword("directive"),this.expectToken(a.AT);const s=this.parseName(),i=this.parseArgumentDefs(),r=this._options.experimentalDirectivesOnDirectiveDefinitions?this.parseConstDirectives():[],c=this.expectOptionalKeyword("repeatable");this.expectKeyword("on");const d=this.parseDirectiveLocations();return this.node(e,{kind:o.DIRECTIVE_DEFINITION,description:t,name:s,arguments:i,directives:r,repeatable:c,locations:d})}parseDirectiveLocations(){return this.delimitedMany(a.PIPE,this.parseDirectiveLocation)}parseDirectiveLocation(){const e=this._lexer.token,t=this.parseName();if(Object.prototype.hasOwnProperty.call(w,t.value))return t;throw this.unexpected(e)}parseSchemaCoordinate(){const e=this._lexer.token,t=this.expectOptionalToken(a.AT),s=this.parseName();let i;!t&&this.expectOptionalToken(a.DOT)&&(i=this.parseName());let r;return(t||i)&&this.expectOptionalToken(a.PAREN_L)&&(r=this.parseName(),this.expectToken(a.COLON),this.expectToken(a.PAREN_R)),t?r?this.node(e,{kind:o.DIRECTIVE_ARGUMENT_COORDINATE,name:s,argumentName:r}):this.node(e,{kind:o.DIRECTIVE_COORDINATE,name:s}):i?r?this.node(e,{kind:o.ARGUMENT_COORDINATE,name:s,fieldName:i,argumentName:r}):this.node(e,{kind:o.MEMBER_COORDINATE,name:s,memberName:i}):this.node(e,{kind:o.TYPE_COORDINATE,name:s})}node(e,t){return this._options.noLocation!==!0&&(t.loc=new Z(e,this._lexer.lastToken,this._lexer.source)),t}peek(e){return this._lexer.token.kind===e}expectToken(e){const t=this._lexer.token;if(t.kind===e)return this.advanceLexer(),t;throw h(this._lexer.source,t.start,`Expected ${W(e)}, found ${C(t)}.`)}expectOptionalToken(e){return this._lexer.token.kind===e?(this.advanceLexer(),!0):!1}expectKeyword(e){const t=this._lexer.token;if(t.kind===a.NAME&&t.value===e)this.advanceLexer();else throw h(this._lexer.source,t.start,`Expected "${e}", found ${C(t)}.`)}expectOptionalKeyword(e){const t=this._lexer.token;return t.kind===a.NAME&&t.value===e?(this.advanceLexer(),!0):!1}unexpected(e){const t=e??this._lexer.token;return h(this._lexer.source,t.start,`Unexpected ${C(t)}.`)}any(e,t,s){this.expectToken(e);const i=[];for(;!this.expectOptionalToken(s);)i.push(t.call(this));return i}optionalMany(e,t,s){if(this.expectOptionalToken(e)){const i=[];do i.push(t.call(this));while(!this.expectOptionalToken(s));return i}return[]}many(e,t,s){this.expectToken(e);const i=[];do i.push(t.call(this));while(!this.expectOptionalToken(s));return i}delimitedMany(e,t){this.expectOptionalToken(e);const s=[];do s.push(t.call(this));while(this.expectOptionalToken(e));return s}advanceLexer(){const{maxTokens:e}=this._options,t=this._lexer.advance();if(t.kind!==a.EOF&&(++this._tokenCounter,e!==void 0&&this._tokenCounter>e))throw h(this._lexer.source,t.start,`Document contains more that ${e} tokens. Parsing aborted.`)}}function C(n){const e=n.value;return W(n.kind)+(e!=null?` "${e}"`:"")}function W(n){return ae(n)?`"${n}"`:n}var D=new Map,F=new Map,Q=!0,k=!1;function J(n){return n.replace(/[\s,]+/g," ").trim()}function xe(n){return J(n.source.body.substring(n.start,n.end))}function ye(n){var e=new Set,t=[];return n.definitions.forEach(function(s){if(s.kind==="FragmentDefinition"){var i=s.name.value,r=xe(s.loc),c=F.get(i);c&&!c.has(r)||c||F.set(i,c=new Set),c.add(r),e.has(r)||(e.add(r),t.push(s))}else t.push(s)}),U(U({},n),{definitions:t})}function ge(n){var e=new Set(n.definitions);e.forEach(function(s){s.loc&&delete s.loc,Object.keys(s).forEach(function(i){var r=s[i];r&&typeof r=="object"&&e.add(r)})});var t=n.loc;return t&&(delete t.startToken,delete t.endToken),n}function _e(n){var e=J(n);if(!D.has(e)){var t=Ne(n,{experimentalFragmentVariables:k,allowLegacyFragmentVariables:k});if(!t||t.kind!=="Document")throw new Error("Not a valid GraphQL document.");D.set(e,ge(ye(t)))}return D.get(e)}function u(n){for(var e=[],t=1;t<arguments.length;t++)e[t-1]=arguments[t];typeof n=="string"&&(n=[n]);var s=n[0];return e.forEach(function(i,r){i&&i.kind==="Document"?s+=i.loc.source.body:s+=i,s+=n[r+1]}),_e(s)}function Ce(){D.clear(),F.clear()}function De(){Q=!1}function Oe(){k=!0}function ke(){k=!1}var y={gql:u,resetCaches:Ce,disableFragmentWarnings:De,enableExperimentalFragmentVariables:Oe,disableExperimentalFragmentVariables:ke};(function(n){n.gql=y.gql,n.resetCaches=y.resetCaches,n.disableFragmentWarnings=y.disableFragmentWarnings,n.enableExperimentalFragmentVariables=y.enableExperimentalFragmentVariables,n.disableExperimentalFragmentVariables=y.disableExperimentalFragmentVariables})(u||(u={}));u.default=u;const Re=u`
  query GetTransactions(
    $walletId: ID
    $categoryId: ID
    $type: TransactionType
    $from: DateTime
    $to: DateTime
    $limit: Int
    $offset: Int
  ) {
    transactions(
      walletId: $walletId
      categoryId: $categoryId
      type: $type
      from: $from
      to: $to
      limit: $limit
      offset: $offset
    ) {
      id
      amount
      type
      description
      currency
      date
      createdAt
      wallet { id name type currency }
      toWallet { id name type currency }
      category { id name icon type }
    }
  }
`;u`
  query GetTransaction($id: ID!) {
    transaction(id: $id) {
      id
      amount
      type
      description
      currency
      date
      createdAt
      wallet { id name type currency }
      toWallet { id name type currency }
      category { id name icon type }
    }
  }
`;const be=u`
  mutation CreateTransaction($input: CreateTransactionInput!) {
    createTransaction(input: $input) {
      id
      amount
      type
      description
      currency
      date
      createdAt
    }
  }
`,Le=u`
  mutation UpdateTransaction($id: ID!, $input: UpdateTransactionInput!) {
    updateTransaction(id: $id, input: $input) {
      id
      amount
      type
      description
      date
    }
  }
`,Se=u`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`,we=u`
  query GetWallets {
    wallets {
      id
      name
      type
      balance
      currency
      createdAt
    }
  }
`;u`
  query GetWallet($id: ID!) {
    wallet(id: $id) {
      id
      name
      type
      balance
      currency
      createdAt
      transactions {
        id
        amount
        type
        description
        date
      }
      financialGoals {
        id
        name
        targetAmount
        currentAmount
        deadline
      }
    }
  }
`;const Fe=u`
  mutation CreateWallet($input: CreateWalletInput!) {
    createWallet(input: $input) {
      id
      name
      type
      balance
      currency
      createdAt
    }
  }
`,$e=u`
  mutation UpdateWallet($id: ID!, $input: UpdateWalletInput!) {
    updateWallet(id: $id, input: $input) {
      id
      name
      type
      balance
      currency
    }
  }
`,Ue=u`
  mutation DeleteWallet($id: ID!) {
    deleteWallet(id: $id)
  }
`,Pe=u`
  query GetCategories($type: String) {
    categories(type: $type) {
      id
      name
      icon
      type
      createdAt
    }
  }
`;u`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
      icon
      type
      createdAt
    }
  }
`;const Be=u`
  mutation CreateCategory($input: CreateCategoryInput!) {
    createCategory(input: $input) {
      id
      name
      icon
      type
      createdAt
    }
  }
`,Ge=u`
  mutation UpdateCategory($id: ID!, $input: UpdateCategoryInput!) {
    updateCategory(id: $id, input: $input) {
      id
      name
      icon
      type
    }
  }
`,Me=u`
  mutation DeleteCategory($id: ID!) {
    deleteCategory(id: $id)
  }
`,Ve=u`
  query GetBudgets {
    budgets {
      id
      amount
      period
      createdAt
      category { id name icon type }
    }
  }
`;u`
  query GetBudget($id: ID!) {
    budget(id: $id) {
      id
      amount
      period
      createdAt
      category { id name icon type }
    }
  }
`;const qe=u`
  mutation CreateBudget($input: CreateBudgetInput!) {
    createBudget(input: $input) {
      id
      amount
      period
      createdAt
    }
  }
`,je=u`
  mutation UpdateBudget($id: ID!, $input: UpdateBudgetInput!) {
    updateBudget(id: $id, input: $input) {
      id
      amount
      period
    }
  }
`,Ke=u`
  mutation DeleteBudget($id: ID!) {
    deleteBudget(id: $id)
  }
`,Ye=u`
  query GetRecurringTransactions($isActive: Boolean) {
    recurringTransactions(isActive: $isActive) {
      id
      amount
      type
      description
      frequency
      startDate
      nextRunDate
      lastRunDate
      isActive
      createdAt
      wallet { id name type currency }
      category { id name icon type }
    }
  }
`;u`
  query GetRecurringTransaction($id: ID!) {
    recurringTransaction(id: $id) {
      id
      amount
      type
      description
      frequency
      startDate
      nextRunDate
      lastRunDate
      isActive
      createdAt
      wallet { id name type currency }
      category { id name icon type }
    }
  }
`;const ze=u`
  mutation CreateRecurringTransaction($input: CreateRecurringTransactionInput!) {
    createRecurringTransaction(input: $input) {
      id
      amount
      type
      frequency
      startDate
      nextRunDate
      isActive
    }
  }
`;u`
  mutation UpdateRecurringTransaction($id: ID!, $input: UpdateRecurringTransactionInput!) {
    updateRecurringTransaction(id: $id, input: $input) {
      id
      amount
      frequency
      isActive
    }
  }
`;const We=u`
  mutation DeleteRecurringTransaction($id: ID!) {
    deleteRecurringTransaction(id: $id)
  }
`,Qe=u`
  query GetFinancialGoals {
    financialGoals {
      id
      name
      targetAmount
      currentAmount
      deadline
      createdAt
      wallet { id name type currency }
    }
  }
`;u`
  query GetFinancialGoal($id: ID!) {
    financialGoal(id: $id) {
      id
      name
      targetAmount
      currentAmount
      deadline
      createdAt
      wallet { id name type currency }
    }
  }
`;const Je=u`
  mutation CreateFinancialGoal($input: CreateFinancialGoalInput!) {
    createFinancialGoal(input: $input) {
      id
      name
      targetAmount
      currentAmount
      deadline
    }
  }
`,Xe=u`
  mutation UpdateFinancialGoal($id: ID!, $input: UpdateFinancialGoalInput!) {
    updateFinancialGoal(id: $id, input: $input) {
      id
      name
      targetAmount
      currentAmount
      deadline
    }
  }
`,He=u`
  mutation DeleteFinancialGoal($id: ID!) {
    deleteFinancialGoal(id: $id)
  }
`;u`
  query GetOrganizations {
    organizations {
      id
      name
      slug
      logo
      createdAt
      members {
        id
        role
        user { id name email image }
      }
    }
  }
`;u`
  query GetOrganization($id: ID!) {
    organization(id: $id) {
      id
      name
      slug
      logo
      createdAt
      members {
        id
        role
        user { id name email image }
      }
      invitations {
        id
        email
        role
        status
        expiresAt
      }
    }
  }
`;u`
  mutation CreateOrganization($input: CreateOrganizationInput!) {
    createOrganization(input: $input) {
      id
      name
      slug
      logo
      createdAt
    }
  }
`;u`
  mutation InviteMember($organizationId: ID!, $email: String!, $role: String) {
    inviteMember(organizationId: $organizationId, email: $email, role: $role) {
      id
      email
      role
      status
      expiresAt
    }
  }
`;u`
  mutation RemoveMember($memberId: ID!) {
    removeMember(memberId: $memberId)
  }
`;u`
  query Me {
    me {
      id
      name
      email
      username
      displayUsername
      image
    }
  }
`;export{qe as C,Ke as D,Ve as G,je as U,Be as a,Je as b,ze as c,be as d,Fe as e,Me as f,He as g,We as h,Se as i,Ue as j,Pe as k,Qe as l,Ye as m,Re as n,we as o,Ge as p,Xe as q,Le as r,$e as s};
