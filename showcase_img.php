<?php 

    $id = $_GET["id"];
    $path = "imgs/portfolio/" . $id;

?>
<html>
    <head>
        <link rel="stylesheet" type="text/css" href="css/showcase.css"/>
    </head>
    <body onclick="document.location = './';">
        <img height="92%" src="<?php echo $path; ?>"/>
        <p><a id="btn_back" href="./">Back</a></p>
    </body>
</html>