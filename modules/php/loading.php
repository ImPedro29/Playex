<link rel="stylesheet" type="text/css" href="/modules/css/loading.css">
<div id="carregando-css">
	<div style="width:100%;height:100%" class="lds-eclipse">
		<div></div>
	</div>
</div>
<style>
	#carregando-css{
		width: 100%;
		height: 100%;
		position: absolute;
		z-index: 999;
		top: 0px;
		left: 0px;
		background-color: <?php echo $loading_color; ?>;
	}
	.lds-eclipse{
		left: 50%;
		top: 50%;
		transform: translate(-50%,-50%) !important;
		position: absolute;
		width: <?php echo $loading_size; ?> !important;
		height: <?php echo $loading_size; ?> !important;
	}
</style>
<script>
	var loading = document.getElementById("carregando-css");
	window.addEventListener("load", onLoad);
	function onLoad(){
		loading.style.display = "none";
	}
</script>