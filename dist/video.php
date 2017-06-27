<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php 
$articleparpage = 4;
$articleTotal = $con->query('SELECT id_video from video');
$patchTotal = $articleTotal->rowCount();
$pagesTotales = ceil($patchTotal/$articleparpage);
if (isset($_GET['page']) AND !empty($_GET['page']) AND $_GET['page'] > 0 AND $_GET['page'] <= $pagesTotales) {
    $_GET['page'] = intval($_GET['page']);
    $pagecourante= $_GET['page'];
} else
{
    $pagecourante = 1;
}
$depart = ($pagecourante-1)*$articleparpage;
?>


    <div class="nk-main">

        <!-- START: Breadcrumbs -->
        <div class="nk-gap-1"></div>
        <div class="container">
            <ul class="nk-breadcrumbs">


                <li><a href="index.php">Home</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li><a href="#">Actualités</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li>
                    <span>Vidéo</span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->




        <div class="container">
            <div class="row equal-height vertical-gap">
                <div class="col-lg-8">

                    <!-- START: Posts List -->
                    <div class="nk-blog-list">

                        <?php
                            $video=$con->prepare( 'SELECT title_video,lien_video,id_video FROM video order by id_video desc limit '.$depart.','.$articleparpage);
                            $video ->execute();
                            while ($vid=$video->fetch()) { ?>
                        <!-- START: Post -->
                        <div class="nk-blog-post">
                            <div class="row vertical-gap">
                                <div class="col-md-5 col-lg-6">
                                 <h4><?php echo $vid['title_video'] ?></h4>
                                    <div class="nk-plain-video" data-video="<?php echo $vid['lien_video'] ?>"></div>
                                </div>
                            </div>
                        </div>
                        <div class="nk-gap-2"></div>
                        <!-- END: Post -->
                        <?php } ?>
                        <!-- START: Pagination -->
                        <div class="nk-pagination nk-pagination-center">

                            <nav>
                            <?php 
                            for ($i=1; $i<=$pagesTotales ; $i++) {
                                if($i == $pagecourante) { echo '<span class="nk-pagination-current">'.$pagecourante.'</span>'; }
                                else { ?>
                                <a href="video.php?page=<?=$i ?>"><?=$i ?></a>
                                <?php } ?>
                            <?php } ?>
                            </nav>
                        </div>

                        <!-- END: Pagination -->
                    </div>
                    <!-- END: Posts List -->

                </div>
                <div class="col-lg-4">
                    <!--
                    START: Sidebar

                    Additional Classes:
                        .nk-sidebar-left
                        .nk-sidebar-right
                        .nk-sidebar-sticky
                -->
<?php include "assets/include/sidebar.php" ?>
        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>
