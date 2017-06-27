<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php
if (isset($_GET['categorie'])) {
    $get_categorie = htmlspecialchars($_GET['categorie']);
    $categorie = $con->prepare('SELECT * FROM f_categories where id = ?');
    $categorie->execute(array($get_categorie));
    $cat_exist=$categorie->rowCount();

    if ($cat_exist == 1) {
        $categorie = $categorie->fetch();
        $categorie = $categorie['nom'];

        $souscategories = $con->prepare('SELECT * FROM f_souscategories WHERE id_categorie = ?');
        $souscategories->execute(array($get_categorie));

        if (isset($_SESSION['id'])) {
            if(isset($_POST['tsubmit'])) {
                if (isset($_POST['ttitre'],$_POST['tmessage'])) {
                    $titre = htmlspecialchars($_POST['ttitre']);
                    $Message = htmlspecialchars($_POST['tmessage']);
                    $id = $_SESSION['id'];
                    $souscategorie = htmlspecialchars($_POST['souscategorie']);

                    $verif_sc=$con->prepare('SELECT id from f_souscategories where id = ? and id_categorie = ?');
                    $verif_sc->execute(array($souscategorie,$get_categorie));
                    $verif_sc = $verif_sc->rowCount();
                    if ($verif_sc == 1) {
                        if (!empty($titre) and !empty($Message)) { 
                            if (strlen($titre) <= 70) {
                                $insert_topic=$con->prepare('INSERT INTO f_topics (id_createur,sujet,contenu,date_heure_creation)  VALUES (:id,:titre,:contenu,NOW())');
                                $insert_topic->bindparam(':id',$id);
                                $insert_topic->bindparam(':titre',$titre);
                                $insert_topic->bindparam(':contenu',$Message);
                                $insert_topic->execute();
                                $lt = $con->query('SELECT id FROM f_topics ORDER BY id DESC LIMIT 0,1');
                                $lt = $lt->fetch();
                                $id_topic = $lt['id'];

                                $insert_topic=$con->prepare('INSERT INTO f_topics_categories (id_topic, id_categorie, id_souscategorie) VALUES (?,?,?)');
                                $insert_topic->execute(array($id_topic,$get_categorie,$souscategorie));


                                echo '<meta http-equiv="refresh" content="0;URL=forum.php">';
                            }
                            else
                            {
                                $terreur = "Votre titre est trop long !";
                            }
                        }
                        else
                        {
                            $terreur = "Veuillez compléter tous les champs !";
                        }
                    }
                    else
                    {
                        $terreur = "Sous categorie invalide !";
                    }
                }
            }
        }
    } else 
    { die('Aucune catégorie définie'); }
} else
{ die('Aucune catégorie définie'); }
?>

    <div class="nk-main">

        <!-- START: Breadcrumbs -->
        <div class="nk-gap-1"></div>
        <div class="container">
            <ul class="nk-breadcrumbs">


                <li><a href="index.html">Home</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li><a href="forum.html">Forum</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li>
                    <span>Nouvelle Discution</span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->





        <div class="container">

            <!-- START: Pagination -->
            <!-- END: Pagination -->

            <div class="nk-gap-2"></div>

            <!-- START: Forums List -->
            <form method="POST" action="">
            <ul class="nk-forum">
                <li>
                    <div class="nk-forum-icon">
                        <span class="ion-android-star"></span>
                    </div>
                    <div class="nk-forum-title" >
                        <h3>Titre</h3>
                        <div class="nk-forum-title-sub">
                            <div class="col-lg-11">
                                <input type="text" name="ttitre" class="form-control" maxlength="70">
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="nk-forum-icon">
                        <span class="ion-android-folder"></span>
                    </div>
                    <div class="nk-forum-title">
                        <h3>Categorie</h3>
                        <div class="nk-forum-title-sub">
                            <div class="col-lg-11">
                            <strong><?= $categorie ?></strong>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="nk-forum-icon">
                        <span class="ion-android-folder"></span>
                    </div>
                    <div class="nk-forum-title">
                        <h3>Sous categorie</h3>
                        <div class="nk-forum-title-sub">
                        <div class="col-lg-11">
                            <select class="form-control" name="souscategorie">
                            <?php while ($sc = $souscategories->fetch()) { ?>
                                <option value="<?= $sc['id'] ?>">
                                    <?= $sc['nom']; ?>
                                </option>
                                <?php } ?>
                            </select>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="nk-forum-icon">
                        <span class="ion-compose"></span>
                    </div>
                    <div class="nk-forum-title">
                        <h3>Message</h3>
                        <div class="nk-forum-title-sub">
                            <div class="col-lg-11">
                            <textarea class="form-control" name="tmessage"></textarea>
                            </div>
                        </div>
                    </div>
                </li>
                <li>
                    <div class="nk-forum-icon">
                    </div>
                    <div class="nk-forum-title">
                        <p><?php if (isset($terreur)) {
                            echo $terreur; } ?></p>
                        <input type="submit" name="tsubmit" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white">
                    </div>
                </li>
            </ul>
            </form>
            <!-- END: Forums List -->

        </div>

        <div class="nk-gap-2"></div>



        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>