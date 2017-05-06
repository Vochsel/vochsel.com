<!DOCTYPE html>
<html>
	<head>
		<title>vochsel.com</title>
		<?php require_once "php/templates/meta.php" ?>
	</head>
	<body>
		<div id="container">
			<?php require_once "php/templates/header.php" ?>

			<p>
				<b>Vochsel</b> (vŏk′səl) <i>noun</i> <br>
				Pronounced like voxel but with more pizazz.
			</p>

			<div class="album-viewer">
				<?php CreateVideoItem("Marble"); ?>
				<?php CreateAlbumItem("WatersInfinity"); ?>
				<?php CreateAlbumItem("Spikes"); ?>
				<?php CreateVideoItem("RedSpin"); ?>
				<?php CreateAlbumItem("SwirlyGlass"); ?>
				<?php CreateAlbumItem("RedCurves"); ?>
			</div>

		</div>
		
		<?php require_once "php/templates/footer.php" ?>
	</body>
</html>