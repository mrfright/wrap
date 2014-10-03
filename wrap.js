var instruction_count = 0;

var add_class = function (el, class_name) {
  'use strict';
  if (el.classList) {
    el.classList.add(class_name);
  } else {
    el.className += ' ' + class_name;
  }
};

var add_instruction = function () {
  "use strict";
  
  //var instructions = document.querySelectorAll('#instructions');
  var instruction_element = document.createElement('div');
  // <div id="instruction1" class="instruction top_instruction">
  instruction_element.setAttribute('id', 'instruction' + instruction_count);
  add_class(instruction_element, 'instruction');
  if (instruction_count === 0) {
    add_class(instruction_element, 'top_instruction');
  }
  
  /*add instruction number*/
  var instruction_number = document.createElement('div');
  add_class(instruction_number, 'instructionNumber');
  instruction_number.textContent = instruction_count;
  instruction_element.appendChild(instruction_number);
  
  /*add instruction type*/
  var instruction_type = document.createElement('div');
  add_class(instruction_type, 'instructionType');
  /*add form to the instruction type*/
  var instruction_form = document.createElement('form');
  instruction_form.setAttribute('name', 'myform');
  
  /*add select to form*/
  var instruction_select = document.createElement('select');
  instruction_select.setAttribute('name', 'mylist');
  /*add options to select*/
  /*deb option*/
  var instruction_deb_option = document.createElement('option');
  instruction_deb_option.setAttribute('value', '1');
  instruction_deb_option.textContent = 'DEB';
  instruction_select.appendChild(instruction_deb_option);
  
  /*inc option*/
  var instruction_inc_option = document.createElement('option');
  instruction_inc_option.setAttribute('value', '2');
  instruction_inc_option.textContent = 'INC';
  instruction_select.appendChild(instruction_inc_option);
  
  /*end option*/
  var instruction_end_option = document.createElement('option');
  instruction_end_option.setAttribute('value', '3');
  instruction_end_option.setAttribute('selected', 'selected');
  instruction_end_option.textContent = 'END';
  instruction_select.appendChild(instruction_end_option);
  
  instruction_form.appendChild(instruction_select);
  
  instruction_type.appendChild(instruction_form);
  instruction_element.appendChild(instruction_type);
  
  
  /*add arguments*/
  /*add register value*/
  var instruction_register_value = document.createElement('input');
  add_class(instruction_register_value, 'reg');
  instruction_register_value.setAttribute('id', 'instruction_register_value');
  instruction_element.appendChild(instruction_register_value);
  
  /*add instruction value*/
  var instruction_instruction_value = document.createElement('input');
  add_class(instruction_instruction_value, 'reg');
  instruction_instruction_value.setAttribute('id', 'instruction_instruction_value');
  instruction_element.appendChild(instruction_instruction_value);
  
  /*add branch value*/
  var instruction_branch_value = document.createElement('input');
  add_class(instruction_branch_value, 'reg');
  instruction_branch_value.setAttribute('id', 'instruction_branch_value');
  instruction_element.appendChild(instruction_branch_value);
  
    document.getElementById('instructions').appendChild(instruction_element);
  
  instruction_count = instruction_count + 1;
};

var program_counter = -1;
var active_instruction = -1;
var firstReg = true;

var restart = function() {
  biggest_reg = -1;
  uncolor_instruction(active_instruction);
  firstReg = true;
  program_counter = 0;
  active_instruction = 0;
  
  /*remove all registers*/
  var reg_box = document.getElementById('reg_box');
  var registers = reg_box.querySelectorAll('.register');
  for(var i=0; i<registers.length; i++)
  {
    registers[i].parentNode.removeChild(registers[i]);
  }
  document.getElementById('reset').style.display = 'none';
};

document.addEventListener('DOMContentLoaded', function () {
  'use strict';
  add_instruction();
  restart();
});

/*make new register by getting one larger than largest reg number*/
var biggest_reg = -1;
var add_register = function() {
  get_register(biggest_reg+1);
};

/*get the register of that number, creates it if it doesn't exist yet*/
var get_register = function(reg_num) {
  if(reg_num>biggest_reg){
    biggest_reg = reg_num;
  }
  var reg_box = document.getElementById('reg_box');
  var reg = reg_box.querySelectorAll('#reg'+reg_num)[0];
  if(reg){
    //alert('found reg');
  }
  else{
    reg = document.createElement('div');
    add_class(reg, 'register');
    if(firstReg){
      add_class(reg, 'top_register');
      firstReg = false;
    }
    reg.setAttribute('id', 'reg' + reg_num);
    var reg_num_div = document.createElement('div');
    add_class(reg_num_div, 'register_number');
    reg_num_div.textContent = reg_num;
    reg.appendChild(reg_num_div);
    
    var reg_input = document.createElement('input');
    add_class(reg_input, 'reg_val');
    reg_input.setAttribute('type', 'text');
    reg_input.setAttribute('id', 'reg_val_'+reg_num);
    reg_input.value = '0';
    reg.appendChild(reg_input);
    reg_box.appendChild(reg);
  }
  return reg;
};


var valid_instruction = function(instruction_num) {
  var tok = editor.session.getLine(instruction_num).trim().split(' ');

  if(tok[0].toUpperCase() === 'END' 
     || tok[0].toUpperCase() === 'INC' 
     || tok[0].toUpperCase() === 'DEB'){
    return true;
  }
  else{
    return false;
  }
};


var uncolor_instruction = function(instruction_num) {
  /*var current_instruction = document.getElementById('instruction'+instruction_num);
  if(current_instruction){  
    current_instruction.style.backgroundColor = 'white';
  }*/
};

var color_instruction = function(instruction_num) {
  //var current_instruction = document.getElementById('instruction'+instruction_num);
  //current_instruction.style.backgroundColor = 'red';
};



var step = function(){
  if(program_counter === -1 || active_instruction === -1) {
    document.getElementById('reset').style.display = 'block';
    return;
  }
  
  /*fetch*/
  //if active_instruction is a valid instruction number, set that instruction to not active color (if valid)
  //uncolor_instruction(active_instruction);
  
  active_instruction = program_counter;
  
  //color active instruction(if valid)
  //color_instruction(active_instruction);
  
  /*decode*/
  var instruction = editor.session.getLine(active_instruction);
  
  //TODO if instruction empty string (or null to be safe) alert no instruction, stop
  
  var tok = instruction.trim().split(' ');

  //editor.session.highlightLines(active_instruction);
  //var instruction_type = current_instruction.querySelectorAll('.instructionType form select');
  var instruction_index = -1;
  if(tok[0].toUpperCase() === 'END'){
    instruction_index = 2;
  }
  else if(tok[0].toUpperCase() === 'INC'){
    instruction_index = 1;
  }
  else if(tok[0].toUpperCase() === 'DEB'){
    instruction_index = 0;
  }
  var instruction_register = +tok[1];
  var instruction_instruction = +tok[2];
  var instruction_branch = +tok[3];
  
  /*execute*/
  switch(instruction_index){
      case 2://END
        program_counter = -1;
        active_instruction = -1;
        break;
      case 1://INC
        var reg = get_register(instruction_register);
        var reg_input = reg.querySelectorAll('input')[0];
        var reg_int = +reg_input.value;
        reg_input.value = reg_int+1;
        program_counter = instruction_instruction-1;//-1 since shown line numbers start at 1, but zero-indexed array
        /*set pc*/
        break;
      case 0://DEB
        var reg = get_register(instruction_register);
        var reg_input = reg.querySelectorAll('input')[0];
        if(reg_input.value == 0){
          program_counter = instruction_branch-1;//-1 since shown line numbers start at 1, but zero-indexed array
        }
        else {
          var reg_int = +reg_input.value;
          reg_input.value = reg_int-1;
          program_counter = instruction_instruction-1;//-1 since shown line numbers start at 1, but zero-indexed array
        }
        /*set pc*/
        break;
      default:
        alert('Unkown instruction at line '+active_instruction+': "'+instruction+'"');
      
  }
  
  
  
  
  if(valid_instruction(program_counter)) {
    uncolor_instruction(active_instruction);
    color_instruction(program_counter);    
  }
  else if(program_counter !== -1) { 
    /*alert of bad instruction number*/
    alert("bad instruction number '"+program_counter+"'");
    program_counter = -1; 
  }

  
  if(program_counter === -1 || active_instruction === -1) {
    document.getElementById('reset').style.display = 'block';
    return;
  } 
  //editor.session.highlightLines(active_instruction, active_instruction, "ace_line", false);
  editor.session.removeMarker(highlightId);
  highlightId = editor.session.highlightLines(program_counter).id;
};

var highlightId;

var play = function() {
  try{
  while(program_counter != -1){
    //check break point
    step();
  }
  }
  catch(e){
    alert('exception: '+e.message);
  }
};