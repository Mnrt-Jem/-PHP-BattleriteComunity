<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php 
$articleparpage = 6;
$articleTotal = $con->query('SELECT id_patchnote from patchnote');
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
                    <span>patch NOTES</span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->




        <div class="container">
            <div class="row equal-height vertical-gap">
                <div class="col-lg-8">

                    <!-- START: Posts Grid -->
                    <div class="nk-blog-grid">
                        <div class="row multi-columns-row">
                            <?php
                            $patch=$con->prepare('SELECT title_patchnote,patchnote,id_patchnote FROM patchnote order by id_patchnote desc limit '.$depart.','.$articleparpage);
                            $patch ->execute();
                            while ($patchnote=$patch->fetch()) { ?>
                            <div class="col-md-6">
                                <!-- START: Post -->
                                <div class="nk-blog-post">
                                    <div class="nk-post-img">
                                        <img src="assets/images/hotfix.png" alt="patchnote">
                                    </div>
                                    <div class="nk-gap"></div>
                                    <h2 class="nk-post-title h4"><?php echo $patchnote['title_patchnote'] ?></h2>
                                    <div class="nk-gap"></div>
                                    <div class="nk-post-text">
                                        <p><?php echo $patchnote['patchnote'] ?></p>
                                    </div>
                                    <div class="nk-gap"></div>
                                </div>
                                <!-- END: Post -->
                            </div>
                            <?php } ?>
                        </div>

                        <!-- START: Pagination -->
                        <div class="nk-pagination nk-pagination-center">

                            <nav>
                            <?php 
                            for ($i=1; $i<=$pagesTotales ; $i++) {
                                if($i == $pagecourante) { echo '<span class="nk-pagination-current">'.$pagecourante.'</span>'; }
                                else { ?>
                                <a href="patchnote.php?page=<?=$i ?>"><?=$i ?></a>
                                <?php } ?>
                            <?php } ?>
                            </nav>
                        </div>

                        <!-- END: Pagination -->
                    </div>
                    <!-- END: Posts Grid -->

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