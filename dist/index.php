<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>


    <div class="nk-main">

        <div class="nk-gap-2"></div>



        <div class="container">

            <!-- START: Image Slider -->
            <!-- END: Image Slider -->

            <!-- START: Categories -->
            <!-- END: Categories -->

            <!-- START: Latest News -->
            <!-- END: Latest News -->

            <div class="nk-gap-2"></div>
            <div class="row equal-height vertical-gap">
                <div class="col-lg-8">

                    <!-- START: Latest Posts -->
                    <h3 class="nk-decorated-h-2">
                        <span>
                            <span class="text-main-1">Les</span> Actualités</span>
                    </h3>
                    <div class="nk-gap"></div>
                    <div class="nk-blog-grid">
                        <div class="row multi-columns-row">


                            <div class="col-md-6">
                                <!-- START: Post -->
                                <?php $requete0=$con->prepare( 'SELECT title_patchnote,patchnote,id_patchnote FROM patchnote order by id_patchnote desc limit 0,1');
                                    $requete0 ->execute(); 
                                    $donnees0=$requete0->fetch();
                                    $title_patch=$donnees0['title_patchnote'];
                                    $patchnote=$donnees0['patchnote'];
                                    ?>
                                <div class="nk-blog-post">
                                    <a href="patchnote.php" class="nk-post-img">
                                        <img src="assets/images/hotfix.png" alt="hotfix">
                                    </a>
                                    <div class="nk-gap"></div>
                                    <h2 class="nk-post-title h4"><a href="patchnote.php"><?php echo $title_patch ?></a></h2>
                                    <div class="nk-gap"></div>

                                    <div class="nk-post-text" >
                                        <p><strong><?php echo $patchnote ?></strong></p>
                                    </div>
                                    <div class="nk-gap"></div>
                                    <a href="patchnote.php" class="nk-btn nk-btn-rounded nk-btn-color-dark-3 nk-btn-hover-color-main-1">Read More</a>
                                </div>
                                <!-- END: Post -->
                            </div>


                            <div class="col-md-6">
                                <!-- START: Post -->
                                <?php $requete0=$con->prepare( 'SELECT title_news,news,id_news FROM news order by id_news desc limit 0,1');
                                    $requete0 ->execute();
                                    $donnees0=$requete0->fetch();
                                    $title_news=$donnees0['title_news'];
                                    $news=$donnees0['news'];
                                    ?>
                                <div class="nk-blog-post">
                                    <a href="news.php" class="nk-post-img">
                                        <img src="assets/images/NEWS.png" alt="hotfix">
                                    </a>
                                    <div class="nk-gap"></div>
                                    <h2 class="nk-post-title h4"><a href="news.php"><?php echo $title_news ?></a></h2>
                                    <div class="nk-gap"></div>
                                    <div class="nk-post-text">
                                        <p><strong><?php echo $news ?></strong></p>
                                    </div>
                                    <div class="nk-gap"></div>
                                    <a href="news.php" class="nk-btn nk-btn-rounded nk-btn-color-dark-3 nk-btn-hover-color-main-1">Read More</a>
                                </div>
                                <!-- END: Post -->
                            </div>
                            <div class="col-md-6">
                                <!-- START: Post -->
                                <?php $requete0=$con->prepare( 'SELECT title_video,lien_video,id_video FROM video order by id_video desc limit 0,1');
                                    $requete0 ->execute(); 
                                    $donnees0=$requete0->fetch();
                                    $title_video=$donnees0['title_video'];
                                    $video=$donnees0['lien_video'];
                                    ?>
                                <div class="nk-blog-post">
                                    <div class="nk-gap"></div>
                                    <h2 class="nk-post-title h4"><a href="video.php"><?php echo $title_video ?></a></h2>
                                    <div class="nk-gap"></div>
                                    <div class="nk-plain-video" data-video="<?php echo $video ?>"></div>
                                    <div class="nk-gap"></div>
                                    <a href="video.php" class="nk-btn nk-btn-rounded nk-btn-color-dark-3 nk-btn-hover-color-main-1">Read More</a>
                                </div>
                                <!-- END: Post -->
                            </div>
                        </div>
                    </div>
                    <!-- END: Latest Posts -->
                    <!-- END: Latest Matches -->

                    <!-- START: Tabbed News  -->
                    <!-- END: Tabbed News -->


                    <!-- START: Latest Pictures -->
                    <!-- END: Latest Pictures -->

                    <!-- START: Best Selling -->
                    <!-- END: Best Selling -->
                </div>
                <div class="col-lg-4">
                    <!--
                START: Sidebar

                Additional Classes:
                    .nk-sidebar-left
                    .nk-sidebar-right
                    .nk-sidebar-sticky
                    discord
                    
            -->
<?php include "assets/include/sidebar.php" ?>
        <!-- START: Footer -->
<?php include "assets/include/footer.php" ?>