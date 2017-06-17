<?php 

/*
 [ tagajax1 tagui1 tagwpajax tagui tagajax tagnonce tagreferer tagparse tagarray tagjquery tagphp tagloader]
 * Adds some JS
*/



wp_register_script('js', plugin_dir_url( __DIR__ ) . '/js.js', array('jquery'), false, true);
wp_enqueue_script('js');

wp_register_style('css', plugin_dir_url( __DIR__ ) . '/css.css');
wp_enqueue_style('css');

?>

<script type="text/javascript">

    var ajax_nonce = '<?php echo wp_create_nonce("!!!!!!!"); ?>';

    // some tricky converting
    var filters = JSON.parse('<?php echo str_replace("\u0022","\\\\\"", str_replace('\n', "", json_encode($this->dummy, JSON_HEX_QUOT))); ?>');
</script>


<div class="loader" style="display: none;">
    <div class="cube-wrapper">
        <div class="cube-folding">
            <span class="leaf1"></span>
            <span class="leaf2"></span>
            <span class="leaf3"></span>
            <span class="leaf4"></span>
        </div>
        <span class="loading" data-name="Loading">Loading</span>
    </div>
</div>
  
<?php
    

function callback() {

    check_ajax_referer( '!!!!!', '!!!!!' );
    $select_values = $_POST['dummy'];
    ob_start();

    ?> test <?php

    $userbox = ob_get_contents();
    ob_end_clean();

    echo(json_encode( array('error' => $errors, 'user_selectbox' => $userbox,) ));
    wp_die();
    
}






























