<?php
$user = 'root';
$pass = "";

try {
$con = new PDO('mysql:host=localhost;dbname=battlerite', $user, $pass);;
} catch(Exeption $e) {
    die($e);
}
session_start();
?>
<!DOCTYPE html>
<!--
  Name: Battlerite Community
  Version: 1.0.0
  Author: BattleriteCommunity
-->
<?php setlocale(LC_TIME, 'fr') ?>
<html lang="fr">

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <title>Battlerite Community</title>

    <meta name="description" content="GoodGames - Bootstrap template for communities and games store">
    <meta name="keywords" content="game, gaming, template, HTML template, responsive, Bootstrap, premium">
    <meta name="author" content="_nK">

    <link rel="icon" type="image/png" href="assets/images/iconbc.png">

    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- START: Styles -->

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700%7cOpen+Sans:400,700" rel="stylesheet" type="text/css">

    <!-- Bootstrap -->
    <link rel="stylesheet" href="assets/bower_components/bootstrap/dist/css/bootstrap.min.css">

    <!-- FontAwesome -->
    <link rel="stylesheet" href="assets/bower_components/fontawesome/css/font-awesome.min.css">

    <!-- IonIcons -->
    <link rel="stylesheet" href="assets/bower_components/ionicons/css/ionicons.min.css">

    <!-- Flickity -->
    <link rel="stylesheet" href="assets/bower_components/flickity/dist/flickity.min.css">

    <!-- Photoswipe -->
    <link rel="stylesheet" type="text/css" href="assets/bower_components/photoswipe/dist/photoswipe.css">
    <link rel="stylesheet" type="text/css" href="assets/bower_components/photoswipe/dist/default-skin/default-skin.css">

    <!-- Seiyria Bootstrap Slider -->
    <link rel="stylesheet" href="assets/bower_components/seiyria-bootstrap-slider/dist/css/bootstrap-slider.min.css">

    <!-- Summernote -->
    <link rel="stylesheet" href="assets/bower_components/summernote/dist/summernote.css">

    <!-- Prism -->
    <link rel="stylesheet" type="text/css" href="assets/bower_components/prism/themes/prism-tomorrow.css">

    <!-- GoodGames -->
    <link rel="stylesheet" href="assets/css/goodgames.css">

    <!-- Custom Styles -->
    <link rel="stylesheet" href="assets/css/custom.css">

    <!-- END: Styles -->

    <!-- jQuery -->
    <script src="assets/bower_components/jquery/dist/jquery.min.js"></script>

    <script src="https://www.google.com/recaptcha/api.js" async defer></script>



</head>


<!--
    Additional Classes:
        .nk-page-boxed
-->

<body>





    <!--
    Additional Classes:
        .nk-header-opaque
-->
    <header class="nk-header nk-header-opaque">
<?php 
    if (isset($_POST['envoi_message'])) 
    {
        if (isset($_POST['destinataire']) and isset($_POST['message_expediteur']) and !empty($_POST['destinataire']) and !empty($_POST['message_expediteur'])) 
        {
            $destinataire = intval($_POST['destinataire']);
            $message_expediteur = htmlspecialchars($_POST['message_expediteur']);
                $insert_message=$con->prepare('INSERT INTO message (id_expediteur,id_destinataire,message) VALUES (:id_exp,:id_desti,:msg )');
                $insert_message->bindParam(':id_exp',$_SESSION['id']);
                $insert_message->bindParam(':id_desti',$destinataire);
                $insert_message->bindParam(':msg',$message_expediteur);
                $insert_message->execute();

                $erreur_message = "Votre message a bien été envoyé !";
        }
        else
        {
            $erreur_message = "Veuillez compléter tout les champs";
        }
    }

    if (isset($_SESSION['id']) and !empty($_SESSION['id'])) {

    $membre=$con->prepare('SELECT * FROM utilisateur order by pseudo');
    $membre->execute();

    $allmessage=$con->prepare('SELECT * FROM message where id_destinataire = :my_id order by id_message DESC limit 0,6');
    $allmessage->bindParam(':my_id',$_SESSION['id']);
    $allmessage->execute();
    }
    if (isset($_POST['msg_delete_vls']) and !empty($_POST['msg_delete_vls'])) {
        $id_delete = $_POST['msg_delete_vls'];
        $delete_msg=$con->prepare('DELETE FROM message where id_message = :id');
        $delete_msg->bindParam(':id',$id_delete);
        $delete_msg->execute();

    }

?>


        <!-- START: Top Contacts -->
        <div class="nk-contacts-top">
            <div class="container">
                <div class="nk-contacts-right">
                    <ul class="nk-contacts-icons">

                        <li>
                            <a href="#" data-toggle="modal" data-target="#modalSearch">
                                <span class="fa fa-search"></span>
                            </a>
                        </li>


                        <li>
                            <a href="#" data-toggle="modal" data-target="#modalLogin">
                                <span class="fa fa-user"></span>
                            </a>
                        </li>
                        <?php if (isset($_SESSION['id']) and !empty($_SESSION['id'])) { ?>
                        <li>
                            <span class="nk-cart-toggle">
                                <span class="nk-badge">Message</span>
                            </span>
                            <div class="nk-cart-dropdown">
                            <div class="nk-post-text">

                                    <h5>
                                        MES <span class="text-main-1">MESSAGES</span>
                                    </h5>
                                    <div class=barre></div>
                                    <div id="messagep">
                                    <?php while ($allmsg=$allmessage->fetch()) {

                                        $p_exp=$con->prepare('SELECT pseudo FROM utilisateur where id_utilisateur = :pseudo');
                                        $p_exp->bindParam(':pseudo',$allmsg['id_expediteur']);
                                        $p_exp->execute();
                                        $p_exp = $p_exp->fetch();
                                        $p_exp = $p_exp['pseudo']; ?>
                                        <span style="overflow-wrap: break-word;">
                                        <span class="text-main-1"><strong><?php echo $p_exp; ?></strong></span> : <?php echo $allmsg['message']; ?> <form method="post" action=""><input type="hidden" name="msg_delete_vls" value="<?=$allmsg['id_message'] ?>"><a href="#" onclick="$(this).closest('form').submit()">Supprimer</a></form>
                                        </span>
                                        <div class="nk-gap-1"></div>
                                    <?php } ?>
                                    </div>
                                <div class="nk-gap-1"></div>
                                <div class=barre></div>
                                <h5>ENVOYER UN <span class="text-main-1">MESSAGE</span></h5>
                                <form method="post" action="">
                                    <select name="destinataire" class="form-control">
                                    <?php  while($user=$membre->fetch()) { ?>
                                        <option value="<?php echo $user['id_utilisateur']; ?>">
                                            <?php echo $user['pseudo']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                    <textarea class="form-control" name="message_expediteur" id="notes" placeholder="Message ..." rows="3"></textarea>
                                <div class="text-xs-center">
                                    <div class="nk-gap-1"></div>
                                    <input type="submit" name="envoi_message" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" value="Envoyer">
                                    <div class="nk-gap-1"></div>
                                    <?php if (isset($erreur_message)) { echo '<font color="orange">'.$erreur_message.'</font>'; }?>
                                </div>
                                </form>
                            </div>
                        </li>
                        <?php } ?>
                    </ul>
                </div>
            </div>
        </div>
        <!-- END: Top Contacts -->


        <!--
        START: Navbar

        Additional Classes:
            .nk-navbar-sticky
            .nk-navbar-transparent
            .nk-navbar-autohide
    -->
        <nav class="nk-navbar nk-navbar-top nk-navbar-sticky">
            <div class="container">
                <div class="nk-nav-table">

                    <a href="index.php" class="nk-nav-logo">
                        <img src="assets/images/logo.png" alt="GoodGames" width="199">
                    </a>

                    <ul class="nk-nav nk-nav-right hidden-md-down" data-nav-mobile="#nk-nav-mobile">

                        <li class=" nk-drop-item">
                            <a href="index.php">
                Actualités
                
            </a>
                            <ul class="dropdown">

                                <li>
                                    <a href="patchnote.php">
                Patch Note
                
            </a>
                                </li>
                                <li class=" nk-drop-item">
                                    <a href="news.php">
                News
                
            </a>
                                </li>
                                <li class=" nk-drop-item">
                                    <a href="video.php">
                Vidéo
                
            </a>
                                </li>
                            </ul>
                        </li>
                        <li class=" nk-drop-item">
                            <a href="http://battlerite.gamepedia.com/Battlerite_Wiki" target='_blank'>
                Battle Wiki
                
            </a>
                        </li>
                        <li class=" nk-drop-item">
                            <a href="tournaments.php">
                Tournois
                
            </a>
                            <ul class="dropdown">

                                <li>
                                    <a href="tournaments-teams.php">
                Teams
                
            </a>
                                </li>
                                <li>
                                    <a href="tournaments-match.php">
                Team Match 3 VS 3
                
            </a>
                                </li>
                            </ul>                          
                        </li>
                        <li class="nk-drop-item">
                            <a href="Forum.php">
                Forum
                
            </a>
                        </li>
                        <li class=" nk-drop-item">
                            <a href="Contact.php">
                Contact
                
            </a>
                        </li>
                    </ul>
                    <ul class="nk-nav nk-nav-right nk-nav-icons">

                        <li class="single-icon hidden-lg-up">
                            <a href="#" class="no-link-effect" data-nav-toggle="#nk-nav-mobile">
                                <span class="nk-icon-burger">
                                    <span class="nk-t-1"></span>
                                    <span class="nk-t-2"></span>
                                    <span class="nk-t-3"></span>
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        <!-- END: Navbar -->

    </header>

    <!--
    START: Navbar Mobile

    Additional Classes:
        .nk-navbar-left-side
        .nk-navbar-right-side
        .nk-navbar-lg
        .nk-navbar-overlay-content
-->
    <div id="nk-nav-mobile" class="nk-navbar nk-navbar-side nk-navbar-right-side nk-navbar-overlay-content hidden-lg-up">
        <div class="nano">
            <div class="nano-content">
                <a href="index.html" class="nk-nav-logo">
                    <img src="assets/images/logo.png" alt="" width="120">
                </a>
                <div class="nk-navbar-mobile-content">
                    <ul class="nk-nav">
                        <!-- Here will be inserted menu from [data-mobile-menu="#nk-nav-mobile"] -->
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Navbar Mobile -->