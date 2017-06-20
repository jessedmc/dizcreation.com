
(function($) {
	var passit = "action";
	var sql;
	
    $(document).ready(function() {
		$("#lblArr1").html('show tables ajax attempt mf');
		// ------ Load table names ------ //
		q = 'SHOW TABLES';
		$.ajax({
			type: "POST",
			url: 'http://dizcreation.com/wp-content/plugins/dizphp/dizphp.php',
			data: {action: 'sql', query: q},
			success: function(jsdata) {
				$("#lblValue1").html('show tables ajax call success');
				showTableNames(jsdata);
				displayer(jsdata);
				
			},
			error: function(exception) {
				alert('Exception:' + exception);
				
			}
			
		});
	
		$("#btnRequest").click(function() {
			insertToDb();
		});
		
		// ----- On mouse click table names ----- // 
		$("#divLblShowTables").on('click', 'label', function () {
			//alert(this.id);
			tableNameClick(this);
		});
		
	}); // end of callback function for document.ready
	
	// ***** table name click event ***** // 
	function tableNameClick(curTable) {
		//$("#lblArr0").html(curTable.id);
		q = 'SELECT * FROM ' + curTable.innerHTML;
			
		$.ajax({
			type: "POST",
			url: 'http://dizcreation.com/wp-content/plugins/dizphp/dizphp.php',
			data: {action: 'sql', query: q},
			success: function(jsdata) {
				$("#lblTest").html(jsdata);
				displayer(jsdata);
				
			},
			error: function(exception) {
				alert('Exception:' + exception);
				
			}
		});
	}
	
	// ----- Insert data to db ----- //
	function insertToDb() {
		q = "INSERT INTO grn (id, organism_id, source_id, name) VALUES (9, 30, 30, 'ltrain')";
			
		$.ajax({
			type: "POST",
			url: 'http://dizcreation.com/wp-content/plugins/dizphp/dizphp.php',
			data: {action: 'insert', query: q},
			success: function() {
				$("#lblTest").html('insert data success');
				displayer(jsdata);
				
			},
			error: function(exception) {
				alert('Exception:' + exception);
				
			}
		});
	}
	
	// ----- Show table names in column on load ----- //
	function showTableNames(data) {
		$("#lblValue2").html("made it to showTableNames()");
		var labels;
		var index = -1;
		var count = -1;
		$("#lblArr0").html(data);
		var obj = JSON.parse(data, function (key, value) {
			count += 1;
			if ((count % 2) == 0) {    // if count is even we have a value
				index += 1;
				labels = document.createElement("LABEL");     // create label for a table name
				//labels.id = 'lblTable' + index;              // set id for label
				labels.className = 'clblShowTables';			// set class for label
				labels.style.top = (30 * index) + 'px';
				//$("#lblValue4").html(index);
				$(labels).html(value);
				$("#divLblShowTables").append(labels);
			}
			
		}); 
	}
	
	// ----- Put data from db into a table on Request Info Click ------ //
	function displayer(data) {
		//$("#lblMover").html("id success");
		//$("#lblTable1").html('Label Table 1');
		
		/*
		<table>
		<tr>
			<th>Company</th>
			<th>Contact</th>
			<th>Country</th>
		</tr>
		<tr>
			<td>Alfreds Futterkiste</td>
			<td>Maria Anders</td>
			<td>Germany</td>
		</tr>      */
		
		var count = -1;
		var colCount = -1;
		var firstKey;
		var table = document.createElement("TABLE");
		var onFirstRow = true;
		var rowHead = document.createElement("TR");
		var row = document.createElement("TR");
		table.appendChild(rowHead);    // table has one row before we start parsing that is the head
		table.appendChild(row);        // and one row to start data
		var headCol, txt;
		var tdata;
		var numOfCols;
		var makeNewRow = false;
		var curKeyIndex = -1;     // -1 indicates first row, 0 for 2nd row, 1 for 3rd row, .. etc
		
		var obj = JSON.parse(data, function (key, value) {
			count += 1;
			$("#lblCount").html(count);
			
			if (count == 0) {
				$("#lblKey0").html(key);
				$("#lblValue0").html(value);
			}
			if (count == 1) {
				$("#lblKey1").html(key);
				$("#lblValue1").html(value);
			}
			if (count == 2) {
				$("#lblKey2").html(key);
				$("#lblValue2").html(value);
			}
			if (count == 3) {
				$("#lblKey3").html(key);
				$("#lblValue3").html(value);
			}
			if (count == 4) {
				$("#lblKey4").html(key);
				$("#lblValue4").html(value);
			}
			if (count == 5) {
				$("#lblKey5").html(key);
				$("#lblValue5").html(value);
			}
			if (count == 6) {
				$("#lblKey6").html(key);
				$("#lblValue6").html(value);
			}
			if (count == 7) {
				$("#lblKey7").html(key);
				$("#lblValue7").html(value);
			}
			if (count == 8) {
				$("#lblKey8").html(key);
				$("#lblValue8").html(value);
			}
			if (count == 9) {
				$("#lblKey9").html(key);
				$("#lblValue9").html(value);
			}
			if (count == 10) {
				$("#lblKey10").html(key);
				$("#lblValue10").html(value);
			}
			if (count == 11) {
				$("#lblKey11").html(key);
				$("#lblValue11").html(value);
			}
			if ((key == '') && (count == 0)) {
				var emptyMsg = document.createElement('P');
				emptyMsg.innerHTML = ('empty table');
				$('#tableDiv').append(emptyMsg);
			}
			else {
				if ((key == 0) && (onFirstRow)) {   // if we reach the end of the first row
					makeNewRow = true;
					numOfCols = count - 1;
				}
				else if (key == 0) {   // if we reach the end of a row that is not the first row
					beginNewRow = 0;
				}
				
				if ((curKeyIndex == -1) && (key != (curKeyIndex + 1))) {   // first row of data
					headCol = document.createElement("TH");
					txt = document.createTextNode(key);
					headCol.appendChild(txt);
					tdata = document.createElement("TD");
					txt = document.createTextNode(value);
					tdata.appendChild(txt);
					row.appendChild(tdata);
					rowHead.appendChild(headCol);
				}
				else if (key == (curKeyIndex + 1)) {
					curKeyIndex += 1;
					makeNewRow = true;
				}
				else {   // other rows of data
					if (makeNewRow) { // if we hit a new row make new row in table
						table.appendChild(row);
						row = document.createElement("TR");
						makeNewRow = false;
					}
					tdata = document.createElement("TD");
					txt = document.createTextNode(value);
					tdata.appendChild(txt);
					row.appendChild(tdata);                         
				}        
			
				$("#tableDiv").append(table);          
				$("#lblArrLen").html(data.length);
			} // end else for if ((key == 0) && (count == 0))
		}); // end json.parse()
	} // end display()
	
	
	
	
})(jQuery);


















