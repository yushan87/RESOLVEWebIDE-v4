var TRANSLATE = "translateJava";
var VCS = "genVCs";
var BUILD = "build";
var VERIFY = "verify";
/* 
 * This file contains code for creating and using the ACE editor
 */

var editor = null;
var FONTSIZE = 12;
myUserControlView = null;

/* 
 * This will hold all of our keywords information such as the hashmap that
 * holds the keywords with their tool-tip values in it. 
 */

function KeywordsHashTable(obj){
    this.length = 0;
    this.items = new Object();
    for (var k in obj){
        if(obj.hasOwnProperty(k)){
            this.items[k] = obj[k];
            this.length++;
        }
    }
    this.getTip = function(word){
        return this.items[word];
    }
    this.hasKeyword = function(word){
        return this.items.hasOwnProperty(word);
    }
}

 /* Important keywords that need explanation with a tool-tip.
  * Only some of the keywords are displayed here because only some are used
  * and some are self-explanatory.
  */

var keywordsTable = new KeywordsHashTable({
    "abs" : "" ,
    "ad" : "" ,
    "absurdum" : "" ,
    "all" : "" ,
    "alters" : "The implementer may leave an arbitrary value of the same type at the end of the operation. This provides the most flexibility to the implementers.",
    "alt" : "The implementer may leave an arbitrary value of the same type at the end of the operation. This provides the most flexibility to the implementers." ,
    "alternative" : "" ,
    "and" : "" ,
    "Array" : "" ,
    "Aux_Code" : "" ,
    "Aux_Var" : "" ,
    "Aux_Vars" : "" ,
    "Aux" : "" ,
    "Auxiliary" : "" ,
    "Axiom" : "" ,
    "B" : "" ,
    "Base_Case" : "" ,
    "By" : "" ,
    "by" : "" ,
    "Cart_Prod" : "" ,
    "Categorical" : "" ,
    "Case" : "" ,
    "changing" : "This parameter will be changed throughout the clause.",
    "clears" : "The entry will be re-initialized to the initial value of the same type by the end of the operation." ,
    "clr" : "The entry will be re-initialized to the initial value of the same type by the end of the operation." , 
    "common" : "" ,
    "Commutativity" : "" ,
    "complement" : "" ,
    "Concatenation" : "This connects the first and second parameters into a chain of the same type. Parentheses are mandatory around Concatenation expressions" ,
    "concatenation" : "This connects the first and second parameters into a chain of the same type. Parentheses are mandatory around Concatenation expressions" ,
    "concept" : "This is similar to some object-oriented programing language's header file or class declaration. This file contains the data structure template that includes the mathematical model used to represent that type, the constraints, and a list of all operations along with their pre- and post-conditions." ,
    "Concept" : "This is similar to some object-oriented programing language's header file or class declaration. This file contains the data structure template that includes the mathematical model used to represent that type, the constraints, and a list of all operations along with their pre- and post-conditions." ,
    "conclusion" : "" ,
    "Confirm" : "" ,
    "conjunct" : "" ,
    "Constraint" : "" ,
    "Constraints" : "" ,
    "constraint" : "" ,
    "constraints" : "" ,
    "contradiction" : "" ,
    "convention" : "This clause contains constraints on the realization records in order to keep the implementations of all the various operations consistent. This can be singular or plural. It is also referred to as the representation invariant. " ,
    "conventions" : "This clause contains constraints on the realization records in order to keep the implementations of all the various operations consistent. This can be singular or plural. It is also referred to as the representation invariant. " ,
    "Convention" : "This clause contains constraints on the realization records in order to keep the implementations of all the various operations consistent. This can be singular or plural. It is also referred to as the representation invariant." ,
    "Corollary" : "" ,
    "Correspondence" : "This clause explains how to read the value in the Contents array as the string described in conceptualization. This clause is necessary to check that the code for the procedures satisfies their respective specifications. It is also referred to as the abstraction function or abstraction relation." ,
    "correspondence" : "This clause explains how to read the value in the Contents array as the string described in conceptualization. This clause is necessary to check that the code for the procedures satisfies their respective specifications. It is also referred to as the abstraction function or abstraction relation." ,
    "decreasing" : "This clause specifies a progress metric that is a natural number which reduces on each pass through the loop. This loop must eventually terminate because there is not an infinite strictly decreasing sequence of natural numbers. " ,
    "Deduction" : "" ,
    "Defines" : "" ,
    "defines" : "" ,
    "definition" : "Introducing a new mathematical function." ,
    "def" : "Introducing a new mathematical function." ,
    "Definition" : "Introducing a new mathematical function." ,
    "Def" : "Introducing a new mathematical function." ,
    "distribution" : "" ,
    "div" : "" ,
    "do" : "Perform these operations upon ensuring that the 'While' clause is true." ,
    "else" : "" ,
    "elimination" : "" ,
    "end" : "This finishes whatever operation it corresponds to. You must have this to stop every operation and begin another." ,
    "enhanced" : "" ,
    "enhancement" : "This means that the code below can use any of the information in the concept in the specification or realization of the enhancement. Also, enhancements are just a layout of different procedures that you might wish to add to a concept." ,
    "Enhancement" : "This means that the code below can use any of the information in the concept in the specification or realization of the enhancement. Also, enhancements are just a layout of different procedures that you might wish to add to a concept." ,
    "ensures" : "Post-conditions, or guarantees, that will happen if the requires clause is correct." ,
    "equality" : "" ,
    "evaluates" : "Any argument passed for that parameter must be a functional expression that will be evaluated when the operation is called." ,
    "eval" : "Any argument passed for that parameter must be a functional expression that will be evaluated when the operation is called." ,
    "excluded" : "" ,
    "exemplar" : "An identifier that stands for an arbitrary value which tells the client what is true of every variable that is of this class type." ,
    "existantial" : "" ,
    "exists" : "" ,
    "exit" : "" ,    
    "Facility" : "This is similar to Java in that every file is a class, and this facility's name should be the same as the name of the file that declares it. You need this statement at the beginning to declare the name of the class and to begin writing a file. To finish the class, write 'end Facility_Name;'" ,
    "Facility_Finalization" : "" ,
    "Facility_Initialization" : "" ,
    "false" : "" ,
    "Family" : "" ,
    "finalization" : "" ,
    "for all" : "For every circumstance like this, truth will be assumed." ,
    "from" : "" ,
    "for" : "" ,
    "For" : "" ,
    "Forget" : "" ,
    "generalization" : "" ,
    "iff" : "This is used like an 'If and only if' statement from other programming languages. " ,
    "if" : "An If-Then-Else statement is like most other programming languages in that we are testing a condition for truth and then moving into whichever statement sequence depending on the outcome of the if statement. " ,
    "If" : "An If-Then-Else statement is like most other programming languages in that we are testing a condition for truth and then moving into whichever statement sequence depending on the outcome of the if statement. " ,
    "Implicit" : "" ,
    "implies" : "" ,
    "Inductive" : "" ,
    "Inductive_case" : "" ,
    "initialization ensures" : "whenever something is declared, the client is guaranteed this statement as its initial value." ,
    "instantiation" : "" ,
    "intersection" : "" ,
    "introduces" : "" ,
    "is" : "" ,
    "is_in" : "" ,
    "Is_Initial" : "" ,
    "is_not_in" : "" ,
    "is_not_proper_subset_of" : "" ,
    "is_not_subet_of" : "" ,
    "is_not_substring_of" : "" ,
    "is_proper_subset_of" : "" ,
    "is_subset_of" : "" ,
    "is_substring_of" : "" ,
    "Iterate" : "" ,
    "lambda" : "The empty string." ,
    "Lemma" : "" ,
    "Local" : "" ,
    "maintaining" : "This clause describes essentially what makes the loop work. It must be true at the beginning and at the end of every iteration of the loop." ,
    "Math" : "" ,
    "middle" : "" ,
    "mod" : "" ,
    "modeled" : "" ,
    "modus" : "" ,
    "not" : "" ,
    "o" : "This connects the first and second parameters into a chain of the same type. Parentheses are mandatory around Concatenation expressions." ,
    "of" : "" ,
    "oper" : "The beginning of a function within a class. This statement needs to be concluded with an 'end Operation_Name;'. This is used to declare the facility." ,
    "Oper" : "The beginning of a function within a class. This statement needs to be concluded with an 'end Operation_Name;'. This is used to declare the facility." ,
    "operation" : "The beginning of a function within a class. This statement needs to be concluded with an 'end Operation_Name;'. This is used to declare the facility." ,
    "Operation" : "The beginning of a function within a class. This statement needs to be concluded with an 'end Operation_Name;'. This is used to declare the facility." ,
    "or" : "" ,
    "otherwise" : "" ,
    "ponens" : "" ,
    "Powerset" : "" ,
    "powerset" : "" ,
    "preserves" : "The value passed in will always be the same ending value,  and we are guaranteed that the value will not be changed throughout the operation." ,
    "pres" : "The value passed in will always be the same ending value,  and we are guaranteed that the value will not be changed throughout the operation." ,
    "Proc" : "This contains implementation statements within a facility." ,
    "Procedure" : "This contains implementation statements within a facility." ,
    "Proof" : "" ,
    "proof" : "" ,
    "Proofs_for" : "" ,
    "Property" : "" ,
    "Pty" : "" ,
    "QED" : "" ,
    "quantifier" : "" ,
    "realization" : "This will contain code for a procedure from the Enhancement." ,
    "Realization" : "This will contain code for a procedure from the Enhancement." ,
    "realized" : "" ,
    "reassigns" : "" ,
    "Record" : "" ,
    "Recursive" : "" ,
    "reductio" : "" ,
    "related" : "" ,
    "rem" : "" ,
    "Remember" : "" ,
    "repeat" : "" ,
    "replaces" : "The value passed in becomes irrelevant and will be replaced by the value specified in the ensures clause by the end of the operation.",
    "rpl" : "The value passed in becomes irrelevant and will be replaced by the value specified in the ensures clause by the end of the operation." ,
    "represented" : "" ,
    "requires" : "This clause is the pre-condition that the Client (or caller) is responsible for ensuring truth." ,
    "res" : "" ,
    "restores" : "The value passed in will always be the same ending value, but there is no guarantee that it will not be changed throughout the operation." ,
    "rest" : "The value passed in will always be the same ending value, but there is no guarantee that it will not be changed throughout the operation." ,
    "rules" : "" ,
    "SSet" : "" ,
    "Static" : "" ,
    "Subtype" : "" ,
    "such" : "" ,
    "Supposition" : "" ,
    "that" : "" ,
    "then" : "" ,
    "Theorem" : "" ,
    "Theory" : "" ,
    "Precis" : "" ,
    "There" : "" ,
    "there" : "" ,
    "times" : "" ,
    "true" : "" ,
    "Type" : "" ,
    "type" : "" ,
    "Type_Family" : "" ,
    "union" : "The set of elements that are in the two sets." ,
    "Unique" : "" ,
    "unique" : "" ,
    "Unit" : "" ,
    "unit" : "" ,
    "universal" : "" ,
    "updates" : "The value passed in will have a purposeful change at the end of the operation.",
    "upd" : "The value passed in will have a purposeful change at the end of the operation." ,
    "uses" : "This allows RESOLVE to handle specific data types which are defined through the concepts listed in these clauses. This is similar to header files from other programming languages." ,
    "Variable" : "The declaration of a variable always begins with this. The syntax is as follows: 'Var varname:   Vartype;'. The 'Vartype' is where you determine what kind of variable we are declaring." ,
    "Var" : "The declaration of a variable always begins with this. The syntax is as follows: 'Var varname:   Vartype;'. The 'Vartype' is where you determine what kind of variable we are declaring." ,
    "Variables" : "The declaration of a variable always begins with this. The syntax is as follows: 'Var varname:   Vartype;'. The 'Vartype' is where you determine what kind of variable we are declaring." ,
    "Vars" : "The declaration of a variable always begins with this. The syntax is as follows: 'Var varname:   Vartype;'. The 'Vartype' is where you determine what kind of variable we are declaring." ,
    "when" : "" ,
    "where" : "" ,
    "While" : "The beginning of a loop where the clause following this is what the loop will be ensuring is true to be able to continue on." ,
    "without" : "" 
    }); 

UserControlView = Backbone.View.extend({
    initialize: function(){
        //this.model.bind("change", this.render, this);
        this.bind("change:model", this.render, this);
        this.render();
    },
    
    render: function(){
        $(this.el).empty();
        var commands = $("<div>").html("").addClass("controls_commands");
        var zoomControls = $("<div>").addClass("controls_zoom");
        var translate = $("<button>").html("translate").addClass("translateJava command active shadow");
        var build = $("<button>").html("build").addClass("build command active shadow");
        var vcs = $("<button>").html("VCs").addClass("vcs command active shadow");
        var verify = $("<button>").html("verify").addClass("verify command active shadow");
        var showJava = $("<div>").addClass("java");
        var inputID = "showJava";
        this._javaCheckbox = $("<input>").attr({type:"checkbox", id: inputID});
        this._javaCheckbox.appendTo(showJava);
        var javaLabel = $("<label>").html("Java").attr({"for":inputID});
        showJava.append(javaLabel);
        var plus = $("<button>").addClass("plus zoom shadow active");
        var minus = $("<button>").addClass("minus zoom shadow active");
        var component = this.model.get("componentModel");
        if(component != null){
            if(component.get("type") == "c"){
                translate.appendTo(commands);
            }
            else if(component.get("type") == "r"){
                translate.appendTo(commands);
                vcs.appendTo(commands);
                //verify.appendTo(commands);
            }
            else if(component.get("type") == "e"){
                translate.appendTo(commands);
            }
            else if(component.get("type") == "er"){
                translate.appendTo(commands);
                vcs.appendTo(commands);
                verify.appendTo(commands);
            }
            else if(component.get("type") == "f"){
                build.appendTo(commands);
                translate.appendTo(commands);
                vcs.appendTo(commands);
                verify.appendTo(commands);
            }
            else if(component.get("type") == "t"){
                
            }
            if(this.model.has("syntaxErrors") && this.model.get("syntaxErrors").length > 0){
                var buttons = commands.find("button");
                buttons.attr({disable: "diabled"});
                buttons.removeClass("active");
            }   
        }
        else{
            commands.append("Please select a component");
        }
        
        if(this.model.get("java") != null){
            showJava.appendTo(zoomControls);
        }
        plus.appendTo(zoomControls);
        minus.appendTo(zoomControls);
        /*plus.click(function(event){
            this.increaseFontSize();
        });
        minus.click(function(event){
            this.decreaseFontSize();
        });*/
        $(this.el).html(commands);
        $(this.el).append(zoomControls);
        $(".plus").qtip({
            content: 'Click here to zoom in',
            show: 'mouseover',
            hide: 'mouseout'
        });
        
        minus.qtip({
            content: 'Click here to zoom out',
            show: 'mouseover',
            hide: 'mouseout'
        });
        
        $(".ace_keyword").qtip({
            content: 'keyword',
            show: 'click'//,
            //hide: 'mouseout'
        });
    },
    events: {
        "click .active.translateJava" : "compile",
        "click .active.build" : "compile",
        "click .active.vcs" : "compile",
        "click .active.verify" : "verify",
        "click #showJava" : "showJava",
        "click .plus" : "increaseFontSize",
        "click .minus" : "decreaseFontSize"
    },
    compile: function(event){
        var targetJob = null;
        var targetButton = $(event.currentTarget);
        // these classes must match what is assigned in the render function above
        // for the sevlet backend to understand what to do. That means the servlet
        // must also match when it checks for the job parameter
        if(targetButton.hasClass("translateJava")){
            targetJob = TRANSLATE;
        }
        else if(targetButton.hasClass("build")){
            targetJob = BUILD;
        }
        else if(targetButton.hasClass("vcs")){
            targetJob = VCS;
        }
        else if(targetButton.hasClass("verify")){
            targetJob = VERIFY;
        }
        var model = this.model;
        var component = model.get("componentModel").clone();
        component.set("content", encode(editor.getSession().getValue()));
        //var tc = new UserComponent({component: component, ws: "default"});
        //var targetJSON = tc.toJSON();
        var targetJSON = component.toJSON();
        var userJSON = "[";
        var numOpenComponents = myOpenComponentList.size();
        var index = 0;
        myOpenComponentList.each(function(component){
            var uc = new UserComponent({"component":component, ws: "default"});
            userJSON += uc.toJSON();
            if(index < numOpenComponents){
                userJSON += ",";
            }
            index++;
        });
        userJSON += "]"
        var openComponentTab = $("#open_menu").find(".component_tab.selected");
        var infoBlock = openComponentTab.find(".componentInfo");
        var waitGif = addWaitGif(infoBlock);
        //var elementClass = $(event.currentTarget).attr("class");
        //ajaxCompile(targetJob, targetJSON, waitGif, model);
        wsCompile(targetJob, targetJSON, waitGif, model);
        
        //log(json);
    },
    verify: function(event){
        var ws = null;
        var socketPing;
        var openComponentTab = $("#open_menu").find(".component_tab.selected");
        var infoBlock = openComponentTab.find(".componentInfo");
        var waitGif = addWaitGif(infoBlock);
        
        var model = this.model;
        var component = model.get("componentModel").clone();
        component.set("content", encode(editor.getSession().getValue()));
        var tc = new UserComponent({component: component, ws: "default"});
        var targetJSON = tc.toJSON();
        var userJSON = "[";
        var numOpenComponents = myOpenComponentList.size();
        var index = 0;
        myOpenComponentList.each(function(component){
            var uc = new UserComponent({"component":component, ws: "default"});
            userJSON += uc.toJSON();
            if(index < numOpenComponents){
                userJSON += ",";
            }
            index++;
        });
        userJSON += "]";
        connect(ws, socketPing, model, targetJSON, waitGif);
        $( "#output_tabs" ).tabs("select", 1);
    },
    showJava : function(event){
        var checked = $(event.currentTarget).attr("checked");
        var resolveEditorSession = this.model.get("editorSession"); 
        var javaEditorSession = this.model.get("java");
        var commandButtons = $(".controls_commands").find("button");
        if(checked == "checked"){
            editor.setSession(javaEditorSession);
            editor.setReadOnly(true);
            commandButtons.attr({disable: "diabled"});
            commandButtons.removeClass("active");
            //var ResolveMode = require("ace/mode/resolve").Mode;
        }
        else{
            editor.setSession(resolveEditorSession);
            editor.setReadOnly(false);
            commandButtons.attr({disable: ""});
            commandButtons.addClass("active");
            //var JavaMode = require("ace/mode/java").Mode;
        }
        log($(event.currentTarget).attr("checked"));
    },
    increaseFontSize: function(){
        var oldFontSize = FONTSIZE;
        this.changeFontSize(oldFontSize+1);
    },
    decreaseFontSize: function(){
        var oldFontSize = FONTSIZE;
        this.changeFontSize(oldFontSize-1);
    },
    changeFontSize: function(fontSize){
        FONTSIZE = fontSize;
        document.getElementById("code_editor").style.fontSize=FONTSIZE + "px";
    }
});

function ajaxCompile(targetJob, targetJSON, waitGif, model){
    $.ajax({
        url: "WebCompiler",
        type: "POST",
        //data: {"job": targetJob, "target":targetJSON, "userComponents": userJSON},
        data: {"job": targetJob, "target":targetJSON},
        success: function(result){

            waitGif.remove();
            if(targetJob == "translateJava"){
                $("#console-expander").trigger("click");
                $("#console-info").html(result);
                //analyzeJavaResults(model, result);
            }
            else if(targetJob == "build"){

            }
            else if(targetJob == "genVCs"){
                analyzeVcResults(model, result);
            }
            else if(targetJob == "verify"){
                analyzeVerifyResults(model, result);
            }

            //$(msg).find("genCodeResults").each(function(){
                //var java = unescape($(this).find("code").text());
                //log("result: "+java);
                //java = String(java).replace(lsRegExp, " ");
                //java = replaceRemoteFileNames(serverFileNames, java);
                //name = $(this).find("userName").text();
                //compilerOutput = $(this).find("compilerOutput").text();
                //compilerOutput = String(compilerOutput).replace(lsRegExp, " ");
                //success = $(this).find("translateSuccess").text();
            //});

        }
    });
}

function wsCompile(targetJob, targetJSON, waitGif, model){
    var ws;
    var loc = window.location;
    var pathname = loc.pathname;
    pathname = pathname.substring(0,pathname.lastIndexOf("/"));
    var url = "ws://" + loc.host + (loc.pathname.length>1?loc.pathname+"/":loc.pathname) + "Compiler";
    var params = "?job=" + targetJob + "&target="+targetJSON;
    var new_uri = url + params;
    if ('WebSocket' in window) {
        ws = new WebSocket(new_uri);
    } else if ('MozWebSocket' in window) {
        ws = new MozWebSocket(new_uri);
    } else {
        alert('WebSocket is not supported by this browser.');
        return;
    }
    ws.onmessage = function (event) {
        //waitGif.remove();
        var resultJSON = JSON.parse(event.data);
        var status = resultJSON.status;
        if(status == "info"){
            $("#console-info").append(resultJSON.msg+"<br/>");
        }
        else if(status == "complete"){
            analyzeResults(resultJSON, model);
        }
        else if(status == "error"){
            handleErrors(resultJSON, model);
        }
    };
    ws.onclose = function (event) {
        waitGif.remove();
    };
        
    //new Socket(new_uri+"?target="+targetJSON);
}

function analyzeResults(resultJSON, component){
    if(resultJSON.job == TRANSLATE){
        var EditSession = require("ace/edit_session").EditSession;
        var javaCode = resultJSON.result;
        var javaSession = new EditSession(decode(javaCode));
        var JavaMode = require("ace/mode/java").Mode;
        component.set("java", javaSession);
        editor.setReadOnly(true);
        editor.setSession(javaSession);
        editor.getSession().setMode(new JavaMode());
        myUserControlView.render();
        myUserControlView._javaCheckbox.attr({checked: "checked"});
        var commandButtons = $(".controls_commands").find("button");
        commandButtons.attr({disable: "diabled"});
        commandButtons.removeClass("active");
        
        $("#console-info").append("complete<br/>");
    }
    else if(resultJSON.job == VCS){
        var vcArray = new Array();
        //var result = decode(resultJSON.result);
        var result = decode(resultJSON.result);
        var savedVCs = $(result).text();
        var vcJSON = jQuery.parseJSON(savedVCs);
        var jsonVCs = vcJSON.vcs;
        $.each(jsonVCs, function(index, obj){
            var newVC = null;
            var vcID = obj.vc;
            if(typeof vcID !== "undefined"){
                var sf = obj.sourceFile;
                var vcLine = obj.lineNum;
                var vcCase = obj.vcInfo;
                var vcGoal = htmlEncodeGTLT(decode(obj.vcGoal));
                var vcGiven = htmlEncodeGTLT(decode(obj.vcGivens));
                var vcReasons;
                if(typeof obj.vcReasons === "undefined"){
                    vcReasons = "";
                }
                else{
                    vcReasons = htmlEncodeGTLT(decode(obj.vcReasons));
                }
                var content = vcGoal + vcGiven + vcReasons;
                //vcCase = replaceRemoteFileNames(serverFileNames, vcCase);
                //sf = replaceRemoteFileNames(serverFileNames, sf);
                var temp = vcCase.split(":");
                var i, vcStep = "";
                for(i = 2; i < temp.length; i++){
                    vcStep += temp[i] + ":";
                }
                newVC = new VC(vcID, content, vcCase, vcGoal, vcGiven, vcLine, sf);
                var thisName = newVC.sourceFile;
                thisName = thisName.substring(0, thisName.indexOf("."));
                if(thisName != component.get("name")){
                    var editorLength = component.get("editorSession").doc.getValue().split(/\n/).length;
                    newVC.line = editorLength;
                }
            }
            else{
                newVC = obj;
            }
            vcArray.push(newVC);
        });
        //$("#output_tabs").tabs("select", 2);
        //$("#tabs-vc").html(mainDiv.html());
        //log("VCs complete");
        //selectedFile.vcArray = vcArray;
        addVcs(component, vcArray);
        triggerConsole();
    }
    else if(resultJSON.job == BUILD){
        
    }
    else if(resultJSON.job == VERIFY){
        
    }
}

function handleErrors(resultJSON, component){
    var errorType = resultJSON.type;
    if(errorType == "error"){
        var errors = getErrorArray(resultJSON.errors);
        addErrors(errors, component.get("componentModel"), "compiler");
    }
    else if(errorType == "bug"){
        var bugs = getBugArray(resultJSON.bugs);
        var code = getBugMsgs(bugs);
        code = "<pre class=\"bugTrace\">" + code + "</pre>";
        triggerConsole();
        $("#console-info").html("").append(code+"<br/>");
    }
    // @todo add error handling
}

function getErrorArray(jsonResults){
    return jsonResults[0].errors;
    /*var errors = null;
    if(jsonResults.length == 2){
        errors = jsonResults[0].errors;
    }
    else{
        if(typeof jsonResults[0].errors !== "undefined"){
            errors = jsonResults[0].errors;
        }
    }
    return errors*/
}

function getBugArray(jsonResults){
    return jsonResults[0].bugs;
    /*var bugs = null;
    if(jsonResults.length == 2){
        bugs = jsonResults[1].bugs;
    }
    else{
        if(typeof jsonResults[0].bugs !== "undefined"){
            bugs = jsonResults[0].bugs;
        }
    }
    return bugs;*/
}

function getBugMsgs(bugs){
    var msg = "";
    $.each(bugs, function(index, data){
       msg += decode(data.bug) + "\n"; 
    });
    return msg;
}

function initializeEditor(){
    var editorDiv = "code_editor";
    //var lowerHeight = $("#content").outerHeight(true) - $("#user_bar").outerHeight(true) - 
        //$("#menu_bar").outerHeight(true) - $("#control_bar").outerHeight(true) -
        //$("#open_menu").outerHeight(true) - $("#footer").outerHeight(true);;
    /*$("#editor_container").resizable({
        handles: {e:$("#editor_handle")},
        maxHeight: 500,
        maxWidth: 875,
        alsoResize: "#code_editor,#control_bar",
        alsoResizeReverse: "#output_container",
        resize: function(){
            editor.resize();
            $( "#output_tabs" ).tabs('resize');
        },
        minHeight: 500,
        minWidth: 275
    });*/
    //var editorHeight =  lowerHeight;// - $("#editor_container").outerHeight(true);
    //$("#editor_container").outerHeight(lowerHeight + $("#control_bar").outerHeight(true));
    //$("#code_editor").outerHeight(editorHeight);
    setEditorHeight();
    setConsolePosition();
    //var outputHeight = editorHeight + $("#control_bar").outerHeight(true);
    //$("#output_container").outerHeight(outputHeight-10);
    //$("#tabs_output").outerHeight($("#output_container").outerHeight(true)-10 - $("#output_list").outerHeight(true));
    //$("#tabs_vcs").outerHeight($("#output_container").outerHeight(true)-10 - $("#output_list").outerHeight(true));
    editor = ace.edit(editorDiv);
    editor.setTheme("ace/theme/textmate");
    var ResolveMode = require("ace/mode/resolve").Mode;
    editor.getSession().setMode(new ResolveMode());
    editor.getSession().setValue("test content");
    editor.renderer.setHScrollBarAlwaysVisible(false);
    document.getElementById(editorDiv).style.fontSize=FONTSIZE+"px";
    
    myUserControlView = new UserControlView({el: $("#control_bar"), model: new OpenComponent()});
    
    var consoleExpander = $("#console-expander");
    consoleExpander.click(function(event){
        showConsole(this);
    });
}

function setEditorHeight(){
    var lowerHeight = $("#content").outerHeight(true) - $("#user_bar").outerHeight(true) - 
        $("#menu_bar").outerHeight(true) - $("#control_bar").outerHeight(true) -
        $("#open_menu").outerHeight(true) - $("#footer").outerHeight(true);
    var editorHeight =  lowerHeight;// - $("#editor_container").outerHeight(true);
    $("#editor_container").outerHeight(lowerHeight + $("#control_bar").outerHeight(true));
    $("#code_editor").outerHeight(editorHeight);
}

function setConsolePosition(){
    var console = $("#console-container");
    var editorHeight = $("#editor_container").outerHeight(true);
    $("#console-expander").height($("#code_editor").outerHeight(true));
    $("#editor-console").outerHeight($("#code_editor").outerHeight(true));
    console.outerHeight($("#code_editor").outerHeight(true));
    var consoleHeight = console.outerHeight(true);
    console.css({top:editorHeight-consoleHeight});
}

function showConsole(button){
    var console = $(button).parent();
    //console.removeClass("console-hidden").addClass("console-visible");
    console.animate({
        right: 0
    }, 250);
    $(button).unbind("click").click(function(){
        hideConsole(this);
    });
}

function hideConsole(button){
    var console = $(button).parent();
    //console.removeClass("console-visible").addClass("console-hidden");
    console.animate({
        right: -385
    }, 250);
    $(button).unbind("click").click(function(){
        showConsole(this);
    });
}

function dismissConsole(){
    var infoShowing = ($("#editor-console").css("right")=="0px")?true:false;
    if(infoShowing){
        $("#console-expander").trigger("click");
    }
}

function triggerConsole(){
    var infoShowing = ($("#editor-console").css("right")=="0px")?true:false;
    if(!infoShowing){
        $("#console-expander").trigger("click");
    }
}

function clearConsole(){
    dismissConsole();
    $("#console-info").html("");
}

/*function connect(ws, socketPing, component, targetJSON, waitGif) {
    var target = "ws://localhost:8084/interface/WebProver";
    var loc = window.location;
    var pathname = loc.pathname;
    pathname = pathname.substring(0,pathname.lastIndexOf("/")+1);
    var new_uri = "ws://" + loc.host + pathname + "WebProver";
    if (target == '') {
        alert('Please select server side connection implementation.');
        return;
    }
    if ('WebSocket' in window) {
        ws = new WebSocket(new_uri);
    } else if ('MozWebSocket' in window) {
        ws = new MozWebSocket(new_uri);
    } else {
        alert('WebSocket is not supported by this browser.');
        return;
    }
    ws.onopen = function () {
        //setConnected(true);
        log('Info: WebSocket connection opened.');
        ws.send(targetJSON);
        socketPing = setTimeout(function(){
            ping(ws, socketPing);
        }, 15000);
    };
    ws.onmessage = function (event) {
        if(event.data != "ping"){
            //analyzeVerifyResults(component, event.data);
            //ws.close();
            if(event.data == "completed"){
                ws.close();
            }
            log(htmlEncodeGTLT(event.data));
        }
            
        //log('Received: ' + event.data);
    };
    ws.onclose = function () {
        //setConnected(false);
        waitGif.remove();
        log('Info: WebSocket connection closed.');
        clearTimeout(socketPing);
    };
}

function disconnect() {
    if (ws != null) {
        ws.close();
        ws = null;
    }
    setConnected(false);
}

function echo() {
    if (ws != null) {
        var message = document.getElementById('message').value;
        log('Sent: ' + message);
        ws.send(message);
    } else {
        alert('WebSocket connection not established, please connect.');
    }
}

function updateTarget(target) {
    document.getElementById('target').value = 'ws://' + window.location.host + target;
}

function ping(ws, socketPing){
    ws.send("ping");
    socketPing = setTimeout(function(){
        ping(ws, socketPing);
    }, 15000)
}*/

/*
 * This function decodes the UrlEncoded content from the server. It also
 * replaces the %20's with spaces (" "). We have to replace the spaces with
 * the HTML code before transmission because the Java UrlEncode replaces spaces
 * with pluss signs ("+"). If we don't do this replacement we will lose all
 * plus signs that are have spaces next to them.
 */
function decode(content){
    var lsRegExp = /\%20/g;
    var lsRegExp2 = /\%2B/g;
    var lsRegExpLT = /\&lt;/g;
    var lsRegExpGT = /\&gt;/g;
    var cont = String(unescape(content)).replace(lsRegExp, " ");
    cont = cont.replace(lsRegExp2, "+")
    return cont;
}

function htmlEncodeGTLT(content){
    var lsRegExpLT = /\</g;
    var lsRegExpGT = /\>/g;
    var cont = content.replace(lsRegExpLT,"&lt;");
    cont = cont.replace(lsRegExpGT,"&gt;");
    return cont;
}

function logVCs(vcs){
    vcs.sort(sortByIdAndLine);
    //$( "#output_tabs" ).tabs("select", 2);
    var vcDiv = $("#console-info");
    vcDiv.html("");
    var vcInfo = $("<div>");
    var firstVC;
    for(var i = 0; i < vcs.length; i++){
        if(typeof vcs[i].vcID !== "undefined"){
            firstVC = vcs[i];
            break;
        }
    }
    
    var vcLine = $("<div>").attr({id: "vc_line_"+(firstVC.line)}).addClass("vcContainer selectedVC");
    var currLine = firstVC.line;
    jQuery.each(vcs, function(){
        var vc = this;
        if(typeof vc.vcID !== "undefined"){
            if(vc.line > currLine){
                vcDiv.append(vcLine);
                vcLine = $("<div>").attr({id: "vc_line_"+(vc.line)}).addClass("vcContainer selectedVC");
            }
            //vcLine.append(reformatVCs(encodeVcContent(this.text)).html());
            vcLine.append(reformatVCs(vc).html());
            currLine = vc.line;
        }
        else{
            vcLine.append(reformatVCs(vc).html());
        }
            
    });
    //var openVCs = vcDiv.find(".vcContainer.selectedVC");
    //openVCs.removeClass("selectedVC");
    vcDiv.append(vcLine);
    //vcDiv.animate({scrollTop: vcDiv.prop("scrollHeight")}, 1000);
    //vcDiv[0].scrollTop = vcDiv[0].scrollHeight;
    //var consoleDiv = document.getElementById("console");
    //consoleDiv.innerHTML += msg+"<br/>";
    //consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function selectVC(lineNum){
    //$( "#output_tabs" ).tabs("select", 2);
    var vcsDiv = $("#console-info");
    var vcDiv = $("#vc_line_"+lineNum);
    var openVCs = vcsDiv.find(".vcContainer.selectedVC");
    openVCs.removeClass("selectedVC");
    vcDiv.addClass("selectedVC");
    //vcDiv.append(vc);
    var firstVcPosition = vcsDiv.find(":first").position();
    var selectedVcPosition = vcDiv.position();
    vcsDiv.animate({scrollTop: selectedVcPosition.top - firstVcPosition.top}, 'fast');
    //vcsDiv.attr({scrollTop: vcDiv.position().top});
    //vcDiv[0].scrollTop = vcDiv[0].scrollHeight;
    //var consoleDiv = document.getElementById("console");
    //consoleDiv.innerHTML += msg+"<br/>";
    //consoleDiv.scrollTop = consoleDiv.scrollHeight;
}

function reformatVCs(vc){
    var vcsDiv = $("<div>").addClass("vcContainer selectedVC").html("");
    var vcDiv = $("<div>");
    var vcID = vc.vcID;
    if(typeof vcID !== "undefined"){
        vcDiv.addClass("vc");
        var step = decode(vc.step);
        //var step = decode(vcJSON.step);
        var goal = vc.goal;
        var given = vc.given;
        vcDiv.html("VC "+vcID+"<br/><br/>");
        vcDiv.append(step+"<br/><br/>");
        vcDiv.append("Goal:");
        goal = goal.substr(goal.indexOf(":")+1);
        var goalDiv = $("<div>").addClass("vcIndent").html("<p>"+goal.replace(/&nbsp;/g, " ")+"</p>");
        vcDiv.append(goalDiv);
        vcDiv.append("Given:");
        //given = given.substr(given.indexOf(":")+1);
        //var givensDiv = $("<div>").addClass("vcIndent").html("");
        var givensList = $("<ol>");
        var givenRegExp = /[\d]+:/g;
        //var givenRegExp = /\<br\/\>[\d]+:/g;
        var givens = given.split(givenRegExp);
        $.each(givens, function(index, given){
            if(index != 0){
                //var givenID = $("<div>").addClass("vcGivenID").html(index + ":");
                //var givenDiv = $("<div>").addClass("vcGiven").html(given);
                //var givenItem = $("<li>").html("<p>"+given.replace(/&nbsp;/g, " ")+"</p>");
                var givenItem = $("<li>").html(given.replace(/&nbsp;/g, " "));
                //givensDiv.append(givenID);
                givensList.append(givenItem);
            }
        });
        vcDiv.append(givensList);
        vcsDiv.append(vcDiv);
    }
    else{
        vcDiv.addClass("freeVars");
        vcDiv.append(decode(vc.freeVars));
    }
    //$.each(vcArray, function(){
        
    //});
    return vcsDiv;
}

function encodeVcContent(content){
    var regExp = /\<[^\>]\>/g;
    var lsRegExpLT = /\</g;
    var lsRegExpGT = /\>/g;
    var lsRegExpSpace = new RegExp(" ","gim");
    var cont = content.replace(lsRegExpLT,"&lt;");
    cont = cont.replace(lsRegExpGT,"&gt;");
    //cont = cont.replace(lsRegExpSpace,"&nbsp;");
    cont = cont.replace(/\n/g, "<br/>") + "<br/><br/>";
    return cont;
}

function getVcSteps(rawVCs){
    var vcs = "";
    rawVCs = rawVCs.substr(0, rawVCs.lastIndexOf("@"));
    var vcArray = rawVCs.split("@");
    $.each(vcArray, function(){
        //var vcDiv = $("<div>").addClass("vc");
        var jsonStr = this.toString();
        jsonStr = jsonStr.substr(jsonStr.indexOf("{"));
        var vcJSON = jQuery.parseJSON(jsonStr);
        if(vcJSON != null){
            var vcID = vcJSON.vc;
            var step = decode(vcJSON.step);
            //var goal = vcJSON.goal;
            //var given = vcJSON.given;
            vcs += vcID+": "+step+"\n";
        }
    });
    return vcs;
}

function sortByIdAndLine(a, b){
    var line1 = a.line;
    var line2 = b.line;
    
    var id1 = a.vcID;
    var id2 = b.vcID;
    
    return (((typeof line1 === "undefined") || (typeof line2 === "undefined"))? 1 : (
        (line1 != line2) ? (
            (line1 < line2) ? -1 : ((line1 > line2) ? 1 : 0)
        ) : (
            (id1 < id2) ? -1 : ((id1 > id2) ? 1 : 0)
        )
        
    ));
    //return ((typeof line1 === "undefined") ? 1 : ((line1 < line2) ? -1 : ((line1 > line2) ? 1 : 0)));
}

/*$.ui.plugin.add("resizable", "alsoResizeReverse", {

    start: function(event, ui) {

        var self = $(this).data("resizable"), o = self.options;

        var _store = function(exp) {
            $(exp).each(function() {
                $(this).data("resizable-alsoresize-reverse", {
                    width: parseInt($(this).width(), 10), height: parseInt($(this).height(), 10),
                    left: parseInt($(this).css('left'), 10), top: parseInt($(this).css('top'), 10)
                });
            });
        };

        if (typeof(o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.parentNode) {
            if (o.alsoResizeReverse.length) {o.alsoResize = o.alsoResizeReverse[0];_store(o.alsoResizeReverse);}
            else {$.each(o.alsoResizeReverse, function(exp, c) {_store(exp);});}
        }else{
            _store(o.alsoResizeReverse);
        }
    },

    resize: function(event, ui){
        var self = $(this).data("resizable"), o = self.options, os = self.originalSize, op = self.originalPosition;

        var delta = {
            height: (self.size.height - os.height) || 0, width: (self.size.width - os.width) || 0,
            top: (self.position.top - op.top) || 0, left: (self.position.left - op.left) || 0
        },

        _alsoResizeReverse = function(exp, c) {
            $(exp).each(function() {
                var el = $(this), start = $(this).data("resizable-alsoresize-reverse"), style = {}, css = c && c.length ? c : ['width', 'height', 'top', 'left'];

                $.each(css || ['width', 'height', 'top', 'left'], function(i, prop) {
                    var sum = (start[prop]||0) - (delta[prop]||0); // subtracting instead of adding
                    if (sum && sum >= 0)
                        style[prop] = sum || null;
                });

                //Opera fixing relative position
                if (/relative/.test(el.css('position')) && $.browser.opera) {
                    self._revertToRelativePosition = true;
                    el.css({position: 'absolute', top: 'auto', left: 'auto'});
                }

                el.css(style);
            });
        };

        if (typeof(o.alsoResizeReverse) == 'object' && !o.alsoResizeReverse.nodeType) {
            $.each(o.alsoResizeReverse, function(exp, c) {_alsoResizeReverse(exp, c);});
        }else{
            _alsoResizeReverse(o.alsoResizeReverse);
        }
    },

    stop: function(event, ui){
        var self = $(this).data("resizable");

        //Opera fixing relative position
        if (self._revertToRelativePosition && $.browser.opera) {
            self._revertToRelativePosition = false;
            el.css({position: 'relative'});
        }

        $(this).removeData("resizable-alsoresize-reverse");
    }
});*/

function checkResolveKeywords(value){
    if(keywordsTable.hasKeyword(value) > 0)
        return true;
    else
        return false;
}

function showKeywordTooltip(pos, editor, textRange){
    var selectedWord = editor.session.getTextRange(textRange);
 //   if(jQuery.inArray(selectedWord, keywordsTable.items) >= 0){
    if(keywordsTable.hasKeyword(selectedWord)){    
        var keyword = $("#code_editor").find(".ace_keyword:contains("+selectedWord+")");
            
        var length = selectedWord.length;
        keyword.each(function(){
            var offset = $(this).offset();
            var keywordPos = editor.renderer.screenToTextCoordinates(offset.left+3, offset.top+3);
            if(keywordPos.row == pos.row){
                if(keywordPos.column <= pos.column && pos.column <= keywordPos.column + length){
                    $(this).qtip({
                        content: {
                            text: keywordsTable.getTip(selectedWord),
                            title: {
                                text: selectedWord,
                                button: true
                            }
                        }, 
                        show: {
                            event: false, // Only show when show() is called manually
                            ready: true // Also show on page load
                        },
                        hide: "unfocus",
                        style: {
                            classes: 'ui-tooltip-keywords ui-tooltip-rounded',
                            tip:{
                                corner: 'top left'
                            }
                        }
                    });
                }
            }
        });
    }
}