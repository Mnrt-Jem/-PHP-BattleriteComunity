 <?php include "assets/include/header.php" ?>
 <?php include "assets/include/function.php" ?>
 <?php include "assets/include/cookieconnect.php" ?>
 <?php include "assets/include/function_forum.php" ?>
<?php 
if(isset($_GET['titre'],$_GET['id']) AND !empty($_GET['titre']) AND !empty($_GET['id'])) {
   $get_titre = htmlspecialchars($_GET['titre']);
   $get_id = htmlspecialchars($_GET['id']);
   $titre_original = $con->prepare('SELECT sujet FROM f_topics WHERE id = ?');
   $titre_original->execute(array($get_id));
   $titre_original = $titre_original->fetch()['sujet'];
   if($get_titre == url_custom_encode($titre_original)) {
      $topic = $con->prepare('SELECT * FROM f_topics WHERE id = ?');
      $topic->execute(array($get_id));
      $topic = $topic->fetch();
    if(isset($_POST['topic_reponse_submit'],$_POST['topic_reponse'])) {
         $reponse = htmlspecialchars($_POST['topic_reponse']);
         if(isset($_SESSION['id'])) {
            if(!empty($reponse)) {
               $ins = $con->prepare('INSERT INTO f_messages(id_topic,id_posteur,contenu,date_heure_post) VALUES (?,?,?,NOW())');
               $ins->execute(array($get_id,$_SESSION['id'],$reponse));
               $reponse_msg = "Votre réponse a bien été postée";
               unset($reponse);
            } else {
               $reponse_msg = "Votre réponse ne peut pas être vide !";
            }
         } else {
            $reponse_msg = "Veuillez vous connecter ou créer un compte pour poster une réponse";
         }
    }
    if (isset($_GET['page']) AND $_GET['page'] > 1) {
        $articleparpage = 6;
    }
    else {
        $articleparpage = 5;
    }
    $articleTotal = $con->prepare('SELECT * from f_messages where id_topic = ?');
    $articleTotal->execute(array($get_id));
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

    $reponses = $con->prepare('SELECT * from f_messages where id_topic = ? limit '.$depart.','.$articleparpage);
    $reponses->execute(array($get_id));
   } else {
      die('Erreur: Le titre ne correspond pas à l\'id');
   }
} else {
   die('Erreur...');
}
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

                <li><a href="forum.php">Forum</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li><a href="forum.php"><?=$get_titre?></a></li>


            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->





        <div class="container">

            <!-- START: Pagination -->
            <div class="row">
                <div class="col-md-3 push-md-9 text-xs-right">
                    <a href="#forum-reply" class="nk-btn nk-btn-rounded nk-btn-color-white nk-anchor">REPONDRE</a>
                </div>
            </div>
            <!-- END: Pagination -->

            <div class="nk-gap-2"></div>

            <!-- START: Forums List -->
            <ul class="nk-forum nk-forum-topic">
            <?php if($pagecourante == 1) { ?>
                <li>
                    <div class="nk-forum-topic-author">
                        <img src="assets/images/admin.png" alt="Hitman" style="width: 70px; height: 70px;">
                        <div class="nk-forum-topic-author-name" title="Hitman">
                            <?= get_pseudo($topic["id_createur"])?>
                        </div>
                        <div class="nk-forum-topic-author-role"></div>
                    </div>
                    <div class="nk-forum-topic-content">
                        <h3><?=$topic['sujet'] ?></h3>
                        <p><?=$topic['contenu'] ?></p> 
                    </div>
                    <div class="nk-forum-topic-footer">
                        <span class="nk-forum-topic-date"><?=ucfirst(strftime('%A, le %d %B %Y',strtotime($topic['date_heure_creation']))); ?></span>

                        <span class="nk-forum-action-btn">
                            <a href="#forum-reply" class="nk-anchor">
                                <span class="fa fa-reply"></span> Repondre</a>
                        </span>
                    </div>
                </li>
                <?php } ?>
                <?php while ($r = $reponses->fetch()) { ?>
                <li>
                    <div class="nk-forum-topic-author">
                        <img src="assets/images/<?= get_rank($r['id_posteur'])?>.png" alt="Witch Murder" style="width: 70px; height: 70px;">
                        <div class="nk-forum-topic-author-name" title="Witch Murder">
                            <?= get_pseudo($r["id_posteur"])?>
                        </div>
                        <div class="nk-forum-topic-author-role"><strong><?= get_rank($r['id_posteur'])?></strong></div>
                    </div>
                    <div class="nk-forum-topic-content">
                        <p><?= $r['contenu'] ?></p>
                    </div>
                    <div class="nk-forum-topic-footer">
                        <span class="nk-forum-topic-date"><?= ucfirst(strftime('%A, le %d %B %Y',strtotime($r["date_heure_post"]))); ?></span>

                        <span class="nk-forum-action-btn">
                            <a href="#forum-reply" class="nk-anchor">
                                <span class="fa fa-reply"></span> Repondre</a>
                        </span>
                    </div>
                </li>
                <?php } ?>
            </ul>
            <!-- END: Forums List -->

            <div class="nk-gap-2"></div>

            <!-- START: Pagination -->
            <div class="nk-pagination nk-pagination-center">

                <nav>
                <?php 
                    for ($i=1; $i<=$pagesTotales ; $i++) {
                        if($i == $pagecourante) { echo '<span class="nk-pagination-current">'.$pagecourante.'</span>'; }
                        else { ?>
                            <a href="forum-single-topic.php?titre=<?=$get_titre;?>&id=<?=$get_id;?>&page=<?=$i;?>"><?=$i ?></a>
                    <?php } ?>
                <?php } ?>
                </nav>
            </div>
            <!-- END: Pagination -->

            <div id="forum-reply"></div>
            <div class="nk-gap-4"></div>
            <!-- START: Reply -->
            <h3 class="h4">Repondre</h3>
            <?php if(isset($_SESSION['id'])) { ?>
                <form method="POST">
                    <div class="nk-gap-1"></div>
                    <div class=col-lg-12>
                    <form method="POST">
                        <textarea name="topic_reponse" class="summernote" id="contents" title="Contents"></textarea>
                        <div class="nk-gap-1"></div>
                        <input type="submit" name="topic_reponse_submit" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white">
                    </form>
                    </div>
                    <div class="nk-gap-1"></div>
            <?php if(isset($reponse_msg)) { echo $reponse_msg; } ?>
            <?php } else { ?>
                <p>Veuillez vous connecter ou créer un compte pour poster une réponse</p>
            <?php } ?>
            <!-- END: Reply -->
        </div>

        <div class="nk-gap-2"></div>



        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>