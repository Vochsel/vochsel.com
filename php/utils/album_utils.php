<?php 
    function CreateAlbumItem($id)
    {
        echo '<a href="showcase_img.php?id=' . $id . '.png"><img class="album-img" src="imgs/thumbs/' . $id . '.png"/></a>';
    }

    function CreateVideoItem($id)
    {
        echo '<a href="showcase_vid.php?id=' . $id . '.mp4"><img class="album-img" src="imgs/thumbs/' . $id . '.png"/></a>';
    }

    function CreateShaderItem($src)
    {

    }
?>