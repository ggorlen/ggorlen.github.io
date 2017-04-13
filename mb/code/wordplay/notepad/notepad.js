/** 
 * A very simple notepad script with jQuery 
 */


// Wait for the document to be ready
$(document).ready(function() {

  // Add a listener to the inputbox
  $("#inputbox").keydown(function(e) {
    
    // Check to see if the enter key was pressed
    if (e.which === 13/* && !e.shiftKey*/) {
  
      // Append the value of the text box to the #output div
      $("#output").append($(this).val() + "<br />");
      
      // Clear the input box
      $(this).val('');
      
      // Don't do a carriage return
      e.preventDefault();
    }
  });
});
