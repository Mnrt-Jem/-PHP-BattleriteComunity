<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php 
$articleparpage = 3;
$articleTotal = $con->query('SELECT id_news from news');
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
                    <span>NEWS</span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->




        <div class="container">
            <!-- START: Posts FullWidth -->
            <div class="nk-blog-fullwidth">

            <?php
                $news=$con->prepare( 'SELECT title_news,news,id_news FROM news order by id_news desc limit '.$depart.','.$articleparpage);
                $news ->execute();
                while ($new=$news->fetch()) { ?>
                <!-- START: Post -->
                <div class="nk-blog-post">
                    <!--<a href="blog-article.html" class="nk-post-img">
                        <img src="assets/images/rank.jpg" alt="rank">
                    </a>
                    <div class="nk-gap-2"></div>-->
                    <div class="row vertical-gap">
                        <div class="col-md-8 col-lg-9">
                            <h2 class="nk-post-title h4"><a href="blog-article.php"><?php echo $new['title_news'] ?></a></h2>
                            <div class="nk-gap"></div>
                            <div class="nk-post-text">
                                <p style="overflow-wrap: break-word;"><?php echo $new['news'] ?></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="barre"></div>
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
                                <a href="news.php?page=<?=$i ?>"><?=$i ?></a>
                                <?php } ?>
                            <?php } ?>
                            </nav>
                        </div>

                        <!-- END: Pagination -->
            </div>
            <!-- END: Posts FullWidth -->
        </div>

        <div class="nk-gap-2"></div>



        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>
