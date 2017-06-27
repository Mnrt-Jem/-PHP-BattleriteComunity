<?php include "assets/include/header.php" ?>
<?php include "assets/include/function_forum.php" ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php
$categories=$con->prepare('SELECT * From f_categories ');
$categories->execute();
$subcat=$con->prepare('SELECT * From f_souscategories where id_categorie = ?');
?>
<?php include "assets/include/function.php" ?>

    <div class="nk-main">

        <!-- START: Breadcrumbs -->
        <div class="nk-gap-1"></div>
        <div class="container">
            <ul class="nk-breadcrumbs">


                <li><a href="index.php">Home</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li>
                    <span>Forum</span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->




        <div class="container">

            <!-- START: Forums List -->
            <ul class="nk-forum">
                <?php
                    while($c = $categories->fetch()) {
                    $subcat->execute(array($c['id']));
                ?>
                <li>
                    <div class="nk-forum-icon">
                        <span class="ion-chatbox-working"></span>
                    </div>
                    <div class="nk-forum-title">
                        <h3><?= $c['nom'] ?></h3>
                        <?php while($sc = $subcat->fetch()) {
                        $souscategories = '';
                        $souscategories .= '<a href="forum-topics.php?categorie='.url_custom_encode($c['nom']).'&souscategorie='.url_custom_encode($sc['nom']).'">'.$sc['nom'].'</a>'; ?>
                            <div class="nk-forum-title-sub"><?= $souscategories ?></div>
                            <?php unset($souscategories);
                            } ?>
                    </div>
                    <div class="nk-forum-count">
                        <?= reponse_nbr_categorie($c['id']) ?> Posts
                    </div>
                    <div class="nk-forum-activity-avatar">
                        <img src="assets/images/<?= derniere_reponse_rank($c['id']);?>.png">
                    </div>
                    <div class="nk-forum-activity">
                        <div class="nk-forum-activity-title">
                            <?= derniere_reponse_categorie($c['id']); ?>


                        </div>
                    </div>
                </li>
                <?php } ?>
            </ul>
            <!-- END: Forums List -->

        </div>

        <div class="nk-gap-2"></div>



        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>