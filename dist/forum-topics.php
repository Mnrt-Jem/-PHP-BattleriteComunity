<?php include "assets/include/header.php" ?>
<?php include "assets/include/function.php"; ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php include "assets/include/function_forum.php";
if(isset($_GET['categorie']) AND !empty($_GET['categorie'])) {
   $get_categorie = htmlspecialchars($_GET['categorie']);
   $categories = array();
   $req_categories = $con->query('SELECT * FROM f_categories');
   while($c = $req_categories->fetch()) {
      array_push($categories, array($c['id'],url_custom_encode($c['nom'])));
   }
   foreach($categories as $cat) {
      if(in_array($get_categorie, $cat)) {
         $id_categorie = intval($cat[0]);
      }
   }
   if(@$id_categorie) {
      if(isset($_GET['souscategorie']) AND !empty($_GET['souscategorie'])) {
         $get_souscategorie = htmlspecialchars($_GET['souscategorie']);
         $souscategories = array();
         $req_souscategories = $con->prepare('SELECT * FROM f_souscategories WHERE id_categorie = ?');
         $req_souscategories->execute(array($id_categorie));
         while($c = $req_souscategories->fetch()) {
            array_push($souscategories, array($c['id'],url_custom_encode($c['nom'])));
         }
         foreach($souscategories as $cat) {
            if(in_array($get_souscategorie, $cat)) {
               $id_souscategorie = intval($cat[0]);
            }
         }
      }

      if (isset($_GET['page']) AND $_GET['page'] > 1) {
              $articleparpage = 10;
          }
          else {
              $articleparpage = 10;
          }
          $articleTotal = $con->prepare('SELECT *, f_topics.id topic_base_id FROM f_topics
                  LEFT JOIN f_topics_categories ON f_topics.id = f_topics_categories.id_topic 
                  LEFT JOIN f_categories ON f_topics_categories.id_categorie = f_categories.id
                  LEFT JOIN f_souscategories ON f_topics_categories.id_souscategorie = f_souscategories.id
                  LEFT JOIN utilisateur ON f_topics.id_createur = utilisateur.id_utilisateur
                  WHERE f_categories.id = ? AND f_souscategories.id = ?');
          $articleTotal->execute(array($id_categorie, $id_souscategorie));
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


      $req = 'SELECT *, f_topics.id topic_base_id FROM f_topics
            LEFT JOIN f_topics_categories ON f_topics.id = f_topics_categories.id_topic 
            LEFT JOIN f_categories ON f_topics_categories.id_categorie = f_categories.id
            LEFT JOIN f_souscategories ON f_topics_categories.id_souscategorie = f_souscategories.id
            LEFT JOIN utilisateur ON f_topics.id_createur = utilisateur.id_utilisateur
            WHERE f_categories.id = ?';

      if(@$id_souscategorie) {
         $req .= ' AND f_souscategories.id = ?';
         $exec_array = array($id_categorie,$id_souscategorie);
      } else {
         $exec_array = array($id_categorie);
      }

      $req .= ' ORDER BY f_topics.id DESC limit '.$depart.','.$articleparpage;
      
      $topics = $con->prepare($req);
      $topics->execute($exec_array);
   } else {
      die('Erreur: Catégorie introuvable...');
   }
} else {
   die('Erreur: Aucune catégorie sélectionnée...');
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
                <li><a href="forum.php"><?= $get_categorie ?></a></li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->





        <div class="container">

            <!-- START: Pagination -->
            <div class="row">
                <div class="col-md-3 push-md-9 text-xs-right">
                    <a href="forum-new-topic.php?categorie=<?= $id_categorie ?>" class="nk-btn nk-btn-rounded nk-btn-color-white">NEW POST</a>
                </div>
            </div>
            <!-- END: Pagination -->

            <div class="nk-gap-2"></div>

            <!-- START: Forums List -->
            <ul class="nk-forum">
                <!-- <li>
                    <div class="nk-forum-icon">
                        <span class="ion-pin"></span>
                    </div>
                    <div class="nk-forum-title">
                        <h3><a href="forum-single-topic.html">Suggestions</a></h3>
                        <div class="nk-forum-title-sub">Started by <a href="#">nK</a> on January 17, 2016</div>
                    </div>
                    <div class="nk-forum-count">
                        178 posts
                    </div>
                    <div class="nk-forum-activity-avatar">
                        <img src="assets/images/avatar-1.jpg" alt="Hitman">
                    </div>
                    <div class="nk-forum-activity">
                        <div class="nk-forum-activity-title" title="Hitman">
                            <a href="#">Hitman</a>
                        </div>
                        <div class="nk-forum-activity-date">
                            September 11, 2016
                        </div>
                    </div>
                </li> -->
                <?php while ($t = $topics->fetch()) { ?>
                <li>
                    <div class="nk-forum-icon">
                        <span class="ion-chatboxes"></span>
                    </div>
                    <div class="nk-forum-title">
                        <h3><a href="forum-single-topic.php?titre=<?= url_custom_encode($t['sujet']) ?>&id=<?= $t['topic_base_id'] ?>"><?= $t['sujet'] ?></a></h3>
                        <div class="nk-forum-title-sub">Started by <strong><?= $t['pseudo'] ?></strong> le <?= ucfirst(strftime('%A, le %d %B %Y',strtotime($t['date_heure_creation']))); ?></div>
                    </div>
                    <div class="nk-forum-count">
                        <?= reponse_nbr_topic($t['topic_base_id']); ?> Réponses
                    </div>
                    <div class="nk-forum-activity-avatar">
                        <img src="assets/images/<?= derniere_reponse_topic_rank($t['topic_base_id']);?>.png">
                    </div>
                    <div class="nk-forum-activity">
                        <div class="nk-forum-activity-title" >
                            <?= derniere_reponse_topic($t['topic_base_id']) ?>
                        

                        </div>
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
                            <a href="forum-topics.php?categorie=<?=$get_categorie;?>&souscategorie=<?=$get_souscategorie;?>&page=<?=$i;?>"><?=$i ?></a>
                    <?php } ?>
                <?php } ?>
                </nav>
            </div>
            <!-- END: Pagination -->
        </div>

        <div class="nk-gap-2"></div>



        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>