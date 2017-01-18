// Contact Form Scripts


console.log('Inside adventureSeaker');

$(function() {

	console.log('Inside function before adventureSeakerForm');

	$("#adventureSeakerForm input").jqBootstrapValidation({

        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var firstName = $("input#firstName").val();
			      var lastName = $("input#lastName").val();
            var email = $("input#email").val();
            // Check for white space in name for Success/Fail message
             if (firstName.indexOf(' ') >= 0) {
							 firstName = firstName.split(' ').slice(0, -1).join(' ');
						 }
						 else if (lastName.indexOf(' ') >= 0){
							 lastName = lastName.split(' ').slice(0, -1).join(' ');
						 }
					 console.log("Inside adventureSeakerForm before ajax call");

            $.ajax({
                url: "https://aqueous-brushlands-18928.herokuapp.com/addAdventureSeaker",
                type: "POST",
				contentType: 'application/json',
                data: JSON.stringify({
                    firstName: firstName,
                    lastName: lastName,
                    email: email
                }),
                cache: false,
                success: function(err) {
                    // Success message
										console.log(err);
                    $('#success').html("<div class='alert alert-success'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
										if (err != true && err.errmsg.toString().includes("duplicate key error")){
											console.log("É duplicado");
											$('#success > .alert-success').append("<strong>You are already registered!</strong>");
										}else{
											console.log("Não é duplicado");
										$('#success > .alert-success').append("<strong>Your message has been sent.</strong>");
									}
                    $('#success > .alert-success').append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;").append("</button>");
										$('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                },
            });

		    console.log('Inside contactFrom after ajax call');

        },
        filter: function() {
            return $(this).is(":visible");
        },
    });


		console.log("before addTicketUserForm");

	$("#addTicketUserForm input").jqBootstrapValidation({

        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var firstNameTicket = $("input#firstNameTicket").val();
			      var lastNameTicket = $("input#lastNameTicket").val();
            var emailTicket = $("input#emailTicket").val();

            // Check for white space in name for Success/Fail message
						if (firstNameTicket.indexOf(' ') >= 0) {
							firstName = firstNameTicket.split(' ').slice(0, -1).join(' ');
						}
						else if (lastNameTicket.indexOf(' ') >= 0){
							lastName = lastNameTicket.split(' ').slice(0, -1).join(' ');
						}
            $.ajax({
                url: "https://aqueous-brushlands-18928.herokuapp.com/addTicketUser",
                type: "POST",
				contentType: 'application/json',
                data: JSON.stringify({
                    firstNameTicket: firstNameTicket,
                    lastNameTicket: lastNameTicket,
                    emailTicket: emailTicket,
                }),
                cache: false,
                success: function() {
                    // Success message
                    $('#successTicket').html("<div class='alert alert-success'>");
                    $('#successTicket > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#successTicket > .alert-success')
                        .append("<strong>Your message has been sent.</strong>");
                    $('#successTicket > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#addTicketForm').trigger("reset");
                },
                error: function() {
                    // Fail message
                    $('#successTicket').html("<div class='alert alert-danger'>");
                    $('#successTicket > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#successTicket > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                    $('#successTicket > .alert-danger').append('</div>');
                    //clear all fields
                    $('#addTicketForm').trigger("reset");
                },
            });
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });


	$('#sendTicket').on('click',function(){

		console.log('Inside send Ticket');
		var $tickets = $('#tickets');

		$.ajax({
			type: 'GET',
			url: '/contactlist',
			success: function(tickets){
				$.each(tickets, function(i,ticket){
					$tickets.append('<li>firstName: '+ ticket.firstName +', lastName: ' + ticket.lastName+ '</li>');
				});
			},
			error: function(){
				alert('error loading tickets')
			}

		});
	});

	$("a[data-toggle=\"tab\"]").click(function(e) {

	    console.log('Inside contactFrom inside data toggle');
        e.preventDefault();
        $(this).tab("show");
    });


});






/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {

    $('#success').html('');
});
