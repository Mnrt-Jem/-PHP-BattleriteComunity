<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>



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
                $news=$con->prepare( 'SELECT title_news,news,id_news FROM news order by id_news desc limit 0,6');
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
                <!--<div class="nk-pagination nk-pagination-center">
                    <a href="#" class="nk-pagination-prev">
                        <span class="ion-ios-arrow-back"></span>
                    </a>
                    <nav>
                        <a class="nk-pagination-current" href="#">1</a>
                    </nav>
                    <a href="#" class="nk-pagination-next">
                        <span class="ion-ios-arrow-forward"></span>
                    </a>
                </div>-->
                <!-- END: Pagination -->
            </div>
            <!-- END: Posts FullWidth -->
        </div>

        <div class="nk-gap-2"></div>



        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>