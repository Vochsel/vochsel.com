<?php 

    $id = $_GET["id"];
    $path = "videos/" . $id;

?>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/showcase.css"/>
    </head>
    <body onclick="document.location = './';">
        <video autoplay="true" loop="true" width="100%" src="<?php echo $path; ?>"/>
        <p><a id="btn_back" href="./">Back</a></p>
    </body>
</html>