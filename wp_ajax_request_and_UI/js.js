
 /* Export tab. Filter users */

  jQuery( "#export_filter_submit" ).click(function(e) { 

      e.preventDefault();
      jQuery('#user_notice').fadeOut(300);

      var select_values = {};
      var response_values = ['user_selectbox','selectbox'];

      jQuery.each(filters, function (index, value){ 

          var name = value['name'];
          var id = value['id'];

          select_values[id] = {};

          var a = jQuery('select[name="' + name + '"] option:selected').each(function(){
              select_values[id][jQuery(this).val()] = jQuery(this).val();
          });
      });

      wp_ajax_request('get_filtered_users_v2', ajax_nonce, 'errors', select_values, response_values, success_callback, error_callback);
  });


  function success_callback() {
      jQuery('#download').prop('disabled', false);
  }

  function error_callback() {
      jQuery('#download').prop('disabled', true);
  }




  /* Ajax UI proccess */

  function wp_ajax_request(action, nonce, error, request_data, response_data, success_callback = false, error_callback = false) {

      jQuery.ajax({ 
          
          type: "POST", 
          url: ajaxurl, 
          security: nonce,
          data: {
              action: action,
              security: nonce,
              select_values: request_data
          }, 
          
          beforeSend: function() { 

              jQuery('.loader').fadeIn(300);
              jQuery('#'+error).fadeOut(300);

              jQuery.each(response_data, function (index, value){          
                  jQuery('#'+value).fadeOut(300);
              });
          },

          success: function(response) { 

              response = jQuery.parseJSON(response);
              jQuery('.loader').fadeOut(1200);

              setTimeout(function() {

                  if (response['error']) {

                      jQuery('#'+error).html(response['error']);
                      jQuery('#'+error).fadeIn(300);
                      
                      if (jQuery.isFunction(error_callback)) {
                          error_callback();
                      }
                  }
                  else{

                      jQuery.each(response_data, function (index, value){ 
                          jQuery('#'+value).html(response[value]);
                          jQuery('#'+value).fadeIn(300);
                      });
                      
                      if (jQuery.isFunction(success_callback)) {
                          success_callback();
                      }
                  }

              }, 1000);  
          },

      });
  }