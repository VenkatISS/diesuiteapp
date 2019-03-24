
/*------------------------------------- PROCESSING PAGE DATA -------------------------------------------*/
var rowpdhtml = "";
if(page_data.length>0) {
	for(var z=0; z<page_data.length; z++){
		rowpdhtml = rowpdhtml + "<tr valign='top'><td rowspan='"+page_data[z].bomItemsSet.length+"'>"+page_data[z].bom_name+"</td>";
		for(var i=0; i<page_data[z].bomItemsSet.length; i++){
			var pid = page_data[z].bomItemsSet[i].prod_code;
			var spd = "";
						
			if(pid < 100) {
				spd = fetchProductDetails(prod_types, pid ); 
			}
			if(pid > 100) {
				spd = fetchARBProductDetails(arb_data, pid);
			}
			if(i==0) {
				rowpdhtml = rowpdhtml + "<td>"+spd+"</td>"+
				"<td>"+page_data[z].bomItemsSet[i].qty+"</td>"+
				"<td>"+page_data[z].bomItemsSet[i].deposit_req+"</td>"+
				"<td><img src='images/delete.png' onclick='deleteItem("+page_data[z].id+")'></td>"+"</tr>";
			} else {
				rowpdhtml = rowpdhtml + "<tr><td>"+spd+"</td>"+
				"<td>"+page_data[z].bomItemsSet[i].qty+"</td>"+
				"<td>"+page_data[z].bomItemsSet[i].deposit_req+"</td><td></td></tr>";
			}
		}
	}
}
document.getElementById('m_data_table_body').innerHTML = rowpdhtml;


/*--------------------------------------DISPLAYING SELECTS FOR EQUIPMENT,REGULATORS,ARB AND SERVICES-----------------------------*/

var espanhtml = "";
//Construct Equipment Types Data
espanhtml = "<select class='form-control input_field select_dropdown' id='eselect'>";
espanhtml += "<OPTION VALUE='0'>SELECT</OPTION>";	
for(var i=0; i<e_types.length;i++) {
	if(e_types[i].id<10) {
		espanhtml = espanhtml + "<option value='"+e_types[i].id+"'>"+e_types[i].cat_name+" - "+e_types[i].cat_desc+"</option>";
	}
}
espanhtml = espanhtml+"</select>"
document.getElementById("espan").innerHTML = espanhtml;

var rspanhtml = "";
//Construct Regulator Types Data
rspanhtml = "<select class='form-control input_field select_dropdown' id='rselect'>";
rspanhtml += "<OPTION VALUE='0'>SELECT</OPTION>";
for(var i=0; i<e_types.length;i++) {
	if(e_types[i].id>9) {
		rspanhtml = rspanhtml + "<option value='"+e_types[i].id+"'>"+e_types[i].cat_name+" - "+e_types[i].cat_desc+"</option>";
	}
}
rspanhtml = rspanhtml+"</select>"
document.getElementById("rspan").innerHTML = rspanhtml;


var sspanhtml = "";
//Construct Equipment Types Data
sspanhtml = "<select class='form-control input_field select_dropdown' id='sselect'>";
sspanhtml += "<OPTION VALUE='0'>SELECT</OPTION>";
for(var i=0; i<s_types.length;i++) {
	sspanhtml = sspanhtml + "<option value='"+s_types[i].id+"'>"+s_types[i].cat_desc+"</option>"
}
sspanhtml = sspanhtml+"</select>"
document.getElementById("sspan").innerHTML = sspanhtml;

var arbspanhtml = "";
//Construct ARB Data
arbspanhtml= "<select class='form-control input_field select_dropdown' id='arbselect'>";
arbspanhtml += "<OPTION VALUE='0'>SELECT</OPTION>";
if(arb_data.length>0) {
	for(var z=0; z<arb_data.length; z++){
		if(arb_data[z].deleted == 0){
		arbspanhtml=arbspanhtml+"<OPTION VALUE='"+arb_data[z].id+"'>"
		+getARBType(arb_data[z].prod_code)+" - "+arb_data[z].prod_brand+" - "+arb_data[z].prod_name
		+"</OPTION>";
	}
   }
}
arbspanhtml = arbspanhtml+"</select>"
document.getElementById("arbspan").innerHTML = arbspanhtml;



/*--------------------------------------- SHOW BOM FORM & CLOSE BOM FORM ---------------------------------------------*/

function showBOMFormDialog() {
	document.getElementById('myModal').style.display = "block";
}

function closeBOMFormDialog() {
	document.getElementById("espan").innerHTML = espanhtml;
	document.getElementById("rspan").innerHTML = rspanhtml;
	document.getElementById("sspan").innerHTML = sspanhtml;
	document.getElementById("arbspan").innerHTML = arbspanhtml;

	document.getElementById("data_form").reset();	
	var tbody = document.getElementById('s_data_table_tbody');	
	var count = document.getElementById('s_data_table_tbody').getElementsByTagName('tr').length;
	for(var a=0; a<count; a++){
		tbody.deleteRow(-1);
	}			
	document.getElementById('myModal').style.display = "none";
}


/*------------------------------------------ADD PRODUCT-----------------------------------------------*/
function addProduct(et){	
	var tbody = document.getElementById('s_data_table_tbody');
	var disabledVar = "";
	var spidv="";
	var dpd = "";
	if(!(et=='e')){
		disabledVar = "value='NA' readonly='readonly'";
		if(et=='s'){
			var sp = document.getElementById("sselect");
			if(sp.selectedIndex>0){
				spidv = sp.options[sp.selectedIndex].value;
				dpd = sp.options[sp.selectedIndex].text;
			}else {
				//alert("Please select Services and then add again");
				document.getElementById("dialog-1").innerHTML = "Please select Services and then add again";
				alertdialogue();
				return false;
			}	
		}else if (et=='a'){
			var sp = document.getElementById("arbselect");
			if(sp.selectedIndex>0){
				spidv = sp.options[sp.selectedIndex].value;
				dpd = sp.options[sp.selectedIndex].text;
			}else {
				document.getElementById("dialog-1").innerHTML = "Please select BLPG/ARB/NFR Products and then add again";
				alertdialogue();
				//alert("Please select BLPG/ARB/NFR Products and then add again");
				return false;
			}
		}else if (et=='r'){
			var sp = document.getElementById("rselect");
			if(sp.selectedIndex>0){	
				spidv = sp.options[sp.selectedIndex].value;
				dpd = sp.options[sp.selectedIndex].text;
			}else {
				document.getElementById("dialog-1").innerHTML = "Please select regulators and then add again";
				alertdialogue();
				//alert("Please select regulators and then add again");
				return false;
			}	
		}
	} else {
		var sp = document.getElementById("eselect");
		if(sp.selectedIndex>0){
			spidv = sp.options[sp.selectedIndex].value;
			dpd = sp.options[sp.selectedIndex].text;
		}else { 
			document.getElementById("dialog-1").innerHTML = "Please select Cylinders and then add again";
			alertdialogue();
			//alert("Please select Cylinders and then add again");
			return false;
		}	
	}
	var newRow = tbody.insertRow(-1);
	newRow.style.height="20px";

	var a = newRow.insertCell(0); 
	var b = newRow.insertCell(1); 
	var c = newRow.insertCell(2);
	var d = newRow.insertCell(3);
	
	a.innerHTML = "<td valign='top' height='4' align='center'><input type=text name='pid' class='form-control input_field ic' id='pid' size='20' value='"+dpd+"' readonly='readonly'></td>";
	b.innerHTML = "<td valign='top' height='4' align='center'><input type=text name='qty' class='form-control input_field' id='qty' size='8' value='1' "+disabledVar+"></td>";

	if(et=='e' || et=='r') {
		c.innerHTML = "<td valign='top' height='4' align='center'><select name='drn' id='drn' style='width:100px;' class='form-control input_field select_dropdown' data-bprod='"+et+"'>" +
		"<OPTION VALUE='0'>SELECT</OPTION>"+
		"<OPTION VALUE='YES'>YES</OPTION>"+
		 "<OPTION VALUE='NO'>NO</OPTION>"+
		"</SELECT></td>";
	} else {
		c.innerHTML = "<td valign='top' height='4' align='center'><select name='drn' id='drn' style='width:100px;' class='form-control input_field select_dropdown' data-bprod='"+et+"'>" +
		 "<OPTION VALUE='NA'>NOT APPLICABLE</OPTION>"+
		"</SELECT></td>";
	}	
		
	d.innerHTML = "<td valign='top' height='4' ><input type=hidden name='spid' id='spid' value='"+spidv+"'><img src='images/delete.png' onclick='doRowDelete(this)'></td>";
	
}


function saveData(obj){
	var formobj = document.getElementById('data_form');
	var ems = "";
	var flag="";
	var pval=new Array();
	if (document.getElementById("pid") != null) {
		var elements = document.getElementsByClassName("ic");
		if(elements.length>1) {
			for (var i = 0; i < elements.length; i++) {
				pval.push(formobj.pid[i].value);
			}	
			flag=validateEqReg(pval);
		}		
		if (flag) {
			document.getElementById("dialog-1").innerHTML = flag;
			alertdialogue();
			//alert(flag);
			return;
		}		
		var ebname = formobj.bom_name.value.trim();
		if (elements.length == 1) {
			document.getElementById("dialog-1").innerHTML = "BOM must contain atleast one EQUIPMENT And others.. ";
			alertdialogue();
			//alert("BOM must contain atleast one EQUIPMENT And others.. ");
			return;
		} else if (elements.length > 1) {
			for (var i = 0; i < elements.length; i++) {
				var edrn = formobj.drn[i].value;
				var eqty = formobj.qty[i].value.trim();
				ems = validateBomEntries(ebname,eqty,edrn);
				if (ems.length > 0)
					break;
			}
		}
		
	}else {
		//alert("Please add data.");
		document.getElementById("dialog-1").innerHTML = "Please add data.";
		alertdialogue();
		return;
	}
	if (ems.length > 0) {
		document.getElementById("dialog-1").innerHTML = ems;
		alertdialogue();
		//alert(ems);
		return;
	}
	
	var objId = obj.id;
	document.getElementById(objId).disabled = true;
	formobj.submit();
}

function validateEqReg(pval){
	var c=0;
	var r=0;
	var str="";

/*	
 * Working fine
 *	
 * var matches = pval.filter(
		    function( s ) { return s.indexOf( 'CYL' ) !== -1; }
	);

	if(matches == "")
		return "Add alteast one Equipment.";
		
	for (var i = 0; i < pval.length; i++) {
		if((pval[i].indexOf("CYL")>=0)) {
			if(c>0){
				str = "You can add only One Equipment for a single BOM";
				return str;
			}else ++c; 
		}else if((pval[i].indexOf("REG")>=0)) {
			if(r>0){
				str = "You can add only One Regulator for a single BOM";
				return str; 
			}else ++r;
		}
		
	}
*/
	var atlOneEq = pval.filter(function( s ) { 
		return s.indexOf( 'CYL' ) !== -1; 
	});
	if(atlOneEq == "")
		return "Add alteast one Equipment.";


	var OnlyOneEqp = pval.filter(function( s ) { 
		return s.indexOf('CYL')>=0; 
	});
	if(OnlyOneEqp.length > 1)
		return "You can add only One Equipment for a single BOM";

	var OnlyOneReg = pval.filter(function( s ) { 
		return s.indexOf('REG')>=0; 
	});
	if(OnlyOneReg.length >1)
		return "You can add only One Regulator for a single BOM";

	var isdbc = document.getElementById("ctyped").checked; 
	if((OnlyOneReg.length >= 1) && (isdbc==true))
		return "For DBC, there cannot be any Regulator.Please verify it and save";

	return str;
}

function validateBomEntries(ebname,eqty,edrn) {
	var errmsg = "";
	var regs = document.getElementById('rselect').value;
	var isChecked = $('#ctyped').is(':checked');

	if (!(ebname.length > 0))
		errmsg = "Please Enter BOM NAME.<br>";
	else if(ebname.length < 5)
		errmsg = " BOM NAME must be atleast Five characthers.<br>";

	if($("input[type=radio][name=ctype]:checked").length <= 0) {
		errmsg = errmsg + "Please select CONNECTION TYPE<br>";			
	} 

	if (!(eqty.length > 0))
		errmsg = errmsg + "Please Enter QUANTITY for Cylinders<br>";
	else if(!(parseInt(eqty)==1 || parseInt(eqty)==2))
		errmsg = errmsg + "Cylinder QUANTITY can be either 1 or 2 for a single BOM<br>";
	
	if(edrn!="NA"){
		if(edrn=="0")
			errmsg = errmsg + "Please Select whether DEPOSIT REQUIRED or not<br>";
	}
		
	return errmsg;
}

/*function deleteItem(did){
	if (confirm("Are you sure you want to delete?") == true) {
		var formobj = document.getElementById('m_data_form');
		formobj.actionId.value = "3143";
		formobj.dataId.value = did;
		formobj.submit();
	}	
}*/
function deleteItem(id){
	 $("#myDialogText").text("Are You Sure You Want To Delete?");
	 var formobj = document.getElementById('m_data_form');
	 confirmDialogue(formobj,3143,id);
}

